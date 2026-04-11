import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import { SectionHeading } from '../components/Common';
import { useSEO } from '../lib/useSEO';
import { getImageSrc } from '../lib/utils';
import type { BlogPost } from '../lib/api';

// Static fallback data — shown only if DB is empty or unavailable
const STATIC_POSTS: BlogPost[] = [
  { id: '1', title: 'Scaling Without Chaos', slug: 'scaling-without-chaos', excerpt: 'How to maintain quality and culture while growing at 10x speeds.', coverImage: '1460925895917-afdab827c52f', createdAt: '2026-03-15T00:00:00Z', isStatic: true },
  { id: '2', title: 'Revenue Architecture Explained', slug: 'revenue-architecture-explained', excerpt: 'The hidden leaks in your pricing model that are costing you millions.', coverImage: '1551288049-bebda4e38f71', createdAt: '2026-03-10T00:00:00Z', isStatic: true },
  { id: '3', title: 'Why Most Startups Stall', slug: 'why-most-startups-stall', excerpt: 'Identifying the structural bottlenecks that prevent the leap to mid-market.', coverImage: '1507679799987-c73779587ccf', createdAt: '2026-03-05T00:00:00Z', isStatic: true },
  { id: '4', title: 'The Founder Positioning Strategy', slug: 'founder-positioning-strategy', excerpt: 'Why your personal brand is the most valuable asset in your business.', coverImage: '1519389950473-47ba0277781c', createdAt: '2026-02-28T00:00:00Z', isStatic: true },
  { id: '5', title: 'Operational Audits: A Deep Dive', slug: 'operational-audits-deep-dive', excerpt: 'How to diagnose the health of your business operations in 7 days.', coverImage: '1551288049-bebda4e38f71', createdAt: '2026-02-20T00:00:00Z', isStatic: true },
  { id: '6', title: 'The Future of High-Ticket Sales', slug: 'future-high-ticket-sales', excerpt: 'Why the traditional sales funnel is dead and what is replacing it.', coverImage: '1551288049-bebda4e38f71', createdAt: '2026-02-15T00:00:00Z', isStatic: true },
];

export const Blog = () => {
  useSEO({
    title: 'Insights & Articles — Business Strategy Blog',
    description: 'Expert insights on business strategy, revenue growth, and operational excellence from The Black Apex Consultancy.',
    canonical: '/blog',
  });

  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  // Newsletter state
  const [email, setEmail] = useState('');
  const [nlLoading, setNlLoading] = useState(false);
  const [nlSuccess, setNlSuccess] = useState(false);
  const [nlError, setNlError] = useState('');

  useEffect(() => {
    fetch('/api/blog')
      .then(r => r.json())
      .then((data: BlogPost[]) => {
        setPosts(data.length > 0 ? data : STATIC_POSTS);
        setLoading(false);
      })
      .catch(() => {
        setPosts(STATIC_POSTS);
        setLoading(false);
      });
  }, []);

  const handleSubscribe = async () => {
    setNlError('');
    if (!email.trim()) {
      setNlError('Please enter your email address.');
      return;
    }
    setNlLoading(true);
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });
      if (res.ok) {
        setNlSuccess(true);
      } else {
        setNlError('Something went wrong. Please try again.');
      }
    } catch {
      setNlError('Something went wrong. Please try again.');
    } finally {
      setNlLoading(false);
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 bg-brand-black">
      <div className="max-w-7xl mx-auto">
        <SectionHeading title="Apex Insights" subtitle="Strategic intelligence for the modern founder" />

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="animate-pulse">
                <div className="aspect-video bg-brand-divider mb-6" />
                <div className="h-3 bg-brand-divider mb-3 w-24" />
                <div className="h-5 bg-brand-divider mb-4" />
                <div className="h-3 bg-brand-divider mb-2" />
                <div className="h-3 bg-brand-divider w-3/4" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {posts.map((post, idx) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="aspect-video bg-brand-divider mb-6 overflow-hidden">
                  {getImageSrc(post.coverImage) ? (
                    <img
                      src={getImageSrc(post.coverImage)!}
                      alt={post.title}
                      className="w-full h-full object-cover grayscale group-hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full bg-brand-rich-black" />
                  )}
                </div>
                <span className="text-brand-gold text-[10px] uppercase tracking-widest mb-3 block">{formatDate(post.createdAt)}</span>
                <h3 className="text-xl font-serif text-brand-white mb-4 group-hover:text-brand-gold transition-colors">{post.title}</h3>
                <p className="text-brand-white/50 text-xs leading-relaxed mb-6">{post.excerpt}</p>
                {post.isStatic ? (
                  <span className="text-brand-white/30 text-[9px] uppercase tracking-widest">Full article coming soon</span>
                ) : (
                  <Link to={`/blog/${post.slug}`} className="text-brand-white text-[10px] uppercase tracking-[0.3em] flex items-center gap-2 group-hover:gap-4 transition-all">
                    Read Article <ChevronRight className="w-3 h-3" />
                  </Link>
                )}
              </motion.article>
            ))}
          </div>
        )}

        {/* Newsletter Signup */}
        <div className="mt-32 p-12 bg-brand-rich-black border border-brand-divider text-center max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-serif mb-6">Subscribe to the Apex Intelligence</h2>
          <p className="text-brand-white/60 text-sm mb-10 max-w-xl mx-auto">
            Get exclusive strategic insights delivered to your inbox once a month. No noise, just the signal.
          </p>
          {nlSuccess ? (
            <p className="text-brand-gold font-serif italic text-lg">
              You're on the list. Expect signal, not noise.
            </p>
          ) : (
            <>
              <div className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={e => { setEmail(e.target.value); setNlError(''); }}
                  onKeyDown={e => e.key === 'Enter' && handleSubscribe()}
                  placeholder="Your email address"
                  className="flex-grow bg-brand-black border border-brand-divider p-4 text-brand-white focus:border-brand-gold outline-none transition-colors"
                  disabled={nlLoading}
                />
                <button
                  onClick={handleSubscribe}
                  disabled={nlLoading}
                  className="bg-brand-gold text-brand-black px-8 py-4 uppercase tracking-[0.2em] text-xs font-semibold hover:bg-brand-gold-soft transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {nlLoading ? 'Subscribing...' : 'Subscribe'}
                </button>
              </div>
              {nlError && (
                <p className="mt-3 text-red-400 text-xs">{nlError}</p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
