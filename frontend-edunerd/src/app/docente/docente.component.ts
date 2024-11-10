import { Component } from '@angular/core';

@Component({
  selector: 'app-docente',
  standalone: true,
  imports: [],
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
