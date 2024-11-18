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
  mostrarCursos: { id: string, titulo: string, docente: string, aprendizajes:string[],ano:number,semestre:number }[] = [];
  private apiUrlGetCursos = 'http://localhost:8080/curso/getall';
  private apiUrldocente = 'http://localhost:8080/usuario/';
  docenteId = localStorage.getItem('userId');
  nombre= localStorage.getItem('nombre');

constructor(private router: Router, private authService: AuthService, private http: HttpClient) {

  }


  ngOnInit() {
    this.cargarDatosDocente();

  }

  cargarDatosDocente() {

    console.log('ID del docente desde localStorage:', this.docenteId);  // Verificar el valor

    this.http.get<any[]>(this.apiUrlGetCursos).subscribe({

      next: (data) => {
        console.log(this.nombre);
        console.log('Datos:', data);
        this.mostrarCursos = data.filter(curso => curso.docente === this.nombre);
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



}
