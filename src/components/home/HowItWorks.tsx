'use client';

import { motion } from 'framer-motion';
import { HiOutlineLightBulb, HiOutlineClipboardCheck, HiOutlineThumbUp, HiOutlineSparkles } from 'react-icons/hi';
import Image from 'next/image';

const steps = [
  {
    icon: HiOutlineLightBulb,
    step: '01',
    title: 'Share Your Idea',
    desc: 'Submit your sustainability concept with a clear problem statement, proposed solution, and supporting images.',
    image: 'https://images.unsplash.com/photo-1456948927036-ad533e532652',
  },
  {
    icon: HiOutlineClipboardCheck,
    step: '02',
    title: 'Admin Reviews',
    desc: 'Our team reviews your submission to ensure quality and alignment with sustainability goals.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40',
  },
  {
    icon: HiOutlineThumbUp,
    step: '03',
    title: 'Community Votes',
    desc: 'Once approved, fellow members upvote and downvote — the best ideas rise to the top.',
    image: 'https://images.unsplash.com/photo-1529156069898-49953eb1b5ce',
  },
  {
    icon: HiOutlineSparkles,
    step: '04',
    title: 'Make an Impact',
    desc: 'Top-voted ideas gain visibility, attract collaborators, and move toward real-world implementation.',
    image: 'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f',
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
          <h2 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-heading)] text-dark-900 dark:text-white mt-2 mb-4">
            How It Works
          </h2>
          <p className="text-dark-600 dark:text-dark-400 max-w-xl mx-auto">
            From idea to impact in four simple steps. Anyone can contribute to a greener future.
          </p>
        </motion.div>

        <div className="flex flex-col gap-24 lg:gap-32">
          {steps.map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7 }}
              className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-20`}
            >
              {/* Text Content */}
              <div className="lg:w-1/2 flex flex-col items-start text-left">
                <span className="text-7xl font-black text-primary-500/10 mb-4 font-[family-name:var(--font-heading)] drop-shadow-sm">{item.step}</span>
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center gradient-primary mb-6 shadow-lg shadow-primary-500/30">
                  <item.icon className="w-8 h-8 text-dark-900 dark:text-white" />
                </div>
                <h3 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-heading)] text-dark-900 dark:text-white mb-4 leading-tight">{item.title}</h3>
                <p className="text-lg text-dark-600 dark:text-dark-400 leading-relaxed max-w-lg">{item.desc}</p>
              </div>

              {/* Image Block */}
              <div className="lg:w-1/2 w-full">
                <div className="relative w-full aspect-[4/3] rounded-[2rem] overflow-hidden glass p-3 border border-primary-500/20 shadow-2xl">
                  <div className="relative w-full h-full rounded-[1.5rem] overflow-hidden">
                    <Image 
                      src={item.image} 
                      alt={item.title} 
                      fill 
                      className="object-cover hover:scale-105 transition-transform duration-1000" 
                      sizes="(max-width: 1024px) 100vw, 50vw" 
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
