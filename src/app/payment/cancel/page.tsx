'use client';

import Link from 'next/link';
import { HiOutlineXCircle } from 'react-icons/hi';

export default function PaymentCancelPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="glass rounded-3xl p-8 sm:p-12 text-center max-w-md">
        <div className="w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-6">
          <HiOutlineXCircle className="w-12 h-12 text-red-400" />
        </div>
        <h1 className="text-2xl font-bold text-white mb-3 font-[family-name:var(--font-heading)]">Payment Cancelled</h1>
        <p className="text-dark-400 mb-8">Your payment was not completed. You have not been charged.</p>
        <div className="flex gap-3">
          <Link href="/ideas" className="btn-primary flex-1 py-3 text-center">Browse Ideas</Link>
          <Link href="/" className="btn-secondary flex-1 py-3 text-center">Go Home</Link>
        </div>
      </div>
    </div>
  );
}
