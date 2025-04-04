import { Member } from "./member";

export interface Comment {
  id: string;
  content: string;
  likes: number;
  member: Member;
  createdDate: string;
  parentCommentId: string | null;
  childComments: Comment[];
}


export interface CommentRequest {
    content: string;
    parentId: string | null;
    boardId: string;
}