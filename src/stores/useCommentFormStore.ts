import { CommentRequest } from "@/types/comment";
import { create } from "zustand";

export const initialCommentRequest: CommentRequest = {
    content: "",
    parentId: null,
    boardId: "",
}

interface CommentFormStore {
    form: CommentRequest;
    setField: <K extends keyof CommentRequest>(field: K, value: CommentRequest[K]) => void;
    resetForm: () => void;
}

export const useCommentFormStore = create<CommentFormStore>((set) => ({
    form: initialCommentRequest,
    setField: (field, value) => set((state) => ({ form: { ...state.form, [field]: value } })),
    resetForm: () => set({ form: initialCommentRequest }),
}));