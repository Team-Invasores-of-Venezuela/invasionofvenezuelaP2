import {RouterModule, Routes} from '@angular/router';
import {AdministradorComponent} from'./administrador/administrador.component'
import {DocenteAdminComponent} from './docente-admin/docente-admin.component'
import {CursoAdminComponent} from './curso-admin/curso-admin.component';
import {EstudianteAdminComponent} from './estudiante-admin/estudiante-admin.component';
// @ts-ignore
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import {AppComponent} from './app.component';
import {DocenteComponent} from './docente/docente.component';


export const routes: Routes = [
  { path: 'administrador', component: AdministradorComponent },
  { path: 'docenteadmin', component: DocenteAdminComponent},
  { path: 'cursoadmin', component: CursoAdminComponent},
  { path: 'estudianteadmin', component: EstudianteAdminComponent},
  { path: 'login', component: LoginComponent },
  { path: 'docente', component: DocenteComponent},
  { path: '', component: LoginComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
