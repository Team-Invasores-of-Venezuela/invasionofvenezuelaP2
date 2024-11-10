import {RouterModule, Routes} from '@angular/router';
import {AdministradorComponent} from'./administrador/administrador.component'
import {NgModule} from '@angular/core';

export const routes: Routes = [
  { path: 'administrador', component: AdministradorComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
