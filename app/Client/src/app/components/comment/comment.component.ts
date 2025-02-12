import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommentService } from '../../services/comment.service';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user';
import { environment } from '../../../environment';

@Component({
  selector: 'app-comment',
  standalone: false,
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss',
})
export class CommentComponent implements OnInit {
  @Input() comment: any;
  @Input() currentUserId: number | undefined;
  @Output() commentDeleted = new EventEmitter<number>();
  userProfile: any;
  baseUrl = environment.baseUrl;

  constructor(private commentService: CommentService, private userService: UserService) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile() {
    this.userService.getUserProfileSpecific(this.comment.user_id).subscribe({
      next: (response) => {
        this.userProfile = response;
      },
      error: (error) => {
        console.error('Error loading user profile:', error);
      },
    });
  }

  deleteComment(commentId: number) {
    this.commentService.deleteComment(commentId).subscribe({
      next: () => {
        this.commentDeleted.emit(commentId);
      },
      error: (error) => {
        console.error('Error deleting comment:', error);
      },
    });
  }

  isCommentAuthor(): boolean {
    return this.currentUserId === this.comment.user_id;
  }
}