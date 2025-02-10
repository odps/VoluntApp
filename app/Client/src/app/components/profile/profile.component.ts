import { Component, OnInit, HostListener, Injectable} from '@angular/core';
import { Location } from '@angular/common';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user.service';
import { environment } from '../../../environment';
import { Router } from '@angular/router';

import { BehaviorSubject } from 'rxjs';
// import { ProfileService } from '../profile.service';

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
  activeView: string = 'posts';
  activeSection: string = 'posts';
  isDesktop: boolean = window.innerWidth >= 768; // Detectar si es desktop

  constructor(
    private userService: UserService,
    private location: Location,
    private router: Router,
    private profileService: ProfileService
  ) {}

  ngOnInit() {
    if (this.isDesktop) {
      this.activeSection = 'posts';
    }

    this.loadUserProfile();

    this.profileService.activeSection$.subscribe(section => {
      this.activeSection = section;
    });
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

  // Escucha el cambio de tamaño de la pantalla y actualiza isDesktop dinámicamente
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isDesktop = window.innerWidth >= 768;
    
    // Si es desktop y no tiene 'posts' como sección activa, pon 'posts' por defecto
    if (this.isDesktop && this.activeSection !== 'posts') {
      this.activeSection = 'posts';
    }
  }

  setActiveSection(section: string) {
    if (this.isDesktop) {
        this.activeSection = section;
      }
    }

}

// Muestra la sección correspondiente para cada elemento del menú desktop de perfil

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private activeSectionSubject = new BehaviorSubject<string>('posts');
  activeSection$ = this.activeSectionSubject.asObservable();

  setActiveSection(section: string) {
    this.activeSectionSubject.next(section);
  }
}
