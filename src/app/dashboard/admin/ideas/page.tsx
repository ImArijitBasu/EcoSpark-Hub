'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { Idea } from '@/types';
import { getStatusColor, getStatusLabel, formatDate } from '@/lib/utils';
import toast from 'react-hot-toast';
import { HiOutlineCheck, HiOutlineX, HiOutlineTrash } from 'react-icons/hi';

export default function AdminIdeasPage() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('UNDER_REVIEW');
  const [feedbackModal, setFeedbackModal] = useState<string | null>(null);
  const [feedback, setFeedback] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => { fetchIdeas(); }, [filter, page]);

  const fetchIdeas = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.set('page', String(page));
      params.set('limit', '15');
      if (filter) params.set('status', filter);
      const res = await api.get(`/ideas/admin/all?${params.toString()}`);
      setIdeas(res.data.data);
      if (res.data.meta) setTotalPages(res.data.meta.totalPages);
    } catch { /* ignore */ }
    finally { setLoading(false); }
  };

  const handleApprove = async (id: string) => {
    try {
      await api.patch(`/ideas/${id}/status`, { status: 'APPROVED' });
      toast.success('Idea approved!');
      fetchIdeas();
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed');
    }
  };

  const handleReject = async (id: string) => {
    if (!feedback.trim()) {
      toast.error('Please provide feedback for rejection');
      return;
    }
    try {
      await api.patch(`/ideas/${id}/status`, { status: 'REJECTED', adminFeedback: feedback });
      toast.success('Idea rejected with feedback');
      setFeedbackModal(null);
      setFeedback('');
      fetchIdeas();
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this idea permanently?')) return;
    try {
      await api.delete(`/ideas/${id}`);
      toast.success('Idea deleted');
      fetchIdeas();
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed');
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-dark-900 dark:text-white mb-6">Manage Ideas</h1>

      <div className="flex flex-wrap gap-2 mb-6">
        {['UNDER_REVIEW', 'APPROVED', 'REJECTED', 'DRAFT', ''].map((s) => (
          <button key={s} onClick={() => { setFilter(s); setPage(1); }}
            className={`px-4 py-2 rounded-xl text-xs font-medium cursor-pointer transition-all ${filter === s ? 'gradient-primary text-dark-900 dark:text-white' : 'glass-light text-dark-600 dark:text-dark-400 hover:text-dark-900 dark:hover:text-white'}`}>
            {s ? getStatusLabel(s) : 'All'}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="space-y-3">{[...Array(5)].map((_, i) => <div key={i} className="glass rounded-xl p-5 h-20 animate-pulse" />)}</div>
      ) : ideas.length === 0 ? (
        <div className="text-center py-16 glass rounded-2xl"><p className="text-dark-600 dark:text-dark-400">No ideas found</p></div>
      ) : (
        <div className="space-y-3">
          {ideas.map((idea) => (
            <div key={idea.id} className="glass rounded-xl p-4 flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-sm font-semibold text-dark-900 dark:text-white truncate">{idea.title}</h3>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${getStatusColor(idea.status)}`}>
                    {getStatusLabel(idea.status)}
                  </span>
                </div>
                <p className="text-xs text-dark-500">
                  by {idea.author.name} · {idea.category.name} · {formatDate(idea.createdAt)}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {idea.status === 'UNDER_REVIEW' && (
                  <>
                    <button onClick={() => handleApprove(idea.id)} className="p-2 rounded-lg text-emerald-400 hover:bg-emerald-500/10 transition-colors cursor-pointer" title="Approve">
                      <HiOutlineCheck className="w-5 h-5" />
                    </button>
                    <button onClick={() => setFeedbackModal(idea.id)} className="p-2 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer" title="Reject">
                      <HiOutlineX className="w-5 h-5" />
                    </button>
                  </>
                )}
                <button onClick={() => handleDelete(idea.id)} className="p-2 rounded-lg text-dark-500 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer" title="Delete">
                  <HiOutlineTrash className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
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

      {/* Reject Modal */}
      {feedbackModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="glass rounded-2xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-dark-900 dark:text-white mb-4">Reject Idea</h3>
            <textarea value={feedback} onChange={e => setFeedback(e.target.value)} rows={4} placeholder="Provide feedback for the rejection..." className="input-glass resize-none mb-4" />
            <div className="flex gap-3">
              <button onClick={() => { setFeedbackModal(null); setFeedback(''); }} className="btn-secondary flex-1 cursor-pointer">Cancel</button>
              <button onClick={() => handleReject(feedbackModal)} className="bg-red-500 hover:bg-red-600 text-dark-900 dark:text-white font-semibold px-6 py-2.5 rounded-xl flex-1 cursor-pointer transition-colors">Reject</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
