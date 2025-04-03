"use client";

import { create } from "zustand";

interface ErrorState {
  message: string | null;
  errorCode: string | null;
  showError: (message: string, errorCode: string) => void;
  clearError: () => void;
}

export const useErrorStore = create<ErrorState>((set) => ({
  message: null,
  errorCode: null,
  showError: (message: string, errorCode: string) => {
    set({ message: message, errorCode: errorCode });
  },
  clearError: () => set({ message: null, errorCode: null }),
}));
