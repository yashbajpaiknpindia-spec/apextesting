import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useSEO } from '../lib/useSEO';

export const NotFound = () => {
  useSEO({
    title: '404 — Page Not Found',
    description: 'The page you are looking for does not exist. Return to The Black Apex Consultancy homepage.',
    noIndex: true,
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-brand-black flex items-center justify-center px-6 pt-32 pb-24"
    >
      <div className="text-center max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Decorative number */}
          <div className="text-[160px] md:text-[220px] font-serif leading-none text-brand-gold/10 select-none mb-0">
            404
          </div>

          {/* Gold divider */}
          <div className="w-16 h-px bg-brand-gold mx-auto mb-8 -mt-6" />

          <span className="text-brand-gold text-[10px] uppercase tracking-[0.5em] mb-6 block">
            Page Not Found
          </span>

          <h1 className="text-3xl md:text-4xl font-serif text-brand-white mb-6 leading-tight">
            This Page Doesn't Exist
          </h1>

          <p className="text-brand-white/50 text-sm md:text-base leading-relaxed mb-12 max-w-md mx-auto">
            The page you're looking for may have been moved, deleted, or never existed.
            Let's get you back on track.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/"
              className="px-10 py-4 bg-brand-gold text-brand-black text-[11px] uppercase tracking-[0.3em] font-semibold hover:bg-brand-gold/90 transition-colors duration-300 w-full sm:w-auto text-center"
            >
              Return Home
            </Link>
            <Link
              to="/contact"
              className="px-10 py-4 border border-brand-gold text-brand-gold text-[11px] uppercase tracking-[0.3em] font-semibold hover:bg-brand-gold hover:text-brand-black transition-all duration-300 w-full sm:w-auto text-center"
            >
              Contact Us
            </Link>
          </div>

          {/* Quick nav links */}
          <div className="mt-16 flex flex-wrap justify-center gap-x-8 gap-y-3">
            {[
              { name: 'Solutions', href: '/solutions' },
              { name: 'About', href: '/about' },
              { name: 'Case Studies', href: '/case-studies' },
              { name: 'Insights', href: '/blog' },
            ].map(link => (
              <Link
                key={link.name}
                to={link.href}
                className="text-[10px] uppercase tracking-[0.3em] text-brand-white/30 hover:text-brand-gold transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
