import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgIf, NgOptimizedImage } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-estudiante-admin',
  standalone: true,
  imports: [RouterModule, RouterLink, FormsModule, NgIf, CommonModule, HttpClientModule, NgOptimizedImage],
  templateUrl: './estudiante-admin.component.html',
  styleUrl: './estudiante-admin.component.css'
})
export class EstudianteAdminComponent implements OnInit {
  verEliminarEstudianteModal: boolean = false;
  verEleccion = false;
  verManual = false;
  verExcel = false;
  estudiantes: any[] = [];
  estudiantesSeleccionados: any[] = [];
  verEditarEstudianteModal = false;
  estudianteEditado: any = {};

  estudiantes: any;
  estudiante: any = {};



  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.getEstudiantes();
  }

  getEstudiantes(): void {
    this.http.get<any[]>('http://localhost:8080/estudiante/getall')
      .subscribe(
        (data: any[]) => {
          this.estudiantes = data;
        },
        (error: any) => {
          console.error('Error al obtener los estudiantes', error);
        }
      );
  }

  abrirEliminarEstudianteModal(): void {
    this.verEliminarEstudianteModal = true;
  }

  cerrarEliminarEstudianteModal(): void {
    this.verEliminarEstudianteModal = false;
    this.estudiantesSeleccionados = [];
  }

  seleccionarEstudiante(estudiante: any): void {
    const index = this.estudiantesSeleccionados.findIndex(e => e.id === estudiante.id);
    if (index === -1) {
      this.estudiantesSeleccionados.push(estudiante);
    } else {
      this.estudiantesSeleccionados = this.estudiantesSeleccionados.filter(e => e.id !== estudiante.id);
    }
  }

  eliminarEstudiante(): void {
    if (this.estudiantesSeleccionados.length > 0) {
      this.estudiantesSeleccionados.forEach(estudiante => {
        const id = estudiante.id;
        this.http.post<any>(`http://localhost:8080/estudiante/delete?id=${id}`, null)
          .subscribe(
            (response) => {
              console.log('Estudiante eliminado:', response);
              this.estudiantes = this.estudiantes.filter(est => est.id !== id);
            },
            (error) => {
              console.error('Error al eliminar el estudiante:', error);
            }
          );
      });
    }


    this.estudiantesSeleccionados = [];
    this.cerrarEliminarEstudianteModal();
  }




  navegarAdministrador() {
    this.router.navigate(['/administrador']);
  }

  cerrarModalEleccion() {
    this.verEleccion = false;
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

  cerrarModalExcel() {
    this.verExcel = !this.verExcel;
  }


  abrirEditarEstudianteModal(estudiante: any): void {
    this.estudianteEditado = { ...estudiante };  // Cargar los datos del estudiante a editar
    this.verEditarEstudianteModal = true;
  }

  cerrarEditarEstudianteModal(): void {
    this.verEditarEstudianteModal = false;
  }

  editarEstudiante(): void {
    const estudianteModificado = this.estudianteEditado;

    const estudianteDTO2 = {
      id: estudianteModificado.id,
      matricula: estudianteModificado.matricula,
      nombre: estudianteModificado.nombre,
      anoIngreso: estudianteModificado.anoIngreso
    };

    // Realizamos la llamada POST al endpoint de actualización
    this.http.post('http://localhost:8080/estudiante/update', estudianteDTO2)
      .subscribe(
        (response) => {
          this.getEstudiantes();
          this.cerrarEditarEstudianteModal();
          this.router.navigate(['/estudianteadmin']);
        },
        error => {
          console.error('Error al actualizar el estudiante:', error);
        }
      );
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
