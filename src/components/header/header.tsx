"use client";
import { ModeToggle } from "./mode-toggle";
import Link from "next/link";
import UserToggle from "./user-toggle";
import { useAuthStore } from "@/stores/useAuthStore";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { useEffect } from "react";
import { NotificationBell } from "../notification/notification-bell";

export default function Header() {
  const { member, isLoggedIn, checkLoginStatus, getMemberByCookie } =
    useAuthStore();

  useEffect(() => {
    checkLoginStatus();
    if (isLoggedIn) {
      getMemberByCookie();
    }
  }, [checkLoginStatus, getMemberByCookie, isLoggedIn]);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between md:px-8">
        <Link href="/" className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6 text-primary"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="m9 8 6 4-6 4Z" />
          </svg>
          <span className="text-xl font-bold">HighLighter</span>
        </Link>
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <>
              <div className="flex items-center gap-2">
                <Link href="/write">
                  <Button size={"sm"} className="gap-1">
                    <Plus className="w-4 h-4" />
                    <span className="hidden sm:inline">Write</span>
                  </Button>
                </Link>
                <NotificationBell />
                <ModeToggle />
              </div>
              <div className="relative h-8 w-8 overflow-hidden rounded-full ml-1">
                <UserToggle member={member} />
              </div>
            </>
          ) : (
            <Link href="/login">
              <Button>Login</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
