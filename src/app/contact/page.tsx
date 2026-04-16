'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker } from 'react-icons/hi';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Message sent! We\'ll get back to you soon.');
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <span className="text-primary-400 text-sm font-semibold uppercase tracking-wider">Get in Touch</span>
          <h1 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-heading)] text-white mt-2 mb-4">Contact Us</h1>
          <p className="text-dark-400 max-w-xl mx-auto">Have questions or suggestions? We&apos;d love to hear from you.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="space-y-4">
            {[
              { icon: HiOutlineMail, label: 'Email', value: 'contact@ecosparkhub.com' },
              { icon: HiOutlinePhone, label: 'Phone', value: '+1 (234) 567-890' },
              { icon: HiOutlineLocationMarker, label: 'Location', value: 'San Francisco, CA' },
            ].map((info) => (
              <div key={info.label} className="glass rounded-2xl p-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center shrink-0">
                  <info.icon className="w-6 h-6 text-primary-400" />
                </div>
                <div>
                  <p className="text-xs text-dark-500 uppercase tracking-wider">{info.label}</p>
                  <p className="text-sm font-medium text-white">{info.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            onSubmit={handleSubmit}
            className="lg:col-span-2 glass rounded-2xl p-6 sm:p-8 space-y-5"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-1.5">Name</label>
                <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="input-glass" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-1.5">Email</label>
                <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="input-glass" required />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-300 mb-1.5">Subject</label>
              <input value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} className="input-glass" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-300 mb-1.5">Message</label>
              <textarea value={form.message} onChange={e => setForm({...form, message: e.target.value})} rows={5} className="input-glass resize-none" required />
            </div>
            <button type="submit" className="btn-primary w-full py-3 cursor-pointer">Send Message</button>
          </motion.form>
        </div>
      </div>
    </div>
  );
}
