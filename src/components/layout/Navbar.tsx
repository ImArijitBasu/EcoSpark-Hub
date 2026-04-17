'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { HiOutlineMenu, HiOutlineX, HiOutlineUser, HiOutlineLogout, HiOutlineViewGrid } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/ideas', label: 'Ideas' },
  { href: '/about', label: 'About Us' },
  { href: '/blog', label: 'Blog' },
];

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);

  const dashboardLink = user?.role === 'ADMIN' ? '/dashboard/admin' : '/dashboard/member';

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center font-bold text-dark-900 dark:text-white text-lg shadow-lg">
              E
            </div>
            <span className="text-xl font-bold font-[family-name:var(--font-heading)]">
              <span className="gradient-text">Eco</span>
              <span className="text-dark-900 dark:text-white">Spark</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                  pathname === link.href
                    ? 'text-primary-500 dark:text-primary-400 bg-primary-500/10'
                    : 'text-dark-600 hover:text-dark-900 dark:text-dark-300 dark:hover:text-white hover:bg-dark-100 dark:hover:bg-white/5'
                )}
              >
                {link.label}
              </Link>
            ))}

          </div>

          {/* Right Side */}
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setProfileDropdown(!profileDropdown)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl glass-light hover:border-primary-500/30 transition-all cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-dark-900 dark:text-white text-sm font-semibold">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-dark-200">{user?.name}</span>
                </button>

                <AnimatePresence>
                  {profileDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-56 glass rounded-xl shadow-2xl overflow-hidden border border-white/10"
                    >
                      <div className="p-3 border-b border-white/5">
                        <p className="text-sm font-semibold text-dark-900 dark:text-white">{user?.name}</p>
                        <p className="text-xs text-dark-600 dark:text-dark-400">{user?.email}</p>
                        <span className="inline-block mt-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary-500/20 text-primary-400">
                          {user?.role}
                        </span>
                      </div>
                      <div className="p-1">
                        <Link
                          href={dashboardLink}
                          onClick={() => setProfileDropdown(false)}
                          className="flex items-center gap-2 px-3 py-2 text-sm text-dark-600 dark:text-dark-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                        >
                          <HiOutlineViewGrid className="w-4 h-4" />
                          Dashboard
                        </Link>
                        <Link
                          href="/dashboard/member"
                          onClick={() => setProfileDropdown(false)}
                          className="flex items-center gap-2 px-3 py-2 text-sm text-dark-600 dark:text-dark-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                        >
                          <HiOutlineUser className="w-4 h-4" />
                          My Profile
                        </Link>
                        <button
                          onClick={() => {
                            logout();
                            setProfileDropdown(false);
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
                        >
                          <HiOutlineLogout className="w-4 h-4" />
                          Logout
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/login" className="btn-secondary text-sm">
                  Log In
                </Link>
                <Link href="/register" className="btn-primary text-sm">
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              className="p-2 text-dark-600 hover:text-dark-900 dark:text-dark-300 dark:hover:text-white transition-colors cursor-pointer"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <HiOutlineX className="w-6 h-6" /> : <HiOutlineMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-white/5 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    'block px-4 py-3 rounded-xl text-sm font-medium transition-colors',
                    pathname === link.href
                      ? 'text-primary-500 dark:text-primary-400 bg-primary-500/10'
                      : 'text-dark-600 hover:text-dark-900 dark:text-dark-300 dark:hover:text-white hover:bg-dark-100 dark:hover:bg-white/5'
                  )}
                >
                  {link.label}
                </Link>
              ))}

              <div className="pt-3 border-t border-white/5">
                {isAuthenticated ? (
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors text-left cursor-pointer"
                  >
                    Logout
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="btn-secondary text-sm flex-1 text-center">
                      Log In
                    </Link>
                    <Link href="/register" onClick={() => setMobileMenuOpen(false)} className="btn-primary text-sm flex-1 text-center">
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
