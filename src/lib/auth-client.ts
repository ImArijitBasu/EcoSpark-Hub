import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  // In production the Next.js rewrite proxy forwards /api/auth/* to the
  // real backend, so the browser always talks to its own origin and cookies
  // are stored as first-party. No cross-domain cookie issues.
  baseURL: typeof window !== "undefined" ? window.location.origin : (process.env.NEXT_PUBLIC_API_URL?.replace("/api", "") || "http://localhost:5000"),
});

export const {
  useSession,
  signIn,
  signUp,
  signOut,
} = authClient;
