import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronRight, TrendingUp, BookOpen, Lightbulb, BarChart2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SectionHeading } from '../components/Common';
import { useSEO } from '../lib/useSEO';

const CATEGORIES = ['All', 'Strategy', 'Revenue', 'Brand', 'Operations', 'Mindset'];

export const INSIGHTS = [
  {
    slug: 'growth-stalling-1-crore',
    title: 'Why Your Growth Is Stalling at \u20b91 Crore',
    category: 'Strategy',
    date: 'April 02, 2026',
    readTime: '7 min read',
    excerpt: 'Most founders hit a ceiling they can not explain. The business is working, clients are happy, but growth has plateaued. The reason is almost never market size or competition. It is structure.',
    image: '1460925895917-afdab827c52f',
    featured: true,
    body: [
      { heading: 'The Plateau Is a Design Problem', text: 'Most founders reaching \u20b91 crore in revenue have gotten there through personal effort \u2014 great service delivery, strong client relationships, and relentless hustle. But at this stage, the very things that created the growth become the ceiling. You are the bottleneck. Your time is the constraint. Your relationships are the pipeline.' },
      { heading: 'Three Structural Breaks at \u20b91 Crore', text: 'The first is the absence of a documented offer. You close deals because you can explain what you do in a room \u2014 but there is no replicable version of that conversation your team can run. The second is informal delivery. Every engagement is custom because the system does not exist yet. The third is a referral-only pipeline. When your only growth channel is word-of-mouth from happy clients, you cannot predict or compound revenue.' },
      { heading: 'What Structure Actually Means', text: 'Structure is not complexity. It is the opposite. A structured business has three things working clearly: a packaged offer with a clear outcome, a delivery system that does not require your presence on every call, and a predictable method of bringing in new clients. When all three exist, you can scale. Until then, you are growing by accident.' },
      { heading: 'The \u20b91 Crore to \u20b95 Crore Move', text: 'Companies that break past \u20b91 crore do not work harder. They work on the business architecture. They productise their service. They hire before they are ready. They build a sales process that converts without them. The ceiling is not the market. The ceiling is the structure you have not built yet.' },
    ],
    insight: 'The \u20b91 crore ceiling is not a market problem. It is a founder problem. Not because founders are not capable \u2014 but because the business is still running on the founder\'s personal operating system. The move to \u20b95 crore requires building a business operating system that can run without you in the room.',
  },
  {
    slug: 'hidden-revenue-leak',
    title: 'The Hidden Revenue Leak Most Founders Never Find',
    category: 'Revenue',
    date: 'March 28, 2026',
    readTime: '5 min read',
    excerpt: 'There is a number your P&L does not show you: the revenue you almost earned. Leads who asked, meetings that went well, proposals that went cold. That invisible number is the real opportunity.',
    image: '1551288049-bebda4e38f71',
    featured: false,
    body: [
      { heading: 'The Invisible Number', text: 'Your P&L shows you what you earned. It does not show you what you almost earned. Every lead who expressed interest and went cold. Every proposal that was "seriously considering it" and never replied. Every client who could have renewed but did not. That invisible number \u2014 for most businesses \u2014 is larger than their actual revenue.' },
      { heading: 'Where the Leak Happens', text: 'The leak is almost always in the follow-up gap. A prospect responds to your first message. You have a good call. You send a proposal. And then you wait. You do not follow up because it feels pushy. You assume if they were interested, they would reply. But in business development, silence is not rejection. It is distraction. Most deals die not because the prospect said no \u2014 but because no one followed through.' },
      { heading: 'The Fix Is Boring but It Works', text: 'Build a 3-touch follow-up sequence for every proposal. Day 3: a brief value-add check-in. Day 7: a specific question about their timeline. Day 14: a clear, polite close \u2014 either move forward or close the conversation. Most businesses stop at one follow-up. Three structured follow-ups increases conversion by 40-60% on existing pipeline without acquiring a single new lead.' },
      { heading: 'The Compounding Effect', text: 'If your pipeline has \u20b950 lakhs in proposals outstanding and you close an additional 20% through systematic follow-up, that is \u20b910 lakhs of revenue from existing pipeline activity. No marketing spend. No new leads. No new product. Just structured persistence on opportunities that already exist.' },
    ],
    insight: 'Revenue lost to inaction costs more than revenue never generated. Fix your pipeline follow-up before you spend a rupee on generating new leads. The fastest growth is in the pipeline you already have.',
  },
  {
    slug: 'zerodha-doing-less',
    title: 'How Zerodha Built a \u20b924,000 Crore Business by Doing Less',
    category: 'Brand',
    date: 'March 22, 2026',
    readTime: '6 min read',
    excerpt: 'Nithin Kamath never ran ads. Never had a sales team. Never discounted. The company grew entirely on community trust and product honesty. There is a lesson in that for every founder.',
    image: '1507679799987-c73779587ccf',
    featured: false,
    body: [
      { heading: 'The Model Everyone Ignored', text: 'When Zerodha launched in 2010, every broker in India was competing on services, research, and relationships. Zerodha competed on transparency and price. Flat \u20b920 per trade, no hidden charges, and a platform that did not lie about what was happening in your portfolio. It sounds obvious now. At the time, every incumbent said it would not work.' },
      { heading: 'No Advertising. No Sales Team.', text: 'Zerodha has never run a television ad. It has no outbound sales team. Every client they have ever acquired came through word of mouth, Varsity (their free education platform), or community trust. Nithin Kamath spent his time building Varsity \u2014 a comprehensive, free stock market education library \u2014 before building Kite, the trading platform. The education created the demand. The product captured it.' },
      { heading: 'The Counter-Intuitive Lesson', text: 'Most founders are addicted to growth marketing. More leads, more conversions, more spend. Zerodha did the opposite: build something so honest and so useful that the product itself generates word of mouth. This is slower in the short run. In the long run, it creates the most durable kind of growth \u2014 compounding trust.' },
      { heading: 'What This Means for Your Business', text: 'You do not need a Zerodha-level product to apply this lesson. You need to ask: what is the one thing we can do better than anyone that our customers would genuinely tell their friends about? And then do only that thing. The narrower the focus, the stronger the word of mouth. Zerodha was the flat-fee broker. That was the whole idea.' },
    ],
    insight: 'Zerodha\'s model proves that the most durable growth strategy is making your product the marketing. When the product itself is remarkable, the cost of acquisition drops to near zero over time. Most companies do not believe this. Zerodha\'s \u20b92,000 crore annual profit is the proof.',
  },
  {
    slug: 'pricing-psychology-premium',
    title: 'Pricing Psychology: Why Charging More Converts Better',
    category: 'Revenue',
    date: 'March 15, 2026',
    readTime: '8 min read',
    excerpt: 'Premium pricing is not arrogance. It is positioning. When you charge what your value demands, you attract clients who respect the process, execute the work, and get results.',
    image: '1519389950473-47ba0277781c',
    featured: false,
    body: [
      { heading: 'The Counterintuitive Truth About Price', text: 'Price is not just a number. It is a signal. When you price low, you signal low risk \u2014 but you also signal low value. The client thinks: if this were truly exceptional, it would cost more. Premium pricing does the opposite. It filters for clients who have already decided this is worth taking seriously. The result is higher execution rate, fewer refund requests, and better outcomes.' },
      { heading: 'The Quality of the Client Changes', text: 'Founders who move from \u20b920,000 to \u20b91,00,000 engagements consistently report the same thing: the work gets easier. Not because the scope is smaller \u2014 but because the client invests differently. They show up prepared. They implement the recommendations. They do not ghost on the second call. High-price clients, on average, get better results \u2014 which means better case studies, better referrals, and a better business.' },
      { heading: 'How to Make the Move', text: 'Start by reframing your offer around outcomes, not activities. Do not sell "12 sessions of strategy consulting." Sell "a documented growth architecture that doubles your pipeline in 6 months." The same work, reframed as a business outcome, commands 3-5x the price. Then raise your price. Not gradually \u2014 sharply. Test it with your next three prospects. You will be surprised how few say no.' },
      { heading: 'The Fear That Holds Founders Back', text: 'Most founders resist premium pricing because they fear rejection. But the rejection they experience at \u20b920,000 comes from different people than the rejection at \u20b91,00,000. Low-price rejections are mostly from people who would never have bought at any serious price. High-price prospects self-select. The conversion rate is often comparable \u2014 with 5x the revenue per engagement.' },
    ],
    insight: 'Undercharging is not humility. It is a failure of belief in the value you create. Raise your price until it is uncomfortable. Then stay there long enough to attract the clients who understand what it means.',
  },
  {
    slug: 'operational-debt-scaling',
    title: 'Operational Debt: The Silent Killer of Scaling Businesses',
    category: 'Operations',
    date: 'March 10, 2026',
    readTime: '6 min read',
    excerpt: 'Technical debt is well known in software. Operational debt is its business equivalent. Every time you make a shortcut in your process, you are borrowing from your future capacity to scale.',
    image: '1551288049-bebda4e38f71',
    featured: false,
    body: [
      { heading: 'What Operational Debt Looks Like', text: 'Operational debt accumulates invisibly. It is the client onboarding that happens differently every time because there is no documented process. It is the team member who handles something a specific way because they learned it from you on a call two years ago. It is the report that takes three hours to produce because no one built the template. Each shortcut feels small in the moment. Compounded over 50 clients, they become the reason you cannot grow.' },
      { heading: 'The Scale Point Where It Breaks', text: 'Most service businesses reach a point \u2014 usually around 8-15 clients simultaneously \u2014 where the founder can no longer hold all the operational knowledge in their head. At that point, the shortcuts they took in year one become critical failures. Clients receive inconsistent service. Delivery timelines slip. The founder spends their time firefighting instead of building.' },
      { heading: 'Paying Down the Debt', text: 'Operational debt is repaid through documentation and systemisation. Start with the three most painful processes in your business \u2014 the ones you personally have to intervene in most often. Build a step-by-step SOP for each. Then transfer ownership to a team member. The first transfer is hard. The second is easier. By the fifth, you have a business that runs without you in the operations.' },
      { heading: 'The ROI of SOPs', text: 'For every hour you invest in documenting a process, you will save 10-50 hours in the next 12 months of execution. More importantly, you will save the hours of rework and client management that come from inconsistent delivery. Operational debt repayment is the highest-ROI activity available to a founder between \u20b91 crore and \u20b910 crore.' },
    ],
    insight: 'Every shortcut you take in your operations today is a loan against your future capacity. The interest compounds. The best time to pay it down was in year one. The second best time is now.',
  },
  {
    slug: 'founder-identity-trap',
    title: 'The Founder Identity Trap',
    category: 'Mindset',
    date: 'March 05, 2026',
    readTime: '5 min read',
    excerpt: 'The business is not you. Most founders struggle to scale because they have fused their identity with the brand. When the business needs to grow beyond you, that fusion becomes the ceiling.',
    image: '1460925895917-afdab827c52f',
    featured: false,
    body: [
      { heading: 'When You Become the Brand', text: 'In the early stages of a business, the founder being the brand is a feature, not a bug. Your personality, your network, your credibility \u2014 these are what clients are buying. But as the business grows, this fusion starts to constrain it. Hiring feels impossible because no one can do it the way you do. Delegation feels like quality sacrifice. Stepping back feels like abandonment.' },
      { heading: 'The Signs You Are Trapped', text: 'You review every deliverable before it goes to the client. You are on every sales call. Your team does not make decisions without you. Client relationships are with you personally, not with the company. Every one of these is a signal that the business cannot survive your absence \u2014 and therefore cannot be scaled, sold, or structured as an asset.' },
      { heading: 'The Separation Process', text: 'Separating your identity from your business does not mean leaving it. It means building the business as a system that delivers value independently of your involvement. Start by identifying the three decisions only you currently make. Ask yourself what information, criteria, or authority would allow a team member to make those decisions without you. Then give it to them and step back. This is uncomfortable. It is also the only path to scale.' },
      { heading: 'The Liberating Truth', text: 'When the business can function without you, it does not need less of you \u2014 it can use more of you, applied to the highest-leverage work: strategy, relationships, and vision. Founders who successfully separate their identity from operations consistently report that they enjoy the business more, not less. They go from being a service provider to being a business builder.' },
    ],
    insight: 'The business is the vehicle. You are the driver, not the engine. The moment you confuse yourself for the machine, you cap the speed at which it can travel. Separate yourself. Build the machine. Then drive it somewhere extraordinary.',
  },
  {
    slug: 'dmart-never-on-sale',
    title: 'Why DMart Never Goes on Sale',
    category: 'Strategy',
    date: 'February 28, 2026',
    readTime: '7 min read',
    excerpt: 'Everyday low prices sound like a discount strategy. They are not. They are a promise. DMart built two decades of profit on the back of one disciplined commitment: never break the promise.',
    image: '1507679799987-c73779587ccf',
    featured: false,
    body: [
      { heading: 'EDLP vs. Promotions: A Fundamental Choice', text: 'Every retailer must choose: do you run promotions, or do you maintain everyday low prices? Most choose promotions because the short-term traffic boost is measurable and addictive. DMart chose EDLP and never wavered. The result is that DMart customers never need to wait for a sale \u2014 they know the price today is the right price. This changes buying behaviour fundamentally.' },
      { heading: 'The Business Model Behind the Promise', text: 'EDLP is only possible if your cost structure supports it. DMart\'s cost structure is uniquely positioned: owned real estate eliminates rent inflation, a limited SKU range maximises inventory velocity, and rapid supplier payment earns consistent rebates. The business model creates the promise. The promise reinforces the business model.' },
      { heading: 'What Promotions Actually Cost', text: 'When a retail business runs promotions, customers learn to wait. Footfall before a sale drops. Margins during a sale collapse. Post-sale, you need another promotion to drive the next traffic spike. The promotional cycle is a trap: once you start, stopping is painful. DMart never started. Twenty years later, its EBITDA margins are 8-9% \u2014 double the Indian retail average.' },
      { heading: 'The Lesson for Non-Retail Businesses', text: 'Every business faces the same choice. Do you discount to close the deal? Or do you set a price that reflects your value, hold it, and attract clients who understand that value? The businesses that maintain pricing discipline build a fundamentally different brand. One that clients respect rather than game.' },
    ],
    insight: 'A discount once is a negotiation. A discount pattern is a brand promise \u2014 the promise that your real price is lower than the one you show. Once you make that promise, your customers will always wait for the next discount. DMart chose the harder path and built the most profitable retailer in India.',
  },
  {
    slug: 'sales-system-without-you',
    title: 'How to Build a Sales System That Works Without You',
    category: 'Revenue',
    date: 'February 20, 2026',
    readTime: '9 min read',
    excerpt: 'If your revenue depends on your personal relationships and your personal sales calls, you do not have a business. You have a high-paying job. Here is what a real sales system looks like.',
    image: '1519389950473-47ba0277781c',
    featured: false,
    body: [
      { heading: 'The Job vs. Business Distinction', text: 'A business generates revenue when the owner is asleep, on holiday, or focused on something else. A job requires the owner\'s active participation to generate income. Most service businesses are jobs dressed in business clothing. The founder closes every deal. The founder delivers every engagement. The founder\'s absence means zero revenue. This is not a business. It is a very complicated employment arrangement.' },
      { heading: 'What a Sales System Has', text: 'A real sales system has five components: a lead source that operates independently of your personal network; a qualification process that identifies serious prospects before they reach a call; a documented conversation structure for sales calls; a proposal template that communicates value without requiring your customisation; and a follow-up sequence that runs automatically after every proposal. When all five exist, someone else can run the system.' },
      { heading: 'Building It Step by Step', text: 'Start with the conversation structure. Record your next five sales calls with consent. Identify the questions and responses that most consistently move prospects toward a yes. Write them down. Now you have a sales script \u2014 not a rigid one, but a framework your team can use. Next, build the follow-up sequence: three emails over 14 days, each adding value and moving toward a decision.' },
      { heading: 'The Role of the Founder in a Mature Sales System', text: 'In a mature business, the founder does not close deals. The founder defines the ideal client, builds the offer architecture, and sets the pricing strategy. Sales execution \u2014 the calls, the proposals, the follow-ups \u2014 is handled by a system and a team. The founder\'s presence in a sale is reserved for strategic relationships and enterprise accounts. Everything else is systematised.' },
    ],
    insight: 'The goal of building a sales system is not to remove yourself from the business. It is to make your involvement optional. When your involvement is optional, your time becomes choice rather than obligation. And when your time is choice, you become exponentially more valuable to the business.',
  },
  {
    slug: 'brand-equity-vs-awareness',
    title: 'Brand Equity vs Brand Awareness: Why Most Founders Confuse Them',
    category: 'Brand',
    date: 'February 14, 2026',
    readTime: '6 min read',
    excerpt: 'Getting your name out there is not building a brand. Amul was not famous because of ads. It was trusted because of consistency. That trust, compounded over decades, became equity.',
    image: '1551288049-bebda4e38f71',
    featured: false,
    body: [
      { heading: 'The Difference That Changes Everything', text: 'Brand awareness is knowing a brand exists. Brand equity is what a brand means to someone. You are aware of thousands of brands. You have equity in perhaps a dozen. The difference between the two is not exposure \u2014 it is experience. Equity is built through repeated, consistent, positive interaction over time. You cannot buy it with a media spend. You earn it through delivery.' },
      { heading: 'Why Founders Prioritise Awareness', text: 'Awareness is measurable in the short term. Impressions, reach, share of voice \u2014 these are trackable metrics that feel like progress. Equity is not measurable in the short term. It shows up in pricing power, client retention, referral rate, and the ability to charge more than competitors for the same service. So founders optimise for awareness and neglect equity.' },
      { heading: 'Amul\'s 60-Year Lesson', text: 'The Amul girl mascot has appeared in Indian advertising every week since 1966. Not once in 60 years did Amul change the mascot to "refresh the brand." The result: a brand so deeply embedded in Indian cultural memory that competitors with larger advertising budgets cannot displace it. Equity was built through consistency, not novelty. Each ad reinforced the last.' },
      { heading: 'How to Build Equity in Your Business', text: 'Brand equity for a B2B service business is built through three things: the quality of your client outcomes (each successful engagement adds equity), the consistency of your communication voice (every post, proposal, and presentation should sound unmistakably like you), and the reliability of your delivery (showing up, on time, at the standard you promised, every time). These compound.' },
    ],
    insight: 'Brand equity is the sum of every consistent action you have taken. It is not built in a campaign. It is built in the daily accumulation of reliable, remarkable work. Awareness gets you known. Equity gets you chosen \u2014 at a premium \u2014 over and over again.',
  },
];

const STAT_INSIGHTS = [
  { number: '67%', text: 'of businesses that plateau at mid-market have a structural problem, not a market problem' },
  { number: '3.4x', text: 'higher close rate when premium pricing is combined with a clear outcome guarantee' },
  { number: '89%', text: 'of founders who hit \u20b910Cr+ revenue cite systems, not skills, as the primary unlock' },
];

const categoryIcon: Record<string, React.ElementType> = {
  Strategy: TrendingUp,
  Revenue: BarChart2,
  Brand: Lightbulb,
  Operations: BookOpen,
  Mindset: BookOpen,
  All: ChevronRight,
};

export const ValueInsights = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  useSEO({
    title: 'Insights \u2014 Strategic Intelligence for Founders',
    description: 'Actionable business strategy insights from The Black Apex Consultancy. Revenue architecture, brand building, operational excellence and founder mindset.',
    canonical: '/insights',
  });

  const filtered = activeCategory === 'All'
    ? INSIGHTS
    : INSIGHTS.filter(i => i.category === activeCategory);

  const featured = filtered.find(i => i.featured) || filtered[0];
  const rest = filtered.filter(i => i !== featured);

  return (
    <div className="bg-brand-black min-h-screen">
      {/* Header */}
      <section className="pt-40 pb-24 px-6 md:px-12 bg-brand-rich-black">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="text-brand-gold text-[10px] uppercase tracking-[0.5em] mb-6 block">Strategic Intelligence</span>
            <h1 className="text-4xl md:text-6xl font-serif text-brand-white mb-8 leading-tight">
              APEX <span className="text-brand-gold italic">INSIGHTS</span>
            </h1>
            <p className="text-brand-white/50 text-lg max-w-2xl leading-relaxed">
              Each piece here is written from inside real engagements. Not theory. The kind of thinking that changes how a founder sees their business.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 pt-16 border-t border-brand-divider">
            {STAT_INSIGHTS.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 + 0.4 }} className="flex gap-6">
                <span className="text-4xl font-serif text-brand-gold shrink-0">{s.number}</span>
                <p className="text-brand-white/40 text-sm leading-relaxed">{s.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter */}
      <div className="sticky top-[72px] z-20 bg-brand-black/95 backdrop-blur border-b border-brand-divider">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex gap-2 overflow-x-auto no-scrollbar">
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`shrink-0 px-5 py-2 text-[10px] uppercase tracking-[0.2em] border transition-all ${activeCategory === cat ? 'bg-brand-gold text-brand-black border-brand-gold' : 'border-brand-divider text-brand-white/50 hover:border-brand-gold/40 hover:text-brand-white'}`}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-20">
        {/* Featured Article */}
        {featured && (
          <Link to={`/insights/${featured.slug}`}>
            <motion.div key={featured.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="group border border-brand-divider hover:border-brand-gold transition-all duration-500 flex flex-col md:flex-row mb-16">
              <div className="md:w-1/2 aspect-video md:aspect-auto overflow-hidden bg-brand-divider">
                <img src={`https://images.unsplash.com/photo-${featured.image}?auto=format&fit=crop&q=80&w=1200`}
                  alt={featured.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer" loading="eager" />
              </div>
              <div className="md:w-1/2 p-10 md:p-14 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-brand-gold text-[10px] uppercase tracking-widest border border-brand-gold/30 px-3 py-1">{featured.category}</span>
                  <span className="text-brand-white/30 text-[10px]">{featured.readTime}</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-serif text-brand-white mb-6 group-hover:text-brand-gold transition-colors leading-snug">{featured.title}</h2>
                <p className="text-brand-white/50 text-sm leading-relaxed mb-8">{featured.excerpt}</p>
                <div className="flex items-center justify-between border-t border-brand-divider pt-6">
                  <span className="text-brand-white/30 text-[10px]">{featured.date}</span>
                  <span className="text-brand-white text-[10px] uppercase tracking-[0.3em] flex items-center gap-2 group-hover:gap-4 transition-all">Read Article <ChevronRight className="w-3 h-3" /></span>
                </div>
              </div>
            </motion.div>
          </Link>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rest.map((post, idx) => {
            const Icon = categoryIcon[post.category] || ChevronRight;
            return (
              <Link key={post.slug} to={`/insights/${post.slug}`}>
                <motion.article initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 }} className="group border border-brand-divider hover:border-brand-gold transition-all duration-500 flex flex-col h-full">
                  <div className="aspect-video bg-brand-divider overflow-hidden">
                    <img src={`https://images.unsplash.com/photo-${post.image}?auto=format&fit=crop&q=80&w=800`}
                      alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer" loading="lazy" />
                  </div>
                  <div className="p-8 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-4">
                      <Icon className="w-3 h-3 text-brand-gold" />
                      <span className="text-brand-gold text-[10px] uppercase tracking-widest">{post.category}</span>
                      <span className="text-brand-white/20 text-[10px] ml-auto">{post.readTime}</span>
                    </div>
                    <h3 className="text-lg font-serif text-brand-white mb-4 group-hover:text-brand-gold transition-colors leading-snug flex-1">{post.title}</h3>
                    <p className="text-brand-white/40 text-xs leading-relaxed mb-6">{post.excerpt}</p>
                    <div className="flex items-center justify-between border-t border-brand-divider pt-5">
                      <span className="text-brand-white/25 text-[10px]">{post.date}</span>
                      <span className="text-brand-white text-[10px] uppercase tracking-[0.3em] flex items-center gap-1 group-hover:gap-3 transition-all">Read <ChevronRight className="w-3 h-3" /></span>
                    </div>
                  </div>
                </motion.article>
              </Link>
            );
          })}
        </div>

        {/* Deep Insight Block */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-0 border border-brand-divider">
          <div className="p-12 md:p-16 bg-brand-rich-black border-b md:border-b-0 md:border-r border-brand-divider">
            <span className="text-brand-gold text-[10px] uppercase tracking-[0.4em] mb-8 block">Apex Perspective</span>
            <h3 className="text-2xl md:text-3xl font-serif text-brand-white leading-snug mb-6">
              Most businesses do not have a growth problem. They have a clarity problem.
            </h3>
            <p className="text-brand-white/50 text-sm leading-relaxed">
              When a founder cannot clearly explain what makes them different, why a client should pay a premium, and what the next 12 months of growth look like structurally, no amount of marketing will solve it. Clarity precedes strategy. Strategy precedes scale.
            </p>
          </div>
          <div className="p-12 md:p-16 flex flex-col justify-between">
            <div>
              <h4 className="text-lg font-serif text-brand-white mb-6">Subscribe to the Apex Intelligence</h4>
              <p className="text-brand-white/40 text-sm leading-relaxed mb-8">One strategic insight per month. No noise, no generic business advice. The kind of thinking that changes how you see your business.</p>
            </div>
            <div className="flex flex-col gap-3">
              <input type="email" placeholder="Your email address"
                className="bg-brand-black border border-brand-divider px-5 py-4 text-brand-white text-sm focus:border-brand-gold outline-none transition-colors placeholder-brand-white/20" />
              <button className="bg-brand-gold text-brand-black px-8 py-4 uppercase tracking-[0.2em] text-xs font-semibold hover:bg-brand-gold-soft transition-all">Subscribe</button>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <p className="text-brand-white/40 text-sm mb-8">These insights come from inside real client engagements. Ready to apply them?</p>
          <Link to="/contact" className="bg-brand-gold text-brand-black px-10 py-4 uppercase tracking-[0.2em] text-xs font-semibold hover:bg-brand-gold-soft transition-all inline-flex items-center gap-3">
            Talk to Our Strategists <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
