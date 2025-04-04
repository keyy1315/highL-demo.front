import {
  getComments,
  createComment,
  deleteComment,
  updateComment,
} from "@/lib/api/commentApi";
import { Comment, CommentRequest } from "@/types/comment";
import { create } from "zustand";
import { useErrorStore } from "./useErrorStore";
import axios from "axios";

interface CommentState {
  comments: Comment[];
  comment: Comment | null;
  loading: boolean;
  error: string | null;
  getComments: (boardId: string, sort?: string, asc?: boolean) => Promise<void>;
  createComment: (commentRequest: CommentRequest) => Promise<void>;
  deleteComment: (commentId: string) => Promise<void>;
  updateComment: (
    commentId: string,
    commentRequest: CommentRequest
  ) => Promise<void>;
}

export const useCommentStore = create<CommentState>((set) => ({
  comments: [],
  comment: null,
  loading: false,
  error: null,
  getComments: async (boardId: string, sort?: string, asc?: boolean) => {
    const showError = useErrorStore.getState().showError;
    try {
      set({ loading: true, error: null });
      const response = await getComments(boardId, sort, asc);
      set({ comments: response, loading: false });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        showError(error.response.data.message, error.response.data.errorCode);
      }
    }
  },
  createComment: async (commentRequest: CommentRequest) => {
    const showError = useErrorStore.getState().showError;
    try {
      set({ loading: true, error: null });
      const response = await createComment(commentRequest);
      set({ comment: response, loading: false });
      await useCommentStore.getState().getComments(commentRequest.boardId);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        showError(error.response.data.message, error.response.data.errorCode);
      }
    }
  },
  deleteComment: async (commentId: string) => {
    const showError = useErrorStore.getState().showError;
    try {
      set({ loading: true, error: null });
      const response = await deleteComment(commentId);
      set({ comment: response, loading: false });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        showError(error.response.data.message, error.response.data.errorCode);
      }
    }
  },
  updateComment: async (commentId: string, commentRequest: CommentRequest) => {
    const showError = useErrorStore.getState().showError;
    try {
      set({ loading: true, error: null });
      const response = await updateComment(commentId, commentRequest);
      set({ comment: response, loading: false });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        showError(error.response.data.message, error.response.data.errorCode);
      }
    }
  },
}));
