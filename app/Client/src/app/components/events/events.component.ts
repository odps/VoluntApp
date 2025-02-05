import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { EventService } from '../../services/event.service';
import { User } from '../../interfaces/user';
import { Event } from '../../interfaces/event';
import { Profile } from '../../interfaces/profile';

@Component({
  standalone: false,
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
})
export class EventsComponent implements OnInit {
  events: Event[] = [];
  joinedEvents: Event[] = [];
  currentUserId: number | undefined;

  constructor(
    private userService: UserService,
    private eventService: EventService
  ) {
    this.getCurrentId();
  }

  ngOnInit(): void {
    this.getUserEvents();
  }

  //Recoge la Id del usuario
  getCurrentId() {
    this.userService.getUserProfile().subscribe({
      next: (response: { user: User; profile: Profile }) => {
        this.currentUserId = response.user.id;
      },
      error: (err) => console.error(err),
    });
  }

  //Muestra los eventos a los que esta unido el usuario
  getUserEvents() {
    this.eventService.getUserEvents().subscribe({
      next: (res) => {
        this.events = res.events;
      },
      error: (err) => console.error(err),
    });
  }
}
