import React, { useState } from 'react';
import {
  Eye, EyeOff, ArrowRight, X, Loader2, ArrowLeft
} from 'lucide-react';
import { supabase } from './utils/supabase';
import './GetStarted.css';

export default function GetStarted({ setActivePage }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const lowerEmail = email.toLowerCase();
    const lowerPassword = password.toLowerCase();
    const forbiddenWords = ['entrepreneur', 'admin', 'learner'];

    // 1. Forbidden Words Check
    if (forbiddenWords.some(word => lowerEmail.includes(word) || lowerPassword.includes(word))) {
      setErrorMsg("Email and password cannot contain 'entrepreneur', 'admin', or 'learner'.");
      return;
    }

    // 2. Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    // 3. Password Complexity Check
    // At least 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 symbol
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;
    if (!passwordRegex.test(password)) {
      setErrorMsg("Password must be at least 8 characters and contain at least one uppercase letter, one lowercase letter, one number, and one symbol.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match.");
      return;
    }

    setLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
        }
      }
    });

    setLoading(false);

    if (error) {
      setErrorMsg(error.message);
    } else {
      // Automatic login to dashboard if email confirmations are disabled
      setActivePage('home');
    }
  };

  return (
    <div className="gs-page">
      {/* Dot grid + Waves background */}
      <div className="gs-dot-grid" aria-hidden="true" />
      <div className="gs-waves" aria-hidden="true">
        <svg className="gs-wave gs-wave-1" viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path fill="#e8eaed" fillOpacity="0.6"
            d="M0,192L60,181.3C120,171,240,149,360,154.7C480,160,600,192,720,202.7C840,213,960,203,1080,186.7C1200,171,1320,149,1380,138.7L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z" />
        </svg>
        <svg className="gs-wave gs-wave-2" viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path fill="#dde0e5" fillOpacity="0.45"
            d="M0,256L80,240C160,224,320,192,480,181.3C640,171,800,181,960,197.3C1120,213,1280,235,1360,245.3L1440,256L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z" />
        </svg>
        <svg className="gs-wave gs-wave-3" viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path fill="#d1d5db" fillOpacity="0.3"
            d="M0,288L120,272C240,256,480,224,720,218.7C960,213,1200,235,1320,245.3L1440,256L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z" />
        </svg>
      </div>

      <div className="gs-layout">
        {/* Left Panel */}
        <aside className="gs-left">
          <div className="gs-left-top">
            <button className="gs-back-btn" onClick={() => setActivePage('home')}>
              <ArrowLeft size={15} />
              Back to Home
            </button>

            <h2 className="gs-brand">Console</h2>
            <p className="gs-tagline">
              Join the architectural interface for next-generation engineering teams.
            </p>

            <div className="gs-continue-label">CONTINUE WITH</div>

            <div className="gs-oauth-list">
              <button className="gs-oauth gs-oauth-light" onClick={() => setActivePage('notfound')}>
                <span className="gs-oauth-icon gs-google-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                </span>
                Google
                <ArrowRight size={15} className="gs-oauth-arrow" />
              </button>

              <button className="gs-oauth gs-oauth-dark" onClick={() => setActivePage('notfound')}>
                <span className="gs-oauth-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                  </svg>
                </span>
                GitHub
                <ArrowRight size={15} className="gs-oauth-arrow" />
              </button>
            </div>
          </div>

          <p className="gs-terms">
            By registering, you agree to the{' '}
            <span className="gs-link" onClick={() => setActivePage('notfound')}>Terms of Service</span>
            {' '}and{' '}
            <span className="gs-link" onClick={() => setActivePage('notfound')}>Privacy Policy</span>.
          </p>
        </aside>

        {/* Right Panel */}
        <div className="gs-right">
          {/* Header row */}
          <div className="gs-right-header">
            <h1 className="gs-title">Create your account</h1>
            <div className="gs-right-header-actions">
              <button className="gs-close-btn" onClick={() => setActivePage('home')}>
                <X size={18} />
              </button>
            </div>
          </div>

          {(errorMsg || successMsg) && (
            <div className={`gs-alert ${errorMsg ? 'gs-alert-error' : 'gs-alert-success'}`}>
              {errorMsg || successMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="gs-form">
            {/* Name row */}
            <div className="gs-fields-row">
              <div className="gs-field">
                <label>First Name</label>
                <input
                  type="text"
                  placeholder="John"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="gs-field">
                <label>Last Name</label>
                <input
                  type="text"
                  placeholder="Architect"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Email field (below names) */}
            <div className="gs-field">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="john@console.io"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password Row */}
            <div className="gs-fields-row">
              <div className="gs-field">
                <label>Password</label>
                <div className="gs-password-wrapper">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="gs-eye-btn"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <div className="gs-field">
                <label>Confirm Password</label>
                <div className="gs-password-wrapper">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="••••••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="gs-eye-btn"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
            </div>

            {/* Footer row */}
            <div className="gs-form-footer">
              <span className="gs-already">
                Already have an account?{' '}
                <span className="gs-link" onClick={() => setActivePage('signin')}>Sign In</span>
              </span>
              <button type="submit" className="gs-submit-btn" disabled={loading}>
                {loading ? <Loader2 size={16} className="gs-spin" /> : 'Create Account'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
