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
  private apiUrlDescargarEstudiantes = 'http://localhost:8080/svc/descargarestudiantes';

  slideBarvisible = false;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.getEstudiantes();
    console.log('Estudiantes: ',this.estudiantes);
    console.log('Estudiantes: ',this.estudiantes);
    this.cargarTema();
  }

  claro = false;

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

  CerrartoggleSidebar(){
    this.slideBarvisible=false;
  }

  toggleSidebar() {
    this.slideBarvisible = !this.slideBarvisible;
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
  cerrarModalEleccion() {
    this.verEleccion = false;
  }

  modalManual() {
    this.verManual = !this.verManual;
  }

  cerrarModalManual() {
    this.verManual = false;
  }

  cerrarModal() {
    this.visible = false;
    this.selectedFile = null;
    this.verExcel = false;
  }

  cerrarModalExcel(){
    this.verExcel = false;
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
    this.cerrarModalEleccion()
  }

  abrirExcelModal() {
    this.verExcel = true;
    this.verEleccion=false;
  }

  abrirEliminarEstudianteModal(): void {
    this.verEliminarEstudianteModal = true;
  }

  abrirEditarEstudianteModal(estudiante: any): void {
    this.estudianteEditado = { ...estudiante };
    this.verEditarEstudianteModal = true;
  }

  cerrarEditarEstudianteModal(): void {
    this.verEditarEstudianteModal = false;
    this.estudianteEditado = null;
  }

  onSubmit() {
    const estudianteCreado = {
      nombre: this.estudiante.nombre,
      apellidoPaterno: this.estudiante.apellidoPaterno,
      apellidoMaterno: this.estudiante.apellidoMaterno,
      rut: this.estudiante.rut,
      matricula: this.estudiante.matricula,
      fechaNacimiento: this.estudiante.fechaNacimiento,
      fechaIngreso: this.estudiante.fechaIngreso,
      urlfoto: this.estudiante.urlfoto,
      contadorPositvo: 0,
      contadorNegativo: 0
    };

    this.http.post('http://localhost:8080/estudiante/create', estudianteCreado)
      .subscribe(
        (response: any) => {
          console.log('Estudiante añadido exitosamente', response);
          this.getEstudiantes();
          this.cerrarModalManual();
        },
        (error: any) => {
          console.error('Error al crear estudiante', error);
        }
      );
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
              this.cerrarEliminarEstudianteModal();
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
    this.mostrarConfirmacionEliminar=false;
  }
  mostrarConfirmacionEliminar = false;
  estudianteAEliminar: any = null;

  confirmarEliminacion(estudiante: any) {
    this.estudianteAEliminar = estudiante;
    this.mostrarConfirmacionEliminar = true;
  }

  cancelarEliminacion() {
    this.estudianteAEliminar = null;
    this.mostrarConfirmacionEliminar = false;
  }

  editarEstudiante(): void {
    const estudianteModificado = {
      ...this.estudianteEditado, // Incluimos los campos editados
      fechaNacimiento: this.estudianteEditado.fechaNacimiento, // Mantenemos los valores originales
      fechaIngreso: this.estudianteEditado.fechaIngreso
    };

    const estudianteDTO2 = {
      id: estudianteModificado.id,
      nombre: estudianteModificado.nombre,
      apellidoPaterno: estudianteModificado.apellidoPaterno,
      apellidoMaterno: estudianteModificado.apellidoMaterno,
      matricula: estudianteModificado.matricula,
      rut: estudianteModificado.rut,
      urlfoto: estudianteModificado.urlfoto,
      fechaNacimiento: estudianteModificado.fechaNacimiento,
      fechaIngreso: estudianteModificado.fechaIngreso
    };

    this.http.post('http://localhost:8080/estudiante/update', estudianteDTO2)
      .subscribe(
        (response) => {
          console.log('Estudiante actualizado:', response);
          this.getEstudiantes(); // Actualiza la lista de estudiantes
          this.cerrarEditarEstudianteModal();
        },
        error => {
          console.error('Error al actualizar el estudiante:', error);
        }
      );
  }

  descargarExcelEstudiantes() {
    this.http.get(this.apiUrlDescargarEstudiantes, { responseType: 'blob' }).subscribe(
      (response) => {
        // Crear un enlace temporal para descargar el archivo
        const a = document.createElement('a');
        const url = window.URL.createObjectURL(response);
        a.href = url;
        a.download = 'estudiantes.xlsx'; // Nombre del archivo a descargar
        a.click();
        window.URL.revokeObjectURL(url); // Liberar el objeto URL
      },
      (error) => {
        console.error('Error al generar el Excel de estudiantes:', error);
        alert('Hubo un problema al generar el archivo Excel de estudiantes.');
      }
    );
  }

  navegarAdmin() {
    this.router.navigate(['/administrador']);
  }

}
