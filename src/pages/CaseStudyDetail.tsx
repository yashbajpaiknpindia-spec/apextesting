import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, TrendingUp, Building2, Calendar, MapPin, User } from 'lucide-react';
import { useSEO } from '../lib/useSEO';
import { getImageSrc } from '../lib/utils';
import type { CaseStudy } from '../lib/api';

// ── Market Case Type ──────────────────────────────────────────────────────
type MarketCase = {
  id: string; title: string; slug: string; industry: string;
  founded: string; founder: string; headquarters: string;
  metrics: string; coverImage: string;
  seoTitle: string; seoDescription: string; tagline: string;
  problem: string; problemPoints: string[];
  strategy: { title: string; desc: string; points: string[] }[];
  results: string[]; resultsNote: string; insight: string;
};

const MARKET_CASES: Record<string, MarketCase> = {
  'rise-of-zerodha': {
    id: 'z1', title: 'The Rise of Zerodha', slug: 'rise-of-zerodha',
    industry: 'FinTech / Stock Brokerage', founded: '2010',
    founder: 'Nithin Kamath', headquarters: 'Bengaluru, Karnataka',
    metrics: '12M+ Clients | $3B+ Valuation | ₹2,000Cr Annual Profit',
    coverImage: '/zerodha.jpeg',
    seoTitle: "The Rise of Zerodha — How a Bootstrapped Startup Disrupted India's Brokerage Industry",
    seoDescription: "In-depth case study on Zerodha's journey from bootstrapped startup to India's largest retail broker with 12M+ clients and $3B+ valuation.",
    tagline: "How a Bootstrapped Startup Disrupted India's Brokerage Industry",
    problem: 'Before 2010, stock trading in India was largely dominated by traditional brokerage firms such as ICICI Securities and HDFC Securities. The industry suffered from three major structural problems that kept retail participation extremely low.',
    problemPoints: [
      'High brokerage fees — typically 0.3–0.5% per trade, making frequent trading uneconomical for retail investors.',
      'Complex, outdated trading platforms designed primarily for professional traders and HNIs, not everyday investors.',
      'Limited financial education — most retail individuals lacked access, awareness, and guidance to participate in equity markets.',
    ],
    strategy: [
      {
        title: 'Flat Pricing Model — ₹20 Per Trade',
        desc: 'Zerodha upended the percentage-based brokerage model by introducing a flat fee of ₹20 per executed order, regardless of trade size. This single move made frequent trading economical for the mass-market retail investor and eliminated the revenue conflict of interest baked into percentage models.',
        points: ['Zero brokerage on equity delivery trades', 'Flat ₹20 maximum on intraday and F&O', 'Transparent fee structure with no hidden charges'],
      },
      {
        title: 'Technology-First — The Kite Platform',
        desc: 'Rather than licensing third-party software, Zerodha built Kite entirely in-house — a fast, intuitive, mobile-first trading platform. It became the benchmark for Indian trading UX and is now licensed to other brokers through their B2B arm, Rainmatter.',
        points: ['Simple, chart-centric user interface', 'Real-time analytics and advanced charting tools', 'Mobile-first experience with sub-second order execution'],
      },
      {
        title: 'Education as Marketing — Varsity by Zerodha',
        desc: 'Instead of traditional advertising, Zerodha built Varsity — a comprehensive, free financial education platform. This created compounding organic growth: educated investors became Zerodha customers naturally.',
        points: ['Stock market fundamentals & technical analysis modules', 'Options, derivatives & personal finance content', 'Completely free — no paywall or upsell'],
      },
    ],
    results: [
      '12+ million active clients — largest retail brokerage in India by client count.',
      'Bootstrapped unicorn valued at $3 billion+ with zero rounds of external equity funding.',
      '₹2,000+ crore annual net profit — one of India\'s most profitable financial services companies.',
      'Accounts for ~15% of NSE daily turnover, the single largest share of any retail broker.',
      'Kite licensed to 10+ brokers globally; Varsity has 10M+ registered learners.',
    ],
    resultsNote: 'Zerodha demonstrated that price transparency, superior technology, and investor education can unlock massive retail participation in financial markets — without spending on advertising.',
    insight: 'Zerodha\'s moat is not just its low price. It is the combination of trust built through radical transparency, a platform that delights users, and an education engine that continuously creates its own future customers. Price was the hook; the ecosystem is the lock.',
  },

  'rise-of-boat': {
    id: 'b1', title: 'The Rise of boAt', slug: 'rise-of-boat',
    industry: 'Consumer Electronics / Audio', founded: '2016',
    founder: 'Aman Gupta & Sameer Mehta', headquarters: 'New Delhi, India',
    metrics: '100M+ Products Sold | $500M+ Revenue | #1 Audio Brand in India',
    coverImage: '/boat.jpeg',
    seoTitle: "The Rise of boAt — How a D2C Brand Dominated India's Audio Market",
    seoDescription: "Deep-dive case study on how boAt became India's No.1 audio brand through affordable-premium positioning, influencer marketing, and D2C distribution.",
    tagline: "How a D2C Brand Dominated India's Audio Market",
    problem: "Before 2016, India's audio accessories market was dominated by global brands such as Sony, JBL, and Skullcandy. Three major gaps created a wide-open opportunity.",
    problemPoints: [
      "Global premium brands (Sony, JBL) were priced far out of reach for India's mass youth market.",
      'Cheap local alternatives were unreliable and carried no aspirational value or brand identity.',
      "No brand had built a strong emotional connection specifically with India's young, digitally-native consumers.",
    ],
    strategy: [
      {
        title: 'Affordable Premium Positioning',
        desc: "boAt deliberately carved out the 'affordable premium' space — stylish, reliable products priced between ₹500 and ₹5,000. This gap between cheap-and-unreliable and expensive-and-aspirational was where boAt planted its flag.",
        points: ['Products positioned above commodity but below global premium', 'Strong focus on design aesthetics, colour variety, and youth appeal', 'Consistent product quality to drive repeat purchase and word-of-mouth'],
      },
      {
        title: 'Influencer-Driven Marketing',
        desc: 'Instead of traditional celebrity advertising, boAt built a "boat-head" community through micro and macro influencers across Instagram, YouTube, and fitness platforms — creating authentic reach with exactly the demographics it was targeting.',
        points: ['Instagram creators and fitness influencers as brand ambassadors', 'Musicians, athletes, and gamers as category-relevant voices', 'Fan-driven UGC content reducing paid media dependency'],
      },
      {
        title: 'E-commerce First Distribution',
        desc: "boAt scaled entirely on Amazon and Flipkart before touching offline retail — allowing lightning-fast iteration, direct consumer data, and zero retail margin sacrifice. Offline expansion came only after D2C dominance was established.",
        points: ['Amazon and Flipkart as primary launch channels', 'Data-driven inventory and SKU decisions from platform analytics', 'boAt.lifestyle D2C website for margin-rich direct sales'],
      },
    ],
    results: [
      "India's No.1 audio brand by shipment volume — leading Sony, JBL, and Samsung in hearables.",
      '$500M+ annual revenue in FY2024, with consistent year-on-year growth since launch.',
      '100+ million products sold across earphones, headphones, speakers, smartwatches, and accessories.',
      'IPO filed in 2022 with Warburg Pincus and other institutional investors on the cap table.',
      'Expanded into smartwatches, trimmers, and home audio — becoming a lifestyle electronics brand.',
    ],
    resultsNote: "boAt proved that winning in consumer markets often depends less on technology and more on cultural relevance. It built a brand that resonated deeply with India's youth before a single product was advertised on television.",
    insight: "boAt's real product was not the earphone — it was the identity it gave its customer. Every marketing decision asked: 'Does this make a 22-year-old Indian proud to wear boAt in public?' That question, answered consistently, built a billion-dollar brand.",
  },

  'rise-of-dmart': {
    id: 'd1', title: 'The Rise of DMart', slug: 'rise-of-dmart',
    industry: 'Retail / Supermarket', founded: '2002',
    founder: 'Radhakishan Damani', headquarters: 'Mumbai, Maharashtra',
    metrics: '300+ Stores | ₹50,000Cr+ Revenue | 20+ Years of Profitability',
    coverImage: '/dmart.jpeg',
    seoTitle: "The Rise of DMart — How Operational Discipline Built India's Most Efficient Retail Chain",
    seoDescription: "In-depth case study on DMart's rise to become India's most profitable retailer through store ownership, limited SKUs, and Everyday Low Price strategy.",
    tagline: "How Operational Discipline Built India's Most Efficient Retail Chain",
    problem: "Before the early 2000s, India's retail sector was highly fragmented. Modern supermarket chains that attempted to scale consistently struggled to remain profitable despite rapid expansion.",
    problemPoints: [
      'Thin profit margins at every level made scaling deeply unprofitable for most retail chains.',
      'High real estate costs — most chains leased premium locations, creating fixed costs that crushed profitability.',
      'Inventory inefficiencies and discount wars led to high waste, low turnover, and operational chaos across the sector.',
    ],
    strategy: [
      {
        title: 'Ownership of Store Real Estate',
        desc: 'Unlike every competitor that leased premium retail space, DMart made the counter-intuitive decision to buy or take long-lease properties at lower-cost locations. This eliminated the single biggest fixed cost in retail and created a structural advantage competitors could never easily replicate.',
        points: ['Stores in high-footfall residential areas, not premium malls', 'Properties owned outright — zero landlord dependency', 'Long-term real estate appreciation as a secondary wealth engine'],
      },
      {
        title: 'Limited, High-Velocity SKU Assortment',
        desc: 'DMart deliberately carries fewer SKUs than competitors — focusing exclusively on fast-moving, high-demand categories. This delivers faster inventory turnover, lower waste, better supplier terms, and simpler store operations.',
        points: ['~1,700 SKUs vs. 5,000–10,000 at competing hypermarkets', 'Faster inventory turnover — often under 30 days', 'Lower shrinkage and spoilage across perishable categories'],
      },
      {
        title: 'Everyday Low Price (EDLP) Model',
        desc: 'DMart never runs festive sales or flash discounts. Instead, it consistently offers prices 5–8% below market on core items every day — building deep consumer trust and creating habitual, repeat-purchase behaviour.',
        points: ['Consistent prices eliminate deal-hunting behaviour', 'Suppliers rewarded with faster payment cycles (7–10 days vs. industry 30–60 days)', 'Lower marketing spend vs. competitors running perpetual promotions'],
      },
    ],
    results: [
      '300+ stores across India, concentrated in Gujarat, Maharashtra, and Andhra Pradesh.',
      '₹50,000+ crore annual revenue in FY2024, growing at 15–20% CAGR consistently.',
      'Avenue Supermarts market cap exceeding ₹2.5 lakh crore on NSE.',
      'Industry-leading EBITDA margins of 8–9% vs. industry average of 3–5%.',
      'One of the few retail chains in India to have been profitable every single year since inception in 2002.',
    ],
    resultsNote: "Many retailers prioritize rapid expansion. DMart demonstrated that disciplined, slow growth anchored in operational efficiency and real estate ownership creates far more durable retail leadership.",
    insight: "DMart's genius is its compounding flywheel: Owned real estate → lower costs → lower prices → higher footfall → better supplier terms → lower costs. Radhakishan Damani, a legendary value investor, applied the same margin-of-safety thinking to retail that he used in the stock market.",
  },

  'rise-of-amul': {
    id: 'a1', title: 'The Rise of Amul', slug: 'rise-of-amul',
    industry: 'FMCG / Dairy', founded: '1946',
    founder: 'Tribhuvandas Patel (Dr. Verghese Kurien)', headquarters: 'Anand, Gujarat',
    metrics: '₹55,000Cr+ Revenue | 3.6M+ Farmers | 60+ Years of Icon Status',
    coverImage: '/amul.jpeg',
    seoTitle: "The Rise of Amul — How Brand Consistency Built India's Most Recognised Mascot",
    seoDescription: "In-depth case study on Amul's brand consistency strategy and how the Utterly Butterly girl became India's most iconic mascot across six decades.",
    tagline: "Same Face. Every Time. That's Why You Remember It.",
    problem: "In post-independence India, dairy farmers were exploited by middlemen who controlled pricing, procurement, and distribution. The consumer had no trusted national dairy brand, and farmers had no collective bargaining power.",
    problemPoints: [
      "Dairy farmers received a fraction of retail price — middlemen captured 70–80% of the value chain.",
      "No standardised, trusted milk or butter brand existed at national scale — the market was hyper-local and fragmented.",
      "Imported dairy products dominated premium shelves, leaving Indian consumers without an aspirational yet affordable domestic alternative.",
    ],
    strategy: [
      {
        title: 'Cooperative Model — Power to Farmers',
        desc: 'Amul was built on Anand Pattern cooperatives — a model where farmers own the entire value chain from milk procurement to processing to retail distribution. This created structural loyalty: the producers were also the owners.',
        points: ['3.6 million+ farmer-members across Gujarat', 'Farmer-owned cooperatives control procurement and pricing', 'Surplus redistributed to farmers — eliminating middlemen permanently'],
      },
      {
        title: 'The Utterly Butterly Girl — Brand Consistency',
        desc: 'Since 1966, the same blue-haired Amul girl has appeared in topical, witty advertisements commenting on current events. This single mascot, maintained with absolute consistency for 60+ years, has become India\'s most recognised advertising icon.',
        points: ['Topical hoardings changed weekly — always same mascot, always same wit', 'Created cultural relevance without ever changing the brand identity', 'Zero celebrity endorsers — the mascot IS the brand'],
      },
      {
        title: 'Affordable Aspirational Positioning',
        desc: 'Amul never positioned itself as cheap — it positioned itself as the quality dairy brand that every Indian could afford. "The Taste of India" was not a tagline; it was a strategic claim on national identity.',
        points: ['Products priced for mass access without sacrificing perceived quality', 'Distribution in 1M+ retail touchpoints across urban and rural India', 'Consistent packaging and product quality across decades builds ritual purchase behaviour'],
      },
    ],
    results: [
      '₹55,000+ crore annual turnover — India\'s largest food products organisation.',
      '3.6 million+ farmer-members across 18,600+ village milk cooperative societies.',
      'Amul butter — India\'s #1 butter brand for 60+ consecutive years without interruption.',
      'Zero advertising cost for the mascot campaign relative to the brand equity generated.',
      'Successfully expanded into ice cream, cheese, chocolates, beverages, and fresh milk — all under one trusted umbrella.',
    ],
    resultsNote: "Amul proved that a brand built on cooperative ownership, consistent visual identity, and cultural wit can outlast every trend, every competitor, and every crisis. The Amul girl has survived liberalisation, globalisation, the internet, and social media.",
    insight: "Amul's greatest strategic insight was that brand consistency compounds like interest. Every week for 60 years, the same mascot, the same wit, the same warmth — and each impression reinforced all the ones before it. Most brands chase novelty. Amul chose repetition. And repetition won.",
  },

  'rise-of-fevicol': {
    id: 'f1', title: 'The Rise of Fevicol', slug: 'rise-of-fevicol',
    industry: 'Adhesives / Construction Chemicals', founded: '1959',
    founder: 'Balvant Parekh', headquarters: 'Mumbai, Maharashtra',
    metrics: '70%+ Market Share | ₹10,000Cr+ Group Revenue | #1 Adhesive Brand',
    coverImage: '/fevicol.jpeg',
    seoTitle: "The Rise of Fevicol — How Brand Association Built India's Strongest Bond",
    seoDescription: "In-depth case study on Fevicol's brand association strategy and how it became synonymous with bonding itself — not just adhesive.",
    tagline: "Strong Brands Don't Convince. They Associate.",
    problem: "In the late 1950s, Indian carpenters and joiners relied on animal hide-based glue — a product that was messy, weak, and had no standardised quality. The adhesive market was commoditised, fragmented, and trust-deficit.",
    problemPoints: [
      "Animal hide glue was inconsistent in quality — performance varied batch to batch, undermining carpenter confidence.",
      "No branded adhesive had established trust or recall in the carpenter community, which was the primary B2B channel for any adhesive brand.",
      "Consumer awareness of synthetic adhesives was near zero — education and adoption were the primary barriers to market creation.",
    ],
    strategy: [
      {
        title: 'Carpenter Community First — B2B Trust as Growth Engine',
        desc: "Fevicol's first customers were not end consumers — they were carpenters. Pidilite built deep relationships with the carpenter community through demonstrations, training, and consistent product performance. Carpenters became unpaid brand ambassadors who specified Fevicol on every job.",
        points: ['Direct engagement with 1M+ carpenters across India', 'Sponsored tools, training, and carpenter associations', 'Carpenters recommended Fevicol to consumers — zero advertising required at point of sale'],
      },
      {
        title: 'The Two-Elephant Logo — Irresistible Association',
        desc: "Fevicol's two-elephant logo — two elephants pulling away from each other, held by a bond that won't break — is one of India's most powerful visual metaphors. It communicates the product promise without a single word.",
        points: ['Visual metaphor of strength replaced all technical product claims', 'Logo memorable in a largely pre-literate contractor market', 'Consistent logo across 60+ years created unaided brand recall above 90%'],
      },
      {
        title: 'Advertising That Entered Culture',
        desc: 'Fevicol\'s advertising, created by Ogilvy, became a cultural phenomenon — humorous, distinctly Indian, always centred on the single idea of an unbreakable bond. The ads never explained the product. They owned the feeling.',
        points: ['Award-winning campaigns that aired on national television for decades', '"Fevicol ka jod" entered everyday Indian vocabulary as a universal metaphor', 'Zero product demonstration — pure emotion and cultural resonance'],
      },
    ],
    results: [
      '70%+ market share in the organised white glue segment — the dominant adhesive brand in India by an extraordinary margin.',
      "Pidilite Industries (Fevicol's parent) is a ₹1 lakh crore+ market cap company listed on NSE/BSE.",
      '₹10,000+ crore consolidated group revenue across adhesives, sealants, and construction chemicals.',
      '"Fevicol" has become a common noun in Hindi — used to describe any strong bond, regardless of brand.',
      'Expanded into Dr. Fixit waterproofing, M-Seal, and Steelgrip — all leveraging the same trust equity.',
    ],
    resultsNote: "Fevicol never sold adhesive. It sold the concept of an unbreakable bond — and made that concept so culturally rooted that no competitor could ever claim it. Brand association, not product features, is the deepest moat in FMCG.",
    insight: "Fevicol's lesson for every founder: own a feeling, not a feature. Features can be replicated. Feelings cannot. When your brand name becomes the verb — 'put Fevicol on it' — you have won a competition that price can never touch.",
  },

  'rise-of-lifebuoy': {
    id: 'l1', title: 'The Rise of Lifebuoy', slug: 'rise-of-lifebuoy',
    industry: 'FMCG / Personal Care', founded: '1895',
    founder: 'William Hesketh Lever (Lever Brothers)', headquarters: 'Mumbai, India (HUL)',
    metrics: '130+ Years | #1 Hygiene Soap Brand | Sold in 50+ Countries',
    coverImage: '/lifebuoy.jpeg',
    seoTitle: "The Rise of Lifebuoy — How a Hygiene Brand Built 130 Years of Trust",
    seoDescription: "In-depth case study on how Lifebuoy owned the hygiene-protection narrative for over a century to build one of India's most trusted consumer brands.",
    tagline: "Trust Is a Byproduct of Protection.",
    problem: "In the late 19th and early 20th centuries, disease and hygiene were critical public health crises across the British Empire and colonial India. Cholera, typhoid, and dysentery were mass killers — and soap was not a habit for most of the population.",
    problemPoints: [
      "Soap was perceived as a luxury — most Indian and lower-income households did not use soap as a daily hygiene ritual.",
      "No brand had positioned soap as a disease-prevention tool rather than a cosmetic or cleaning product.",
      "Public health infrastructure was near-absent — there was a genuine population-level need for accessible, affordable hygiene products.",
    ],
    strategy: [
      {
        title: 'Own the Hygiene-Protection Narrative',
        desc: "Lifebuoy never marketed soap — it marketed survival. From its earliest advertising to its 21st-century campaigns, Lifebuoy consistently owned a single narrative: washing hands with Lifebuoy protects your family. This is not a product benefit. It is a moral imperative.",
        points: ['Campaigns linked Lifebuoy use to disease prevention, not cleanliness or beauty', '"Lifebuoy hai jahan, tandurusti hai wahan" — positioned as a health intervention', 'Made hygiene an aspiration and a responsibility, not a habit'],
      },
      {
        title: 'Mass Market Price Architecture',
        desc: "Lifebuoy has been consistently one of the most affordable soaps in every market it operates in. This was a deliberate strategic choice — reach scale, not margin. By being accessible to the bottom of the pyramid, Lifebuoy built the largest consumer base of any soap brand in India.",
        points: ['Priced for BOP (Base of Pyramid) consumers without sacrificing brand trust', 'Available in every kirana store, rural cooperative, and urban chemist', 'Small SKUs (single-use sachets, travel bars) to reach the most price-sensitive households'],
      },
      {
        title: 'Purpose-Driven Marketing at Scale',
        desc: "Lifebuoy's 'Help a Child Reach 5' campaign (2013–2015) linked handwashing to child survival — the most emotionally resonant hygiene campaign ever run. It changed hand-washing behaviour in villages across India, Bangladesh, and Sub-Saharan Africa.",
        points: ['Behaviour change marketing — not product advertising', 'Partnered with NGOs, governments, and schools for mass adoption', 'Campaign won global effectiveness awards and measurably reduced diarrhoeal disease incidence'],
      },
    ],
    results: [
      "India's #1 antibacterial soap brand — consistently for over five decades.",
      'Sold in 50+ countries — one of Unilever\'s largest global volume brands.',
      'Survived 130+ years, two world wars, a pandemic, and complete ownership changes — brand equity fully intact.',
      'COVID-19 revitalised growth — Lifebuoy became the default hygiene brand during the 2020 pandemic globally.',
      'Lifebuoy handwash campaigns reached 1 billion+ people across public health interventions.',
    ],
    resultsNote: "Lifebuoy's century of trust was not built through advertising spend — it was built through consistent ownership of a single, universal human value: protecting the people you love. When a brand stands for something real, time only makes it stronger.",
    insight: "Lifebuoy demonstrates the compounding power of purpose. A brand that stands for genuine protection — not just clean hands — earns a place in the consumer's moral framework, not just their shopping basket. You cannot buy that position. You have to earn it, year after year.",
  },

  'rise-of-maggi': {
    id: 'm1', title: 'The Rise of Maggi', slug: 'rise-of-maggi',
    industry: 'FMCG / Packaged Foods', founded: '1983 (India launch)',
    founder: 'Nestlé (Julius Maggi, Switzerland)', headquarters: 'Gurgaon, Haryana (Nestlé India)',
    metrics: '70%+ Market Share | ₹4,000Cr+ Revenue | Survived a National Ban',
    coverImage: '/maggi.jpeg',
    seoTitle: "The Rise of Maggi — How Habit-Building Created India's Most Resilient Food Brand",
    seoDescription: "In-depth case study on how Maggi built a habit so deep that it survived a 5-month national ban and returned stronger than before.",
    tagline: "Habits Don't Need Marketing. They Need Repetition.",
    problem: "In the early 1980s, Indian households had no concept of packaged instant noodles. Cooking was a time-intensive process, working mothers had limited time for weekday meals, and the concept of a 2-minute meal was completely foreign to Indian food culture.",
    problemPoints: [
      "No existing consumer behaviour around instant or packaged noodles — the category had to be created from scratch.",
      "Traditional Indian household gatekeepers (mothers) were sceptical of packaged food as a legitimate meal option, not a snack.",
      "Chinese and Western noodle formats were unfamiliar to most Indian palates — a significant product-market fit challenge.",
    ],
    strategy: [
      {
        title: 'Target the Child, Convert the Mother',
        desc: "Maggi's genius entry strategy was to target children as the primary influencer and mothers as the buyer. Children pulled demand; mothers were won over by the speed, simplicity, and perceived nutrition of a 2-minute meal. This two-pronged approach created a category habit within a single generation.",
        points: ['School children as primary taste adopters and household demand creators', 'Positioned as a healthy, convenient snack — not junk food', 'Free samples distributed in schools to build first-trial and habit formation'],
      },
      {
        title: '"2-Minute Noodles" — The Behavioural Trigger',
        desc: '"2-Minute Noodles" was never a cooking instruction — it was a behavioural cue. It told the mother: this is fast, this is easy, this will not derail your evening. Over 40 years of consistent repetition, this cue became automatic — the default answer to "what do I make quickly?"',
        points: ['Consistent tagline for 40+ years — zero creative pivots on core promise', 'Cooking ritual (boil, add tastemaker) became muscle memory for millions of Indians', '"Mummy bhookh lagi hai" — children asking for Maggi by name, not noodles'],
      },
      {
        title: 'The Ban and the Return — Crisis as Brand Proof',
        desc: "In 2015, Maggi was banned across India after a food safety scare. Nestlé pulled 38,000 tonnes of product. Five months later, Maggi returned — and within 12 months, recovered 57% of its pre-ban market share. The ban proved the depth of the habit. You cannot easily break what is wired into childhood memory.",
        points: ['Return campaign: "We missed you too" — emotional, not defensive', 'Consumer sentiment overwhelmingly supportive despite the ban', 'Faster return than any brand crisis recovery in Indian FMCG history'],
      },
    ],
    results: [
      '70%+ market share in instant noodles — despite dozens of competitors and a full national ban.',
      '₹4,000+ crore annual revenue from Maggi brand alone within Nestlé India.',
      'Survived a 5-month national recall and ban — returned to #1 position within 12 months.',
      '40+ years of category leadership — the word "Maggi" has replaced "noodles" in everyday Indian vocabulary.',
      'Expanded into Maggi masala, sauces, soups, and oats — all powered by the original trust equity.',
    ],
    resultsNote: "The Maggi ban stress-tested the brand's deepest asset: the habit loop. And the habit loop won. When a brand has successfully embedded itself into the daily ritual of hundreds of millions of people, no external crisis can permanently disrupt it — because the craving is not for the product. It is for the memory.",
    insight: "Maggi's lesson is the most powerful one in consumer marketing: habits are the most durable form of brand loyalty. Features get copied. Prices get undercut. Habits don't. The 2-minute cue, the tastemaker ritual, the childhood association — these are not marketing. They are neural pathways. And neural pathways don't have competitors.",
  },
};

const CLIENT_DETAILS: Record<string, Partial<CaseStudy>> = {
  'techflow-systems-2x-revenue': {
    industry: 'Technology / SaaS', metrics: 'MRR 2x | Churn -78% | Sales Cycle -40%',
    problem: 'TechFlow Systems was experiencing rapid but chaotic growth — MRR was growing but churn was eroding gains, the sales process was undefined, and the team had no repeatable revenue system.',
    solution: 'We conducted a full revenue audit, rebuilt the pricing architecture, introduced a structured sales playbook, and implemented a customer success programme to reduce early churn.',
    results: 'MRR doubled in 8 months, churn dropped 78%, and the average sales cycle shortened by 40% — enabling TechFlow to close enterprise deals in under 21 days.',
  },
  'luxe-living-high-ticket-pivot': {
    industry: 'Luxury Retail', metrics: 'AOV 3x | Conversion +45%',
    problem: 'Luxe Living was selling mid-range products with thin margins. The brand had high-end aspirations but its positioning, messaging, and offer structure did not command premium pricing.',
    solution: 'We repositioned the brand upmarket, redesigned the service experience, rebuilt pricing tiers, and created a concierge-led sales model for high-ticket SKUs.',
    results: 'Average order value tripled within six months. Conversion on the premium tier improved by 45%, and the brand established itself as a genuine luxury player.',
  },
  'apex-logistics-operational-overhaul': {
    industry: 'Logistics & Supply Chain', metrics: 'COGS -32% | Ops Efficiency +60%',
    problem: 'Apex Logistics had grown fast but operationally — routes were inefficient, vendor contracts had not been renegotiated in years, and the team lacked visibility into real-time cost drivers.',
    solution: 'We performed an end-to-end operational audit, renegotiated vendor contracts, introduced route optimisation software, and built a live cost tracking dashboard.',
    results: 'Cost of goods sold dropped 32% within two quarters. Overall operational efficiency improved 60%, and the company moved from breakeven to healthy net margins.',
  },
};

// ── Market Case Detail Page ────────────────────────────────────────────────
const MarketCaseView = ({ cs }: { cs: MarketCase }) => {
  useSEO({ title: cs.seoTitle, description: cs.seoDescription, canonical: `/case-studies/${cs.slug}`, ogType: 'article' });
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-32 pb-24 px-6 md:px-12 bg-brand-black min-h-screen">
      <div className="max-w-4xl mx-auto">
        <Link to="/case-studies" className="text-brand-white/50 text-[10px] uppercase tracking-[0.3em] flex items-center gap-2 mb-12 hover:text-brand-gold transition-colors group">
          <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" /> Back to Case Studies
        </Link>

        <div className="aspect-video overflow-hidden mb-12">
          <img src={cs.coverImage} alt={cs.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        </div>

        <span className="text-brand-gold text-[10px] uppercase tracking-widest block mb-4">Case Study — {cs.industry}</span>
        <h1 className="text-3xl md:text-5xl font-serif text-brand-white mb-4 leading-tight">{cs.title}</h1>
        <p className="text-brand-white/50 text-base mb-10 font-light">{cs.tagline}</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { icon: Building2, label: 'Industry', value: cs.industry },
            { icon: Calendar, label: 'Founded', value: cs.founded },
            { icon: User, label: 'Founder', value: cs.founder },
            { icon: MapPin, label: 'Headquarters', value: cs.headquarters },
          ].map(m => (
            <div key={m.label} className="bg-brand-rich-black border border-brand-divider p-4">
              <div className="flex items-center gap-2 mb-2">
                <m.icon className="w-3 h-3 text-brand-gold" />
                <span className="text-brand-gold text-[9px] uppercase tracking-widest">{m.label}</span>
              </div>
              <p className="text-brand-white text-xs font-serif">{m.value}</p>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-3 p-6 bg-brand-rich-black border border-brand-gold/30 mb-16">
          <TrendingUp className="w-5 h-5 text-brand-gold shrink-0" />
          <p className="text-brand-gold text-sm font-semibold uppercase tracking-widest">{cs.metrics}</p>
        </div>

        {/* Problem */}
        <div className="mb-16">
          <h2 className="text-brand-gold text-[10px] uppercase tracking-[0.35em] mb-5">1. The Market Problem</h2>
          <p className="text-brand-white/70 text-sm leading-relaxed mb-6">{cs.problem}</p>
          <ul className="space-y-3">
            {cs.problemPoints.map((p, i) => (
              <li key={i} className="flex gap-3 text-brand-white/60 text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-gold mt-2 shrink-0" />
                {p}
              </li>
            ))}
          </ul>
        </div>

        {/* Strategy */}
        <div className="mb-16 border-t border-brand-divider pt-14">
          <h2 className="text-brand-gold text-[10px] uppercase tracking-[0.35em] mb-10">2. Core Strategy</h2>
          <div className="space-y-6">
            {cs.strategy.map((s, i) => (
              <div key={i} className="bg-brand-rich-black border border-brand-divider p-8">
                <h3 className="text-lg font-serif text-brand-white mb-4">{s.title}</h3>
                <p className="text-brand-white/60 text-sm leading-relaxed mb-5">{s.desc}</p>
                <ul className="space-y-2">
                  {s.points.map((pt, j) => (
                    <li key={j} className="flex gap-3 text-brand-white/50 text-xs">
                      <span className="w-1 h-1 rounded-full bg-brand-gold mt-1.5 shrink-0" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="mb-16 border-t border-brand-divider pt-14">
          <h2 className="text-brand-gold text-[10px] uppercase tracking-[0.35em] mb-8">3. Results</h2>
          <ul className="space-y-4 mb-8">
            {cs.results.map((r, i) => (
              <li key={i} className="flex gap-4 text-brand-white/70 text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-gold mt-2 shrink-0" />
                {r}
              </li>
            ))}
          </ul>
          <p className="text-brand-white/50 text-sm italic leading-relaxed border-l-2 border-brand-gold/40 pl-5">{cs.resultsNote}</p>
        </div>

        {/* Insight */}
        <div className="bg-brand-rich-black border border-brand-gold/30 p-10 mb-16">
          <h2 className="text-brand-gold text-[10px] uppercase tracking-[0.35em] mb-5">Strategic Insight</h2>
          <p className="text-brand-white font-serif text-lg leading-relaxed">{cs.insight}</p>
        </div>

        <div className="pt-12 border-t border-brand-divider flex flex-col md:flex-row items-center justify-between gap-6">
          <Link to="/case-studies" className="text-brand-gold text-[10px] uppercase tracking-[0.3em]">← More Case Studies</Link>
          <Link to="/contact" className="bg-brand-gold text-brand-black px-8 py-3 uppercase tracking-[0.2em] text-xs font-semibold hover:bg-brand-gold-soft transition-all">Work With Us</Link>
        </div>
      </div>
    </motion.div>
  );
};

// ── Client Case Detail Page ───────────────────────────────────────────────
const ClientCaseView = ({ slug }: { slug: string }) => {
  const [cs, setCs] = useState<CaseStudy | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [seoData, setSeoData] = useState<{ title?: string; description?: string }>({});

  useSEO({
    title: seoData.title,
    description: seoData.description,
    canonical: `/case-studies/${slug}`,
    ogType: 'article',
  });

  useEffect(() => {
    fetch(`/api/case-studies/${slug}`)
      .then(r => { if (!r.ok) throw new Error('not found'); return r.json(); })
      .then((data: CaseStudy) => {
        setCs(data);
        setSeoData({ title: data.seoTitle || data.title, description: data.seoDescription });
        setLoading(false);
      })
      .catch(() => {
        const staticDetail = CLIENT_DETAILS[slug];
        if (staticDetail) {
          const built = { id: slug, title: slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()), slug, createdAt: '', ...staticDetail } as CaseStudy;
          setCs(built);
          setSeoData({ title: built.seoTitle || built.title, description: built.seoDescription });
        } else {
          setNotFound(true);
        }
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="pt-32 pb-24 px-6 md:px-12 bg-brand-black min-h-screen">
        <div className="max-w-3xl mx-auto animate-pulse">
          <div className="h-8 bg-brand-divider mb-8 w-3/4" />
          <div className="aspect-video bg-brand-divider mb-12" />
          {[1, 2, 3].map(i => <div key={i} className="h-4 bg-brand-divider mb-3" />)}
        </div>
      </div>
    );
  }

  if (notFound || !cs) {
    return (
      <div className="pt-32 pb-24 px-6 md:px-12 bg-brand-black min-h-screen text-center">
        <h1 className="text-4xl font-serif text-brand-white mb-6">Case Study Not Found</h1>
        <Link to="/case-studies" className="text-brand-gold uppercase tracking-widest text-xs">← Back to Case Studies</Link>
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-32 pb-24 px-6 md:px-12 bg-brand-black min-h-screen">
      <div className="max-w-4xl mx-auto">
        <Link to="/case-studies" className="text-brand-white/50 text-[10px] uppercase tracking-[0.3em] flex items-center gap-2 mb-12 hover:text-brand-gold transition-colors group">
          <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" /> Back to Case Studies
        </Link>
        <div className="aspect-video overflow-hidden mb-12 bg-brand-divider">
          {cs.coverImage && getImageSrc(cs.coverImage) && (
            <img src={getImageSrc(cs.coverImage, 1200)!} alt={cs.title} className="w-full h-full object-cover" onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
          )}
        </div>
        <span className="text-brand-gold text-[10px] uppercase tracking-widest block mb-4">{cs.industry}</span>
        <h1 className="text-3xl md:text-4xl font-serif text-brand-white mb-8">{cs.title}</h1>
        {cs.metrics && (
          <div className="flex items-center gap-3 p-6 bg-brand-rich-black border border-brand-gold/30 mb-12">
            <TrendingUp className="w-5 h-5 text-brand-gold shrink-0" />
            <p className="text-brand-gold text-sm font-semibold uppercase tracking-widest">{cs.metrics}</p>
          </div>
        )}
        <div className="space-y-10">
          {cs.problem && (
            <div>
              <h2 className="text-brand-gold text-[10px] uppercase tracking-[0.3em] mb-4">The Problem</h2>
              <p className="text-brand-white/70 text-sm leading-relaxed">{cs.problem}</p>
            </div>
          )}
          {cs.solution && (
            <div className="pt-8 border-t border-brand-divider">
              <h2 className="text-brand-gold text-[10px] uppercase tracking-[0.3em] mb-4">Our Solution</h2>
              <p className="text-brand-white/70 text-sm leading-relaxed">{cs.solution}</p>
            </div>
          )}
          {cs.results && (
            <div className="pt-8 border-t border-brand-divider">
              <h2 className="text-brand-gold text-[10px] uppercase tracking-[0.3em] mb-4">The Results</h2>
              <p className="text-brand-white/70 text-sm leading-relaxed">{cs.results}</p>
            </div>
          )}
        </div>
        <div className="mt-16 pt-12 border-t border-brand-divider flex flex-col md:flex-row items-center justify-between gap-6">
          <Link to="/case-studies" className="text-brand-gold text-[10px] uppercase tracking-[0.3em]">← More Case Studies</Link>
          <Link to="/contact" className="bg-brand-gold text-brand-black px-8 py-3 uppercase tracking-[0.2em] text-xs font-semibold hover:bg-brand-gold-soft transition-all">Work With Us</Link>
        </div>
      </div>
    </motion.div>
  );
};

// ── Router ────────────────────────────────────────────────────────────────
export const CaseStudyDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  if (!slug) return null;
  if (MARKET_CASES[slug]) return <MarketCaseView cs={MARKET_CASES[slug]} />;
  return <ClientCaseView slug={slug} />;
};
