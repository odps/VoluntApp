import { Component } from '@angular/core';
import { User } from '../../interfaces/user';
import { environment } from '../../../environment';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: false,

  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  user: User | null = null;
  profilePictureUrl: string = '';
  baseUrl = environment.baseUrl;

  constructor(private userService: UserService, private router: Router) {}
}
