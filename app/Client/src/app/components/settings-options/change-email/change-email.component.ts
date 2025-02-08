import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-change-email',
  standalone: false,

  templateUrl: './change-email.component.html',
  styleUrl: './change-email.component.scss',
})
export class ChangeEmailComponent {
  emailForm: FormGroup;
  message: string = '';
  submitted: boolean = false;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private location: Location,
  ) {
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.emailForm.valid) {
      this.changeEmail();
      this.location.back();
    }
  }

  changeEmail() {
    this.userService.changeEmail(this.emailForm.value.email).subscribe(
      (response) => {
        this.message = 'Email modificado correctamente: ' + response.message;
      },
      (error) => {
        this.message = 'Error al cambiar Email: ' + error.message;
      },
    );
  }
}
