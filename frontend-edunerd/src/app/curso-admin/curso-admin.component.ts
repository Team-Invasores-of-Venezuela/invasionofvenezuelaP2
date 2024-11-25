import {Component, OnInit} from '@angular/core';
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
export class CursoAdminComponent implements OnInit{
  cursoSeleccionadoId: string = '';
  archivo: File | null = null;
  cursos: { id: string; titulo: string; descripcion: string }[] = [];
  cursosTotales: { titulo: string, docente: string,aprendizajes:string[], semestre:number,ano:number } = {titulo: '', docente: '', aprendizajes: [''], semestre: 0, ano: 0};
  visible = false;
  abrirAgregarCurso = false;
  abrireliminar = false;
  slideBarvisible = false;
  CURSOS: any[] = []

  private apiUrlGetCursos = 'http://localhost:8080/curso/getall';
  private apiUrlSubirArchivo = 'http://localhost:8080/svc/importarCursos';
  private apiUrlcrear = 'http://localhost:8080/curso/create';
  private apiUrleliminar = 'http://localhost:8080/curso/delete';
  private amniocenteses: any[] | undefined;
  nombreProfesor: string = '';

  constructor(private http: HttpClient, private router:RouterModule) {}
  mostrarCursos: { nombreProfesor: any; id: any; ano: any; alumnos: any; nombre: any; profesor: any;seccion: any; semestre: any }[] = [];
  verEditarEstudianteModal = false;
  protected cursoEditado: any = {};

  ngOnInit() {
    this.obtenerCursos();
    this.getDocentes()
    this.transformarCursos()
  }

  transformarCursos() {
    // @ts-ignore
    this.mostrarCursos = this.CURSOS.map(curso => ({
      id: curso.id,
      ano: curso.ano,
      semestre: curso.semestre,
      seccion: curso.seccion,
      nombre: curso.nombre,
      profesor: curso.profesor,
      alumnos: curso.alumnos.join(', ')
    }));
  }

  getDocentes(): void {
    this.http.get<any[]>('http://localhost:8080/profesor/getall')
      .subscribe(
        (data: any[]) => {
          console.log('Docentes obtenidos', data);
          this.amniocenteses = data;
          this.compararNombreProfesor()
        },
        (error: any) => {
          console.log('Error al obtener los docentes');
        }
      );
  }

  compararNombreProfesor(): void {
    this.mostrarCursos.forEach(curso => {
      // @ts-ignore
      const docente = this.amniocenteses.find(d => d.rut.trim() === curso.profesor.trim());

      if (docente) {
        curso.nombreProfesor = docente.nombre;
        console.log(`Curso: ${curso.nombre}, Profesor: ${curso.nombreProfesor}`);
      } else {
        curso.nombreProfesor = 'Profesor no encontrado';
        console.log(`Curso: ${curso.nombre}, Profesor no encontrado`);
      }
    });
  }

  dividirMatriculas(curso: any): any[] {
    const alumnos = curso.alumnos;
    const grupos: any[] = [];

    for (let i = 0; i < alumnos.length; i += 5) {
      grupos.push(alumnos.slice(i, i + 5));
    }
    return grupos;
  }


  obtenerCursos() {
    this.http.get<any>(this.apiUrlGetCursos).subscribe({
      next: (data) => {
        this.mostrarCursos = data;
        console.log("mostrarCursos",this.mostrarCursos)
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

          this.http.post(`${this.apiUrlcrear}`, curso).subscribe({
            next: (response) => {
              alert('Curso agregado exitosamente');
              this.cursosTotales = {
                titulo: '',
                docente: '',
                aprendizajes: [''],
                semestre:0,
                ano:0,
              };
              this.abrirAgregarCurso = false;
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
        alert(`El curso "${cursoSeleccionado.nombre}" ha sido eliminado.`);
        this.mostrarCursos = this.mostrarCursos.filter((curso) => curso.id !== this.cursoSeleccionadoId);
        this.cerrarFormularioEliminar();
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
    this.cursoEditado = { ...curso };
    this.verEditarEstudianteModal = true;
  }
  abrirFormularioEliminar() {
    this.abrireliminar=true;
  }
  cerrarFormularioEliminar() {
    this.abrireliminar=false;
  }

  CerrartoggleSidebar(){
    this.slideBarvisible=false;
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
