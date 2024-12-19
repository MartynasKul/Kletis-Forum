import { type User } from './User';

export interface Tractor{
    _id: string,
    name: string,
    description: string,
    created_By:string | User,
    photo: string | null
}