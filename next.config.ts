import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:8081/api/:path*",
      },
      {
        source: "/api/login",
        destination: "http://localhost:8081/login",
      },
      {
        source: "/logout",
        destination: "http://localhost:8081/logout",
      },
      {
        source: "/auth",
        destination: "http://localhost:8081/auth",
      }
    ];
  },
  images: {
    domains: ["https://via.placeholder.com"],
  },
};

export default nextConfig;
