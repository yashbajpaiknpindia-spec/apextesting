import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Target, Layers, Zap, TrendingUp, Star, ChevronRight, ChevronLeft
} from 'lucide-react';
import { SectionHeading, Button } from '../components/Common';
import { useSEO } from '../lib/useSEO';
import { cn } from '../lib/utils';

const ADVANTAGES = [
  { title: 'FOUNDER-CENTRIC', description: 'We speak the language of founders and build solutions for real growth.', icon: Target },
  { title: 'SCALE-READY SYSTEMS', description: 'Infrastructure designed for 10x growth.', icon: Layers },
  { title: 'PRECISION STRATEGY', description: 'Data-driven diagnosis & revenue leak detection.', icon: Zap },
  { title: 'EXIT & CAPITAL READY', description: 'We build businesses investors trust.', icon: TrendingUp }
];

const FRAMEWORK = [
  { step: '01', title: 'Strategic Diagnosis', desc: 'Deep dive into your current operations and market position.' },
  { step: '02', title: 'Market Positioning', desc: 'Defining your unique value proposition and competitive edge.' },
  { step: '03', title: 'Revenue Architecture', desc: 'Designing high-conversion sales and pricing models.' },
  { step: '04', title: 'Operational Structure', desc: 'Building the systems that allow for seamless scaling.' },
  { step: '05', title: 'Brand Authority', desc: 'Establishing your firm as the undisputed market leader.' },
  { step: '06', title: 'Strategic Oversight', desc: 'Ongoing monitoring and refinement for sustained growth.' }
];

const TESTIMONIALS = [
  { name: 'Siddharth Mehta', role: 'CEO, TechFlow Systems', text: 'The Black Apex transformed our chaotic growth into a systematic machine. Our revenue doubled in 8 months through their precision scaling framework.' },
  { name: 'Ananya Kapoor', role: 'Founder, Luxe Living', text: 'Their strategy helped us pivot to a high-ticket model that actually works. They are not just consultants; they are architects of business success.' },
  { name: 'Vikram Singh', role: 'Director, Apex Logistics', text: "The operational audit revealed bottlenecks we didn't even know existed. We are now truly scale-ready and operationally lean." },
];

const BRAND_INSIGHTS = [
  {
    headline: 'Same face. Every time.',
    subheadline: "That's why you remember it.",
    brand: 'Amul',
    tag: 'Brand Consistency',
    lesson: "Visual consistency across 60+ years made Amul's Utterly Butterly girl India's most recognised mascot — proof that brand repetition compounds like interest.",
  },
  {
    headline: "Strong brands don't convince.",
    subheadline: 'They associate.',
    brand: 'Fevicol',
    tag: 'Brand Association',
    lesson: 'Fevicol never sold adhesive — it sold the idea of an unbreakable bond. Its two-elephant logo created a single irreversible mental link: "Fevicol ka jod."',
  },
  {
    headline: 'Trust is a byproduct of protection.',
    subheadline: '',
    brand: 'Lifebuoy',
    tag: 'Brand Trust',
    lesson: "Lifebuoy didn't market soap — it marketed survival. By owning the hygiene-protection narrative for over a century, trust became automatic, not earned ad by ad.",
  },
  {
    headline: "Habits don't need marketing.",
    subheadline: '*They need repetition.',
    brand: 'Maggi',
    tag: 'Brand Habit',
    lesson: '"2-Minute Noodles" was never a cooking instruction — it was a behavioural trigger. Maggi survived a national ban and came back stronger because the habit was too deep to erase.',
  },
];

const FEATURED_CASES = [
  {
    slug: 'rise-of-zerodha',
    title: 'The Rise of Zerodha',
    subtitle: "How a Bootstrapped Startup Disrupted India's Brokerage Industry",
    industry: 'FinTech / Stock Brokerage',
    metrics: [{ val: '$3B+', lbl: 'Valuation' }, { val: '12M+', lbl: 'Clients' }, { val: '₹2,000Cr', lbl: 'Annual Profit' }],
    image: '/zerodha.jpeg',
  },
  {
    slug: 'rise-of-boat',
    title: 'The Rise of boAt',
    subtitle: "How a D2C Brand Dominated India's Audio Market",
    industry: 'Consumer Electronics / Audio',
    metrics: [{ val: '$500M+', lbl: 'Revenue' }, { val: '100M+', lbl: 'Products Sold' }, { val: '#1', lbl: 'Audio Brand' }],
    image: '/boat.jpeg',
  },
  {
    slug: 'rise-of-dmart',
    title: 'The Rise of DMart',
    subtitle: "How Operational Discipline Built India's Most Efficient Retail Chain",
    industry: 'Retail / Supermarket',
    metrics: [{ val: '300+', lbl: 'Stores' }, { val: '₹50,000Cr', lbl: 'Revenue' }, { val: '20+ Yrs', lbl: 'Profitable' }],
    image: '/dmart.jpeg',
  },
  {
    slug: 'rise-of-amul',
    title: 'The Rise of Amul',
    subtitle: "Same Face. Every Time. That's Why You Remember It.",
    industry: 'FMCG / Dairy',
    metrics: [{ val: '₹55,000Cr+', lbl: 'Revenue' }, { val: '3.6M+', lbl: 'Farmers' }, { val: '60+ Yrs', lbl: 'Icon Status' }],
    image: '/amul.jpeg',
  },
  {
    slug: 'rise-of-fevicol',
    title: 'The Rise of Fevicol',
    subtitle: "Strong Brands Don't Convince. They Associate.",
    industry: 'Adhesives / Construction Chemicals',
    metrics: [{ val: '70%+', lbl: 'Market Share' }, { val: '₹10,000Cr+', lbl: 'Group Revenue' }, { val: '#1', lbl: 'Adhesive Brand' }],
    image: '/fevicol.jpeg',
  },
  {
    slug: 'rise-of-lifebuoy',
    title: 'The Rise of Lifebuoy',
    subtitle: "Trust Is a Byproduct of Protection.",
    industry: 'FMCG / Personal Care',
    metrics: [{ val: '130+', lbl: 'Years' }, { val: '#1', lbl: 'Hygiene Soap' }, { val: '50+', lbl: 'Countries' }],
    image: '/lifebuoy.jpeg',
  },
  {
    slug: 'rise-of-maggi',
    title: 'The Rise of Maggi',
    subtitle: "Habits Don't Need Marketing. They Need Repetition.",
    industry: 'FMCG / Packaged Foods',
    metrics: [{ val: '70%+', lbl: 'Market Share' }, { val: '₹4,000Cr+', lbl: 'Revenue' }, { val: '40+ Yrs', lbl: 'Category Leader' }],
    image: '/maggi.jpeg',
  },
];

// ── Case Studies Slider ──────────────────────────────────────────────────
const CaseStudiesSlider = () => {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);

  useEffect(() => {
    const t = setInterval(() => { setDir(1); setIndex(p => (p + 1) % FEATURED_CASES.length); }, 5000);
    return () => clearInterval(t);
  }, []);

  const goTo = (n: number) => { setDir(n > index ? 1 : -1); setIndex(n); };
  const prev = () => { const n = (index - 1 + FEATURED_CASES.length) % FEATURED_CASES.length; setDir(-1); setIndex(n); };
  const next = () => { const n = (index + 1) % FEATURED_CASES.length; setDir(1); setIndex(n); };

  const cs = FEATURED_CASES[index];

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: dir * 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: dir * -60 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="group border border-brand-divider hover:border-brand-gold transition-colors duration-500 flex flex-col md:flex-row"
          >
            <div className="md:w-1/2 aspect-video md:aspect-auto md:min-h-[360px] overflow-hidden bg-brand-divider">
              <img src={cs.image} alt={cs.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
            </div>
            <div className="md:w-1/2 p-10 flex flex-col justify-center">
              <span className="text-brand-gold text-[10px] uppercase tracking-widest mb-3 block">{cs.industry}</span>
              <h3 className="text-2xl md:text-3xl font-serif text-brand-white mb-3 group-hover:text-brand-gold transition-colors leading-snug">{cs.title}</h3>
              <p className="text-brand-white/40 text-sm leading-relaxed mb-8">{cs.subtitle}</p>
              <div className="grid grid-cols-3 gap-3 mb-8 border-t border-brand-divider pt-6">
                {cs.metrics.map(m => (
                  <div key={m.lbl} className="text-center">
                    <div className="text-brand-gold font-serif text-xl leading-none mb-1">{m.val}</div>
                    <div className="text-brand-white/35 text-[9px] uppercase tracking-wider">{m.lbl}</div>
                  </div>
                ))}
              </div>
              <Link to={`/case-studies/${cs.slug}`} className="text-brand-white text-[10px] uppercase tracking-[0.3em] flex items-center gap-2 group-hover:gap-4 transition-all w-fit">
                Read Case Study <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mt-6">
        <div className="flex gap-2">
          {FEATURED_CASES.map((_, i) => (
            <button key={i} onClick={() => goTo(i)} aria-label={`Case study ${i + 1}`} className={cn("h-1 rounded-full transition-all duration-300", i === index ? "bg-brand-gold w-8" : "bg-brand-divider w-3 hover:bg-brand-gold/40")} />
          ))}
        </div>
        <div className="flex gap-2">
          <button onClick={prev} className="p-2 border border-brand-divider text-brand-white/50 hover:text-brand-gold hover:border-brand-gold transition-colors">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button onClick={next} className="p-2 border border-brand-divider text-brand-white/50 hover:text-brand-gold hover:border-brand-gold transition-colors">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
const TestimonialSlider = () => {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIndex(p => (p + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="relative max-w-4xl mx-auto px-6">
      <div className="overflow-hidden min-h-[300px] flex items-center">
        <motion.div key={index} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.5 }} className="text-center w-full">
          <div className="flex justify-center mb-8">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-brand-gold fill-brand-gold mx-0.5" />)}</div>
          <p className="text-lg md:text-2xl font-serif italic mb-8 leading-relaxed text-brand-white">"{TESTIMONIALS[index].text}"</p>
          <h4 className="text-brand-gold font-serif tracking-widest uppercase text-sm mb-1">{TESTIMONIALS[index].name}</h4>
          <p className="text-brand-white/40 text-[10px] uppercase tracking-[0.2em]">{TESTIMONIALS[index].role}</p>
        </motion.div>
      </div>
      <div className="flex justify-center gap-2 mt-12">
        {TESTIMONIALS.map((_, i) => (
          <button key={i} onClick={() => setIndex(i)} aria-label={`Testimonial ${i+1}`} className={cn("h-1.5 rounded-full transition-all duration-300", i === index ? "bg-brand-gold w-6" : "bg-brand-divider w-1.5")} />
        ))}
      </div>
    </div>
  );
};

// ── Brand Insights Slider ────────────────────────────────────────────────
const BrandInsightsSlider = () => {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);

  useEffect(() => {
    const t = setInterval(() => { setDir(1); setIndex(p => (p + 1) % BRAND_INSIGHTS.length); }, 6000);
    return () => clearInterval(t);
  }, []);

  const go = (n: number) => { setDir(n > index ? 1 : -1); setIndex(n); };

  const item = BRAND_INSIGHTS[index];

  return (
    <div className="relative border border-brand-divider">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, x: dir * 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: dir * -50 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="flex flex-col items-center text-center px-12 md:px-24 py-20 min-h-[420px] justify-center"
        >
          <span className="text-brand-gold text-[10px] uppercase tracking-[0.45em] mb-8 block">{item.tag}</span>
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-serif text-brand-white leading-tight mb-3 max-w-3xl">{item.headline}</h3>
          {item.subheadline && <p className="text-xl md:text-2xl font-serif italic text-brand-white/60 mb-10">{item.subheadline}</p>}
          <div className="w-14 h-px bg-brand-gold mb-8" />
          <p className="text-brand-white/55 text-sm md:text-base leading-relaxed max-w-2xl mb-10">{item.lesson}</p>
          <div className="flex items-center gap-3">
            <span className="text-brand-white/30 text-[9px] uppercase tracking-[0.4em]">Brand Study</span>
            <span className="w-5 h-px bg-brand-gold/40" />
            <span className="text-brand-gold font-serif text-base tracking-widest">{item.brand}</span>
          </div>
        </motion.div>
      </AnimatePresence>

      <button onClick={() => go((index - 1 + BRAND_INSIGHTS.length) % BRAND_INSIGHTS.length)} aria-label="Previous" className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 border border-brand-divider hover:border-brand-gold text-brand-white/30 hover:text-brand-gold flex items-center justify-center transition-all">
        <ChevronLeft className="w-4 h-4" />
      </button>
      <button onClick={() => go((index + 1) % BRAND_INSIGHTS.length)} aria-label="Next" className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 border border-brand-divider hover:border-brand-gold text-brand-white/30 hover:text-brand-gold flex items-center justify-center transition-all">
        <ChevronRight className="w-4 h-4" />
      </button>

      <div className="flex justify-center gap-2 pb-6">
        {BRAND_INSIGHTS.map((_, i) => (
          <button key={i} onClick={() => go(i)} aria-label={`Insight ${i+1}`} className={cn("h-1 rounded-full transition-all duration-300", i === index ? "bg-brand-gold w-8" : "bg-brand-divider w-2")} />
        ))}
      </div>
    </div>
  );
};

// ── Home Page ─────────────────────────────────────────────────────────────
export const Home = () => {
  useSEO({
    title: 'Elite Business Strategy for Ambitious Founders',
    description: 'The Black Apex Consultancy helps ambitious founders scale with precision. Expert business strategy, revenue architecture, and operational excellence.',
    canonical: '/',
  });

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-12 md:pt-0 md:pb-0">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-brand-black/70 z-10" />
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2070"
            alt="Luxury skyline office building representing elite business strategy"
            className="w-full h-full object-cover brightness-50"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="relative z-20 text-center px-6 max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="text-brand-gold uppercase tracking-[0.5em] text-[10px] mb-6 block">Premium Business Strategy</span>
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-brand-white mb-8 leading-[1.1]">
              WE ARCHITECT <br /> BUSINESSES THAT <span className="text-brand-gold italic">SCALE</span>
            </h1>
            <p className="text-brand-white/70 text-sm md:text-lg max-w-2xl mx-auto mb-12 leading-relaxed font-light">
              Strategy. Structure. Execution. We partner with founders and leadership teams to design scalable business systems, eliminate growth chaos, and build market-leading companies.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <Button href="https://wa.me/919839600646" className="w-full md:w-auto">Start Strategy Conversation</Button>
              <Button variant="secondary" href="mailto:business@theblackapexconsultancy.in" className="w-full md:w-auto">Book Consultation</Button>
            </div>
          </motion.div>
        </div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1 }} className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-[8px] uppercase tracking-[0.3em] text-brand-white/30">Scroll to explore</span>
          <div className="w-px h-12 bg-gradient-to-b from-brand-gold to-transparent" />
        </motion.div>
      </section>

      {/* Advantage */}
      <section className="py-24 px-6 md:px-12 bg-brand-rich-black">
        <div className="max-w-7xl mx-auto">
          <SectionHeading title="The Black Apex Advantage" subtitle="Why the world's most ambitious founders choose us" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {ADVANTAGES.map((item, idx) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} className="group p-8 bg-brand-black border border-brand-divider hover:border-brand-gold transition-all duration-500">
                <item.icon className="w-10 h-10 text-brand-gold mb-6 transition-transform duration-500 group-hover:scale-110" />
                <h3 className="text-lg font-serif mb-4 text-brand-white group-hover:text-brand-gold transition-colors">{item.title}</h3>
                <p className="text-brand-white/50 text-xs leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Framework */}
      <section className="py-24 px-6 md:px-12 bg-brand-black">
        <div className="max-w-7xl mx-auto">
          <SectionHeading title="The Apex Framework" subtitle="Our 6-step methodology for exponential growth" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-12">
            {FRAMEWORK.map((item, idx) => (
              <motion.div key={item.step} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} className="flex gap-6">
                <span className="text-4xl font-serif text-brand-gold/20 leading-none">{item.step}</span>
                <div>
                  <h4 className="text-lg font-serif mb-3 text-brand-white">{item.title}</h4>
                  <p className="text-brand-white/40 text-xs leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Insights Slider */}
      <section className="py-24 px-6 md:px-12 bg-brand-rich-black">
        <div className="max-w-5xl mx-auto">
          <SectionHeading title="Brand Intelligence" subtitle="Structural insights from India's most iconic brands" />
          <BrandInsightsSlider />
          <div className="text-center mt-10">
            <Link to="/blog" className="text-brand-gold text-[10px] uppercase tracking-[0.3em] inline-flex items-center gap-2 hover:gap-4 transition-all">
              View All Insights <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Case Studies */}
      <section className="py-24 px-6 md:px-12 bg-brand-black">
        <div className="max-w-7xl mx-auto">
          <SectionHeading title="Market Case Studies" subtitle="Deconstructing India's greatest business transformations" />
          <CaseStudiesSlider />
          <div className="text-center mt-12">
            <Link to="/case-studies" className="text-brand-gold text-[10px] uppercase tracking-[0.3em] inline-flex items-center gap-2 hover:gap-4 transition-all">
              View All Case Studies <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 md:px-12 bg-brand-rich-black">
        <div className="max-w-7xl mx-auto">
          <SectionHeading title="Client Success" subtitle="Voices from the Apex" />
          <TestimonialSlider />
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 md:px-12 bg-brand-black text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-serif mb-8 leading-tight">
            READY TO <span className="text-brand-gold italic">SCALE</span> YOUR VISION?
          </h2>
          <p className="text-brand-white/60 mb-12 text-lg font-light">
            Join the elite group of founders who have transformed their growth chaos into a precision scaling machine.
          </p>
          <Button href="https://wa.me/919839600646" className="mx-auto">Book Your Strategy Audit</Button>
        </div>
      </section>
    </div>
  );
};
