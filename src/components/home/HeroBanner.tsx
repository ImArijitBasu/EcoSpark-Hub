'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineSearch, HiOutlineSparkles, HiOutlineArrowRight } from 'react-icons/hi';
import api from '@/lib/api';
import { Category } from '@/types';

// Fallback slides used while API categories load (or if they fail)
const fallbackSlides = [
  {
    title: 'Clean Energy',
    subtitle: 'Power the future with renewable solutions',
    image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1600&q=80',
    href: '/ideas',
  },
  {
    title: 'Water Conservation',
    subtitle: 'Preserve our most precious resource',
    image: 'https://images.unsplash.com/photo-1544252899-c7acbf8e2e74?w=1600&q=80',
    href: '/ideas',
  },
  {
    title: 'Green Transport',
    subtitle: 'Sustainable mobility for everyone',
    image: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=1600&q=80',
    href: '/ideas',
  },
  {
    title: 'Zero Waste',
    subtitle: 'Rethink, reduce, and reimagine',
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=1600&q=80',
    href: '/ideas',
  },
];

const categoryImages: Record<string, string> = {
  energy: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1600&q=80',
  waste: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=1600&q=80',
  transportation: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=1600&q=80',
  water: 'https://images.unsplash.com/photo-1544252899-c7acbf8e2e74?w=1600&q=80',
  agriculture: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1600&q=80',
  fire: 'https://images.unsplash.com/photo-1517594422361-5eeb8ae275a9?w=1600&q=80',
  biodiversity: 'https://images.unsplash.com/photo-1629267699730-f7467e129e65?w=1600&q=80',
};

const defaultImage = 'https://images.unsplash.com/photo-1542601906990-b4d3fb773b09?w=1600&q=80';

interface Slide {
  title: string;
  subtitle: string;
  image: string;
  href: string;
  count?: number;
}

export default function HeroBanner() {
  const [search, setSearch] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const [slides, setSlides] = useState<Slide[]>(fallbackSlides);
  const [direction, setDirection] = useState(1);
  const router = useRouter();
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isInteracting = useRef(false);

  // Load categories from API
  useEffect(() => {
    api.get('/categories')
      .then(res => {
        const cats: Category[] = res.data.data;
        if (cats.length > 0) {
          setSlides(
            cats.slice(0, 6).map(cat => ({
              title: cat.name,
              subtitle: `${cat._count?.ideas || 0} innovative ideas`,
              image: cat.bannerImage || categoryImages[cat.slug] || defaultImage,
              href: `/ideas?category=${cat.id}`,
              count: cat._count?.ideas || 0,
            }))
          );
        }
      })
      .catch(() => {});
  }, []);

  // Auto-advance the slider
  const startAutoPlay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (!isInteracting.current) {
        setDirection(1);
        setActiveIndex(prev => (prev + 1) % slides.length);
      }
    }, 5000);
  }, [slides.length]);

  useEffect(() => {
    startAutoPlay();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [startAutoPlay]);

  const goToSlide = (index: number) => {
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
    isInteracting.current = true;
    // Resume auto-play after 8s of inactivity
    setTimeout(() => { isInteracting.current = false; }, 8000);
    startAutoPlay();
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/ideas?search=${encodeURIComponent(search.trim())}`);
    }
  };

  const currentSlide = slides[activeIndex];

  // Smooth crossfade variants (no sliding, just opacity for performance)
  const bgVariants = {
    enter: { opacity: 0 },
    center: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden">
      {/* ── Fullscreen Background Image Slider ── */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={activeIndex}
          variants={bgVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={currentSlide.image}
            alt={currentSlide.title}
            fill
            priority={activeIndex === 0}
            className="object-cover"
            sizes="100vw"
          />
        </motion.div>
      </AnimatePresence>

      {/* ── Dark Cinematic Overlay ── */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70 z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary-900/30 to-transparent z-[1]" />

      {/* ── Grid Overlay (desktop only) ── */}
      <div
        className="hidden sm:block absolute inset-0 opacity-[0.04] z-[2]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* ── Main Content ── */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 mb-8 text-sm"
        >
          <HiOutlineSparkles className="w-4 h-4 text-accent-400" />
          <span className="text-white/80">Community-Powered Sustainability</span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-7xl font-extrabold font-[family-name:var(--font-heading)] leading-tight mb-6"
        >
          <span className="text-white">Spark the Future</span>
          <br />
          <span className="gradient-text">of Sustainability</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed"
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
          className="max-w-2xl mx-auto mb-14"
        >
          <div className="relative group">
            <HiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50 group-focus-within:text-primary-400 transition-colors" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search ideas by name, category, or keyword..."
              className="w-full pl-12 pr-32 py-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-white text-base lg:text-lg placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-primary-500/50 shadow-[0_4px_30px_rgba(0,0,0,0.2)] transition-all"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 btn-primary px-6 py-2.5 text-sm cursor-pointer"
            >
              Search
            </button>
          </div>
        </motion.form>

        {/* ── Interactive Category Slider Pills ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-10"
        >
          <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
            {slides.map((slide, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`
                  relative px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-500 cursor-pointer
                  ${activeIndex === index
                    ? 'bg-primary-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.4)] scale-105'
                    : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white border border-white/10 hover:border-white/20'
                  }
                `}
              >
                {slide.title}

                {/* Active indicator line */}
                {activeIndex === index && (
                  <motion.div
                    layoutId="activeSlide"
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-white rounded-full"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            ))}
          </div>
        </motion.div>

        {/* ── Current Category Card ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
          >
            <Link
              href={currentSlide.href}
              className="inline-flex items-center gap-3 px-6 sm:px-8 py-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 hover:bg-white/15 hover:border-primary-500/30 transition-all duration-300 group"
            >
              {/* Mini preview thumbnail */}
              <div className="relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 border border-white/20">
                <Image
                  src={currentSlide.image}
                  alt={currentSlide.title}
                  fill
                  className="object-cover"
                  sizes="48px"
                />
              </div>
              <div className="text-left">
                <p className="text-white font-bold text-sm sm:text-base group-hover:text-primary-400 transition-colors">
                  Explore {currentSlide.title}
                </p>
                <p className="text-white/50 text-xs">
                  {currentSlide.subtitle}
                </p>
              </div>
              <HiOutlineArrowRight className="w-5 h-5 text-white/40 group-hover:text-primary-400 group-hover:translate-x-1 transition-all ml-2" />
            </Link>
          </motion.div>
        </AnimatePresence>

        {/* ── Slide Progress Dots ── */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className="relative cursor-pointer p-1"
              aria-label={`Go to slide ${index + 1}`}
            >
              <div
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  activeIndex === index
                    ? 'w-8 bg-primary-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]'
                    : 'w-1.5 bg-white/30 hover:bg-white/50'
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      {/* ── Bottom Fade for smooth section transition ── */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark-50 dark:from-dark-950 to-transparent z-[3]" />
    </section>
  );
}
