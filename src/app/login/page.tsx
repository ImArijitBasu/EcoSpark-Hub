'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { signIn } from '@/lib/auth-client';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { HiOutlineMail, HiOutlineLockClosed, HiOutlineEye, HiOutlineEyeOff, HiLightningBolt } from 'react-icons/hi';
import { FcGoogle } from 'react-icons/fc';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('All fields are required');
      return;
    }
    setLoading(true);
    try {
      await login(email, password);
      toast.success('Welcome back!');
      router.push('/');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleAutofillAdmin = () => {
    setEmail('admin@ecosparkhub.com');
    setPassword('Admin@123456');
    toast.success('Admin credentials autofilled!');
  };

  const handleAutofillMember = () => {
    setEmail('member@ecosparkhub.com');
    setPassword('Member@123456');
    toast.success('Member credentials autofilled!');
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    try {
      await signIn.social({ provider: 'google', callbackURL: `${window.location.origin}/` });
    } catch (error: any) {
      toast.error('Google login failed');
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-stretch">
      {/* Left Pane - Branding Asset */}
      <div className="hidden lg:flex w-1/2 relative bg-dark-900 overflow-hidden items-center justify-center p-12">
        <div className="absolute inset-0 hero-gradient opacity-80" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />
        
        <div className="relative z-10 max-w-lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-16 h-16 rounded-2xl glass-light flex items-center justify-center mb-8 border border-white/10 shadow-2xl">
              <HiLightningBolt className="w-8 h-8 text-primary-400" />
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight font-[family-name:var(--font-heading)]">
              Ignite the Green <span className="text-primary-400">Revolution.</span>
            </h2>
            <p className="text-lg text-white/70 leading-relaxed">
              Step into the central hub of sustainability. Your ideas and actions today define the world we inherit tomorrow. Log in to continue your journey.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Right Pane - Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="glass rounded-3xl p-8 sm:p-10 shadow-2xl">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold font-[family-name:var(--font-heading)] text-dark-900 dark:text-white">
                Welcome Back
              </h1>
              <p className="text-dark-600 dark:text-dark-400 text-sm mt-2">Sign in to your EcoSpark account</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-dark-600 dark:text-dark-300 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <HiOutlineMail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-500" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="input-glass pl-10"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-dark-600 dark:text-dark-300 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <HiOutlineLockClosed className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-500" />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="input-glass pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-500 hover:text-dark-300 transition-colors cursor-pointer"
                  >
                    {showPassword ? <HiOutlineEyeOff className="w-5 h-5" /> : <HiOutlineEye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading || googleLoading}
                className="btn-primary w-full py-3.5 text-center flex items-center justify-center gap-2 mt-4 disabled:opacity-50 cursor-pointer text-base"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  'Sign In'
                )}
              </button>

              <div className="relative flex items-center py-2">
                <div className="flex-grow border-t border-dark-200 dark:border-white/10"></div>
                <span className="flex-shrink-0 mx-4 text-dark-400 text-xs">Or continue with</span>
                <div className="flex-grow border-t border-dark-200 dark:border-white/10"></div>
              </div>

              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={loading || googleLoading}
                className="w-full py-3.5 px-4 flex items-center justify-center gap-3 bg-white dark:bg-dark-800 border border-dark-200 dark:border-white/10 rounded-xl hover:bg-dark-50 dark:hover:bg-dark-700 transition-colors cursor-pointer text-dark-900 dark:text-white font-medium shadow-sm"
              >
                {googleLoading ? (
                  <div className="w-5 h-5 border-2 border-primary-500/30 border-t-primary-500 rounded-full animate-spin" />
                ) : (
                  <>
                    <FcGoogle className="w-5 h-5" />
                    Sign in with Google
                  </>
                )}
              </button>
            </form>

            <div className="flex flex-col items-center gap-3 mt-8 pt-6 border-t border-dark-200 dark:border-white/10">
              <div className="flex flex-wrap items-center justify-center gap-4">
                <button 
                  type="button" 
                  onClick={handleAutofillAdmin}
                  className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-primary-500/10 text-primary-600 hover:bg-primary-500/20 dark:text-primary-400 transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <HiLightningBolt className="w-3.5 h-3.5" /> Admin Demo
                </button>
                <button 
                  type="button" 
                  onClick={handleAutofillMember}
                  className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-accent-500/10 text-accent-600 hover:bg-accent-500/20 dark:text-accent-400 transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <HiLightningBolt className="w-3.5 h-3.5" /> Member Demo
                </button>
              </div>
              
              <p className="text-center text-sm text-dark-600 dark:text-dark-400">
                Don&apos;t have an account?{' '}
                <Link href="/register" className="text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300 font-bold transition-colors">
                  Create one
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
