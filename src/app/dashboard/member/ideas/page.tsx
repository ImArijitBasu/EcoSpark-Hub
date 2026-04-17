'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import api from '@/lib/api';
import { Idea } from '@/types';
import { getStatusColor, getStatusLabel, formatDate } from '@/lib/utils';
import toast from 'react-hot-toast';
import { HiOutlineTrash, HiOutlinePencil, HiOutlineArrowRight, HiOutlinePlusCircle } from 'react-icons/hi';

export default function MyIdeasPage() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');

  useEffect(() => { fetchIdeas(); }, []);

  const fetchIdeas = async () => {
    try {
      const res = await api.get('/ideas/user/my');
      setIdeas(res.data.data);
    } catch { /* ignore */ }
    finally { setLoading(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this idea?')) return;
    try {
      await api.delete(`/ideas/${id}`);
      toast.success('Idea deleted');
      fetchIdeas();
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to delete');
    }
  };

  const handleSubmitForReview = async (id: string) => {
    try {
      await api.patch(`/ideas/${id}/submit`);
      toast.success('Idea submitted for review!');
      fetchIdeas();
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to submit');
    }
  };

  const filtered = filter ? ideas.filter(i => i.status === filter) : ideas;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-dark-900 dark:text-white">My Ideas</h1>
        <Link href="/dashboard/member/create" className="btn-primary text-sm flex items-center gap-2">
          <HiOutlinePlusCircle className="w-4 h-4" /> New Idea
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {['', 'DRAFT', 'UNDER_REVIEW', 'APPROVED', 'REJECTED'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
              filter === status ? 'gradient-primary text-dark-900 dark:text-white' : 'glass-light text-dark-600 dark:text-dark-400 hover:text-dark-900 dark:hover:text-white'
            }`}
          >
            {status ? getStatusLabel(status) : 'All'} ({status ? ideas.filter(i => i.status === status).length : ideas.length})
          </button>
        ))}
      </div>

      {loading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => <div key={i} className="glass rounded-2xl p-5 animate-pulse h-24" />)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 glass rounded-2xl">
          <span className="text-4xl block mb-3">💡</span>
          <p className="text-dark-600 dark:text-dark-400">No ideas found. Create your first one!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((idea) => (
            <div key={idea.id} className="glass rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-base font-semibold text-dark-900 dark:text-white truncate">{idea.title}</h3>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${getStatusColor(idea.status)}`}>
                    {getStatusLabel(idea.status)}
                  </span>
                  {idea.isPaid && <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent-500/20 text-accent-400">💎 ${idea.price}</span>}
                </div>
                <p className="text-xs text-dark-500">{idea.category.name} · {formatDate(idea.createdAt)}</p>
                {idea.adminFeedback && idea.status === 'REJECTED' && (
                  <p className="text-xs text-red-400 mt-2 p-2 rounded-lg bg-red-500/10 border border-red-500/20">
                    <strong>Admin Feedback:</strong> {idea.adminFeedback}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {(idea.status === 'DRAFT' || idea.status === 'REJECTED') && (
                  <>
                    <button onClick={() => handleSubmitForReview(idea.id)} className="btn-primary text-xs px-3 py-1.5 flex items-center gap-1 cursor-pointer">
                      <HiOutlineArrowRight className="w-3.5 h-3.5" /> Submit
                    </button>
                    <Link href={`/dashboard/member/edit/${idea.id}`} className="btn-secondary text-xs px-3 py-1.5 flex items-center gap-1">
                      <HiOutlinePencil className="w-3.5 h-3.5" /> Edit
                    </Link>
                    <button onClick={() => handleDelete(idea.id)} className="p-2 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer">
                      <HiOutlineTrash className="w-4 h-4" />
                    </button>
                  </>
                )}
                {idea.status === 'APPROVED' && (
                  <Link href={`/ideas/${idea.id}`} className="btn-secondary text-xs px-3 py-1.5">View</Link>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
