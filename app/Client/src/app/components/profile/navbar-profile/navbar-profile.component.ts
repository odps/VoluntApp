import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { User } from '../../../interfaces/user';
import { UserService } from '../../../services/user.service';
import { environment } from '../../../../environment';
import { Router } from '@angular/router';

import { ProfileService } from '../profile.component';

interface ProfileResponse {
  user: User;
}

@Component({
  selector: 'app-navbar-profile',
  standalone: false,

  templateUrl: './navbar-profile.component.html',
  styleUrl: './navbar-profile.component.scss',
})
export class NavbarProfileComponent implements OnInit {
  user: User | null = null;
  profilePictureUrl: string = '';
  activeView: string = 'posts';

  constructor(
    private userService: UserService,
    private location: Location,
    private router: Router,
    private profileService: ProfileService,
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

  changeSection(section: string) {
    this.profileService.setActiveSection(section);
  }
}
