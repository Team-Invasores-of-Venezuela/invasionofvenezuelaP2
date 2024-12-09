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

  reportes: any;
  reportesFiltrados: any;
  mostrarModalEstadisticas: boolean = false;
  topReportes: { observacion: string; cantidad: number }[] = [];

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

  navegaEstudiante(nombre: string, apellidoP: string, apellidoM: string, rut: string, numMatricula: string, fecIngreso: any, imagen: string, positivas: number, negativas: number){
    localStorage.setItem('nombreEstudiante', nombre);
    localStorage.setItem('apellidoPaterno', apellidoP);
    localStorage.setItem("apellidoMaterno", apellidoM);
    localStorage.setItem("rutEstudiante", rut);
    localStorage.setItem("numMatricula", numMatricula);
    localStorage.setItem("fecIngreso", fecIngreso);
    localStorage.setItem("imagen", imagen);
    localStorage.setItem("positivas", String(positivas));
    localStorage.setItem("negativas", String(negativas));
    this.router.navigate(['/estudiante']);
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
    localStorage.setItem("SOYUNCURSO", curso.id);
    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAA", curso.id);
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
        }
      }
    }
    console.log("ALUMNOS SELECCIONADOS", this.alumnosSeleccionados)
  }

  verEstadisticas(curso: any){
    this.mostrarModalEstadisticas = true;
    this.calcularEstadisticas();

    // Dibujar el gráfico
    this.dibujarGrafico();
  }

  cerrarModalEstadisticas() {
    this.mostrarModalEstadisticas = false;
  }

  calcularEstadisticas(): void {
    const observacionCount: { [key: string]: number } = {};
    this.reportesFiltrados.forEach((reporte: { descripcion: string | number; }) => {
      observacionCount[reporte.descripcion] = (observacionCount[reporte.descripcion] || 0) + 1;
    });

    this.topReportes = Object.entries(observacionCount)
      .map(([observacion, cantidad]) => ({ observacion, cantidad }))
      .sort((a, b) => b.cantidad - a.cantidad)
      .slice(0, 5);
  }

  getReportesCurso(curso: any): void {
    this.http.get<any[]>(`http://localhost:8080/reporte/getreportes`)
      .subscribe(
        (data: any[]) => {
          console.log('Reportes obtenidos', data);
          this.reportes = data;
          for(let i=0; i< this.reportes.length; i++) {
            if(this.reportes[i].cursoId == curso.id){
              this.reportesFiltrados.push(this.reportes[i]);
            }
          }
        },
        (error: any) => {
          console.error('Error al obtener los estudiantes', error);
        }
      );
  }

  dibujarGrafico(): void {
    const canvas = document.getElementById('graficoEstadisticas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const labels = this.topReportes.map((reporte) => reporte.observacion);
    const data = this.topReportes.map((reporte) => reporte.cantidad);

    // Limpiar el canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dibujar el gráfico de barras
    const barWidth = 50;
    const barSpacing = 20;
    const maxData = Math.max(...data);
    const chartHeight = canvas.height - 50;

    data.forEach((value, index) => {
      const x = index * (barWidth + barSpacing) + 50;
      const barHeight = (value / maxData) * chartHeight;

      // Dibujar la barra
      ctx.fillStyle = '#4caf50';
      ctx.fillRect(x, canvas.height - barHeight - 30, barWidth, barHeight);

      // Dibujar etiqueta del eje X
      ctx.fillStyle = '#000';
      ctx.font = '12px Arial';
      ctx.fillText(labels[index], x, canvas.height - 10);
    });
  }

  protected readonly info = info;
}
