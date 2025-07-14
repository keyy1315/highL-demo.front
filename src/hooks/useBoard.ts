import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteBoard,
  getBoard,
  getBoardByFollow,
  getBoards,
  setBoard,
} from "@/lib/api/boardApi";
import { Board, BoardRequest } from "@/types/board";
import { useAuthStore } from "@/stores/useAuthStore";

export function useBoard(boardId?: string, category?: string | null) {
  const queryClient = useQueryClient();
  const { member } = useAuthStore();

  const { data: board, isLoading } = useQuery({
    queryKey: ["board", boardId],
    queryFn: () => getBoard(boardId!),
    enabled: !!boardId,
  });

  const { data: boards, isLoading: isBoardsLoading } = useQuery({
    queryKey: ["boards", category, member?.id],
    queryFn: () => getBoards(category),
  });

  const { data: followingBoards, isLoading: isFollowingBoardsLoading } =
    useQuery({
      queryKey: ["following-boards", member?.id, category],
      queryFn: () => {
        if (member) {
          return getBoardByFollow(category);
        }
        return [];
      },
    });

  const { mutate: setBoardMutation, isPending: isSetting } = useMutation({
    mutationFn: ({
      boardRequest,
      file,
    }: {
      boardRequest: BoardRequest;
      file: File | null;
    }) => setBoard(file, boardRequest),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards"] });
    },
  });

  const { mutate: deleteBoardMutation, isPending: isDeleting } = useMutation({
    mutationFn: (boardId: string) => deleteBoard(boardId!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards"] });
    },
  });

  return {
    board: board as Board,
    boards: boards as Board[],
    followingBoards: followingBoards as Board[],
    deleteBoardMutation,
    setBoardMutation,
    isLoading,
    isDeleting,
    isBoardsLoading,
    isFollowingBoardsLoading,
  };
}
