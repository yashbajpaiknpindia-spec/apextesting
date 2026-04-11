import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  FileText, Briefcase, Plus, LogOut, Edit, Trash2, Eye, EyeOff, Home,
  Upload, Search, X, Check, CheckCircle, AlertCircle, Globe, BarChart2,
} from 'lucide-react';
import { getImageSrc } from '../../lib/utils';

type Post = { id: string; title: string; slug: string; published: boolean; createdAt: string; excerpt?: string };
type CaseStudy = { id: string; title: string; slug: string; published: boolean; createdAt: string; industry?: string };
type ToastItem = { id: number; message: string; type: 'success' | 'error' };

// ── Market Case Studies (static, editable via form stored in localStorage) ──
type MarketCaseAdmin = {
  id: string; slug: string; title: string; industry: string; metrics: string;
  tagline: string; founded: string; founder: string; headquarters: string;
  coverImage: string; problem: string; insight: string; published: boolean;
};

const MARKET_CASES_DEFAULT: MarketCaseAdmin[] = [
  { id: 'z1', slug: 'rise-of-zerodha', title: 'The Rise of Zerodha', industry: 'FinTech / Stock Brokerage', metrics: '12M+ Clients | $3B+ Valuation | ₹2,000Cr Annual Profit', tagline: "How a Bootstrapped Startup Disrupted India's Brokerage Industry", founded: '2010', founder: 'Nithin Kamath', headquarters: 'Bengaluru, Karnataka', coverImage: '/zerodha.jpeg', problem: 'High brokerage fees, complex platforms, and limited retail participation kept equity markets inaccessible to ordinary Indians.', insight: "Zerodha's moat is radical transparency, a delightful platform, and an education engine that creates its own future customers.", published: true },
  { id: 'b1', slug: 'rise-of-boat', title: 'The Rise of boAt', industry: 'Consumer Electronics / Audio', metrics: '100M+ Products Sold | $500M+ Revenue | #1 Audio Brand', tagline: "How a D2C Brand Dominated India's Audio Market", founded: '2016', founder: 'Aman Gupta & Sameer Mehta', headquarters: 'New Delhi, India', coverImage: '/boat.jpeg', problem: "India's audio market was split between unaffordable global brands and unreliable local products with no youth identity.", insight: "boAt's real product was not the earphone — it was the identity it gave its customer.", published: true },
  { id: 'd1', slug: 'rise-of-dmart', title: 'The Rise of DMart', industry: 'Retail / Supermarket', metrics: '300+ Stores | ₹50,000Cr Revenue | 20+ Years of Profitability', tagline: "How Operational Discipline Built India's Most Efficient Retail Chain", founded: '2002', founder: 'Radhakishan Damani', headquarters: 'Mumbai, Maharashtra', coverImage: '/dmart.jpeg', problem: 'Indian retail was fragmented and unprofitable — thin margins, high real estate costs, and inventory chaos plagued all major chains.', insight: "DMart's genius is its compounding flywheel: Owned real estate → lower costs → lower prices → higher footfall → better supplier terms.", published: true },
  { id: 'a1', slug: 'rise-of-amul', title: 'The Rise of Amul', industry: 'FMCG / Dairy', metrics: '₹55,000Cr+ Revenue | 3.6M+ Farmers | 60+ Years of Icon Status', tagline: "Same Face. Every Time. That's Why You Remember It.", founded: '1946', founder: 'Tribhuvandas Patel (Dr. Verghese Kurien)', headquarters: 'Anand, Gujarat', coverImage: '/amul.jpeg', problem: 'Dairy farmers were exploited by middlemen, and no trusted national dairy brand existed at scale in India.', insight: "Amul's greatest insight: brand consistency compounds like interest. Repetition won over novelty.", published: true },
  { id: 'f1', slug: 'rise-of-fevicol', title: 'The Rise of Fevicol', industry: 'Adhesives / Construction Chemicals', metrics: '70%+ Market Share | ₹10,000Cr+ Group Revenue | #1 Adhesive Brand', tagline: "Strong Brands Don't Convince. They Associate.", founded: '1959', founder: 'Balvant Parekh', headquarters: 'Mumbai, Maharashtra', coverImage: '/fevicol.jpeg', problem: 'The adhesive market was commoditised, fragmented, and trust-deficit — animal hide glue was inconsistent and unbranded.', insight: "Own a feeling, not a feature. When your brand name becomes the verb, price can never touch you.", published: true },
  { id: 'l1', slug: 'rise-of-lifebuoy', title: 'The Rise of Lifebuoy', industry: 'FMCG / Personal Care', metrics: '130+ Years | #1 Hygiene Soap Brand | 50+ Countries', tagline: "Trust Is a Byproduct of Protection.", founded: '1895', founder: 'William Hesketh Lever (Lever Brothers)', headquarters: 'Mumbai, India (HUL)', coverImage: '/lifebuoy.jpeg', problem: 'Soap was a luxury for most Indians; no brand had positioned it as a disease-prevention necessity.', insight: "A brand that stands for genuine protection earns a place in the consumer's moral framework, not just their shopping basket.", published: true },
  { id: 'm1', slug: 'rise-of-maggi', title: 'The Rise of Maggi', industry: 'FMCG / Packaged Foods', metrics: '70%+ Market Share | ₹4,000Cr+ Revenue | Survived a National Ban', tagline: "Habits Don't Need Marketing. They Need Repetition.", founded: '1983 (India launch)', founder: 'Nestlé (Julius Maggi, Switzerland)', headquarters: 'Gurgaon, Haryana (Nestlé India)', coverImage: '/maggi.jpeg', problem: 'No category for instant noodles existed in India; Indian households had no concept of a 2-minute packaged meal.', insight: "Habits are the most durable form of brand loyalty. Neural pathways don't have competitors.", published: true },
  { id: 'ril1', slug: 'rise-of-reliance-retail', title: 'The Rise of Reliance Retail', industry: 'Retail / Conglomerate', metrics: "18,000+ Stores | ₹2.6L Cr Revenue | India's Largest Retailer", tagline: 'How Ambani Conquered Every Corner of Indian Retail', founded: '2006', founder: 'Mukesh Ambani', headquarters: 'Mumbai, Maharashtra', coverImage: '/reliance-retail.jpeg', problem: 'Fragmented Indian retail with no dominant omnichannel player at scale.', insight: 'Vertical integration plus physical-digital convergence creates a moat no single-channel player can replicate.', published: true },
  { id: 'hdfc1', slug: 'rise-of-hdfc-bank', title: 'The Rise of HDFC Bank', industry: 'Banking / Finance', metrics: '8.7Cr+ Customers | ₹7L Cr+ Advances | Most Valued Bank in India', tagline: "Consistency Built India's Most Trusted Private Bank", founded: '1994', founder: 'Hasmukhbhai Parekh', headquarters: 'Mumbai, Maharashtra', coverImage: '/hdfc-bank.jpeg', problem: 'Indian banking was dominated by inefficient public sector banks with poor service and limited reach.', insight: 'Operational discipline and technology-first banking compounded trust over three decades into an unassailable moat.', published: true },
  { id: 'ola1', slug: 'rise-of-ola', title: 'The Rise of Ola', industry: 'Mobility / Transportation', metrics: '250M+ Users | 20+ Countries | Redefined Urban Mobility', tagline: 'How a College Project Became a Global Mobility Giant', founded: '2010', founder: 'Bhavish Aggarwal', headquarters: 'Bengaluru, Karnataka', coverImage: '/ola.jpeg', problem: 'Urban India had no reliable, affordable, and scalable taxi service at city scale.', insight: 'Aggregating supply before demand created a two-sided network effect that became self-reinforcing at scale.', published: true },
  { id: 'flipkart1', slug: 'rise-of-flipkart', title: 'The Rise of Flipkart', industry: 'E-Commerce / Retail', metrics: '$37.6B Acquisition | 350M+ Users | Pioneered Indian E-Commerce', tagline: "How Two IITians Built India's First E-Commerce Giant", founded: '2007', founder: 'Sachin Bansal & Binny Bansal', headquarters: 'Bengaluru, Karnataka', coverImage: '/flipkart.jpeg', problem: 'No trusted online retail infrastructure existed in India. Cash on delivery, logistics and trust were all unsolved.', insight: 'Building trust through COD and category focus created the foundational infrastructure an entire industry then built on.', published: true },
  { id: 'razorpay1', slug: 'rise-of-razorpay', title: 'The Rise of Razorpay', industry: 'FinTech / Payments Infrastructure', metrics: '$7.5B Valuation | 8M+ Businesses | B2B Payments Leader', tagline: 'How Two IIT Roorkee Graduates Became the Backbone of Indian Payments', founded: '2014', founder: 'Harshil Mathur & Shashank Kumar', headquarters: 'Bengaluru, Karnataka', coverImage: '/razorpay.jpeg', problem: 'Payment gateway integration in India required 3-6 months and a physical office. Startups and SMEs were locked out.', insight: 'Developer-first onboarding turned a compliance-heavy business into a self-serve growth engine that every startup needed.', published: true },
  { id: 'dream111', slug: 'rise-of-dream11', title: 'The Rise of Dream11', industry: 'Fantasy Sports / Gaming', metrics: "$8B Valuation | 200M+ Users | India's First Gaming Unicorn", tagline: "How Fantasy Cricket Became India's Biggest Gaming Phenomenon", founded: '2008', founder: 'Harsh Jain & Bhavit Sheth', headquarters: 'Mumbai, Maharashtra', coverImage: '/dream11.jpeg', problem: 'Cricket fans wanted to participate in the sport, not just watch. No engagement layer existed beyond the TV screen.', insight: 'Tapping into the emotional ownership fans already feel about cricket turned passive viewership into active financial investment.', published: true },
  { id: 'groww1', slug: 'rise-of-groww', title: 'The Rise of Groww', industry: 'FinTech / Investment Platform', metrics: '$3B Valuation | 40M+ Users | Simplified Retail Investing', tagline: "How Groww Brought India's Middle Class to the Stock Market", founded: '2016', founder: 'Lalit Keshre, Harsh Jain, Neeraj Singh, Ishan Bansal', headquarters: 'Bengaluru, Karnataka', coverImage: '/groww.jpeg', problem: 'Investing felt complex, jargon-heavy and intimidating for first-time Indian investors. Platforms served experts, not beginners.', insight: 'Radical simplicity at the point of first action removes the friction that keeps the majority permanently on the sideline.', published: true },
  { id: 'meesho1', slug: 'rise-of-meesho', title: 'The Rise of Meesho', industry: 'Social Commerce / D2C', metrics: '$5B Valuation | 150M+ Users | Tier 2 India Commerce', tagline: 'How Meesho Made Every Housewife a Business Owner', founded: '2015', founder: 'Vidit Aatrey & Sanjeev Barnwal', headquarters: 'Bengaluru, Karnataka', coverImage: '/meesho.jpeg', problem: 'Rural and Tier 2/3 India had no accessible route into e-commerce, either as buyers or sellers.', insight: 'Making the seller the distribution channel creates a trust layer that no ad budget can buy.', published: true },
];

function getMarketCases(): MarketCaseAdmin[] {
  try {
    const stored = localStorage.getItem('apex_market_cases');
    if (stored) return JSON.parse(stored);
  } catch {}
  return MARKET_CASES_DEFAULT;
}

function saveMarketCases(cases: MarketCaseAdmin[]) {
  try { localStorage.setItem('apex_market_cases', JSON.stringify(cases)); } catch {}
}

const formatDate = (d: string) => new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

// ─── Toast System ──────────────────────────────────────────────────────────────
const Toasts = ({ toasts, remove }: { toasts: ToastItem[]; remove: (id: number) => void }) => (
  <div className="fixed top-6 right-6 z-[200] flex flex-col gap-3 pointer-events-none">
    <AnimatePresence>
      {toasts.map(t => (
        <motion.div
          key={t.id}
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 60 }}
          transition={{ type: 'spring', damping: 20, stiffness: 260 }}
          className={`pointer-events-auto flex items-center gap-3 px-5 py-3 border text-sm shadow-xl ${
            t.type === 'success'
              ? 'bg-brand-rich-black border-brand-gold/50 text-brand-white'
              : 'bg-brand-rich-black border-red-700/60 text-brand-white'
          }`}
        >
          {t.type === 'success'
            ? <CheckCircle className="w-4 h-4 text-brand-gold shrink-0" />
            : <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />}
          <span className="text-sm">{t.message}</span>
          <button onClick={() => remove(t.id)} className="ml-2 text-brand-white/40 hover:text-brand-white">
            <X className="w-3 h-3" />
          </button>
        </motion.div>
      ))}
    </AnimatePresence>
  </div>
);

function useToast() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const add = (message: string, type: 'success' | 'error' = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3500);
  };
  const remove = (id: number) => setToasts(prev => prev.filter(t => t.id !== id));
  return { toasts, add, remove };
}

// ─── Confirm Modal ─────────────────────────────────────────────────────────────
const ConfirmModal = ({
  message, onConfirm, onCancel,
}: { message: string; onConfirm: () => void; onCancel: () => void }) => (
  <div className="fixed inset-0 bg-black/75 z-[150] flex items-center justify-center px-4">
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-sm bg-brand-rich-black border border-brand-divider p-8"
    >
      <AlertCircle className="w-8 h-8 text-brand-gold mb-4" />
      <p className="text-brand-white text-sm mb-8 leading-relaxed">{message}</p>
      <div className="flex gap-3 justify-end">
        <button
          onClick={onCancel}
          className="px-5 py-2.5 border border-brand-divider text-brand-white/60 text-[10px] uppercase tracking-widest hover:text-brand-white transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="px-5 py-2.5 bg-red-900/80 border border-red-700/60 text-red-300 text-[10px] uppercase tracking-widest hover:bg-red-800 transition-colors flex items-center gap-2"
        >
          <Trash2 className="w-3 h-3" /> Delete
        </button>
      </div>
    </motion.div>
  </div>
);

// ─── Image Upload Field ────────────────────────────────────────────────────────
const ImageUploadField = ({ value, onSet, sizeError, setSizeError }: {
  value: string;
  onSet: (v: string) => void;
  sizeError: boolean;
  setSizeError: (v: boolean) => void;
}) => {
  const fileRef = useRef<HTMLInputElement>(null);
  const isBase64 = value?.startsWith('data:');
  const [mode, setMode] = useState<'url' | 'upload'>(isBase64 ? 'upload' : 'url');

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSizeError(false);
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2.5 * 1024 * 1024) {
      setSizeError(true);
      if (fileRef.current) fileRef.current.value = '';
      return;
    }
    const reader = new FileReader();
    reader.onload = () => onSet(reader.result as string);
    reader.readAsDataURL(file);
  };

  const previewSrc = getImageSrc(value, 600);

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="text-brand-white/50 text-[10px] uppercase tracking-[0.2em]">Cover Image</label>
        <div className="flex border border-brand-divider">
          <button
            type="button"
            onClick={() => setMode('url')}
            className={`px-3 py-1 text-[9px] uppercase tracking-widest transition-colors ${mode === 'url' ? 'bg-brand-gold text-brand-black' : 'text-brand-white/40 hover:text-brand-white'}`}
          >URL</button>
          <button
            type="button"
            onClick={() => setMode('upload')}
            className={`px-3 py-1 text-[9px] uppercase tracking-widest transition-colors ${mode === 'upload' ? 'bg-brand-gold text-brand-black' : 'text-brand-white/40 hover:text-brand-white'}`}
          >Upload</button>
        </div>
      </div>

      {mode === 'url' ? (
        <input
          type="text"
          value={isBase64 ? '' : (value || '')}
          onChange={e => { setSizeError(false); onSet(e.target.value); }}
          placeholder="https://... or Unsplash photo ID (e.g. 1460925895917-afdab827c52f)"
          className="w-full bg-brand-black border border-brand-divider focus:border-brand-gold text-brand-white px-4 py-3 outline-none transition-colors text-sm"
        />
      ) : (
        <div
          role="button"
          tabIndex={0}
          onClick={() => fileRef.current?.click()}
          onKeyDown={e => e.key === 'Enter' && fileRef.current?.click()}
          className="w-full bg-brand-black border border-brand-divider hover:border-brand-gold text-brand-white/50 px-4 py-3 text-sm cursor-pointer transition-colors flex items-center gap-3"
        >
          <Upload className="w-4 h-4 text-brand-gold shrink-0" />
          <span>{isBase64 ? 'Click to replace image' : 'Click to upload image'}</span>
          <span className="ml-auto text-[10px] text-brand-white/30">Max 2.5 MB</span>
          <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
        </div>
      )}

      {sizeError && (
        <p className="text-red-400 text-[10px] mt-1.5">Image exceeds 2.5 MB. Please choose a smaller file or compress it first.</p>
      )}

      {previewSrc && (
        <div className="mt-3 relative group">
          <img src={previewSrc} alt="Cover preview" className="w-full aspect-video object-cover border border-brand-divider" />
          <button
            type="button"
            onClick={() => { onSet(''); setSizeError(false); if (fileRef.current) fileRef.current.value = ''; }}
            className="absolute top-2 right-2 bg-black/70 text-white/60 hover:text-red-400 p-1.5 rounded transition-colors opacity-0 group-hover:opacity-100"
            title="Remove image"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}
    </div>
  );
};

// ─── FormField — defined OUTSIDE ContentForm so React never remounts on re-render ───
interface InputProps {
  label: string;
  field: string;
  type?: string;
  rows?: number;
  form: Record<string, any>;
  onSet: (k: string, v: any) => void;
  isNew?: boolean;
  autoSlug?: (title: string) => string;
}

const FormField = ({ label, field, type = 'text', rows, form, onSet, isNew, autoSlug }: InputProps) => (
  <div>
    <label className="text-brand-white/50 text-[10px] uppercase tracking-[0.2em] block mb-1">{label}</label>
    {rows ? (
      <textarea
        rows={rows}
        value={form[field] || ''}
        onChange={e => onSet(field, e.target.value)}
        className="w-full bg-brand-black border border-brand-divider focus:border-brand-gold text-brand-white px-4 py-3 outline-none transition-colors text-sm resize-none"
      />
    ) : (
      <input
        type={type}
        value={form[field] || ''}
        onChange={e => {
          onSet(field, e.target.value);
          if (field === 'title' && isNew && autoSlug) onSet('slug', autoSlug(e.target.value));
        }}
        className="w-full bg-brand-black border border-brand-divider focus:border-brand-gold text-brand-white px-4 py-3 outline-none transition-colors text-sm"
      />
    )}
  </div>
);

// ─── Markdown Preview ──────────────────────────────────────────────────────────
const MarkdownPreview = ({ content }: { content: string }) => {
  const lines = (content || '').split('\n');
  return (
    <div className="w-full min-h-[300px] bg-brand-black border border-brand-divider px-4 py-3 overflow-y-auto">
      {lines.length === 1 && lines[0] === '' ? (
        <p className="text-brand-white/20 text-sm italic">Nothing to preview yet…</p>
      ) : (
        lines.map((line, i) => {
          if (line.startsWith('# ')) return <h1 key={i} className="text-2xl font-serif text-brand-white mb-4 mt-6">{line.slice(2)}</h1>;
          if (line.startsWith('## ')) return <h2 key={i} className="text-xl font-serif text-brand-white mb-3 mt-5">{line.slice(3)}</h2>;
          if (line.startsWith('### ')) return <h3 key={i} className="text-lg font-serif text-brand-gold mb-2 mt-4">{line.slice(4)}</h3>;
          if (line.startsWith('- ') || line.startsWith('* ')) return <li key={i} className="text-brand-white/70 text-sm leading-relaxed mb-1 ml-4 list-disc">{line.slice(2)}</li>;
          if (line.match(/^\d+\.\s/)) return <li key={i} className="text-brand-white/70 text-sm leading-relaxed mb-1 ml-4 list-decimal">{line.replace(/^\d+\.\s/, '')}</li>;
          if (line === '') return <br key={i} />;
          const html = line
            .replace(/\*\*(.*?)\*\*/g, '<strong class="text-brand-white font-semibold">$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>');
          return <p key={i} className="text-brand-white/70 text-sm leading-relaxed mb-2" dangerouslySetInnerHTML={{ __html: html }} />;
        })
      )}
    </div>
  );
};

// ─── Admin Dashboard ───────────────────────────────────────────────────────────
export const AdminDashboard = ({ onLogout }: { onLogout: () => void }) => {
  const [tab, setTab] = useState<'blog' | 'cases' | 'market'>('blog');
  const [posts, setPosts] = useState<Post[]>([]);
  const [cases, setCases] = useState<CaseStudy[]>([]);
  const [marketCases, setMarketCases] = useState<MarketCaseAdmin[]>(getMarketCases());
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [showMarketForm, setShowMarketForm] = useState(false);
  const [editingMarket, setEditingMarket] = useState<MarketCaseAdmin | null>(null);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'published' | 'draft'>('all');
  const [confirmState, setConfirmState] = useState<{ open: boolean; message: string; onConfirm: () => void }>({
    open: false, message: '', onConfirm: () => {},
  });
  const { toasts, add: addToast, remove: removeToast } = useToast();
  const navigate = useNavigate();

  const apiOpts = { credentials: 'include' as RequestCredentials, headers: { 'Content-Type': 'application/json' } };

  const loadData = async () => {
    setLoading(true);
    try {
      const [bp, cs] = await Promise.all([
        fetch('/api/admin/blog', apiOpts).then(r => r.json()),
        fetch('/api/admin/case-studies', apiOpts).then(r => r.json()),
      ]);
      setPosts(Array.isArray(bp) ? bp : []);
      setCases(Array.isArray(cs) ? cs : []);
    } catch {
      addToast('Failed to load data', 'error');
    }
    setLoading(false);
  };

  useEffect(() => { loadData(); }, []);

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST', credentials: 'include' });
    onLogout();
    navigate('/admin');
  };

  const togglePublish = async (item: any, type: 'blog' | 'cases') => {
    const url = type === 'blog' ? `/api/admin/blog/${item.id}` : `/api/admin/case-studies/${item.id}`;
    try {
      await fetch(url, { ...apiOpts, method: 'PUT', body: JSON.stringify({ published: !item.published }) });
      addToast(item.published ? 'Moved to drafts' : 'Published successfully');
      loadData();
    } catch {
      addToast('Failed to update status', 'error');
    }
  };

  const deleteItem = (id: string, type: 'blog' | 'cases') => {
    setConfirmState({
      open: true,
      message: `This will permanently delete the ${type === 'blog' ? 'blog post' : 'case study'}. This action cannot be undone.`,
      onConfirm: async () => {
        setConfirmState(s => ({ ...s, open: false }));
        const url = type === 'blog' ? `/api/admin/blog/${id}` : `/api/admin/case-studies/${id}`;
        try {
          await fetch(url, { ...apiOpts, method: 'DELETE' });
          addToast('Deleted successfully');
          loadData();
        } catch {
          addToast('Failed to delete item', 'error');
        }
      },
    });
  };

  const openEdit = (item: any) => { setEditing(item); setShowForm(true); };
  const openNew = () => { setEditing(null); setShowForm(true); };

  const allItems = tab === 'blog' ? posts : cases;
  const filteredItems = allItems.filter(item => {
    const matchSearch = !search || item.title.toLowerCase().includes(search.toLowerCase());
    const matchStatus =
      filterStatus === 'all' ? true :
      filterStatus === 'published' ? item.published :
      !item.published;
    return matchSearch && matchStatus;
  });

  return (
    <div className="min-h-screen bg-brand-black">
      {/* Toasts */}
      <Toasts toasts={toasts} remove={removeToast} />

      {/* Confirm Modal */}
      {confirmState.open && (
        <ConfirmModal
          message={confirmState.message}
          onConfirm={confirmState.onConfirm}
          onCancel={() => setConfirmState(s => ({ ...s, open: false }))}
        />
      )}

      {/* Header */}
      <div className="bg-brand-rich-black border-b border-brand-divider px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <h1 className="text-lg font-serif text-brand-white">THE BLACK <span className="text-brand-gold">APEX</span> Admin</h1>
          <Link to="/" className="text-brand-white/40 hover:text-brand-white text-[10px] uppercase tracking-widest flex items-center gap-1">
            <Home className="w-3 h-3" /> View Site
          </Link>
          <Link to="/admin/analytics" className="text-brand-white/40 hover:text-brand-gold text-[10px] uppercase tracking-widest flex items-center gap-1 transition-colors">
            <BarChart2 className="w-3 h-3" /> Analytics
          </Link>
        </div>
        <button onClick={handleLogout} className="flex items-center gap-2 text-brand-white/50 hover:text-brand-white text-[10px] uppercase tracking-widest transition-colors">
          <LogOut className="w-3 h-3" /> Logout
        </button>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: 'Total Posts', value: posts.length, icon: FileText },
            { label: 'Published Posts', value: posts.filter(p => p.published).length, icon: Eye },
            { label: 'Client Cases', value: cases.length, icon: Briefcase },
            { label: 'Market Cases', value: marketCases.length, icon: Globe },
          ].map(stat => (
            <div key={stat.label} className="bg-brand-rich-black border border-brand-divider p-6">
              <stat.icon className="w-4 h-4 text-brand-gold mb-3" />
              <div className="text-2xl font-serif text-brand-white">{stat.value}</div>
              <div className="text-brand-white/40 text-[10px] uppercase tracking-widest mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-0 mb-8 border border-brand-divider w-fit">
          <button
            onClick={() => { setTab('blog'); setSearch(''); setFilterStatus('all'); }}
            className={`px-6 py-3 text-[10px] uppercase tracking-widest transition-colors ${tab === 'blog' ? 'bg-brand-gold text-brand-black' : 'text-brand-white/60 hover:text-brand-white'}`}
          >
            Blog Posts
          </button>
          <button
            onClick={() => { setTab('cases'); setSearch(''); setFilterStatus('all'); }}
            className={`px-6 py-3 text-[10px] uppercase tracking-widest transition-colors ${tab === 'cases' ? 'bg-brand-gold text-brand-black' : 'text-brand-white/60 hover:text-brand-white'}`}
          >
            Client Cases
          </button>
          <button
            onClick={() => { setTab('market'); setSearch(''); setFilterStatus('all'); }}
            className={`px-6 py-3 text-[10px] uppercase tracking-widest transition-colors ${tab === 'market' ? 'bg-brand-gold text-brand-black' : 'text-brand-white/60 hover:text-brand-white'}`}
          >
            Market Cases
          </button>
        </div>

        {/* Action Bar with Search + Filter — only for blog/cases */}
        {tab !== 'market' && (
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-6">
            <div className="flex flex-col sm:flex-row gap-3 flex-1">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-brand-white/30 pointer-events-none" />
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder={`Search ${tab === 'blog' ? 'posts' : 'case studies'}…`}
                  className="w-full bg-brand-rich-black border border-brand-divider pl-9 pr-8 py-2.5 text-brand-white text-xs outline-none focus:border-brand-gold transition-colors placeholder:text-brand-white/25"
                />
                {search && (
                  <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-white/30 hover:text-brand-white">
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
              <div className="flex border border-brand-divider">
                {(['all', 'published', 'draft'] as const).map(s => (
                  <button
                    key={s}
                    onClick={() => setFilterStatus(s)}
                    className={`px-4 py-2.5 text-[9px] uppercase tracking-widest transition-colors ${filterStatus === s ? 'bg-brand-gold text-brand-black' : 'text-brand-white/50 hover:text-brand-white'}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <button
              onClick={openNew}
              className="flex items-center gap-2 bg-brand-gold text-brand-black px-5 py-2.5 text-[10px] uppercase tracking-widest font-semibold hover:bg-brand-gold-soft transition-colors whitespace-nowrap"
            >
              <Plus className="w-3 h-3" /> New {tab === 'blog' ? 'Post' : 'Case Study'}
            </button>
          </div>
        )}

        {/* List — Blog & Client Cases */}
        {tab !== 'market' && (
          loading ? (
            <div className="space-y-3">{[1, 2, 3].map(i => <div key={i} className="h-16 bg-brand-rich-black animate-pulse" />)}</div>
          ) : (
            <div className="space-y-2">
              {filteredItems.length === 0 && (
                <div className="text-center py-16 text-brand-white/40">
                  {search || filterStatus !== 'all' ? (
                    <>
                      <p className="mb-4">No results match your filters.</p>
                      <button onClick={() => { setSearch(''); setFilterStatus('all'); }} className="text-brand-gold text-xs uppercase tracking-widest">Clear filters</button>
                    </>
                  ) : (
                    <>
                      <p className="mb-4">No {tab === 'blog' ? 'posts' : 'case studies'} yet.</p>
                      <button onClick={openNew} className="text-brand-gold text-xs uppercase tracking-widest">Create your first one →</button>
                    </>
                  )}
                </div>
              )}
              {filteredItems.map((item: any) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center justify-between bg-brand-rich-black border border-brand-divider px-6 py-4 group"
                >
                  <div className="flex-1 min-w-0">
                    <h3 className="text-brand-white text-sm font-medium truncate">{item.title}</h3>
                    <div className="flex items-center gap-3 mt-1">
                      <span className={`text-[9px] uppercase tracking-widest px-2 py-0.5 ${item.published ? 'bg-green-900/40 text-green-400' : 'bg-brand-divider text-brand-white/40'}`}>
                        {item.published ? 'Published' : 'Draft'}
                      </span>
                      <span className="text-brand-white/30 text-[10px]">{formatDate(item.createdAt)}</span>
                      {tab === 'blog' && item.slug && (
                        <Link to={`/blog/${item.slug}`} target="_blank" className="text-brand-gold/50 hover:text-brand-gold text-[10px] uppercase tracking-widest">View</Link>
                      )}
                      {tab === 'cases' && item.slug && (
                        <Link to={`/case-studies/${item.slug}`} target="_blank" className="text-brand-gold/50 hover:text-brand-gold text-[10px] uppercase tracking-widest">View</Link>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <button onClick={() => togglePublish(item, tab)} title={item.published ? 'Unpublish' : 'Publish'} className="p-2 text-brand-white/40 hover:text-brand-gold transition-colors">
                      {item.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                    <button onClick={() => openEdit(item)} className="p-2 text-brand-white/40 hover:text-brand-gold transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button onClick={() => deleteItem(item.id, tab)} className="p-2 text-brand-white/40 hover:text-red-400 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )
        )}

        {/* Market Case Studies Tab */}
        {tab === 'market' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <p className="text-brand-white/40 text-xs">Manage the 7 iconic Indian brand case studies shown on the homepage slider and case studies page.</p>
              <button
                onClick={() => { setEditingMarket(null); setShowMarketForm(true); }}
                className="flex items-center gap-2 bg-brand-gold text-brand-black px-5 py-2.5 text-[10px] uppercase tracking-widest font-semibold hover:bg-brand-gold-soft transition-colors whitespace-nowrap"
              >
                <Plus className="w-3 h-3" /> Add Market Case
              </button>
            </div>
            <div className="space-y-2">
              {marketCases.map((mc) => (
                <motion.div
                  key={mc.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-4 bg-brand-rich-black border border-brand-divider px-6 py-4 group"
                >
                  {mc.coverImage && (
                    <img src={mc.coverImage} alt={mc.title} className="w-16 h-10 object-cover border border-brand-divider shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-brand-white text-sm font-medium truncate">{mc.title}</h3>
                    <div className="flex items-center gap-3 mt-1">
                      <span className={`text-[9px] uppercase tracking-widest px-2 py-0.5 ${mc.published ? 'bg-green-900/40 text-green-400' : 'bg-brand-divider text-brand-white/40'}`}>
                        {mc.published ? 'Published' : 'Hidden'}
                      </span>
                      <span className="text-brand-white/30 text-[10px]">{mc.industry}</span>
                      <Link to={`/case-studies/${mc.slug}`} target="_blank" className="text-brand-gold/50 hover:text-brand-gold text-[10px] uppercase tracking-widest">View</Link>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={() => {
                        const updated = marketCases.map(c => c.id === mc.id ? { ...c, published: !c.published } : c);
                        setMarketCases(updated);
                        saveMarketCases(updated);
                        addToast(mc.published ? 'Hidden from site' : 'Now visible on site');
                      }}
                      title={mc.published ? 'Hide' : 'Show'}
                      className="p-2 text-brand-white/40 hover:text-brand-gold transition-colors"
                    >
                      {mc.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => { setEditingMarket(mc); setShowMarketForm(true); }}
                      className="p-2 text-brand-white/40 hover:text-brand-gold transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        setConfirmState({
                          open: true,
                          message: `This will permanently delete "${mc.title}" from the Market Case Studies. This action cannot be undone.`,
                          onConfirm: () => {
                            setConfirmState(s => ({ ...s, open: false }));
                            const updated = marketCases.filter(c => c.id !== mc.id);
                            setMarketCases(updated);
                            saveMarketCases(updated);
                            addToast('Market case deleted');
                          },
                        });
                      }}
                      className="p-2 text-brand-white/40 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Form Modal — Blog & Client Cases */}
      {showForm && (
        <ContentForm
          type={tab as 'blog' | 'cases'}
          initial={editing}
          onClose={() => { setShowForm(false); setEditing(null); }}
          onSave={() => { loadData(); addToast(editing ? 'Saved successfully' : 'Created successfully'); }}
          onError={msg => addToast(msg, 'error')}
        />
      )}

      {/* Market Case Form Modal */}
      {showMarketForm && (
        <MarketCaseForm
          initial={editingMarket}
          onClose={() => { setShowMarketForm(false); setEditingMarket(null); }}
          onSave={(updated) => {
            setMarketCases(updated);
            saveMarketCases(updated);
            setShowMarketForm(false);
            setEditingMarket(null);
            addToast(editingMarket ? 'Market case updated' : 'Market case added');
          }}
          allCases={marketCases}
        />
      )}
    </div>
  );
};

// ─── Content Form Modal ────────────────────────────────────────────────────────
function ContentForm({
  type, initial, onClose, onSave, onError,
}: {
  type: 'blog' | 'cases';
  initial: any;
  onClose: () => void;
  onSave: () => void;
  onError: (msg: string) => void;
}) {
  const isBlog = type === 'blog';
  const [form, setForm] = useState<Record<string, any>>(
    initial
      ? { ...initial }
      : {
          title: '', slug: '', excerpt: '', content: '', published: false, coverImage: '',
          seoTitle: '', seoDescription: '',
          ...(isBlog ? {} : { industry: '', problem: '', solution: '', results: '', metrics: '' }),
        }
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [previewMode, setPreviewMode] = useState(false);
  const [imgSizeError, setImgSizeError] = useState(false);

  const apiOpts = { credentials: 'include' as RequestCredentials, headers: { 'Content-Type': 'application/json' } };
  const set = (k: string, v: any) => setForm(f => ({ ...f, [k]: v }));
  const autoSlug = (title: string) => title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

  const handleSave = async () => {
    if (imgSizeError) { setError('Please fix the image issue before saving.'); return; }
    setSaving(true);
    setError('');
    try {
      const url = initial
        ? (isBlog ? `/api/admin/blog/${initial.id}` : `/api/admin/case-studies/${initial.id}`)
        : (isBlog ? '/api/admin/blog' : '/api/admin/case-studies');
      const method = initial ? 'PUT' : 'POST';
      const res = await fetch(url, { ...apiOpts, method, body: JSON.stringify(form) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      onSave();
      onClose();
    } catch (e: any) {
      const msg = e.message || 'Failed to save';
      setError(msg);
      onError(msg);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-start justify-center overflow-y-auto py-10">
      <div className="w-full max-w-2xl bg-brand-rich-black border border-brand-divider mx-4">
        <div className="flex items-center justify-between px-8 py-5 border-b border-brand-divider">
          <h2 className="text-sm uppercase tracking-[0.3em] text-brand-white">
            {initial ? 'Edit' : 'New'} {isBlog ? 'Blog Post' : 'Case Study'}
          </h2>
          <button onClick={onClose} className="text-brand-white/40 hover:text-brand-white text-xl leading-none">×</button>
        </div>

        <div className="p-8 space-y-5">
          {error && <div className="p-3 border border-red-900 bg-red-900/20 text-red-400 text-xs">{error}</div>}

          <FormField label="Title" field="title" form={form} onSet={set} isNew={!initial} autoSlug={autoSlug} />
          <FormField label="Slug (URL)" field="slug" form={form} onSet={set} />

          {/* Image Upload Field */}
          <ImageUploadField
            value={form.coverImage || ''}
            onSet={v => set('coverImage', v)}
            sizeError={imgSizeError}
            setSizeError={setImgSizeError}
          />

          {isBlog ? (
            <>
              <FormField label="Excerpt" field="excerpt" rows={2} form={form} onSet={set} />

              {/* Blog Content with Markdown Write/Preview toggle */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-brand-white/50 text-[10px] uppercase tracking-[0.2em]">Content (Markdown)</label>
                  <div className="flex border border-brand-divider">
                    <button
                      type="button"
                      onClick={() => setPreviewMode(false)}
                      className={`px-3 py-1 text-[9px] uppercase tracking-widest transition-colors ${!previewMode ? 'bg-brand-gold text-brand-black' : 'text-brand-white/40 hover:text-brand-white'}`}
                    >Write</button>
                    <button
                      type="button"
                      onClick={() => setPreviewMode(true)}
                      className={`px-3 py-1 text-[9px] uppercase tracking-widest transition-colors ${previewMode ? 'bg-brand-gold text-brand-black' : 'text-brand-white/40 hover:text-brand-white'}`}
                    >Preview</button>
                  </div>
                </div>
                {previewMode ? (
                  <MarkdownPreview content={form.content || ''} />
                ) : (
                  <textarea
                    rows={12}
                    value={form.content || ''}
                    onChange={e => set('content', e.target.value)}
                    className="w-full bg-brand-black border border-brand-divider focus:border-brand-gold text-brand-white px-4 py-3 outline-none transition-colors text-sm resize-none font-mono"
                    placeholder={'Write your content in Markdown...\n\n# Heading 1\n## Heading 2\n**bold** *italic*\n- bullet point'}
                  />
                )}
              </div>
            </>
          ) : (
            <>
              <FormField label="Industry" field="industry" form={form} onSet={set} />
              <FormField label="Metrics (e.g. Revenue 2x | Churn -78%)" field="metrics" form={form} onSet={set} />
              <FormField label="The Problem" field="problem" rows={4} form={form} onSet={set} />
              <FormField label="Our Solution" field="solution" rows={4} form={form} onSet={set} />
              <FormField label="The Results" field="results" rows={4} form={form} onSet={set} />
            </>
          )}

          <div className="border-t border-brand-divider pt-5 space-y-4">
            <p className="text-brand-white/40 text-[10px] uppercase tracking-widest">SEO</p>
            <FormField label="SEO Title" field="seoTitle" form={form} onSet={set} />
            <FormField label="SEO Description" field="seoDescription" rows={2} form={form} onSet={set} />
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="published"
              checked={!!form.published}
              onChange={e => set('published', e.target.checked)}
              className="accent-[#C6A86B]"
            />
            <label htmlFor="published" className="text-brand-white/70 text-sm cursor-pointer">
              Published (visible on site)
            </label>
          </div>
        </div>

        <div className="px-8 py-5 border-t border-brand-divider flex gap-4 justify-end">
          <button
            onClick={onClose}
            className="px-6 py-3 border border-brand-divider text-brand-white/60 text-[10px] uppercase tracking-widest hover:text-brand-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving || imgSizeError}
            className="px-8 py-3 bg-brand-gold text-brand-black text-[10px] uppercase tracking-widest font-semibold hover:bg-brand-gold-soft transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {saving ? 'Saving…' : <><Check className="w-3 h-3" /> Save</>}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Market Case Form Modal ────────────────────────────────────────────────────
function MarketCaseForm({
  initial, onClose, onSave, allCases,
}: {
  initial: MarketCaseAdmin | null;
  onClose: () => void;
  onSave: (updated: MarketCaseAdmin[]) => void;
  allCases: MarketCaseAdmin[];
}) {
  const isNew = !initial;
  const [form, setForm] = useState<MarketCaseAdmin>(
    initial
      ? { ...initial }
      : {
          id: `mc_${Date.now()}`, slug: '', title: '', industry: '', metrics: '',
          tagline: '', founded: '', founder: '', headquarters: '',
          coverImage: '', problem: '', insight: '', published: true,
        }
  );
  const [imgSizeError, setImgSizeError] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const set = (k: keyof MarketCaseAdmin, v: any) => setForm(f => ({ ...f, [k]: v }));
  const autoSlug = (title: string) => title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImgSizeError(false);
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2.5 * 1024 * 1024) { setImgSizeError(true); return; }
    const reader = new FileReader();
    reader.onload = () => set('coverImage', reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    if (!form.title || !form.slug) return;
    let updated: MarketCaseAdmin[];
    if (isNew) {
      updated = [...allCases, form];
    } else {
      updated = allCases.map(c => c.id === form.id ? form : c);
    }
    onSave(updated);
  };

  const Field = ({ label, field, rows }: { label: string; field: keyof MarketCaseAdmin; rows?: number }) => (
    <div>
      <label className="text-brand-white/50 text-[10px] uppercase tracking-[0.2em] block mb-1">{label}</label>
      {rows ? (
        <textarea
          rows={rows}
          value={(form[field] as string) || ''}
          onChange={e => set(field, e.target.value)}
          className="w-full bg-brand-black border border-brand-divider focus:border-brand-gold text-brand-white px-4 py-3 outline-none transition-colors text-sm resize-none"
        />
      ) : (
        <input
          type="text"
          value={(form[field] as string) || ''}
          onChange={e => {
            set(field, e.target.value);
            if (field === 'title' && isNew) set('slug', autoSlug(e.target.value));
          }}
          className="w-full bg-brand-black border border-brand-divider focus:border-brand-gold text-brand-white px-4 py-3 outline-none transition-colors text-sm"
        />
      )}
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-start justify-center overflow-y-auto py-10">
      <div className="w-full max-w-2xl bg-brand-rich-black border border-brand-divider mx-4">
        <div className="flex items-center justify-between px-8 py-5 border-b border-brand-divider">
          <h2 className="text-sm uppercase tracking-[0.3em] text-brand-white">
            {isNew ? 'Add' : 'Edit'} Market Case Study
          </h2>
          <button onClick={onClose} className="text-brand-white/40 hover:text-brand-white text-xl leading-none">×</button>
        </div>

        <div className="p-8 space-y-5">
          <Field label="Title" field="title" />
          <Field label="Slug (URL — e.g. rise-of-amul)" field="slug" />
          <Field label="Industry" field="industry" />
          <Field label="Founded" field="founded" />
          <Field label="Founder(s)" field="founder" />
          <Field label="Headquarters" field="headquarters" />
          <Field label="Metrics (e.g. 12M+ Clients | $3B+ Valuation)" field="metrics" />
          <Field label="Tagline / Subtitle" field="tagline" />
          <Field label="The Market Problem (short summary)" field="problem" rows={3} />
          <Field label="Strategic Insight" field="insight" rows={3} />

          {/* Cover Image */}
          <div>
            <label className="text-brand-white/50 text-[10px] uppercase tracking-[0.2em] block mb-2">Cover Image</label>
            <div
              role="button"
              tabIndex={0}
              onClick={() => fileRef.current?.click()}
              onKeyDown={e => e.key === 'Enter' && fileRef.current?.click()}
              className="w-full bg-brand-black border border-brand-divider hover:border-brand-gold text-brand-white/50 px-4 py-3 text-sm cursor-pointer transition-colors flex items-center gap-3"
            >
              <Upload className="w-4 h-4 text-brand-gold shrink-0" />
              <span>{form.coverImage?.startsWith('data:') ? 'Click to replace image' : 'Click to upload image'}</span>
              <span className="ml-auto text-[10px] text-brand-white/30">Max 2.5 MB</span>
              <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
            </div>
            {/* URL fallback */}
            <input
              type="text"
              value={form.coverImage?.startsWith('data:') ? '' : (form.coverImage || '')}
              onChange={e => { setImgSizeError(false); set('coverImage', e.target.value); }}
              placeholder="Or paste image URL / path (e.g. /zerodha.jpeg)"
              className="w-full mt-2 bg-brand-black border border-brand-divider focus:border-brand-gold text-brand-white px-4 py-3 outline-none transition-colors text-sm"
            />
            {imgSizeError && <p className="text-red-400 text-[10px] mt-1.5">Image exceeds 2.5 MB.</p>}
            {form.coverImage && (
              <img src={form.coverImage} alt="preview" className="w-full aspect-video object-cover border border-brand-divider mt-3" />
            )}
          </div>

          <div className="flex items-center gap-3 border-t border-brand-divider pt-5">
            <input
              type="checkbox"
              id="mc_published"
              checked={!!form.published}
              onChange={e => set('published', e.target.checked)}
              className="accent-[#C6A86B]"
            />
            <label htmlFor="mc_published" className="text-brand-white/70 text-sm cursor-pointer">
              Published (visible on site)
            </label>
          </div>
        </div>

        <div className="px-8 py-5 border-t border-brand-divider flex gap-4 justify-end">
          <button
            onClick={onClose}
            className="px-6 py-3 border border-brand-divider text-brand-white/60 text-[10px] uppercase tracking-widest hover:text-brand-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!form.title || !form.slug || imgSizeError}
            className="px-8 py-3 bg-brand-gold text-brand-black text-[10px] uppercase tracking-widest font-semibold hover:bg-brand-gold-soft transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            <Check className="w-3 h-3" /> Save
          </button>
        </div>
      </div>
    </div>
  );
}
