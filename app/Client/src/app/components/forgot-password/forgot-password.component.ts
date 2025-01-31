import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import{ Router } from '@angular/router'

@Component({
  selector: 'app-forgot-password',
  standalone: false,
  
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  email="";

  constructor(private authService:AuthService, private router:Router){}

  onSubmit(event: Event){
    event.preventDefault();
    this.authService.forgotPassword(this.email);
  }
}
