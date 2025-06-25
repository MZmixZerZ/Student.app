export interface LoginPayload {
    username: string;
    password: string;
}

export interface AuthResponse {
    accessToken: string;
    refreshToken?: string;
    expiresIn?: number;
    user?: any;
}

export interface User {
    id: string;
    username: string;
    email: string;
    fullName?: string;
    roles?: string[];
    [key: string]: any;
}