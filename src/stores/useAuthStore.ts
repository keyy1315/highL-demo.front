import { login, logout } from "@/lib/api/loginApi";
import axios from "axios";
import { create } from "zustand";
import { getMember, signup } from "@/lib/api/memberApi";
import { Member } from "@/types/member";

interface AuthState {
  member: Member | null;
  isLoggedIn: boolean;
  setMember: (member: Member | null) => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  login: (userId: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signup: (userId: string, password: string) => Promise<void>;
  getMember: (userId: string) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  member: null,
  isLoggedIn: false,
  setMember: (member) => set({ member }),
  setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
  login: async (userId: string, password: string) => {
    try {
      const response = await login({ userId, password });
      const member = response.data;
      set({ member, isLoggedIn: true });

      if (member && member.id) {
        const encryptedMemberId = btoa(member.id);
        localStorage.setItem(`${process.env.LOCAL_STORAGE_KEY}`, encryptedMemberId);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        set({ isLoggedIn: false });
      }
    }
  },
  logout: async () => {
    try {
      await logout();
      set({ isLoggedIn: false, member: null });
      localStorage.removeItem("memberId");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
      }
    }
  },
  signup: async (userId: string, password: string) => {
    try {
      await signup({ userId, password });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
      }
    }
  },
  getMember: async (userId: string) => {
    try {
      const response = await getMember(userId);
      set({ member: response });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
      }
    }
  },
}));
