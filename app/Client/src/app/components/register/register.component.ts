import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: false,
  
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  name= "";
  email = '';
  password = '';
  password2 = '';
  error = '';

  constructor(private authService: AuthService, private router: Router){}

  onSubmit(event: Event){
    event.preventDefault();
    //Si las contraseñas no coinciden devuelve return
    if(this.password != this.password2){
      this.error = 'Las contraseñas no coinciden';
      return;
    }
    //Llamada al metodo de auth
    this.authService.register(this.name, this.email, this.password, this.password2).subscribe(
      //Manjeo de la respuesta enviada por el backend
      response=>{
        console.log(response);
        if(response.message === "User registered successfully"){
          this.router.navigate(['/login']);
        }
      },
      error => {
        console.log(error); // Agregar este log para ver el contenido del error
        this.error = 'Error en el registro: ' + error.message;
      }
    );
  }
}
