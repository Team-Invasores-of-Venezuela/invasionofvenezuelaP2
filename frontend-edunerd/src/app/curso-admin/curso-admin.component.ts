import { Component } from '@angular/core';
import {RouterLink, RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {CommonModule, NgIf} from '@angular/common';

@Component({
  selector: 'app-curso-admin',
  standalone: true,
  imports: [RouterModule, RouterLink, FormsModule, NgIf, CommonModule],
  templateUrl: './curso-admin.component.html',
  styleUrl: './curso-admin.component.css'
})
export class CursoAdminComponent {
  archivo: File | null = null;

  //cursos: any[] = [];

  cursos = [
    { imagen: 'https://blog.lioren.io/wp-content/uploads/2022/01/herramientas-y-recursos-para-crear-curso-online.png',
      nombre: 'Matemáticas Avanzadas',
      descripcion: 'Matemáticas Avanzadas ofrece formación especializada en áreas clave de las matemáticas, orientada a la investigación y al desarrollo de actividades científicas de alto nivel' },

    { imagen: 'https://blog.coursify.me/wp-content/uploads/2019/08/retencao-de-alunos-cursos-online.jpg',
      nombre: 'Proyecto de titulación ',
      descripcion: 'Proyecto de Titulación guía a los estudiantes en la elaboración de su trabajo final, aplicando los conocimientos adquiridos durante su carrera para desarrollar una investigación académica que demuestre su capacidad y creatividad1' },

    { imagen: 'https://www.shutterstock.com/image-photo/online-education-completion-theme-hand-600nw-2503988417.jpg',
      nombre: 'Pensamiento Computacional',
      descripcion: 'Pensamiento Computacional enseña a resolver problemas mediante la lógica y el razonamiento computacional, desarrollando habilidades como la descomposición, la abstracción y el diseño de algoritmos' },
  ];

  visible = false;

  abrirModal() {
    this.visible = true;
  }

  cerrarModal() {
    this.visible = false;
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.archivo = input.files[0];
    }
  }

  subirArchivo() {
    if (this.archivo) {
      console.log('Archivo seleccionado:', this.archivo.name);
    } else {
      console.log('No se seleccionó ningún archivo');
    }
    this.cerrarModal();
  }
}
