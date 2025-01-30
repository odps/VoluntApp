/*import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: false,
  
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

}*/

import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  email = '';
  password = '';
  error = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    // Llamada al servicio de autenticación
    this.authService.login(this.email, this.password).subscribe(
      // Manejo de la respuesta exitosa
      response => {
        if (response.token) {
          console.log('Login exitoso, token:', response.token);
          // Guardar el token JWT en el almacenamiento local
          localStorage.setItem('jwtToken', response.token);
          this.router.navigate(['/main']);
        } else {
          this.error = 'Credenciales incorrectas';
        }
      },
      // Manejo de errores
      error => {
        this.error = 'Error en el inicio de sesión';
        console.error('Error:', error);
      }
    );
  }
}



