"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NotificationProvider } from "@/providers/notificationContext";
import { ThemeProvider } from "next-themes";
import { Member } from "@/types/member";
import { useAuthStore } from "@/stores/useAuthStore";
import { useEffect } from "react";
import EdgeProvider from "./edgeProvider";

const queryClient = new QueryClient();

interface ProvidersWrapperProps {
  children: React.ReactNode;
  member: Member | null;
}

export default function ProvidersWrapper({
  children,
  member,
}: ProvidersWrapperProps) {
  const { setMember, setIsLoggedIn } = useAuthStore();
  useEffect(() => {
    if (member) {
      setMember(member);
      setIsLoggedIn(true);
    } else {
      setMember(null);
      setIsLoggedIn(false);
    }
  }, [member]);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <EdgeProvider>
          <NotificationProvider>{children}</NotificationProvider>
        </EdgeProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
