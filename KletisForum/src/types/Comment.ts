import type { User } from './User';
import type { Post } from './Post';

export interface Comment{
    _id: string,
    content: string,
    created_at: Date | string,
    updated_at: Date | string,
    post: string | Post,
    author: string | User,
    upvotes: number | 0,
    downvotes: number | 0
}