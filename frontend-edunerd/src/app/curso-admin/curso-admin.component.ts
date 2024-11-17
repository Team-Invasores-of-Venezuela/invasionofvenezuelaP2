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
  cursoSeleccionadoId: string = '';
  archivo: File | null = null;
  cursosTotales: { titulo: string, docente: string,aprendizajes:string[], semestre:string,ano:string } = {titulo: '', docente: '', aprendizajes: [''], semestre: '', ano: ''};
  visible = false;
  abrirAgregarCurso = false;
  private apiUrlcrear = 'http://localhost:8080/curso/create';
  private apiUrleliminar = 'http://localhost:8080/curso/delete';
  abrireliminar=false;
  private apiUrlGetCursos = 'http://localhost:8080/curso/getall';
  mostrarCursos: { id: string, titulo: string, descripcion: string }[] = [];
  slideBarvisible=false;
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.obtenerCursos();
  }

  obtenerCursos() {
    this.http.get<any>(this.apiUrlGetCursos).subscribe({
      next: (data) => {
        this.mostrarCursos = data;
      },
      error: (error) => {
        console.error('Error al obtener los cursos:', error);
        alert('No se pudieron cargar los cursos. Intente nuevamente más tarde.');
      },
    });
  }

  cursos: { id: number; titulo: string; descripcion: string }[] = [
    {
      id:1,
      titulo: 'Matemáticas Avanzadas',
      descripcion: 'Matemáticas Avanzadas ofrece formación especializada en áreas clave de las matemáticas, orientada a la investigación y al desarrollo de actividades científicas de alto nivel'
      },

    {
      id:2,
     titulo: 'Proyecto de titulación ',
      descripcion: 'Proyecto de Titulación guía a los estudiantes en la elaboración de su trabajo final, aplicando los conocimientos adquiridos durante su carrera para desarrollar una investigación académica que demuestre su capacidad y creatividad1' },

    {
      id:3,
      titulo: 'Pensamiento Computacional',
      descripcion: 'Pensamiento Computacional enseña a resolver problemas mediante la lógica y el razonamiento computacional, desarrollando habilidades como la descomposición, la abstracción y el diseño de algoritmos' },
  ];
  protected title: string | undefined;

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
          this.http.post(`${this.apiUrlcrear}`, curso).subscribe({
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

  eliminarCurso() {
    if (!this.cursoSeleccionadoId) {
      alert('Por favor, selecciona un curso para eliminar.');
      return;
    }

    const cursoSeleccionado = this.mostrarCursos.find((curso) => curso.id === this.cursoSeleccionadoId);
    if (!cursoSeleccionado) {
      alert('No se encontró el curso seleccionado.');
      return;
    }

    // @ts-ignore
    this.http.post<any>(`${this.apiUrleliminar}?id=${cursoSeleccionado.id}`).subscribe({
      next: () => {
        alert(`El curso "${cursoSeleccionado.titulo}" ha sido eliminado.`);
        // Actualizar la lista de cursos después de la eliminación
        this.mostrarCursos = this.mostrarCursos.filter((curso) => curso.id !== this.cursoSeleccionadoId);
        this.cerrarFormularioEliminar(); // Cerrar el formulario/modal
      },
      error: (error) => {
        console.error('Error al eliminar el curso:', error);
        alert('Ocurrió un error al intentar eliminar el curso.');
      },
    });
  }





  abrirFormularioEliminar() {
    this.abrireliminar=true;
  }
  cerrarFormularioEliminar() {
    this.abrireliminar=false;
  }
  toggleSidebar(){
    this.slideBarvisible=true;
  }
  CerrartoggleSidebar(){
    this.slideBarvisible=false;
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
