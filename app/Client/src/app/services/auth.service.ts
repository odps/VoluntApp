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
import { User } from '../interfaces/user';
import { UserService } from './user.service';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  

  constructor(private http: HttpClient) {}
  
  login(email: string, password: string): Observable<any> {
    const loginData = { "email" : email, "password" : password };
    return this.http.post<any>(`${environment.apiUrl}/login`, loginData, {headers : environment.headers} );
  }

  register(name: string, email: string, password: string, password2: string): Observable<any> {
    const registerData = {
      "name": name,
      "email": email,
      "password": password,
      "password_confirmation": password2
    };
    return this.http.post<any>(`${environment.apiUrl}/register`, registerData, { headers: environment.headers });
  }

  forgotPassword(email:string):Observable<any>{
    const dataForgotPassword = {"email":email};
    return this.http.post<any>(`${environment.apiUrl}/forgot-password`, dataForgotPassword, {headers:environment.headers});
  }
}
