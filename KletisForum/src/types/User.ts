export interface User{
    _id: string,
    username: string,
    email: string,
    created_at: Date | string,
    type: string,
    password: string | null,
    refreshToken: string,
    photo: string | null //
}