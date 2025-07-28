import { Board } from "@/types/board";
import { Heart, MessageCircle, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { env } from "process";

interface BoardCardProps {
  board: Board;
  isLiked: boolean;
  onLike: (boardId: string) => void;
}

export function BoardCard({ board, isLiked, onLike }: BoardCardProps) {
  const router = useRouter();

  return (
    <div
      className="rounded-lg border bg-card shadow-sm cursor-pointer hover:bg-accent/50 transition-colors"
      onClick={() => router.push(`/board/${board.id}`)}
    >
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={board.member.iconUrl} alt={board.member.id} />
              <AvatarFallback>{board.member.id.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center space-x-2">
                <p className="font-medium">{board.member.gameName}</p>
                <p className="text-sm text-gray-500">#{board.member.tagLine}</p>
              </div>
              <p className="text-sm text-muted-foreground">{board.member.id}</p>
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
          // src={`${process.env.NEXT_PUBLIC_S3_BASE_URL}/${board.videoUrl}`}
          src={"/dummy.mp4"}
          type="video/mp4"
        />
      </video>

      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-6">
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-1"
            onClick={(e) => {
              e.stopPropagation();
              onLike(board.id);
            }}
          >
            <Heart
              className={`h-5 w-5 ${
                isLiked ? "fill-red-500 text-red-500" : ""
              }`}
            />
            <span>{isLiked ? board.likes + 1 : board.likes}</span>
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
  );
}
