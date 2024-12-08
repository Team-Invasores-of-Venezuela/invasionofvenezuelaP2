import {Component, HostListener, OnInit} from '@angular/core';
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
export class AdministradorComponent implements OnInit{
  mostrarFormulario = false;
  email : string | null | undefined
  nombre:string | null | undefined;
  image: string | null | undefined;
  isadmin: string | null |undefined
  cambiarFoto:boolean=false;
  showModal: boolean = false;
  newImageUrl: string='';
  timeoutId: any;
  adminData = {
    email: '',
    contrasena: '',
    admin: true,
    rut: ''
  };

  backendUrl = 'http://localhost:8080/usuario/registeradmin';

  ngOnInit() {
    this.cargarTema();
    this.image=localStorage.getItem("imagen");
    this.email=localStorage.getItem("email")
    this.isadmin=localStorage.getItem("isAdmin");

    console.log(this.email, "locura");
    console.log(this.image," locura");
    if (this.email) {
      this.nombre = this.email.split('@')[0];
    }


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

  cerrarSesion() {
    // Elimina los datos almacenados de sesión
    localStorage.removeItem('userId');
    localStorage.removeItem('isAdmin');

    // Redirige al usuario a la página de login
    this.router.navigate(['/login']);
  }

  cerrarCambioFotoAdmin(){
    this.cambiarFoto = !this.cambiarFoto;
  }

  cambiarFotoAdmin() {
    if (this.email && this.newImageUrl) {
      const imagenDTO = {
        email: this.email,
        imagen: this.newImageUrl
      };

      console.log(this.email)

      this.http.post('http://localhost:8080/usuario/cambiarimagen', imagenDTO).subscribe(
        (response: any) => {
          console.log('Respuesta del servidor:', response);
          if (response.success) {
            alert('Imagen cambiada exitosamente');
            localStorage.setItem('imagen', imagenDTO.imagen);
            this.image=imagenDTO.imagen;
          } else {
            alert('Error al cambiar la imagen');
          }
        },
        (error) => {
          console.error('Error de la solicitud:', error);
          alert('Hubo un error al cambiar la imagen');
        }
      );
    } else {
      alert('Por favor, complete todos los campos');
    }
  }


  cambiarModalAdmin() {

    this.showModal = !this.showModal ;

  }






}
