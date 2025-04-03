import { Member } from "./member";

export interface Comment {
  id: string;
  content: string;
  likes: number;
  member: Member;
  createdDate: string;
  parentCommentId: string;
  childComments: Comment[];
}


export interface CommentRequest {
    content: string;
    parentId: string;
    boardId: string;
}