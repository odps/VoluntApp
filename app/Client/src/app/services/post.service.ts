import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../interfaces/post';
import { Observable } from 'rxjs';
import { environment } from '../../environment';

interface ApiResponse {
  data: any;
  posts: {
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

  createPost(content: string): Observable<string> {
    const postData = { content: content };
    return this.http.post<any>(`${environment.apiUrl}/posts`, postData, {
      headers: environment.headers,
    });
  }

  getPosts(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${environment.apiUrl}/posts`, {
      headers: environment.headers,
    });
  }

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
