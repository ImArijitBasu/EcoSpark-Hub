'use client';

export const dynamic = 'force-dynamic';

import { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import api from '@/lib/api';
import { Idea, Category } from '@/types';
import { truncate } from '@/lib/utils';
import { HiOutlineSearch, HiOutlineThumbUp, HiOutlineChatAlt2, HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi';

export default function IdeasPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-[50vh]"><div className="w-10 h-10 border-3 border-primary-500/30 border-t-primary-500 rounded-full animate-spin" /></div>}>
      <IdeasContent />
    </Suspense>
  );
}

function IdeasContent() {
  const searchParams = useSearchParams();
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  // Filters
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('recent');
  const [isPaid, setIsPaid] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchIdeas();
  }, [page, category, sort, isPaid]);

  const fetchCategories = async () => {
    try {
      const res = await api.get('/categories');
      setCategories(res.data.data);
    } catch { /* ignore */ }
  };

  const fetchIdeas = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.set('page', String(page));
      params.set('limit', '12');
      if (search) params.set('search', search);
      if (category) params.set('category', category);
      if (sort) params.set('sort', sort === 'recent' ? '' : sort);
      if (isPaid) params.set('isPaid', isPaid);

      const res = await api.get(`/ideas?${params.toString()}`);
      setIdeas(res.data.data);
      if (res.data.meta) {
        setTotalPages(res.data.meta.totalPages);
        setTotal(res.data.meta.total);
      }
    } catch { /* ignore */ }
    finally { setLoading(false); }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchIdeas();
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-heading)] text-white mb-2">
            Explore Ideas
          </h1>
          <p className="text-dark-400">
            {total > 0 ? `${total} sustainability ideas shared by our community` : 'Discover eco-friendly ideas from our community'}
          </p>
        </motion.div>

        {/* Filter Bar */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass rounded-2xl p-4 sm:p-6 mb-8">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 mb-4">
            <div className="relative flex-1">
              <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-500" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by title, keyword, or description..."
                className="input-glass pl-10"
              />
            </div>
            <button type="submit" className="btn-primary px-6 cursor-pointer">Search</button>
          </form>

          <div className="flex flex-wrap gap-3">
            <select value={category} onChange={(e) => { setCategory(e.target.value); setPage(1); }} className="input-glass w-auto pr-8 text-sm cursor-pointer">
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>

            <select value={sort} onChange={(e) => { setSort(e.target.value); setPage(1); }} className="input-glass w-auto pr-8 text-sm cursor-pointer">
              <option value="recent">Most Recent</option>
              <option value="top-voted">Top Voted</option>
              <option value="most-commented">Most Discussed</option>
            </select>

            <select value={isPaid} onChange={(e) => { setIsPaid(e.target.value); setPage(1); }} className="input-glass w-auto pr-8 text-sm cursor-pointer">
              <option value="">All Types</option>
              <option value="false">Free</option>
              <option value="true">Premium</option>
            </select>
          </div>
        </motion.div>

        {/* Ideas Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="glass rounded-2xl overflow-hidden animate-pulse">
                <div className="h-44 bg-dark-700/50" />
                <div className="p-5 space-y-3">
                  <div className="h-5 bg-dark-700/50 rounded w-3/4" />
                  <div className="h-3 bg-dark-700/50 rounded" />
                  <div className="h-3 bg-dark-700/50 rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : ideas.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ideas.map((idea, index) => (
                <motion.div
                  key={idea.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link href={`/ideas/${idea.id}`}>
                    <div className="glass rounded-2xl overflow-hidden card-hover group h-full">
                      <div className="relative h-44 overflow-hidden bg-dark-800">
                        {idea.images?.length > 0 ? (
                          <img src={idea.images[0]} alt={idea.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-900/40 to-dark-800">
                            <span className="text-5xl">🌿</span>
                          </div>
                        )}
                        <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold bg-primary-500/90 text-white backdrop-blur-sm">
                          {idea.category.name}
                        </span>
                        {idea.isPaid && (
                          <span className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold bg-accent-500/90 text-white backdrop-blur-sm">
                            💎 ${idea.price}
                          </span>
                        )}
                      </div>

                      <div className="p-5">
                        <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-primary-400 transition-colors line-clamp-2">
                          {idea.title}
                        </h3>
                        <p className="text-sm text-dark-400 mb-4 line-clamp-2">{truncate(idea.description, 100)}</p>

                        <div className="flex items-center justify-between pt-3 border-t border-white/5">
                          <div className="flex items-center gap-2 text-sm text-dark-400">
                            <span className="w-6 h-6 rounded-full gradient-primary flex items-center justify-center text-white text-xs font-semibold">
                              {idea.author.name.charAt(0)}
                            </span>
                            <span>{idea.author.name}</span>
                          </div>
                          <div className="flex items-center gap-3 text-xs text-dark-500">
                            <span className="flex items-center gap-1"><HiOutlineThumbUp className="w-3.5 h-3.5" />{idea.upvoteCount}</span>
                            <span className="flex items-center gap-1"><HiOutlineChatAlt2 className="w-3.5 h-3.5" />{idea.commentCount}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-12">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="btn-secondary p-2 disabled:opacity-30 cursor-pointer"
                >
                  <HiOutlineChevronLeft className="w-5 h-5" />
                </button>
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const p = page <= 3 ? i + 1 : page - 2 + i;
                  if (p > totalPages) return null;
                  return (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      className={`w-10 h-10 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                        page === p ? 'gradient-primary text-white' : 'btn-secondary'
                      }`}
                    >
                      {p}
                    </button>
                  );
                })}
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="btn-secondary p-2 disabled:opacity-30 cursor-pointer"
                >
                  <HiOutlineChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20 glass rounded-2xl">
            <span className="text-5xl mb-4 block">🔍</span>
            <h3 className="text-xl font-semibold text-white mb-2">No ideas found</h3>
            <p className="text-dark-400">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
