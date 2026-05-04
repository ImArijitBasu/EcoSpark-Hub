import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BackToTop from "@/components/layout/BackToTop";
import CustomCursor from "@/components/layout/CustomCursor";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/react";

const defaultUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: {
    default: "EcoSpark Hub — Sustainable Ideas Community",
    template: "%s | EcoSpark Hub",
  },
  description: "Share, discover, and vote on eco-friendly ideas that make a real impact. Join the EcoSpark Hub community to help build a sustainable future.",
  keywords: ["sustainability", "eco-friendly", "green tech", "renewable energy", "community action", "environment", "climate change solutions"],
  authors: [{ name: "EcoSpark Hub Team" }],
  creator: "Arijit Basu",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "EcoSpark Hub",
    title: "EcoSpark Hub — Interactive Sustainability Community",
    description: "Join thousands of environmental advocates. Share your green ideas, upvote solutions, and connect with people making real impact globally.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1542601906990-b4d3fb773b09?q=80&w=1200&h=630&fit=crop", // highly optimized 1200x630 dimension, perfect for WhatsApp, Facebook, iMessage
        width: 1200,
        height: 630,
        alt: "EcoSpark Hub - Building a Sustainable Future",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EcoSpark Hub — Sustainable Ideas Community",
    description: "Share, discover, and vote on eco-friendly ideas that make a real impact.",
    images: ["https://images.unsplash.com/photo-1542601906990-b4d3fb773b09?q=80&w=1200&h=630&fit=crop"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Outfit:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <AuthProvider>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#1e293b',
                color: '#e2e8f0',
                border: '1px solid rgba(148, 163, 184, 0.1)',
                borderRadius: '12px',
                fontSize: '14px',
              },
              success: {
                iconTheme: { primary: '#10b981', secondary: '#fff' },
              },
              error: {
                iconTheme: { primary: '#ef4444', secondary: '#fff' },
              },
            }}
          />
          <CustomCursor />
          <Navbar />
          <main className="flex-1 pt-16">
            {children}
          </main>
          <Footer />
          <BackToTop />
        </AuthProvider>
        <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
