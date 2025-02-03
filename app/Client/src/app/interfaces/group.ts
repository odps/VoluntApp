import { User } from "./user";

export interface Group {
    id: number;
    name: string;
    description?: string; // (nullable)
    reputationRequired: number; // Minimo de reputacion para apuntarse
    createdBy: User['id']; // This references User['id']
    createdAt: Date;
    updatedAt: Date;
}
