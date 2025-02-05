/*import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
}*/
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<any> {
    const loginData = { email: email, password: password };
    return this.http.post<any>(`${environment.apiUrl}/login`, loginData, {
      headers: environment.headers,
    });
  }

  register(
    name: string,
    email: string,
    password: string,
    password2: string
  ): Observable<any> {
    const registerData = {
      name: name,
      email: email,
      password: password,
      password_confirmation: password2,
    };
    return this.http.post<any>(`${environment.apiUrl}/register`, registerData, {
      headers: environment.headers,
    });
  }

  forgotPassword(email: string): Observable<any> {
    const dataForgotPassword = { email: email };
    return this.http.post<any>(
      `${environment.apiUrl}/forgot-password`,
      dataForgotPassword,
      { headers: environment.headers }
    );
  }

  logout() {
    //Limpia la cache/cookies del navegador y elimina el token de sesion
    localStorage.removeItem('token');
    this.removeCache();
    this.removeCookies();

    //Avisa al servidor para que se cierre la sesion
    this.http.post<any>(`${environment.apiUrl}/logout`, {
      headers: environment.headers,
    });
    this.router.navigate(['/login']);
  }

  //Itera sobre la cache del navegador y borra cada elemento.
  private removeCache() {
    if ('caches' in window) {
      caches.keys().then((names) => {
        names.forEach((name) => {
          caches.delete(name);
        });
      });
    }
  }

  //Recoge las cookies del navegador y les asigna una fecha de expiracion en el pasado para que se borren.
  private removeCookies() {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      const name = cookie.split('=')[0].trim();
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }
  }
}
