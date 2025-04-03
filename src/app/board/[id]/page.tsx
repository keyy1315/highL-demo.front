"use client";

import Header from "@/components/header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Sidebar from "@/components/sidebar";
import { Input } from "@/components/ui/input";
import { useBoardStore } from "@/stores/useBoardStore";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useCommentStore } from "@/stores/useCommentStore";
import { CommentRequest } from "@/types/comment";
export default function VideoPage() {
  const { getBoardById, board } = useBoardStore();
  const { createComment, comments, getComments } = useCommentStore();
  const params = useParams();
  const boardId = params.id as string;

  const [commentRequest, setCommentRequest] = useState<CommentRequest>({
    content: "",
    parentId: "",
    boardId: "",
  });

  useEffect(() => {
    if (boardId) {
      getComments(boardId);
      setCommentRequest({
        ...commentRequest,
        boardId: boardId,
      });
      getBoardById(boardId);
    }
  }, [boardId, getBoardById, getComments]);

  const handleSubmit = () => {
    createComment(boardId, commentRequest);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 py-8 md:grid-cols-4 md:px-3 py-8">
        <div className="md:col-span-3">
          <div className="rounded-lg border bg-card shadow-sm mb-8">
            <video width="100%" height="100%" controls>
              <source
                src={`https://highl-file.s3.ap-northeast-2.amazonaws.com/${board?.videoUrl}`}
                type="video/mp4"
              />
              <track kind="subtitles" src="subtitles.vtt" label="English" />
            </video>
            <div className="p-4">
              <h1 className="text-2xl font-bold">{board?.title}</h1>
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
                    <AvatarFallback>
                      {board?.member.id.charAt(0)}
                    </AvatarFallback>
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

          <div className="rounded-lg border bg-card p-4 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold">100 Comments</h2>
            <div className="space-y-4">
              {comments.map((comment) => (
                <div className="flex gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={comment.member.iconUrl} alt="User" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      {comment.member.gameName ? (
                        <p className="text-sm font-medium text-gray-500">
                          {comment.member.gameName} #{comment.member.tagLine}
                        </p>
                      ) : (
                        <p className="text-sm font-medium text-gray-500">
                          {comment.member.id}
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground">
                        {comment.createdDate}
                      </p>
                    </div>
                    <p className="text-sm">{comment.content}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex gap-2">
              <Input
                placeholder="Add a comment..."
                className="flex-1"
                value={commentRequest.content}
                onChange={(e) =>
                  setCommentRequest({
                    ...commentRequest,
                    content: e.target.value,
                  })
                }
              />
              <Button onClick={() => handleSubmit()}>Submit</Button>
            </div>
          </div>
        </div>
        <div className="md:col-span-1">
          <Sidebar />
        </div>
      </main>
    </div>
  );
}
