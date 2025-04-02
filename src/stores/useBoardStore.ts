import {create} from "zustand";
import {Board} from "@/types/board/board";
import {getBoards, getBoardByFollow} from "@/lib/api/boardApi";
import axios from "axios";
import { useErrorStore } from "@/stores/useErrorStore";
interface BoardState {
    boards: Board[];
    loading: boolean;
    error: string | null;
    getBoards: (category?: string, sort?: string, desc?: boolean) => Promise<void>
    getBoardByFollow: (category?: string, sort?: string, desc?: boolean) => Promise<void>
}

export const useBoardStore = create<BoardState>((set) => ({
    boards: [],
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
                showError(error.response.data.message);
            }
        }
    },
    getBoardByFollow: async (category?: string, sort?: string, desc?: boolean) => {
        const showError = useErrorStore.getState().showError;
        try {
            set({loading: true, error: null});
            const boards = await getBoardByFollow(category, sort, desc);
            set({boards: [boards], loading: false});
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                showError(error.response.data.message);
            }
        }
    }
}));
