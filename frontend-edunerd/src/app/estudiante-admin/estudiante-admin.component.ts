import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

interface Estudiante {
  nombre: string;
  matricula: string;
  cursos: string[];
  mostrarAsignaturas: boolean;
}

@Component({
  selector: 'app-estudiante-admin',
  templateUrl: './estudiante-admin.component.html',
  standalone: true,
  styleUrls: ['./estudiante-admin.component.css'],
  imports: [CommonModule]
})
export class EstudianteAdminComponent {
  visible = false;
  estudiantes: Estudiante[] = [];
  selectedFile: File | null = null;

  // Estudiantes hardcodeados
  estudiantesHardcodeados: Estudiante[] = [
    { matricula: '2021407020', nombre: 'Gustavo Torres', cursos: ['Construcción de Software', 'Redes de Computadores', 'Responsabilidad social', 'Ingeniería Comercial'], mostrarAsignaturas: false },
    { matricula: '2021407019', nombre: 'Mapote Palote', cursos: ['Teoría de sistemas', 'Modelos discretos'], mostrarAsignaturas: false },
    { matricula: '2020407020', nombre: 'Franco Bersolo', cursos: ['Física General', 'Fundamentos de Administración', 'Construcción de Software', 'Redes de Computadores', 'Sistemas Operativos', 'Máquinas Abstractas'], mostrarAsignaturas: false },
    { matricula: '2022451016', nombre: 'Anais Saavedra', cursos: ['Derecho Penal', 'Derecho Administrativo', 'Derecho del Trabajo', 'Drechos Reales', 'Derecho Procesal', 'Contexto Cultural'], mostrarAsignaturas: false },
  ];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    console.log('Estudiantes hardcodeados: ', this.estudiantesHardcodeados);
    this.estudiantes = [...this.estudiantesHardcodeados];
    this.getEstudiantes();
  }

  getEstudiantes(): void {
    this.http.get<Estudiante[]>('http://localhost:8080/estudiante/getall')
      .subscribe(
        (data: Estudiante[]) => {
          console.log('Estudiantes obtenidos', data);
          this.estudiantes = [...this.estudiantesHardcodeados, ...data];
        },
        (error: any) => {
          console.error('Error al obtener los estudiantes', error);
        }
      );
  }

  navegarAdministrador() {
    this.router.navigate(['/administrador']);
  }

  abrirModal() {
    this.visible = true;
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
}
