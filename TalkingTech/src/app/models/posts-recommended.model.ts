export interface Recommended {
    id: number;
    post_id: {
        id: number;
        created: string;
        modified: string;
        title: string;
        post: string;
        status: boolean
        visited: number;
        user: number;
        category: number;
        };
    created: boolean;
    modified: boolean;
    title: string;
    readings: string;
    comments: string;
    evaluation: string;
    popularity: string;
}
