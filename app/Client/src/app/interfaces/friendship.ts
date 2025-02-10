import { User } from "./user";

export interface Friendship {
    id: number;
    userId1: number; // (first user)
    userId2: number; // (second user)
    status: 'pending' | 'accepted' | 'rejected' | 'blocked'; // Friendship status
    requestedAt: Date;  
    updatedAt?: Date; 
}


export interface FriendshipRequest{
    id: number;
    from_user_id: number;
    to_user_id: number;
    status: 'pending';
    sender: User;
}