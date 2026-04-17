'use client';

import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useEffect } from 'react';
import {
  HiOutlineHome, HiOutlineLightBulb, HiOutlinePlusCircle,
  HiOutlineUsers, HiOutlineClipboardCheck, HiOutlineLogout,
  HiOutlineCog, HiOutlineTag
} from 'react-icons/hi';

const memberLinks = [
  { href: '/dashboard/member', label: 'Overview', icon: HiOutlineHome },
  { href: '/dashboard/member/ideas', label: 'My Ideas', icon: HiOutlineLightBulb },
  { href: '/dashboard/member/create', label: 'Create Idea', icon: HiOutlinePlusCircle },
  { href: '/dashboard/member/profile', label: 'Profile', icon: HiOutlineCog },
];

const adminLinks = [
  { href: '/dashboard/admin', label: 'Overview', icon: HiOutlineHome },
  { href: '/dashboard/admin/ideas', label: 'Manage Ideas', icon: HiOutlineClipboardCheck },
  { href: '/dashboard/admin/members', label: 'Manage Members', icon: HiOutlineUsers },
  { href: '/dashboard/admin/categories', label: 'Categories', icon: HiOutlineTag },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated, loading, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }
  }, [loading, isAuthenticated, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-3 border-primary-500/30 border-t-primary-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) return null;

  const links = user?.role === 'ADMIN' ? adminLinks : memberLinks;

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-64 flex-col glass border-r border-white/5 fixed top-16 bottom-0 left-0 z-40">
        <div className="p-4 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center text-dark-900 dark:text-white font-bold">
              {user?.name?.charAt(0)}
            </div>
            <div>
              <p className="text-sm font-semibold text-dark-900 dark:text-white">{user?.name}</p>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary-500/20 text-primary-400">
                {user?.role}
              </span>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all',
                pathname === link.href
                  ? 'bg-primary-500/15 text-primary-400 border border-primary-500/20'
                  : 'text-dark-600 dark:text-dark-400 hover:text-white hover:bg-white/5'
              )}
            >
              <link.icon className="w-5 h-5" />
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="p-3 border-t border-white/5">
          <button
            onClick={() => { logout(); router.push('/'); }}
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-all w-full cursor-pointer"
          >
            <HiOutlineLogout className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile nav */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 glass border-t border-white/5 flex">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              'flex-1 flex flex-col items-center gap-1 py-3 text-xs font-medium transition-colors',
              pathname === link.href ? 'text-primary-400' : 'text-dark-500'
            )}
          >
            <link.icon className="w-5 h-5" />
            {link.label.split(' ').pop()}
          </Link>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-64">
        <div className="p-4 sm:p-6 lg:p-8 pb-24 lg:pb-8">
          {children}
        </div>
      </div>
    </div>
  );
}
