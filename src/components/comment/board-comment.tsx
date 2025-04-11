import CommentForm from "./comment-form";
import CommentList from "./comment-list";
import { useQuery } from "@tanstack/react-query";
import { createComment, getComments } from "@/lib/api/commentApi";
import { Comment } from "@/types/comment";
import { useCommentFormStore } from "@/stores/useCommentFormStore";
import { useNotificationContext } from "@/context/notification-context";

interface BoardCommentProps {
  boardId: string;
}

export default function BoardComment({ boardId }: BoardCommentProps) {
  const {
    data: comments,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["comments", boardId],
    queryFn: () => getComments(boardId),
  });
  const { form, setField, resetForm } = useCommentFormStore();
  const { sendNotification } = useNotificationContext();

  const handleCommentClick = (comment: Comment, parentComment?: Comment) => {
    if (parentComment) {
      setField("parentId", parentComment.id);
      setField("content", `@${parentComment.member.id} `);
    } else {
      setField("parentId", comment.id);
      setField("content", `@${comment.member.id} `);
    }
  };

  const handleSubmit = async () => {
    const updateForm = { ...form, boardId: boardId };
    await createComment(updateForm);

    resetForm();

    await refetch();

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
        {comments?.length} Comments
      </h2>
      <CommentList comments={comments} onCommentClick={handleCommentClick} />
      <CommentForm
        commentRequest={form}
        onSubmit={handleSubmit}
        onChange={(content) => setField("content", content)}
        onCancel={() => {
          resetForm();
        }}
      />
    </div>
  );
}
