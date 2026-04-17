import Link from 'next/link';
import { HiOutlineMail, HiOutlinePhone } from 'react-icons/hi';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaGithub } from 'react-icons/fa';

const footerLinks = {
  platform: [
    { label: 'Browse Ideas', href: '/ideas' },
    { label: 'Submit an Idea', href: '/dashboard/member/create' },
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'About Us', href: '/about' },
  ],
  resources: [
    { label: 'Blog', href: '/blog' },
    { label: 'FAQ', href: '/about' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'Newsletter', href: '/#newsletter' },
  ],
  legal: [
    { label: 'Terms of Use', href: '/terms' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Cookie Policy', href: '/cookies' },
  ],
};

const socialLinks = [
  { icon: FaFacebookF, href: '#', label: 'Facebook' },
  { icon: FaTwitter, href: '#', label: 'Twitter' },
  { icon: FaInstagram, href: '#', label: 'Instagram' },
  { icon: FaLinkedinIn, href: '#', label: 'LinkedIn' },
  { icon: FaGithub, href: '#', label: 'GitHub' },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/5 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center font-bold text-dark-900 dark:text-white text-xl shadow-lg">
                E
              </div>
              <span className="text-2xl font-bold font-[family-name:var(--font-heading)]">
                <span className="gradient-text">Eco</span>
                <span className="text-dark-900 dark:text-white">Spark</span>
              </span>
            </Link>
            <p className="text-dark-600 dark:text-dark-400 text-sm leading-relaxed max-w-sm mb-6">
              Empowering communities with sustainable ideas. Share, discover, and vote on
              eco-friendly projects that make a real impact on our planet.
            </p>
            <div className="space-y-2">
              <a href="mailto:contact@ecosparkhub.com" className="flex items-center gap-2 text-sm text-dark-600 dark:text-dark-400 hover:text-primary-400 transition-colors">
                <HiOutlineMail className="w-4 h-4" />
                contact@ecosparkhub.com
              </a>
              <a href="tel:+1234567890" className="flex items-center gap-2 text-sm text-dark-600 dark:text-dark-400 hover:text-primary-400 transition-colors">
                <HiOutlinePhone className="w-4 h-4" />
                +1 (234) 567-890
              </a>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h3 className="text-sm font-semibold text-dark-900 dark:text-white uppercase tracking-wider mb-4">Platform</h3>
            <ul className="space-y-3">
              {footerLinks.platform.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-dark-600 dark:text-dark-400 hover:text-primary-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold text-dark-900 dark:text-white uppercase tracking-wider mb-4">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-dark-600 dark:text-dark-400 hover:text-primary-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-dark-900 dark:text-white uppercase tracking-wider mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-dark-600 dark:text-dark-400 hover:text-primary-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-dark-500">
            © {new Date().getFullYear()} EcoSpark Hub. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="w-9 h-9 rounded-lg glass-light flex items-center justify-center text-dark-600 dark:text-dark-400 hover:text-primary-400 hover:border-primary-500/30 transition-all"
              >
                <social.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
