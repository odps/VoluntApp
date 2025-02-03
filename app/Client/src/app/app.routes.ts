/*import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' }, // Ruta predeterminada
    { path: 'login', component: LoginComponent } // Ruta de la página de login
  ];*/




// Importaciones necesarias de Angular
import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { RegisterComponent } from './components/register/register.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { FriendsComponent } from './components/friends/friends.component';
import { PostsComponent } from './components/posts/posts.component';
import { ProfileComponent } from './components/profile/profile.component';

// Definición de las rutas de la aplicación
export const routes: Routes = [
  // Ruta predeterminada que redirige a la página de login
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  // Ruta para el componente de login
  { path: 'login', component: LoginComponent },
  //Ruta para el componente de main
  { path: 'main', component: MainComponent },
  //Ruta para el componente de register
  {path: 'register', component: RegisterComponent},
  //Ruta para el componente de forgot-password
  {path: 'forgot-password', component: ForgotPasswordComponent},
  //Ruta para el componente de amigos
  {path: 'friends', component: FriendsComponent},
  //Ruta para el componente de amigos
  {path: 'posts', component: PostsComponent},
  //Ruta para el componente de amigos
  {path: 'profile', component: ProfileComponent},
];