import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user.service';
import { environment } from '../../../environment';

interface ProfileResponse {
  user: User;
}

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: User | null = null;
  profilePictureUrl: string = '';

  constructor(private userService: UserService, private location: Location) {}

  ngOnInit() {
    this.loadUserProfile();
  }

  loadUserProfile() {
    this.userService.getUserProfile().subscribe({
      next: (response: ProfileResponse) => {
        this.user = response.user;
        this.profilePictureUrl = `${environment.baseUrl}/${response.user.profile.profile_picture_route}`;
      },
      error: (error) => console.error('Error loading profile:', error),
    });
  }

  goBack() {
    this.location.back();
  }
}
