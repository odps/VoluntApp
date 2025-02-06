import { Component, Input } from '@angular/core';
import { Comment } from '../../interfaces/comment';

@Component({
  selector: 'app-comment',
  standalone: false,

  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css',
})
export class CommentComponent {
  @Input() comment!: Comment;
}
