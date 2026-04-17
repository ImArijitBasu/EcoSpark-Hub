'use client';

import { motion } from 'framer-motion';
import { HiOutlineLightBulb, HiOutlineClipboardCheck, HiOutlineThumbUp, HiOutlineSparkles } from 'react-icons/hi';

const steps = [
  {
    icon: HiOutlineLightBulb,
    step: '01',
    title: 'Share Your Idea',
    desc: 'Submit your sustainability concept with a clear problem statement, proposed solution, and supporting images.',
  },
  {
    icon: HiOutlineClipboardCheck,
    step: '02',
    title: 'Admin Reviews',
    desc: 'Our team reviews your submission to ensure quality and alignment with sustainability goals.',
  },
  {
    icon: HiOutlineThumbUp,
    step: '03',
    title: 'Community Votes',
    desc: 'Once approved, fellow members upvote and downvote — the best ideas rise to the top.',
  },
  {
    icon: HiOutlineSparkles,
    step: '04',
    title: 'Make an Impact',
    desc: 'Top-voted ideas gain visibility, attract collaborators, and move toward real-world implementation.',
  },
];

export default function HowItWorks() {
  return (
    <section className="py-28 lg:py-40 relative overflow-hidden">
      {/* Subtle glow */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary-400 text-sm font-semibold uppercase tracking-wider">Simple Process</span>
          <h2 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-heading)] text-white mt-2 mb-4">
            How It Works
          </h2>
          <p className="text-dark-400 max-w-xl mx-auto">
            From idea to impact in four simple steps. Anyone can contribute to a greener future.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12 }}
              className="relative group"
            >
              <div className="glass rounded-2xl p-6 h-full card-hover text-center">
                {/* Step Number */}
                <span className="text-5xl font-extrabold text-primary-500/10 absolute top-3 right-4 font-[family-name:var(--font-heading)]">
                  {item.step}
                </span>

                <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-5 group-hover:animate-pulse-glow transition-all">
                  <item.icon className="w-7 h-7 text-white" />
                </div>

                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-dark-400 leading-relaxed">{item.desc}</p>
              </div>

              {/* Connector line (hidden on last and mobile) */}
              {index < 3 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 border-t-2 border-dashed border-primary-500/20" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
