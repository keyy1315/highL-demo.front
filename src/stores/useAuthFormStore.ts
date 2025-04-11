import { create } from "zustand";
import { LoginRequest } from "@/types/member";

const initialLoginRequest: LoginRequest = {
    userId: "",
    password: "",
}

interface AuthFormStore {
    form: LoginRequest;
    setField: <K extends keyof LoginRequest>(field: K, value: LoginRequest[K]) => void;
    resetForm: () => void;
}

export const useAuthFormStore = create<AuthFormStore>((set) => ({
    form: initialLoginRequest,
    setField: (field, value) => set((state) => ({ form: { ...state.form, [field]: value } })),
    resetForm: () => set({ form: initialLoginRequest }),
}));





