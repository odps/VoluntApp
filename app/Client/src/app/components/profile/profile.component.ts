import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user.service';
import { environment } from '../../../environment';
import { Router } from '@angular/router';
import { FriendshipRequest } from '../../interfaces/friendship';
import { FriendService } from '../../services/friend.service';
import { Profile } from '../../interfaces/profile';

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
  activeView: string = 'eventos';
  baseUrl = environment.baseUrl;
  sender: User | null = null;

////////////////        PRUEBA
  friendshipRequests: FriendshipRequest[] = [];
///////////////

  constructor(
    private userService: UserService,
    private friendService: FriendService,
    private location: Location,
    private router: Router
  ) {}



  ngOnInit() {
    this.loadUserProfile();
    ///////
    //this.loadFriendshipRequests();
    ///////
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



  //////////////////////
  identificarSender(friendshipRequest: FriendshipRequest){
    this.userService.getUserProfileSpecific(friendshipRequest.from_user_id).subscribe({
      next:(response)=>{
        friendshipRequest.sender = response.user;
        
      },
      error: (error) => console.error('Error al obtener los datos del remitente:', error)
      });
  }
//////////////////////




// INICIO PRUEBA DE INTERACCION SOLICITUDES DE AMISTAD
 // Método para cargar las solicitudes de amistad pendientes
 loadFriendshipRequests() {
  this.friendService.getFriendshipRequests().subscribe({
    next: (requests: FriendshipRequest[]) => {
      this.friendshipRequests = requests;
      console.log(this.friendshipRequests);
      console.log(this.friendshipRequests[1].sender);


      for (let i = 0; i < this.friendshipRequests.length; i++) {
          console.log(this.friendshipRequests[0].sender);

        this.userService.getUserProfileSpecific(this.friendshipRequests[i].sender.id).subscribe({  
          next:(response)=>{
            this.friendshipRequests[i].sender = response.user;
            console.log(this.friendshipRequests[0].sender);
          },
          error: (error) => console.error('Error al obtener los datos del remitente:', error)
          });
        
      }
       this.friendshipRequests.forEach(request => {
         this.identificarSender(request);
         console.log("adios");
       });

    },
    error: (error) => console.error('Error loading friendship requests:', error)
  });
}

// Método para aceptar una solicitud
acceptFriendshipRequest(request: FriendshipRequest) {
  this.friendService.respondFriendshipRequest(request.id, 'accepted').subscribe({
    next: (response) => {
      console.log('Solicitud aceptada:', response);
      // Actualizar la lista de solicitudes
      this.loadFriendshipRequests();
    },
    error: (error) => console.error('Error al aceptar la solicitud:', error)
  });
}

// Método para rechazar una solicitud
rejectFriendshipRequest(request: FriendshipRequest) {
  this.friendService.respondFriendshipRequest(request.id, 'rejected').subscribe({
    next: (response) => {
      console.log('Solicitud rechazada:', response);
      // Actualizar la lista de solicitudes
      this.loadFriendshipRequests();
    },
    error: (error) => console.error('Error al rechazar la solicitud:', error)
  });
}




}
