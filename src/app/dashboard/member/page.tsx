'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import api from '@/lib/api';
import { Idea } from '@/types';
import Link from 'next/link';
import { HiOutlineLightBulb, HiOutlineThumbUp, HiOutlinePlusCircle, HiOutlineClock } from 'react-icons/hi';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const COLORS = ['#10b981', '#f59e0b', '#3b82f6', '#94a3b8'];

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
    rejected: ideas.filter(i => i.status === 'REJECTED').length,
  };

  const chartData = [
    { name: 'Approved', count: stats.approved },
    { name: 'Pending', count: stats.pending },
    { name: 'Draft', count: stats.drafts },
    { name: 'Rejected', count: stats.rejected },
  ];

  const recentIdeas = ideas.slice(0, 4);

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
          { label: 'Total Ideas', value: stats.total, icon: HiOutlineLightBulb, color: 'text-primary-400', bg: 'bg-primary-500/10' },
          { label: 'Approved', value: stats.approved, icon: HiOutlineThumbUp, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
          { label: 'Under Review', value: stats.pending, icon: HiOutlineClock, color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
          { label: 'Drafts', value: stats.drafts, icon: HiOutlinePlusCircle, color: 'text-blue-400', bg: 'bg-blue-500/10' },
        ].map((stat) => (
          <div key={stat.label} className="glass rounded-2xl p-5">
            <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center mb-3`}>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <p className="text-2xl font-bold text-dark-900 dark:text-white">{loading ? '—' : stat.value}</p>
            <p className="text-xs text-dark-600 dark:text-dark-400 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Status Chart */}
        <div className="lg:col-span-1 glass rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-dark-900 dark:text-white mb-4">Idea Status Overview</h2>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} layout="vertical" margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip cursor={{fill: 'rgba(255,255,255,0.05)'}} contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }} />
                <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={20}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="lg:col-span-2 glass rounded-2xl p-6 flex flex-col justify-center">
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

      {/* Recent Ideas Data Table */}
      <div className="glass rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-white/5">
          <h2 className="text-lg font-bold text-dark-900 dark:text-white">My Recent Submissions</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-dark-100/50 dark:bg-white/5 text-xs uppercase tracking-wider text-dark-500 font-semibold border-b border-dark-200 dark:border-white/10">
                <th className="p-4">Idea Title</th>
                <th className="p-4">Category</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Date</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {loading ? (
                <tr><td colSpan={4} className="p-4 text-center text-dark-500">Loading...</td></tr>
              ) : recentIdeas.length === 0 ? (
                <tr><td colSpan={4} className="p-4 text-center text-dark-500">You haven&apos;t submitted any ideas yet.</td></tr>
              ) : (
                recentIdeas.map((idea) => (
                  <tr key={idea.id} className="border-b border-dark-100 dark:border-white/5 hover:bg-dark-50 dark:hover:bg-white/5 transition-colors">
                    <td className="p-4 font-medium text-dark-900 dark:text-white max-w-[250px] truncate">
                      <Link href={`/ideas/${idea.id}`} className="hover:text-primary-500 transition-colors">
                        {idea.title}
                      </Link>
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-1 rounded-full bg-dark-100 dark:bg-white/10 text-xs">{idea.category?.name}</span>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase
                        ${idea.status === 'APPROVED' ? 'bg-emerald-500/20 text-emerald-500' :
                          idea.status === 'REJECTED' ? 'bg-red-500/20 text-red-500' :
                          idea.status === 'UNDER_REVIEW' ? 'bg-yellow-500/20 text-yellow-500' :
                          'bg-dark-500/20 text-dark-500'}
                      `}>
                        {idea.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="p-4 text-right text-dark-500">{new Date(idea.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
