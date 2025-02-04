import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
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

  getProfilePictureUrl(userId: number): Observable<{ url: string }> {
    return this.http.get<{ url: string }>(
      `${environment.apiUrl}/profile/picture/${userId}`,
      { headers: environment.headers }
    );
  }

  changeProfileNickname(nickname: string): Observable<any> {
    return this.http.put<any>(
      `${environment.apiUrl}/edit/profile-nickname`,
      { nickname: nickname },
      { headers: environment.headers }
    );
  }

  changeEmail(email: string): Observable<any> {
    return this.http.put<any>(
      `${environment.apiUrl}/edit/profile-email`,
      { email: email },
      { headers: environment.headers }
    );
  }

  changeProfileBio(bio: string): Observable<any> {
    return this.http.put<any>(
      `${environment.apiUrl}/edit/profile-interests`,
      { interests: bio },
      { headers: environment.headers }
    );
  }

  changeProfilePicture(img: File): Observable<any> {
    //Tratado de headers para que pueda aceptar imagenes, se pasa solo el token de auth y que sea el
    // navegador quien agregue el resto de headers
    let headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });

    //Creacion del cuerpo de la peticion
    const formData = new FormData();
    formData.append('image', img);

    return this.http.post<any>(
      `${environment.apiUrl}/edit/profile-picture`,
      formData,
      {
        headers: headers,
      }
    );
  }
}
