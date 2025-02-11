import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment';
import { User } from '../interfaces/user';
import { UserService } from './user.service';

interface FriendResponse {
    id: number;
    user_id_1: number;
    user_id_2: number;
    status: 'pending' | 'accepted' | 'rejected';
    requested_at: Date;
    updated_at: null;
}


@Injectable({
  providedIn: 'root'
})
export class FriendService {

  constructor(private http: HttpClient) { }

  getFriends(userId: number): Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}/friends/${userId}`, {headers: environment.headers});
  }
}
