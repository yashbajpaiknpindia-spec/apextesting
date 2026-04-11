import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AdminLogin } from './AdminLogin';
import { AdminDashboard } from './AdminDashboard';
import { AdminAnalytics } from './AdminAnalytics';

export const AdminGuard = () => {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);

  useEffect(() => {
    fetch('/api/admin/me', { credentials: 'include' })
      .then(r => setIsAuth(r.ok))
      .catch(() => setIsAuth(false));
  }, []);

  if (isAuth === null) {
    return (
      <div className="min-h-screen bg-brand-black flex items-center justify-center">
        <div className="text-brand-white/40 text-[10px] uppercase tracking-widest animate-pulse">Authenticating...</div>
      </div>
    );
  }

  if (!isAuth) {
    return <AdminLogin onLogin={() => setIsAuth(true)} />;
  }

  return (
    <Routes>
      <Route path="/" element={<AdminDashboard onLogout={() => setIsAuth(false)} />} />
      <Route path="/analytics" element={<AdminAnalytics />} />
      <Route path="*" element={<AdminDashboard onLogout={() => setIsAuth(false)} />} />
    </Routes>
  );
};
