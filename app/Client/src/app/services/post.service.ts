import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../interfaces/post';
import { Observable } from 'rxjs';
import { environment } from '../../environment';

interface ApiResponse {
  data: any;
  posts: {
    filter(arg0: (post: any) => boolean): unknown;
    map(arg0: (post: any) => any): any;
    current_page: number;
    data: Post[];
    // Otras propiedades si las necesitas
  };
}

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}

  //Crea un post
  createPost(content: string): Observable<string> {
    const postData = { content: content };
    return this.http.post<any>(`${environment.apiUrl}/posts`, postData, {
      headers: environment.headers,
    });
  }

  //Devuelve los posts de todas las personas
  getPosts(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${environment.apiUrl}/posts`, {
      headers: environment.headers,
    });
  }

  //Borra un post en especifico
  deletePost(postId: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/posts/${postId}`, {
      headers: environment.headers,
    });
  }

  //Esta funcion permite dar like al post, pasa un objeto vacio como parametro
  likePost(postId: number): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/posts/${postId}/likePost`,
      {},
      {
        headers: environment.headers,
      }
    );
  }
}
