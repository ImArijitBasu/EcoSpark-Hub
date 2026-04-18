'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { HiOutlineSearch, HiLightningBolt, HiOutlineGlobe, HiOutlineSparkles } from 'react-icons/hi';

export default function HeroBanner() {
  const [search, setSearch] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/ideas?search=${encodeURIComponent(search.trim())}`);
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 hero-gradient" />

      {/* Vignette Overlay for darker contrast */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--color-dark-950)_0%,_transparent_100%)] opacity-0 dark:opacity-40 z-0 mix-blend-multiply" />
      <div className="absolute inset-0 bg-black/10 dark:bg-black/30 z-0" />

      {/* Heroic Deep Ambient Glows */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary-500/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 animate-pulse-glow" style={{ animationDuration: '8s' }} />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent-500/15 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3 animate-pulse-glow" style={{ animationDuration: '10s', animationDelay: '1s' }} />

      {/* Grid Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.07] z-0"
        style={{
          backgroundImage: 'linear-gradient(rgba(16,185,129,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.5) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-light mb-8 text-sm"
        >
          <HiOutlineSparkles className="w-4 h-4 text-accent-400" />
          <span className="text-dark-600 dark:text-dark-300">Community-Powered Sustainability</span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-7xl font-extrabold font-[family-name:var(--font-heading)] leading-tight mb-6"
        >
          <span className="text-dark-900 dark:text-white">Spark the Future</span>
          <br />
          <span className="gradient-text">of Sustainability</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg sm:text-xl text-dark-600 dark:text-dark-400 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Share eco-friendly ideas, vote on groundbreaking projects, and join a community
          dedicated to building a greener world — one idea at a time.
        </motion.p>

        {/* Search Bar */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          onSubmit={handleSearch}
          className="max-w-2xl mx-auto mb-12"
        >
          <div className="relative group">
            <HiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-500 group-focus-within:text-primary-400 transition-colors" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search ideas by name, category, or keyword..."
              className="w-full pl-12 pr-32 py-5 rounded-2xl glass text-dark-900 dark:text-white text-base lg:text-lg placeholder:text-dark-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 shadow-[0_4px_30px_rgba(0,0,0,0.1)] transition-all"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 btn-primary px-6 py-2.5 text-sm cursor-pointer"
            >
              Search
            </button>
          </div>
        </motion.form>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="inline-flex flex-wrap items-center justify-center gap-8 sm:gap-14 glass px-8 sm:px-12 py-6 rounded-3xl"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center">
              <HiLightningBolt className="w-6 h-6 text-primary-400" />
            </div>
            <div className="text-left">
              <p className="text-2xl font-bold text-dark-900 dark:text-white">500+</p>
              <p className="text-xs text-dark-600 dark:text-dark-400">Ideas Shared</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-accent-500/10 flex items-center justify-center">
              <HiOutlineGlobe className="w-6 h-6 text-accent-400" />
            </div>
            <div className="text-left">
              <p className="text-2xl font-bold text-dark-900 dark:text-white">1.2K+</p>
              <p className="text-xs text-dark-600 dark:text-dark-400">Community Members</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center">
              <HiOutlineSparkles className="w-6 h-6 text-primary-400" />
            </div>
            <div className="text-left">
              <p className="text-2xl font-bold text-dark-900 dark:text-white">50+</p>
              <p className="text-xs text-dark-600 dark:text-dark-400">Projects Launched</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
