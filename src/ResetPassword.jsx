import React, { useState } from 'react';
import { Loader2, KeyRound } from 'lucide-react';
import { supabase } from './utils/supabase';
import './SignIn.css'; // Reusing SignIn styles for consistency

export default function ResetPassword({ setActivePage }) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match.");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setErrorMsg("Password must be at least 6 characters long.");
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.updateUser({ password });

    setLoading(false);

    if (error) {
      setErrorMsg(error.message || "Failed to reset password. The link might have expired.");
    } else {
      setSuccessMsg("Password updated successfully! You can now access your account.");
      setTimeout(() => {
        setActivePage('userdashboard');
      }, 2000);
    }
  };

  return (
    <div className="signin-page">
      {/* Top Navbar */}
      <header className="signin-navbar">
        <div className="signin-navbar-brand" onClick={() => setActivePage('home')} style={{ cursor: 'pointer' }}>Console</div>
      </header>

      <main className="signin-main">
        {/* Decorative Background Waves */}
        <div className="signin-waves" aria-hidden="true">
          <svg className="signin-wave signin-wave-1" viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path fill="#e8eaed" fillOpacity="0.6" d="M0,192L60,181.3C120,171,240,149,360,154.7C480,160,600,192,720,202.7C840,213,960,203,1080,186.7C1200,171,1320,149,1380,138.7L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z" />
          </svg>
          <svg className="signin-wave signin-wave-2" viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path fill="#dde0e5" fillOpacity="0.45" d="M0,256L80,240C160,224,320,192,480,181.3C640,171,800,181,960,197.3C1120,213,1280,235,1360,245.3L1440,256L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z" />
          </svg>
        </div>

        <div className="signin-card" style={{ maxWidth: '500px', display: 'flex', flexDirection: 'column' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ width: '56px', height: '56px', background: '#eff6ff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
              <KeyRound size={28} color="#2f6be8" />
            </div>
            <h1 className="signin-heading" style={{ fontSize: '1.75rem' }}>Set New Password</h1>
            <p className="signin-subtext" style={{ margin: '0.5rem auto 0', maxWidth: '350px' }}>
              Your identity has been verified. Please enter your new secure password below.
            </p>
          </div>

          <div style={{ padding: '0 1rem' }}>
            {(errorMsg || successMsg) && (
              <div className={`gs-alert ${errorMsg ? 'gs-alert-error' : 'gs-alert-success'}`} style={{ marginBottom: '1.5rem' }}>
                {errorMsg || successMsg}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="signin-form">
              <div className="signin-field">
                <label>New Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="signin-field" style={{ marginBottom: '2rem' }}>
                <label>Confirm New Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="signin-submit-btn" disabled={loading || !!successMsg}>
                {loading ? <Loader2 size={16} className="gs-spin" /> : 'Update Password'}
              </button>
            </form>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="signin-footer">
        <span className="signin-footer-brand" onClick={() => setActivePage('home')}>Console</span>
        <div className="signin-footer-links">
          {['Privacy Policy', 'Terms of Service', 'Security', 'Status'].map((l) => (
            <a key={l} href="#" onClick={(e) => { e.preventDefault(); setActivePage('notfound'); }}>{l}</a>
          ))}
        </div>
        <span className="signin-footer-copy">© 2024 Console Architectural Interface. All rights reserved.</span>
      </footer>
    </div>
  );
}
