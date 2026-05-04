'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useSession, signIn, signUp, signOut } from '@/lib/auth-client';
import { User } from '@/types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: session, isPending } = useSession();

  // Typecast to our internal User type to avoid breaking existing components
  const user = (session?.user as unknown as User) || null;
  const loading = isPending;

  const login = async (email: string, password: string) => {
    const { data, error } = await signIn.email({ email, password });
    if (error) throw new Error(error.message || 'Login failed');
  };

  const register = async (name: string, email: string, password: string) => {
    const { data, error } = await signUp.email({ name, email, password });
    if (error) throw new Error(error.message || 'Registration failed');
  };

  const logout = async () => {
    await signOut();
    window.location.href = '/login'; // Force redirect to clear app state
  };

  const updateUser = (updatedUser: User) => {
    // With Better Auth, session is managed by the library. 
    // Usually you call a refetch or the library updates it automatically.
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
