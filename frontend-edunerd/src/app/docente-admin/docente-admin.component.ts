import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common'; // Asegúrate de importar CommonModule

// Definir la interfaz para los docentes
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

  docentes: Docente[] = [];  // Usar la interfaz Docente
  visible = false;  // Controlar la visibilidad del modal
  selectedFile: File | null = null;  // Archivo seleccionado para subir

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.getDocentes();  // Llamar a la función para obtener docentes al cargar el componente
  }

  // Función para obtener los docentes desde el backend
  getDocentes(): void {
    this.http.get<Docente[]>('http://localhost:8080/profesor/getall')  // Asegúrate de tener el endpoint correcto
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

  // Abrir modal para cargar archivo
  abrirModal() {
    this.visible = true;
  }

  // Cerrar modal
  cerrarModal() {
    this.visible = false;
    this.selectedFile = null;  // Reiniciar el archivo seleccionado
  }

  // Capturar el archivo seleccionado
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  // Subir archivo de docentes
  subirArchivo() {
    if (!this.selectedFile) {
      alert('Por favor, seleccione un archivo antes de subirlo.');
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.http.post('http://localhost:8080/svc/importarProfesores', formData)  // Asegúrate de tener el endpoint correcto
      .subscribe(
        (response) => {
          console.log('Archivo subido exitosamente:', response);
          alert('Archivo subido con éxito.');
          this.cerrarModal();  // Cerrar el modal después de subir el archivo
          this.getDocentes();  // Volver a obtener la lista de docentes
        },
        (error) => {
          console.error('Error al subir el archivo:', error);
          alert('Ocurrió un error al subir el archivo.');
        }
      );
  }
}
