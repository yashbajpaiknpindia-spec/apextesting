import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Lock, Mail, Eye, EyeOff } from 'lucide-react';

export const AdminLogin = ({ onLogin }: { onLogin: () => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        onLogin();
        navigate('/admin/dashboard');
      } else {
        setError(data.error || 'Login failed');
      }
    } catch {
      setError('Connection error. Is the server running?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-black flex items-center justify-center px-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-serif text-brand-white mb-2">THE BLACK <span className="text-brand-gold">APEX</span></h1>
          <p className="text-brand-white/40 text-[10px] uppercase tracking-[0.3em]">Admin Panel</p>
        </div>

        <div className="bg-brand-rich-black border border-brand-divider p-10">
          <div className="flex items-center gap-3 mb-8">
            <Lock className="w-4 h-4 text-brand-gold" />
            <h2 className="text-sm uppercase tracking-[0.3em] text-brand-white">Secure Login</h2>
          </div>

          {error && (
            <div className="mb-6 p-4 border border-red-900 bg-red-900/20 text-red-400 text-xs">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-brand-white/50 text-[10px] uppercase tracking-[0.2em] block mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-white/30" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full bg-brand-black border border-brand-divider focus:border-brand-gold text-brand-white px-12 py-4 outline-none transition-colors text-sm"
                  placeholder="admin@domain.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-brand-white/50 text-[10px] uppercase tracking-[0.2em] block mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-white/30" />
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full bg-brand-black border border-brand-divider focus:border-brand-gold text-brand-white px-12 py-4 outline-none transition-colors text-sm"
                  placeholder="••••••••"
                  required
                />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-white/30 hover:text-brand-white/60">
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-gold text-brand-black py-4 uppercase tracking-[0.2em] text-xs font-semibold hover:bg-brand-gold-soft transition-all disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};
