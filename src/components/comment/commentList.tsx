"use client";

import { Comment } from "@/types/comment";
import CommentItem from "./commentItem";

interface CommentListProps {
  comments: Comment[];
  onCommentClick: (comment: Comment) => void;
}

export default function CommentList({
  comments,
  onCommentClick,
}: CommentListProps) {
  // 최상위 댓글만 필터링
  const rootComments = comments.filter((comment) => !comment.parentCommentId);

  return (
    <div className="space-y-4">
      {rootComments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          onCommentClick={onCommentClick}
        />
      ))}
    </div>
  );
}
