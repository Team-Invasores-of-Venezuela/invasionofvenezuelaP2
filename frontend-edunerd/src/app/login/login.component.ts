import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule], // Asegúrate de importar HttpClientModule aquí
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  private apiUrl = 'http://localhost:8080/usuario/login';  // Asegúrate de que la URL esté correcta

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient  // Correcta inyección de HttpClient
  ) {
    this.loginForm = this.fb.group({
      email: [''],  // Define el control 'email' en el FormGroup
      contrasena: ['']  // Define el control 'contrasena' en el FormGroup
    });
  }

  onSubmit() {
    const { email, contrasena } = this.loginForm.value;

    if (!email || !contrasena) {
      this.errorMessage = 'Por favor ingrese el correo y la contraseña.';
      return;
    }

    this.http.post<any>(this.apiUrl, { email, contrasena }).subscribe(
      (response) => {
        console.log('Respuesta del servidor:', response);  // Verifica la respuesta
        if (response) {
          //this.router.navigate(['/home']);
          console.log("Funciono coño");
        } else {
          this.errorMessage = 'Usuario o contraseña incorrectos';
        }
      },
      (error) => {
        console.error('Error al autenticar usuario:', error);
        this.errorMessage = 'Hubo un error al intentar iniciar sesión';
      }
    );
  }
}
