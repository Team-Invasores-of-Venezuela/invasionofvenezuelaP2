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
  cursosTotales: { titulo: string, docente: string,aprendizajes:string[], semestre:number,ano:number } = {titulo: '', docente: '', aprendizajes: [''], semestre: 0, ano: 0};
  visible = false;
  abrirAgregarCurso = false;
  private apiUrlcrear = 'http://localhost:8080/curso/create';
  private apiUrleliminar = 'http://localhost:8080/curso/delete';
  abrireliminar=false;
  private apiUrlGetCursos = 'http://localhost:8080/curso/getall';
  mostrarCursos: { id: string, titulo: string, docente: string, aprendizajes:string[],ano:number,semestre:number }[] = [];
  slideBarvisible=false;
  constructor(private http: HttpClient, private router:RouterModule) {}
  verEditarEstudianteModal = false;
  protected cursoEditado: any = {};

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

  protected title: string | undefined;

  agregarCurso() {
    if (this.cursosTotales.titulo.trim()) {
      if (this.cursosTotales.ano.toString().trim()) {
        if (this.cursosTotales.docente.trim()) {
          let aprendizajesProcesados: string[] = [];

          if (Array.isArray(this.cursosTotales.aprendizajes)) {

            aprendizajesProcesados = this.cursosTotales.aprendizajes.map((item: string) => item.trim());
          } else if (typeof this.cursosTotales.aprendizajes === 'string') {
            // @ts-ignore
            aprendizajesProcesados = this.cursosTotales.aprendizajes.split(',').map((item: string) => item.trim());
          } else {

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
                semestre:0,
                ano:0,
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

  mostrarConfirmacionEliminar = false;
  cursoAEliminar: any = null;

  confirmarEliminacion(curso: any) {
    this.cursoAEliminar = curso;
    this.mostrarConfirmacionEliminar = true;
  }

  cancelarEliminacion() {
    this.cursoAEliminar = null;
    this.mostrarConfirmacionEliminar = false;
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

  editarCurso(): void {
    const cursoModificado = this.cursoEditado;

    const curso = {
      id: this.cursoEditado.id,
      titulo: this.cursoEditado.titulo,
      docente: this.cursoEditado.docente,
      aprendizajes:this.cursoEditado.aprendizajes,
      semestre:this.cursoEditado.semestre,
      ano:this.cursoEditado.ano
    };

    // Realizamos la llamada POST al endpoint de actualización
    this.http.post('http://localhost:8080/curso/update',curso)
      .subscribe(
        (response) => {

          this.obtenerCursos();
          this.cerrarEditarCursoModal();
        },
        error => {
          console.error('Error al actualizar el curso:', error);
        }
      );
  }



  cerrarEditarCursoModal() {
    this.verEditarEstudianteModal=false;
  }
  abrirEditarCurso(curso: any) {
    this.cursoEditado = { ...curso }; // Copia los datos del curso para editar
    this.verEditarEstudianteModal = true; // Abre el modal
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
