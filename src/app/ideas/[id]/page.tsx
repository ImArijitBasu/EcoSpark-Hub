'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import api from '@/lib/api';
import { Idea, Comment, Vote } from '@/types';
import { formatDate } from '@/lib/utils';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import {
  HiOutlineThumbUp, HiOutlineThumbDown, HiOutlineChatAlt2,
  HiOutlineCalendar, HiOutlineUser, HiOutlineLockClosed,
  HiOutlineArrowLeft
} from 'react-icons/hi';
import Link from 'next/link';

export default function IdeaDetailPage() {
  const { id } = useParams();
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  const [idea, setIdea] = useState<Idea | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [userVote, setUserVote] = useState<Vote | null>(null);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState('');
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [submittingComment, setSubmittingComment] = useState(false);

  useEffect(() => {
    if (id) {
      fetchIdea();
      fetchComments();
      if (isAuthenticated) fetchUserVote();
    }
  }, [id, isAuthenticated]);

  const fetchIdea = async () => {
    try {
      const res = await api.get(`/ideas/${id}`);
      setIdea(res.data.data);
    } catch {
      toast.error('Idea not found');
      router.push('/ideas');
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      const res = await api.get(`/ideas/${id}/comments`);
      setComments(res.data.data);
    } catch { /* ignore */ }
  };

  const fetchUserVote = async () => {
    try {
      const res = await api.get(`/ideas/${id}/votes/me`);
      setUserVote(res.data.data);
    } catch { /* ignore */ }
  };

  const handleVote = async (type: 'UPVOTE' | 'DOWNVOTE') => {
    if (!isAuthenticated) {
      toast.error('Please login to vote');
      router.push('/login');
      return;
    }
    try {
      const res = await api.post(`/ideas/${id}/votes`, { type });
      toast.success(`Vote ${res.data.data.action}`);
      fetchIdea();
      fetchUserVote();
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to vote');
    }
  };

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error('Please login to comment');
      return;
    }
    if (!commentText.trim()) return;

    setSubmittingComment(true);
    try {
      await api.post(`/ideas/${id}/comments`, { content: commentText });
      toast.success('Comment added');
      setCommentText('');
      fetchComments();
      fetchIdea();
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to add comment');
    } finally {
      setSubmittingComment(false);
    }
  };

  const handleReply = async (parentId: string) => {
    if (!replyText.trim()) return;
    setSubmittingComment(true);
    try {
      await api.post(`/ideas/${id}/comments`, { content: replyText, parentId });
      toast.success('Reply added');
      setReplyText('');
      setReplyTo(null);
      fetchComments();
      fetchIdea();
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to reply');
    } finally {
      setSubmittingComment(false);
    }
  };

  const handlePayment = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to purchase');
      router.push('/login');
      return;
    }
    try {
      const res = await api.post('/payments/create-checkout-session', { ideaId: id });
      window.location.href = res.data.data.url;
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Payment failed');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-3 border-primary-500/30 border-t-primary-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!idea) return null;

  const isPaidLocked = idea.isPaid && !idea.hasPaid && idea.authorId !== user?.id && user?.role !== 'ADMIN';

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link href="/ideas" className="inline-flex items-center gap-1 text-dark-400 hover:text-primary-400 text-sm mb-6 transition-colors">
          <HiOutlineArrowLeft className="w-4 h-4" /> Back to Ideas
        </Link>

        <motion.article initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-3xl overflow-hidden">
          {/* Images */}
          {idea.images.length > 0 && (
            <div className="relative h-64 sm:h-80 overflow-hidden">
              <img src={idea.images[0]} alt={idea.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 to-transparent" />
            </div>
          )}

          <div className="p-6 sm:p-8">
            {/* Header */}
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary-500/20 text-primary-400 border border-primary-500/20">
                {idea.category.name}
              </span>
              {idea.isPaid && (
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-accent-500/20 text-accent-400 border border-accent-500/20">
                  💎 Premium — ${idea.price}
                </span>
              )}
              {!idea.isPaid && (
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/20">
                  Free
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-heading)] text-white mb-4">
              {idea.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-dark-400 mb-8">
              <div className="flex items-center gap-2">
                <HiOutlineUser className="w-4 h-4" />
                {idea.author.name}
              </div>
              <div className="flex items-center gap-2">
                <HiOutlineCalendar className="w-4 h-4" />
                {formatDate(idea.createdAt)}
              </div>
            </div>

            {/* Paid Lock Gate */}
            {isPaidLocked ? (
              <div className="text-center py-12 relative overflow-hidden rounded-2xl glass-light">
                <HiOutlineLockClosed className="w-16 h-16 text-dark-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Premium Content</h3>
                <p className="text-dark-400 mb-6 max-w-sm mx-auto">
                  This idea requires a one-time payment of <span className="text-accent-400 font-semibold">${idea.price}</span> to access.
                </p>
                <button onClick={handlePayment} className="btn-primary px-8 py-3 text-base cursor-pointer">
                  Pay ${idea.price} to Unlock
                </button>
              </div>
            ) : (
              <>
                {/* Full Content */}
                <div className="space-y-8 mb-8">
                  <div>
                    <h2 className="text-lg font-semibold text-primary-400 mb-2">Problem Statement</h2>
                    <p className="text-dark-300 leading-relaxed whitespace-pre-wrap">{idea.problemStatement}</p>
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-primary-400 mb-2">Proposed Solution</h2>
                    <p className="text-dark-300 leading-relaxed whitespace-pre-wrap">{idea.proposedSolution}</p>
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-primary-400 mb-2">Description</h2>
                    <p className="text-dark-300 leading-relaxed whitespace-pre-wrap">{idea.description}</p>
                  </div>
                </div>

                {/* Extra Images */}
                {idea.images.length > 1 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
                    {idea.images.slice(1).map((img, i) => (
                      <img key={i} src={img} alt={`${idea.title} ${i + 2}`} className="rounded-xl w-full h-32 object-cover" />
                    ))}
                  </div>
                )}
              </>
            )}

            {/* Voting */}
            <div className="flex items-center gap-4 py-6 border-t border-white/5">
              <button
                onClick={() => handleVote('UPVOTE')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all cursor-pointer ${
                  userVote?.type === 'UPVOTE' ? 'bg-primary-500/20 text-primary-400 border border-primary-500/30' : 'glass-light text-dark-400 hover:text-primary-400'
                }`}
              >
                <HiOutlineThumbUp className="w-5 h-5" />
                <span className="font-semibold">{idea.upvoteCount}</span>
              </button>
              <button
                onClick={() => handleVote('DOWNVOTE')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all cursor-pointer ${
                  userVote?.type === 'DOWNVOTE' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'glass-light text-dark-400 hover:text-red-400'
                }`}
              >
                <HiOutlineThumbDown className="w-5 h-5" />
                <span className="font-semibold">{idea.downvoteCount}</span>
              </button>
              <div className="flex items-center gap-1 ml-auto text-dark-400">
                <HiOutlineChatAlt2 className="w-5 h-5" />
                <span>{idea.commentCount} comments</span>
              </div>
            </div>
          </div>
        </motion.article>

        {/* Comments Section */}
        <div className="mt-8">
          <h2 className="text-xl font-bold text-white mb-6">Comments</h2>

          {isAuthenticated && (
            <form onSubmit={handleComment} className="mb-8">
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Share your thoughts..."
                rows={3}
                className="input-glass w-full resize-none mb-3"
              />
              <button type="submit" disabled={submittingComment} className="btn-primary px-6 cursor-pointer disabled:opacity-50">
                {submittingComment ? 'Posting...' : 'Post Comment'}
              </button>
            </form>
          )}

          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="glass rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-white text-xs font-bold">
                    {comment.user.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{comment.user.name}</p>
                    <p className="text-xs text-dark-500">{formatDate(comment.createdAt)}</p>
                  </div>
                </div>
                <p className="text-sm text-dark-300 ml-10">{comment.content}</p>

                {isAuthenticated && (
                  <button onClick={() => setReplyTo(replyTo === comment.id ? null : comment.id)} className="text-xs text-primary-400 hover:text-primary-300 mt-2 ml-10 cursor-pointer">
                    Reply
                  </button>
                )}

                {replyTo === comment.id && (
                  <div className="ml-10 mt-3 flex gap-2">
                    <input value={replyText} onChange={(e) => setReplyText(e.target.value)} placeholder="Write a reply..." className="input-glass flex-1 text-sm py-2" />
                    <button onClick={() => handleReply(comment.id)} disabled={submittingComment} className="btn-primary text-sm px-4 cursor-pointer">Reply</button>
                  </div>
                )}

                {/* Nested Replies */}
                {comment.replies && comment.replies.length > 0 && (
                  <div className="ml-10 mt-4 space-y-3 pl-4 border-l-2 border-primary-500/20">
                    {comment.replies.map((reply) => (
                      <div key={reply.id}>
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-6 h-6 rounded-full gradient-primary flex items-center justify-center text-white text-[10px] font-bold">
                            {reply.user.name.charAt(0)}
                          </div>
                          <p className="text-xs font-medium text-dark-200">{reply.user.name}</p>
                          <p className="text-xs text-dark-500">{formatDate(reply.createdAt)}</p>
                        </div>
                        <p className="text-sm text-dark-400 ml-8">{reply.content}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {comments.length === 0 && (
              <p className="text-center text-dark-500 py-8">No comments yet. Be the first to share your thoughts!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
