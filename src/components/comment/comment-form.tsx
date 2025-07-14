"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CommentRequest } from "@/types/comment";
import { useComments } from "@/hooks/useComments";

interface CommentFormProps {
  boardId: string;
  parentId?: string | null;
  replyingTo?: string; // User ID being replied to
  onSuccess?: () => void; // Callback on successful submission
  onCancel?: () => void;  // Callback to cancel reply mode
  initialContent?: string; // Optional initial content for replies
}

export default function CommentForm({
  boardId,
  parentId = null,
  onCancel,
  initialContent = ""
}: CommentFormProps) {
  const [content, setContent] = useState(initialContent);

  useEffect(() => {
    setContent(initialContent);
  }, [initialContent]);
  const { createCommentMutation, isCreatingComment } = useComments(boardId);

  const handleSubmit = () => {
    if (!content.trim()) return;

    const commentRequest: CommentRequest = {
      content: content.trim(),
      parentId,
      boardId,
    };
    createCommentMutation(commentRequest);
    setContent("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  }

  const handleCancel = () => {
    setContent("");
    if (onCancel) {
      onCancel();
    }
  }

  return (
    <div className="mt-4 flex flex-col gap-2">
      <div className="flex gap-2">
        <Input
          placeholder={parentId ? "Write your reply..." : "Add a comment..."}
          className="flex-1"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Button
          onClick={handleSubmit}
          variant="default"
          disabled={isCreatingComment || !content.trim()}
          aria-label={parentId ? "Submit Reply" : "Submit Comment"}
        >
          {isCreatingComment ? "Submitting..." : (parentId ? "Reply" : "Comment")}
        </Button>
        {parentId && onCancel && (
          <Button
            onClick={handleCancel}
            variant="ghost"
            aria-label="Cancel Reply"
            tabIndex={0}
          >
            Cancel
          </Button>
        )}
      </div>
    </div>
  );
} 