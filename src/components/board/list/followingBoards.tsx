import { BoardCard } from "./boardCard";
import { useBoard } from "@/hooks/useBoard";

export default function FollowingBoards({
  category,
}: {
  category: string | null;
}) {
  const { followingBoards, isFollowingBoardsLoading } = useBoard(
    undefined,
    category
  );

  return (
    <div className="space-y-8">
      {followingBoards?.length === 0 ? (
        <div className="flex h-[200px] items-center justify-center rounded-lg border border-dashed">
          <p className="text-center text-muted-foreground">
            Videos from creators you follow will appear here.
            <br />
            Start following creators to see their content!
          </p>
        </div>
      ) : (
        followingBoards?.map((board) => (
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
