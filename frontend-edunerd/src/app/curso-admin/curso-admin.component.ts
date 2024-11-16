import {Component, input} from '@angular/core';
import {Event, NavigationError, RouterLink, RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {CommonModule, NgIf} from '@angular/common';
import {HttpClient, HttpClientModule} from '@angular/common/http';

@Component({
  selector: 'app-curso-admin',
  standalone: true,
  imports: [RouterModule, RouterLink, FormsModule, NgIf, CommonModule, HttpClientModule],
  templateUrl: './curso-admin.component.html',
  styleUrl: './curso-admin.component.css'
})
export class CursoAdminComponent {
  archivo: File | null = null;
  cursosTotales: { titulo: string, docente: string,aprendizajes:string[], semestre:string,ano:string } = {titulo: '', docente: '', aprendizajes: [''], semestre: '', ano: ''};

  visible = false;
  abrirAgregarCurso = false;
  private apiUrl = 'http://localhost:8080/curso/create';
  constructor(private http: HttpClient) {

  }

  cursos = [
    {
      titulo: 'Matemáticas Avanzadas',
      descripcion: 'Matemáticas Avanzadas ofrece formación especializada en áreas clave de las matemáticas, orientada a la investigación y al desarrollo de actividades científicas de alto nivel'
      },

    {
     titulo: 'Proyecto de titulación ',
      descripcion: 'Proyecto de Titulación guía a los estudiantes en la elaboración de su trabajo final, aplicando los conocimientos adquiridos durante su carrera para desarrollar una investigación académica que demuestre su capacidad y creatividad1' },

    {
      titulo: 'Pensamiento Computacional',
      descripcion: 'Pensamiento Computacional enseña a resolver problemas mediante la lógica y el razonamiento computacional, desarrollando habilidades como la descomposición, la abstracción y el diseño de algoritmos' },
  ];

  agregarCurso() {
    if (this.cursosTotales.titulo.trim()) {
      if (this.cursosTotales.ano.trim()) {
        if (this.cursosTotales.docente.trim()) {
          let aprendizajesProcesados: string[] = [];

          // Verificar el tipo de 'aprendizajes' y asegurarse de que siempre sea un arreglo de cadenas
          if (Array.isArray(this.cursosTotales.aprendizajes)) {
            // Si 'aprendizajes' ya es un arreglo, procesamos cada elemento
            aprendizajesProcesados = this.cursosTotales.aprendizajes.map((item: string) => item.trim());
          } else if (typeof this.cursosTotales.aprendizajes === 'string') {
            // Si 'aprendizajes' es un string, lo dividimos en un arreglo
            // @ts-ignore
            aprendizajesProcesados = this.cursosTotales.aprendizajes.split(',').map((item: string) => item.trim());
          } else {
            // Si 'aprendizajes' no es ni un arreglo ni un string, dejamos un arreglo vacío
            console.warn('El campo de aprendizajes no tiene un formato válido');
            aprendizajesProcesados = [];
          }

          const curso = {
            titulo: this.cursosTotales.titulo,
            docente: this.cursosTotales.docente,
            aprendizajes: aprendizajesProcesados,
            semestre: this.cursosTotales.semestre,
            ano: this.cursosTotales.ano,
          };

          // Enviar curso al backend
          this.http.post(`${this.apiUrl}`, curso).subscribe({
            next: (response) => {
              alert('Curso agregado exitosamente');
              this.cursosTotales = {
                titulo: '',
                docente: '',
                aprendizajes: [''], // Reinicia el campo de aprendizajes
                semestre: '',
                ano: '',
              };
              this.abrirAgregarCurso = false; // Cierra el modal
            },
            error: (error) => {
              console.error('Error al agregar el curso:', error);
              alert('Ocurrió un error al intentar agregar el curso.');
            },
          });
        } else {
          alert('Por favor, complete todos los campos del formulario.');
        }
      } else {
        alert('Por favor, complete todos los campos del formulario.');
      }
    } else {
      alert('Por favor, complete todos los campos del formulario.');
    }
  }









  abrirModal() {
    this.visible = true;
  }
  abrir() {
    this.abrirAgregarCurso = true;
  }
  cerrar() {
    this.abrirAgregarCurso=false;
  }

  cerrarModal() {
    this.visible = false;
  }

  subirArchivo() {
    if (this.archivo) {
      console.log('Archivo seleccionado:', this.archivo.name);
    } else {
      console.log('No se seleccionó ningún archivo');
    }
    this.cerrarModal();
  }
}
