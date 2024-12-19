import type { User } from "./User";
import type { Tractor } from "./Tractor";
import type { Post } from "./Post";

export interface APIRequest{
    error: boolean,
    message: string,
    code: number | string,
    data: User | User[] | Tractor[] | Comment[] | Post[],
    token?: string
}