import { User } from "./user";

export interface Event {
    id: number,
    title: string,
    description?: string,
    location: string,
    date_time: Date,
}
