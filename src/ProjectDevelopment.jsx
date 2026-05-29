import React, { useState } from 'react';
import {
  GitBranch,
  Layers,
  Cpu,
  RefreshCw,
  Shuffle,
  Globe,
  ArrowRight,
  Search,
  Settings,
  CheckCircle,
  Zap,
  Shield,
  Database,
  Activity,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import './ProjectDevelopment.css';
import heroImg from './assets/project_dev_hero.png';
import serverImg from './assets/project_dev_server.png';
import fiberImg from './assets/project_dev_fiber.png';

const blueprints = [
  {
    icon: <GitBranch size={22} />,
    title: 'Structural Analysis',
    desc: 'Identifying core dependencies and systemic bottlenecks before a single line of code is committed. We define the gravity of your data.',
    tag: 'Step 01',
    highlight: false,
  },
  {
    icon: <Layers size={22} />,
    title: 'Load-Bearing Design',
    desc: 'Designing robust service boundaries that maintain integrity under extreme transactional pressure using modular microservices.',
    tag: 'Step 02',
    highlight: false,
  },
  {
    icon: <Cpu size={22} />,
    title: 'Vault Protocol',
    desc: 'Certifying high-impact integration to be well-load.',
    tag: null,
    highlight: false,
  },
  {
    icon: <RefreshCw size={22} />,
    title: 'Refining Logic',
    desc: 'Catching integration leaks before full-system testing.',
    tag: null,
    highlight: false,
  },
  {
    icon: <Shuffle size={22} />,
    title: 'Unified Matrix',
    desc: 'Seamless frontend scaling across distributed clusters.',
    tag: null,
    highlight: true,
  },
];

const curationItems = [
  {
    icon: <Globe size={16} />,
    title: 'Language Core',
    desc: 'Open-source tooling for high-performance environments.',
  },
  {
    icon: <Shield size={16} />,
    title: 'Data Persistence',
    desc: 'Throughput and hooks for SOC-compliant mobility.',
  },
  {
    icon: <Database size={16} />,
    title: 'Infrastructure',
    desc: 'Kubernetes and Terraform for immovable orchestration.',
  },
];

const lifecycle = [
  {
    step: '01',
    title: 'Discovery',
    desc: 'Scoped stakeholder interviews and requirements mapping. We uncover the DNA of what you want to build.',
    active: false,
  },
  {
    step: '02',
    title: 'Prototyping',
    desc: 'Low-fidelity wireframes rapidly levelling design-to-engineering fidelity, validating solution fit.',
    active: false,
  },
  {
    step: '03',
    title: 'Core Dev',
    desc: 'The execution phase. Iterative sprints with continuous integration and automated testing.',
    active: true,
  },
  {
    step: '04',
    title: 'Orchestration',
    desc: 'Deployment to distributed cloud nodes with monitoring and adaptive auto scaling.',
    active: false,
  },
];

export default function ProjectDevelopment({ setActivePage, session }) {
  // Logged-in users go to their dashboard; guests go to get-started
  const handleCTA = () => setActivePage(session ? 'userprojects' : 'getstarted');
  const [searchQuery, setSearchQuery] = useState('');

  const displayed = blueprints.filter((b) =>
    b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const grid = displayed.slice(0, 2);
  const row2 = displayed.slice(2);

  return (
    <div className="pd-root">
      {/* ───────────── TOP NAV ───────────── */}
      <nav className="pd-nav">
        <span className="pd-nav-brand">Console</span>
        <div className="pd-nav-links">
          <span onClick={() => setActivePage('solutions')}>Solutions</span>
          <span className="pd-nav-active">Architecture</span>
          <span onClick={() => setActivePage('home')}>Security</span>
          <span onClick={() => setActivePage('home')}>Analytics</span>
          <span onClick={() => setActivePage('home')}>Network</span>
        </div>
        <div className="pd-nav-right">
          <Search size={16} className="pd-nav-search-icon" />
          <button className="pd-btn-primary" onClick={handleCTA}>
            Get Started
          </button>
        </div>
      </nav>

      {/* ───────────── HERO ───────────── */}
      <section className="pd-hero">
        <div className="pd-hero-left">
          <span className="pd-label">TECHNICAL SYNOPSIS</span>
          <h1 className="pd-hero-title">
            Project<br />Development.
          </h1>
          <p className="pd-hero-desc">
            We engineer digital foundations through a rigorous architectural lens. Our methodology transforms complex business logic into high-performance, resilient infrastructure, built for scale.
          </p>
          <div className="pd-hero-actions">
            <button className="pd-btn-primary" onClick={handleCTA}>
              Initiate Protocol
            </button>
            <button className="pd-btn-secondary" onClick={() => {
              document.querySelector('.pd-blueprint-section')?.scrollIntoView({ behavior: 'smooth' });
            }}>
              View Schema
            </button>
          </div>
        </div>
        <div className="pd-hero-right">
          <img src={heroImg} alt="Architecture Building" className="pd-hero-img" />
          <div className="pd-hero-badge">
            <Activity size={14} />
            <span>Live Infrastructure</span>
          </div>
        </div>
      </section>

      {/* ───────────── ARCHITECTURAL BLUEPRINTING ───────────── */}
      <section className="pd-blueprint-section">
        <div className="pd-blueprint-header">
          <h2 className="pd-section-title">Architectural Blueprinting</h2>
          <div className="pd-search-bar">
            <Search size={14} color="#9ca3af" />
            <input
              type="text"
              placeholder="Search components, blueprints..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="pd-search-icons">
              <span className="pd-search-icon-btn"><ChevronLeft size={14} /></span>
              <span className="pd-search-icon-btn"><Settings size={14} /></span>
            </div>
          </div>
        </div>

        {/* Top row — 2 large cards */}
        <div className="pd-blueprint-grid-top">
          {grid.map((item) => (
            <div key={item.title} className="pd-blueprint-card pd-blueprint-card--large">
              <div className="pd-bp-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
              {item.tag && (
                <a href="#" className="pd-card-link" onClick={(e) => e.preventDefault()}>
                  {item.tag} <ArrowRight size={13} />
                </a>
              )}
            </div>
          ))}
        </div>

        {/* Bottom row — 3 smaller cards */}
        <div className="pd-blueprint-grid-bottom">
          {row2.map((item) => (
            <div
              key={item.title}
              className={`pd-blueprint-card pd-blueprint-card--small ${item.highlight ? 'pd-highlight' : ''}`}
            >
              <div className={`pd-bp-icon ${item.highlight ? 'pd-bp-icon--light' : ''}`}>{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ───────────── THE CURATION ───────────── */}
      <section className="pd-curation-section">
        <div className="pd-curation-left">
          <h2 className="pd-curation-title">The Curation.</h2>
          <p className="pd-curation-body">
            We do not use just because they are popular. We select them for their thermodynamic stability, security posture, and documentation integrity.
          </p>
          <div className="pd-curation-items">
            {curationItems.map((ci) => (
              <div key={ci.title} className="pd-curation-item">
                <div className="pd-curation-item-icon">{ci.icon}</div>
                <div>
                  <strong>{ci.title}</strong>
                  <p>{ci.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="pd-curation-images">
          <img src={serverImg} alt="Server Room" className="pd-curation-img pd-curation-img--top" />
          <img src={fiberImg} alt="Fiber Optic" className="pd-curation-img pd-curation-img--bottom" />
        </div>
      </section>

      {/* ───────────── DEVELOPMENT LIFECYCLE ───────────── */}
      <section className="pd-lifecycle-section">
        <div className="pd-lifecycle-header">
          <h2>Development Lifecycle</h2>
          <p>Our ideas proceed beyond where every project idea passes a well-architected communication to genuine execution.</p>
        </div>
        <div className="pd-lifecycle-steps">
          {lifecycle.map((step) => (
            <div
              key={step.step}
              className={`pd-lifecycle-step ${step.active ? 'pd-lifecycle-step--active' : ''}`}
            >
              <div className={`pd-step-num ${step.active ? 'pd-step-num--active' : ''}`}>
                {step.active ? <CheckCircle size={16} /> : step.step}
              </div>
              <h4>{step.title}</h4>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ───────────── CTA BANNER ───────────── */}
      <section className="pd-cta-section">
        <div className="pd-cta-content">
          <Zap size={36} className="pd-cta-icon" />
          <h2>Ready to architect your next breakthrough?</h2>
          <p>Join the league of enterprises building on Console's precision framework.</p>
          <div className="pd-cta-actions">
            <button className="pd-btn-primary" onClick={handleCTA}>
              Start Engineering
            </button>
            <button className="pd-btn-outline" onClick={() => {
              document.querySelector('.pd-root')?.scrollIntoView({ behavior: 'smooth' });
            }}>
              Schedule a Consultation
            </button>
          </div>
        </div>
      </section>

      {/* ───────────── FOOTER ───────────── */}
      <footer className="pd-footer">
        <span className="pd-footer-brand">Console</span>
        <div className="pd-footer-links">
          <a href="#" onClick={(e) => { e.preventDefault(); setActivePage('documentation'); }}>Documentation</a>
          <a href="#" onClick={(e) => { e.preventDefault(); setActivePage('home'); }}>System Status</a>
          <a href="#" onClick={(e) => { e.preventDefault(); setActivePage('home'); }}>Privacy Policy</a>
          <a href="#" onClick={(e) => { e.preventDefault(); setActivePage('home'); }}>Terms of Service</a>
          <a href="#" onClick={(e) => { e.preventDefault(); setActivePage('home'); }}>Security</a>
        </div>
        <span className="pd-footer-copy">© 2024 Console Corporation</span>
      </footer>
    </div>
  );
}
