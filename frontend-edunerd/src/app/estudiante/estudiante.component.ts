import {Component, OnInit} from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {Router} from '@angular/router';
import {HttpClient, HttpClientModule} from '@angular/common/http';

interface Reporte {
  puntaje: number;
  descripcion: string;
}

interface newReporte {
  matricula: string|null;
  puntaje: number;
  descripcion: string;
  cursoId: string|null;
}

@Component({
  selector: 'app-estudiante',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './estudiante.component.html',
  styleUrl: './estudiante.component.css'
})
export class EstudianteComponent implements OnInit{
  private apiURL = "http://localhost:8080/reporte/nuevoreporte";
  nombre: string | null = "";
  apellidoPaterno: string | null ="";
  apellidoMaterno: string | null ="";
  rut: string | null = null;
  numMatricula: string | null ="";
  fecIngreso: string | null ="";
  imagen: string | null ="";
  positivas: any;
  negativas: any;
  total: number = 0;
  mostrarObservaciones: boolean = false;
  mostrarFormulario: boolean = false;
  mostrarModal: boolean = false;

  reportesAPI: Reporte[] = [];

  nuevoReporte: Reporte = {
    puntaje: 0,
    descripcion: ''
  };

  puntajeOptions = [
    { value: -5, label: 'Plagio (-5)' },
    { value: 2, label: 'Participación en clases (2)' },
    { value: 2, label: 'Chistes chistosos (2)' },
    { value: -2, label: 'Mal olor (-2)' },
    { value: -3, label: 'Lenguaje obsceno (-3)' },
    { value: 3, label: 'Tareas entregadas a tiempo (3)' },
    { value: -4, label: 'Uso de dispositivos no autorizados (-4)' },
    { value: 2, label: 'Ayuda a compañeros (2)' },
    { value: 1, label: 'Puntualidad (1)' },
    { value: -3, label: 'Distracción (-3)' }
  ];

  reportes: any[] =[
    //{ observacion: "Participa activamente de la clase", puntaje: 4 },
    /*{ observacion: "Se rie con sus compañeros mientras el docente esta haciendo su clase", puntaje: -3 },
    { observacion: "Entrega las tareas a tiempo y con buena calidad", puntaje: 5 },
    { observacion: "Interrumpe a sus compañeros cuando están hablando", puntaje: -2 },
    { observacion: "Demuestra interés al hacer preguntas relevantes durante la clase", puntaje: 4 },
    { observacion: "Olvida traer el material necesario para las clases", puntaje: -3 },
    { observacion: "Ayuda a sus compañeros cuando tienen dudas", puntaje: 4 },
    { observacion: "Llega tarde regularmente a las clases", puntaje: -4 },
    { observacion: "Se concentra y toma notas detalladas durante las explicaciones", puntaje: 5 },
    { observacion: "Habla en voz alta sobre temas ajenos a la clase", puntaje: -3 },
    { observacion: "Propone soluciones creativas durante las actividades grupales", puntaje: 4 },
    { observacion: "No presta atención y usa el teléfono móvil durante la clase", puntaje: -5 },
    { observacion: "Responde correctamente cuando se le hacen preguntas directas", puntaje: 3 },
    { observacion: "Se ausenta sin justificación frecuente", puntaje: -4 },
    { observacion: "Muestra una actitud respetuosa hacia sus compañeros y el docente", puntaje: 5 },*/
  ];
  private matricula: any;

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(){
    this.nombre = localStorage.getItem('nombreEstudiante');
    this.apellidoPaterno = localStorage.getItem('apellidoPaterno');
    this.apellidoMaterno = localStorage.getItem('apellidoMaterno');
    this.rut = localStorage.getItem('rutEstudiante')
    this.numMatricula = localStorage.getItem('numMatricula');
    this.fecIngreso = localStorage.getItem('fecIngreso');
    this.imagen = localStorage.getItem('imagen');
    this.positivas = localStorage.getItem('positivas');
    this.negativas = localStorage.getItem('negativas');
    this.getReportes(this.numMatricula);
    console.log("Estudiante: ",this.nombre,this.apellidoPaterno,this.apellidoMaterno,this.rut,this.numMatricula,this.fecIngreso,this.imagen);
    console.log("Reportes: ",this.reportes);
    console.log("Id del Curso", localStorage.getItem('SOYUNCURSO'));
    console.log("Matricula del Alumno", localStorage.getItem('numMatricula'));

    if (!this.numMatricula) {
      console.error('No se encontró numMatricula en localStorage');
    } else {
      console.log('Matrícula cargada:', this.numMatricula);
    }
  }

  navegarDocente(): void {
    // Limpia el localStorage
    localStorage.removeItem('SOYUNCURSO')
    localStorage.removeItem('idDocente');
    localStorage.removeItem('idAlumno')
    localStorage.removeItem('nombreEstudiante');
    localStorage.removeItem('apellidoPaterno');
    localStorage.removeItem('apellidoMaterno');
    localStorage.removeItem('rutEstudiante');
    localStorage.removeItem('numMatricula');
    localStorage.removeItem('fecIngreso');
    localStorage.removeItem('imagen');
    localStorage.removeItem('positivas');
    localStorage.removeItem('negativas');

    // Navega a la ruta \docente
    this.router.navigate(['/docente']);
  }

  crearReporte(): void {
    if (this.nuevoReporte.puntaje && this.nuevoReporte.descripcion) {
      const newReporte2: newReporte = {
        matricula: this.numMatricula,
        puntaje: this.nuevoReporte.puntaje,
        descripcion: this.nuevoReporte.descripcion,
        cursoId: localStorage.getItem('SOYUNCURSO')
      };

      this.http.post<newReporte>(this.apiURL, newReporte2).subscribe(
        (response: newReporte) => {
          console.log('Reporte registrado exitosamente', response);
          alert('Reporte registrado con éxito.');
        },
        (error) => {
          console.log('Detalles del error:', error);
          console.error('Error al registrar el docente:', error);
          alert('Ocurrió un error al registrar el docente.');
        }
      );

      this.nuevoReporte = { puntaje: 0, descripcion: '' };
      this.mostrarFormulario = false;
      console.log(this.reportesAPI);
    }
  }

  private apiUrlmostrar = 'http://localhost:8080/reporte/getreporte';

  mostrarModalConReportes(): void {
    this.mostrarModal = true;

    if (!this.numMatricula) {
      console.error('No se encontró la matrícula en localStorage');
      this.reportes = [];
      return;
    }

    this.http.get<any[]>(`${this.apiUrlmostrar}?matricula=${this.numMatricula}`).subscribe(
      (data: any[]) => {
        this.reportes = data;
        console.log("Reportes obtenidos", data)
      },
      (error: any) => {
        console.error('Error al obtener los reportes:', error);
        this.reportes = [];
      }
    );
  }

  cerrarModal(): void {
    this.mostrarModal = false;
  }

  descargarCartaPDF(): void {
    if (!this.numMatricula) {
      console.error('No se encontró la matrícula');
      return;
    }

    this.http.get(`http://localhost:8080/svc/descargarpdf?matricula=${this.numMatricula}`, {
      responseType: 'blob'
    })
      .subscribe(
        (data: Blob) => {
          const blob = new Blob([data], { type: 'application/pdf' });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'carta_estudiante.pdf';
          a.click();
          window.URL.revokeObjectURL(url);
        },
        (error) => {
          console.error('Error al descargar el PDF:', error);
        }
      );
  }




  getReportes(matricula: any): void {
    this.http.get<any[]>(`http://localhost:8080/reporte/getreporte?matricula=${encodeURIComponent(matricula)}`)
      .subscribe(
        (data: any[]) => {
          console.log('Reportes obtenidos', data);
          this.reportes = data;
          this.setPositivas();
          this.setNegativas();
          this.setTotal();
          console.log('Resumen reportes:',this.positivas,",",this.negativas,",",this.total);
        },
        (error: any) => {
          console.error('Error al obtener los estudiantes', error);
        }
      );
  }

  setPositivas(): void {
    this.positivas = 0;
    for(let i = 0; i < this.reportes.length; i++) {
      if(this.reportes[i].puntaje > 0){
        // @ts-ignore
        this.positivas++;
      }
    }
  }

  setNegativas(): void {
    this.negativas = 0;
    for(let i = 0; i < this.reportes.length; i++) {
      if(this.reportes[i].puntaje < 0){
        // @ts-ignore
        this.negativas++;
      }
    }
  }

  setTotal(): void {
    // @ts-ignore
    this.total = this.positivas - this.negativas;
  }

}
