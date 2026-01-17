import type { SearchModel } from "../search.model";

export interface Post {
    body: string;
    id: number;
    title: string;
    userId: number;
}

export interface PostSearch extends SearchModel {
    title: string;
}