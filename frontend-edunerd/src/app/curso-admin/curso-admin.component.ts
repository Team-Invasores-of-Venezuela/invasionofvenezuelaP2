import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-curso-admin',
  standalone: true,
  imports: [RouterModule, RouterLink, FormsModule, NgIf, CommonModule, HttpClientModule],
  templateUrl: './curso-admin.component.html',
  styleUrls: ['./curso-admin.component.css']
})
export class CursoAdminComponent {
  cursoSeleccionadoId: string = '';
  archivo: File | null = null;
  cursos: { id: string; titulo: string; descripcion: string }[] = [];
  visible = false;
  abrirAgregarCurso = false;
  abrireliminar = false;
  slideBarvisible = false;

  private apiUrlGetCursos = 'http://localhost:8080/curso/getall';
  private apiUrlSubirArchivo = 'http://localhost:8080/svc/importarCursos';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.obtenerCursos();
  }

  obtenerCursos() {
    this.http.get<any>(this.apiUrlGetCursos).subscribe({
      next: (data) => {
        this.cursos = data;
      },
      error: (error) => {
        console.error('Error al obtener los cursos:', error);
        alert('No se pudieron cargar los cursos. Intente nuevamente más tarde.');
      },
    });
  }

  abrir() {
    this.abrirAgregarCurso = true;
  }

  cerrar() {
    this.abrirAgregarCurso = false;
  }

  abrirModal() {
    this.visible = true;
  }

  cerrarModal() {
    this.visible = false;
    this.archivo = null;
  }

  toggleSidebar() {
    this.slideBarvisible = !this.slideBarvisible;
  }

  onArchivoSeleccionado(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.archivo = input.files[0];
      console.log('Archivo seleccionado:', this.archivo.name);
    }
  }

  subirArchivo() {
    if (this.archivo) {
      const formData = new FormData();
      formData.append('file', this.archivo);

      this.http.post(this.apiUrlSubirArchivo, formData).subscribe({
        next: () => {
          alert('Archivo subido exitosamente.');
          this.cerrarModal();
        },
        error: (error) => {
          console.error('Error al subir el archivo:', error);
          alert('Hubo un problema al subir el archivo.');
        },
      });
    } else {
      alert('Por favor, seleccione un archivo antes de subir.');
    }
  }
}
