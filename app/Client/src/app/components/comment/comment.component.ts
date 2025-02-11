import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommentService } from '../../services/comment.service';
import { User } from '../../interfaces/user';

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

  constructor(private commentService: CommentService) {}

  ngOnInit(): void {}

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
