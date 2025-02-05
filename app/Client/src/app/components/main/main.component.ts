import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-main',
  standalone: false,
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  posts: any = [];

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.postService.getPosts().subscribe({
      next: (response) => {
        console.log('Full response:', response); // Log the entire response
        if (response.posts) {
          console.log('Posts received:', response.posts);
          this.posts = response.posts;
        } else {
          console.warn('Posts data not found in response');
          this.posts = []; // or handle the missing data appropriately
        }
      },
      error: (error) => console.error('Error loading posts:', error),
    });
  }
}
