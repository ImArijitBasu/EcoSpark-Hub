'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { HiOutlineLightBulb, HiOutlineUsers, HiOutlineCheckCircle, HiOutlineClock } from 'react-icons/hi';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ total: 0, approved: 0, pending: 0, rejected: 0, users: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [ideasRes, usersRes] = await Promise.all([
        api.get('/ideas/admin/all?limit=1000'),
        api.get('/users?limit=1'),
      ]);
      const ideas = ideasRes.data.data;
      setStats({
        total: ideasRes.data.meta.total,
        approved: ideas.filter((i: any) => i.status === 'APPROVED').length,
        pending: ideas.filter((i: any) => i.status === 'UNDER_REVIEW').length,
        rejected: ideas.filter((i: any) => i.status === 'REJECTED').length,
        users: usersRes.data.meta.total,
      });
    } catch { /* ignore */ }
    finally { setLoading(false); }
  };

  const statCards = [
    { label: 'Total Ideas', value: stats.total, icon: HiOutlineLightBulb, color: 'text-primary-400', bg: 'bg-primary-500/10' },
    { label: 'Approved', value: stats.approved, icon: HiOutlineCheckCircle, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    { label: 'Pending Review', value: stats.pending, icon: HiOutlineClock, color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
    { label: 'Total Members', value: stats.users, icon: HiOutlineUsers, color: 'text-blue-400', bg: 'bg-blue-500/10' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-white mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((stat) => (
          <div key={stat.label} className="glass rounded-2xl p-5">
            <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center mb-3`}>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <p className="text-2xl font-bold text-white">{loading ? '—' : stat.value}</p>
            <p className="text-xs text-dark-400 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
