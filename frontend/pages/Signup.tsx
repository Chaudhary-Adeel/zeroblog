import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export const Signup: React.FC<{ onNavigate?: (page: string) => void }> = ({ onNavigate }) => {
  const { signup, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [tenantName, setTenantName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !username || !password || !confirmPassword || !tenantName) {
      setError('All fields are required');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    signup(email, username, password, tenantName);
    // Redirect to home on success
    setTimeout(() => {
      onNavigate?.('home');
    }, 1000);
  };

  return (
    <div className="auth-page">
      <div className="auth-page__container">
        <div className="auth-page__card">
          <h1 className="auth-page__title">Create Account</h1>
          <p className="auth-page__subtitle">Start your blog journey</p>

          <form className="auth-form" onSubmit={handleSubmit}>
            {error && <div className="auth-form__error">{error}</div>}

            <div className="auth-form__group">
              <label className="auth-form__label">Blog Name</label>
              <input
                type="text"
                className="auth-form__input"
                placeholder="My Awesome Blog"
                value={tenantName}
                onChange={(e) => setTenantName(e.target.value)}
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
              <label className="auth-form__label">Username</label>
              <input
                type="text"
                className="auth-form__input"
                placeholder="yourname"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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

            <div className="auth-form__group">
              <label className="auth-form__label">Confirm Password</label>
              <input
                type="password"
                className="auth-form__input"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>

            <button
              type="submit"
              className="auth-form__button"
              disabled={isLoading}
            >
              {isLoading ? 'Creating account...' : 'Sign Up'}
            </button>
          </form>

          <div className="auth-page__footer">
            <p>Already have an account? <a href="#" onClick={() => onNavigate?.('login')}>Sign in</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};
