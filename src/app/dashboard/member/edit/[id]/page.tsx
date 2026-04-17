'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import api from '@/lib/api';
import { Category, Idea } from '@/types';
import toast from 'react-hot-toast';
import { HiOutlinePhotograph, HiOutlineArrowLeft } from 'react-icons/hi';
import Link from 'next/link';

export default function EditIdeaPage() {
  const { id } = useParams();
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [title, setTitle] = useState('');
  const [problemStatement, setProblemStatement] = useState('');
  const [proposedSolution, setProposedSolution] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [isPaid, setIsPaid] = useState(false);
  const [price, setPrice] = useState('');
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  useEffect(() => {
    Promise.all([
      api.get('/categories'),
      api.get(`/ideas/${id}`),
    ]).then(([catRes, ideaRes]) => {
      setCategories(catRes.data.data);
      const idea: Idea = ideaRes.data.data;
      setTitle(idea.title);
      setProblemStatement(idea.problemStatement);
      setProposedSolution(idea.proposedSolution);
      setDescription(idea.description);
      setCategoryId(idea.categoryId);
      setIsPaid(idea.isPaid);
      setPrice(idea.price ? String(idea.price) : '');
      setExistingImages(idea.images || []);
    }).catch(() => {
      toast.error('Failed to load idea');
      router.push('/dashboard/member/ideas');
    }).finally(() => setLoading(false));
  }, [id, router]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).slice(0, 5);
    setNewImages(files);
    setPreviews(files.map(f => URL.createObjectURL(f)));
  };

  const handleSubmit = async () => {
    if (!title || !problemStatement || !proposedSolution || !description || !categoryId) {
      toast.error('Please fill in all required fields');
      return;
    }

    setSaving(true);
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('problemStatement', problemStatement);
      formData.append('proposedSolution', proposedSolution);
      formData.append('description', description);
      formData.append('categoryId', categoryId);
      formData.append('isPaid', String(isPaid));
      if (isPaid && price) formData.append('price', price);
      newImages.forEach(img => formData.append('images', img));

      await api.patch(`/ideas/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      toast.success('Idea updated!');
      router.push('/dashboard/member/ideas');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to update');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-[50vh]"><div className="w-10 h-10 border-3 border-primary-500/30 border-t-primary-500 rounded-full animate-spin" /></div>;
  }

  return (
    <div>
      <Link href="/dashboard/member/ideas" className="inline-flex items-center gap-1 text-dark-600 dark:text-dark-400 hover:text-primary-400 text-sm mb-4 transition-colors">
        <HiOutlineArrowLeft className="w-4 h-4" /> Back to My Ideas
      </Link>

      <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-dark-900 dark:text-white mb-6">Edit Idea</h1>

      <div className="glass rounded-2xl p-6 sm:p-8 max-w-3xl space-y-6">
        <div>
          <label className="block text-sm font-medium text-dark-600 dark:text-dark-300 mb-1.5">Title *</label>
          <input value={title} onChange={e => setTitle(e.target.value)} className="input-glass" />
        </div>

        <div>
          <label className="block text-sm font-medium text-dark-600 dark:text-dark-300 mb-1.5">Category *</label>
          <select value={categoryId} onChange={e => setCategoryId(e.target.value)} className="input-glass cursor-pointer">
            <option value="">Select a category</option>
            {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-dark-600 dark:text-dark-300 mb-1.5">Problem Statement *</label>
          <textarea value={problemStatement} onChange={e => setProblemStatement(e.target.value)} rows={3} className="input-glass resize-none" />
        </div>

        <div>
          <label className="block text-sm font-medium text-dark-600 dark:text-dark-300 mb-1.5">Proposed Solution *</label>
          <textarea value={proposedSolution} onChange={e => setProposedSolution(e.target.value)} rows={3} className="input-glass resize-none" />
        </div>

        <div>
          <label className="block text-sm font-medium text-dark-600 dark:text-dark-300 mb-1.5">Description *</label>
          <textarea value={description} onChange={e => setDescription(e.target.value)} rows={5} className="input-glass resize-none" />
        </div>

        {/* Existing Images */}
        {existingImages.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-dark-600 dark:text-dark-300 mb-1.5">Current Images</label>
            <div className="flex gap-2 flex-wrap">
              {existingImages.map((img, i) => (
                <img key={i} src={img} alt={`Current ${i}`} className="w-20 h-20 object-cover rounded-xl border border-white/10" />
              ))}
            </div>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-dark-600 dark:text-dark-300 mb-1.5">Replace Images (up to 5)</label>
          <label className="flex items-center justify-center gap-2 p-6 rounded-xl border-2 border-dashed border-dark-600 hover:border-primary-500/50 transition-colors cursor-pointer">
            <HiOutlinePhotograph className="w-6 h-6 text-dark-500" />
            <span className="text-sm text-dark-600 dark:text-dark-400">Click to upload new images</span>
            <input type="file" multiple accept="image/*" onChange={handleImageChange} className="hidden" />
          </label>
          {previews.length > 0 && (
            <div className="flex gap-2 mt-3 flex-wrap">
              {previews.map((src, i) => <img key={i} src={src} alt={`Preview ${i}`} className="w-20 h-20 object-cover rounded-xl border border-white/10" />)}
            </div>
          )}
        </div>

        <div className="flex items-center gap-4 p-4 rounded-xl glass-light">
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={isPaid} onChange={e => setIsPaid(e.target.checked)} className="w-5 h-5 rounded accent-primary-500 cursor-pointer" />
            <span className="text-sm font-medium text-dark-800 dark:text-dark-200">Paid Idea (Premium)</span>
          </label>
          {isPaid && (
            <input type="number" value={price} onChange={e => setPrice(e.target.value)} placeholder="Price (USD)" min="0.5" step="0.01" className="input-glass w-32 text-sm" />
          )}
        </div>

        <div className="flex gap-3 pt-4 border-t border-white/5">
          <Link href="/dashboard/member/ideas" className="btn-secondary flex-1 py-3 text-center">Cancel</Link>
          <button onClick={handleSubmit} disabled={saving} className="btn-primary flex-1 py-3 cursor-pointer disabled:opacity-50">
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}
