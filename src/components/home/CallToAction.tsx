'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { HiOutlineArrowRight } from 'react-icons/hi';

export default function CallToAction() {
  const { isAuthenticated } = useAuth();

  return (
    <section className="py-28 lg:py-40 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden"
        >
          {/* Animated gradient background */}
          <div className="absolute inset-0 hero-gradient" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-600/30 to-transparent" />

          {/* Decorative circles */}
          <div className="absolute -top-10 -right-10 w-60 h-60 bg-primary-400/10 rounded-full blur-2xl" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-accent-400/10 rounded-full blur-2xl" />

          <div className="relative z-10 p-8 sm:p-12 lg:p-16 text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-heading)] text-white mb-6 leading-tight">
              Ready to Make a<br />
              <span className="gradient-text-gold">Difference?</span>
            </h2>
            <p className="text-lg text-dark-300 max-w-2xl mx-auto mb-10 leading-relaxed">
              Join thousands of sustainability advocates sharing innovative ideas.
              Whether you&apos;re an expert or just getting started, your voice matters.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {isAuthenticated ? (
                <Link
                  href="/dashboard/member/create"
                  className="btn-primary px-8 py-3.5 text-base flex items-center gap-2 shadow-lg shadow-primary-500/25"
                >
                  Submit Your Idea <HiOutlineArrowRight className="w-5 h-5" />
                </Link>
              ) : (
                <>
                  <Link
                    href="/register"
                    className="btn-primary px-8 py-3.5 text-base flex items-center gap-2 shadow-lg shadow-primary-500/25"
                  >
                    Get Started Free <HiOutlineArrowRight className="w-5 h-5" />
                  </Link>
                  <Link href="/ideas" className="btn-secondary px-8 py-3.5 text-base">
                    Browse Ideas
                  </Link>
                </>
              )}
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center justify-center gap-6 mt-10 text-sm text-dark-400">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-primary-400" />
                Free to join
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-primary-400" />
                Community moderated
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-primary-400" />
                Open source ideas
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
