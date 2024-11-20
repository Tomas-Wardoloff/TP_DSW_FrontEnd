import { User } from "./user.model";

export interface Post {
    id?: number;
    createdAt: Date;
    updatedAt: Date;
    author: User;
    title: string;
    content: string;
}