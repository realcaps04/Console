import React, { useState } from 'react';
import {
  Eye, EyeOff, ArrowRight, X, Loader2, ArrowLeft, CheckCircle2, AlertCircle
} from 'lucide-react';
import { supabase } from './utils/supabase';
import './GetStarted.css';

/* ── Validation rules ── */
const RULES = {
  firstName: (v) => {
    if (!v.trim()) return 'First name is required.';
    if (v.trim().length < 2) return 'Must be at least 2 characters.';
    if (!/^[a-zA-Z\s'-]+$/.test(v.trim())) return 'Only letters, spaces, hyphens and apostrophes allowed.';
    return '';
  },
  lastName: (v) => {
    if (!v.trim()) return 'Last name is required.';
    if (v.trim().length < 2) return 'Must be at least 2 characters.';
    if (!/^[a-zA-Z\s'-]+$/.test(v.trim())) return 'Only letters, spaces, hyphens and apostrophes allowed.';
    return '';
  },
  email: (v) => {
    if (!v.trim()) return 'Email address is required.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())) return 'Enter a valid email address.';
    return '';
  },
  password: (v) => {
    if (!v) return 'Password is required.';
    if (v.length < 8) return 'Must be at least 8 characters.';
    if (!/[A-Z]/.test(v)) return 'Must contain at least one uppercase letter.';
    if (!/[a-z]/.test(v)) return 'Must contain at least one lowercase letter.';
    if (!/\d/.test(v)) return 'Must contain at least one number.';
    if (!/[^A-Za-z\d]/.test(v)) return 'Must contain at least one symbol (e.g. @, #, !).';
    return '';
  },
  confirmPassword: (v, password) => {
    if (!v) return 'Please confirm your password.';
    if (v !== password) return 'Passwords do not match.';
    return '';
  },
};

/* Password strength meter */
function getStrength(pw) {
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[a-z]/.test(pw)) score++;
  if (/\d/.test(pw)) score++;
  if (/[^A-Za-z\d]/.test(pw)) score++;
  if (score <= 1) return { label: 'Weak', color: '#ef4444', width: '20%' };
  if (score === 2) return { label: 'Fair', color: '#f59e0b', width: '40%' };
  if (score === 3) return { label: 'Good', color: '#3b82f6', width: '65%' };
  if (score === 4) return { label: 'Strong', color: '#10b981', width: '85%' };
  return { label: 'Very Strong', color: '#059669', width: '100%' };
}

export default function GetStarted({ setActivePage }) {
  const [fields, setFields] = useState({
    firstName: '', lastName: '', email: '', password: '', confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [success, setSuccess] = useState(false);

  const strength = fields.password ? getStrength(fields.password) : null;

  /* Update field + validate immediately if already touched */
  const handleChange = (field, value) => {
    const updated = { ...fields, [field]: value };
    setFields(updated);
    if (touched[field]) {
      const err = field === 'confirmPassword'
        ? RULES.confirmPassword(value, updated.password)
        : RULES[field](value);
      setErrors((prev) => ({ ...prev, [field]: err }));
    }
    // Re-validate confirmPassword when password changes
    if (field === 'password' && touched.confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: RULES.confirmPassword(updated.confirmPassword, value),
      }));
    }
  };

  /* Mark field as touched on blur and validate */
  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const err = field === 'confirmPassword'
      ? RULES.confirmPassword(fields.confirmPassword, fields.password)
      : RULES[field](fields[field]);
    setErrors((prev) => ({ ...prev, [field]: err }));
  };

  /* Validate all fields before submit */
  const validateAll = () => {
    const newErrors = {
      firstName: RULES.firstName(fields.firstName),
      lastName: RULES.lastName(fields.lastName),
      email: RULES.email(fields.email),
      password: RULES.password(fields.password),
      confirmPassword: RULES.confirmPassword(fields.confirmPassword, fields.password),
    };
    setErrors(newErrors);
    setTouched({ firstName: true, lastName: true, email: true, password: true, confirmPassword: true });
    return Object.values(newErrors).every((e) => e === '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    if (!validateAll()) return;

    setLoading(true);
    try {
      /* signUp returns a session + JWT automatically via Supabase Auth */
      const { data, error } = await supabase.auth.signUp({
        email: fields.email.trim().toLowerCase(),
        password: fields.password,
        options: {
          data: {
            first_name: fields.firstName.trim(),
            last_name: fields.lastName.trim(),
          },
        },
      });

      if (error) throw error;

      /* If email confirmation is disabled, session is returned immediately */
      if (data.session) {
        setSuccess(true);
        setTimeout(() => setActivePage('userdashboard'), 1500);
      } else {
        /* Email confirmation required */
        setSuccess(true);
      }
    } catch (err) {
      const msg = err.message || '';
      if (msg.toLowerCase().includes('already registered') || msg.toLowerCase().includes('already exists')) {
        setSubmitError('An account with this email already exists. Sign in instead.');
      } else if (msg.toLowerCase().includes('password')) {
        setSubmitError('Password does not meet Supabase requirements. Try a stronger password.');
      } else {
        setSubmitError(msg || 'Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  /* Field component helper */
  const Field = ({ id, label, type = 'text', placeholder, value, onChange, onBlur, error, touched, rightEl }) => (
    <div className="gs-field">
      <label htmlFor={id}>{label}</label>
      <div className={`gs-input-wrap ${error && touched ? 'gs-input-wrap--error' : ''} ${!error && touched && value ? 'gs-input-wrap--ok' : ''}`}>
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          autoComplete={id}
        />
        {rightEl}
        {!error && touched && value && (
          <CheckCircle2 size={15} className="gs-field-check" />
        )}
      </div>
      {error && touched && (
        <span className="gs-field-error">
          <AlertCircle size={12} /> {error}
        </span>
      )}
    </div>
  );

  return (
    <div className="gs-page">
      <div className="gs-dot-grid" aria-hidden="true" />
      <div className="gs-waves" aria-hidden="true">
        <svg className="gs-wave gs-wave-1" viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path fill="#e8eaed" fillOpacity="0.6" d="M0,192L60,181.3C120,171,240,149,360,154.7C480,160,600,192,720,202.7C840,213,960,203,1080,186.7C1200,171,1320,149,1380,138.7L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z" />
        </svg>
        <svg className="gs-wave gs-wave-2" viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path fill="#dde0e5" fillOpacity="0.45" d="M0,256L80,240C160,224,320,192,480,181.3C640,171,800,181,960,197.3C1120,213,1280,235,1360,245.3L1440,256L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z" />
        </svg>
        <svg className="gs-wave gs-wave-3" viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path fill="#d1d5db" fillOpacity="0.3" d="M0,288L120,272C240,256,480,224,720,218.7C960,213,1200,235,1320,245.3L1440,256L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z" />
        </svg>
      </div>

      <button className="gs-back-btn" onClick={() => setActivePage('home')}>
        <ArrowLeft size={15} />
        Back to Home
      </button>

      <div className="gs-layout">
        {/* Left Panel */}
        <aside className="gs-left">
          <div className="gs-left-top">
            <h2 className="gs-brand">Console</h2>
            <p className="gs-tagline">
              Join the architectural interface for next-generation engineering teams.
            </p>

            <div className="gs-continue-label">CONTINUE WITH</div>

            <div className="gs-oauth-list">
              <button className="gs-oauth gs-oauth-light" type="button" onClick={() => setActivePage('notfound')}>
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

              <button className="gs-oauth gs-oauth-dark" type="button" onClick={() => setActivePage('notfound')}>
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
          <div className="gs-right-header">
            <h1 className="gs-title">Create your account</h1>
            <button className="gs-close-btn" onClick={() => setActivePage('home')} aria-label="Close">
              <X size={18} />
            </button>
          </div>

          {/* Success state */}
          {success ? (
            <div className="gs-success-state">
              <div className="gs-success-icon">
                <CheckCircle2 size={40} color="#10b981" />
              </div>
              <h3>Account Created!</h3>
              <p>Welcome to Console. Redirecting you to your dashboard...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="gs-form" noValidate>

              {submitError && (
                <div className="gs-alert gs-alert-error">
                  <AlertCircle size={15} /> {submitError}
                </div>
              )}

              {/* Name row */}
              <div className="gs-fields-row">
                <Field
                  id="firstName"
                  label="First Name"
                  placeholder="John"
                  value={fields.firstName}
                  onChange={(e) => handleChange('firstName', e.target.value)}
                  onBlur={() => handleBlur('firstName')}
                  error={errors.firstName}
                  touched={touched.firstName}
                />
                <Field
                  id="lastName"
                  label="Last Name"
                  placeholder="Architect"
                  value={fields.lastName}
                  onChange={(e) => handleChange('lastName', e.target.value)}
                  onBlur={() => handleBlur('lastName')}
                  error={errors.lastName}
                  touched={touched.lastName}
                />
              </div>

              {/* Email */}
              <Field
                id="email"
                label="Email Address"
                type="email"
                placeholder="john@console.io"
                value={fields.email}
                onChange={(e) => handleChange('email', e.target.value)}
                onBlur={() => handleBlur('email')}
                error={errors.email}
                touched={touched.email}
              />

              {/* Password row */}
              <div className="gs-fields-row">
                <Field
                  id="password"
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••••••"
                  value={fields.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  onBlur={() => handleBlur('password')}
                  error={errors.password}
                  touched={touched.password}
                  rightEl={
                    <button type="button" className="gs-eye-btn" onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  }
                />
                <Field
                  id="confirmPassword"
                  label="Confirm Password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="••••••••••••"
                  value={fields.confirmPassword}
                  onChange={(e) => handleChange('confirmPassword', e.target.value)}
                  onBlur={() => handleBlur('confirmPassword')}
                  error={errors.confirmPassword}
                  touched={touched.confirmPassword}
                  rightEl={
                    <button type="button" className="gs-eye-btn" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                      {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  }
                />
              </div>

              {/* Password strength meter */}
              {fields.password && (
                <div className="gs-strength">
                  <div className="gs-strength-track">
                    <div className="gs-strength-fill" style={{ width: strength.width, background: strength.color }} />
                  </div>
                  <span className="gs-strength-label" style={{ color: strength.color }}>{strength.label}</span>
                </div>
              )}

              {/* Footer */}
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
          )}
        </div>
      </div>
    </div>
  );
}
