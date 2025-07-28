import { create } from "zustand";

interface AlertControllerStore {
  alertTitle: string;
  alertMsg: string;
  alertBtn: Function;
  alert: boolean;
  confirmTitle: string;
  confirmMsg: string;
  confirmBtn: Function;
  cancelBtn: Function;
  confirm: boolean;
  setAlertTitle: (alertTitle: string) => void;
  setAlertMsg: (alertMsg: string) => void;
  setAlertBtn: (alertBtn: Function) => void;
  setAlert: (alert: boolean) => void;
  setConfirmTitle: (confirmTitle: string) => void;
  setConfirmMsg: (confirmMsg: string) => void;
  setConfirmBtn: (confirmBtn: Function) => void;
  setCancelBtn: (cancelBtn: Function) => void;
  setConfirm: (confirm: boolean) => void;
}

export const useAlertController = create<AlertControllerStore>((set) => ({
  alertTitle: "",
  alertMsg: "",
  alertBtn: () => {},
  alert: false,
  confirmTitle: "",
  confirmMsg: "",
  confirmBtn: () => {},
  cancelBtn: () => {},
  confirm: false,
  setAlertTitle: (alertTitle: string) =>
    set((state) => ({ ...state, alertTitle })),
  setAlertMsg: (alertMsg: string) => set((state) => ({ ...state, alertMsg })),
  setAlertBtn: (alertBtn: Function) => set((state) => ({ ...state, alertBtn })),
  setAlert: (alert: boolean) => set((state) => ({ ...state, alert })),
  setConfirmTitle: (confirmTitle: string) =>
    set((state) => ({ ...state, confirmTitle })),
  setConfirmMsg: (confirmMsg: string) =>
    set((state) => ({ ...state, confirmMsg })),
  setConfirmBtn: (confirmBtn: Function) =>
    set((state) => ({ ...state, confirmBtn })),
  setCancelBtn: (cancelBtn: Function) =>
    set((state) => ({ ...state, cancelBtn })),
  setConfirm: (confirm: boolean) => set((state) => ({ ...state, confirm })),
}));
