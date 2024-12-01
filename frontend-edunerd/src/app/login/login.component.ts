import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {CommonModule, NgIf} from '@angular/common';
import {AuthService} from '../AuthService';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginForm: FormGroup;
  errorMessage: string | null = null;

  private apiUrl = 'http://localhost:8080/usuario/login';

  ngOnInit() {
    this.cargarTema()
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: [''],
      contrasena: ['']
    });
  }

  claro = false;

  modoOscuro(): void {
    this.claro = !this.claro;
    this.actualizarTema();
  }

  private cargarTema(): void {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      this.claro = true;
      document.documentElement.classList.add('dark');
    } else {
      this.claro = false;
      document.documentElement.classList.remove('dark');
    }
  }

  private actualizarTema(): void {
    const htmlElement = document.documentElement;
    if (this.claro) {
      htmlElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      htmlElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }


  onSubmit() {
    const { email, contrasena } = this.loginForm.value;

    if (!email || !contrasena) {
      this.errorMessage = 'Por favor ingrese el correo y la contraseña.';
      return;
    }

    this.http.post<any>(this.apiUrl, { email, contrasena }).subscribe(
      (response) => {
        console.log('Respuesta del servidor:', response);
        if (response) {
          this.errorMessage = null;
          console.log(response)

          localStorage.setItem('userId', response.id);
          localStorage.setItem('rut', response.rut);
          localStorage.setItem('isAdmin', response.admin.toString());
          localStorage.setItem("email",response.email);
          localStorage.setItem('nombre', response.nombre);
          localStorage.setItem("imagen",response.imagen);

          if (response.admin) {
            this.router.navigate(['/administrador']);
          } else {
            this.router.navigate(['/docente']);
          }
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
