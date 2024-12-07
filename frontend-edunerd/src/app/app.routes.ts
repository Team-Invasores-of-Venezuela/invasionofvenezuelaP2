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
import {AuthGuard} from './auth.guard';
import {EstudianteComponent} from './estudiante/estudiante.component';


export const routes: Routes = [
  { path: 'administrador', component: AdministradorComponent, canActivate: [AuthGuard]  },
  { path: 'docenteadmin', component: DocenteAdminComponent, canActivate: [AuthGuard] },
  { path: 'cursoadmin', component: CursoAdminComponent, canActivate: [AuthGuard]},
  { path: 'estudianteadmin', component: EstudianteAdminComponent, canActivate: [AuthGuard] },
  { path: 'estudiante', component: EstudianteComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'docente', component: DocenteComponent, canActivate: [AuthGuard] },
  { path: '', component: LoginComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
