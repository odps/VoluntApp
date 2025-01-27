import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Definimos una interfaz para tipar los datos del usuario
export interface User {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  email_repeat: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users'; // URL de JSON Server

  constructor(private http: HttpClient) {}

  /**
   * Método para iniciar sesión.
   * @param nombre - Nombre del usuario
   * @param apellido - Apellido del usuario
   * @param email - Email del usuario
   * @param email_repeat - Email repetido del usuario
   * @param password - Contraseña del usuario
   * @returns Un Observable con un array de usuarios que coinciden con los datos ingresados.
   */
  login(email: string, password: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}?email=${email}&password=${password}`);
    // Ahora TypeScript sabe que esto devuelve un array de objetos de tipo User.
  }
}
