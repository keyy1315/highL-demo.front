"use client";

import { CommentRequest } from "@/types/comment";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface CommentFormProps {
  commentRequest: CommentRequest;
  onSubmit: () => void;
  onChange: (content: string) => void;
  onCancel: () => void;
  replyingTo?: string; // 답글 대상의 사용자 ID
}

export default function CommentForm({ 
  commentRequest, 
  onSubmit, 
  onChange, 
  onCancel,
  replyingTo 
}: CommentFormProps) {
  return (
    <div className="mt-4 flex flex-col gap-2">
      {replyingTo && (
        <p className="text-sm text-muted-foreground">
          답글 대상: <span className="font-medium text-blue-500">@{replyingTo}</span>
        </p>
      )}
      <div className="flex gap-2">
        <Input
          placeholder={commentRequest.parentId ? "Write a reply..." : "Add a comment..."}
          className="flex-1"
          value={commentRequest.content}
          onChange={(e) => onChange(e.target.value)}
        />
        <Button 
          onClick={onSubmit}
          variant="default"
        >
          {commentRequest.parentId ? "Reply" : "Comment"}
        </Button>
        {commentRequest.parentId && (
          <Button 
            onClick={onCancel}
            variant="ghost"
          >
            Cancel
          </Button>
        )}
      </div>
    </div>
  );
} 