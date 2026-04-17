'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import api from '@/lib/api';
import { Idea } from '@/types';
import Link from 'next/link';
import { HiOutlineLightBulb, HiOutlineThumbUp, HiOutlinePlusCircle, HiOutlineClock } from 'react-icons/hi';

export default function MemberDashboard() {
  const { user } = useAuth();
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyIdeas();
  }, []);

  const fetchMyIdeas = async () => {
    try {
      const res = await api.get('/ideas/user/my');
      setIdeas(res.data.data);
    } catch { /* ignore */ }
    finally { setLoading(false); }
  };

  const stats = {
    total: ideas.length,
    approved: ideas.filter(i => i.status === 'APPROVED').length,
    pending: ideas.filter(i => i.status === 'UNDER_REVIEW').length,
    drafts: ideas.filter(i => i.status === 'DRAFT').length,
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-dark-900 dark:text-white">
          Welcome back, {user?.name?.split(' ')[0]} 👋
        </h1>
        <p className="text-dark-600 dark:text-dark-400 text-sm mt-1">Here&apos;s an overview of your sustainability ideas</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Ideas', value: stats.total, icon: HiOutlineLightBulb, color: 'primary' },
          { label: 'Approved', value: stats.approved, icon: HiOutlineThumbUp, color: 'emerald' },
          { label: 'Under Review', value: stats.pending, icon: HiOutlineClock, color: 'yellow' },
          { label: 'Drafts', value: stats.drafts, icon: HiOutlinePlusCircle, color: 'blue' },
        ].map((stat) => (
          <div key={stat.label} className="glass rounded-2xl p-5">
            <div className={`w-10 h-10 rounded-xl bg-${stat.color}-500/10 flex items-center justify-center mb-3`}>
              <stat.icon className={`w-5 h-5 text-${stat.color}-400`} />
            </div>
            <p className="text-2xl font-bold text-dark-900 dark:text-white">{loading ? '—' : stat.value}</p>
            <p className="text-xs text-dark-600 dark:text-dark-400 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="glass rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-dark-900 dark:text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link href="/dashboard/member/create" className="flex items-center gap-3 p-4 rounded-xl glass-light hover:border-primary-500/30 transition-all group">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
              <HiOutlinePlusCircle className="w-5 h-5 text-dark-900 dark:text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-dark-900 dark:text-white group-hover:text-primary-400 transition-colors">Create New Idea</p>
              <p className="text-xs text-dark-500">Share your sustainability concept</p>
            </div>
          </Link>
          <Link href="/dashboard/member/ideas" className="flex items-center gap-3 p-4 rounded-xl glass-light hover:border-primary-500/30 transition-all group">
            <div className="w-10 h-10 rounded-xl bg-accent-500/20 flex items-center justify-center">
              <HiOutlineLightBulb className="w-5 h-5 text-accent-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-dark-900 dark:text-white group-hover:text-primary-400 transition-colors">View My Ideas</p>
              <p className="text-xs text-dark-500">Manage your submitted ideas</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
