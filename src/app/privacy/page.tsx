'use client';

import { motion } from 'framer-motion';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen py-16 lg:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-heading)] text-dark-900 dark:text-white mb-6">
            Privacy Policy
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
            <h2 className="text-2xl font-bold text-dark-900 dark:text-white mb-4">1. Introduction</h2>
            <p className="text-dark-600 dark:text-dark-300 leading-relaxed mb-4">
              Welcome to EcoSpark Hub. We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about this privacy notice or our practices with regard to your personal information, please contact us.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-dark-900 dark:text-white mb-4">2. Information We Collect</h2>
            <p className="text-dark-600 dark:text-dark-300 leading-relaxed mb-4">
              We collect personal information that you voluntarily provide to us when you register on the Website, express an interest in obtaining information about us or our products and Services, when you participate in activities on the Website, or otherwise when you contact us.
            </p>
            <ul className="list-disc pl-6 text-dark-600 dark:text-dark-300 space-y-2">
              <li><strong>Personal Information:</strong> Names, email addresses, passwords, and contact preferences.</li>
              <li><strong>Credentials:</strong> Passwords, password hints, and similar security information used for authentication and account access.</li>
              <li><strong>Social Media Login Data:</strong> We may provide you with the option to register using social media account details, like Google.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-dark-900 dark:text-white mb-4">3. How We Use Your Information</h2>
            <p className="text-dark-600 dark:text-dark-300 leading-relaxed mb-4">
              We use personal information collected via our Website for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-dark-900 dark:text-white mb-4">4. Cookies and Tracking Technologies</h2>
            <p className="text-dark-600 dark:text-dark-300 leading-relaxed mb-4">
              We may use cookies and similar tracking technologies (like web beacons and pixels) to access or store information. Specific information about how we use such technologies and how you can refuse certain cookies is set out in our Cookie Notice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-dark-900 dark:text-white mb-4">5. Contact Us</h2>
            <p className="text-dark-600 dark:text-dark-300 leading-relaxed mb-4">
              If you have questions or comments about this notice, you may email us at privacy@ecosparkhub.com or contact us via our Contact page.
            </p>
          </section>
        </motion.div>
      </div>
    </div>
  );
}
