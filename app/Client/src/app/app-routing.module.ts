/*import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {path:'', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }*/
// Importaciones necesarias de Angular




import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes'; // Importa las rutas definidas en app.routes.ts

@NgModule({
  // Importa RouterModule y configura las rutas usando forRoot
  imports: [RouterModule.forRoot(routes)],
  // Exporta RouterModule para que esté disponible en toda la aplicación
  exports: [RouterModule]
})
export class AppRoutingModule { }