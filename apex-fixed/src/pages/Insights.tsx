import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import { SectionHeading } from '../components/Common';
import { useSEO } from '../lib/useSEO';

const INSIGHTS_DATA = [
  { 
    title: 'Scaling Without Chaos', 
    date: 'March 15, 2026', 
    excerpt: 'How to maintain quality and culture while growing at 10x speeds.',
    image: '1460925895917-afdab827c52f'
  },
  { 
    title: 'Revenue Architecture Explained', 
    date: 'March 10, 2026', 
    excerpt: 'The hidden leaks in your pricing model that are costing you millions.',
    image: '1551288049-bebda4e38f71'
  },
  { 
    title: 'Why Most Startups Stall', 
    date: 'March 05, 2026', 
    excerpt: 'Identifying the structural bottlenecks that prevent the leap to mid-market.',
    image: '1507679799987-c73779587ccf'
  },
  { 
    title: 'The Founder Positioning Strategy', 
    date: 'February 28, 2026', 
    excerpt: 'Why your personal brand is the most valuable asset in your business.',
    image: '1519389950473-47ba0277781c'
  },
  { 
    title: 'Operational Audits: A Deep Dive', 
    date: 'February 20, 2026', 
    excerpt: 'How to diagnose the health of your business operations in 7 days.',
    image: '1551288049-bebda4e38f71'
  },
  { 
    title: 'The Future of High-Ticket Sales', 
    date: 'February 15, 2026', 
    excerpt: 'Why the traditional sales funnel is dead and what is replacing it.',
    image: '1551288049-bebda4e38f71'
  }
];

export const Insights = () => {
  useSEO({
    title: 'Insights — Business Strategy & Growth',
    description: 'Expert insights on business strategy, revenue growth, and operational excellence from The Black Apex Consultancy.',
    canonical: '/insights',
  });
  return (
    <div className="pt-32 pb-24 px-6 md:px-12 bg-brand-black">
      <div className="max-w-7xl mx-auto">
        <SectionHeading 
          title="Apex Insights" 
          subtitle="Strategic intelligence for the modern founder" 
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {INSIGHTS_DATA.map((post, idx) => (
            <motion.article 
              key={post.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="aspect-video bg-brand-divider mb-6 overflow-hidden">
                <img 
                  src={`https://images.unsplash.com/photo-${post.image}?auto=format&fit=crop&q=80&w=800`} 
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                />
              </div>
              <span className="text-brand-gold text-[10px] uppercase tracking-widest mb-3 block">{post.date}</span>
              <h3 className="text-xl font-serif text-brand-white mb-4 group-hover:text-brand-gold transition-colors">{post.title}</h3>
              <p className="text-brand-white/50 text-xs leading-relaxed mb-6">{post.excerpt}</p>
              <a href="#" className="text-brand-white text-[10px] uppercase tracking-[0.3em] flex items-center gap-2 group-hover:gap-4 transition-all">
                Read Article <ChevronRight className="w-3 h-3" />
              </a>
            </motion.article>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="mt-32 p-12 bg-brand-rich-black border border-brand-divider text-center max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-serif mb-6">Subscribe to the Apex Intelligence</h2>
          <p className="text-brand-white/60 text-sm mb-10 max-w-xl mx-auto">
            Get exclusive strategic insights delivered to your inbox once a month. No noise, just the signal.
          </p>
          <form className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-grow bg-brand-black border border-brand-divider p-4 text-brand-white focus:border-brand-gold outline-none transition-colors"
              required
            />
            <button 
              type="submit" 
              className="bg-brand-gold text-brand-black px-8 py-4 uppercase tracking-[0.2em] text-xs font-semibold hover:bg-brand-gold-soft transition-all"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
