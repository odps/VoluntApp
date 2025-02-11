import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { EventService } from '../../../services/event.service';
import { User } from '../../../interfaces/user';
import { Event } from '../../../interfaces/event';
import { Profile } from '../../../interfaces/profile';
import { Participant } from '../../../interfaces/participant';

@Component({
  standalone: false,
  selector: 'app-eventos-profile',
  templateUrl: './eventos-profile.component.html',
  styleUrls: ['./eventos-profile.component.scss'],
})
export class EventosProfileComponent implements OnInit {
  events: Event[] = [];
  participantsByEvent: Map<number, Participant[]> = new Map();
  participantPictures: Map<number, string> = new Map();
  currentUserId: number | undefined;

  constructor(
    private userService: UserService,
    private eventService: EventService
  ) {}

  ngOnInit(): void {
    this.getCurrentId();
    this.getUserEvents();
  }

  getCurrentId() {
    this.userService.getUserProfile().subscribe({
      next: (response: { user: User; profile: Profile }) => {
        this.currentUserId = response.user.id;
      },
      error: (err) => console.error(err),
    });
  }

  getEventParticipants(eventId: number) {
    this.eventService.getEvent(eventId).subscribe({
      next: (response: any) => {
        if (response.participants) {
          this.participantsByEvent.set(eventId, response.participants);
          response.participants.forEach((participant: any) => {
            this.userService.getProfilePictureUrl(participant.id).subscribe({
              next: (pictureResponse) => {
                this.participantPictures.set(
                  participant.id,
                  pictureResponse.url
                );
              },
              error: (err) => console.error('Error fetching picture:', err),
            });
          });
        }
      },
      error: (err) => console.error('Error fetching participants:', err),
    });
  }

  getUserEvents() {
    this.eventService.getUserEvents().subscribe({
      next: (response: any) => {
        if (response.events) {
          this.events = response.events;
          this.events.forEach((event) => {
            this.getEventParticipants(event.id);
          });
        }
      },
      error: (err) => console.error('Error fetching events:', err),
    });
  }
}



// import { Component, OnInit } from '@angular/core';
// import { Location } from '@angular/common';
// import { User } from '../../../interfaces/user';
// import { UserService } from '../../../services/user.service';
// import { environment } from '../../../../environment';
// import { Router } from '@angular/router';

// interface ProfileResponse {
//   user: User;
// }

// @Component({
//   selector: 'app-eventos-profile',
//   standalone: false,

//   templateUrl: './eventos-profile.component.html',
//   styleUrl: './eventos-profile.component.scss',
// })
// export class EventosProfileComponent implements OnInit {
//   user: User | null = null;
//   profilePictureUrl: string = '';
//   activeView: string = 'eventos';

//   constructor(
//     private userService: UserService,
//     private location: Location,
//     private router: Router,
//   ) {}

//   ngOnInit() {
//     this.loadUserProfile();
//   }

//   loadUserProfile() {
//     this.userService.getUserProfile().subscribe({
//       next: (response: ProfileResponse) => {
//         this.user = response.user;
//         this.profilePictureUrl = `${environment.baseUrl}/${response.user.profile.profile_picture_route}`;
//       },
//       error: (error) => console.error('Error loading profile:', error),
//     });
//   }

//   goBack() {
//     this.location.back();
//   }

//   toSettings() {
//     this.router.navigate(['/settings']);
//   }
//   setActiveView(view: string): void {
//     this.activeView = view;
//   }
// }
