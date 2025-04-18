"use client";

import { Badge } from "../../ui/badge";
import { useQuery } from "@tanstack/react-query";
import { getBoard } from "@/lib/api/boardApi";
import { useParams } from "next/navigation";
import { Button } from "../../ui/button";
import { Heart, MessageCircle, Pencil, Trash2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import BoardComment from "../../comment/board-comment";
import { useAuthStore } from "@/stores/useAuthStore";

export default function MainBoard() {
  // const s3BaseUrl = process.env.NEXT_PUBLIC_S3_BASE_URL;
  
  const params = useParams();
  const boardId = params.id as string;
 
  const { member } = useAuthStore();

  const { data: board, isLoading } = useQuery({
    queryKey: ["board", boardId],
    queryFn: () => getBoard(boardId as string),
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <div className="rounded-lg border bg-card shadow-sm mb-8">
        <video width="100%" height="100%" controls>
          <source 
          // src={`${s3BaseUrl}/${board?.videoUrl}`} 
          src={`${process.env.NEXT_PUBLIC_TEMP_VIDEO_URL}`}
          type="video/mp4" />
          <track kind="subtitles" src="subtitles.vtt" label="English" />
        </video>
        <div className="p-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">{board?.title}</h1>
            {
              board?.member.id === member?.id && (
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    <Pencil className="h-5 w-5" />
              </Button>
              <Button variant="destructive" size="sm">
                <Trash2 className="h-5 w-5 text-white" />
                  </Button>
                </div>
              )
            }
          </div>
          <div className="mt-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {board?.views} views
              </span>
              <span className="text-sm text-muted-foreground">•</span>
              <span className="text-sm text-muted-foreground">
                {board?.createdDate
                  ? new Date(board.createdDate)
                      .toLocaleDateString("ko-KR", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      })
                      .replace(/\. /g, "-")
                      .replace(".", "")
                  : ""}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-1"
              >
                <Heart className="h-5 w-5" />
                <span>{board?.likes}</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-1"
              >
                <MessageCircle className="h-5 w-5" />
                <span>{board?.comments}</span>
              </Button>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between border-t pt-4">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={board?.member.iconUrl} alt="User" />
                <AvatarFallback>{board?.member.id.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                {board?.member.gameName ? (
                  <>
                    <p className="font-medium">
                      {board?.member.gameName} #{board?.member.tagLine}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {board?.member.id}
                    </p>
                  </>
                ) : (
                  <p className="font-medium">{board?.member?.id}</p>
                )}
              </div>
            </div>
            <Button>Subscribe</Button>
          </div>
          <div className="mt-4 rounded-lg bg-muted p-4">
            <p className="text-sm">{board?.content}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {board?.tags.map((tag) => (
                <Badge variant="secondary" key={tag.id}>
                  {tag.name}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
      <BoardComment boardId={boardId as string} />
    </>
  );
}
