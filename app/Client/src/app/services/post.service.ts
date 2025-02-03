import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../interfaces/post';
import { Observable } from 'rxjs';
import { environment } from '../../environment';


@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  createPost(post: Post): Observable<Post> {
    const postData = {"content":post.content};
    
    return this.http.post<Post>(`${environment.apiUrl}/posts`, postData, {headers:environment.headers});
  }

  getFriendPosts(userId: number): Observable<Post[]> {
    return this.http.get<Post[]>(`${environment.apiUrl}/posts/friends/${userId}`);
  }
}
