import { User } from "./user";

export interface Friendship {
    id: number;
    userId1: User['id']; // (first user)
    userId2: User['id']; // (second user)
    status: 'pending' | 'accepted' | 'rejected' | 'blocked'; // Friendship status
    requestedAt: Date;  
    updatedAt?: Date; 
}
