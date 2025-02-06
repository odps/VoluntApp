import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Comment } from '../interfaces/comment';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private apiUrl = environment.apiUrl;
  private headers = environment.headers;

  constructor(private http: HttpClient) {}

  createComment(postId: number, content: string): Observable<Comment> {
    const body = { content: content };
    return this.http
      .post<any>(`${this.apiUrl}/posts/${postId}/comments`, body, {
        headers: this.headers,
      })
      .pipe(map((response: { comment: any }) => response.comment));
  }

  getCommentsByPostId(postId: number): Observable<Comment[]> {
    return this.http.get<any>(`${this.apiUrl}/posts/${postId}`).pipe(
      map((response: any) => {
        if (
          response.posts &&
          response.posts.data &&
          response.posts.data.length > 0
        ) {
          return response.posts.data[0].comments;
        } else {
          return [];
        }
      })
    );
  }

  deleteComment(commentId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/comments/${commentId}`, {
      headers: this.headers,
    });
  }
}
