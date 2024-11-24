import {Component, OnInit} from '@angular/core';
import {Router, RouterLink, RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {CommonModule, NgIf, NgOptimizedImage} from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';

interface Estudiante {
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  matricula: string;
  fechaIngreso: string;
  rut: string;
  urlFoto: string;
  mostrarAsignaturas: boolean;
}

@Component({
  selector: 'app-estudiante-admin',
  templateUrl: './estudiante-admin.component.html',
  standalone: true,
  styleUrls: ['./estudiante-admin.component.css'],
  imports: [CommonModule, FormsModule]
})
export class EstudianteAdminComponent implements OnInit{

  verEleccion = false;
  verManual = false;
  verExcel = false;
  estudiantes: any;
  estudiante: any = {};

  verEliminarEstudianteModal = false;
  estudiantesSeleccionados: any[] = [];
  estudianteEditado: any = {};
  verEditarEstudianteModal = false;
  visible = false;
  selectedFile: File | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.getEstudiantes();
    console.log('Estudiantes: ',this.estudiantes);
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

  cerrarModal() {
    this.visible = false;
    this.selectedFile = null;
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      console.log('Archivo seleccionado:', file.name);
    }
  }

  subirArchivo() {
    if (!this.selectedFile) {
      alert('Por favor, seleccione un archivo antes de subirlo.');
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.http.post('http://localhost:8080/svc/importarEstudiantes', formData)
      .subscribe(
        response => {
          console.log('Archivo subido exitosamente:', response);
          alert('Archivo subido con éxito.');
          this.cerrarModal();
        },
        error => {
          console.error('Error al subir el archivo:', error);
          alert('Ocurrió un error al subir el archivo.');
        }
      );
  }

  modalExcel() {
    this.verExcel = !this.verExcel;
  }

  abrirExcelModal() {
    this.verExcel = true;
  }

  abrirEliminarEstudianteModal(): void {
    this.verEliminarEstudianteModal = true;
  }

  abrirEditarEstudianteModal(estudiante: any): void {
    this.estudianteEditado = { ...estudiante };  // Cargar los datos del estudiante a editar
    this.verEditarEstudianteModal = true;
  }

  cerrarEditarEstudianteModal(): void {
    this.verEditarEstudianteModal = false;
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
              this.estudiantes = this.estudiantes.filter((est: { id: any; }) => est.id !== id);
            },
            (error) => {
              console.error('Error al eliminar el estudiante:', error);
            }
          );
      });
    }
  }

  cerrarEliminarEstudianteModal(): void {
    this.verEliminarEstudianteModal = false;
    this.estudiantesSeleccionados = [];
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

}
