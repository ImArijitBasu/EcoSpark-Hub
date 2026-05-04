'use client';

import { motion } from 'framer-motion';
import { HiOutlineLightBulb, HiOutlineUserGroup, HiOutlineGlobeAlt, HiOutlineSparkles } from 'react-icons/hi';
import { useEffect, useState } from 'react';

const stats = [
  {
    id: 1,
    name: 'Innovative Ideas',
    value: 450,
    suffix: '+',
    icon: HiOutlineLightBulb,
    color: 'text-primary-500',
    bg: 'bg-primary-500/10',
  },
  {
    id: 2,
    name: 'Active Members',
    value: 1200,
    suffix: '+',
    icon: HiOutlineUserGroup,
    color: 'text-accent-500',
    bg: 'bg-accent-500/10',
  },
  {
    id: 3,
    name: 'Green Categories',
    value: 15,
    suffix: '',
    icon: HiOutlineGlobeAlt,
    color: 'text-primary-400',
    bg: 'bg-primary-400/10',
  },
  {
    id: 4,
    name: 'Impact Projects',
    value: 85,
    suffix: '+',
    icon: HiOutlineSparkles,
    color: 'text-accent-400',
    bg: 'bg-accent-400/10',
  },
];

export default function StatsCounter() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="py-24 relative overflow-hidden bg-white dark:bg-dark-900 border-t border-dark-100 dark:border-white/5">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary-500/50 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-light border border-dark-200 dark:border-white/10 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-accent-500 animate-pulse" />
            <span className="text-sm font-medium text-dark-800 dark:text-dark-200 uppercase tracking-wider">Our Impact</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-heading)] text-dark-900 dark:text-white mb-6"
          >
            Growing the <span className="gradient-text">Movement</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ delay: 0.2 }}
            className="text-lg text-dark-600 dark:text-dark-400"
          >
            Join a rapidly expanding community dedicated to creating actionable, sustainable solutions for the modern world.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass rounded-3xl p-8 text-center relative group hover:-translate-y-2 transition-all duration-300 border border-dark-200 dark:border-white/10 hover:border-primary-500/50 dark:hover:border-primary-500/50"
              >
                <div className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 ${stat.bg} ${stat.color}`}>
                  <Icon className="w-8 h-8" />
                </div>
                
                {mounted ? (
                  <div className="flex items-end justify-center gap-1 mb-2">
                    <Counter from={0} to={stat.value} duration={2} />
                    <span className="text-3xl md:text-4xl font-bold text-dark-900 dark:text-white font-[family-name:var(--font-heading)]">
                      {stat.suffix}
                    </span>
                  </div>
                ) : (
                  <div className="text-4xl font-bold text-dark-900 dark:text-white font-[family-name:var(--font-heading)] mb-2">
                    0{stat.suffix}
                  </div>
                )}
                
                <h3 className="text-dark-600 dark:text-dark-400 font-medium">{stat.name}</h3>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Simple counter animation component
function Counter({ from, to, duration }: { from: number; to: number; duration: number }) {
  const [count, setCount] = useState(from);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      
      // Easing function (easeOutExpo)
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      setCount(Math.floor(easeProgress * (to - from) + from));
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [from, to, duration]);

  return <span className="text-4xl md:text-5xl font-bold text-dark-900 dark:text-white font-[family-name:var(--font-heading)]">{count}</span>;
}
