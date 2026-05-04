'use client';

import { motion } from 'framer-motion';

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen py-16 lg:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-heading)] text-dark-900 dark:text-white mb-6">
            Terms of Service
          </h1>
          <p className="text-dark-600 dark:text-dark-400 text-lg">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-3xl p-8 md:p-12 prose dark:prose-invert max-w-none prose-headings:font-[family-name:var(--font-heading)] prose-a:text-primary-500"
        >
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-dark-900 dark:text-white mb-4">1. Agreement to Terms</h2>
            <p className="text-dark-600 dark:text-dark-300 leading-relaxed mb-4">
              By accessing or using EcoSpark Hub, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-dark-900 dark:text-white mb-4">2. Use License</h2>
            <p className="text-dark-600 dark:text-dark-300 leading-relaxed mb-4">
              Permission is granted to temporarily download one copy of the materials (information or software) on EcoSpark Hub's website for personal, non-commercial transitory viewing only.
            </p>
            <p className="text-dark-600 dark:text-dark-300 leading-relaxed mb-4">
              This license shall automatically terminate if you violate any of these restrictions and may be terminated by EcoSpark Hub at any time.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-dark-900 dark:text-white mb-4">3. User Contributions</h2>
            <p className="text-dark-600 dark:text-dark-300 leading-relaxed mb-4">
              Users may post, submit, publish, display, or transmit content and materials ("User Contributions") on or through the Website. All User Contributions must comply with the Content Standards set out in these Terms.
            </p>
            <p className="text-dark-600 dark:text-dark-300 leading-relaxed mb-4">
              By providing any User Contribution on the Website, you grant us and our affiliates and service providers the right to use, reproduce, modify, perform, display, distribute, and otherwise disclose to third parties any such material for any purpose.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-dark-900 dark:text-white mb-4">4. Disclaimer</h2>
            <p className="text-dark-600 dark:text-dark-300 leading-relaxed mb-4">
              The materials on EcoSpark Hub's website are provided on an 'as is' basis. EcoSpark Hub makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-dark-900 dark:text-white mb-4">5. Governing Law</h2>
            <p className="text-dark-600 dark:text-dark-300 leading-relaxed mb-4">
              These terms and conditions are governed by and construed in accordance with the laws of your jurisdiction, and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
            </p>
          </section>
        </motion.div>
      </div>
    </div>
  );
}
