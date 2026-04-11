import { useSEO } from '../lib/useSEO';
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Calendar } from 'lucide-react';
import { getImageSrc } from '../lib/utils';
import type { BlogPost as BlogPostType } from '../lib/api';

export const BlogPost = () => {
  // Dynamic SEO — will fire each time post loads
  const [seoData, setSeoData] = React.useState<{ title?: string; description?: string; slug?: string }>({});
  useSEO({
    title: seoData.title,
    description: seoData.description,
    canonical: seoData.slug ? `/blog/${seoData.slug}` : '/blog',
    ogType: 'article',
  });
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    fetch(`/api/blog/${slug}`)
      .then(r => {
        if (!r.ok) { setNotFound(true); setLoading(false); return null; }
        return r.json();
      })
      .then((data) => {
        if (data) { setPost(data); setLoading(false); }
      })
      .catch(() => { setNotFound(true); setLoading(false); });
  }, [slug]);

  if (loading) {
    return (
      <div className="pt-32 pb-24 px-6 md:px-12 bg-brand-black min-h-screen">
        <div className="max-w-3xl mx-auto animate-pulse">
          <div className="h-8 bg-brand-divider mb-4 w-3/4" />
          <div className="h-4 bg-brand-divider mb-8 w-1/4" />
          <div className="aspect-video bg-brand-divider mb-12" />
          {[1,2,3,4,5].map(i => <div key={i} className="h-4 bg-brand-divider mb-3" />)}
        </div>
      </div>
    );
  }

  if (notFound || !post) {
    return (
      <div className="pt-32 pb-24 px-6 md:px-12 bg-brand-black min-h-screen text-center">
        <h1 className="text-4xl font-serif text-brand-white mb-6">Article Not Found</h1>
        <p className="text-brand-white/60 mb-8">This article may not be published yet.</p>
        <Link to="/blog" className="text-brand-gold uppercase tracking-widest text-xs">← Back to Insights</Link>
      </div>
    );
  }

  const formatDate = (d: string) => new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  // Simple markdown-to-HTML renderer
  const renderContent = (content: string) => {
    return content
      .split('\n')
      .map((line, i) => {
        if (line.startsWith('# ')) return <h1 key={i} className="text-3xl font-serif text-brand-white mb-6 mt-8">{line.slice(2)}</h1>;
        if (line.startsWith('## ')) return <h2 key={i} className="text-2xl font-serif text-brand-white mb-4 mt-8">{line.slice(3)}</h2>;
        if (line.startsWith('### ')) return <h3 key={i} className="text-xl font-serif text-brand-gold mb-3 mt-6">{line.slice(4)}</h3>;
        if (line.startsWith('- ') || line.startsWith('* ')) return <li key={i} className="text-brand-white/80 text-sm leading-relaxed mb-2 ml-4">{line.slice(2)}</li>;
        if (line.match(/^\d+\.\s/)) return <li key={i} className="text-brand-white/80 text-sm leading-relaxed mb-2 ml-4 list-decimal">{line.replace(/^\d+\.\s/, '')}</li>;
        if (line === '') return <br key={i} />;
        // Bold
        const boldLine = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        return <p key={i} className="text-brand-white/70 text-sm leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: boldLine }} />;
      });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pt-32 pb-24 px-6 md:px-12 bg-brand-black min-h-screen"
    >
      <div className="max-w-3xl mx-auto">
        <Link to="/blog" className="text-brand-white/50 text-[10px] uppercase tracking-[0.3em] flex items-center gap-2 mb-12 hover:text-brand-gold transition-colors group">
          <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" /> Back to Insights
        </Link>

        {post.coverImage && getImageSrc(post.coverImage) && (
          <div className="aspect-video overflow-hidden mb-12">
            <img
              src={getImageSrc(post.coverImage, 1200)!}
              alt={post.title}
              className="w-full h-full object-cover grayscale"
            />
          </div>
        )}

        <div className="flex items-center gap-3 text-brand-gold text-[10px] uppercase tracking-widest mb-6">
          <Calendar className="w-3 h-3" />
          {formatDate(post.createdAt)}
        </div>

        <h1 className="text-3xl md:text-4xl font-serif text-brand-white mb-4 leading-tight">{post.title}</h1>
        <p className="text-brand-white/60 text-sm mb-12 pb-12 border-b border-brand-divider">{post.excerpt}</p>

        <div className="prose-custom">
          {renderContent(post.content || '')}
        </div>

        <div className="mt-16 pt-12 border-t border-brand-divider">
          <Link to="/blog" className="text-brand-gold text-[10px] uppercase tracking-[0.3em] hover:text-brand-gold-soft transition-colors">
            ← More Insights
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
