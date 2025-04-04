"use client";

import { ThemeProvider } from "@/components/header/theme-provider";
import ErrorDialog from "@/components/error/error-dialog";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
      <ErrorDialog />
    </ThemeProvider>
  );
} 