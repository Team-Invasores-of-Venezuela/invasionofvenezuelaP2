import { Component } from '@angular/core';
import {RouterLink, RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {CommonModule, NgIf} from '@angular/common';

@Component({
  selector: 'app-estudiante-admin',
  standalone: true,
  imports: [RouterModule, RouterLink, FormsModule, NgIf, CommonModule],
  templateUrl: './estudiante-admin.component.html',
  styleUrl: './estudiante-admin.component.css'
})
export class EstudianteAdminComponent {

}
