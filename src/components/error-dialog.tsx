"use client";

import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogAction,
    AlertDialogFooter,
    AlertDialogHeader,
  } from "./ui/alert-dialog";
  
  import { useRouter } from "next/navigation";
  import { useErrorStore } from "@/stores/useErrorStore";
  
  export default function ErrorDialog() {
    const { message, clearError } = useErrorStore();
    console.log("ErrorDialog 랜더링됨 : ", message);
  
    const router = useRouter();
  
    return (
      <AlertDialog open={!!message}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>오류 발생</AlertDialogTitle>
          </AlertDialogHeader>
  
          <AlertDialogDescription>{message}</AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => {
              clearError();
              router.push("/login");
            }}>
              Login
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }
  