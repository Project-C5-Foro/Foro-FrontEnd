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
    first_name: string;
    last_name: string;
    email: string;
    is_staff: boolean;
    profile: {
        photo: string;
        biography: string;
        posts_taken: number;
        posts_offered: number;
        reputation: number;
    };
    access_token: string;
}
