'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { Category } from '@/types';
import toast from 'react-hot-toast';
import { HiOutlinePlus, HiOutlinePencil, HiOutlineTrash, HiOutlineX } from 'react-icons/hi';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<'create' | 'edit' | null>(null);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', description: '', icon: '' });

  useEffect(() => { fetchCategories(); }, []);

  const fetchCategories = async () => {
    try {
      const res = await api.get('/categories');
      setCategories(res.data.data);
    } catch { /* ignore */ }
    finally { setLoading(false); }
  };

  const openCreate = () => {
    setForm({ name: '', description: '', icon: '' });
    setEditId(null);
    setModal('create');
  };

  const openEdit = (cat: Category) => {
    setForm({ name: cat.name, description: cat.description || '', icon: cat.icon || '' });
    setEditId(cat.id);
    setModal('edit');
  };

  const handleSubmit = async () => {
    if (!form.name.trim()) {
      toast.error('Category name is required');
      return;
    }
    try {
      if (modal === 'create') {
        await api.post('/categories', form);
        toast.success('Category created!');
      } else {
        await api.patch(`/categories/${editId}`, form);
        toast.success('Category updated!');
      }
      setModal(null);
      fetchCategories();
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this category? Ideas in this category will be affected.')) return;
    try {
      await api.delete(`/categories/${id}`);
      toast.success('Category deleted');
      fetchCategories();
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to delete');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-dark-900 dark:text-white">Manage Categories</h1>
        <button onClick={openCreate} className="btn-primary text-sm flex items-center gap-2 cursor-pointer">
          <HiOutlinePlus className="w-4 h-4" /> New Category
        </button>
      </div>

      {loading ? (
        <div className="space-y-3">{[...Array(4)].map((_, i) => <div key={i} className="glass rounded-xl p-5 h-16 animate-pulse" />)}</div>
      ) : categories.length === 0 ? (
        <div className="text-center py-16 glass rounded-2xl">
          <p className="text-dark-600 dark:text-dark-400">No categories yet. Create your first one!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat) => (
            <div key={cat.id} className="glass rounded-2xl p-5 flex items-start justify-between">
              <div className="flex items-start gap-3">
                <span className="text-2xl">{cat.icon || '📂'}</span>
                <div>
                  <h3 className="text-sm font-semibold text-dark-900 dark:text-white">{cat.name}</h3>
                  <p className="text-xs text-dark-500 mt-0.5">{cat.description || 'No description'}</p>
                  <p className="text-xs text-primary-400 mt-1">{cat._count?.ideas || 0} ideas</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => openEdit(cat)} className="p-1.5 rounded-lg text-dark-600 dark:text-dark-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer">
                  <HiOutlinePencil className="w-4 h-4" />
                </button>
                <button onClick={() => handleDelete(cat.id)} className="p-1.5 rounded-lg text-dark-600 dark:text-dark-400 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer">
                  <HiOutlineTrash className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="glass rounded-2xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-dark-900 dark:text-white">
                {modal === 'create' ? 'New Category' : 'Edit Category'}
              </h3>
              <button onClick={() => setModal(null)} className="text-dark-600 dark:text-dark-400 hover:text-white cursor-pointer">
                <HiOutlineX className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-dark-600 dark:text-dark-300 mb-1.5">Name *</label>
                <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="input-glass" placeholder="e.g. Energy" />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-600 dark:text-dark-300 mb-1.5">Description</label>
                <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} rows={2} className="input-glass resize-none" placeholder="Brief description..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-600 dark:text-dark-300 mb-1.5">Icon (emoji)</label>
                <input value={form.icon} onChange={e => setForm({...form, icon: e.target.value})} className="input-glass" placeholder="⚡" />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button onClick={() => setModal(null)} className="btn-secondary flex-1 cursor-pointer">Cancel</button>
              <button onClick={handleSubmit} className="btn-primary flex-1 cursor-pointer">
                {modal === 'create' ? 'Create' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
