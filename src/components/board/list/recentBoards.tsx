import { BoardCard } from "./boardCard";
import { useBoard } from "@/hooks/useBoard";

export default function RecentBoards({
  category,
}: {
  category: string | null;
}) {
  const { boards } = useBoard(undefined, category);
  return (
    <div className="space-y-8">
      {boards?.length === 0 ? (
        <div className="flex h-[200px] items-center justify-center rounded-lg border border-dashed">
          <p className="text-center text-muted-foreground">No videos found.</p>
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
