'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import api from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import { HiOutlineCheckCircle } from 'react-icons/hi';

function SuccessContent() {
  const searchParams = useSearchParams();
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    const ideaId = searchParams.get('idea_id');
    if (sessionId && isAuthenticated) {
      api.get(`/payments/verify/${sessionId}`)
        .then(() => setVerified(true))
        .catch(() => {});
    }
  }, [searchParams, isAuthenticated]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="glass rounded-3xl p-8 sm:p-12 text-center max-w-md glow-emerald-sm">
        <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-6">
          <HiOutlineCheckCircle className="w-12 h-12 text-emerald-400" />
        </div>
        <h1 className="text-2xl font-bold text-white mb-3 font-[family-name:var(--font-heading)]">Payment Successful!</h1>
        <p className="text-dark-400 mb-8">Thank you for your purchase. You now have full access to the premium idea content.</p>
        <div className="flex gap-3">
          <Link href={`/ideas/${searchParams.get('idea_id') || ''}`} className="btn-primary flex-1 py-3 text-center">View Idea</Link>
          <Link href="/ideas" className="btn-secondary flex-1 py-3 text-center">Browse Ideas</Link>
        </div>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-10 h-10 border-3 border-primary-500/30 border-t-primary-500 rounded-full animate-spin" /></div>}>
      <SuccessContent />
    </Suspense>
  );
}
