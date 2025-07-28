import Spinner from "@/components/common/spinner";
import AlertController from "@/components/common/alertController";
import { useAlertController } from "@/stores/useAlertControllerStore";
import { useSpinnerStore } from "@/stores/useSpinnerStore";
import { useEffect } from "react";

declare global {
  interface Window {
    neoAlert: (msg?: string, alertTitle?: string, alertBtn?: Function) => void;
    neoConfirm: (
      msg?: string,
      confirmTitle?: string,
      confirmBtn?: Function,
      cancelBtn?: Function
    ) => void;
  }
}

interface EdgeProviderProps {
  children: React.ReactNode;
}

export default function EdgeProvider({ children }: EdgeProviderProps) {
  const { isLoading } = useSpinnerStore();

  const {
    setAlertMsg,
    setAlertBtn,
    setAlert,
    setAlertTitle,
    setConfirmTitle,
    setConfirmMsg,
    setConfirmBtn,
    setCancelBtn,
    setConfirm,
  } = useAlertController();
  const alertFunc = (msg: string, alertTitle: string, alertBtn: Function) => {
    setAlertMsg(msg);
    setAlertTitle(alertTitle);
    setAlertBtn(alertBtn);
    setAlert(true);
  };

  const confirmFunc = (
    msg: string,
    confirmTitle: string,
    confirmBtn: Function,
    cancelBtn: Function
  ) => {
    setConfirmMsg(msg);
    setConfirmTitle(confirmTitle);
    setConfirmBtn(confirmBtn);
    setCancelBtn(cancelBtn);
    setConfirm(true);
  };

  useEffect(() => {
    // Override window.alert
    const originalAlert = window.alert;
    window.alert = function (msg: string, alertTitle?: string) {
      alertFunc(msg, alertTitle || "", () => setAlert(false));
    };

    // Override window.confirm
    const originalConfirm = window.confirm;
    window.confirm = function (msg?: string, confirmTitle?: string): boolean {
      if (!msg) return false;
      let result = false;
      confirmFunc(
        msg,
        confirmTitle || "",
        () => {
          result = true;
          setConfirm(false);
        },
        () => {
          result = false;
          setConfirm(false);
        }
      );
      return result;
    };

    // Custom alert function
    window.neoAlert = function (msg, alertTitle?: string, alertBtn?: Function) {
      if (!msg) return;
      alertFunc(msg, alertTitle || "알림", alertBtn || (() => setAlert(false)));
    };

    // Custom confirm function
    window.neoConfirm = function (
      msg: string | undefined,
      confirmTitle?: string,
      confirmBtn?: Function,
      cancelBtn?: Function
    ) {
      if (!msg) return;
      confirmFunc(
        msg,
        confirmTitle || "",
        confirmBtn || (() => setConfirm(false)),
        cancelBtn || (() => setConfirm(false))
      );
    };

    // Cleanup function
    return () => {
      window.alert = originalAlert;
      window.confirm = originalConfirm;
    };
  }, []);

  return (
    <>
      {children}
      {isLoading && <Spinner />}
      <AlertController />
    </>
  );
}
