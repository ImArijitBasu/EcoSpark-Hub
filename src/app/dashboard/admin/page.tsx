'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { HiOutlineLightBulb, HiOutlineUsers, HiOutlineCheckCircle, HiOutlineClock } from 'react-icons/hi';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Idea } from '@/types';

const COLORS = ['#10b981', '#f59e0b', '#ef4444', '#3b82f6'];

export default function AdminDashboard() {
  const [stats, setStats] = useState({ total: 0, approved: 0, pending: 0, rejected: 0, users: 0, drafts: 0 });
  const [recentIdeas, setRecentIdeas] = useState<Idea[]>([]);
  const [categoryData, setCategoryData] = useState<{name: string, count: number}[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [ideasRes, usersRes, catsRes] = await Promise.all([
        api.get('/ideas/admin/all?limit=1000'),
        api.get('/users?limit=1'),
        api.get('/categories'),
      ]);
      const ideas = ideasRes.data.data;
      const cats = catsRes.data.data;
      
      setStats({
        total: ideasRes.data.meta.total,
        approved: ideas.filter((i: any) => i.status === 'APPROVED').length,
        pending: ideas.filter((i: any) => i.status === 'UNDER_REVIEW').length,
        rejected: ideas.filter((i: any) => i.status === 'REJECTED').length,
        drafts: ideas.filter((i: any) => i.status === 'DRAFT').length,
        users: usersRes.data.meta.total,
      });

      setRecentIdeas(ideas.slice(0, 5));

      // Map category names to their idea counts
      setCategoryData(cats.map((c: any) => ({
        name: c.name,
        count: c._count?.ideas || 0
      })));

    } catch { /* ignore */ }
    finally { setLoading(false); }
  };

  const statCards = [
    { label: 'Total Ideas', value: stats.total, icon: HiOutlineLightBulb, color: 'text-primary-400', bg: 'bg-primary-500/10' },
    { label: 'Approved', value: stats.approved, icon: HiOutlineCheckCircle, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    { label: 'Pending Review', value: stats.pending, icon: HiOutlineClock, color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
    { label: 'Total Members', value: stats.users, icon: HiOutlineUsers, color: 'text-blue-400', bg: 'bg-blue-500/10' },
  ];

  const pieData = [
    { name: 'Approved', value: stats.approved },
    { name: 'Pending', value: stats.pending },
    { name: 'Rejected', value: stats.rejected },
    { name: 'Draft', value: stats.drafts },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-dark-900 dark:text-white mb-6">Admin Overview</h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((stat) => (
          <div key={stat.label} className="glass rounded-2xl p-5">
            <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center mb-3`}>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <p className="text-2xl font-bold text-dark-900 dark:text-white">{loading ? '—' : stat.value}</p>
            <p className="text-xs text-dark-600 dark:text-dark-400 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="glass rounded-2xl p-6">
          <h2 className="text-lg font-bold text-dark-900 dark:text-white mb-6">Ideas by Status</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass rounded-2xl p-6">
          <h2 className="text-lg font-bold text-dark-900 dark:text-white mb-6">Ideas by Category</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData}>
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip cursor={{fill: 'rgba(255,255,255,0.05)'}} contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }} />
                <Bar dataKey="count" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Ideas Data Table */}
      <div className="glass rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-white/5">
          <h2 className="text-lg font-bold text-dark-900 dark:text-white">Recent Submissions</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-dark-100/50 dark:bg-white/5 text-xs uppercase tracking-wider text-dark-500 font-semibold border-b border-dark-200 dark:border-white/10">
                <th className="p-4">Idea Title</th>
                <th className="p-4">Author</th>
                <th className="p-4">Category</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Date</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {loading ? (
                <tr><td colSpan={5} className="p-4 text-center text-dark-500">Loading...</td></tr>
              ) : recentIdeas.length === 0 ? (
                <tr><td colSpan={5} className="p-4 text-center text-dark-500">No recent ideas</td></tr>
              ) : (
                recentIdeas.map((idea) => (
                  <tr key={idea.id} className="border-b border-dark-100 dark:border-white/5 hover:bg-dark-50 dark:hover:bg-white/5 transition-colors">
                    <td className="p-4 font-medium text-dark-900 dark:text-white max-w-[200px] truncate">{idea.title}</td>
                    <td className="p-4 text-dark-600 dark:text-dark-300">{idea.author?.name}</td>
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
