export interface Recommended {
    id: number;
    post_id: {
        created: string;
        modified: string;
        post: string;
        status: boolean
        visited: number;
        user: {
            id: number,
            username: string;
            first_name: string;
            last_name: string;
            email: string;
            is_superuser: boolean;
            is_client: boolean;
         };
        category: {
            id: number;
            category: string;
            status: boolean;
         };
        };
    created: boolean;
    modified: boolean;
    title: string;
    readings: string;
    comments: string;
    evaluation: string;
    popularity: string;
}
