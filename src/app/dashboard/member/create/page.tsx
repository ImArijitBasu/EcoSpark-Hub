'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { Category } from '@/types';
import toast from 'react-hot-toast';
import { HiOutlinePhotograph } from 'react-icons/hi';

export default function CreateIdeaPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState('');
  const [problemStatement, setProblemStatement] = useState('');
  const [proposedSolution, setProposedSolution] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [isPaid, setIsPaid] = useState(false);
  const [price, setPrice] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  useEffect(() => {
    api.get('/categories').then(res => setCategories(res.data.data)).catch(() => {});
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).slice(0, 5);
    setImages(files);
    setPreviews(files.map(f => URL.createObjectURL(f)));
  };

  const handleSubmit = async (asDraft: boolean) => {
    if (!title || !problemStatement || !proposedSolution || !description || !categoryId) {
      toast.error('Please fill in all required fields');
      return;
    }
    if (isPaid && (!price || parseFloat(price) <= 0)) {
      toast.error('Please enter a valid price for paid ideas');
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('problemStatement', problemStatement);
      formData.append('proposedSolution', proposedSolution);
      formData.append('description', description);
      formData.append('categoryId', categoryId);
      formData.append('isPaid', String(isPaid));
      if (isPaid && price) formData.append('price', price);
      formData.append('status', asDraft ? 'DRAFT' : 'UNDER_REVIEW');
      images.forEach(img => formData.append('images', img));

      await api.post('/ideas', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      toast.success(asDraft ? 'Idea saved as draft!' : 'Idea submitted for review!');
      router.push('/dashboard/member/ideas');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to create idea');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-white mb-6">
        Create New Idea
      </h1>

      <div className="glass rounded-2xl p-6 sm:p-8 max-w-3xl">
        <div className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-dark-300 mb-1.5">Title *</label>
            <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Give your idea a compelling title" className="input-glass" required />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-dark-300 mb-1.5">Category *</label>
            <select value={categoryId} onChange={e => setCategoryId(e.target.value)} className="input-glass cursor-pointer" required>
              <option value="">Select a category</option>
              {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
            </select>
          </div>

          {/* Problem Statement */}
          <div>
            <label className="block text-sm font-medium text-dark-300 mb-1.5">Problem Statement *</label>
            <textarea value={problemStatement} onChange={e => setProblemStatement(e.target.value)} rows={3} placeholder="What problem does your idea address?" className="input-glass resize-none" required />
          </div>

          {/* Proposed Solution */}
          <div>
            <label className="block text-sm font-medium text-dark-300 mb-1.5">Proposed Solution *</label>
            <textarea value={proposedSolution} onChange={e => setProposedSolution(e.target.value)} rows={3} placeholder="How does your idea solve the problem?" className="input-glass resize-none" required />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-dark-300 mb-1.5">Detailed Description *</label>
            <textarea value={description} onChange={e => setDescription(e.target.value)} rows={5} placeholder="Provide a detailed explanation of your idea..." className="input-glass resize-none" required />
          </div>

          {/* Images */}
          <div>
            <label className="block text-sm font-medium text-dark-300 mb-1.5">Images (up to 5)</label>
            <label className="flex items-center justify-center gap-2 p-6 rounded-xl border-2 border-dashed border-dark-600 hover:border-primary-500/50 transition-colors cursor-pointer">
              <HiOutlinePhotograph className="w-6 h-6 text-dark-500" />
              <span className="text-sm text-dark-400">Click to upload images</span>
              <input type="file" multiple accept="image/*" onChange={handleImageChange} className="hidden" />
            </label>
            {previews.length > 0 && (
              <div className="flex gap-2 mt-3 flex-wrap">
                {previews.map((src, i) => (
                  <img key={i} src={src} alt={`Preview ${i}`} className="w-20 h-20 object-cover rounded-xl border border-white/10" />
                ))}
              </div>
            )}
          </div>

          {/* Paid Toggle */}
          <div className="flex items-center gap-4 p-4 rounded-xl glass-light">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={isPaid} onChange={e => setIsPaid(e.target.checked)} className="w-5 h-5 rounded accent-primary-500 cursor-pointer" />
              <span className="text-sm font-medium text-dark-200">Mark as Paid Idea (Premium)</span>
            </label>
            {isPaid && (
              <input
                type="number"
                value={price}
                onChange={e => setPrice(e.target.value)}
                placeholder="Price (USD)"
                min="0.5"
                step="0.01"
                className="input-glass w-32 text-sm"
              />
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-white/5">
            <button onClick={() => handleSubmit(true)} disabled={loading} className="btn-secondary flex-1 py-3 cursor-pointer disabled:opacity-50">
              {loading ? 'Saving...' : 'Save as Draft'}
            </button>
            <button onClick={() => handleSubmit(false)} disabled={loading} className="btn-primary flex-1 py-3 cursor-pointer disabled:opacity-50">
              {loading ? 'Submitting...' : 'Submit for Review'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
