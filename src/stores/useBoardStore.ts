import {create} from "zustand";
import {Board} from "@/types/board";
import {getBoards, getBoardByFollow, getBoard} from "@/lib/api/boardApi";
import axios from "axios";
import { useErrorStore } from "@/stores/useErrorStore";

interface BoardState {
    boards: Board[];
    board: Board | null;
    loading: boolean;
    error: string | null;
    getBoards: (category?: string, sort?: string, desc?: boolean) => Promise<void>
    getBoardByFollow: (category?: string, sort?: string, desc?: boolean) => Promise<void>
    getBoardById: (id: string) => Promise<void>
}

export const useBoardStore = create<BoardState>((set) => ({
    boards: [],
    board: null,
    loading: false,
    error: null,
    getBoards: async (category?: string, sort?: string, desc?: boolean) => {
        const showError = useErrorStore.getState().showError;
        try {
            set({loading: true, error: null});
            const boards = await getBoards(category, sort, desc); 
            set({boards, loading: false});
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                showError(error.response.data.message, error.response.data.errorCode);
            }
        }
    },
    getBoardByFollow: async (category?: string, sort?: string, desc?: boolean) => {
        const showError = useErrorStore.getState().showError;
        try {
            set({ loading: true, error: null });
            const response = await getBoardByFollow(category, sort, desc);
            set({ boards: response, loading: false });
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                showError(error.response.data.message, error.response.data.errorCode);
            }
        }
    },
    getBoardById: async (id: string) => {
        const showError = useErrorStore.getState().showError;
        try {
            set({ loading: true, error: null });
            const board = await getBoard(id);
            set({ board, loading: false });
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                showError(error.response.data.message, error.response.data.errorCode);
            }
        }
    }
}));
