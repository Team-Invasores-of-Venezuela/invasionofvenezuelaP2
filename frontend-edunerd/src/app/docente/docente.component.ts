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
  nombreProfesor: string | null ='';

  constructor(private router: Router, private authService: AuthService, private http: HttpClient) {}

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
    this.cargarDatosDocenteParaNombre()

  }

  cargarDatosDocente() {

    console.log('ID del docente desde localStorage:', this.docenteId);  // Verificar el valor

    this.http.get<any[]>(this.apiUrlGetCursos).subscribe({

      next: (data) => {
        console.log(this.nombre);
        console.log('Datos:', data);
        this.mostrarCursos = data.filter(curso => curso.profesor === this.nombre);
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


  protected readonly info = info;
}
