import { Routes, RouterModule } from '@angular/router';
// @ts-ignore
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import {AppComponent} from './app.component';
import {DocenteComponent} from './docente/docente.component';

export const routes: Routes = [
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
