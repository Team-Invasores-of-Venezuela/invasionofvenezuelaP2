import { Component } from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-docente',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './docente.component.html',
  styleUrl: './docente.component.css'
})
export class DocenteComponent {
  estudiantes: any [] | any;
  curso: string | null = null;

  viewStudents(nombreCurso: string) {
    this.curso = nombreCurso;
  }
}
