'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { User } from '@/types';
import { formatDate } from '@/lib/utils';
import toast from 'react-hot-toast';
import { HiOutlineShieldCheck, HiOutlineBan, HiOutlineSearch } from 'react-icons/hi';

export default function AdminMembersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => { fetchUsers(); }, [page]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.set('page', String(page));
      params.set('limit', '15');
      if (search) params.set('search', search);
      const res = await api.get(`/users?${params.toString()}`);
      setUsers(res.data.data);
      if (res.data.meta) setTotalPages(res.data.meta.totalPages);
    } catch { /* ignore */ }
    finally { setLoading(false); }
  };

  const handleToggleStatus = async (id: string) => {
    try {
      await api.patch(`/users/${id}/status`);
      toast.success('User status updated');
      fetchUsers();
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed');
    }
  };

  const handleChangeRole = async (id: string, role: string) => {
    try {
      await api.patch(`/users/${id}/role`, { role });
      toast.success('User role updated');
      fetchUsers();
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed');
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchUsers();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-dark-900 dark:text-white mb-6">Manage Members</h1>

      <form onSubmit={handleSearch} className="flex gap-2 mb-6">
        <div className="relative flex-1 max-w-md">
          <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-500" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search members..." className="input-glass pl-10" />
        </div>
        <button type="submit" className="btn-primary px-6 cursor-pointer">Search</button>
      </form>

      {loading ? (
        <div className="space-y-3">{[...Array(5)].map((_, i) => <div key={i} className="glass rounded-xl p-5 h-16 animate-pulse" />)}</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left text-xs font-semibold text-dark-600 dark:text-dark-400 uppercase tracking-wider py-3 px-4">Member</th>
                <th className="text-left text-xs font-semibold text-dark-600 dark:text-dark-400 uppercase tracking-wider py-3 px-4">Role</th>
                <th className="text-left text-xs font-semibold text-dark-600 dark:text-dark-400 uppercase tracking-wider py-3 px-4">Status</th>
                <th className="text-left text-xs font-semibold text-dark-600 dark:text-dark-400 uppercase tracking-wider py-3 px-4">Joined</th>
                <th className="text-right text-xs font-semibold text-dark-600 dark:text-dark-400 uppercase tracking-wider py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-white/2 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-dark-900 dark:text-white text-xs font-bold">
                        {u.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-dark-900 dark:text-white">{u.name}</p>
                        <p className="text-xs text-dark-500">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <select
                      value={u.role}
                      onChange={e => handleChangeRole(u.id, e.target.value)}
                      className="text-xs px-2 py-1 rounded-lg glass-light text-dark-600 dark:text-dark-300 cursor-pointer border-none focus:ring-0"
                    >
                      <option value="MEMBER">Member</option>
                      <option value="ADMIN">Admin</option>
                    </select>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${u.isActive ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                      {u.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-xs text-dark-500">{formatDate(u.createdAt)}</td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => handleToggleStatus(u.id)}
                      className={`p-2 rounded-lg transition-colors cursor-pointer ${u.isActive ? 'text-red-400 hover:bg-red-500/10' : 'text-emerald-400 hover:bg-emerald-500/10'}`}
                      title={u.isActive ? 'Deactivate' : 'Activate'}
                    >
                      {u.isActive ? <HiOutlineBan className="w-4 h-4" /> : <HiOutlineShieldCheck className="w-4 h-4" />}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: totalPages }, (_, i) => (
            <button key={i} onClick={() => setPage(i + 1)}
              className={`w-9 h-9 rounded-lg text-sm font-medium cursor-pointer ${page === i + 1 ? 'gradient-primary text-dark-900 dark:text-white' : 'glass-light text-dark-600 dark:text-dark-400'}`}>
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
