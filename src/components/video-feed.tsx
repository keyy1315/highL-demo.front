"use client";

import { useEffect, useState } from "react";
import { Heart, MessageCircle, MoreHorizontal } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { useBoardStore } from "@/stores/useBoardStore";

export default function VideoFeed({ category }: { category: string | null }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Recent");
  const [likedVideos, setLikedVideos] = useState<string[]>([]);

  const { boards, loading, error, getBoards, getBoardByFollow } = useBoardStore();

  useEffect(() => {
    if (category) {
      if(activeTab === "following") {
        getBoardByFollow(category);
      } else {
        getBoards(category);
      }
    } else {
      if(activeTab === "following") {
        getBoardByFollow();
      } else {
        getBoards();
      }
    }
  }, [category, getBoards, getBoardByFollow, activeTab]);

  const toggleLike = (e: React.MouseEvent, boardId: string) => {
    e.stopPropagation();
    if (likedVideos.includes(boardId)) {
      setLikedVideos(likedVideos.filter((id) => id !== boardId));
    } else {
      setLikedVideos([...likedVideos, boardId]);
    }
  };

  const handleVideoClick = (boardId: string) => {
    router.push(`/board/${boardId}`);
  };

  return (
      <div className="space-y-8">
        <Tabs defaultValue={activeTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
            <TabsTrigger value="Recent" onClick={() => setActiveTab("Recent")}>
              Recent
            </TabsTrigger>
            <TabsTrigger
              value="following"
              onClick={() => setActiveTab("following")}
            >
              Following
            </TabsTrigger>
          </TabsList>
          <TabsContent value="Recent" className="mt-6 space-y-8">
            {loading && <div>Loading...</div>}
            {error && <div className="text-red-500">Error: {error}</div>}
            {boards.map((board) => (
              <div
                key={board.id}
                className="rounded-lg border bg-card shadow-sm cursor-pointer hover:bg-accent/50 transition-colors"
                onClick={() => handleVideoClick(board.id)}
              >
                <div className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage
                          src={board.member.iconUrl}
                          alt={board.member.id}
                        />
                        <AvatarFallback>
                          {board.member.id.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center space-x-2">
                          <p className="font-medium">{board.member.gameName}</p>
                          <p className="text-sm text-gray-500">
                            #{board.member.tagLine}
                          </p>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {board.member.id}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <MoreHorizontal className="h-5 w-5" />
                    </Button>
                  </div>
                  <h3 className="mt-4 text-xl font-semibold">{board.title}</h3>
                  <p className="mt-2 text-muted-foreground">{board.content}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {board.tags.map((tag) => (
                      <Badge key={tag.id} variant="secondary">
                        {tag.name}
                      </Badge>
                    ))}
                  </div>
                </div>
                <video
                  width="100%"
                  height="100%"
                  controls
                  onClick={(e) => e.stopPropagation()}
                >
                  <source
                    src={`https://highl-file.s3.ap-northeast-2.amazonaws.com/${board.videoUrl}`}
                    type="video/mp4"
                  />
                  <track kind="subtitles" src="subtitles.vtt" label="English" />
                </video>
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-6">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center gap-1"
                      onClick={(e) => toggleLike(e, board.id)}
                    >
                      <Heart
                        className={`h-5 w-5 ${
                          likedVideos.includes(board.id)
                            ? "fill-red-500 text-red-500"
                            : ""
                        }`}
                      />
                      <span>
                        {likedVideos.includes(board.id)
                          ? board.likes + 1
                          : board.likes}
                      </span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center gap-1"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <MessageCircle className="h-5 w-5" />
                      <span>{board.comments}</span>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>
          <TabsContent value="following" className="mt-6">
            <div className="flex h-[200px] items-center justify-center rounded-lg border border-dashed">
              <p className="text-center text-muted-foreground">
                Videos from creators you follow will appear here.
                <br />
                Start following creators to see their content!
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
  );
}
