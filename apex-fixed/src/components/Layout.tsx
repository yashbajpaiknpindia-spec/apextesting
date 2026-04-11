import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, 
  X, 
  ArrowRight, 
  MessageSquare, 
  Phone, 
  Mail, 
  Linkedin, 
  Facebook, 
  Instagram, 
  Target,
  Zap
} from 'lucide-react';
import { cn } from '../lib/utils';

const BUSINESS = {
  phone: '+91 9839600646',
  whatsapp: 'https://wa.me/919839600646',
  email: 'business@theblackapexconsultancy.in',
  linkedin: 'https://www.linkedin.com/company/the-black-apex-consultancy/',
  facebook: 'https://www.facebook.com/share/1CW5ZXtsXc/',
  instagram: 'https://www.instagram.com/theblackapexconsultancy?igsh=emJrNDdiM2IycWJr',
  additionalPhones: ['+91 630749 6463', '+91 94513 68275']
};

const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'Solutions', href: '/solutions' },
  { name: 'About', href: '/about' },
  { name: 'Founder', href: '/founder' },
  { name: 'Insights', href: '/insights' },
  { name: 'Case Studies', href: '/case-studies' },
  { name: 'Contact', href: '/contact' },
];

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const hasAnimated = useRef(false);
  const location = useLocation();

  // Mark as animated after first mount — ref, not state, so no re-render
  useEffect(() => {
    hasAnimated.current = true;
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen selection:bg-brand-gold selection:text-brand-black bg-brand-black text-brand-white">
      {/* Navigation */}
      <nav className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-500 h-[72px] px-6 md:px-12 flex items-center justify-between",
        scrolled ? "bg-brand-black/95 backdrop-blur-md border-b border-brand-divider" : "bg-transparent"
      )}>
        <Link to="/" className="text-xl md:text-2xl font-serif tracking-[0.3em] text-brand-white">
          THE BLACK <span className="text-brand-gold">APEX</span>
        </Link>

        <div className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <Link 
              key={link.name} 
              to={link.href} 
              className={cn(
                "text-[10px] uppercase tracking-[0.3em] transition-colors relative group",
                location.pathname === link.href || location.pathname.startsWith(link.href + "/") ? "text-brand-gold" : "text-brand-white/70 hover:text-brand-gold"
              )}
            >
              {link.name}
              <span className={cn(
                "absolute -bottom-1 left-0 h-px bg-brand-gold transition-all duration-300",
                location.pathname === link.href || location.pathname.startsWith(link.href + "/") ? "w-full" : "w-0 group-hover:w-full"
              )} />
            </Link>
          ))}
          <a 
            href={BUSINESS.whatsapp} 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-6 py-2 border border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-brand-black transition-all duration-300 text-[10px] uppercase tracking-[0.2em] font-semibold"
          >
            Inquire
          </a>
        </div>

        <button className="md:hidden text-brand-white" onClick={() => setIsMenuOpen(true)}>
          <Menu className="w-6 h-6" />
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[110] bg-brand-black flex flex-col p-8"
          >
            <div className="flex justify-end mb-12">
              <button onClick={() => setIsMenuOpen(false)}>
                <X className="w-8 h-8 text-brand-gold" />
              </button>
            </div>
            <div className="flex flex-col gap-8">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                >
                  <Link 
                    to={link.href} 
                    className={cn(
                      "text-2xl font-serif tracking-widest transition-colors",
                      location.pathname === link.href || location.pathname.startsWith(link.href + "/") ? "text-brand-gold" : "text-brand-white hover:text-brand-gold"
                    )}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Growth Chart Animation in Menu */}
            <div className="my-16 flex items-end justify-between h-32 gap-2 px-4">
              {[40, 60, 45, 75, 65, 90, 80, 100].map((height, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: `${height}%`, opacity: 1 }}
                  transition={{ delay: 0.5 + i * 0.08, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  className="flex-1 bg-gradient-to-t from-brand-gold/5 to-brand-gold/40 border-t border-brand-gold/60 rounded-t-sm"
                />
              ))}
            </div>

            <div className="mt-auto flex flex-col gap-4">
              <a 
                href={BUSINESS.whatsapp} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-brand-gold text-brand-black py-4 uppercase tracking-[0.2em] text-xs font-semibold text-center"
              >
                WhatsApp Us
              </a>
              <div className="flex gap-6 justify-center mt-8">
                <a href={BUSINESS.linkedin} target="_blank" rel="noopener noreferrer" className="text-brand-white/50 hover:text-brand-gold"><Linkedin /></a>
                <a href={BUSINESS.instagram} target="_blank" rel="noopener noreferrer" className="text-brand-white/50 hover:text-brand-gold"><Instagram /></a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="md:pb-0 pb-28">{children}</main>

      {/* Footer */}
      <footer className="pt-16 pb-8 px-6 md:px-12 bg-brand-black border-t border-brand-divider">
        <div className="max-w-7xl mx-auto">
          {/* 3-column grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">

            {/* Column 1 — Brand */}
            <div>
              <div className="text-xl font-serif tracking-[0.3em] text-brand-white mb-3">
                THE BLACK <span className="text-brand-gold">APEX</span>
              </div>
              <p className="text-brand-white/40 text-xs leading-relaxed mb-6">
                Architecting businesses that scale.
              </p>
              <div className="flex items-center gap-5">
                <a href={BUSINESS.linkedin} target="_blank" rel="noopener noreferrer" className="text-brand-white/40 hover:text-brand-gold transition-colors"><Linkedin className="w-4 h-4" /></a>
                <a href={BUSINESS.instagram} target="_blank" rel="noopener noreferrer" className="text-brand-white/40 hover:text-brand-gold transition-colors"><Instagram className="w-4 h-4" /></a>
                <a href={BUSINESS.facebook} target="_blank" rel="noopener noreferrer" className="text-brand-white/40 hover:text-brand-gold transition-colors"><Facebook className="w-4 h-4" /></a>
              </div>
            </div>

            {/* Column 2 — Navigation */}
            <div>
              <p className="text-[9px] uppercase tracking-widest text-brand-white/30 mb-5">Navigate</p>
              <div className="flex flex-col gap-3">
                {NAV_LINKS.map(link => (
                  <Link key={link.name} to={link.href} className="text-[10px] uppercase tracking-widest text-brand-white/50 hover:text-brand-gold transition-colors w-fit">
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Column 3 — Contact */}
            <div>
              <p className="text-[9px] uppercase tracking-widest text-brand-white/30 mb-5">Get In Touch</p>
              <div className="flex flex-col gap-3">
                <a href={`tel:${BUSINESS.phone.replace(/\s/g, '')}`} className="text-brand-white/50 hover:text-brand-gold transition-colors text-xs">
                  {BUSINESS.phone}
                </a>
                <a href={`mailto:${BUSINESS.email}`} className="text-brand-white/50 hover:text-brand-gold transition-colors text-xs break-all">
                  {BUSINESS.email}
                </a>
                <p className="text-brand-white/30 text-xs">Kanpur, Uttar Pradesh, India</p>
              </div>
            </div>

          </div>

          {/* Bottom bar */}
          <div className="mt-12 pt-6 border-t border-brand-divider flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-[10px] uppercase tracking-widest text-brand-white/20">
              © 2026 The Black Apex Consultancy
            </p>
            <p className="text-[10px] uppercase tracking-widest text-brand-white/20">
              All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Bottom Navigation Menu (Mobile) */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] w-[92%] max-w-md md:hidden">
        <motion.div 
          key="bottom-nav"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, type: 'spring', damping: 28, stiffness: 200 }}
          className="bg-brand-black/90 backdrop-blur-xl border border-brand-gold/20 rounded-full py-2 px-1 flex items-center justify-around shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
        >
          <Link 
            to="/" 
            className="flex flex-col items-center gap-1 w-16 text-brand-white/60 hover:text-brand-gold transition-colors group"
          >
            <Target className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="text-[8px] uppercase tracking-widest font-medium">Home</span>
          </Link>
          
          <a 
            href={BUSINESS.whatsapp} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-1 w-16 text-[#25D366] hover:scale-110 transition-transform group"
          >
            <MessageSquare className="w-5 h-5" />
            <span className="text-[8px] uppercase tracking-widest text-brand-white/60 font-medium">Chat</span>
          </a>

          <div className="relative -mt-10">
            <Link 
              to="/contact"
              className="w-14 h-14 bg-brand-gold rounded-full flex items-center justify-center shadow-lg shadow-brand-gold/30 hover:scale-110 transition-transform cursor-pointer group border-4 border-brand-black"
            >
              <Zap className="w-7 h-7 text-brand-black fill-brand-black" />
            </Link>
          </div>

          <a 
            href={`tel:${BUSINESS.phone.replace(/\s/g, '')}`} 
            className="flex flex-col items-center gap-1 w-16 text-brand-gold hover:scale-110 transition-transform group"
          >
            <Phone className="w-5 h-5" />
            <span className="text-[8px] uppercase tracking-widest text-brand-white/60 font-medium">Call</span>
          </a>

          <Link 
            to="/contact" 
            className="flex flex-col items-center gap-1 w-16 text-brand-white/60 hover:text-brand-gold transition-colors group"
          >
            <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="text-[8px] uppercase tracking-widest font-medium">Email</span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};
