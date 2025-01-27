import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';

export const routes: Routes = [
    { path: '', redirectTo: '/landing', pathMatch: 'full' }, // Ruta predeterminada
    { path: 'landing', component: LandingPageComponent } // Ruta de la página de inicio
  ];