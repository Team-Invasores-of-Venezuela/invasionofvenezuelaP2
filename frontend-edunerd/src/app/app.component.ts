import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {LoginComponent} from './login/login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']  // Corrección en el nombre
})
export class AppComponent {
  title = 'frontend-edunerd';
}
