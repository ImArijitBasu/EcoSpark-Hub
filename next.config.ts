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
  // Proxy /api/auth/* through Next.js so session cookies are set on the
  // same origin (first-party). This prevents cross-domain cookie blocking
  // when the frontend (Vercel) and backend (Render etc.) are on different domains.
  async rewrites() {
    return [
      {
        source: "/api/auth/:path*",
        destination: `${API_BASE}/api/auth/:path*`,
      },
    ];
  },
};

export default nextConfig;
