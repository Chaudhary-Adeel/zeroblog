import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export const Login: React.FC<{ onNavigate?: (page: string) => void }> = ({ onNavigate }) => {
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [tenantSlug, setTenantSlug] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password || !tenantSlug) {
      setError('All fields are required');
      return;
    }

    login(email, password, tenantSlug);
    // Redirect to home on success
    setTimeout(() => {
      onNavigate?.('home');
    }, 1000);
  };

  return (
    <div className="auth-page">
      <div className="auth-page__container">
        <div className="auth-page__card">
          <h1 className="auth-page__title">Sign In</h1>
          <p className="auth-page__subtitle">Welcome back to your blog</p>

          <form className="auth-form" onSubmit={handleSubmit}>
            {error && <div className="auth-form__error">{error}</div>}

            <div className="auth-form__group">
              <label className="auth-form__label">Blog (Tenant)</label>
              <input
                type="text"
                className="auth-form__input"
                placeholder="my-blog"
                value={tenantSlug}
                onChange={(e) => setTenantSlug(e.target.value)}
                disabled={isLoading}
              />
            </div>

            <div className="auth-form__group">
              <label className="auth-form__label">Email</label>
              <input
                type="email"
                className="auth-form__input"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>

            <div className="auth-form__group">
              <label className="auth-form__label">Password</label>
              <input
                type="password"
                className="auth-form__input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>

            <button
              type="submit"
              className="auth-form__button"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="auth-page__footer">
            <p>Don't have an account? <a href="#" onClick={() => onNavigate?.('signup')}>Sign up</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};
