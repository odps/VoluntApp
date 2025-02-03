import { Component } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Post } from '../../interfaces/post';
@Component({
  selector: 'app-main',
  standalone: false,
  
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

  posts: Post[] = [];

  constructor(private postService:PostService){ }

  ngOnInit(): void {
    this.postService.getPosts().subscribe((posts: Post[]) => {
      console.log('Posts received:', posts); // Debugging line
      this.posts = posts;
    },error => {
      console.error('Error fetching posts:', error); // Debugging line
    }
    );
  }

  botonLike(post: Post): void{
    let liked =true;
    if(liked){
      post.likes--;
      liked = false;
    }else{
      post.likes++;
      liked = true;
    }
  }
}











/*import { Component } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Post } from '../../interfaces/post';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces/user';

import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-main',
  standalone: false,
  
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  
  

  friendPosts: Post[] = [];
  users: { [key: number]: User } = {};

  constructor(private postService:PostService, private userService: UserService){}


  getUser(userId: number): User | null {
    return this.users[userId] || null;
  }

  ngOnInit(): void {
    this.postService.getFriendPosts(1).subscribe((posts: Post[]) => {
      this.friendPosts = posts;
      this.friendPosts.forEach(post => {
        this.userService.getUserById(post.userId).subscribe((user: User) => {
          this.users[post.userId] = user;
        });
      });
    });
  }

  createPost(post: Partial<Post>): void{
    const currentUser = this.userService.getUser();
    if (!currentUser) {
      console.error('Usuario no autenticado todavía');
      return;
    }

    const newPost: Post = {
      id: 0, // Este valor será reemplazado por el backend
      userId: currentUser.id,
      content: post.content!,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.postService.createPost(newPost).subscribe(
      response => {
        console.log('Post created successfully', response);
      },
      error => {
        console.error('Error creating post', error);
      }
    );
  }
}
*/