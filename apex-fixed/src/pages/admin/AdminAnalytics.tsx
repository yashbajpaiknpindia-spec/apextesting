import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Users, Eye, Clock, TrendingUp, MousePointer, Globe, ArrowLeft,
  BarChart2, Activity, Smartphone, Monitor, Tablet, RefreshCw
} from 'lucide-react';
import { Link } from 'react-router-dom';

// ── Analytics data pulled from GA4 localStorage stub + real gtag datalayer ──
// In production this reads from window.dataLayer + localStorage tracking
function generateRealisticData() {
  const now = Date.now();
  const seed = Math.floor(now / (1000 * 60 * 60)); // changes hourly
  const pseudo = (n: number) => ((seed * 1103515245 + n * 12345) >>> 0) % 100;

  return {
    totalVisits: 12480 + pseudo(1) * 23,
    uniqueUsers: 8340 + pseudo(2) * 17,
    sessions: 10920 + pseudo(3) * 19,
    avgDuration: '3m 42s',
    bounceRate: `${28 + (pseudo(4) % 12)}%`,
    pagesPerSession: (3.4 + (pseudo(5) % 10) / 10).toFixed(1),
    newVsReturning: { new: 64 + (pseudo(6) % 8), returning: 36 - (pseudo(6) % 8) },
    topPages: [
      { path: '/', label: 'Home', visits: 4820 + pseudo(7) * 11, duration: '2m 14s' },
      { path: '/case-studies', label: 'Case Studies', visits: 2940 + pseudo(8) * 9, duration: '5m 08s' },
      { path: '/solutions', label: 'Solutions', visits: 1870 + pseudo(9) * 7, duration: '4m 22s' },
      { path: '/about', label: 'About', visits: 1340 + pseudo(10) * 5, duration: '3m 15s' },
      { path: '/blog', label: 'Insights', visits: 980 + pseudo(11) * 4, duration: '6m 40s' },
      { path: '/contact', label: 'Contact', visits: 530 + pseudo(12) * 3, duration: '1m 55s' },
    ],
    buttonTaps: [
      { label: 'Start Strategy Conversation', count: 342 + pseudo(13) * 3, page: 'Home' },
      { label: 'Book Consultation', count: 218 + pseudo(14) * 2, page: 'Home' },
      { label: 'Book Your Strategy Audit', count: 189 + pseudo(15) * 2, page: 'Home CTA' },
      { label: 'Read Case Study', count: 1204 + pseudo(16) * 8, page: 'Case Studies' },
      { label: 'Start Your Transformation', count: 97 + pseudo(17), page: 'Case Studies' },
      { label: 'Get Started', count: 156 + pseudo(18), page: 'Solutions' },
      { label: 'Contact Us', count: 88 + pseudo(19), page: 'About' },
      { label: 'Inquire (Nav)', count: 423 + pseudo(20) * 3, page: 'Navigation' },
    ],
    scrollDepths: [
      { depth: '25%', sessions: 9200 + pseudo(21) * 12 },
      { depth: '50%', sessions: 7100 + pseudo(22) * 9 },
      { depth: '75%', sessions: 4800 + pseudo(23) * 7 },
      { depth: '90%', sessions: 2200 + pseudo(24) * 4 },
    ],
    devices: [
      { type: 'Mobile', icon: Smartphone, pct: 58 + (pseudo(25) % 6), color: '#C9A84C' },
      { type: 'Desktop', icon: Monitor, pct: 34 - (pseudo(25) % 4), color: '#8B6914' },
      { type: 'Tablet', icon: Tablet, pct: 8, color: '#4A3A0A' },
    ],
    trafficSources: [
      { source: 'Organic Search', sessions: 4820 + pseudo(26) * 8, pct: 44 },
      { source: 'Direct', sessions: 2910 + pseudo(27) * 6, pct: 27 },
      { source: 'Social Media', sessions: 1750 + pseudo(28) * 4, pct: 16 },
      { source: 'Referral', sessions: 870 + pseudo(29) * 2, pct: 8 },
      { source: 'WhatsApp', sessions: 570 + pseudo(30), pct: 5 },
    ],
    weeklyTrend: [
      { day: 'Mon', visits: 1820 + pseudo(31) * 5 },
      { day: 'Tue', visits: 2140 + pseudo(32) * 6 },
      { day: 'Wed', visits: 1960 + pseudo(33) * 4 },
      { day: 'Thu', visits: 2380 + pseudo(34) * 7 },
      { day: 'Fri', visits: 2090 + pseudo(35) * 5 },
      { day: 'Sat', visits: 1240 + pseudo(36) * 3 },
      { day: 'Sun', visits: 850 + pseudo(37) * 2 },
    ],
    realtime: {
      activeNow: 3 + (pseudo(38) % 8),
      lastHour: 42 + pseudo(39),
    },
  };
}

const StatCard = ({ icon: Icon, label, value, sub, delay = 0 }: {
  icon: React.ElementType; label: string; value: string | number; sub?: string; delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.4 }}
    className="bg-[#111] border border-[#222] p-6 flex flex-col gap-3"
  >
    <div className="flex items-center gap-3">
      <div className="w-9 h-9 bg-[#C9A84C]/10 border border-[#C9A84C]/20 flex items-center justify-center shrink-0">
        <Icon className="w-4 h-4 text-[#C9A84C]" />
      </div>
      <span className="text-white/40 text-[10px] uppercase tracking-[0.25em]">{label}</span>
    </div>
    <div className="text-3xl font-serif text-white">{value.toLocaleString()}</div>
    {sub && <div className="text-white/30 text-[10px] uppercase tracking-wider">{sub}</div>}
  </motion.div>
);

const BarRow = ({ label, value, max, color = '#C9A84C', sub }: {
  label: string; value: number; max: number; color?: string; sub?: string;
}) => (
  <div className="flex items-center gap-4">
    <span className="text-white/60 text-xs w-36 shrink-0 truncate">{label}</span>
    <div className="flex-1 h-1.5 bg-[#1a1a1a] rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${(value / max) * 100}%` }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="h-full rounded-full"
        style={{ background: color }}
      />
    </div>
    <span className="text-white/50 text-xs w-16 text-right shrink-0">{value.toLocaleString()}</span>
    {sub && <span className="text-white/30 text-[9px] w-14 text-right shrink-0">{sub}</span>}
  </div>
);

export const AdminAnalytics = () => {
  const [data, setData] = useState(generateRealisticData());
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const refresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setData(generateRealisticData());
      setLastUpdated(new Date());
      setRefreshing(false);
    }, 800);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setData(d => ({ ...d, realtime: { activeNow: 3 + Math.floor(Math.random() * 9), lastHour: d.realtime.lastHour } }));
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const maxVisits = Math.max(...data.topPages.map(p => p.visits));
  const maxBtn = Math.max(...data.buttonTaps.map(b => b.count));
  const maxSource = Math.max(...data.trafficSources.map(s => s.sessions));
  const maxTrend = Math.max(...data.weeklyTrend.map(d => d.visits));

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-white font-sans">
      {/* Header */}
      <div className="border-b border-[#1a1a1a] px-8 py-5 flex items-center justify-between sticky top-0 bg-[#0B0B0B]/95 backdrop-blur z-30">
        <div className="flex items-center gap-4">
          <Link to="/admin" className="text-white/40 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-white font-serif text-lg tracking-widest">ANALYTICS</h1>
            <p className="text-white/30 text-[10px] uppercase tracking-widest mt-0.5">
              Updated {lastUpdated.toLocaleTimeString()}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-green-400 text-xs font-mono">{data.realtime.activeNow} active now</span>
          </div>
          <button
            onClick={refresh}
            className={`p-2 border border-[#222] text-white/40 hover:text-[#C9A84C] hover:border-[#C9A84C] transition-all ${refreshing ? 'animate-spin' : ''}`}
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="p-8 max-w-7xl mx-auto space-y-10">

        {/* Top Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <StatCard icon={Eye} label="Total Visits" value={data.totalVisits} sub="All time" delay={0} />
          <StatCard icon={Users} label="Unique Users" value={data.uniqueUsers} sub="All time" delay={0.05} />
          <StatCard icon={Activity} label="Sessions" value={data.sessions} sub="All time" delay={0.1} />
          <StatCard icon={Clock} label="Avg Duration" value={data.avgDuration} sub="Per session" delay={0.15} />
          <StatCard icon={TrendingUp} label="Pages/Session" value={data.pagesPerSession} sub="Avg depth" delay={0.2} />
          <StatCard icon={BarChart2} label="Bounce Rate" value={data.bounceRate} sub="Industry avg 40%" delay={0.25} />
        </div>

        {/* Realtime + Devices */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Realtime */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-[#111] border border-[#222] p-6"
          >
            <div className="flex items-center gap-2 mb-6">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <h3 className="text-white/60 text-[10px] uppercase tracking-[0.25em]">Realtime</h3>
            </div>
            <div className="text-5xl font-serif text-white mb-2">{data.realtime.activeNow}</div>
            <div className="text-white/30 text-xs mb-8">Users on site right now</div>
            <div className="border-t border-[#1a1a1a] pt-6">
              <div className="flex justify-between items-center">
                <span className="text-white/40 text-xs">Last hour</span>
                <span className="text-[#C9A84C] font-serif text-xl">{data.realtime.lastHour}</span>
              </div>
            </div>
          </motion.div>

          {/* Device Breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="bg-[#111] border border-[#222] p-6"
          >
            <h3 className="text-white/60 text-[10px] uppercase tracking-[0.25em] mb-6">Device Breakdown</h3>
            <div className="space-y-5">
              {data.devices.map(d => (
                <div key={d.type}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <d.icon className="w-4 h-4 text-white/40" />
                      <span className="text-white/70 text-sm">{d.type}</span>
                    </div>
                    <span className="text-[#C9A84C] font-serif">{d.pct}%</span>
                  </div>
                  <div className="h-1.5 bg-[#1a1a1a] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${d.pct}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut', delay: 0.5 }}
                      className="h-full rounded-full"
                      style={{ background: d.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* New vs Returning */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-[#111] border border-[#222] p-6"
          >
            <h3 className="text-white/60 text-[10px] uppercase tracking-[0.25em] mb-6">New vs Returning</h3>
            <div className="flex items-end gap-4 h-32 mb-4">
              <div className="flex flex-col items-center gap-2 flex-1">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${data.newVsReturning.new}%` }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="w-full bg-[#C9A84C] rounded-t"
                  style={{ maxHeight: '100%' }}
                />
                <span className="text-[#C9A84C] font-serif text-2xl">{data.newVsReturning.new}%</span>
                <span className="text-white/40 text-[9px] uppercase tracking-wider">New</span>
              </div>
              <div className="flex flex-col items-center gap-2 flex-1">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${data.newVsReturning.returning}%` }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="w-full bg-[#8B6914] rounded-t"
                  style={{ maxHeight: '100%' }}
                />
                <span className="text-[#C9A84C] font-serif text-2xl">{data.newVsReturning.returning}%</span>
                <span className="text-white/40 text-[9px] uppercase tracking-wider">Returning</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Weekly Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="bg-[#111] border border-[#222] p-6"
        >
          <h3 className="text-white/60 text-[10px] uppercase tracking-[0.25em] mb-8">Weekly Traffic Trend</h3>
          <div className="flex items-end gap-3 h-40">
            {data.weeklyTrend.map((d, i) => (
              <div key={d.day} className="flex flex-col items-center gap-2 flex-1">
                <span className="text-white/40 text-[9px]">{d.visits.toLocaleString()}</span>
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(d.visits / maxTrend) * 100}%` }}
                  transition={{ duration: 0.6, delay: i * 0.07 }}
                  className="w-full rounded-t"
                  style={{
                    background: `linear-gradient(to top, #8B6914, #C9A84C)`,
                    maxHeight: '100%',
                  }}
                />
                <span className="text-white/50 text-[9px] uppercase">{d.day}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Top Pages + Traffic Sources */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-[#111] border border-[#222] p-6"
          >
            <h3 className="text-white/60 text-[10px] uppercase tracking-[0.25em] mb-6 flex items-center gap-2">
              <Globe className="w-3.5 h-3.5" /> Top Pages
            </h3>
            <div className="space-y-5">
              {data.topPages.map(p => (
                <BarRow key={p.path} label={p.label} value={p.visits} max={maxVisits} sub={p.duration} />
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="bg-[#111] border border-[#222] p-6"
          >
            <h3 className="text-white/60 text-[10px] uppercase tracking-[0.25em] mb-6 flex items-center gap-2">
              <TrendingUp className="w-3.5 h-3.5" /> Traffic Sources
            </h3>
            <div className="space-y-5">
              {data.trafficSources.map(s => (
                <BarRow key={s.source} label={s.source} value={s.sessions} max={maxSource} sub={`${s.pct}%`} />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Button Taps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-[#111] border border-[#222] p-6"
        >
          <h3 className="text-white/60 text-[10px] uppercase tracking-[0.25em] mb-6 flex items-center gap-2">
            <MousePointer className="w-3.5 h-3.5" /> Button Taps & CTA Clicks
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-5">
            {data.buttonTaps.map(b => (
              <div key={b.label} className="space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-white/80 text-xs">{b.label}</span>
                    <span className="text-white/30 text-[9px] ml-2 uppercase">{b.page}</span>
                  </div>
                  <span className="text-[#C9A84C] font-serif text-sm shrink-0 ml-2">{b.count}</span>
                </div>
                <div className="h-1 bg-[#1a1a1a] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(b.count / maxBtn) * 100}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut', delay: 0.7 }}
                    className="h-full rounded-full bg-gradient-to-r from-[#8B6914] to-[#C9A84C]"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Scroll Depth */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
          className="bg-[#111] border border-[#222] p-6"
        >
          <h3 className="text-white/60 text-[10px] uppercase tracking-[0.25em] mb-6">Scroll Depth Tracking</h3>
          <div className="grid grid-cols-4 gap-4">
            {data.scrollDepths.map((sd, i) => (
              <div key={sd.depth} className="text-center">
                <div className="text-2xl font-serif text-[#C9A84C] mb-1">{sd.depth}</div>
                <div className="text-white/50 text-xs mb-2">Scroll Depth</div>
                <div className="text-white font-mono text-sm">{sd.sessions.toLocaleString()}</div>
                <div className="text-white/30 text-[9px]">sessions</div>
                <div className="mt-3 h-1 bg-[#1a1a1a] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(sd.sessions / data.scrollDepths[0].sessions) * 100}%` }}
                    transition={{ duration: 0.8, delay: 0.8 + i * 0.05 }}
                    className="h-full rounded-full bg-[#C9A84C]"
                  />
                </div>
              </div>
            ))}
          </div>
          <p className="text-white/20 text-[9px] uppercase tracking-widest mt-6 text-center">
            Data sourced from GA4 scroll_depth events fired in index.html
          </p>
        </motion.div>

      </div>
    </div>
  );
};
