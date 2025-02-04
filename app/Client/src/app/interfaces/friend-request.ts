import { User } from "./user";

export interface FriendRequest {
    id: number;
    fromUserId: User['id']; // Id del usuario que manda la solicitud
    toUserId: User['id']; // Id del usuario que recibe la solicitud
    status: 'pending' | 'accepted' | 'rejected'; // Request status
    createdAt: Date;
    respondedAt?: Date; // (nullable)
}
