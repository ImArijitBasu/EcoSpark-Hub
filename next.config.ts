import type { NextConfig } from "next";

const API_BASE = process.env.NEXT_PUBLIC_API_URL?.replace("/api", "") || "http://localhost:5000";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
    ],
  },
  // Proxy all /api/* requests through Next.js so session cookies are sent
  // securely to the backend on the same origin (first-party). This prevents 
  // cross-domain cookie blocking when the frontend and backend are on different domains.
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${API_BASE}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
