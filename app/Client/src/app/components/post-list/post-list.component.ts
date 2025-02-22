import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { PostService } from '../../services/post.service';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user';
import { CommentService } from '../../services/comment.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss',
  standalone: false,
})
export class PostListComponent implements OnInit, OnChanges{
  @Input() userId: number | undefined;
  posts: any = [];
  user: User | null = null;
  userProfilePictures: Map<number, string> = new Map();
  userNickNames: Map<number, string> = new Map();
  newComment: any;
  commentingPostId: number | null | undefined;
  isLoading: boolean = true; // Agrega esta línea

  constructor(
    private postService: PostService,
    private userService: UserService,
    private commentService: CommentService
  ) {
    this.userService.getUserProfile().subscribe({
      next: (resp) => (
        (this.user = resp.user), (this.user.profile = resp.profile)
      ),
      error: (err) => console.error('An Error has occurred:', err),
    });
  }

  ngOnInit(): void {
    this.loadPosts(this.userId);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userId'] && changes['userId'].currentValue !== undefined) {
      this.loadPosts(this.userId);
    }
  }

  //Carga los posts, si no se pasa un Id como parametro a la clase devuelve todos los posts
  //disponibles en la BB.DD, caso contrario filtra por id de usuario
  loadPosts(userId?: number): void {
    this.isLoading = true; // Establece isLoading en true al comenzar la carga
    this.postService.getPosts().subscribe({
      next: (response) => {
        if (response.posts) {
          let allPosts = response.posts as unknown as any[];

          if (userId) {
            this.posts = allPosts
              .filter((post: any) => post.user_id === userId)
              .map((post: any) => ({
                ...post,
                liked: false,
                showComments: false
              }));
          } else {
            this.posts = allPosts.map((post: any) => ({
              ...post,
              liked: false,
            }));
          }
          this.getProfilePictures();
          this.getNicknames();
        } else {
          console.warn('Posts data not found in response');
          this.posts = [];
        }
        this.isLoading = false; // Establece isLoading en false al terminar la carga
      },
      error: (err) => {
        console.error('Error loading posts:', err);
        this.isLoading = false; // Establece isLoading en false en caso de error
      },
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
        const index = this.posts.findIndex((p: any) => p.id === post.id);
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

  addComment(postId: number): void {
    if (this.newComment.trim() !== '') {
      this.commentService.createComment(postId, this.newComment).subscribe(
        (newComment) => {
          const post = this.posts.find(
            (post: { id: number }) => post.id === postId
          );
          if (post) {
            post.comments = post.comments || [];
            post.comments.push(newComment);
          }
          this.newComment = ''; // Clear the input field
          this.commentingPostId = null; // Hide the comment input
        },
        (error) => {
          console.error('Error creating comment:', error);
        }
      );
    }
  }

  showCommentInput(postId: number): void {
    this.commentingPostId = postId;
  }

  hideCommentInput(): void {
    this.commentingPostId = null;
  }

  toggleComments(post: any) {
    post.showComments = !post.showComments;
  }

  onCommentDeleted(commentId: number, postId: number): void {
    const post = this.posts.find((post: { id: number }) => post.id === postId);
    if (post) {
      post.comments = post.comments.filter(
        (comment: { id: number }) => comment.id !== commentId
      );
    }
  }
}