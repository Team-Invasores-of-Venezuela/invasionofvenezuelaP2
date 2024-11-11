import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from '../app.routes';
import { NgIf, CommonModule } from '@angular/common'; // Asegúrate de importar CommonModule
import { RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-docente-admin',
  standalone: true,
  imports: [RouterModule, RouterLink, FormsModule, NgIf, CommonModule],
  templateUrl: './docente-admin.component.html',
  styleUrls: ['./docente-admin.component.css']
})
export class DocenteAdminComponent {

}
