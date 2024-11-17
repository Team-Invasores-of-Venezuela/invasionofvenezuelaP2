import {Component, OnInit} from '@angular/core';
import {Router, RouterLink, RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {CommonModule, NgIf, NgOptimizedImage} from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-estudiante-admin',
  standalone: true,
  imports: [RouterModule, RouterLink, FormsModule, NgIf, CommonModule, HttpClientModule, NgOptimizedImage],
  templateUrl: './estudiante-admin.component.html',
  styleUrl: './estudiante-admin.component.css'
})
export class EstudianteAdminComponent implements OnInit{

  verEleccion = false;
  verManual = false;
  verExcel = false;
  estudiantes: any;
  estudiante: any = {};



  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
      this.getEstudiantes();
      console.log('Estudiantes: ',this.estudiantes);
  }

  getEstudiantes(): void {
    this.http.get<any[]>('http://localhost:8080/estudiante/getall')
      .subscribe(
        (data: any[]) => {
          console.log('Estudiantes obtenidos', data);

          this.estudiantes = data;
        },
        (error: any) => {
          console.error('Error al obtener los estudiantes', error);
        }
      );
  }

  navegarAdministrador() {
    this.router.navigate(['/administrador']);
  }

  modalEleccion() {
    this.verEleccion = !this.verEleccion;
  }

  modalManual() {
    this.verManual = !this.verManual;
  }

  modalExcel() {
    this.verExcel = !this.verExcel;
  }

  onSubmit() {
    const estudianteCreado = {
      nombre: this.estudiante.nombre,
      matricula: this.estudiante.matricula,
      anoIngreso: this.estudiante.anoIngreso
    };

    this.http.post('http://localhost:8080/estudiante/create', estudianteCreado)
      .subscribe(
        (response: any) => {
          console.log('Estudiante añadido exitosamente', response);
        },
        (error: any) => {
          console.error('Error al crear estudiante', error);
        });
  }
}
