import { Group } from './group';
import { User } from './user';

export interface Post {
  id: number;
  userId: number; //User['id'];
  groupId?: number; //Group['id']; //  Group['id'] (nullable for personal posts)
  content: string; // Content Post
  createdAt: Date; // Date of creation
  likes: number; // Number of likes
  comments: Comment[]; // Comments
  user: User; // User who created the post
  group: Group; // Group to which the post belongs
  liked?: boolean;
}
