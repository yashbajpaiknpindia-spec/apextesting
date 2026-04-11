import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ChevronRight, TrendingUp } from 'lucide-react';
import { SectionHeading } from '../components/Common';
import { useSEO } from '../lib/useSEO';
import { getImageSrc } from '../lib/utils';
import type { CaseStudy as CaseStudyType } from '../lib/api';

// Market case studies — all 20 brands
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
  {
    id: 'j1', title: 'The Rise of Jio', slug: 'rise-of-jio',
    industry: 'Telecom / Digital Infrastructure',
    metrics: '450M+ Subscribers | ₹1 Lakh Cr+ Revenue | Destroyed Call Rates Overnight',
    coverImage: '/jio.jpeg',
    createdAt: '2026-02-25T00:00:00Z',
  },
  {
    id: 'n1', title: 'The Rise of Nykaa', slug: 'rise-of-nykaa',
    industry: 'Beauty & Personal Care / E-Commerce',
    metrics: '200M+ Users | ₹6,000Cr+ Revenue | India\'s First Woman-Led Unicorn IPO',
    coverImage: '/nykaa.jpeg',
    createdAt: '2026-03-01T00:00:00Z',
  },
  {
    id: 'zo1', title: 'The Rise of Zomato', slug: 'rise-of-zomato',
    industry: 'Food Tech / Delivery',
    metrics: '300M+ Users | ₹12,000Cr+ Revenue | Listed at ₹64,000Cr Valuation',
    coverImage: '/zomato.jpeg',
    createdAt: '2026-03-05T00:00:00Z',
  },
  {
    id: 'o1', title: 'The Rise of OYO', slug: 'rise-of-oyo',
    industry: 'Hospitality / PropTech',
    metrics: '1M+ Rooms | 35+ Countries | Built by a 19-Year-Old School Dropout',
    coverImage: '/oyo.jpeg',
    createdAt: '2026-03-10T00:00:00Z',
  },
  {
    id: 'c1', title: 'The Rise of CRED', slug: 'rise-of-cred',
    industry: 'FinTech / Credit Lifestyle',
    metrics: '$6.4B Valuation | 12M+ Members | Redefined Credit Card Rewards in India',
    coverImage: '/cred.jpeg',
    createdAt: '2026-03-15T00:00:00Z',
  },
  {
    id: 'pt1', title: 'The Rise of Paytm', slug: 'rise-of-paytm',
    industry: 'FinTech / Digital Payments',
    metrics: '300M+ Users | ₹9,000Cr+ Revenue | Triggered India\'s Digital Payment Revolution',
    coverImage: '/paytm.jpeg',
    createdAt: '2026-03-20T00:00:00Z',
  },
  {
    id: 'sw1', title: 'The Rise of Swiggy', slug: 'rise-of-swiggy',
    industry: 'Food Tech / Quick Commerce',
    metrics: '100M+ Users | ₹11,000Cr+ Revenue | 30-Min Delivery Redefined',
    coverImage: '/swiggy.jpeg',
    createdAt: '2026-03-25T00:00:00Z',
  },
  {
    id: 'uc1', title: 'The Rise of Urban Company', slug: 'rise-of-urban-company',
    industry: 'Home Services / Gig Economy',
    metrics: '$2.8B Valuation | 40,000+ Service Professionals | 10+ Countries',
    coverImage: '/urbancompany.jpeg',
    createdAt: '2026-03-28T00:00:00Z',
  },
  {
    id: 'by1', title: "The Rise of BYJU'S", slug: 'rise-of-byjus',
    industry: 'EdTech / Learning',
    metrics: '$22B Peak Valuation | 150M+ Registered Students | World\'s Largest EdTech',
    coverImage: '/byjus.jpeg',
    createdAt: '2026-04-01T00:00:00Z',
  },
  {
    id: 'h1', title: "The Rise of Haldiram's", slug: 'rise-of-haldirams',
    industry: 'FMCG / Packaged Snacks & Food',
    metrics: '₹12,000Cr+ Revenue | Global Presence | 87 Years of Namkeen Mastery',
    coverImage: '/haldirams.jpeg',
    createdAt: '2026-04-02T00:00:00Z',
  },
  {
    id: 'pb1', title: 'The Rise of Paper Boat', slug: 'rise-of-paper-boat',
    industry: 'FMCG / Beverages',
    metrics: '₹500Cr+ Revenue | 40+ Drinks | Built India\'s First Nostalgia Beverage Brand',
    coverImage: '/paperboat.jpeg',
    createdAt: '2026-04-03T00:00:00Z',
  },
  {
    id: 't1', title: 'The Rise of Tanishq', slug: 'rise-of-tanishq',
    industry: 'Jewellery / Retail',
    metrics: '₹40,000Cr+ Revenue | 400+ Stores | Organised India\'s Most Trust-Deficit Market',
    coverImage: '/tanishq.jpeg',
    createdAt: '2026-04-04T00:00:00Z',
  },
  {
    id: 'my1', title: 'The Rise of Myntra', slug: 'rise-of-myntra',
    industry: 'Fashion E-Commerce',
    metrics: '60M+ Active Users | ₹14,000Cr+ GMV | India\'s #1 Fashion Platform',
    coverImage: '/myntra.jpeg',
    createdAt: '2026-04-05T00:00:00Z',
  },

  // 30 additional case studies with Unsplash images
  {
    id: 'ril1', title: 'The Rise of Reliance Retail', slug: 'rise-of-reliance-retail',
    industry: 'Retail / Conglomerate',
    metrics: '18,000+ Stores | ₹2.6L Cr Revenue | Indias Largest Retailer',
    coverImage: '/reliance-retail.jpeg',
    createdAt: '2026-04-06T00:00:00Z',
  },
  {
    id: 'hdfc1', title: 'The Rise of HDFC Bank', slug: 'rise-of-hdfc-bank',
    industry: 'Banking / Finance',
    metrics: '8.7Cr+ Customers | ₹7L Cr+ Advances | Most Valued Bank in India',
    coverImage: '/hdfc-bank.jpeg',
    createdAt: '2026-04-06T00:00:00Z',
  },
  {
    id: 'ola1', title: 'The Rise of Ola', slug: 'rise-of-ola',
    industry: 'Mobility / Transportation',
    metrics: '250M+ Users | 20+ Countries | Redefined Urban Mobility',
    coverImage: '/ola.jpeg',
    createdAt: '2026-04-06T00:00:00Z',
  },
  {
    id: 'flipkart1', title: 'The Rise of Flipkart', slug: 'rise-of-flipkart',
    industry: 'E-Commerce / Retail',
    metrics: '$37.6B Acquisition | 350M+ Users | Pioneered Indian E-Commerce',
    coverImage: '/flipkart.jpeg',
    createdAt: '2026-04-06T00:00:00Z',
  },
  {
    id: 'mak1', title: 'The Rise of Marico', slug: 'rise-of-marico',
    industry: 'FMCG / Hair Care',
    metrics: '70%+ Market Share | ₹10,000Cr+ Revenue | Parachute Dominance',
    coverImage: '/marico.jpeg',
    createdAt: '2026-04-06T00:00:00Z',
  },
  {
    id: 'tata1', title: 'The Rise of Tata Motors', slug: 'rise-of-tata-motors',
    industry: 'Automotive / Manufacturing',
    metrics: '₹4.4L Cr Revenue | JLR Acquisition | Indias EV Pioneer',
    coverImage: '/tata-motors.jpeg',
    createdAt: '2026-04-06T00:00:00Z',
  },
  {
    id: 'airtel1', title: 'The Rise of Airtel', slug: 'rise-of-airtel',
    industry: 'Telecom / Digital Services',
    metrics: '580M+ Subscribers | 18 African Countries | Premium 5G Push',
    coverImage: '/airtel.jpeg',
    createdAt: '2026-04-06T00:00:00Z',
  },
  {
    id: 'infosys1', title: 'The Rise of Infosys', slug: 'rise-of-infosys',
    industry: 'IT Services / Consulting',
    metrics: '$18B+ Revenue | 350,000+ Employees | Global IT Giant',
    coverImage: '/infosys.jpeg',
    createdAt: '2026-04-06T00:00:00Z',
  },
  {
    id: 'asian1', title: 'The Rise of Asian Paints', slug: 'rise-of-asian-paints',
    industry: 'Paint / Home Decor',
    metrics: '55%+ Market Share | ₹35,000Cr Revenue | 65 Years of Colour',
    coverImage: '/asian-paints.jpeg',
    createdAt: '2026-04-06T00:00:00Z',
  },
  {
    id: 'dr1', title: 'The Rise of Dr. Reddy', slug: 'rise-of-dr-reddys',
    industry: 'Pharmaceuticals / Healthcare',
    metrics: '$2.7B Revenue | 100+ Countries | Affordable Generics Pioneer',
    coverImage: '/dr-reddys.jpeg',
    createdAt: '2026-04-06T00:00:00Z',
  },
  {
    id: 'razorpay1', title: 'The Rise of Razorpay', slug: 'rise-of-razorpay',
    industry: 'FinTech / Payments Infrastructure',
    metrics: '$7.5B Valuation | 8M+ Businesses | B2B Payments Leader',
    coverImage: '/razorpay.jpeg',
    createdAt: '2026-04-06T00:00:00Z',
  },
  {
    id: 'meesho1', title: 'The Rise of Meesho', slug: 'rise-of-meesho',
    industry: 'Social Commerce / D2C',
    metrics: '$5B Valuation | 150M+ Users | Tier 2 India Commerce',
    coverImage: '/meesho.jpeg',
    createdAt: '2026-04-06T00:00:00Z',
  },
  {
    id: 'pharmeasy1', title: 'The Rise of PharmEasy', slug: 'rise-of-pharmeasy',
    industry: 'HealthTech / Digital Pharmacy',
    metrics: '$5.6B Peak Valuation | 100M+ Users | Healthcare Disruption',
    coverImage: '/pharmeasy.jpeg',
    createdAt: '2026-04-06T00:00:00Z',
  },
  {
    id: 'dream111', title: 'The Rise of Dream11', slug: 'rise-of-dream11',
    industry: 'Fantasy Sports / Gaming',
    metrics: '$8B Valuation | 200M+ Users | Indias First Gaming Unicorn',
    coverImage: '/dream11.jpeg',
    createdAt: '2026-04-06T00:00:00Z',
  },
  {
    id: 'mpl1', title: 'The Rise of MPL', slug: 'rise-of-mpl',
    industry: 'Mobile Gaming / Esports',
    metrics: '$2.3B Valuation | 90M+ Users | 60+ Games Platform',
    coverImage: '/mpl.jpeg',
    createdAt: '2026-04-06T00:00:00Z',
  },
  {
    id: 'upstox1', title: 'The Rise of Upstox', slug: 'rise-of-upstox',
    industry: 'FinTech / Stock Trading',
    metrics: '10M+ Customers | Backed by Tiger Global | Ratan Tata Invested',
    coverImage: '/upstox.jpeg',
    createdAt: '2026-04-06T00:00:00Z',
  },
  {
    id: 'groww1', title: 'The Rise of Groww', slug: 'rise-of-groww',
    industry: 'FinTech / Investment Platform',
    metrics: '$3B Valuation | 40M+ Users | Simplified Retail Investing',
    coverImage: '/groww.jpeg',
    createdAt: '2026-04-06T00:00:00Z',
  },
  {
    id: 'pepperfry1', title: 'The Rise of Pepperfry', slug: 'rise-of-pepperfry',
    industry: 'Furniture / Home Decor E-Commerce',
    metrics: '7M+ Customers | ₹900Cr+ Revenue | Category Creator',
    coverImage: '/pepperfry.jpeg',
    createdAt: '2026-04-06T00:00:00Z',
  },
  {
    id: 'zivame1', title: 'The Rise of Zivame', slug: 'rise-of-zivame',
    industry: 'Lingerie / Fashion E-Commerce',
    metrics: '5M+ Customers | Broke a Social Taboo | Built a Category',
    coverImage: '/zivame.jpeg',
    createdAt: '2026-04-06T00:00:00Z',
  },
  {
    id: 'classplus1', title: 'The Rise of Classplus', slug: 'rise-of-classplus',
    industry: 'EdTech / Creator Economy',
    metrics: '$570M Valuation | 3M+ Educators | SaaS for Learning',
    coverImage: '/classplus.jpeg',
    createdAt: '2026-04-06T00:00:00Z',
  },
  {
    id: 'licious1', title: 'The Rise of Licious', slug: 'rise-of-licious',
    industry: 'Meat & Seafood / D2C',
    metrics: '$1B Valuation | 40+ Cities | Indias First Meat Unicorn',
    coverImage: '/licious.jpeg',
    createdAt: '2026-04-06T00:00:00Z',
  },
  {
    id: 'cure1', title: 'The Rise of Cure.fit', slug: 'rise-of-curefit',
    industry: 'Health & Wellness / FitTech',
    metrics: '$1.5B Valuation | 1000+ Centers | Omnichannel Fitness',
    coverImage: '/curefit.jpeg',
    createdAt: '2026-04-06T00:00:00Z',
  },
  {
    id: 'practo1', title: 'The Rise of Practo', slug: 'rise-of-practo',
    industry: 'HealthTech / Digital Health',
    metrics: '100M+ Patients | 200,000+ Doctors | 20+ Countries',
    coverImage: '/practo.jpeg',
    createdAt: '2026-04-06T00:00:00Z',
  },
  {
    id: 'dunzo1', title: 'The Rise of Dunzo', slug: 'rise-of-dunzo',
    industry: 'Quick Commerce / Hyperlocal',
    metrics: 'Backed by Google | Pioneered 19-Min Delivery | Category Maker',
    coverImage: '/dunzo.jpeg',
    createdAt: '2026-04-06T00:00:00Z',
  },
  {
    id: 'porter1', title: 'The Rise of Porter', slug: 'rise-of-porter',
    industry: 'Logistics / B2B Transport',
    metrics: '$1B Valuation | 300+ Cities | Intra-City Freight Leader',
    coverImage: '/porter.jpeg',
    createdAt: '2026-04-06T00:00:00Z',
  },
  {
    id: 'shiprocket1', title: 'The Rise of Shiprocket', slug: 'rise-of-shiprocket',
    industry: 'Logistics / E-Commerce Infrastructure',
    metrics: '$1B Valuation | 100,000+ Sellers | D2C Shipping OS',
    coverImage: '/shiprocket.jpeg',
    createdAt: '2026-04-06T00:00:00Z',
  },
  {
    id: 'slice1', title: 'The Rise of Slice', slug: 'rise-of-slice',
    industry: 'FinTech / Neo Banking',
    metrics: '$1.8B Valuation | 10M+ Users | Gen-Z Credit Card Reimagined',
    coverImage: '/slice.jpeg',
    createdAt: '2026-04-06T00:00:00Z',
  },
  {
    id: 'acko1', title: 'The Rise of Acko', slug: 'rise-of-acko',
    industry: 'InsurTech / Digital Insurance',
    metrics: '$1.1B Valuation | 70M+ Customers | Zero-Hassle Claims',
    coverImage: '/acko.jpeg',
    createdAt: '2026-04-06T00:00:00Z',
  },
  {
    id: 'vedantu1', title: 'The Rise of Vedantu', slug: 'rise-of-vedantu',
    industry: 'EdTech / Live Tutoring',
    metrics: '$1B Valuation | 35M+ Students | LIVE Learning Pioneers',
    coverImage: '/vedantu.jpeg',
    createdAt: '2026-04-06T00:00:00Z',
  },
  {
    id: 'khatabook1', title: 'The Rise of Khatabook', slug: 'rise-of-khatabook',
    industry: 'FinTech / SME Tools',
    metrics: '$600M Valuation | 10M+ SMEs | Digitised the Bahi-Khata',
    coverImage: '/khatabook.jpeg',
    createdAt: '2026-04-06T00:00:00Z',
  },

];

// Client case studies (existing)
const CLIENT_CASES: CaseStudyType[] = [
  { id: '1', title: 'TechFlow Systems: 2x Revenue in 8 Months', slug: 'techflow-systems-2x-revenue', industry: 'Technology / SaaS', metrics: 'MRR 2x | Churn -78% | Sales Cycle -40%', coverImage: '1460925895917-afdab827c52f', createdAt: '2026-03-01T00:00:00Z' },
  { id: '2', title: 'Luxe Living: High-Ticket Pivot', slug: 'luxe-living-high-ticket-pivot', industry: 'Luxury Retail', metrics: 'AOV 3x | Conversion +45%', coverImage: '1551288049-bebda4e38f71', createdAt: '2026-02-01T00:00:00Z' },
  { id: '3', title: 'Apex Logistics: Operational Overhaul', slug: 'apex-logistics-operational-overhaul', industry: 'Logistics & Supply Chain', metrics: 'COGS -32% | Ops Efficiency +60%', coverImage: '1507679799987-c73779587ccf', createdAt: '2026-01-01T00:00:00Z' },
];

const CaseCard = ({ cs, idx, isMarket = false }: { cs: any; idx: number; isMarket?: boolean }) => {
  // Handle full URLs (Unsplash) vs local paths vs Unsplash IDs
  const imgSrc = isMarket
    ? cs.coverImage  // already full URL or /local.jpeg
    : getImageSrc(cs.coverImage);
  const isFullUrl = imgSrc?.startsWith('http');
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "100px" }}
      transition={{ delay: Math.min(idx * 0.05, 0.3) }}
      className="group border border-brand-divider hover:border-brand-gold transition-colors duration-500 flex flex-col"
    >
      <div className="aspect-[4/3] overflow-hidden bg-brand-divider relative">
        {imgSrc ? (
          <img
            src={imgSrc}
            alt={cs.title}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-all duration-700"
            loading="lazy"
            decoding="async"
            referrerPolicy={isFullUrl ? "no-referrer" : undefined}
            onError={(e) => {
              const el = e.currentTarget as HTMLImageElement;
              el.style.display = 'none';
            }}
          />
        ) : (
          <div className="w-full h-full bg-brand-rich-black flex items-center justify-center">
            <span className="text-brand-white/20 text-[10px] uppercase tracking-widest">{cs.industry}</span>
          </div>
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
    title: 'Case Studies — India\'s 20 Greatest Business Transformations',
    description: 'Explore 20 in-depth Indian business case studies: Zerodha, Jio, boAt, Nykaa, Zomato, Swiggy, DMart, CRED, Paytm, OYO, BYJU\'S, Tanishq, Myntra, Amul, Fevicol, Haldiram\'s, Paper Boat, Lifebuoy, Maggi — analysed by The Black Apex Consultancy.',
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
        <SectionHeading title="Market Case Studies" subtitle={`Deconstructing India's most iconic business transformations — ${MARKET_CASES.length} deep dives`} />
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
