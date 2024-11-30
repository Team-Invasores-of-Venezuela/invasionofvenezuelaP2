import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {Router} from '@angular/router';
import {AuthService} from '../AuthService';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {Observable} from 'rxjs';

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
  private apiUrlGetCursos = 'http://localhost:8080/curso/getall';
  private apiUrldocente = 'http://localhost:8080/usuario/';
  docenteId = localStorage.getItem('userId');
  nombre= localStorage.getItem('nombre');
  periodos: { anio: number; semestre: number }[] = [];
  hayCursos: boolean = false;

  constructor(private router: Router, private authService: AuthService, private http: HttpClient) {
    for (let year = 2016; year <= 2024; year++) {
      for (let semester = 1; semester <= 2; semester++) {
        this.periodos.push({ anio: year, semestre: semester });
      }
    }
  }

  ngOnInit() {
    this.cargarDatosDocente();
    this.getCursoAnioSemestre(1,1);
  }

  cargarDatosDocente() {

    console.log('ID del docente desde localStorage:', this.docenteId);  // Verificar el valor

    this.http.get<any[]>(this.apiUrlGetCursos).subscribe({

      next: (data) => {
        console.log(this.nombre);
        console.log('Datos:', data);
        this.cursos = data.filter(curso => curso.docente === this.nombre);
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
        this.filtraCursos(2022, 1);
      },
      error: (error) => {
        console.error('Error al obtener los cursos:', error);
        alert('No se pudieron cargar los cursos. Intente nuevamente más tarde.');
      },
    });

  }

  filtraCursos(anio: number, semestre: number){
    this.cursosFiltrados = [];

    for (let i = 0; i < this.cursos.length; i++) {
      if(this.cursos[i].ano == anio && this.cursos[i].semestre == semestre){
        this.cursosFiltrados.push(this.cursos[i]);
      }
    }
    console.log("Cursos filtrados",this.cursosFiltrados);
    this.hayCursos = this.cursosFiltrados.length > 0;

  }

}
