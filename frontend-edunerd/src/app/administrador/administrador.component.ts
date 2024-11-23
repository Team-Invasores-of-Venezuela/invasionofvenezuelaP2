import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgIf, CommonModule } from '@angular/common'; // Asegúrate de importar CommonModule
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-administrador',
  standalone: true,
  imports: [HttpClientModule,FormsModule,CommonModule,RouterLink],
  templateUrl: './administrador.component.html',
  styleUrl: './administrador.component.css'
})
export class AdministradorComponent {
  constructor(private router: Router) {
  }
  navegarCursoAdmin() {
    this.router.navigate(['/cursoadmin']);
  }
  navegarDocenteAdmin() {
    this.router.navigate(['/docenteadmin']);
  }
  navegarEstudianteAdmin() {
    this.router.navigate(['/estudianteadmin']);
  }

  cerrarSesion() {
    // Elimina los datos almacenados de sesión
    localStorage.removeItem('userId');
    localStorage.removeItem('isAdmin');

    // Redirige al usuario a la página de login
    this.router.navigate(['/login']);
  }
}
