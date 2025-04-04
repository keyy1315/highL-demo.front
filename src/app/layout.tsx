import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "../components/error/providers";
import { NotificationProvider } from "@/context/notification-context";

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
        <NotificationProvider>
        <Providers>{children}</Providers>
        </NotificationProvider>
      </body>
    </html>
  );
}
