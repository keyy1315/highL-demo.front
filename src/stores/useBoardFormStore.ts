import { BoardRequest } from "@/types/board";
import { create } from "zustand";

export const initialBoardForm: BoardRequest = {
    title: "",
    content: "",
    category: "",
    tags: [],
}

interface BoardFormStore {
    form: BoardRequest;
    setField: <K extends keyof BoardRequest>(field: K, value: BoardRequest[K]) => void;
    resetForm: () => void;
}

export const useBoardFormStore = create<BoardFormStore>((set) => ({
    form: initialBoardForm,
    setField: (field, value) => set((state) => ({ form: { ...state.form, [field]: value } })),
    resetForm: () => set({ form: initialBoardForm }),
}));