import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user';

@Component({
  standalone: false,
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css',
})
export class PostListComponent implements OnInit {
  posts: any = [];
  user: User | null = null;
  userProfilePictures: Map<number, string> = new Map();
  userNickNames: Map<number, string> = new Map();

  constructor(
    private postService: PostService,
    private userService: UserService
  ) {
    this.userService.getUserProfile().subscribe({
      next: (resp) => (
        (this.user = resp.user), (this.user.profile = resp.profile)
      ),
      error: (err) => console.error('An Error has occurred:', err),
    });
  }

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.postService.getPosts().subscribe({
      next: (response) => {
        console.log('Full Response:', response);

        if (response.posts) {
          this.posts = (response.posts as unknown as any[]).map(
            (post: any) => ({
              ...post,
              liked: false,
            })
          );
          this.getProfilePictures();
          this.getNicknames();
        } else {
          console.warn('Posts data not found in response');
          this.posts = [];
        }
      },
      error: (err) => console.error('Error loading posts:', err),
    });
  }

  deletePost(postId: number): void {
    this.postService.deletePost(postId).subscribe({
      next: () => {
        console.log('Post deleted successfully.');
        this.posts = this.posts.filter((post: any) => post.id !== postId);
      },
      error: (err) => console.error('Error deleting post:', err),
    });
  }

  getProfilePictures() {
    this.posts.forEach((post: any) => {
      this.userService.getProfilePictureUrl(post.user.id).subscribe({
        next: (pictureResponse) => {
          this.userProfilePictures.set(post.user.id, pictureResponse.url);
        },
        error: (err) => console.error('Error fetching profile picture:', err),
      });
    });
  }

  getNicknames() {
    this.posts.forEach((post: any) => {
      this.userService.getUserProfileSpecific(post.user.id).subscribe({
        next: (resp) => {
          this.userNickNames.set(post.user.id, resp.profile.nickname);
        },
        error: (err) => console.error('Error fetching profile picture:', err),
      });
    });
  }

  toggleLike(post: any): void {
    this.postService.likePost(post.id).subscribe({
      next: (response) => {
        // Find the index of the post in the posts array
        const index = this.posts.findIndex((p: any) => p.id === post.id);

        // If the post is found, update its properties
        if (index !== -1) {
          this.posts[index].liked = response.liked;
          if (response.post && response.post.likes) {
            this.posts[index].likes = response.post.likes;
          }
        }
      },
      error: (err) => console.error('Error liking post:', err),
    });
  }
}
