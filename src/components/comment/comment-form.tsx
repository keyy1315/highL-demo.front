"use client";

import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CommentRequest } from "@/types/comment";
import { createComment } from "@/lib/api/commentApi";

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

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createComment,
    onSuccess: () => {
      setContent(""); // Clear input after successful submission
      queryClient.invalidateQueries({ queryKey: ["comments", boardId] });
    },
    onError: (error) => {
       console.error("Failed to create comment:", error);
       // Optionally: Add user feedback like a toast notification
    }
  });

  const handleSubmit = () => {
    if (!content.trim()) return; // Prevent submitting empty comments

    const commentRequest: CommentRequest = {
      content: content.trim(),
      parentId,
      boardId,
    };
    mutation.mutate(commentRequest);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Submit on Enter unless Shift is pressed
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Prevent default Enter behavior (like line break in textarea)
      handleSubmit();
    }
  }

  const handleCancel = () => {
    setContent(""); // Clear content
    if (onCancel) {
      onCancel(); // Call the cancel callback
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
          disabled={mutation.isPending || !content.trim()}
          aria-label={parentId ? "Submit Reply" : "Submit Comment"}
        >
          {mutation.isPending ? "Submitting..." : (parentId ? "Reply" : "Comment")}
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