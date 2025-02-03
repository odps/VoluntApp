import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../interfaces/post';
import { map, Observable } from 'rxjs';
import { environment } from '../../environment';

interface ApiResponse {
  current_page: number;
  data: Post[];
}

@Injectable({
  providedIn: 'root'
})

export class PostService {

  constructor(private http: HttpClient) { }

  createPost(post: Post): Observable<Post> {
    const postData = {"content":post.content};
    
    return this.http.post<Post>(`${environment.apiUrl}/posts`, postData, {headers:environment.headers});
  }

  getPosts(): Observable<Post[]>{
    return this.http.get<ApiResponse>(`${environment.apiUrl}/posts`, {headers: environment.headers})
      .pipe(
        map(response => response.data)
      );
  }
}
