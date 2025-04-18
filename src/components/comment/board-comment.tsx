import { useState } from "react";
import CommentForm from "./comment-form";
import CommentList from "./comment-list";
import { useQuery } from "@tanstack/react-query";
import { getComments } from "@/lib/api/commentApi";
import { Comment } from "@/types/comment";
import { useNotificationContext } from "@/context/notification-context";

interface BoardCommentProps {
  boardId: string;
}

interface ReplyTarget {
  parentId: string;
  replyingTo: string;
}

export default function BoardComment({ boardId }: BoardCommentProps) {
  const { sendNotification } = useNotificationContext();
  const [replyTarget, setReplyTarget] = useState<ReplyTarget | null>(null);

  const {
    data: comments,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["comments", boardId],
    queryFn: () => getComments(boardId),
  });

  const handleCommentClick = (comment: Comment) => {
    const targetParentId = comment.parentCommentId ? comment.parentCommentId : comment.id;
    const targetReplyingTo = comment.member.id;
    setReplyTarget({
      parentId: targetParentId,
      replyingTo: targetReplyingTo,
    });
  };

  const handleCancelReply = () => {
    setReplyTarget(null);
  };

  const handleSuccess = () => {
    setReplyTarget(null);
    refetch();
    sendNotification({
      action: "COMMENT",
      referenceType: "board",
      referenceId: boardId,
      commentId: null,
    });
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="rounded-lg border bg-card p-4 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold">
        {comments?.length ?? 0} Comments
      </h2>
      <CommentList
        comments={comments ?? []}
        onCommentClick={handleCommentClick}
      />
      <CommentForm
        boardId={boardId}
        parentId={replyTarget?.parentId ?? null}
        replyingTo={replyTarget?.replyingTo}
        initialContent={replyTarget ? `@${replyTarget.replyingTo} ` : ""}
        onSuccess={handleSuccess}
        onCancel={handleCancelReply}
      />
    </div>
  );
}
