'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import api from '@/lib/api';
import { Category } from '@/types';
import { HiOutlineArrowRight } from 'react-icons/hi';

const fallbackIcons: Record<string, string> = {
  energy: '⚡',
  waste: '♻️',
  transportation: '🚲',
  water: '💧',
  agriculture: '🌾',
  biodiversity: '🌿',
};

const gradients = [
  'from-emerald-500/20 to-emerald-900/10',
  'from-blue-500/20 to-blue-900/10',
  'from-amber-500/20 to-amber-900/10',
  'from-cyan-500/20 to-cyan-900/10',
  'from-lime-500/20 to-lime-900/10',
  'from-teal-500/20 to-teal-900/10',
];

export default function CategoriesShowcase() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    api.get('/categories').then(res => setCategories(res.data.data)).catch(() => {});
  }, []);

  if (categories.length === 0) return null;

  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-accent-400 text-sm font-semibold uppercase tracking-wider">Explore Topics</span>
          <h2 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-heading)] text-white mt-2 mb-4">
            Idea Categories
          </h2>
          <p className="text-dark-400 max-w-xl mx-auto">
            Browse sustainability ideas across key environmental areas curated by our admin team.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
            >
              <Link
                href={`/ideas?category=${cat.id}`}
                className="block glass rounded-2xl p-5 text-center card-hover group h-full"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${gradients[index % gradients.length]} flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                  <span className="text-3xl">{fallbackIcons[cat.slug] || cat.icon || '🌍'}</span>
                </div>
                <h3 className="text-sm font-semibold text-white group-hover:text-primary-400 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-dark-500 mt-1">
                  {cat._count?.ideas || 0} ideas
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
