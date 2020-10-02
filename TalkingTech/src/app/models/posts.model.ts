export interface PostsResponse {
    id: string;
    user: {
        username: string;
        first_name: string;
        last_name: string;
        email: string;
        is_superuser: boolean;
        is_client: boolean;
        profile: {
            photo: string;
        }
    };
    category: {
        id: number;
        category: string;
        status: boolean;
    };
    created: string;
    title: string;
    post: string;
    status: string;
    visited: string;
}
export interface PostCreate {
    user: string;
    email: string;
    title: string;
    post: string;
    category: string;
}
