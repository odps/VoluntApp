import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { Profile } from '../interfaces/profile';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUserProfile(): Observable<{ user: User; profile: Profile }> {
    return this.http.get<{ user: User; profile: Profile }>(
      `${environment.apiUrl}/profile`,
      { headers: environment.headers }
    );
  }

  getUserProfileSpecific(userId: number): Observable<{ user: User; profile: Profile }> {
    return this.http.get<{ user: User; profile: Profile }>(
      `${environment.apiUrl}/profile/${userId}`,
      { headers: environment.headers }
    );
  }

  getProfilePictureUrl(userId: number): Observable<{ url: string }> {
    return this.http.get<{ url: string }>(
      `${environment.apiUrl}/profile/picture/${userId}`,
      { headers: environment.headers }
    );
  }
}
