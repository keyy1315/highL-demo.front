import { Member } from "../member/member";
import { Tag } from "./tag";

export interface Board {
    id: string;
    title: string;
    content: string;
    videoUrl: string;
    member: Member;
    tags : Tag[];
    likes : number;
    views: number;
    comments: number;
    createdAt: string;
}
