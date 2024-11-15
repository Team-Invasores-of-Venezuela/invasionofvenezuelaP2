import { Component } from '@angular/core';
import {Router, RouterLink, RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {CommonModule, NgIf} from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-estudiante-admin',
  standalone: true,
  imports: [RouterModule, RouterLink, FormsModule, NgIf, CommonModule, HttpClientModule],
  templateUrl: './estudiante-admin.component.html',
  styleUrl: './estudiante-admin.component.css'
})
export class EstudianteAdminComponent {
  estudiantes: any[] = [];
  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
      this.getEstudiantes();
      console.log('Estudiantes: ',this.estudiantes);
  }

  getEstudiantes(): void {
    this.http.get<any[]>('http://localhost:8080/estudiante/getall')
      .subscribe(
        (data: any[]) => {
          console.log('Publicaciones cargadas', data);

          this.estudiantes = data;
        },
        (error: any) => {
          console.error('Error al obtener los estudiantes', error);
        }
      );
  }
}
