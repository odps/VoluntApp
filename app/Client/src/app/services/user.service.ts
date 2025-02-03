import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment';
import { User } from '../interfaces/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private currentUser: User | null = null;

  constructor(private http: HttpClient) {}

  
  /*getUserFromToken(token: string): Observable<User> {
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get<User>(`${environment.apiUrl}/user`, { headers });
  }*/

      // Método para obtener el usuario autenticado
  /*getCurrentUser(): User | null {
    return this.currentUser;
  }*/

  // Método para establecer el usuario autenticado (ejemplo)
  /*setCurrentUser(user: User): void {
    this.currentUser = user;
  }*/

  /*getUserById(userId: number): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}/users/${userId}`);
  }*/
}