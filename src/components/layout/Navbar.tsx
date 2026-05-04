'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { HiOutlineMenu, HiOutlineX, HiOutlineUser, HiOutlineLogout, HiOutlineViewGrid } from 'react-icons/hi';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import ThemeToggle from './ThemeToggle';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/ideas', label: 'Ideas' },
  { href: '/about', label: 'About Us' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const { user, isAuthenticated, loading, logout } = useAuth();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);

  const dashboardLink = user?.role === 'ADMIN' ? '/dashboard/admin' : '/dashboard/member';

  // Scroll Progress Hook
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <>
      <nav className="fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-5xl z-[80] transition-all duration-300">
        
        {/* Background & Progress Bar Container (with overflow-hidden for rounded corners) */}
        <div className="absolute inset-0 rounded-full overflow-hidden border border-dark-300/20 dark:border-white/10 bg-white/70 dark:bg-dark-950/60 backdrop-blur-lg md:backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] z-0">
          {/* Integrated Circular Glowing Bottom Scroll Progress Indicator */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-[3px] bg-primary-500 shadow-[0_-2px_15px_3px_#10b981]"
            style={{ scaleX, transformOrigin: "0% 50%" }}
          />
        </div>

        <div className="px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center justify-between h-16 sm:h-20">
            
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group z-50">
              <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center font-bold text-dark-900 dark:text-white text-xl shadow-[0_0_15px_rgba(16,185,129,0.4)] hover:shadow-[0_0_25px_rgba(16,185,129,0.8)] transition-all">
                E
              </div>
              <span className="hidden sm:inline-block text-xl font-bold font-[family-name:var(--font-heading)]">
                <span className="gradient-text">Eco</span>
                <span className="text-dark-900 dark:text-white">Spark</span>
              </span>
            </Link>

            {/* Desktop Nav - Floating Pill Menu */}
            <div className="hidden md:flex items-center p-1 rounded-full bg-dark-100/50 dark:bg-dark-900/50 border border-dark-200/50 dark:border-white/5 relative shadow-inner">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                const isHovered = hoveredPath === link.href;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onMouseEnter={() => setHoveredPath(link.href)}
                    onMouseLeave={() => setHoveredPath(null)}
                    className="relative px-6 py-2.5 text-sm font-semibold transition-colors z-10"
                  >
                    <span className={cn(
                      "relative z-10 transition-colors duration-200", 
                      isActive || isHovered 
                        ? 'text-primary-700 dark:text-white' 
                        : 'text-dark-600 dark:text-dark-300'
                    )}>
                      {link.label}
                    </span>
                    
                    {/* Animated Gliding Pill (Hover) */}
                    {isHovered && (
                      <motion.div
                        layoutId="navbar-hover"
                        className="absolute inset-0 bg-primary-500/10 dark:bg-primary-500/20 rounded-full border border-primary-500/20 dark:border-primary-500/30 -z-10"
                        transition={{ type: 'spring', bounce: 0.25, duration: 0.5 }}
                      />
                    )}
                    
                    {/* Active State Dots */}
                    {isActive && !isHovered && (
                       <motion.div
                       layoutId="navbar-active"
                       className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-primary-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"
                       transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                     />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Right Side Tools */}
            <div className="hidden md:flex items-center gap-3">
              <div className="p-1.5 rounded-full bg-dark-100/50 dark:bg-dark-900/50 border border-dark-200/50 dark:border-white/5">
                <ThemeToggle />
              </div>
              
              {loading ? (
                /* Skeleton placeholder while session loads — prevents flash of Login/Sign Up */
                <div className="flex items-center gap-2 pl-2 pr-4 py-1.5 rounded-full bg-dark-100/80 dark:bg-dark-900/80 border border-dark-200 dark:border-white/10 animate-pulse">
                  <div className="w-8 h-8 rounded-full bg-dark-300/50 dark:bg-white/10" />
                  <div className="w-16 h-4 rounded-full bg-dark-300/50 dark:bg-white/10" />
                </div>
              ) : isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setProfileDropdown(!profileDropdown)}
                    className="flex items-center gap-2 pl-2 pr-4 py-1.5 rounded-full bg-dark-100/80 dark:bg-dark-900/80 border border-dark-200 dark:border-white/10 hover:border-primary-500/50 dark:hover:border-primary-500/50 transition-all cursor-pointer shadow-sm group"
                  >
                    <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-dark-900 dark:text-white text-sm font-bold shadow-inner group-hover:shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all">
                      {user?.name?.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-sm font-semibold text-dark-800 dark:text-dark-100">{user?.name?.split(' ')[0]}</span>
                  </button>

                  <AnimatePresence>
                    {profileDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: 15, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                        className="absolute right-0 mt-4 w-64 glass rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.2)] overflow-hidden border border-white/20 origin-top-right"
                      >
                        <div className="p-5 border-b border-white/10 bg-gradient-to-b from-primary-500/10 to-transparent">
                          <p className="text-base font-bold text-dark-900 dark:text-white truncate">{user?.name}</p>
                          <p className="text-xs text-dark-600 dark:text-dark-400 truncate mb-2">{user?.email}</p>
                          <span className="inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full bg-primary-500 text-white shadow-[0_0_10px_rgba(16,185,129,0.5)]">
                            <span className="w-1 h-1 rounded-full bg-white animate-ping" />
                            {user?.role}
                          </span>
                        </div>
                        <div className="p-2">
                          <Link
                            href={dashboardLink}
                            onClick={() => setProfileDropdown(false)}
                            className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-dark-700 dark:text-dark-200 hover:text-primary-600 dark:hover:text-white hover:bg-dark-100 dark:hover:bg-white/10 rounded-2xl transition-all"
                          >
                            <HiOutlineViewGrid className="w-5 h-5 text-primary-500" />
                            Command Center
                          </Link>
                          <Link
                            href={`${dashboardLink}/profile`}
                            onClick={() => setProfileDropdown(false)}
                            className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-dark-700 dark:text-dark-200 hover:text-primary-600 dark:hover:text-white hover:bg-dark-100 dark:hover:bg-white/10 rounded-2xl transition-all"
                          >
                            <HiOutlineUser className="w-5 h-5 text-accent-500" />
                            Identity Profile
                          </Link>
                          <div className="h-px bg-white/10 my-1 mx-2" />
                          <button
                            onClick={() => {
                              logout();
                              setProfileDropdown(false);
                            }}
                            className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-500/10 rounded-2xl transition-all cursor-pointer"
                          >
                            <HiOutlineLogout className="w-5 h-5" />
                            Disconnect session
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link href="/login" className="px-5 py-2.5 text-sm font-bold text-dark-700 dark:text-dark-200 hover:text-dark-900 dark:hover:text-white transition-colors">
                    Login
                  </Link>
                  <Link href="/register" className="btn-primary rounded-full px-6 py-2.5 text-sm shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] border-0">
                    Sign Up
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <div className="flex items-center gap-3 md:hidden">
              <div className="p-1 rounded-full bg-dark-100/50 dark:bg-dark-900/50 border border-dark-200/50 dark:border-white/5">
                <ThemeToggle />
              </div>
              <button
                className="w-10 h-10 rounded-full flex items-center justify-center bg-dark-100 dark:bg-white/5 border border-dark-200 dark:border-white/10 text-dark-800 dark:text-white cursor-pointer"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <AnimatePresence mode="wait">
                  {mobileMenuOpen ? (
                    <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <HiOutlineX className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <HiOutlineMenu className="w-5 h-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>

          </div>
        </div>
      </nav>

      {/* Futuristic Floating HUD Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
            className="fixed top-28 left-1/2 -translate-x-1/2 w-[90%] md:hidden z-40 glass rounded-3xl overflow-hidden border border-white/20 shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
          >
            <div className="p-4 space-y-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      'block px-5 py-3.5 rounded-2xl text-base font-bold transition-colors relative overflow-hidden',
                      isActive
                        ? 'text-primary-700 dark:text-white bg-primary-500/10'
                        : 'text-dark-600 dark:text-dark-300 hover:text-dark-900 dark:hover:text-white hover:bg-dark-100 dark:hover:bg-white/5'
                    )}
                  >
                    {isActive && <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary-500" />}
                    {link.label}
                  </Link>
                );
              })}

              <div className="pt-4 pb-2 px-2 mt-4 border-t border-white/10 flex flex-col gap-3">
                {loading ? (
                  /* Skeleton placeholder for mobile */
                  <div className="flex items-center gap-3 mb-2 p-2 rounded-xl bg-dark-100 dark:bg-white/5 animate-pulse">
                    <div className="w-10 h-10 rounded-full bg-dark-300/50 dark:bg-white/10" />
                    <div className="space-y-2">
                      <div className="w-24 h-4 rounded-full bg-dark-300/50 dark:bg-white/10" />
                      <div className="w-16 h-3 rounded-full bg-dark-300/50 dark:bg-white/10" />
                    </div>
                  </div>
                ) : isAuthenticated ? (
                  <>
                    <div className="flex items-center gap-3 mb-2 p-2 rounded-xl bg-dark-100 dark:bg-white/5">
                      <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-dark-900 dark:text-white text-lg font-bold">
                        {user?.name?.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-dark-900 dark:text-white">{user?.name}</p>
                        <p className="text-xs text-dark-500">{user?.role}</p>
                      </div>
                    </div>
                    <Link
                      href={dashboardLink}
                      onClick={() => setMobileMenuOpen(false)}
                      className="btn-secondary w-full text-center py-3 rounded-xl border-white/10 mt-3"
                    >
                      Command Center
                    </Link>
                    <Link
                      href={`${dashboardLink}/profile`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="btn-secondary w-full text-center py-3 rounded-xl border-white/10"
                    >
                      Identity Profile
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setMobileMenuOpen(false);
                      }}
                      className="w-full px-4 py-3 rounded-xl text-sm font-bold text-red-400 bg-red-500/10 hover:bg-red-500/20 transition-colors text-center cursor-pointer"
                    >
                      Disconnect System
                    </button>
                  </>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="btn-secondary text-sm text-center py-3 rounded-xl">
                      Log In
                    </Link>
                    <Link href="/register" onClick={() => setMobileMenuOpen(false)} className="btn-primary text-sm text-center py-3 rounded-xl shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
