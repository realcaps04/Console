import React, { useState } from 'react';
import {
  Search,
  Star,
  Clock,
  BarChart2,
  Bell,
  HelpCircle,
  Settings,
  LifeBuoy,
  ChevronDown,
  BookOpen,
  Shield,
  Database,
  Terminal,
  Cpu,
  Layers,
  Award,
  Users,
} from 'lucide-react';
import './LanguageLearning.css';

// ── DATA ─────────────────────────────────────────────────────────────────────

const sidebarCategories = [
  { id: 'all',   icon: <BookOpen size={15} />,  label: 'All Courses' },
  { id: 'cloud', icon: <Layers size={15} />,    label: 'Cloud Architecture', active: true },
  { id: 'sec',   icon: <Shield size={15} />,    label: 'Cybersecurity' },
  { id: 'data',  icon: <Database size={15} />,  label: 'Data Science' },
  { id: 'devops',icon: <Terminal size={15} />,  label: 'DevOps' },
];

const LEVEL_FILTERS = ['All Levels', 'Beginner', 'Intermediate', 'Advanced'];
const DURATION_OPTIONS = ['Any length', '< 2 hours', '2–5 hours', '5–10 hours', '10+ hours'];

const courses = [
  {
    id: 1,
    tag: 'CLOUD',
    tagColor: 'cloud',
    title: 'Advanced Kubernetes Orchestration',
    rating: 4.8,
    ratingCount: 4.8,
    duration: '14h 30m',
    level: 'Advanced',
    price: 199,
    gradient: 'grad-cloud',
  },
  {
    id: 2,
    tag: 'SECURITY',
    tagColor: 'security',
    title: 'Quantum Cryptography Fundamentals',
    rating: 5.0,
    ratingCount: 5.0,
    duration: '8h 15m',
    level: 'Intermediate',
    price: 249,
    gradient: 'grad-security',
  },
  {
    id: 3,
    tag: 'DATA',
    tagColor: 'data',
    title: 'Large Language Models Mastery',
    rating: 4.2,
    ratingCount: 4.2,
    duration: '22h 45m',
    level: 'Advanced',
    price: 299,
    gradient: 'grad-data',
  },
  {
    id: 4,
    tag: 'DEVOPS',
    tagColor: 'devops',
    title: 'Site Reliability Engineering II',
    rating: 4.5,
    ratingCount: 4.5,
    duration: '12h 00m',
    level: 'Advanced',
    price: 179,
    gradient: 'grad-devops',
  },
  {
    id: 5,
    tag: 'NETWORK',
    tagColor: 'network',
    title: 'SDN: Software Defined Networking',
    rating: 4.9,
    ratingCount: 4.9,
    duration: '10h 15m',
    level: 'Intermediate',
    price: 129,
    gradient: 'grad-network',
  },
  {
    id: 6,
    tag: 'INTELLIGENCE',
    tagColor: 'intelligence',
    title: 'Data Engineering with Rust',
    rating: 4.7,
    ratingCount: 4.7,
    duration: '18h 20m',
    level: 'Advanced',
    price: 249,
    gradient: 'grad-intelligence',
  },
];

// ── HELPERS ───────────────────────────────────────────────────────────────────

function StarRating({ value }) {
  const full  = Math.floor(value);
  const half  = value % 1 >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  return (
    <span className="ll-stars" aria-label={`${value} out of 5`}>
      {'★'.repeat(full)}
      {half ? '½' : ''}
      {'☆'.repeat(empty)}
    </span>
  );
}

// Course thumbnail with abstract tech gradient art
function CourseThumbnail({ gradient, tag, tagColor }) {
  return (
    <div className={`ll-thumb ${gradient}`}>
      <span className={`ll-card-tag ll-tag-${tagColor}`}>{tag}</span>
      <div className="ll-thumb-art" />
    </div>
  );
}

// ── COMPONENT ─────────────────────────────────────────────────────────────────

export default function LanguageLearning({ setActivePage }) {
  const [activeCategory, setActiveCategory] = useState('cloud');
  const [activeLevel,    setActiveLevel]    = useState('All Levels');
  const [activeDuration, setActiveDuration] = useState('Any length');
  const [durationOpen,   setDurationOpen]   = useState(false);
  const [searchValue,    setSearchValue]    = useState('');

  return (
    <div className="ll-root">

      {/* ── TOP NAV ── */}
      <header className="ll-topnav">
        <div className="ll-topnav-left">
          <span className="ll-brand" onClick={() => setActivePage('home')}>Console</span>
          <nav className="ll-topnav-links">
            <span className="ll-tnav-active">Catalog</span>
            <span onClick={() => setActivePage('projectdevelopment')}>Pathways</span>
            <span>Certifications</span>
            <span onClick={() => setActivePage('solutions')}>Teams</span>
          </nav>
        </div>
        <div className="ll-topnav-right">
          <div className="ll-search-pill">
            <Search size={14} className="ll-search-ico" />
            <input
              className="ll-search-input"
              placeholder="Search blueprints..."
              value={searchValue}
              onChange={e => setSearchValue(e.target.value)}
            />
          </div>
          <Bell size={18} className="ll-icon-btn" />
          <HelpCircle size={18} className="ll-icon-btn" />
          <button className="ll-signin-btn" onClick={() => setActivePage('getstarted')}>
            Sign In
          </button>
        </div>
      </header>

      <div className="ll-layout">

        {/* ── SIDEBAR ── */}
        <aside className="ll-sidebar">

          <div className="ll-sidebar-section">
            <div className="ll-sidebar-discovery">
              <div className="ll-discovery-icon">
                <Cpu size={16} />
              </div>
              <div>
                <div className="ll-discovery-label">Discovery</div>
                <div className="ll-discovery-sub">Technical Paths</div>
              </div>
            </div>
          </div>

          <nav className="ll-sidebar-nav">
            {sidebarCategories.map(cat => (
              <button
                key={cat.id}
                className={`ll-sidebar-item ${activeCategory === cat.id ? 'll-sidebar-item--active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                <span className="ll-sidebar-item-icon">{cat.icon}</span>
                {cat.label}
              </button>
            ))}
          </nav>

          <div className="ll-sidebar-divider" />

          <div className="ll-cert-box">
            <div className="ll-cert-label">CERTIFICATION PREP</div>
            <button className="ll-cert-btn">
              <Award size={14} /> Get Certified
            </button>
          </div>

          <div className="ll-sidebar-bottom">
            <button className="ll-sidebar-util"><Settings size={14} />Settings</button>
            <button className="ll-sidebar-util"><LifeBuoy size={14} />Support</button>
          </div>
        </aside>

        {/* ── MAIN CONTENT ── */}
        <main className="ll-main">

          {/* Hero */}
          <section className="ll-hero">
            <div className="ll-hero-text">
              <div className="ll-hero-eyebrow">EXPERT-LED ENGINEERING</div>
              <h1 className="ll-hero-title">
                Explore Technical<br />
                <span className="ll-hero-accent">Excellence</span>
              </h1>
              <p className="ll-hero-desc">
                A curated collection of architectural blueprints and technical modules
                designed for the next generation of engineers.
              </p>
            </div>
            <div className="ll-hero-search">
              <div className="ll-hero-search-bar">
                <input
                  className="ll-hero-search-input"
                  placeholder="What will you build today?"
                  value={searchValue}
                  onChange={e => setSearchValue(e.target.value)}
                />
                <button className="ll-hero-search-btn">
                  <Search size={16} />
                </button>
              </div>
            </div>
          </section>

          {/* Filters */}
          <div className="ll-filters-bar">
            <div className="ll-filters-left">
              <span className="ll-filter-label">FILTERS:</span>
              {LEVEL_FILTERS.map(lvl => (
                <button
                  key={lvl}
                  className={`ll-filter-chip ${activeLevel === lvl ? 'll-filter-chip--active' : ''}`}
                  onClick={() => setActiveLevel(lvl)}
                >
                  {lvl}
                </button>
              ))}
            </div>
            <div className="ll-filters-right">
              <span className="ll-filter-label">DURATION:</span>
              <div className="ll-duration-picker">
                <button
                  className="ll-duration-trigger"
                  onClick={() => setDurationOpen(o => !o)}
                >
                  {activeDuration}
                  <ChevronDown size={13} className={durationOpen ? 'll-chevron-open' : ''} />
                </button>
                {durationOpen && (
                  <div className="ll-duration-dropdown">
                    {DURATION_OPTIONS.map(opt => (
                      <button
                        key={opt}
                        className={`ll-duration-option ${activeDuration === opt ? 'll-duration-option--active' : ''}`}
                        onClick={() => { setActiveDuration(opt); setDurationOpen(false); }}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <span className="ll-result-count">128 paths found</span>
            </div>
          </div>

          {/* Course Grid */}
          <div className="ll-course-grid">
            {courses.map(course => (
              <div className="ll-course-card" key={course.id}>
                <CourseThumbnail gradient={course.gradient} tag={course.tag} tagColor={course.tagColor} />

                <div className="ll-card-body">
                  <div className="ll-card-rating">
                    <StarRating value={course.rating} />
                    <span className="ll-rating-val">({course.ratingCount.toFixed(1)})</span>
                  </div>

                  <h3 className="ll-card-title">{course.title}</h3>

                  <div className="ll-card-meta">
                    <span className="ll-meta-item">
                      <Clock size={12} /> {course.duration}
                    </span>
                    <span className="ll-meta-item">
                      <BarChart2 size={12} /> {course.level}
                    </span>
                  </div>

                  <div className="ll-card-footer">
                    <span className="ll-card-price">${course.price.toFixed(2)}</span>
                    <button
                      className="ll-enroll-btn"
                      onClick={() => setActivePage('learnerdashboard')}
                    >
                      Enroll Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </main>
      </div>

      {/* ── FOOTER ── */}
      <footer className="ll-footer">
        <div className="ll-footer-inner">
          <div className="ll-footer-brand-col">
            <span className="ll-footer-brand">Console</span>
            <p className="ll-footer-copy">© 2024 CONSOLE IT. PRECISION ENGINEERING IN EDUCATION.</p>
          </div>
          <div className="ll-footer-links">
            <a href="#" onClick={e => e.preventDefault()}>Privacy Policy</a>
            <a href="#" onClick={e => e.preventDefault()}>Terms of Service</a>
            <a href="#" onClick={e => { e.preventDefault(); setActivePage('documentation'); }}>API Reference</a>
            <a href="#" onClick={e => e.preventDefault()}>Status</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
