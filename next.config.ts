import type { NextConfig } from "next";
const NEXT_PUBLIC_API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8081";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${NEXT_PUBLIC_API_URL}/api/:path*`,
      },
      {
        source: "/logout",
        destination: `${NEXT_PUBLIC_API_URL}/logout`,
      },
    ];
  },
  images: {
    domains: ["https://via.placeholder.com"],
  },
};

export default nextConfig;
