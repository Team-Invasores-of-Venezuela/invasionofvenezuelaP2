import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgIf, CommonModule } from '@angular/common'; // Asegúrate de importar CommonModule
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-administrador',
  standalone: true,
  imports: [HttpClientModule,FormsModule,CommonModule],
  templateUrl: './administrador.component.html',
  styleUrl: './administrador.component.css'
})
export class AdministradorComponent {
  mostrarFormulario = false;

  adminData = {
    email: '',
    contrasena: '',
    admin: true,
    rut: ''
  };
  backendUrl = 'http://localhost:8080/usuario/registeradmin';
  registrarAdmin() {
    this.http.post(this.backendUrl, this.adminData).subscribe(
      (response) => {
        alert('Administrador registrado con éxito');
        this.limpiarFormulario();
        this.mostrarFormulario = false;
      },
      (error) => {
        console.error(error);
        alert('Error al registrar el administrador');
      }
    );
  }

  limpiarFormulario() {
    this.adminData = {
      email: '',
      contrasena: '',
      admin: true,
      rut: ''
    };
  }
  constructor(private http: HttpClient, private router: Router) {
  }
  alternarFormulario() {
    this.mostrarFormulario = !this.mostrarFormulario;
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
}
