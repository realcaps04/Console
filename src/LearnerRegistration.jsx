import React, { useState, useEffect } from 'react';
import './LearnerRegistration.css';
import { supabase } from './utils/supabase';

/* ── Path choice data ── */
const PATHS = [
  {
    id: 1, label: 'Profile Setup', accent: '#3b5fe2', accentLight: '#eef1fd',
    title: 'Begin Your Journey',
    desc: 'Create your professional profile, set your credentials and unlock personalized learning paths.',
    cta: 'Start Here',
    icon: (<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>),
  },
  {
    id: 2, label: 'Trajectory', accent: '#3b5fe2', accentLight: '#eef1fd',
    title: 'Define Your Path',
    desc: 'Choose your learning trajectory, domains of interest and set the pace for your growth.',
    cta: 'Coming Soon', disabled: true,
    icon: (<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>),
  },
  {
    id: 3, label: 'Review', accent: '#3b5fe2', accentLight: '#eef1fd',
    title: 'Confirm & Launch',
    desc: 'Review your selections, confirm your commitment and activate your Console learning account.',
    cta: 'Coming Soon', disabled: true,
    icon: (<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></svg>),
  },
  {
    id: 4, label: 'Resume', accent: '#0e7490', accentLight: '#ecfeff',
    title: 'Resume Application',
    desc: 'Pick up right where you left off. Your draft profile and progress are saved and waiting for you.',
    cta: 'Continue Draft', badge: 'Pending', disabled: true, resumable: true,
    icon: (<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="12" y1="18" x2="12" y2="12" /><line x1="9" y1="15" x2="15" y2="15" /></svg>),
  },
];


const GOALS = [
  {
    id: 'career',
    title: 'Career Change',
    desc: 'Pivot your professional path into a new technical discipline or industry vertical.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
        <line x1="12" y1="12" x2="12" y2="12.01" />
        <path d="M2 12h20" />
      </svg>
    ),
  },
  {
    id: 'skills',
    title: 'Skill Building',
    desc: 'Master specific frameworks and architectural patterns to deepen your current expertise.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
      </svg>
    ),
  },
  {
    id: 'project',
    title: 'Project Launch',
    desc: 'From concept to deployment. Execute a specific technical vision with targeted mentoring.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
        <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
        <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
      </svg>
    ),
  },
];

const FOCUS_AREAS = ['Frontend', 'UI/UX Design', 'Backend', 'Cloud Ops', 'DevOps', 'Mobile', 'Data Systems', 'Security'];

const LearnerRegistration = ({ setActivePage }) => {
  // ── Restore from sessionStorage on mount ──
  const SS = {
    scene: () => sessionStorage.getItem('lr_scene') || 'paths',
    form: () => JSON.parse(sessionStorage.getItem('lr_form') || 'null'),
    goal: () => sessionStorage.getItem('lr_goal') || 'skills',
    areas: () => JSON.parse(sessionStorage.getItem('lr_areas') || 'null'),
    maxStep: () => parseInt(sessionStorage.getItem('lr_maxStep') || '0', 10),
  };

  const [scene, setSceneRaw] = useState(() => SS.scene());
  const [maxStep, setMaxStep] = useState(() => SS.maxStep());
  const [form, setForm] = useState(() => SS.form() || {
    firstName: '', lastName: '', email: '',
    password: '', confirmPassword: '', qualification: '', agreed: false,
  });
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitState, setSubmitState] = useState('idle');
  const [submitError, setSubmitError] = useState('');
  const [showModal, setShowModal] = useState(false);
  // each step: 'queue' | 'processing' | 'verified' | 'error'
  const STEP_COUNT = 4;
  const [stepStates, setStepStates] = useState(Array(STEP_COUNT).fill('queue'));

  // Existing-user conflict popup state
  const [showConflictPopup, setShowConflictPopup] = useState(false);
  const [conflictConfirmText, setConflictConfirmText] = useState('');
  const [conflictLoading, setConflictLoading] = useState(false);
  const [conflictError, setConflictError] = useState('');

  // Trajectory state
  const [selectedGoal, setSelectedGoal] = useState(() => SS.goal());
  const [selectedAreas, setSelectedAreas] = useState(() => SS.areas() || ['Frontend', 'UI/UX Design', 'DevOps']);

  /* Wrap setScene to also persist & track maxStep */
  const SCENE_STEP = { form: 1, flipping: 1, trajectory: 2, 'flipping-traj': 2, review: 3 };
  const setScene = (s) => {
    setSceneRaw(s);
    const stable = ['form', 'trajectory', 'review'];
    if (stable.includes(s)) {
      sessionStorage.setItem('lr_scene', s);
      const step = SCENE_STEP[s] || 0;
      setMaxStep((prev) => {
        const next = Math.max(prev, step);
        sessionStorage.setItem('lr_maxStep', String(next));
        return next;
      });
    }
  };

  /* Persist form & trajectory on every change */
  useEffect(() => {
    sessionStorage.setItem('lr_form', JSON.stringify(form));
  }, [form]);

  useEffect(() => {
    sessionStorage.setItem('lr_goal', selectedGoal);
  }, [selectedGoal]);

  useEffect(() => {
    sessionStorage.setItem('lr_areas', JSON.stringify(selectedAreas));
  }, [selectedAreas]);

  const QUALIFICATIONS = [
    { value: 'highschool', label: '🏫  High School' },
    { value: 'diploma', label: '📋  Diploma' },
    { value: 'bachelors', label: '🎓  Bachelor\'s Degree' },
    { value: 'masters', label: '📚  Master\'s Degree' },
    { value: 'doctorate', label: '🔬  Doctorate / PhD' },
    { value: 'other', label: '✏️  Other' },
  ];
  const selectedQual = QUALIFICATIONS.find((q) => q.value === form.qualification);

  /* Clear individual error as user types */
  const handle = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  /* Full validation — returns error map, empty = all good */
  const validate = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = 'First name is required.';
    if (!form.lastName.trim()) e.lastName = 'Last name is required.';
    if (!form.email.trim()) e.email = 'Email address is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      e.email = 'Enter a valid email address.';
    if (!form.password) e.password = 'Password is required.';
    else if (form.password.length < 8) e.password = 'Password must be at least 8 characters.';
    if (!form.confirmPassword) e.confirmPassword = 'Please confirm your password.';
    else if (form.password !== form.confirmPassword) e.confirmPassword = 'Passwords do not match.';
    if (!form.qualification) e.qualification = 'Please select your qualification.';
    if (!form.agreed) e.agreed = 'You must accept the Terms of Service.';
    return e;
  };

  const handlePathClick = (path) => {
    if (path.disabled) return;
    setScene('exiting');
    setTimeout(() => setScene('form'), 600);
  };

  /* Save & Continue → validate, then flip to Trajectory */
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      // Scroll to first error
      const firstErr = document.querySelector('.lr-field-error');
      if (firstErr) firstErr.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    setErrors({});
    setScene('flipping');
    setTimeout(() => setScene('trajectory'), 700);
  };

  const [trajErrors, setTrajErrors] = useState({});

  const toggleArea = (area) => {
    setSelectedAreas((prev) =>
      prev.includes(area) ? prev.filter((a) => a !== area) : [...prev, area]
    );
    setTrajErrors((prev) => ({ ...prev, areas: '' }));
  };

  /* Trajectory validation → flip to Review */
  const handleTrajContinue = () => {
    const errs = {};
    if (!selectedGoal) errs.goal = 'Please select a primary goal.';
    if (selectedAreas.length === 0) errs.areas = 'Select at least one focus area.';
    if (Object.keys(errs).length > 0) { setTrajErrors(errs); return; }
    setTrajErrors({});
    setScene('flipping-traj');
    setTimeout(() => setScene('review'), 700);
  };

  /* ── Stepper click navigation with flip ── */
  const STEP_SCENE = { 1: 'form', 2: 'trajectory', 3: 'review' };
  const FLIP_ANIM = { 1: 'flipping', 2: 'flipping-traj', 3: 'flipping-traj' };

  const handleStepClick = (stepNum, activeStep) => {
    if (stepNum === activeStep) return;           // already here
    if (stepNum > maxStep) return;               // haven't reached yet
    const flipScene = FLIP_ANIM[activeStep] || 'flipping';
    setSceneRaw(flipScene);                      // trigger flip on current
    setTimeout(() => setScene(STEP_SCENE[stepNum]), 650);
  };

  /* ── Shared Stepper ── */
  const Stepper = ({ activeStep }) => (
    <div className="lr-stepper">
      {[{ n: 1, label: 'Profile' }, { n: 2, label: 'Trajectory' }, { n: 3, label: 'Review' }].map((s, i, arr) => {
        const clickable = s.n !== activeStep && s.n <= maxStep;
        return (
          <React.Fragment key={s.n}>
            <div
              className={`lr-step ${activeStep >= s.n ? 'lr-step--active' : ''
                } ${activeStep > s.n ? 'lr-step--done' : ''
                } ${clickable ? 'lr-step--clickable' : ''
                }`}
              onClick={() => clickable && handleStepClick(s.n, activeStep)}
              title={clickable ? `Go to ${s.label}` : ''}
            >
              <div className="lr-step-circle">
                {activeStep > s.n
                  ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                  : s.n}
              </div>
              <span className="lr-step-label">{s.label}</span>
            </div>
            {i < arr.length - 1 && (
              <div className={`lr-step-line ${activeStep > s.n ? 'lr-step-line--done' : ''}`} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );

  /* ── Validation step helpers ── */
  const setStep = (i, s) => setStepStates((prev) => { const next = [...prev]; next[i] = s; return next; });

  /* Translate raw DB/network errors into plain English for learners */
  const friendlyError = (err) => {
    const msg = (err?.message || '').toLowerCase();
    const code = err?.code || '';

    if (code === '23505' || msg.includes('duplicate') || msg.includes('unique'))
      return 'An account with this email address already exists. Please sign in instead, or use a different email.';

    if (msg.includes('network') || msg.includes('fetch') || msg.includes('failed to fetch'))
      return 'Unable to reach the server. Please check your internet connection and try again.';

    if (code === '42501' || msg.includes('permission') || msg.includes('rls') || msg.includes('policy'))
      return 'Access was denied by the server. Please refresh the page and try again.';

    if (code?.startsWith('53') || msg.includes('too many') || msg.includes('connection'))
      return 'Our servers are experiencing high traffic right now. Please wait a moment and try again.';

    if (msg.includes('null value') || msg.includes('not-null'))
      return 'Some required information is missing. Please go back and fill in all fields.';

    if (msg.includes('invalid input') || msg.includes('invalid value'))
      return 'One or more of your entries appears to be invalid. Please go back and check your information.';

    return 'Something went wrong while creating your account. Please try again or contact support.';
  };

  /* Finalize Account → show modal, animate steps, then insert */
  const handleFinalize = async () => {
    if (submitState === 'success') return;   // already registered

    // ── Pre-check: does a user account already exist with this email? ──
    const { data: existingUser } = await supabase
      .from('users')
      .select('id, is_learner')
      .eq('email', form.email.trim().toLowerCase())
      .maybeSingle();

    if (existingUser && !existingUser.is_learner) {
      // A platform user exists with this email but is NOT yet a learner
      setShowConflictPopup(true);
      return;
    }

    // No conflict — proceed with registration
    runRegistration();
  };

  /* Called after conflict is confirmed OR directly when no conflict */
  const runRegistration = () => {
    setShowModal(true);
    setSubmitError('');
    setSubmitState('loading');
    setStepStates(Array(STEP_COUNT).fill('queue'));

    // Step 0: Authenticating Identity
    setTimeout(() => setStep(0, 'processing'), 600);
    setTimeout(() => setStep(0, 'verified'), 1600);

    // Step 1: Technical Proficiency
    setTimeout(() => setStep(1, 'processing'), 1900);
    setTimeout(() => setStep(1, 'verified'), 3000);

    // Step 2: Custom Workspace
    setTimeout(() => setStep(2, 'processing'), 3300);
    setTimeout(() => setStep(2, 'verified'), 4400);

    // Step 3: Finalizing Atelier — Auth signup + DB insert fires here
    setTimeout(() => setStep(3, 'processing'), 4700);
    setTimeout(async () => {
      try {
        // Step 1: Create auth user (password is bcrypt-hashed by Supabase)
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email: form.email.trim().toLowerCase(),
          password: form.password,
          options: {
            data: {
              first_name: form.firstName.trim(),
              last_name: form.lastName.trim(),
              role: 'learner',
              qualification: form.qualification,
              primary_goal: selectedGoal,
              focus_areas: selectedAreas,
              agreed_terms: form.agreed,
            }
          }
        });

        if (authError) throw authError;
        if (!authData.user) throw new Error('Account creation failed. Please try again.');

        // Step 2: Insert learner profile into public.Learners (no password stored)
        // If email confirmation is enabled, we won't have a session yet, so we skip the insert
        // to avoid a 401 Unauthorized error from RLS policies.
        if (authData.session) {
          const { error: profileError } = await supabase
            .from('Learners')
            .insert([{
              id:            authData.user.id,
              first_name:    form.firstName.trim(),
              last_name:     form.lastName.trim(),
              email:         form.email.trim().toLowerCase(),
              qualification: form.qualification,
              primary_goal:  selectedGoal,
              focus_areas:   selectedAreas,
              agreed_terms:  form.agreed,
            }]);

          if (profileError) {
            console.warn('Profile insert warning:', profileError);
          }
        }

        setStep(3, 'verified');
        
        // If there's no session, they need to verify their email
        if (!authData.session) {
          setSubmitState('verify_email');
        } else {
          setSubmitState('success');
        }

        // Persist learner identity for the dashboard
        sessionStorage.setItem('ld_firstName', form.firstName.trim());
        sessionStorage.setItem('ld_lastName',  form.lastName.trim());
        sessionStorage.setItem('ld_email',     form.email.trim().toLowerCase());
        sessionStorage.setItem('ld_goal',      selectedGoal);
        sessionStorage.setItem('ld_areas',     JSON.stringify(selectedAreas));

        // Wipe registration session keys
        ['lr_scene','lr_form','lr_goal','lr_areas','lr_maxStep']
          .forEach(k => sessionStorage.removeItem(k));

      } catch (err) {
        console.error('[Learners] Registration error:', err);
        setStep(3, 'error');
        setSubmitError(friendlyError(err));
        setSubmitState('error');
      }
    }, 5200);
  };

  /* Handle conflict popup confirmation — user types "confirm" to proceed */
  const handleConflictConfirm = async () => {
    if (conflictConfirmText.trim().toLowerCase() !== 'confirm') {
      setConflictError('Please type "confirm" exactly to proceed.');
      return;
    }
    setConflictLoading(true);
    setConflictError('');
    try {
      // Update is_learner = true in users table for this email
      const { error } = await supabase
        .from('users')
        .update({ is_learner: true })
        .eq('email', form.email.trim().toLowerCase());

      if (error) throw error;

      setShowConflictPopup(false);
      setConflictConfirmText('');
      // Now proceed with full learner registration
      runRegistration();
    } catch (err) {
      setConflictError('Failed to update account. Please try again.');
    } finally {
      setConflictLoading(false);
    }
  };



if (scene === 'paths' || scene === 'exiting') {
  return (
    <div className="lr-page">
      <main className="lr-path-scene">
        <div className="lr-path-intro">
          <span className="lr-path-eyebrow">console learning</span>
          <h1 className="lr-path-heading">Choose Your Starting Point</h1>
          <p className="lr-path-sub">
            Your journey is structured into three milestones. Begin with step one to unlock the full experience.
          </p>
        </div>

        <div className={`lr-path-grid ${scene === 'exiting' ? 'lr-path-grid--exit' : ''}`}>
          {PATHS.map((path, i) => (
            <div
              key={path.id}
              className={`lr-path-card lr-path-card--${i + 1} ${path.disabled ? 'lr-path-card--disabled' : ''} ${path.resumable ? 'lr-path-card--resumable' : ''} ${scene === 'exiting' && !path.disabled ? 'lr-path-card--selected' : ''}`}
              style={{ '--accent': path.accent, '--accent-light': path.accentLight, animationDelay: `${i * 0.12}s` }}
              onClick={() => handlePathClick(path)}
            >
              {path.badge
                ? <div className="lr-path-pending-pill">{path.badge}</div>
                : <div className="lr-path-badge">{path.id}</div>}

              <div className="lr-path-icon" style={{ background: path.accentLight, color: path.accent }}>{path.icon}</div>
              <span className="lr-path-step-label">{path.label}</span>
              <h3 className="lr-path-card-title">{path.title}</h3>
              <p className="lr-path-card-desc">{path.desc}</p>

              <button
                className="lr-path-cta"
                style={path.disabled
                  ? (path.resumable ? { background: path.accentLight, color: path.accent, border: `1.5px solid ${path.accent}` } : {})
                  : { background: path.accent, color: '#fff' }}
                disabled={path.disabled}
              >
                {path.cta}
                {!path.disabled && (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                  </svg>
                )}
              </button>

              {path.disabled && !path.resumable && <div className="lr-path-lock">🔒 Complete step {path.id - 1} first</div>}
              {path.resumable && <div className="lr-path-lock" style={{ color: path.accent }}>⚠️ Draft saved — sign in to continue</div>}
            </div>
          ))}
        </div>

        <div className="lr-path-steps-indicator">
          {PATHS.map((p) => <div key={p.id} className={`lr-dot ${p.id === 1 ? 'lr-dot--active' : ''}`} />)}
        </div>
      </main>
    </div>
  );
}

/* ══════════════════════════════
   SCENE B: Profile form (+ flip wrapper)
══════════════════════════════ */
if (scene === 'form' || scene === 'flipping') {
  return (
    <div className="lr-page">
      <Stepper activeStep={1} />

      <main className={`lr-main ${scene === 'form' ? 'lr-main--animated' : ''}`}>
        <div className={`lr-flip-wrapper ${scene === 'flipping' ? 'lr-flip-wrapper--flipping' : ''}`}>
          <div className="lr-card">
            <h2 className="lr-title">Begin Your Journey</h2>
            <p className="lr-subtitle">
              Create your professional profile to unlock personalized learning pathways tailored to your career aspirations.
            </p>

            <form className="lr-form" onSubmit={handleFormSubmit}>
              <div className="lr-row">
                <div className="lr-field">
                  <label htmlFor="lr-fname">FIRST NAME</label>
                  <input
                    id="lr-fname" name="firstName" type="text" placeholder="e.g., Alexander"
                    value={form.firstName} onChange={handle}
                    className={errors.firstName ? 'lr-input-error' : ''}
                  />
                  {errors.firstName && <span className="lr-field-error">{errors.firstName}</span>}
                </div>
                <div className="lr-field">
                  <label htmlFor="lr-lname">LAST NAME</label>
                  <input
                    id="lr-lname" name="lastName" type="text" placeholder="e.g., Hamilton"
                    value={form.lastName} onChange={handle}
                    className={errors.lastName ? 'lr-input-error' : ''}
                  />
                  {errors.lastName && <span className="lr-field-error">{errors.lastName}</span>}
                </div>
              </div>

              <div className="lr-field lr-field--full">
                <label htmlFor="lr-email">EMAIL ADDRESS</label>
                <input
                  id="lr-email" name="email" type="email" placeholder="alexander@console.io"
                  value={form.email} onChange={handle}
                  className={errors.email ? 'lr-input-error' : ''}
                />
                {errors.email && <span className="lr-field-error">{errors.email}</span>}
              </div>

              <div className="lr-row">
                <div className="lr-field">
                  <label htmlFor="lr-pw">PASSWORD</label>
                  <input
                    id="lr-pw" name="password" type="password" placeholder="••••••••"
                    value={form.password} onChange={handle}
                    className={errors.password ? 'lr-input-error' : ''}
                  />
                  {errors.password && <span className="lr-field-error">{errors.password}</span>}
                </div>
                <div className="lr-field">
                  <label htmlFor="lr-cpw">CONFIRM PASSWORD</label>
                  <input
                    id="lr-cpw" name="confirmPassword" type="password" placeholder="••••••••"
                    value={form.confirmPassword} onChange={handle}
                    className={errors.confirmPassword ? 'lr-input-error' : ''}
                  />
                  {errors.confirmPassword && <span className="lr-field-error">{errors.confirmPassword}</span>}
                </div>
              </div>

              <div className="lr-field lr-field--full">
                <label>MAXIMUM EDUCATIONAL QUALIFICATION</label>
                <div
                  className={`lr-custom-select ${dropdownOpen ? 'lr-custom-select--open' : ''} ${errors.qualification ? 'lr-custom-select--error' : ''}`}
                  onClick={() => setDropdownOpen((o) => !o)}
                  onBlur={() => setTimeout(() => setDropdownOpen(false), 150)}
                  tabIndex={0}
                >
                  <span className={`lr-custom-select__value ${!selectedQual ? 'lr-custom-select__placeholder' : ''}`}>
                    {selectedQual ? selectedQual.label : 'Select your highest degree'}
                  </span>
                  <span className="lr-custom-select__arrow">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </span>
                  {dropdownOpen && (
                    <ul className="lr-custom-select__menu" role="listbox">
                      {QUALIFICATIONS.map((q) => (
                        <li
                          key={q.value}
                          role="option"
                          aria-selected={form.qualification === q.value}
                          className={`lr-custom-select__option ${form.qualification === q.value ? 'lr-custom-select__option--active' : ''}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setForm((prev) => ({ ...prev, qualification: q.value }));
                            setErrors((prev) => ({ ...prev, qualification: '' }));
                            setDropdownOpen(false);
                          }}
                        >
                          {q.label}
                          {form.qualification === q.value && (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                {errors.qualification && <span className="lr-field-error">{errors.qualification}</span>}
              </div>

              <label className="lr-checkbox">
                <input
                  type="checkbox" name="agreed" checked={form.agreed}
                  onChange={(e) => { handle(e); setErrors((prev) => ({ ...prev, agreed: '' })); }}
                />
                <span className={`lr-checkmark ${errors.agreed ? 'lr-checkmark--error' : ''}`} />
                <span className="lr-checkbox-text">
                  I agree to the{' '}
                  <a href="#" onClick={(e) => e.preventDefault()}>Terms of Service</a>{' '}
                  and{' '}
                  <a href="#" onClick={(e) => e.preventDefault()}>Privacy Policy</a>{' '}
                  regarding the collection and use of my professional data.
                </span>
              </label>
              {errors.agreed && <span className="lr-field-error" style={{ marginTop: '-0.75rem', marginBottom: '0.5rem' }}>{errors.agreed}</span>}

              <div className="lr-actions">
                <p className="lr-signin-prompt">
                  Already have an account?{' '}
                  <span className="lr-signin-link" onClick={() => setActivePage('learnerlogin')}>Sign In</span>
                </p>
                <button type="submit" className="lr-submit-btn">Save &amp; Continue</button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <footer className="lr-footer">
        <p>© 2024 CONSOLE ARCHITECTURAL LEARNING SYSTEMS</p>
      </footer>
    </div>
  );
}

/* ══════════════════════════════
   SCENE C: Trajectory (+ flip-traj)
══════════════════════════════ */
if (scene === 'trajectory' || scene === 'flipping-traj') {
  return (
    <div className="lr-page">
      <Stepper activeStep={2} />
      <main className={`lr-traj-main ${scene === 'flipping-traj' ? 'lr-traj-main--flipping' : ''}`}>
        {/* Heading */}
        <div className="lr-traj-hero">
          <h1 className="lr-traj-title">Define Your Trajectory</h1>
          <p className="lr-traj-sub">
            Map your professional evolution. Our precision-guided curriculum adapts to your specific career milestones.
          </p>
        </div>

        <div className="lr-traj-card">
          {/* PRIMARY GOAL */}
          <div className="lr-traj-section-label">
            <div className="lr-traj-section-bar" />
            <span>SELECT YOUR PRIMARY GOAL</span>
          </div>

          <div className="lr-goals-grid">
            {GOALS.map((g) => (
              <div
                key={g.id}
                className={`lr-goal-card ${selectedGoal === g.id ? 'lr-goal-card--active' : ''}`}
                onClick={() => setSelectedGoal(g.id)}
              >
                {selectedGoal === g.id && (
                  <div className="lr-goal-check">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                )}
                <div className={`lr-goal-icon ${selectedGoal === g.id ? 'lr-goal-icon--active' : ''}`}>{g.icon}</div>
                <h4 className="lr-goal-title">{g.title}</h4>
                <p className="lr-goal-desc">{g.desc}</p>
              </div>
            ))}
          </div>
          {trajErrors.goal && <span className="lr-field-error" style={{ marginTop: '0.5rem' }}>{trajErrors.goal}</span>}

          {/* FOCUS AREAS */}
          <div className="lr-traj-section-label" style={{ marginTop: '2rem' }}>
            <div className="lr-traj-section-bar" />
            <span>FOCUS AREAS</span>
          </div>

          <div className={`lr-focus-box ${trajErrors.areas ? 'lr-focus-box--error' : ''}`}>
            <p className="lr-focus-prompt">Select the technical domains that align with your trajectory objectives:</p>
            <div className="lr-focus-tags">
              {FOCUS_AREAS.map((area) => (
                <button
                  key={area}
                  className={`lr-focus-tag ${selectedAreas.includes(area) ? 'lr-focus-tag--active' : ''}`}
                  onClick={() => toggleArea(area)}
                  type="button"
                >
                  {area}
                </button>
              ))}
            </div>
          </div>
          {trajErrors.areas && <span className="lr-field-error" style={{ marginTop: '0.5rem' }}>{trajErrors.areas}</span>}
        </div>

        {/* Navigation */}
        <div className="lr-traj-nav">
          <button className="lr-traj-back" onClick={() => setScene('form')}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
            </svg>
            Go Back
          </button>
          <button className="lr-traj-continue" onClick={handleTrajContinue}>
            Continue to Review
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </div>
      </main>

      <footer className="lr-footer lr-footer--light">
        <div className="lr-footer-brand">
          <span className="lr-footer-brand-name">Console Core</span>
          <p className="lr-footer-copy-small">&copy; 2024 PRECISION IN INFRASTRUCTURE.</p>
        </div>
        <div className="lr-footer-links-row">
          <a href="#">Privacy Policy</a>
          <a href="#">Security</a>
          <a href="#">Status</a>
          <a href="#">Contact</a>
        </div>
      </footer>
    </div>
  );
}

/* ══════════════════════════════
   SCENE D: Review
══════════════════════════════ */
const goalObj = GOALS.find((g) => g.id === selectedGoal);
const qualObj = QUALIFICATIONS.find((q) => q.value === form.qualification);
const qualLabel = qualObj ? qualObj.label.replace(/^.{2,4}\s+/, '') : '—';

return (
  <div className="lr-page">
    <Stepper activeStep={3} />

    {/* ══ Conflict Popup — existing platform user with same email ══ */}
    {showConflictPopup && (
      <div className="lr-conflict-overlay">
        <div className="lr-conflict-popup">
          <div className="lr-conflict-icon">⚠️</div>
          <h3 className="lr-conflict-title">Account Already Exists</h3>
          <p className="lr-conflict-body">
            A <strong>Console platform user</strong> already exists with the email{' '}
            <strong>{form.email.trim().toLowerCase()}</strong>.<br /><br />
            If this is you and you want to also enroll as a learner, type{' '}
            <strong>"confirm"</strong> below to link both accounts.
          </p>
          <input
            className="lr-conflict-input"
            type="text"
            placeholder='Type "confirm" to proceed'
            value={conflictConfirmText}
            onChange={(e) => { setConflictConfirmText(e.target.value); setConflictError(''); }}
          />
          {conflictError && (
            <p className="lr-conflict-error">{conflictError}</p>
          )}
          <div className="lr-conflict-actions">
            <button
              className="lr-conflict-cancel"
              onClick={() => { setShowConflictPopup(false); setConflictConfirmText(''); setConflictError(''); }}
              disabled={conflictLoading}
            >
              Cancel
            </button>
            <button
              className="lr-conflict-confirm"
              onClick={handleConflictConfirm}
              disabled={conflictLoading}
            >
              {conflictLoading ? 'Updating...' : 'Confirm & Continue'}
            </button>
          </div>
        </div>
      </div>
    )}

    {/* ══ Validation Modal Overlay ══ */}
    {showModal && (() => {
      const VSTEPS = [
        {
          label: 'Authenticating Identity',
          icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>),
        },
        {
          label: 'Technical Proficiency',
          icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M19.07 4.93A10 10 0 0 0 6.99 3.34" /><path d="M4 6h.01" /><path d="M2.29 9.62A10 10 0 1 0 21.31 8.35" /></svg>),
        },
        {
          label: 'Custom Workspace',
          icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>),
        },
        {
          label: 'Finalizing Learner',
          icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>),
        },
      ];

      const doneCount = stepStates.filter(s => s === 'verified').length;
      const progressPct = (doneCount / STEP_COUNT) * 100;

      return (
        <div className="lr-modal-overlay">
          <div className="lr-modal-panel">
            {/* Grid dot background */}
            <div className="lr-modal-dots" />

            {/* Central icon with circular progress ring */}
            {(() => {
              const R = 54;          // ring radius
              const C = 2 * Math.PI * R;  // circumference ≈ 339.3
              const offset = C - (progressPct / 100) * C;
              const isProcessing = stepStates.some(s => s === 'processing');
              const isDone = submitState === 'success' || submitState === 'verify_email';
              return (
                <div className="lr-modal-icon-wrap">
                  {/* SVG ring: track + progress arc + spin arc */}
                  <svg
                    className="lr-modal-ring-svg"
                    width="120" height="120"
                    viewBox="0 0 120 120"
                    style={{ position: 'absolute', top: 0, left: 0 }}
                  >
                    {/* Track */}
                    <circle cx="60" cy="60" r={R} fill="none" stroke="#e2e5f0" strokeWidth="4" />
                    {/* Progress fill */}
                    <circle
                      cx="60" cy="60" r={R}
                      fill="none"
                      stroke="#3b5fe2"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeDasharray={C}
                      strokeDashoffset={offset}
                      transform="rotate(-90 60 60)"
                      style={{ transition: 'stroke-dashoffset 0.7s cubic-bezier(0.4,0,0.2,1)' }}
                    />
                    {/* Spinning arc shown while any step is processing */}
                    {isProcessing && !isDone && (
                      <circle
                        cx="60" cy="60" r={R}
                        fill="none"
                        stroke="#6979f8"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeDasharray={`${C * 0.18} ${C * 0.82}`}
                        transform="rotate(-90 60 60)"
                        className="lr-modal-spin-arc"
                      />
                    )}
                  </svg>
                  {/* Icon core */}
                  <div className="lr-modal-icon-core">
                    {isDone ? (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3b5fe2" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    ) : (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3b5fe2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" /><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
                      </svg>
                    )}
                  </div>
                </div>
              );
            })()}

            <h2 className="lr-modal-title">Validating Your Blueprint</h2>
            <p className="lr-modal-sub">Architecting your personalized environment and verifying professional credentials.</p>


            {/* Step cards */}
            <div className="lr-modal-steps">
              {VSTEPS.map((vs, i) => {
                const st = stepStates[i];
                return (
                  <div
                    key={vs.label}
                    className={`lr-modal-step lr-modal-step--${st}`}
                    style={{ animationDelay: `${i * 0.08}s` }}
                  >
                    <div className="lr-modal-step-icon">
                      {st === 'verified'
                        ? <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                        : vs.icon}
                    </div>
                    <span className="lr-modal-step-label">{vs.label}</span>
                    <span className="lr-modal-step-status">
                      {st === 'queue' && 'Queue'}
                      {st === 'processing' && 'Processing...'}
                      {st === 'verified' && 'Verified'}
                      {st === 'error' && 'Failed'}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Error message */}
            {submitState === 'error' && (
              <p className="lr-modal-error">{submitError}</p>
            )}

            {/* Success action */}
            {submitState === 'success' && (
              <button
                className="lr-modal-done"
                onClick={() => {
                  setShowModal(false);
                  setActivePage('learnerdashboard');
                }}
              >
                Enter Console Learning →
              </button>
            )}

            {/* Verify Email action */}
            {submitState === 'verify_email' && (
              <div style={{ textAlign: 'center', marginTop: '1rem', width: '100%' }}>
                <p style={{ color: '#0f172a', fontWeight: '700', marginBottom: '0.5rem', fontSize: '1.1rem' }}>Check your email!</p>
                <p style={{ color: '#64748b', fontSize: '0.85rem', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                  We've sent a verification link to <strong style={{color: '#0f172a'}}>{form.email.trim().toLowerCase()}</strong>.<br/>Please verify your account before logging in.
                </p>
                <button
                  className="lr-modal-done"
                  onClick={() => {
                    setShowModal(false);
                    setActivePage('learnerlogin');
                  }}
                >
                  Go to Login →
                </button>
              </div>
            )}

            {/* Error retry */}
            {submitState === 'error' && (
              <button
                className="lr-modal-retry"
                onClick={() => {
                  setShowModal(false);
                  setSubmitState('idle');
                  setSubmitError('');
                }}
              >
                ← Go back and try again
              </button>
            )}

            {/* Footer status bar */}
            <div className="lr-modal-statusbar">
              <span>PRECISION PROTOCOL V4.2.0</span>
              <span className="lr-modal-statusbar-dot" />
              <span>ENCRYPTED SESSION</span>
              <span>SYSTEM LOAD: OPTIMAL</span>
            </div>
          </div>
        </div>
      );
    })()}

    <main className="lr-review-main">
      <div className="lr-review-layout">

        {/* ── Left Panel ── */}
        <div className="lr-review-left">
          <div className="lr-review-left-text">
            <h2 className="lr-review-left-title">Verify Your Blueprint</h2>
            <p className="lr-review-left-sub">
              Confirm your technical profile and learning path before we initialize your workspace in the precision atelier.
            </p>
          </div>
          <div className="lr-review-left-img">
            <img
              src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=500&q=80"
              alt="Blueprint workspace"
            />
          </div>
        </div>

        {/* ── Right Panel ── */}
        <div className="lr-review-right">

          {/* Identity Module */}
          <div className="lr-review-module">
            <div className="lr-review-module-header">
              <div className="lr-review-module-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <h3 className="lr-review-module-title">Identity Module</h3>
            </div>

            <div className="lr-review-data-card">
              <div className="lr-review-row-2">
                <div className="lr-review-field">
                  <span className="lr-review-field-label">First name</span>
                  <span className="lr-review-field-value">{form.firstName || '—'}</span>
                </div>
                <div className="lr-review-field">
                  <span className="lr-review-field-label">Last name</span>
                  <span className="lr-review-field-value">{form.lastName || '—'}</span>
                </div>
              </div>
              <div className="lr-review-divider" />
              <div className="lr-review-field">
                <span className="lr-review-field-label">Email address</span>
                <span className="lr-review-field-value">{form.email || '—'}</span>
              </div>
              <div className="lr-review-divider" />
              <div className="lr-review-field">
                <span className="lr-review-field-label">Academic qualification</span>
                <span className="lr-review-field-value">{qualLabel}</span>
              </div>
            </div>
          </div>

          {/* Aspiration Module */}
          <div className="lr-review-module">
            <div className="lr-review-module-header">
              <div className="lr-review-module-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
                </svg>
              </div>
              <h3 className="lr-review-module-title">Aspiration Module</h3>
            </div>

            <div className="lr-review-data-card lr-review-data-card--split">
              <div className="lr-review-split-left">
                <span className="lr-review-field-label">Primary goal</span>
                <div className="lr-review-goal-row">
                  <span className="lr-review-goal-icon">{goalObj?.icon}</span>
                  <span className="lr-review-goal-name">{goalObj?.title || '—'}</span>
                </div>
              </div>
              <div className="lr-review-split-divider" />
              <div className="lr-review-split-right">
                <span className="lr-review-field-label">Focus areas</span>
                <div className="lr-review-area-pills">
                  {selectedAreas.length > 0
                    ? selectedAreas.map((a) => <span key={a} className="lr-review-area-pill">{a}</span>)
                    : <span className="lr-review-field-value">None selected</span>
                  }
                </div>
              </div>
            </div>
          </div>

          {/* Finalize */}
          <button className="lr-review-finalize" onClick={handleFinalize}>
            Finalize Account
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
            </svg>
          </button>

          <button className="lr-review-goback" onClick={() => setScene('trajectory')}>
            Go Back
          </button>
        </div>
      </div>
    </main>
  </div>
);
};

export default LearnerRegistration;

