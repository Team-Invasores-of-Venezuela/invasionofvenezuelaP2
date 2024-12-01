import {Component, OnInit} from '@angular/core';
import { RouterLink, RouterModule, Router } from '@angular/router';
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
  estudiantes: any[] = [];

  private apiUrlGetCursos = 'http://localhost:8080/curso/getall';
  private apiUrlSubirArchivo = 'http://localhost:8080/svc/importarCursos';
  private apiUrlcrear = 'http://localhost:8080/curso/create';
  private apiUrleliminar = 'http://localhost:8080/curso/delete';
  private apiUrlDescargarCursos = 'http://localhost:8080/svc/descargarcursos';
  private amniocenteses: any[] | undefined;
  nombreProfesor: string = '';

  constructor(private http: HttpClient, private router:Router) {}
  mostrarCursos: { nombreProfesor: any; id: any; ano: any; alumnos: any; nombre: any; profesor: any; carrera:any ;seccion: any; semestre: any }[] = [];
  verEditarEstudianteModal = false;
  //protected cursoEditado: any = {};

  ngOnInit() {
    this.obtenerCursos();
    this.getDocentes()
    this.getEstudiantes()
    this.transformarCursos()
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

  transformarCursos() {
    // @ts-ignore
    this.mostrarCursos = this.CURSOS.map(curso => ({
      id: curso.id,
      ano: curso.ano,
      semestre: curso.semestre,
      seccion: curso.seccion,
      nombre: curso.nombre,
      profesor: curso.profesor,
      carrera: curso.carrera,
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

  getEstudiantes(): void {
    this.http.get<any[]>('http://localhost:8080/estudiante/getall').subscribe(
      (response: any[]) => {
        this.estudiantes = response;
        console.log('Estudiantes obtenidos', this.estudiantes);
        this.compararEstudiantes();
      },
      (error) => {
        console.error('Error al obtener estudiantes:', error);
      }
    );
  }

  compararEstudiantes(): void {
    this.mostrarCursos.forEach(curso => {
      //console.log('Curso.alumnos:', curso.alumnos);

      // Validar que `curso.alumnos` no sea nulo
      const alumnosCurso = curso.alumnos || [];
      const alumnosCursoValidados = alumnosCurso.filter((alumno: string) => alumno);

      if (alumnosCursoValidados.length === 0) {
        curso.alumnos = ['No hay estudiantes asignados'];
        //console.log(`Curso: ${curso.nombre}, sin estudiantes asignados`);
        return;
      }

      // Realizar el mapeo entre `d.alumnos` y `estudiantes.matricula`
      curso.alumnos = alumnosCursoValidados.map((matricula: string) => {
        const estudiante = this.estudiantes.find(e => e.matricula?.trim() === matricula.trim());

        if (estudiante) {
          const nombreCompleto = `${estudiante.nombre} ${estudiante.apellidoPaterno || ''} ${estudiante.apellidoMaterno || ''}`.trim();
          return nombreCompleto;
        } else {
          return `Estudiante no encontrado (${matricula})`;
        }
      });

      //console.log(`Curso: ${curso.nombre}, Estudiantes: ${curso.listaEstudiantes.join(', ')}`);
    });
  }



  compararNombreProfesor(): void {
    //console.log("Todos los docentes", this.amniocenteses);
    this.mostrarCursos.forEach(curso => {
      //console.log("Curso.profesor", curso.profesor);

      const profesorRut = curso.profesor ? curso.profesor.trim() : null;

      if (!profesorRut) {
        curso.nombreProfesor = 'Profesor no encontrado';
        //console.log(`Curso: ${curso.nombre}, Profesor no encontrado (RUT inválido)`);
        return;
      }

      // @ts-ignore
      const docente = this.amniocenteses.find(d => {
        const docenteRut = d.rut ? d.rut.trim() : null;
        return docenteRut === profesorRut;
      });

      if (docente) {
        curso.nombreProfesor = docente.nombre;
        //console.log(`Curso: ${curso.nombre}, Profesor: ${curso.nombreProfesor}`);
      } else {
        curso.nombreProfesor = 'Profesor no encontrado';
        //console.log(`Curso: ${curso.nombre}, Profesor no encontrado`);
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

  abrirModalEliminar(curso: any): void {
    this.cursoAEliminar = curso;
    this.mostrarConfirmacionEliminar = true;
  }

  cancelarEliminacion(): void {
    this.cursoAEliminar = null;
    this.mostrarConfirmacionEliminar = false;
  }

  eliminarCurso(): void {
    if (!this.cursoAEliminar) {
      alert('Por favor, selecciona un curso para eliminar.');
      return;
    }

    // @ts-ignore
    this.http.post<any>(`${this.apiUrleliminar}?id=${this.cursoAEliminar.id}`).subscribe({
      next: () => {
        alert(`El curso "${this.cursoAEliminar.nombre}" ha sido eliminado.`);
        this.mostrarCursos = this.mostrarCursos.filter(curso => curso.id !== this.cursoAEliminar.id);
        this.cancelarEliminacion();
      },
      error: (error) => {
        console.error('Error al eliminar el curso:', error);
        alert('Ocurrió un error al intentar eliminar el curso.');
      },
    });
  }

  verEditarCursoModal: boolean = false;
  cursoEditado: any = {};

  abrirEditarCurso(curso: any): void {
    this.cursoEditado = { ...curso }; // Copiar el curso para evitar mutaciones
    this.verEditarCursoModal = true;
  }

  cerrarEditarCursoModal(): void {
    this.cursoEditado = null;
    this.verEditarCursoModal = false;
  }

  editarCurso(): void {
    const { carrera, nombre, ano, semestre, seccion, profesor } = this.cursoEditado;

    if (!carrera || !nombre || !ano || !semestre || !seccion || !profesor) {
      alert('Por favor, completa todos los campos antes de guardar.');
      return;
    }

    const cursoActualizado = {
      id: this.cursoEditado.id,
      carrera,
      nombre,
      ano,
      semestre,
      seccion,
      profesor,
    };

    this.http.post('http://localhost:8080/curso/update', cursoActualizado).subscribe({
      next: () => {
        alert('El curso se ha actualizado exitosamente.');
        this.obtenerCursos(); // Actualizar la lista de cursos
        this.cerrarEditarCursoModal();
      },
      error: (error) => {
        console.error('Error al actualizar el curso:', error);
        alert('Hubo un error al actualizar el curso.');
      },
    });
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

  toggleSidebar() {
    this.slideBarvisible = !this.slideBarvisible;
  }

  abrirModal(): void {
    this.visible = true;
  }

  cerrarModal(): void {
    this.visible = false;
    this.archivo = null;
  }

  // Captura el archivo seleccionado
  onArchivoSeleccionado(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.archivo = input.files[0];
      console.log('Archivo seleccionado:', this.archivo.name);
    }
  }

  subirArchivo(): void {
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

  descargarExcel() {
    this.http.get(this.apiUrlDescargarCursos, { responseType: 'blob' }).subscribe(
      (response) => {
        // Crear un enlace temporal para descargar el archivo
        const a = document.createElement('a');
        const url = window.URL.createObjectURL(response);
        a.href = url;
        a.download = 'cursos.xlsx';  // Nombre del archivo a descargar
        a.click();
        window.URL.revokeObjectURL(url);  // Limpiar el objeto URL
      },
      (error) => {
        console.error('Error al generar el Excel:', error);
        alert('Hubo un problema al generar el archivo Excel.');
      }
    );
  }

  navegarAdmin() {
    this.router.navigate(['/administrador']);
  }
}
