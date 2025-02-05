import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environment';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user';
import { Profile } from '../../interfaces/profile';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: false,

  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  user: User | null = null;
  profilePictureUrl: string = '';
  baseUrl = environment.baseUrl;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.loadUserProfileHeader();
  }

  loadUserProfileHeader() {
    this.userService.getUserProfile().subscribe({
      next: (response: { user: User; profile: Profile }) => {
        this.user = response.user;
        this.profilePictureUrl = `${environment.baseUrl}/${response.profile.profile_picture_route}`;
      },
    });
  }

  cerrarSesion() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
