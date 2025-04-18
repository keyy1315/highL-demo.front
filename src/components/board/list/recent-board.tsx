import { useQuery } from "@tanstack/react-query";

import { getBoards } from "@/lib/api/boardApi";
import { BoardCard } from "./board-card";

export default function RecentBoards({
  category,
}: {
  category: string | null;
}) {
  const {
    data: boards,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["boards", category],
    queryFn: () => getBoards(category),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="space-y-8">
      {boards?.map((board) => (
        <BoardCard
          key={board.id}
          board={board}
          isLiked={false}
          onLike={() => {}}
        />
      ))}
    </div>
  );
}
