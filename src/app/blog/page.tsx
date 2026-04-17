'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { HiOutlineArrowRight, HiOutlineClock } from 'react-icons/hi';

const posts = [
  {
    title: '10 Simple Ways to Reduce Your Carbon Footprint Today',
    excerpt: 'Small changes in daily habits can lead to significant environmental impact. Here are 10 practical tips you can start implementing right now.',
    date: 'March 15, 2026',
    category: 'Tips',
    readTime: '5 min read',
  },
  {
    title: 'The Future of Renewable Energy: Trends to Watch in 2026',
    excerpt: 'From solar innovations to wind power breakthroughs, discover what\'s shaping the renewable energy landscape this year.',
    date: 'March 8, 2026',
    category: 'Energy',
    readTime: '8 min read',
  },
  {
    title: 'How Community Gardens Are Transforming Urban Spaces',
    excerpt: 'Urban agriculture is more than just growing food — it\'s about building resilient communities and greener cities.',
    date: 'February 28, 2026',
    category: 'Agriculture',
    readTime: '6 min read',
  },
  {
    title: 'Zero Waste Living: A Beginner\'s Complete Guide',
    excerpt: 'Transitioning to a zero-waste lifestyle doesn\'t have to be overwhelming. This guide breaks it down into manageable steps.',
    date: 'February 20, 2026',
    category: 'Waste',
    readTime: '10 min read',
  },
  {
    title: 'Electric Vehicles: Are They Really Better for the Environment?',
    excerpt: 'We dive deep into the lifecycle analysis of EVs versus traditional vehicles to find the truth about their environmental impact.',
    date: 'February 12, 2026',
    category: 'Transportation',
    readTime: '7 min read',
  },
  {
    title: 'Water Conservation Technologies That Are Changing the Game',
    excerpt: 'From smart irrigation to atmospheric water generators, these innovations are helping communities save water worldwide.',
    date: 'February 5, 2026',
    category: 'Water',
    readTime: '6 min read',
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <span className="text-primary-400 text-sm font-semibold uppercase tracking-wider">Our Blog</span>
          <h1 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-heading)] text-dark-900 dark:text-white mt-2 mb-4">
            Insights & Stories
          </h1>
          <p className="text-dark-600 dark:text-dark-400 max-w-xl">
            Latest articles on sustainability, eco-innovation, and community impact.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post, i) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="glass rounded-2xl p-6 card-hover group"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-primary-500/20 text-primary-400">
                  {post.category}
                </span>
                <span className="flex items-center gap-1 text-xs text-dark-500">
                  <HiOutlineClock className="w-3 h-3" />{post.readTime}
                </span>
              </div>
              <h2 className="text-lg font-semibold text-dark-900 dark:text-white mb-2 group-hover:text-primary-400 transition-colors line-clamp-2">
                {post.title}
              </h2>
              <p className="text-sm text-dark-600 dark:text-dark-400 mb-4 line-clamp-2">{post.excerpt}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-dark-500">{post.date}</span>
                <span className="text-sm text-primary-400 flex items-center gap-1 group-hover:gap-2 transition-all">
                  Read More <HiOutlineArrowRight className="w-3 h-3" />
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}
