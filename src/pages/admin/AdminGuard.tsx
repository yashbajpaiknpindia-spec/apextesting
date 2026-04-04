import React, { useEffect, useState } from 'react';
import { AdminLogin } from './AdminLogin';
import { AdminDashboard } from './AdminDashboard';

export const AdminGuard = () => {
  const [isAuth, setIsAuth] = useState<boolean | null>(null); // null = checking

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

  return <AdminDashboard onLogout={() => setIsAuth(false)} />;
};
