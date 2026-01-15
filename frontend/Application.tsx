import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { AuthProvider, useAuth } from './context/AuthContext';
import { BlogPage } from './components/BlogPage';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { BlogSettings } from './pages/BlogSettings';
import './style.scss';

function AppContent() {
  const { isAuthenticated } = useAuth();
  const [currentPage, setCurrentPage] = useState<'login' | 'signup' | 'home' | 'about' | 'archive' | 'settings'>('login');

  const handleNavigate = (page: string) => {
    setCurrentPage(page as any);
  };

  if (!isAuthenticated) {
    if (currentPage === 'signup') {
      return <Signup onNavigate={handleNavigate} />;
    }
    return <Login onNavigate={handleNavigate} />;
  }

  if (currentPage === 'settings') {
    return <BlogSettings onNavigate={handleNavigate} />;
  }

  return <BlogPage onNavigate={handleNavigate} />;
}

function Application() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

const container = document.getElementById('application');
if (container) {
  const root = createRoot(container);
  root.render(<Application />);
} else {
  console.error('Root element "#application" not found');
}
