import React, { useState } from 'react';
import './CapsMushLogin.css';

// ─── Simple SVG Icons ────────────────────────────────────────────────────────
const SignalIcon = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <rect x="1" y="16" width="3" height="6" rx="1" />
    <rect x="6" y="12" width="3" height="10" rx="1" />
    <rect x="11" y="8" width="3" height="14" rx="1" />
    <rect x="16" y="4" width="3" height="18" rx="1" />
  </svg>
);

const WifiIcon = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 7.5C5.9 2.9 18.1 2.9 23 7.5" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" />
    <path d="M5 12C8.3 8.9 15.7 8.9 19 12" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" />
    <path d="M8.5 16C10.5 14.2 13.5 14.2 15.5 16" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" />
    <circle cx="12" cy="19.5" r="1.5" fill="currentColor" />
  </svg>
);

const BatteryIcon = () => (
  <svg viewBox="0 0 28 14" xmlns="http://www.w3.org/2000/svg">
    <rect x="0.5" y="0.5" width="23" height="13" rx="3.5" stroke="currentColor" strokeWidth="1.2" fill="none" />
    <rect x="2" y="2" width="18" height="10" rx="2" fill="currentColor" />
    <path d="M25 4.5v5a2 2 0 000-4z" fill="currentColor" />
  </svg>
);

// Google G SVG
const GoogleG = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

// Apple icon
const AppleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#1a1a1a">
    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.7 9.05 7.4c1.38.07 2.33.75 3.13.8 1.19-.24 2.33-1 3.6-.84 1.53.18 2.68.81 3.44 2.02-3.15 1.9-2.41 5.72.63 6.9-.49 1.38-1.14 2.73-2.8 4zm-3.1-17.3c.09 2.1-1.6 3.82-3.6 3.66-.27-1.9 1.45-3.85 3.6-3.66z" />
  </svg>
);

// ─── Component ───────────────────────────────────────────────────────────────
export default function CapsMushLogin() {
  const [email, setEmail]         = useState('');
  const [password, setPassword]   = useState('');
  const [showPass, setShowPass]   = useState(false);
  const [loading, setLoading]     = useState(false);

  const handleSignIn = (e) => {
    e.preventDefault();
    if (!email || !password) return;
    setLoading(true);
    // Simulate async auth
    setTimeout(() => setLoading(false), 1800);
  };

  return (
    <div className="cmush-root">
      <div className="cmush-phone">

        {/* Background */}
        <div className="cmush-bg" />

        {/* Dynamic Island */}
        <div className="cmush-island" />

        {/* Status bar */}
        <div className="cmush-status-bar">
          <span className="cmush-status-time">9:41</span>
          <div className="cmush-status-icons">
            <SignalIcon />
            <WifiIcon  />
            <BatteryIcon />
          </div>
        </div>

        {/* Scrollable content */}
        <div className="cmush-scroll">
          <div className="cmush-content">

            {/* Logo */}
            <div className="cmush-logo-wrap">
              <div className="cmush-logo-badge">
                <span className="cmush-logo-icon">🍄</span>
              </div>
              <span className="cmush-brand-name">Cap Mush</span>
              <span className="cmush-brand-tagline">From spore to store</span>
            </div>

            {/* Glass Form Card */}
            <div className="cmush-card">
              <form onSubmit={handleSignIn} noValidate>

                {/* Email */}
                <div className="cmush-field-group">
                  <div className="cmush-field-header">
                    <label className="cmush-label" htmlFor="cm-email">Grower Identity</label>
                  </div>
                  <div className="cmush-input-wrap">
                    <span className="cmush-input-icon">✉️</span>
                    <input
                      id="cm-email"
                      type="email"
                      className="cmush-input"
                      placeholder="your@capmush.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      autoComplete="email"
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="cmush-field-group">
                  <div className="cmush-field-header">
                    <label className="cmush-label" htmlFor="cm-password">Access Key</label>
                    <span className="cmush-forgot-link" role="button" tabIndex={0}>Forgotten?</span>
                  </div>
                  <div className="cmush-input-wrap">
                    <span className="cmush-input-icon">🔑</span>
                    <input
                      id="cm-password"
                      type={showPass ? 'text' : 'password'}
                      className="cmush-input"
                      placeholder="••••••••"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      className="cmush-input-toggle"
                      onClick={() => setShowPass(v => !v)}
                      aria-label={showPass ? 'Hide password' : 'Show password'}
                    >
                      {showPass ? '🙈' : '👁️'}
                    </button>
                  </div>
                </div>

                {/* Sign in button */}
                <button
                  type="submit"
                  className="cmush-signin-btn"
                  disabled={loading}
                  id="cm-signin-btn"
                >
                  {loading ? 'Entering the Colony…' : 'Enter the Colony'}
                </button>

              </form>

              {/* Divider */}
              <div className="cmush-divider">
                <div className="cmush-divider-line" />
                <span className="cmush-divider-text">or connect via</span>
                <div className="cmush-divider-line" />
              </div>

              {/* Social auth */}
              <div className="cmush-social-row">
                <button className="cmush-social-btn" type="button" id="cm-google-btn" aria-label="Sign in with Google">
                  <GoogleG />
                  <span className="cmush-social-label">Google</span>
                </button>
                <button className="cmush-social-btn" type="button" id="cm-apple-btn" aria-label="Sign in with Apple">
                  <AppleIcon />
                  <span className="cmush-social-label">Apple</span>
                </button>
              </div>
            </div>

            {/* Register prompt */}
            <p className="cmush-register-prompt">
              New grower?&nbsp;
              <span className="cmush-register-link" role="button" tabIndex={0}>Request Access</span>
            </p>

            {/* Footer */}
            <nav className="cmush-footer">
              <span className="cmush-footer-link" role="button" tabIndex={0}>Privacy</span>
              <span className="cmush-footer-sep" />
              <span className="cmush-footer-link" role="button" tabIndex={0}>Terms</span>
              <span className="cmush-footer-sep" />
              <span className="cmush-footer-link" role="button" tabIndex={0}>Sustainability</span>
            </nav>

            {/* Bottom handle */}
            <div className="cmush-bottom-handle">
              <div className="cmush-handle-line" />
              <span className="cmush-handle-gear" role="button" aria-label="Settings" tabIndex={0}>⚙️</span>
              <div className="cmush-handle-line" />
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
