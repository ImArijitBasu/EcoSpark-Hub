'use client';

import { motion } from 'framer-motion';

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen py-16 lg:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-heading)] text-dark-900 dark:text-white mb-6">
            Cookie Policy
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
            <h2 className="text-2xl font-bold text-dark-900 dark:text-white mb-4">1. What are cookies?</h2>
            <p className="text-dark-600 dark:text-dark-300 leading-relaxed mb-4">
              Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-dark-900 dark:text-white mb-4">2. Why do we use cookies?</h2>
            <p className="text-dark-600 dark:text-dark-300 leading-relaxed mb-4">
              We use first-party and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our Website to operate, and we refer to these as "essential" or "strictly necessary" cookies. Other cookies also enable us to track and target the interests of our users to enhance the experience on our Online Properties.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-dark-900 dark:text-white mb-4">3. Types of cookies we use</h2>
            <ul className="list-disc pl-6 text-dark-600 dark:text-dark-300 space-y-2">
              <li><strong>Essential Cookies:</strong> These cookies are strictly necessary to provide you with services available through our Website and to use some of its features, such as access to secure areas.</li>
              <li><strong>Performance and Functionality Cookies:</strong> These cookies are used to enhance the performance and functionality of our Website but are non-essential to their use.</li>
              <li><strong>Analytics and Customization Cookies:</strong> These cookies collect information that is used either in aggregate form to help us understand how our Website is being used or how effective our marketing campaigns are.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-dark-900 dark:text-white mb-4">4. How can I control cookies?</h2>
            <p className="text-dark-600 dark:text-dark-300 leading-relaxed mb-4">
              You have the right to decide whether to accept or reject cookies. You can exercise your cookie rights by setting your preferences in the Cookie Consent Manager. The Cookie Consent Manager allows you to select which categories of cookies you accept or reject. Essential cookies cannot be rejected as they are strictly necessary to provide you with services.
            </p>
          </section>
        </motion.div>
      </div>
    </div>
  );
}
