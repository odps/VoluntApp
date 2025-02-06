import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-change-bio',
  standalone: false,
  templateUrl: './change-bio.component.html',
  styleUrls: ['./change-bio.component.css'],
})
export class ChangeBioComponent {
  bio: string = '';
  message: string = '';

  constructor(
    private userService: UserService,
    private forms: FormsModule,
    private location: Location
  ) {}

  onSubmit() {
    this.changeBio();
    this.location.back();
  }

  changeBio() {
    this.userService.changeProfileBio(this.bio).subscribe(
      (response) => {
        this.message = 'Bio modificada correctamente: ' + response.message;
      },
      (error) => {
        this.message = 'Error al cambiar bio: ' + error.message;
      }
    );
  }
}
