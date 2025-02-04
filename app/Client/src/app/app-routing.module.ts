import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes'; // Importa las rutas definidas en app.routes.ts

@NgModule({
  // Importa RouterModule y configura las rutas usando forRoot
  imports: [RouterModule.forRoot(routes)],
  // Exporta RouterModule para que esté disponible en toda la aplicación
  exports: [RouterModule],
})
export class AppRoutingModule {}
