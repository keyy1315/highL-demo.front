import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createComment, getComments } from "@/lib/api/commentApi";
import { CommentRequest, Comment } from "@/types/comment";

export function useComments(boardId: string) {
  const queryClient = useQueryClient();

  const { data: comments, isLoading } = useQuery({
    queryKey: ["comments", boardId],
    queryFn: () => getComments(boardId),
  });

  const { mutate: createCommentMutation, isPending: isCreatingComment } =
    useMutation({
      mutationFn: (commentRequest: CommentRequest) =>
        createComment(commentRequest),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["comments", boardId] });
      },
    });

  return {
    comments: comments as Comment[],
    isLoading,
    createCommentMutation,
    isCreatingComment,
  };
}
