'use client';

import { motion } from 'framer-motion';
import { HiOutlineGlobe, HiOutlineShieldCheck, HiOutlineLightBulb, HiOutlineUsers } from 'react-icons/hi';

const values = [
  { icon: HiOutlineGlobe, title: 'Environmental Impact', desc: 'Every idea shared has the potential to reduce our carbon footprint and protect natural resources.' },
  { icon: HiOutlineLightBulb, title: 'Innovation First', desc: 'We believe in the power of creative thinking to solve the world\'s most pressing environmental challenges.' },
  { icon: HiOutlineUsers, title: 'Community Driven', desc: 'Our platform thrives on the collective wisdom and passion of our diverse community members.' },
  { icon: HiOutlineShieldCheck, title: 'Transparency', desc: 'Open voting, honest feedback, and transparent moderation ensure every voice is heard fairly.' },
];

const team = [
  { name: 'Arijit Basu', role: 'Creator & Lead Developer', bio: 'Passionate developer dedicated to building an interactive platform for a sustainable future.' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-20">
          <span className="text-primary-400 text-sm font-semibold uppercase tracking-wider">About EcoSpark Hub</span>
          <h1 className="text-4xl sm:text-5xl font-bold font-[family-name:var(--font-heading)] text-dark-900 dark:text-white mt-3 mb-6">
            Building a <span className="gradient-text">Greener Future</span> Together
          </h1>
          <p className="text-dark-600 dark:text-dark-400 max-w-2xl mx-auto text-lg leading-relaxed">
            EcoSpark Hub is a community-powered platform where passionate individuals share, discover, and
            vote on sustainable ideas that can make a real difference for our planet.
          </p>
        </motion.div>

        {/* Mission */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass rounded-3xl p-8 sm:p-12 mb-16 glow-emerald-sm">
          <h2 className="text-2xl font-bold text-dark-900 dark:text-white mb-4 font-[family-name:var(--font-heading)]">Our Mission</h2>
          <p className="text-dark-600 dark:text-dark-300 leading-relaxed text-lg">
            We empower communities worldwide to take actionable steps toward sustainability. By providing
            a platform where ideas are shared openly, evaluated democratically, and refined collaboratively,
            we accelerate the transition to a more sustainable world. Whether it&apos;s reducing plastic waste,
            launching a solar energy project, or rethinking urban transportation — every idea matters.
          </p>
        </motion.div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-dark-900 dark:text-white mb-8 text-center font-[family-name:var(--font-heading)]">Our Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((v, i) => (
              <motion.div key={v.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass rounded-2xl p-6">
                <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center mb-4">
                  <v.icon className="w-6 h-6 text-primary-400" />
                </div>
                <h3 className="text-lg font-semibold text-dark-900 dark:text-white mb-2">{v.title}</h3>
                <p className="text-sm text-dark-600 dark:text-dark-400 leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div>
          <h2 className="text-2xl font-bold text-dark-900 dark:text-white mb-8 text-center font-[family-name:var(--font-heading)]">Meet the Team</h2>
          <div className="flex justify-center">
            {team.map((member, i) => (
              <motion.div key={member.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass rounded-2xl p-8 text-center max-w-sm w-full shadow-lg">
                <div className="w-24 h-24 rounded-full gradient-primary flex items-center justify-center text-dark-900 dark:text-white text-3xl font-bold mx-auto mb-5">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h3 className="text-xl font-bold text-dark-900 dark:text-white">{member.name}</h3>
                <p className="text-base text-primary-400 font-medium mb-3">{member.role}</p>
                <p className="text-sm text-dark-600 dark:text-dark-400 leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
