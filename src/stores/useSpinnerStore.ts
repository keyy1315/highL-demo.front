import { create } from "zustand";


interface SpinnerStore {
    isLoading: boolean;
    setIsLoading: (isLoading: boolean) => void;
}

export const useSpinnerStore = create<SpinnerStore>((set) => ({
    isLoading: false,
    setIsLoading: (isLoading) => set({ isLoading }),
}));