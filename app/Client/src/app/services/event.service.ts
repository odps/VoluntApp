import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from '../interfaces/event';
import { Participant } from '../interfaces/participant';
import { environment } from '../../environment';
import { EventJoinRequest } from '../interfaces/event-join-request';
import { EventRequest } from '../interfaces/event-request';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getUserEvents(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/events`, {
      headers: environment.headers,
    });
  }

  getEvent(id: number): Observable<Event> {
    return this.http.get<Event>(`${this.apiUrl}/events/${id}`, {
      headers: environment.headers,
    });
  }

  createEvent(event: Event): Observable<Event> {
    // Format date to YYYY/MM/DD if needed
    const formattedEvent = {
      ...event,
      date_time:
        event.date_time instanceof Date
          ? event.date_time.toISOString().split('T')[0].replace(/-/g, '/')
          : event.date_time,
    };

    return this.http.post<Event>(`${this.apiUrl}/events`, formattedEvent, {
      headers: environment.headers,
    });
  }

  joinEvent(eventId: number, userId: number): Observable<any> {
    const joinRequest: EventJoinRequest = {
      event_id: eventId,
      user_id: userId,
    };

    return this.http.post(`${this.apiUrl}/events/join`, joinRequest, {
      headers: environment.headers,
    });
  }

  leaveEvent(eventId: number, userId: number): Observable<any> {
    const leaveRequest: EventRequest = {
      event_id: eventId,
      user_id: userId,
    };

    return this.http.post(`${this.apiUrl}/events/leave`, leaveRequest, {
      headers: environment.headers,
    });
  }

  updateEvent(id: number, event: Event): Observable<Event> {
    const formattedEvent = {
      ...event,
      date_time:
        event.date_time instanceof Date
          ? event.date_time.toISOString().split('T')[0].replace(/-/g, '/')
          : event.date_time,
    };

    return this.http.put<Event>(
      `${this.apiUrl}/events/edit/${id}`,
      formattedEvent,
      {
        headers: environment.headers,
      }
    );
  }

  deleteEvent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/events/${id}`, {
      headers: environment.headers,
    });
  }
}
