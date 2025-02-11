import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment';
import { User } from '../interfaces/user';
import { UserService } from './user.service';
import { Friendship, FriendshipRequest } from '../interfaces/friendship';

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

  getFriends(userId: number): Observable</*any*/Friendship[]>{
    return this.http.get</*any*/Friendship[]>(`${environment.apiUrl}/friends/${userId}`, {headers: environment.headers});
  }

  getFriendshipRequests():Observable<FriendshipRequest[]>{
    return this.http.get<FriendshipRequest[]>(`${environment.apiUrl}/friend-requests-pending`, 
      {headers: environment.headers});
  }

  sendFriendshipRequest(friendId: number):Observable<any>{
    return this.http.post<any>(`${environment.apiUrl}/friends/request/${friendId}`, {},{headers: environment.headers});
  }

  respondFriendshipRequest(requestId: number, status: "accepted" | "rejected"):Observable<any>{
    return this.http.post<any>(`${environment.apiUrl}/friends/request/${requestId}/respond`,
      { 'status': status }, {headers: environment.headers});
  }

  deleteFriendship(userId: Number): Observable<any>{
    return this.http.delete<any>(`${environment.apiUrl}/friends/remove/${userId}`,{headers:environment.headers});
  }
}
