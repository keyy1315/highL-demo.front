import { Member } from "./member";
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
    createdDate: string;
}

export interface BoardRequest {
    title: string;
    content: string;
    categoryId: string;
    tags: string[];
  }
  
  