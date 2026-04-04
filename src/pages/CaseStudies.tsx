import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ChevronRight, TrendingUp } from 'lucide-react';
import { SectionHeading } from '../components/Common';
import { useSEO } from '../lib/useSEO';
import { getImageSrc } from '../lib/utils';
import type { CaseStudy as CaseStudyType } from '../lib/api';

// Market case studies — all 6 brands
const MARKET_CASES = [
  {
    id: 'z1', title: 'The Rise of Zerodha', slug: 'rise-of-zerodha',
    industry: 'FinTech / Stock Brokerage',
    metrics: '12M+ Clients | $3B+ Valuation | ₹2,000Cr Annual Profit',
    coverImage: '/zerodha.jpeg',
    createdAt: '2026-01-15T00:00:00Z',
  },
  {
    id: 'b1', title: 'The Rise of boAt', slug: 'rise-of-boat',
    industry: 'Consumer Electronics / Audio',
    metrics: '100M+ Products Sold | $500M+ Revenue | #1 Audio Brand',
    coverImage: '/boat.jpeg',
    createdAt: '2026-01-20T00:00:00Z',
  },
  {
    id: 'd1', title: 'The Rise of DMart', slug: 'rise-of-dmart',
    industry: 'Retail / Supermarket',
    metrics: '300+ Stores | ₹50,000Cr Revenue | 20+ Years of Profitability',
    coverImage: '/dmart.jpeg',
    createdAt: '2026-01-25T00:00:00Z',
  },
  {
    id: 'a1', title: 'The Rise of Amul', slug: 'rise-of-amul',
    industry: 'FMCG / Dairy',
    metrics: '₹55,000Cr+ Revenue | 3.6M+ Farmers | 60+ Years of Icon Status',
    coverImage: '/amul.jpeg',
    createdAt: '2026-02-01T00:00:00Z',
  },
  {
    id: 'f1', title: 'The Rise of Fevicol', slug: 'rise-of-fevicol',
    industry: 'Adhesives / Construction Chemicals',
    metrics: '70%+ Market Share | ₹10,000Cr+ Group Revenue | #1 Adhesive Brand',
    coverImage: '/fevicol.jpeg',
    createdAt: '2026-02-10T00:00:00Z',
  },
  {
    id: 'l1', title: 'The Rise of Lifebuoy', slug: 'rise-of-lifebuoy',
    industry: 'FMCG / Personal Care',
    metrics: '130+ Years | #1 Hygiene Soap Brand | 50+ Countries',
    coverImage: '/lifebuoy.jpeg',
    createdAt: '2026-02-15T00:00:00Z',
  },
  {
    id: 'm1', title: 'The Rise of Maggi', slug: 'rise-of-maggi',
    industry: 'FMCG / Packaged Foods',
    metrics: '70%+ Market Share | ₹4,000Cr+ Revenue | Survived a National Ban',
    coverImage: '/maggi.jpeg',
    createdAt: '2026-02-20T00:00:00Z',
  },
];

// Client case studies (existing)
const CLIENT_CASES: CaseStudyType[] = [
  { id: '1', title: 'TechFlow Systems: 2x Revenue in 8 Months', slug: 'techflow-systems-2x-revenue', industry: 'Technology / SaaS', metrics: 'MRR 2x | Churn -78% | Sales Cycle -40%', coverImage: '1460925895917-afdab827c52f', createdAt: '2026-03-01T00:00:00Z' },
  { id: '2', title: 'Luxe Living: High-Ticket Pivot', slug: 'luxe-living-high-ticket-pivot', industry: 'Luxury Retail', metrics: 'AOV 3x | Conversion +45%', coverImage: '1551288049-bebda4e38f71', createdAt: '2026-02-01T00:00:00Z' },
  { id: '3', title: 'Apex Logistics: Operational Overhaul', slug: 'apex-logistics-operational-overhaul', industry: 'Logistics & Supply Chain', metrics: 'COGS -32% | Ops Efficiency +60%', coverImage: '1507679799987-c73779587ccf', createdAt: '2026-01-01T00:00:00Z' },
];

const CaseCard = ({ cs, idx, isMarket = false }: { cs: any; idx: number; isMarket?: boolean }) => {
  const imgSrc = isMarket ? cs.coverImage : getImageSrc(cs.coverImage);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.1 }}
      className="group border border-brand-divider hover:border-brand-gold transition-colors duration-500 flex flex-col"
    >
      <div className="aspect-video overflow-hidden bg-brand-divider">
        {imgSrc && (
          <img
            src={imgSrc}
            alt={cs.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
          />
        )}
      </div>
      <div className="p-8 flex flex-col flex-1">
        <span className="text-brand-gold text-[10px] uppercase tracking-widest block mb-3">{cs.industry}</span>
        <h3 className="text-lg font-serif text-brand-white mb-4 group-hover:text-brand-gold transition-colors">{cs.title}</h3>
        {cs.metrics && (
          <div className="flex items-start gap-2 mb-6">
            <TrendingUp className="w-3 h-3 text-brand-gold mt-0.5 shrink-0" />
            <p className="text-brand-gold/80 text-[10px] uppercase tracking-widest">{cs.metrics}</p>
          </div>
        )}
        <Link to={`/case-studies/${cs.slug}`} className="mt-auto text-brand-white text-[10px] uppercase tracking-[0.3em] flex items-center gap-2 group-hover:gap-4 transition-all">
          Read Case Study <ChevronRight className="w-3 h-3" />
        </Link>
      </div>
    </motion.div>
  );
};

export const CaseStudies = () => {
  useSEO({
    title: 'Case Studies — India\'s Greatest Business Transformations',
    description: 'Explore in-depth business case studies: Zerodha\'s fintech disruption, boAt\'s D2C rise, DMart\'s operational excellence — plus our client success stories.',
    canonical: '/case-studies',
  });

  const [clientCases, setClientCases] = useState<CaseStudyType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/case-studies')
      .then(r => r.json())
      .then((data: CaseStudyType[]) => { setClientCases(data.length > 0 ? data : CLIENT_CASES); setLoading(false); })
      .catch(() => { setClientCases(CLIENT_CASES); setLoading(false); });
  }, []);

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 bg-brand-black">
      <div className="max-w-7xl mx-auto">

        {/* Market Case Studies */}
        <SectionHeading title="Market Case Studies" subtitle="Deconstructing India's most iconic business transformations" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {MARKET_CASES.map((cs, idx) => <CaseCard key={cs.id} cs={cs} idx={idx} isMarket />)}
        </div>

        {/* Divider */}
        <div className="flex items-center gap-6 mb-20">
          <div className="flex-1 h-px bg-brand-divider" />
          <span className="text-brand-white/30 text-[10px] uppercase tracking-[0.4em] shrink-0">Our Client Results</span>
          <div className="flex-1 h-px bg-brand-divider" />
        </div>

        {/* Client Case Studies */}
        <SectionHeading title="Client Transformations" subtitle="Real results from real businesses we have transformed" />
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1,2,3].map(i => (
              <div key={i} className="animate-pulse border border-brand-divider p-8">
                <div className="aspect-video bg-brand-divider mb-6" />
                <div className="h-4 bg-brand-divider mb-4 w-1/3" />
                <div className="h-6 bg-brand-divider mb-4" />
                <div className="h-4 bg-brand-divider mb-2 w-2/3" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {clientCases.map((cs, idx) => <CaseCard key={cs.id} cs={cs} idx={idx} />)}
          </div>
        )}

        {/* CTA */}
        <div className="mt-24 text-center">
          <p className="text-brand-white/60 text-sm mb-8 max-w-xl mx-auto">Ready to become our next success story?</p>
          <Link to="/contact" className="bg-brand-gold text-brand-black px-10 py-4 uppercase tracking-[0.2em] text-xs font-semibold hover:bg-brand-gold-soft transition-all inline-flex items-center gap-3">
            Start Your Transformation <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
