"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useBoardStore } from "@/stores/useBoardStore";
import { Board } from "@/types/board";
import { BoardCard } from "./board-card";

export default function VideoFeed({ category }: { category: string | null }) {
  const [activeTab, setActiveTab] = useState("Recent");
  const [likedVideos, setLikedVideos] = useState<string[]>([]);
  const { boards, loading, error, getBoards, getBoardByFollow } = useBoardStore();

  useEffect(() => {
    if (category) {
      activeTab === "following" ? getBoardByFollow(category) : getBoards(category);
    } else {
      activeTab === "following" ? getBoardByFollow() : getBoards();
    }
  }, [category, getBoards, getBoardByFollow, activeTab]);

  const handleLike = (boardId: string) => {
    setLikedVideos(prev => 
      prev.includes(boardId) 
        ? prev.filter(id => id !== boardId)
        : [...prev, boardId]
    );
  };

  const renderBoards = (boards: Board[]) => (
    <div className="space-y-8">
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-500">Error: {error}</div>}
      {boards.map((board) => (
        <BoardCard
          key={board.id}
          board={board}
          isLiked={likedVideos.includes(board.id)}
          onLike={handleLike}
        />
      ))}
    </div>
  );

  const renderEmptyFollowing = () => (
    <div className="flex h-[200px] items-center justify-center rounded-lg border border-dashed">
      <p className="text-center text-muted-foreground">
        Videos from creators you follow will appear here.
        <br />
        Start following creators to see their content!
      </p>
    </div>
  );

  return (
    <div className="space-y-8">
      <Tabs defaultValue={activeTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
          <TabsTrigger value="Recent" onClick={() => setActiveTab("Recent")}>
            Recent
          </TabsTrigger>
          <TabsTrigger value="following" onClick={() => setActiveTab("following")}>
            Following
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="Recent" className="mt-6">
          {renderBoards(boards)}
        </TabsContent>
        
        <TabsContent value="following" className="mt-6">
          {boards && boards.length > 0 ? renderBoards(boards) : renderEmptyFollowing()}
        </TabsContent>
      </Tabs>
    </div>
  );
}
