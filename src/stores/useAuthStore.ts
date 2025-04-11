import { checkLoginStatus, login, logout } from "@/lib/api/loginApi";
import axios from "axios";
import { create } from "zustand";
import { getMember, getMemberByCookie, signup } from "@/lib/api/memberApi";
import { Member } from "@/types/member";
import { useErrorStore } from "./useErrorStore";

interface AuthState {
  loading: boolean;
  error: string | null;
  member: Member | null;
  login: (userId: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signup: (userId: string, password: string) => Promise<void>;
  getMember: (userId: string) => Promise<void>;
  resetState: () => void;
  checkLoginStatus: () => Promise<void>;
  isLoggedIn: boolean;
  getMemberByCookie: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  loading: false,
  error: null,
  member: null,
  isLoggedIn: false,
  login: async (userId: string, password: string) => {
    const showError = useErrorStore.getState().showError;
    try {
      set({ loading: true, error: null });
      const response = await login({ userId, password });
      set({ isLoggedIn: response.data, loading: false });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        set({ loading: false, isLoggedIn: false });
        showError(error.response.data, error.code || "UNKNOWN_ERROR");
    }
    }
  },
  logout: async () => {
    const showError = useErrorStore.getState().showError;
    try {
      const response = await logout();
      set({ isLoggedIn: response, loading: false, error: null, member: null });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        set({ loading: false });
        showError(error.response.data, error.response.data.status);
      }
    }
  },
  signup: async (userId: string, password: string) => {
    const showError = useErrorStore.getState().showError;
    try {
      set({ loading: true, error: null });
      await signup({ userId, password });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        set({ loading: false });
        showError(error.response.data, error.response.data.status);
      }
    }
  },
  getMember: async (userId: string) => {
    const showError = useErrorStore.getState().showError;
    try {
      const response = await getMember(userId);
      console.log("response", response);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        set({ loading: false });
        showError(error.response.data, error.response.data.status);
      }
    }
  },
  resetState: () => set({ loading: false, error: null, member: null }),
  checkLoginStatus: async () => {
    const showError = useErrorStore.getState().showError;
    try {
      const response = await checkLoginStatus();
      set({ isLoggedIn: response, loading: false });
    } catch (error) {
      set({ isLoggedIn: false, loading: false });
      if (axios.isAxiosError(error) && error.response) {
        showError(error.response.data, error.response.data.status);
      }
    }
  },
  getMemberByCookie: async () => {
    const showError = useErrorStore.getState().showError;
    try {
      const response = await getMemberByCookie();
      set({ member: response });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        showError(error.response.data, error.response.data.status);
      }
    }
  },
}));
