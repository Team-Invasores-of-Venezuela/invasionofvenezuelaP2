import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {AdministradorComponent} from'./administrador/administrador.component'
import {DocenteAdminComponent} from './docente-admin/docente-admin.component'
import {CursoAdminComponent} from './curso-admin/curso-admin.component';
import {EstudianteAdminComponent} from './estudiante-admin/estudiante-admin.component';


export const routes: Routes = [
  { path: 'administrador', component: AdministradorComponent },
  { path: 'docenteadmin', component: DocenteAdminComponent},
  { path: 'cursoadmin', component: CursoAdminComponent},
  { path: 'estudianteadmin', component: EstudianteAdminComponent},];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
