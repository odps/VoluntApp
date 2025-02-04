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
    localStorage.removeItem('token');
    this.http.post<any>(`${environment.apiUrl}/logout`, {
      headers: environment.headers,
    });
    this.router.navigate(['/login']);
  }
}
