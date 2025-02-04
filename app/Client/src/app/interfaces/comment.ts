import { Post } from "./post";
import { User } from "./user";

export interface Comment {
    id: number,
    post_id: number, // Id del post en el que se crea el comentario
    user_id: number, // Id del user que crea el comentario
    content: string
}
