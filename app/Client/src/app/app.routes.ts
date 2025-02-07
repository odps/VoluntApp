// Importaciones necesarias de Angular
import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { RegisterComponent } from './components/register/register.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { FriendsComponent } from './components/friends/friends.component';
import { PostsComponent } from './components/posts/posts.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SettingsComponent } from './components/settings/settings.component';
import { ChangeUsernameComponent } from './components/settings-options/change-username/change-username.component';
import { ChangeBioComponent } from './components/settings-options/change-bio/change-bio.component';
import { ChangeEmailComponent } from './components/settings-options/change-email/change-email.component';
import { ChangeProfilePictureComponent } from './components/settings-options/change-profile-picture/change-profile-picture.component';
import { GroupsComponent } from './components/groups/groups.component';


// Definición de las rutas de la aplicación
export const routes: Routes = [
  // Ruta predeterminada que redirige a la página de login
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  // Ruta para el componente de login
  { path: 'login', component: LoginComponent },
  //Ruta para el componente de main
  { path: 'main', component: MainComponent },
  //Ruta para el componente de register
  { path: 'register', component: RegisterComponent },
  //Ruta para el componente de forgot-password
  { path: 'forgot-password', component: ForgotPasswordComponent },
  //Ruta para el componente de amigos
  { path: 'friends', component: FriendsComponent },
  //Ruta para el componente de amigos
  { path: 'posts', component: PostsComponent },
  //Ruta para el componente de amigos
  { path: 'profile', component: ProfileComponent },
  //Ruta para el componente de ajustes de usuario.
  { path: 'settings', component: SettingsComponent },
  //Rutas de cada opcion contenida dentro de users
  { path: 'settings/change-bio', component: ChangeBioComponent },
  { path: 'settings/change-email', component: ChangeEmailComponent },
  { path: 'settings/change-picture', component: ChangeProfilePictureComponent },
  { path: 'settings/change-username', component: ChangeUsernameComponent },
  //Ruta para el componente de grupos
  { path: 'groups', component: GroupsComponent }
];
