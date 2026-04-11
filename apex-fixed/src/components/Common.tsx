import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { cn } from '../lib/utils';

export const SectionHeading = ({ title, subtitle, light = false }: { title: string, subtitle?: string, light?: boolean }) => (
  <div className="mb-12 md:mb-16 text-center">
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={cn("text-2xl sm:text-3xl md:text-4xl font-serif mb-4 leading-[1.1]", light ? "text-brand-black" : "text-brand-white")}
    >
      {title}
    </motion.h2>
    <motion.div 
      initial={{ width: 0 }}
      whileInView={{ width: 80 }}
      viewport={{ once: true }}
      className="h-px bg-brand-gold mx-auto mb-6"
    />
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className={cn("max-w-2xl mx-auto uppercase tracking-widest text-xs", light ? "text-brand-black/60" : "text-brand-white/60")}
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);

export const Button = ({ 
  children, 
  variant = 'primary', 
  className, 
  href, 
  onClick,
  type = 'button'
}: { 
  children: React.ReactNode, 
  variant?: 'primary' | 'secondary' | 'outline', 
  className?: string,
  href?: string,
  onClick?: () => void,
  type?: 'button' | 'submit' | 'reset'
}) => {
  const baseStyles = "px-8 py-4 uppercase tracking-[0.2em] text-xs font-semibold transition-all duration-300 flex items-center justify-center gap-2 group";
  const variants = {
    primary: "bg-brand-gold text-brand-black hover:bg-brand-gold-soft",
    secondary: "bg-brand-rich-black text-brand-white hover:bg-brand-divider border border-brand-divider",
    outline: "border border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-brand-black"
  };

  const content = (
    <>
      {children}
      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
    </>
  );

  if (href) {
    if (href.startsWith('http') || href.startsWith('tel:') || href.startsWith('mailto:')) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={cn(baseStyles, variants[variant], className)}>
          {content}
        </a>
      );
    }
  }

  return (
    <button type={type} onClick={onClick} className={cn(baseStyles, variants[variant], className)}>
      {content}
    </button>
  );
};
