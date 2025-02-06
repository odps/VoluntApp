import { User } from "./user";

export interface Review {
    id: number;
    fromUserId: User['id']; // This references User['id']
    toUserId: User['id']; // This references User['id']
    rating: number; // Rating between 1-5
    comments?: string; // Nullable
    createdAt: Date;
    updatedAt: Date;
}
