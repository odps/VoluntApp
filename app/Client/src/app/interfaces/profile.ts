export interface Profile {
    id: number;
    userId: number; // This references User['id']
    nickname: string;
    profilePictureRoute?: string; // Nullable
    interests?: string; // Nullable
    rating?: number; // Nullable, with precision 4 and scale 2
    createdAt: Date;
    updatedAt: Date;
}
