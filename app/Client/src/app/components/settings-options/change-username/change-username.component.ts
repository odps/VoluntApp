import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  standalone: false,
  selector: 'app-change-username',
  templateUrl: './change-username.component.html',
  styleUrls: ['./change-username.component.css'],
})
export class ChangeUsernameComponent {
  nickname: string = '';
  message: string = '';

  constructor(
    private userService: UserService,
    private forms: FormsModule,
    private location: Location
  ) {}

  onSubmit() {
    this.changeNickname();
    this.location.back();
  }

  changeNickname() {
    this.userService.changeProfileNickname(this.nickname).subscribe(
      (response) => {
        this.message = 'Nickname modificado correctamente: ' + response.message;
      },
      (error) => {
        this.message = 'Error al cambiar nickname: ' + error.message;
      }
    );
  }
}
