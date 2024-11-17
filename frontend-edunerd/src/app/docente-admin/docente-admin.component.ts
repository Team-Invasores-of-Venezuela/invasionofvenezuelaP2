import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

interface Docente {
  nombre: string;
  id: string;
  cursos: string[];
}

@Component({
  selector: 'app-docente-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './docente-admin.component.html',
  styleUrls: ['./docente-admin.component.css'],
})
export class DocenteAdminComponent {

  docentes: Docente[] = [];
  selectedDocentes: Set<string> = new Set();
  visible = false;
  selectedFile: File | null = null;
  modoEliminacion = false;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.getDocentes();
  }

  getDocentes(): void {
    this.http.get<Docente[]>('http://localhost:8080/profesor/getall')
      .subscribe(
        (data: Docente[]) => {
          console.log('Docentes obtenidos', data);
          this.docentes = data;
        },
        (error: any) => {
          console.log('Error al obtener los docentes');
        }
      );
  }

  onCheckboxChange(docenteId: string, isChecked: Event): void {
    if (isChecked) {
      this.selectedDocentes.add(docenteId);
    } else {
      this.selectedDocentes.delete(docenteId);
    }
  }

  eliminarDocentes(): void {
    if (this.selectedDocentes.size === 0) {
      alert('Por favor, seleccione al menos un docente para eliminar.');
      return;
    }

    this.selectedDocentes.forEach(docenteId => {
      this.http.post(`http://localhost:8080/profesor/delete?id=${docenteId}`, {})
        .subscribe(
          (response) => {
            console.log(`Docente ${docenteId} eliminado`, response);
            this.getDocentes();
            alert('Docentes eliminados con éxito');
          },
          (error) => {
            console.error('Error al eliminar el docente:', error);
            alert('Ocurrió un error al eliminar los docentes.');
          }
        );
    });
  }

  eliminarDocente(docenteId: string): void {
    this.http.post(`http://localhost:8080/profesor/delete?id=${docenteId}`, {})
      .subscribe(
        (response) => {
          console.log(`Docente ${docenteId} eliminado`, response);
          this.getDocentes();
          alert('Docente eliminado con éxito');
        },
        (error) => {
          console.error('Error al eliminar el docente:', error);
          alert('Ocurrió un error al eliminar el docente.');
        }
      );
  }

  abrirModal() {
    this.visible = true;
  }

  cerrarModal() {
    this.visible = false;
    this.selectedFile = null;
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  subirArchivo() {
    if (!this.selectedFile) {
      alert('Por favor, seleccione un archivo antes de subirlo.');
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.http.post('http://localhost:8080/svc/importarProfesores', formData)
      .subscribe(
        (response) => {
          console.log('Archivo subido exitosamente:', response);
          alert('Archivo subido con éxito.');
          this.cerrarModal();
          this.getDocentes();
        },
        (error) => {
          console.error('Error al subir el archivo:', error);
          alert('Ocurrió un error al subir el archivo.');
        }
      );
  }

  isChecked(docenteId: string): boolean {
    return this.selectedDocentes.has(docenteId);
  }

  toggleModoEliminacion(): void {
    this.modoEliminacion = !this.modoEliminacion;
    this.selectedDocentes.clear(); // Limpiar selección de docentes cuando se cambia de modo
  }

  volverModoNormal(): void {
    this.modoEliminacion = false;
    this.selectedDocentes.clear();
  }

  activarModoEliminacion(): void {
    this.modoEliminacion = true;
    this.selectedDocentes.clear();
  }
}
