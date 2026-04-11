import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { useSEO } from '../lib/useSEO';
import { INSIGHTS } from './ValueInsights';

export const InsightPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = INSIGHTS.find(i => i.slug === slug);

  useSEO({
    title: post ? `${post.title} — Apex Insights` : 'Insight Not Found',
    description: post ? post.excerpt : 'Strategic business insight from The Black Apex Consultancy.',
    canonical: `/insights/${slug}`,
    ogType: 'article',
  });

  if (!post) {
    return (
      <div className="pt-32 pb-24 px-6 md:px-12 bg-brand-black min-h-screen text-center">
        <h1 className="text-4xl font-serif text-brand-white mb-6">Insight Not Found</h1>
        <Link to="/insights" className="text-brand-gold uppercase tracking-widest text-xs">\u2190 Back to Insights</Link>
      </div>
    );
  }

  // JSON-LD Article schema
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { '@type': 'Organization', name: 'The Black Apex Consultancy' },
    publisher: {
      '@type': 'Organization',
      name: 'The Black Apex Consultancy',
      logo: { '@type': 'ImageObject', url: 'https://theblackapexconsultancy.in/apple-touch-icon.png' },
    },
    image: `https://images.unsplash.com/photo-${post.image}?auto=format&fit=crop&q=80&w=1200`,
    url: `https://theblackapexconsultancy.in/insights/${post.slug}`,
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://theblackapexconsultancy.in/insights/${post.slug}` },
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-32 pb-24 px-6 md:px-12 bg-brand-black min-h-screen">
      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="max-w-3xl mx-auto">
        {/* Back */}
        <Link to="/insights" className="text-brand-white/50 text-[10px] uppercase tracking-[0.3em] flex items-center gap-2 mb-12 hover:text-brand-gold transition-colors group">
          <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" /> Back to Insights
        </Link>

        {/* Hero Image */}
        <div className="aspect-video overflow-hidden mb-12 bg-brand-divider">
          <img
            src={`https://images.unsplash.com/photo-${post.image}?auto=format&fit=crop&q=80&w=1200`}
            alt={post.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
            loading="eager"
          />
        </div>

        {/* Meta */}
        <div className="flex items-center gap-4 mb-6">
          <span className="text-brand-gold text-[10px] uppercase tracking-widest border border-brand-gold/30 px-3 py-1">{post.category}</span>
          <span className="text-brand-white/30 text-[10px]">{post.readTime}</span>
          <span className="text-brand-white/20 text-[10px] ml-auto">{post.date}</span>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-5xl font-serif text-brand-white mb-8 leading-tight">{post.title}</h1>

        {/* Excerpt */}
        <p className="text-brand-white/60 text-lg leading-relaxed mb-14 border-l-4 border-brand-gold/40 pl-6 italic">
          {post.excerpt}
        </p>

        {/* Body Sections */}
        <div className="space-y-12">
          {post.body.map((section, i) => (
            <div key={i}>
              <h2 className="text-brand-gold text-[10px] uppercase tracking-[0.35em] mb-4">{section.heading}</h2>
              <p className="text-brand-white/70 text-sm leading-loose">{section.text}</p>
            </div>
          ))}
        </div>

        {/* Strategic Insight Callout */}
        <div className="mt-16 bg-brand-rich-black border border-brand-gold/30 p-10">
          <span className="text-brand-gold text-[10px] uppercase tracking-[0.4em] block mb-5">Strategic Insight</span>
          <p className="text-brand-white font-serif text-lg leading-relaxed">{post.insight}</p>
        </div>

        {/* More Articles */}
        <div className="mt-20 pt-12 border-t border-brand-divider">
          <h3 className="text-brand-gold text-[10px] uppercase tracking-[0.35em] mb-8">More Insights</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {INSIGHTS.filter(i => i.slug !== post.slug).slice(0, 2).map(related => (
              <Link key={related.slug} to={`/insights/${related.slug}`}
                className="group border border-brand-divider hover:border-brand-gold transition-all duration-300 p-6 flex flex-col gap-3">
                <span className="text-brand-gold text-[9px] uppercase tracking-widest">{related.category}</span>
                <h4 className="text-brand-white text-sm font-serif leading-snug group-hover:text-brand-gold transition-colors">{related.title}</h4>
                <span className="text-brand-white/30 text-[9px] flex items-center gap-1 mt-auto group-hover:gap-2 transition-all">
                  Read <ChevronRight className="w-3 h-3" />
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 flex flex-col md:flex-row items-center justify-between gap-6 pt-10 border-t border-brand-divider">
          <Link to="/insights" className="text-brand-gold text-[10px] uppercase tracking-[0.3em]">\u2190 All Insights</Link>
          <Link to="/contact" className="bg-brand-gold text-brand-black px-8 py-3 uppercase tracking-[0.2em] text-xs font-semibold hover:bg-brand-gold-soft transition-all">
            Work With Us
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
