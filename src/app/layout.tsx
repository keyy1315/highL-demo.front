import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ProvidersWrapper from "@/components/providers";
import Header from "@/components/common/header/header";
import Footer from "@/components/common/footer";
import { getMemberByToken } from "@/lib/api/memberApi";
import { cookies } from "next/headers";

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
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(
    `${process.env.NEXT_PUBLIC_ACCESS_TOKEN_HEADER}`
  )?.value;
  const refreshToken = cookieStore.get(
    `${process.env.NEXT_PUBLIC_REFRESH_TOKEN_HEADER}`
  )?.value;

  const cookieHeader = [
    accessToken ? `${process.env.NEXT_PUBLIC_ACCESS_TOKEN_HEADER}=${accessToken}` : "",
    refreshToken ? `${process.env.NEXT_PUBLIC_REFRESH_TOKEN_HEADER}=${refreshToken}` : "",
  ]
    .filter(Boolean)
    .join("; ");

  const member = await getMemberByToken(cookieHeader);

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
