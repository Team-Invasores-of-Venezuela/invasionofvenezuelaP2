import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Docente {
  nombre: string;
  id: string;
  cursos: string[];
}

@Component({
  selector: 'app-docente-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './docente-admin.component.html',
  styleUrls: ['./docente-admin.component.css'],
})
export class DocenteAdminComponent {
  docentes: Docente[] = [];
  selectedDocentes: Set<string> = new Set();
  visible = false;
  selectedFile: File | null = null;
  modoEliminacion = false;
  nuevoDocenteVisible = false;
  nuevoDocenteNombre: string = '';
  nuevoDocenteCursos: string = '';
  showModal: boolean = false;
  idEditar: string = '';
  nombreEditar: string = '';
  cursosEditar: string = '';
  nuevoDocente: any = { nombre: '', id: '' };

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
    this.selectedDocentes.clear();
  }

  volverModoNormal(): void {
    this.modoEliminacion = false;
    this.selectedDocentes.clear();
  }

  activarModoEliminacion(): void {
    this.modoEliminacion = true;
    this.selectedDocentes.clear();
  }

  docente={id: ""};
  mostrarFormularioRegistro(): void {
    this.nuevoDocenteVisible = true;
  }

  ocultarFormularioRegistro(): void {
    this.nuevoDocenteVisible = false;
    this.nuevoDocenteNombre = '';
    this.nuevoDocenteCursos = '';
  }

  registrarDocente(): void {
    if (!this.nuevoDocenteNombre || !this.nuevoDocenteCursos) {
      alert('Por favor, complete todos los campos.');
      return;
    }

    const cursos = this.nuevoDocenteCursos.split(',').map(curso => curso.trim());
    const nuevoDocente: Docente = { nombre: this.nuevoDocenteNombre, id: '', cursos };

    this.http.post<Docente>('http://localhost:8080/profesor/create', nuevoDocente)
      .subscribe(
        (response: Docente) => {
          console.log('Docente registrado exitosamente', response);
          alert('Docente registrado con éxito.');
          this.getDocentes();
          this.ocultarFormularioRegistro();
        },
        (error) => {
          console.error('Error al registrar el docente:', error);
          alert('Ocurrió un error al registrar el docente.');
        }
      );
  }

  abrirModalEditar(docente: Docente): void {
    if (docente) {
      this.idEditar = docente.id;
      this.nombreEditar = docente.nombre;
      this.cursosEditar = docente.cursos.join(', ');
      this.showModal = true;  // Mostrar el modal
    } else {
      console.error('Docente no encontrado');
    }
  }

  guardarEdicion(): void {
    const idEditarCadena = this.idEditar.toString().trim();

    if (!idEditarCadena) {
      alert('Por favor, ingrese un ID válido.');
      return;
    }

    const docenteExistente = this.docentes.find(docente => docente.id === idEditarCadena);

    if (!docenteExistente) {
      alert('No se encontró un docente con el ID ingresado.');
      return;
    }

    const nombre = this.nombreEditar?.trim();
    console.log('Nombre recibido:', nombre);

    if (!nombre) {
      alert('Debe ingresar un nombre.');
      return;
    }

    const cursos = this.nuevoDocenteCursos.split(',').map(curso => curso.trim()).filter(curso => curso.length > 0);
    console.log('Cursos procesados:', cursos);

    if (cursos.length === 0) {
      alert('Debe ingresar al menos un curso.');
      return;
    }

    const docenteActualizado: Docente = {
      nombre: nombre,
      id: idEditarCadena,
      cursos: cursos
    };

    this.http.post('http://localhost:8080/profesor/update', docenteActualizado).subscribe(
      (response) => {
        alert('Docente actualizado con éxito.');
        this.getDocentes();
        this.cerrarModal();
      },
      (error) => {
        console.error('Error al actualizar el docente:', error);
        alert('Ocurrió un error al actualizar el docente.');
      }
    );
  }

  cerrarModalEditar() {
    this.showModal = false;
    // @ts-ignore
    this.docente = {};
  }

  navegarAdmin() {
    this.router.navigate(['/administrador']);
  }
}
