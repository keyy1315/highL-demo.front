"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogFooter,
  AlertDialogHeader,
} from "../ui/alert-dialog";

import { useRouter } from "next/navigation";
import { useErrorStore } from "@/stores/useErrorStore";
import { useEffect, useState } from "react";

export default function ErrorDialog() {
  const { message, errorCode, clearError } = useErrorStore();
  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState(
    typeof message === 'object' ? "!Server Error" : message
  );
  const [buttonText, setButtonText] = useState("확인");

  useEffect(() => {
    if (errorCode === "UNAUTHORIZED") {
      setErrorMessage("로그인이 필요합니다.");
      setButtonText("로그인");
    } else if (errorCode === "FORBIDDEN") {
      setErrorMessage("권한이 없습니다.");
      setButtonText("확인");
    } else if (
      errorCode === "INTERNAL_SERVER_ERROR" ||
      errorCode === "SERVICE_UNAVAILABLE"
    ) {
      setErrorMessage(`오류가 발생했습니다.\n${typeof message === 'object' ? "!Server Error" : message}`);
      setButtonText("홈으로");
    } else if (errorCode === "SUCCESS") {
      setErrorMessage(typeof message === 'object' ? "!Server Error" : message);
      setButtonText("확인");
    } else {
      setErrorMessage(typeof message === 'object' ? "!Server Error" : message);
      setButtonText("확인");
    }
  }, [message, errorCode]);

  const handleErrorRoute = () => {
    clearError();
    if (buttonText === "로그인") {
      router.push("/login");
    } else if (buttonText === "홈으로") {
      router.push("/");
    }
  };

  return (
    <AlertDialog open={!!message}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>오류 발생</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription className="flex flex-col gap-2">
          <span className={`font-bold text-lg ${
            errorCode === "SUCCESS" ? "text-green-500" : "text-red-500"
          }`}>
            {errorCode}
          </span>
          <span className="text-gray-500 whitespace-pre-line">
            {errorMessage}
          </span>
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogAction
            onClick={() => {
              handleErrorRoute();
            }}
          >
            {buttonText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
