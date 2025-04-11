'use client';

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NotificationProvider } from "@/context/notification-context";
import { Providers } from "./error/providers";

const queryClient = new QueryClient();

export default function ProvidersWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <NotificationProvider>
        <Providers>{children}</Providers>
      </NotificationProvider>
    </QueryClientProvider>
  );
} 