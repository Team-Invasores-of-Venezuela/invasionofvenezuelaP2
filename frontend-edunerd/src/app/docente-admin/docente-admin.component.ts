import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {getXHRResponse} from 'rxjs/internal/ajax/getXHRResponse';

interface Docente {
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  rut: string;
  titulo: string;
  gradoMax: string;
  //id: string;
}

@Component({
  selector: 'app-docente-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './docente-admin.component.html',
  styleUrls: ['./docente-admin.component.css'],
})
export class DocenteAdminComponent implements OnInit{
  docentes: Docente[] = [];
  selectedDocentes: Set<string> = new Set();
  visible = false;
  selectedFile: File | null = null;
  modoEliminacion = false;
  nuevoDocenteVisible = false;
  nuevoDocenteNombre: string = '';
  nuevoDocenteApellidoP:string = '';
  nuevoDocenteApellidoM:string = '';
  nuevoDocenteRut:string = '';
  nuevoDocenteTitulo:string = '';
  nuevoDocenteGrado:string = '';
  nuevoDocenteId :string = '';
  showModal: boolean = false;
  idEditar: string = '';
  nombreEditar: string = '';
  apellidoPEditar: string = '';
  apellidoMEditar: string = '';
  rutEditar: string = '';
  tituloEditar: string = '';
  gradoEditar: string = '';
  modoEliminar: boolean = false;
  nuevoDocente: Docente = {
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    rut: '',
    titulo: '',
    gradoMax: '',
    //id: ''
  };


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

  onCheckboxChange(docenteRut: string, isChecked: Event): void {
    if (docenteRut && docenteRut.trim() !== "") { // Asegúrate de que el rut no sea nulo ni vacío
      if (isChecked) {
        this.selectedDocentes.add(docenteRut);
        console.log(`Docente con rut ${docenteRut} agregado a la selección`);
      } else {
        this.selectedDocentes.delete(docenteRut);
        console.log(`Docente con rut ${docenteRut} eliminado de la selección`);
      }

      console.log('Selected Docentes:', Array.from(this.selectedDocentes)); // Verificar contenido del conjunto
    } else {
      console.error('El rut del docente es inválido:', docenteRut); // Log para identificar rut inválido
    }
  }



  eliminarDocentes(): void {
    if (this.selectedDocentes.size === 0) {
      console.error('No hay docentes seleccionados para eliminar');
      alert('Por favor, seleccione al menos un docente para eliminar.');
      return;
    }

    console.log('Docentes seleccionados para eliminar:', Array.from(this.selectedDocentes));

    this.selectedDocentes.forEach(docenteRut => {
      // Asegúrate de que docenteRut no sea null ni vacío
      if (docenteRut && docenteRut.trim() !== "") {
        this.http.post(`http://localhost:8080/profesor/delete?rut=${docenteRut}`, {})
          .subscribe(
            (response) => {
              console.log(`Docente con rut ${docenteRut} eliminado`, response);
              this.getDocentes();  // Actualiza la lista de docentes
              alert('Docentes eliminados con éxito');
            },
            (error) => {
              console.error('Error al eliminar el docente:', error);
              alert('Ocurrió un error al eliminar los docentes.');
            }
          );
      } else {
        console.error('El rut del docente es inválido:', docenteRut);
      }
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
  ActivarModoEliminacion(): void {
    this.modoEliminar = true;
  }

  VolverModoNormal(): void {
    this.modoEliminar = false;
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

  isChecked(docenteRut: string): boolean {
    return this.selectedDocentes.has(docenteRut);
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
    this.nuevoDocenteApellidoP = '';
    this.nuevoDocenteApellidoM = '';
    this.nuevoDocenteRut = '';
    this.nuevoDocenteGrado = '';
    this.nuevoDocenteTitulo = '';
    this.nuevoDocenteId = '';
  }

  registrarDocente(): void {
    if (!this.nuevoDocente.rut || !this.nuevoDocente.nombre || !this.nuevoDocente.apellidoPaterno ||
      !this.nuevoDocente.apellidoMaterno || !this.nuevoDocente.titulo || !this.nuevoDocente.gradoMax) {
      alert('Por favor, complete todos los campos.');
      return;
    }

    // Crear el objeto Docente
    console.log('Datos originales de nuevoDocente:', this.nuevoDocente);

    const docente: Docente = {
      nombre: this.nuevoDocenteNombre,
      apellidoPaterno: this.nuevoDocenteApellidoP,
      apellidoMaterno: this.nuevoDocenteApellidoM,
      rut: this.nuevoDocenteRut,
      titulo: this.nuevoDocenteTitulo,
      gradoMax: this.nuevoDocenteGrado
    };

    const docenteDatos: Docente = { ...this.nuevoDocente };

    console.log('Datos enviados al backend (docenteDatos):', docenteDatos);

    this.http.post<Docente>('http://localhost:8080/profesor/create', docenteDatos).subscribe(
      (response: Docente) => {
        console.log('Docente registrado exitosamente', response);
        alert('Docente registrado con éxito.');
        this.getDocentes();
        this.ocultarFormularioRegistro();
      },
      (error) => {
        console.log('Detalles del error:', error);
        console.error('Error al registrar el docente:', error);
        alert('Ocurrió un error al registrar el docente.');
      }
    );

  }

  abrirModalEditar(docente: Docente): void {
    if (docente) {
      //this.idEditar = docente.id;
      this.nombreEditar = docente.nombre;
      this.showModal = true;
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

    //const docenteExistente = this.docentes.find(docente => docente.id === idEditarCadena);
    /*
    if (!docenteExistente) {
      alert('No se encontró un docente con el ID ingresado.');
      return;
    }*/

    const nombre = this.nombreEditar?.trim();
    console.log('Nombre recibido:', nombre);

    if (!nombre) {
      alert('Debe ingresar un nombre.');
      return;
    }

    let docenteActualizado: Docente;
    docenteActualizado = {
      nombre: nombre,
      apellidoPaterno: this.apellidoPEditar,
      apellidoMaterno: this.apellidoMEditar,
      rut: this.rutEditar,
      titulo: this.tituloEditar,
      gradoMax: this.gradoEditar,
      //id: this.idEditar
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
