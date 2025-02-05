import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-post-list',
  standalone: false,
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css',
})
export class PostListComponent implements OnInit {
  posts: any = [];
  userProfilePictures: Map<number, string> = new Map();

  constructor(
    private postService: PostService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.postService.getPosts().subscribe({
      next: (response) => {
        //Se recoge la respuesta del servidor (array) y se almacena localmente
        if (response.posts) {
          console.log('Posts received:', response.posts);
          this.posts = response.posts;
          //A medida que se van almacenando se mapea busca y se mapea la foto de perfil por cada post
          this.posts.forEach((post: any) => {
            this.userService.getProfilePictureUrl(post.user.id).subscribe({
              next: (pictureResponse) => {
                this.userProfilePictures.set(post.user.id, pictureResponse.url);
              },
              error: (err) =>
                console.error('Error fetching profile picture:', err),
            });
          });
        } else {
          console.warn('Posts data not found in response');
          this.posts = [];
        }
      },
      error: (error) => console.error('Error loading posts:', error),
    });
  }
}
