import { useQuery } from "@tanstack/react-query";
import { getBoardByFollow } from "@/lib/api/boardApi";
import { BoardCard } from "./board-card";
export default function FollowingBoards({ category }: { category: string | null }) {
  const {
    data: boards,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["following-boards", category],
    queryFn: () => getBoardByFollow(category),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="space-y-8">
      {boards?.length === 0 ? (
        <div className="flex h-[200px] items-center justify-center rounded-lg border border-dashed">
          <p className="text-center text-muted-foreground">
            Videos from creators you follow will appear here.
            <br />
            Start following creators to see their content!
          </p>
        </div>
      ) : (
        boards?.map((board) => (
          <BoardCard
            key={board.id}
            board={board}
            isLiked={false}
            onLike={() => {}}
          />
        ))
      )}
    </div>
  );
}
