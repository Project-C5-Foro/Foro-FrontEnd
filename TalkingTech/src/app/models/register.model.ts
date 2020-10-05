export interface Register {
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    password_confirmation: string;
    photo: string;
}

export interface RegisterResponse {
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    profile: {
        photo: string;
        biography: string;
        posts_taken: number;
        posts_offered: number;
        reputation: number;
    };
}

export interface LoginResponse {
    username: string;
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    is_superuser: boolean;
    is_client: boolean;
    profile: {
        photo: string;
        biography: string;
        posts_taken: number;
        posts_offered: number;
        reputation: number;
    };
    access_token: string;
    posts:{
        id  : number;
        created: string;
        modified: string;
        title: string;
        post: string;
        status: boolean;
        visited: number;
        user: number,
        category: number;
    };
}
export interface UserResponse {
    username: string;
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    is_superuser: boolean;
    is_client: boolean;
    profile: {
        photo: string;
        biography: string;
        posts_taken: number;
        posts_offered: number;
        reputation: number;
    };
}
