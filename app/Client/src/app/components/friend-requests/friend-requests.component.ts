import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FriendService } from '../../services/friend.service';
import { Router } from '@angular/router';
import { FriendshipRequest } from '../../interfaces/friendship';
import { environment } from '../../../environment';
import { User } from '../../interfaces/user';
import { Location } from '@angular/common';

interface ProfileResponse {
  user: User;
}

@Component({
  selector: 'app-friend-requests',
  standalone: false,

  templateUrl: './friend-requests.component.html',
  styleUrl: './friend-requests.component.scss',
})
export class FriendRequestsComponent implements OnInit {
  friendshipRequests: FriendshipRequest[] = [];
  friendshipRequestsWithSender: FriendshipRequest[] = [];
  baseUrl = environment.baseUrl;
  user: User | null = null;
  profilePictureUrl: string = '';

  constructor(
    private userService: UserService,
    private friendService: FriendService,
    private location: Location,
    private router: Router,
  ) {}

  ngOnInit() {
    this.loadUserProfile();
    this.getFriendshipRequests();
    this.getSenders(this.friendshipRequests);
    this.loadFriendshipRequests();
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

  getFriendshipRequests() {
    this.friendService.getFriendshipRequests().subscribe({
      next: (requests: FriendshipRequest[]) => {
        this.friendshipRequests = requests;
      },
    });
  }

  getSenders(friendshipRequests: FriendshipRequest[]) {
    for (let i = 0; i < friendshipRequests.length; i++) {
      this.userService
        .getUserProfileSpecific(friendshipRequests[i].sender.id)
        .subscribe({
          next: (response) => {
            friendshipRequests[i].sender = response.user;
          },
          error: (error) => {
            console.error('Error al guardar los datos del sender', error);
          },
        });
    }
  }

  loadFriendshipRequests() {
    this.friendshipRequests = this.friendshipRequestsWithSender;
  }

  // Método para aceptar una solicitud
  acceptFriendshipRequest(request: FriendshipRequest) {
    this.friendService
      .respondFriendshipRequest(request.id, 'accepted')
      .subscribe({
        next: (response) => {
          console.log('Solicitud aceptada:', response);
          // Actualizar la lista de solicitudes
          this.getFriendshipRequests();
          this.getSenders(this.friendshipRequests);
          this.loadFriendshipRequests();
        },
        error: (error) =>
          console.error('Error al aceptar la solicitud:', error),
      });
  }

  // Método para rechazar una solicitud
  rejectFriendshipRequest(request: FriendshipRequest) {
    this.friendService
      .respondFriendshipRequest(request.id, 'rejected')
      .subscribe({
        next: (response) => {
          console.log('Solicitud rechazada:', response);
          // Actualizar la lista de solicitudes
          this.getFriendshipRequests();
          this.getSenders(this.friendshipRequests);
          this.loadFriendshipRequests();
        },
        error: (error) =>
          console.error('Error al rechazar la solicitud:', error),
      });
  }
}
