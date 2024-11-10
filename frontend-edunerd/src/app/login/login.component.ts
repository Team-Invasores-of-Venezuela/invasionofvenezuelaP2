import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  private apiUrl = 'http://localhost:8080/login';
  private http: any;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: [''],
      password: ['']
    });
  }

  onSubmit() {
    const { username, password } = this.loginForm.value;

    if (!username || !password) {
      this.errorMessage = 'Por favor ingrese el correo y la contraseña.';
      return;
    }

    // @ts-ignore
    this.http.post<any>(this.apiUrl, { username, password }).subscribe(
      (response: { success: any; message: string; }) => {
        console.log('Respuesta del servidor:', response);  // Verifica la respuesta
        if (response && response.success) {
          this.router.navigate(['/home']);
        } else {
          this.errorMessage = response.message || 'Usuario o contraseña incorrectos';
        }
      },
      (error: any) => {
        console.error('Error al autenticar usuario:', error);
        this.errorMessage = 'Hubo un error al intentar iniciar sesión';
      }
    );
  }

}
