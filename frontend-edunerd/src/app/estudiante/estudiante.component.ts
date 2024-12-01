import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-estudiante',
  standalone: true,
  imports: [],
  templateUrl: './estudiante.component.html',
  styleUrl: './estudiante.component.css'
})
export class EstudianteComponent implements OnInit{
  nombre: string | null = "";
  apellidoPaterno: string | null ="";
  apellidoMaterno: string | null ="";
  reportes: any[] =[
    { observacion: "Participa activamente de la clase", puntaje: 4 },
    { observacion: "Se rie con sus compañeros mientras el docente esta haciendo su clase", puntaje: -3 },
    { observacion: "", puntaje: 75 },
    { observacion: "Observación 4", puntaje: 88 },
    { observacion: "Observación 5", puntaje: 92 }
  ];

  ngOnInit(){
    this.nombre = localStorage.getItem('nombreEstudiante');
    this.apellidoPaterno = localStorage.getItem('apellidoPaterno');
    this.apellidoMaterno = localStorage.getItem('apellidoMaterno');
    console.log("Estudiante: ",this.nombre,this.apellidoPaterno,this.apellidoMaterno);
  }

}
