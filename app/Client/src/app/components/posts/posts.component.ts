import { Component, input, Input } from '@angular/core';
import { Post } from '../../interfaces/post';
import { PostService } from '../../services/post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-posts',
  standalone: false,

  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
})
export class PostsComponent {
  postContent: string = '';

  constructor(
    private postService: PostService,
    private router: Router,
  ) {}

  onSubmit() {
    this.postService.createPost(this.postContent).subscribe(
      (response) => {
        console.log('Post created', response);
        this.resetForm();
        this.router.navigate(['/main']);
      },
      (error) => {
        console.error('Error creating post:', error);
      },
    );
  }

  resetForm() {
    this.postContent = '';
  }
}
