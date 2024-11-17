import { Component } from '@angular/core';
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
export class DocenteComponent {
  docente: any[] | any;
  estudiantes: any [] | any;
  curso: string | null = null;


  constructor(private router: Router, private authService: AuthService, private http: HttpClient) {

  }
  private apiUrl = 'http://localhost:8080/usuario/'

  ngOnInit() {
    const docenteId = localStorage.getItem('userId');
    if (docenteId) {
      this.http.get<any>(`${this.apiUrl}docente/${docenteId}`)
        .subscribe(
          (response) => {
            this.docente = response;
            console.log('Datos del docente:', this.docente);
          },
          (error) => {
            console.error('Error al obtener datos del docente:', error);
          }
        );
    }
  }


  cerrarSesion() {
    // Elimina los datos almacenados de sesión
    localStorage.removeItem('userId');
    localStorage.removeItem('isAdmin');

    // Redirige al usuario a la página de login
    this.router.navigate(['/login']);
  }

  viewStudents(nombreCurso: string) {
    this.curso = nombreCurso;
  }
}
