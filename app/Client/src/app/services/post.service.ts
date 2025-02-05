import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../interfaces/post';
import { Observable } from 'rxjs';
import { environment } from '../../environment';

interface ApiResponse {
  posts: {
    current_page: number;
    data: Post[];
    // Otras propiedades si las necesitas
  };
}

@Injectable({
  providedIn: 'root'
})
export class PostService {

  

  constructor(private http: HttpClient) { }


  createPost(content: string): Observable<string> {
    const postData = { "content": content };
    return this.http.post<any>(`${environment.apiUrl}/posts`, postData, {headers: environment.headers});
  }

  getPosts(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${environment.apiUrl}/posts`, {headers: environment.headers});
  }
}








/*
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../interfaces/post';
import { Observable } from 'rxjs';
import { environment } from '../../environment';


// -------------------------NO FUNCIONA-------------------------
/*interface ApiResponse {
  current_page: number;
  data: Post[];
}*/
/*
@Injectable({
  providedIn: 'root'
})

export class PostService {

  constructor(private http: HttpClient) { }

  createPost(post: Post): Observable<Post> {
    const postData = {"content":post.content};
    
    return this.http.post<Post>(`${environment.apiUrl}/posts`, postData, {headers:environment.headers});
  }
      //DEVUELVE LOS POSTS [MIRAR EL CONSOLE.LOG]
      getPosts(): Observable<Post[]>{
        return this.http.get<Post[]>(`${environment.apiUrl}/posts`, {headers: environment.headers});
      }

      //-------------------------DEVUELVE UNDEFINED-------------------------
      /*getPosts(): Observable<{current_page:number; data: Post[]}>{
        return this.http.get<{current_page:number; data: Post[]}>(`${environment.apiUrl}/posts`, {headers: environment.headers});
      }*/



  // --------------------------------NO FUNCIONA--------------------------------
  /*-------------------getPosts(): Observable<Post[]>{--------------------
    return this.http.get<ApiResponse>(`${environment.apiUrl}/posts`, {headers: environment.headers})
      .pipe(
        map(response => {
          console.log('API response:', response); // Debugging line
          return response.data;
        })
      );
  }--------------------*/
/*}

*/
