import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { User } from '../../../interfaces/user';
import { UserService } from '../../../services/user.service';
import { environment } from '../../../../environment';
import { Router } from '@angular/router';

interface ProfileResponse {
  user: User;
}

@Component({
  selector: 'app-eventos-profile',
  standalone: false,

  templateUrl: './eventos-profile.component.html',
  styleUrl: './eventos-profile.component.scss',
})
export class EventosProfileComponent implements OnInit {
  user: User | null = null;
  profilePictureUrl: string = '';
  activeView: string = 'eventos';

  constructor(
    private userService: UserService,
    private location: Location,
    private router: Router,
  ) {}

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

  toSettings() {
    this.router.navigate(['/settings']);
  }
  setActiveView(view: string): void {
    this.activeView = view;
  }
}
