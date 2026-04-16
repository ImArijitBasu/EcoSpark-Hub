'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import { HiOutlineUser, HiOutlineMail, HiOutlineLockClosed, HiOutlinePhotograph, HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi';

export default function ProfilePage() {
  const { user, updateUser } = useAuth();
  const [tab, setTab] = useState<'profile' | 'password'>('profile');

  // Profile form
  const [name, setName] = useState(user?.name || '');
  const [avatar, setAvatar] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(user?.avatar || null);
  const [savingProfile, setSavingProfile] = useState(false);

  // Password form
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPasswords, setShowPasswords] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatar(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error('Name is required');
      return;
    }
    setSavingProfile(true);
    try {
      const formData = new FormData();
      formData.append('name', name.trim());
      if (avatar) formData.append('avatar', avatar);

      const res = await api.patch('/auth/profile', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      updateUser(res.data.data);
      toast.success('Profile updated successfully!');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setSavingProfile(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword) {
      toast.error('All fields are required');
      return;
    }
    if (newPassword.length < 6) {
      toast.error('New password must be at least 6 characters');
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }
    setSavingPassword(true);
    try {
      await api.patch('/auth/change-password', {
        currentPassword,
        newPassword,
      });
      toast.success('Password changed successfully!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to change password');
    } finally {
      setSavingPassword(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-white mb-6">Account Settings</h1>

      {/* Tab Switcher */}
      <div className="flex gap-1 p-1 glass rounded-xl w-fit mb-8">
        <button
          onClick={() => setTab('profile')}
          className={`px-5 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
            tab === 'profile' ? 'gradient-primary text-white' : 'text-dark-400 hover:text-white'
          }`}
        >
          Profile
        </button>
        <button
          onClick={() => setTab('password')}
          className={`px-5 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
            tab === 'password' ? 'gradient-primary text-white' : 'text-dark-400 hover:text-white'
          }`}
        >
          Change Password
        </button>
      </div>

      {tab === 'profile' ? (
        <form onSubmit={handleProfileUpdate} className="glass rounded-2xl p-6 sm:p-8 max-w-xl space-y-6">
          {/* Avatar */}
          <div className="flex items-center gap-6">
            <div className="relative group">
              {preview ? (
                <img src={preview} alt="Avatar" className="w-20 h-20 rounded-2xl object-cover border-2 border-primary-500/30" />
              ) : (
                <div className="w-20 h-20 rounded-2xl gradient-primary flex items-center justify-center text-white text-2xl font-bold">
                  {user?.name?.charAt(0)}
                </div>
              )}
              <label className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <HiOutlinePhotograph className="w-6 h-6 text-white" />
                <input type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
              </label>
            </div>
            <div>
              <p className="text-sm font-medium text-white">{user?.name}</p>
              <p className="text-xs text-dark-400">{user?.email}</p>
              <span className="inline-block mt-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary-500/20 text-primary-400">
                {user?.role}
              </span>
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-dark-300 mb-1.5">Full Name</label>
            <div className="relative">
              <HiOutlineUser className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-500" />
              <input value={name} onChange={(e) => setName(e.target.value)} className="input-glass pl-10" required />
            </div>
          </div>

          {/* Email (read-only) */}
          <div>
            <label className="block text-sm font-medium text-dark-300 mb-1.5">Email (cannot be changed)</label>
            <div className="relative">
              <HiOutlineMail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-500" />
              <input value={user?.email || ''} readOnly className="input-glass pl-10 opacity-50 cursor-not-allowed" />
            </div>
          </div>

          <button type="submit" disabled={savingProfile} className="btn-primary w-full py-3 cursor-pointer disabled:opacity-50">
            {savingProfile ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      ) : (
        <form onSubmit={handlePasswordChange} className="glass rounded-2xl p-6 sm:p-8 max-w-xl space-y-6">
          <div>
            <label className="block text-sm font-medium text-dark-300 mb-1.5">Current Password</label>
            <div className="relative">
              <HiOutlineLockClosed className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-500" />
              <input type={showPasswords ? 'text' : 'password'} value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)} className="input-glass pl-10 pr-10" required />
              <button type="button" onClick={() => setShowPasswords(!showPasswords)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-500 hover:text-dark-300 cursor-pointer">
                {showPasswords ? <HiOutlineEyeOff className="w-5 h-5" /> : <HiOutlineEye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-dark-300 mb-1.5">New Password</label>
            <div className="relative">
              <HiOutlineLockClosed className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-500" />
              <input type={showPasswords ? 'text' : 'password'} value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)} placeholder="Min. 6 characters"
                className="input-glass pl-10" required minLength={6} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-dark-300 mb-1.5">Confirm New Password</label>
            <div className="relative">
              <HiOutlineLockClosed className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-500" />
              <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                className="input-glass pl-10" required />
            </div>
          </div>

          <button type="submit" disabled={savingPassword} className="btn-primary w-full py-3 cursor-pointer disabled:opacity-50">
            {savingPassword ? 'Changing...' : 'Change Password'}
          </button>
        </form>
      )}
    </div>
  );
}
