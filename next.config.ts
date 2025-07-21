import type { NextConfig } from "next";
const NEXT_PUBLIC_API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8081";

const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";

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
      {
        source: "/api/analyze",
        destination: `${NEXT_PUBLIC_URL}/api/analyze`,
      },
    ];
  },
  images: {
    domains: ["https://via.placeholder.com"],
  },
};

export default nextConfig;
