import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import ErrorDialog from "@/components/error-dialog";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "highlighter-DEMO",
  description: "lol highlighter version.demo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>  
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <ErrorDialog />
        </ThemeProvider>
      </body>
    </html>
  );
}