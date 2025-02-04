import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Location } from '@angular/common';

@Component({
  standalone: false,
  selector: 'app-change-profile-picture',
  templateUrl: './change-profile-picture.component.html',
  styleUrls: ['./change-profile-picture.component.css'],
})
export class ChangeProfilePictureComponent {
  selectedFile: File | null = null;

  constructor(private userService: UserService, private location: Location) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit(): void {
    if (this.selectedFile && this.selectedFile.size <= 2097152) {
      this.userService.changeProfilePicture(this.selectedFile).subscribe(
        (response) => {
          console.log('Profile picture updated successfully', response);
        },
        (error) => {
          console.error('Error updating profile picture', error);
        }
      );
      this.location.back();
    }
  }
}
