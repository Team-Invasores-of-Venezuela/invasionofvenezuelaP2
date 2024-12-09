import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { CommonModule, NgIf } from '@angular/common';
import { AuthService } from '../AuthService';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string | null = null;
  mostrarmodal= false;
  recoveryEmail: string | null = null;
  recoveryMessage: string | null = null;
  mostrarmodalcodigo: boolean = false;
  verificationCode: string | null = null;
  newPassword : string | null = null;
  confirmPassword : string | null = null;

  private apiUrl = 'http://localhost:8080/usuario/login';
  private recoveryUrl = 'http://localhost:8080/usuario/recover';

  claro = false;

  ngOnInit() {
    this.cargarTema();
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

          localStorage.setItem('userId', response.id);
          localStorage.setItem('rut', response.rut);
          localStorage.setItem('isAdmin', response.admin.toString());
          localStorage.setItem('email', response.email);
          localStorage.setItem('nombre', response.nombre);
          localStorage.setItem('imagen', response.imagen);

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

  showModal() {
    this.mostrarmodal=!this.mostrarmodal;
  }

  showModalCodigo(){
    this.mostrarmodalcodigo = !this.mostrarmodalcodigo;
    this.recoveryMessage="";
  }

  sendRecoveryEmail(): void {
    if (!this.recoveryEmail) {
      this.recoveryMessage = 'Por favor, ingrese su correo para recuperar la contraseña.';
      return;
    }
    console.log(this.recoveryEmail, "barbaridades loquiticas");
    this.http.post<any>('http://localhost:8080/usuario/existeusuario', null, { params: { email: this.recoveryEmail } }).subscribe(
      (response) => {
        if (response?.exist) {
          this.recoveryMessage = 'Usuario encontrado.';
          this.recoveryMessage='';
          this.showModal()
          this.showModalCodigo()
        } else {
          this.recoveryMessage = 'No se encontró un usuario con ese correo.';
        }
      },
      (error) => {
        console.error('Error al verificar el usuario:', error);
        this.recoveryMessage = 'Hubo un error al intentar recuperar la contraseña.';
      }
    );
  }



  asignarNuevaContrasena(): void {
    if (this.verificationCode !== '12345') {
      this.recoveryMessage = 'Código de verificación incorrecto.';
      return;
    }

    if (!this.newPassword || !this.confirmPassword) {
      this.recoveryMessage = 'Por favor, ingrese y confirme la nueva contraseña.';
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      this.recoveryMessage = 'Las contraseñas no coinciden.';
      return;
    }


    console.log('La nueva contraseña ha sido asignada correctamente');
    this.recoveryMessage = null;
    const usuarioDTO = {
      email: this.recoveryEmail,
      contrasena: this.newPassword
    };
    this.http.post<{ success: boolean }>('http://localhost:8080/usuario/cambiarcontraseña', usuarioDTO)
      .subscribe({
        next: (response) => {
          if (response.success) {
            console.log('La nueva contraseña ha sido asignada correctamente');
            alert('Contraseña actualizada con éxito!');
            this.showModalCodigo();
          } else {
            this.recoveryMessage = 'Hubo un error al cambiar la contraseña.';
          }
        },
        error: (error) => {
          console.error('Error al realizar la solicitud:', error);
          this.recoveryMessage = 'Ocurrió un error al intentar cambiar la contraseña.';
        }
      });



  }
}
