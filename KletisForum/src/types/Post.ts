import type { User } from './User';
import type { Tractor } from './Tractor';

export interface Post{
    _id: string,
    title: string,
    content: string,
    created_at: Date | string,
    updated_at: Date | string,
    upvotes: number | 0,
    downvotes: number | 0,
    author: string | User,
    tractor: string | Tractor,
    photo: string | null
}