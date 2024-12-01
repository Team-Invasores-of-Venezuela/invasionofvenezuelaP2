import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {Router} from '@angular/router';
import {AuthService} from '../AuthService';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {info} from 'autoprefixer';


@Component({
  selector: 'app-docente',
  standalone: true,
  imports: [
    NgForOf,
    NgIf, HttpClientModule,
  ],
  templateUrl: './docente.component.html',
  styleUrl: './docente.component.css'
})
export class DocenteComponent implements OnInit{
  docente: { id: string, nombre: string, cursos: string[] } = { id: '', nombre: '', cursos: [] };
  estudiantes: any [] | any;
  cursos: any[] = [];
  cursosFiltrados: any[] = [];
  mostrarCursos:
    { id: string;
      carrera:string;
      nombre: string;
      ano:number;
      semestre:number;
      seccion: string;
      alumnos: { matricula: string, nombre: string, apellidoPaterno:string, apellidoMaterno:string }[];
      profesor: string }[] = [];

  infoProfesor:{
    id : string;
    nombre : string;
    apellidoPaterno: string;
    apellidoMaterno : string;
    rut : string;
    titulo: string;
    gradoMax : string;
  }[]=[];

  private apiUrlGetCursos = 'http://localhost:8080/curso/getall';
  private apiUrldocente = 'http://localhost:8080/profesor/getall';
  docenteId = localStorage.getItem('userId');
  nombre= localStorage.getItem('nombre');
  periodos: { anio: number; semestre: number }[] = [];
  hayCursos: boolean = true;
  general: boolean = false;
  profesor: any[] = [];
  mostrarModal = false;
  cursoSeleccionado: any = null;
  alumnos: any[] = [];
  alumnosSeleccionados: any;
  nombreProfesor: string | null ='';
  claro:boolean = false;

  constructor(private router: Router, private authService: AuthService, private http: HttpClient) {
    for (let year = 2016; year <= 2024; year++) {
      for (let semester = 1; semester <= 2; semester++) {
        this.periodos.push({anio: year, semestre: semester});
      }
    }

    this.claro = false;
  }

  modoOscuro(): void {
    this.claro = !this.claro;
    this.actualizarTema();
  }

  private cargarTema(): void {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      this.claro = true;
      document.documentElement.classList.add('dark');
    } else {
      this.claro = false;
      document.documentElement.classList.remove('dark');
    }
  }

  private actualizarTema(): void {
    const htmlElement = document.documentElement;
    if (this.claro) {
      htmlElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      htmlElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }

  dividirMatriculas(curso: any): any[] {
    const alumnos = curso.alumnos;
    const grupos: any[] = [];

    for (let i = 0; i < alumnos.length; i += 5) {
      grupos.push(alumnos.slice(i, i + 5));
    }
    return grupos;
  }

  ngOnInit() {
    this.cargarDatosDocente();
    this.getEstudiantes();
    console.log("Datos docente",localStorage);
    this.getCursoAnioSemestre(1,1);
    this.cargarDatosDocenteParaNombre()
    this.cargarTema();
  }


  cargarDatosDocente() {

    console.log('ID del docente desde localStorage:', this.docenteId);  // Verificar el valor

    this.http.get<any[]>('http://localhost:8080/profesor/getall').subscribe({

      next: (data) => {
        console.log(this.nombre);
        console.log('Datos:', data);
        this.profesor = data.filter(profAux => profAux.rut === localStorage.getItem('nombre'));
        console.log('Datos Profesor', this.profesor);
      },
      error: (error) => {
        console.error('Error al obtener los cursos:', error);
        alert('No se pudieron cargar los cursos. Intente nuevamente más tarde.');
      },
    });
  }

  cargarDatosDocenteParaNombre() {

    console.log('ID del docente desde localStorage:', this.docenteId);  // Verificar el valor

    this.http.get<any[]>(this.apiUrldocente).subscribe({

      next: (data) => {
        console.log(this.nombre);
        this.infoProfesor = data.filter(profesor => profesor.rut === this.nombre);
        this.nombreProfesor = this.infoProfesor.length > 0 ? this.infoProfesor[0].nombre : null;
        console.log('Nombre del profesor:', this.nombreProfesor);

      },
      error: (error) => {
        console.error('Error al obtener los cursos:', error);
        alert('No se pudieron cargar los cursos. Intente nuevamente más tarde.');
      },
    });
  }


  cerrarSesion() {
    // Elimina los datos almacenados de sesión
    localStorage.removeItem('userId');
    localStorage.removeItem('isAdmin');

    // Redirige al usuario a la página de login
    this.router.navigate(['/login']);
  }

  //Retorna los cursos impartidos por el profesor impartidos en un año y semestre en específico
  getCursoAnioSemestre(anio: number, semestre: number){

    //Obtiene todos los cursos
    this.http.get<any>('http://localhost:8080/curso/getall').subscribe({
      next: (data) => {
        this.cursos = data;
        console.log("Cursos", data)
      },
      error: (error) => {
        console.error('Error al obtener los cursos:', error);
        alert('No se pudieron cargar los cursos. Intente nuevamente más tarde.');
      },
    });
  }

  filtraCursos(anio: number, semestre: number){
    this.general = true;
    this.cursosFiltrados = [];
    console.log("RUT DEL PROFESOR: ",this.profesor[0].rut)
    for (let i = 0; i < this.cursos.length; i++) {
      console.log(this.cursos[i].profesor)
      if(this.cursos[i].ano == anio && this.cursos[i].semestre == semestre && this.cursos[i].profesor == this.profesor[0].rut  ){
        this.cursosFiltrados.push(this.cursos[i]);
      }
    }
    console.log("Cursos filtrados",this.cursosFiltrados);
    this.hayCursos = !(this.cursosFiltrados.length > 0);
  }

  abrirModal(curso: any) {
    this.cursoSeleccionado = curso;

    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.cursoSeleccionado = null;
  }

  getEstudiantes(): void {
    this.http.get<any[]>('http://localhost:8080/estudiante/getall')
      .subscribe(
        (data: any[]) => {
          console.log('Estudiantes obtenidos', data);
          this.alumnos = data;
        },
        (error: any) => {
          console.error('Error al obtener los estudiantes', error);
        }
      );
  }

  //Filtra todos los alumnos a los que pertenecen al curso
  mapAlumnos(curso: any){
    this.alumnosSeleccionados = []
    for(let i = 0; i < curso.alumnos.length; i++){ //Recorro los alumnos del curso
      for (let j = 0; j < this.alumnos.length; j++) { //Recorro todos los alumnos
        if(this.alumnos[j].matricula == curso.alumnos[i]  ){
          this.alumnosSeleccionados.push(this.alumnos[j]);
          console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
        }
      }
    }

    console.log("ALUMNOS SELECCIONADOS", this.alumnosSeleccionados)

  }


  protected readonly info = info;
}
