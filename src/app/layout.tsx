import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ProvidersWrapper from "@/components/providers";
import Header from "@/components/common/header/header";
import Footer from "@/components/common/footer";
import { getAuth } from "@/lib/api/loginApi";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "highlighter-DEMO",
  description: "lol highlighter version.demo",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const member = await getAuth();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ProvidersWrapper member={member}>
          <Header />
          {children}
          <Footer />
        </ProvidersWrapper>
      </body>
    </html>
  );
}
