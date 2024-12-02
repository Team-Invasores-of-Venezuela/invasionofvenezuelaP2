import {Component, OnInit} from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-estudiante',
  standalone: true,
  imports: [CommonModule],
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
  positivas: string | null = "";
  negativas:  string | null = "";
  mostrarObservaciones: boolean = false;

  reportes: any[] =[
    { observacion: "Participa activamente de la clase", puntaje: 4 },
    { observacion: "Se rie con sus compañeros mientras el docente esta haciendo su clase", puntaje: -3 },
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
    { observacion: "Muestra una actitud respetuosa hacia sus compañeros y el docente", puntaje: 5 },
  ];

  constructor(private router: Router) {}

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

}
