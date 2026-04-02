import React, { useState } from 'react';
import './LearnerDashboard.css';

const LearnerDashboard = ({ setActivePage }) => {
  // Read learner data stored by LearnerRegistration on success
  const firstName = sessionStorage.getItem('ld_firstName') || 'Learner';
  const email = sessionStorage.getItem('ld_email') || '';
  const goal = sessionStorage.getItem('ld_goal') || 'skills';
  const areas = JSON.parse(sessionStorage.getItem('ld_areas') || '[]');

  const initials = firstName.slice(0, 1).toUpperCase() +
    (sessionStorage.getItem('ld_lastName') || '').slice(0, 1).toUpperCase();

  const [activeNav, setActiveNav] = useState('dashboard');
  const [resourceIdx, setResourceIdx] = useState(0);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleLogout = () => {
    // Wipe all learner-related identity items from sessionStorage
    Object.keys(sessionStorage).forEach(key => {
      if (key.startsWith('ld_')) {
        sessionStorage.removeItem(key);
      }
    });
    // Redirect back to login scene
    setActivePage('learnerlogin');
  };

  const TASKS = [
    { icon: '📅', title: 'Complete HTML/CSS Module 4', due: 'Due Today, 5:00 PM', color: '#ef4444' },
    { icon: '⌨️', title: 'Git Fundamentals Quiz', due: 'Due Tomorrow', color: '#f59e0b' },
    { icon: 'Λ', title: 'Submit Portfolio V1', due: 'Due Friday', color: '#8b5cf6' },
  ];

  const MILESTONES = [
    { icon: '🔥', name: '7-Day Streak', sub: 'Consistency King', done: true },
    { icon: '⊙', name: 'First Commit', sub: 'Hello World Moment', done: true },
    { icon: '🎯', name: 'Fast Learner', sub: '20 Hours This Week', done: true },
    { icon: '👥', name: 'Community Ally', sub: '5 Peer Reviews Done', done: false },
  ];

  const RESOURCES = [
    {
      tag: 'ARTICLE',
      tagColor: '#1e293b',
      img: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=400&q=70',
      title: 'Modern CSS Tricks for Beginners',
      desc: 'Learn how to use Container Queries and Subgrid to build...',
      cta: 'Read More →',
      time: '8 min read',
    },
    {
      tag: 'VIDEO',
      tagColor: '#3b5fe2',
      img: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=400&q=70',
      title: 'Git Fundamentals: Step-by-Step',
      desc: 'Master the command line basics, branching strategies, and how to...',
      cta: 'Watch Now →',
      time: '15 min video',
    },
    {
      tag: 'GUIDE',
      tagColor: '#0d9488',
      img: 'https://images.unsplash.com/photo-1484417894907-623942c8ee29?w=400&q=70',
      title: 'Roadmap: The 2024 Developer',
      desc: 'A curated pathway from absolute beginner to junior developer with...',
      cta: 'Explore →',
      time: 'Interactive Tool',
    },
  ];

  const visibleResources = [
    RESOURCES[resourceIdx % RESOURCES.length],
    RESOURCES[(resourceIdx + 1) % RESOURCES.length],
    RESOURCES[(resourceIdx + 2) % RESOURCES.length],
  ];

  return (
    <div className="ld-root">

      {/* ══ Full-width Header (not clipped by sidebar) ══ */}
      <header className="ld-header">
        <div className="ld-header-brand">
          <span className="ld-header-dot" />
          <span className="ld-header-logo">Console Learn</span>
        </div>
        <nav className="ld-header-nav">
          <a className="ld-header-link">Explore</a>
          <a className="ld-header-link">Pathways</a>
          <a className="ld-header-link">Community</a>
        </nav>
        <div className="ld-header-right">
          <div className="ld-header-search">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
            <input placeholder="Search resources..." className="ld-header-search-input" />
          </div>
          <button className="ld-header-icon-btn" title="Notifications">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>
          </button>
          <button className="ld-header-icon-btn" title="Help">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>
          </button>
          <div className="ld-header-avatar">{initials || 'CL'}</div>
        </div>
      </header>

      {/* ── Sidebar ── */}
      <aside className={`ld-sidebar ${sidebarCollapsed ? 'ld-sidebar--collapsed' : ''}`}>

        {/* Toggle button */}
        <button
          className="ld-sidebar-toggle"
          onClick={() => setSidebarCollapsed(c => !c)}
          title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {sidebarCollapsed ? (
            /* Panel-open icon (chevrons right) */
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <line x1="9" y1="3" x2="9" y2="21" />
              <polyline points="14 9 17 12 14 15" />
            </svg>
          ) : (
            /* Panel-close icon (chevrons left) */
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <line x1="9" y1="3" x2="9" y2="21" />
              <polyline points="11 9 8 12 11 15" />
            </svg>
          )}
        </button>

        {/* Nav */}
        <nav className="ld-nav">
          {[
            {
              key: 'dashboard', label: 'Dashboard', icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>
              )
            },
            {
              key: 'courses', label: 'My Courses', icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>
              )
            },
            {
              key: 'assignments', label: 'Assignments', icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><rect x="8" y="2" width="8" height="4" rx="1" ry="1" /></svg>
              )
            },
            {
              key: 'notes', label: 'Notes', icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
              )
            },
            {
              key: 'support', label: 'Support', icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>
              )
            },
            {
              key: 'live', label: 'Live Sessions', icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 7l-7 5 7 5V7z" /><rect x="1" y="5" width="15" height="14" rx="2" ry="2" /><circle cx="8.5" cy="12" r="1.5" /></svg>
              )
            },
            {
              key: 'quizzes', label: 'Quiz', icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></svg>
              )
            },
            {
              key: 'new', label: 'New to you', icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
              )
            },
            {
              key: 'projects', label: 'Projects', icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></svg>
              )
            },
            {
              key: 'settings', label: 'Settings', icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M19.07 4.93A10 10 0 0 0 6.99 3.34" /><path d="M4 6h.01" /><path d="M2.29 9.62A10 10 0 1 0 21.31 8.35" /></svg>
              )
            },
          ].map(n => (
            <button
              key={n.key}
              className={`ld-nav-item ${activeNav === n.key ? 'ld-nav-item--active' : ''}`}
              onClick={() => setActiveNav(n.key)}
            >
              <span className="ld-nav-icon">{n.icon}</span>
              <span className="ld-nav-label">{n.label}</span>
            </button>
          ))}
        </nav>

        <button className="ld-logout-btn" onClick={handleLogout}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
          <span className="ld-nav-label">Logout</span>
        </button>

        <button className="ld-help">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>
          Help Center
        </button>
      </aside>

      {/* ── Main wrapper ── */}
      <div className={`ld-main-wrap ${sidebarCollapsed ? 'ld-main-wrap--collapsed' : ''}`}>

        {/* ── Content ── */}
        <main className="ld-content">

          {/* Greeting row */}
          <div className="ld-greeting-row">
            <div className="ld-greeting-text">
              <h1 className="ld-greeting">Hello, {sessionStorage.getItem('ld_firstName') || 'Learner'}! Ready to build today?</h1>
              <p className="ld-greeting-sub">You're making great progress. Stick to the plan!</p>
            </div>
            {/* Milestone progress */}
            <div className="ld-milestone-progress">
              <svg width="56" height="56" viewBox="0 0 56 56">
                <circle cx="28" cy="28" r="24" fill="none" stroke="#e2e8f0" strokeWidth="5" />
                <circle cx="28" cy="28" r="24" fill="none" stroke="#3b5fe2" strokeWidth="5"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 24 * 0.45} ${2 * Math.PI * 24 * 0.55}`}
                  transform="rotate(-90 28 28)"
                />
                <text x="50%" y="54%" dominantBaseline="middle" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0f172a">45%</text>
              </svg>
              <div className="ld-ms-text">
                <span className="ld-ms-label">Milestone Progress</span>
                <span className="ld-ms-sub">45% of the way to the first milestone</span>
              </div>
            </div>
          </div>

          {/* Hero + right panel */}
          <div className="ld-hero-row">
            {/* Active course card */}
            <div className="ld-course-card">
              <div className="ld-course-badges">
                <span className="ld-course-pill">ACTIVE COURSE</span>
                <span className="ld-course-modules">+12 Modules Remaining</span>
              </div>
              <div className="ld-course-body">
                <h2 className="ld-course-title">Introduction to Web Development</h2>
                <p className="ld-course-mastering">Currently Mastering: <strong>CSS Flexbox</strong></p>
                <button className="ld-resume-btn">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3" /></svg>
                  Resume Learning
                </button>
              </div>
              <div className="ld-course-progress-bar-wrap">
                <span className="ld-course-progress-label">MODULE 4 OF 12 • 65% COMPLETE</span>
                <div className="ld-course-progress-track">
                  <div className="ld-course-progress-fill" style={{ width: '65%' }} />
                </div>
              </div>
            </div>

            {/* Next Up + Pro Tip */}
            <div className="ld-right-panel">
              <div className="ld-next-up-header">
                <span className="ld-next-up-title">Next Up</span>
                <span className="ld-next-up-viewall">View All</span>
              </div>
              {TASKS.map((t, i) => (
                <div key={i} className="ld-task">
                  <div className="ld-task-icon" style={{ color: t.color }}>{t.icon}</div>
                  <div className="ld-task-info">
                    <span className="ld-task-name">{t.title}</span>
                    <span className="ld-task-due">{t.due}</span>
                  </div>
                </div>
              ))}
              <div className="ld-pro-tip">
                <span className="ld-pro-tip-label">PRO TIP</span>
                <p className="ld-pro-tip-text">"Consistency is the key to mastering code. Even 15 minutes a day makes a difference."</p>
              </div>
            </div>
          </div>

          {/* Milestones */}
          <div className="ld-section">
            <h3 className="ld-section-title">Your Milestones</h3>
            <div className="ld-milestones">
              {MILESTONES.map((m, i) => (
                <div key={i} className={`ld-milestone ${m.done ? 'ld-milestone--done' : ''}`}>
                  <span className="ld-milestone-icon">{m.icon}</span>
                  <span className="ld-milestone-name">{m.name}</span>
                  <span className="ld-milestone-sub">{m.sub}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Handpicked */}
          <div className="ld-section">
            <div className="ld-section-header">
              <h3 className="ld-section-title">Handpicked for You</h3>
              <div className="ld-carousel-arrows">
                <button className="ld-arrow" onClick={() => setResourceIdx((i) => (i - 1 + RESOURCES.length) % RESOURCES.length)}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
                </button>
                <button className="ld-arrow" onClick={() => setResourceIdx((i) => (i + 1) % RESOURCES.length)}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                </button>
              </div>
            </div>
            <div className="ld-resources">
              {visibleResources.map((r, i) => (
                <div key={i} className="ld-resource-card">
                  <div className="ld-resource-img-wrap">
                    <img src={r.img} alt={r.title} className="ld-resource-img" />
                    <span className="ld-resource-tag" style={{ background: r.tagColor }}>{r.tag}</span>
                  </div>
                  <div className="ld-resource-body">
                    <h4 className="ld-resource-title">{r.title}</h4>
                    <p className="ld-resource-desc">{r.desc}</p>
                    <div className="ld-resource-footer">
                      <span className="ld-resource-time">{r.time}</span>
                      <span className="ld-resource-cta">{r.cta}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </main>

        {/* ── Footer ── */}
        <footer className="ld-footer">
          <div className="ld-footer-left">
            <span className="ld-footer-brand">Console Learn</span>
            <span className="ld-footer-copy">© 2024 Precision Atelier Learning Systems</span>
          </div>
          <div className="ld-footer-links">
            {['Privacy', 'Terms', 'Support', 'Academic Integrity'].map(l => (
              <a key={l} className="ld-footer-link">{l}</a>
            ))}
          </div>
        </footer>
      </div>
    </div>
  );
};

export default LearnerDashboard;
