import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {AdministradorComponent} from'./administrador/administrador.component'
import {DocenteAdminComponent} from './docente-admin/docente-admin.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterModule,HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend-edunerd';
  constructor(private router: Router ) {
  }
}
