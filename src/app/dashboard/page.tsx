'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function DashboardRedirect() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.replace(user.role === 'ADMIN' ? '/dashboard/admin' : '/dashboard/member');
    }
  }, [user, loading, router]);

  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="w-10 h-10 border-3 border-primary-500/30 border-t-primary-500 rounded-full animate-spin" />
    </div>
  );
}
