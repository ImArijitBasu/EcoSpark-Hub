'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import api from '@/lib/api';
import { Idea } from '@/types';
import { HiOutlineThumbUp, HiOutlineStar } from 'react-icons/hi';

export default function Testimonials() {
  const [top, setTop] = useState<Idea[]>([]);

  useEffect(() => {
    const fetchTop = async () => {
      try {
        const res = await api.get('/ideas/featured?count=3');
        setTop(res.data.data);
      } catch {
        // ignore
      }
    };
    fetchTop();
  }, []);

  if (top.length === 0) return null;

  return (
    <section className="py-28 lg:py-40 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-accent-400 text-sm font-semibold uppercase tracking-wider">Community Favorites</span>
          <h2 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-heading)] text-dark-900 dark:text-white mt-2 mb-4">
            Top Voted Ideas
          </h2>
          <p className="text-dark-600 dark:text-dark-400 max-w-xl mx-auto">
            The ideas that received the most love from our community members.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {top.map((idea, index) => (
            <motion.div
              key={idea.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className={`glass rounded-2xl p-6 relative overflow-hidden ${
                index === 0 ? 'glow-emerald md:scale-105' : ''
              }`}
            >
              {/* Rank Badge */}
              <div className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                index === 0
                  ? 'bg-accent-500/20 text-accent-400 border border-accent-500/30'
                  : 'bg-dark-700/50 text-dark-600 dark:text-dark-400 border border-white/10'
              }`}>
                #{index + 1}
              </div>

              {/* Stars */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <HiOutlineStar
                    key={i}
                    className={`w-4 h-4 ${i < Math.min(5, Math.ceil(idea.upvoteCount / 2)) ? 'text-accent-400 fill-accent-400' : 'text-dark-600'}`}
                  />
                ))}
              </div>

              <h3 className="text-lg font-semibold text-dark-900 dark:text-white mb-2 line-clamp-2">{idea.title}</h3>
              <p className="text-sm text-dark-600 dark:text-dark-400 mb-4 line-clamp-3">{idea.description}</p>

              {/* Author & Votes */}
              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-dark-900 dark:text-white text-xs font-bold">
                    {idea.author.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-dark-800 dark:text-dark-200">{idea.author.name}</p>
                    <p className="text-xs text-dark-500">{idea.category.name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-primary-400">
                  <HiOutlineThumbUp className="w-5 h-5" />
                  <span className="font-semibold">{idea.upvoteCount}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
