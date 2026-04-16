'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import api from '@/lib/api';
import { Idea } from '@/types';
import { truncate } from '@/lib/utils';
import { HiOutlineArrowRight, HiOutlineThumbUp, HiOutlineChatAlt2 } from 'react-icons/hi';

export default function FeaturedIdeas() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeatured();
  }, []);

  const fetchFeatured = async () => {
    try {
      const res = await api.get('/ideas/featured?count=6');
      setIdeas(res.data.data);
    } catch {
      // Silently fail - show empty state
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary-400 text-sm font-semibold uppercase tracking-wider">Community Highlights</span>
          <h2 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-heading)] text-white mt-2 mb-4">
            Featured Ideas
          </h2>
          <p className="text-dark-400 max-w-xl mx-auto">
            Discover the most impactful sustainability ideas voted by our community members.
          </p>
        </motion.div>

        {/* Ideas Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="glass rounded-2xl p-6 animate-pulse">
                <div className="h-40 bg-dark-700/50 rounded-xl mb-4" />
                <div className="h-4 bg-dark-700/50 rounded w-3/4 mb-2" />
                <div className="h-3 bg-dark-700/50 rounded w-full mb-2" />
                <div className="h-3 bg-dark-700/50 rounded w-2/3" />
              </div>
            ))}
          </div>
        ) : ideas.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ideas.map((idea, index) => (
              <motion.div
                key={idea.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/ideas/${idea.id}`}>
                  <div className="glass rounded-2xl overflow-hidden card-hover group h-full">
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden bg-dark-800">
                      {idea.images.length > 0 ? (
                        <img
                          src={idea.images[0]}
                          alt={idea.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-900/40 to-dark-800">
                          <span className="text-5xl">🌿</span>
                        </div>
                      )}
                      {/* Category Badge */}
                      <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold bg-primary-500/90 text-white backdrop-blur-sm">
                        {idea.category.name}
                      </span>
                      {idea.isPaid && (
                        <span className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold bg-accent-500/90 text-white backdrop-blur-sm">
                          💎 Premium
                        </span>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-primary-400 transition-colors line-clamp-2">
                        {idea.title}
                      </h3>
                      <p className="text-sm text-dark-400 mb-4 line-clamp-2">
                        {truncate(idea.description, 120)}
                      </p>

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-3 border-t border-white/5">
                        <div className="flex items-center gap-1 text-sm text-dark-400">
                          <span className="w-6 h-6 rounded-full gradient-primary flex items-center justify-center text-white text-xs font-semibold">
                            {idea.author.name.charAt(0)}
                          </span>
                          <span className="ml-1">{idea.author.name}</span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-dark-500">
                          <span className="flex items-center gap-1">
                            <HiOutlineThumbUp className="w-3.5 h-3.5" />
                            {idea.upvoteCount}
                          </span>
                          <span className="flex items-center gap-1">
                            <HiOutlineChatAlt2 className="w-3.5 h-3.5" />
                            {idea.commentCount}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 glass rounded-2xl">
            <span className="text-5xl mb-4 block">🌱</span>
            <h3 className="text-xl font-semibold text-white mb-2">No ideas yet</h3>
            <p className="text-dark-400 mb-6">Be the first to share a sustainability idea!</p>
            <Link href="/dashboard/member/create" className="btn-primary inline-flex items-center gap-2">
              Submit an Idea <HiOutlineArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}

        {/* View All Button */}
        {ideas.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              href="/ideas"
              className="btn-secondary inline-flex items-center gap-2 px-8 py-3"
            >
              Browse All Ideas <HiOutlineArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
