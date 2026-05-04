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
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<{name: string, description: string, icon: string, miniImage: File | null, bannerImage: File | null}>({ name: '', description: '', icon: '', miniImage: null, bannerImage: null });

  useEffect(() => { fetchCategories(); }, []);

  const fetchCategories = async () => {
    try {
      const res = await api.get('/categories');
      setCategories(res.data.data);
    } catch { /* ignore */ }
    finally { setLoading(false); }
  };

  const openCreate = () => {
    setForm({ name: '', description: '', icon: '', miniImage: null, bannerImage: null });
    setEditId(null);
    setModal('create');
  };

  const openEdit = (cat: Category) => {
    setForm({ name: cat.name, description: cat.description || '', icon: cat.icon || '', miniImage: null, bannerImage: null });
    setEditId(cat.id);
    setModal('edit');
  };

  const handleSubmit = async () => {
    if (!form.name.trim()) {
      toast.error('Category name is required');
      return;
    }
    
    setSaving(true);
    const formData = new FormData();
    formData.append('name', form.name);
    if (form.description) formData.append('description', form.description);
    if (form.icon) formData.append('icon', form.icon);
    if (form.miniImage) formData.append('miniImage', form.miniImage);
    if (form.bannerImage) formData.append('bannerImage', form.bannerImage);

    try {
      if (modal === 'create') {
        await api.post('/categories', formData, { headers: { 'Content-Type': 'multipart/form-data' }});
        toast.success('Category created!');
      } else {
        await api.patch(`/categories/${editId}`, formData, { headers: { 'Content-Type': 'multipart/form-data' }});
        toast.success('Category updated!');
      }
      setModal(null);
      fetchCategories();
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed');
    } finally {
      setSaving(false);
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
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-dark-100 flex items-center justify-center relative shadow-inner">
                  {cat.miniImage ? (
                    <img src={cat.miniImage} alt={cat.name} className="w-full h-full object-cover" />
                  ) : cat.icon ? (
                    <span className="text-2xl">{cat.icon}</span>
                  ) : (
                    <span className="text-xl">📂</span>
                  )}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-dark-900 dark:text-white">{cat.name}</h3>
                  <p className="text-xs text-dark-500 mt-0.5">{cat.description || 'No description'}</p>
                  <p className="text-xs text-primary-400 mt-1">{cat._count?.ideas || 0} ideas</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => openEdit(cat)} className="p-1.5 rounded-lg text-dark-600 dark:text-dark-400 hover:text-dark-900 dark:hover:text-white hover:bg-white/5 transition-colors cursor-pointer">
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
              <button onClick={() => setModal(null)} className="text-dark-600 dark:text-dark-400 hover:text-dark-900 dark:hover:text-white cursor-pointer">
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
              <div className="flex flex-col gap-4">
                <div>
                  <label className="block text-sm font-medium text-dark-600 dark:text-dark-300 mb-1.5">Mini Card Image</label>
                  <input type="file" accept="image/*" onChange={e => setForm({...form, miniImage: e.target.files?.[0] || null})} className="w-full text-sm text-dark-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-500/10 file:text-primary-500 hover:file:bg-primary-500/20 transition-all cursor-pointer" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark-600 dark:text-dark-300 mb-1.5">Banner Background Image</label>
                  <input type="file" accept="image/*" onChange={e => setForm({...form, bannerImage: e.target.files?.[0] || null})} className="w-full text-sm text-dark-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-500/10 file:text-primary-500 hover:file:bg-primary-500/20 transition-all cursor-pointer" />
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button onClick={() => setModal(null)} disabled={saving} className="btn-secondary flex-1 cursor-pointer disabled:opacity-50">Cancel</button>
              <button onClick={handleSubmit} disabled={saving} className="btn-primary flex-1 cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2">
                {saving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Saving...
                  </>
                ) : (
                  modal === 'create' ? 'Create' : 'Save Changes'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
