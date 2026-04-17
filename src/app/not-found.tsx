import Link from 'next/link';
import { HiOutlineHome } from 'react-icons/hi';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="relative mb-8">
          <span className="text-[150px] font-extrabold font-[family-name:var(--font-heading)] text-primary-500/10 leading-none select-none">
            404
          </span>
          <span className="absolute inset-0 flex items-center justify-center text-6xl">
            🌿
          </span>
        </div>
        <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-dark-900 dark:text-white mb-3">
          Page Not Found
        </h1>
        <p className="text-dark-600 dark:text-dark-400 mb-8">
          Looks like this path doesn&apos;t lead anywhere sustainable.
          Let&apos;s get you back on track.
        </p>
        <div className="flex gap-3 justify-center">
          <Link href="/" className="btn-primary flex items-center gap-2">
            <HiOutlineHome className="w-4 h-4" /> Go Home
          </Link>
          <Link href="/ideas" className="btn-secondary">
            Browse Ideas
          </Link>
        </div>
      </div>
    </div>
  );
}
