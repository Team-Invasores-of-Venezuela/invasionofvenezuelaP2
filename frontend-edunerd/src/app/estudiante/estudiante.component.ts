import {Component, OnInit} from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router} from '@angular/router';
import {HttpClient, HttpClientModule} from '@angular/common/http';


@Component({
  selector: 'app-estudiante',
  standalone: true,
  imports: [CommonModule,HttpClientModule],
  templateUrl: './estudiante.component.html',
  styleUrl: './estudiante.component.css'
})
export class EstudianteComponent implements OnInit{
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
    console.log("Reportes: ",this.reportes)
  }

  navegarDocente(): void {
    // Limpia el localStorage
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
