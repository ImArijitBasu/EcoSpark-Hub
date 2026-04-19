'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import api from '@/lib/api';
import { Category } from '@/types';

const categoryImages: Record<string, string> = {
  energy: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7',
  waste: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b',
  transportation: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c',
  water: 'https://images.unsplash.com/photo-1544252899-c7acbf8e2e74',
  agriculture: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449',
  fire: 'https://images.unsplash.com/photo-1517594422361-5eeb8ae275a9',
  biodiversity: 'https://images.unsplash.com/photo-1629267699730-f7467e129e65?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3',
};

export default function CategoriesShowcase() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    api.get('/categories').then(res => setCategories(res.data.data)).catch(() => {});
  }, []);

  if (categories.length === 0) return null;

  return (
    <section className="py-28 lg:py-40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-accent-400 text-sm font-semibold uppercase tracking-wider">Explore Topics</span>
          <h2 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-heading)] text-dark-900 dark:text-white mt-2 mb-4">
            Idea Categories
          </h2>
          <p className="text-dark-600 dark:text-dark-400 max-w-xl mx-auto">
            Browse sustainability ideas across key environmental areas curated by our admin team.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.slice(0, 6).map((cat, index) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={`/ideas?category=${cat.id}`}
                className="block relative rounded-3xl overflow-hidden text-center card-hover group h-72 sm:h-80"
              >
                <Image 
                  src={cat.miniImage || cat.bannerImage || categoryImages[cat.slug] || 'https://images.unsplash.com/photo-1542601906990-b4d3fb773b09'} 
                  alt={cat.name} 
                  fill 
                  loading="lazy"
                  className="object-cover group-hover:scale-105 transition-transform duration-500" 
                  sizes="(max-width: 640px) 95vw, (max-width: 768px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-900/40 to-transparent group-hover:from-dark-900 transition-colors duration-500" />
                
                <div className="absolute inset-x-0 bottom-0 p-8 flex flex-col items-center justify-end h-full">
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors font-[family-name:var(--font-heading)] drop-shadow-md">
                    {cat.name}
                  </h3>
                  <p className="text-sm text-dark-200 font-medium bg-dark-900/50 px-4 py-1.5 rounded-full backdrop-blur-md">
                    {cat._count?.ideas || 0} innovative ideas
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
