"use client";

import { Comment } from "@/types/comment";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface CommentItemProps {
  comment: Comment;
  onCommentClick: (comment: Comment, parentComment?: Comment) => void;
  isChild?: boolean;
  parentComment?: Comment;
}

export default function CommentItem({ 
  comment, 
  onCommentClick,
  isChild = false,
  parentComment
}: CommentItemProps) {
  // 멘션된 사용자 ID를 추출하는 함수
  const extractMention = (content: string) => {
    const mentionMatch = content.match(/^@(\S+)\s/);
    return mentionMatch ? mentionMatch[1] : null;
  };

  const mentionedUser = extractMention(comment.content);

  const handleClick = () => {
    // 대댓글인 경우 부모 댓글 정보와 함께 전달
    onCommentClick(comment, parentComment);
  };

  return (
    <div className="space-y-3">
      <div 
        className={`flex gap-3 cursor-pointer hover:bg-accent/50 p-2 rounded-md transition-colors ${
          isChild ? 'ml-8 border-l-2 border-accent pl-4' : ''
        }`}
        onClick={handleClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleClick();
          }
        }}
      >
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
            {isChild && (
              <span className="text-xs text-muted-foreground">
                • 답글
              </span>
            )}
          </div>
          <p className="text-sm">
            {mentionedUser ? (
              <>
                <span className="text-blue-500 font-medium">@{mentionedUser}</span>
                {" "}
                {comment.content.substring(mentionedUser.length + 2)}
              </>
            ) : (
              comment.content
            )}
          </p>
        </div>
      </div>
      {/* 2단계까지만 대댓글 표시 */}
      {!isChild && comment.childComments && comment.childComments.length > 0 && (
        <div className="space-y-3">
          {comment.childComments.map((childComment) => (
            <CommentItem
              key={childComment.id}
              comment={childComment}
              onCommentClick={onCommentClick}
              isChild={true}
              parentComment={comment}
            />
          ))}
        </div>
      )}
    </div>
  );
} 