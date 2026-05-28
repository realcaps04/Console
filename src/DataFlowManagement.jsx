import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  ArrowRight,
  Activity,
  Shield,
  Lock,
  Cpu,
  Cloud,
  Zap,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Globe,
  Database,
  Layers,
  RefreshCw,
  BarChart2,
} from 'lucide-react';
import './DataFlowManagement.css';
import heroImg from './assets/dfm_hero.png';
import serverImg from './assets/dfm_server.png';

/* ── Animated bar-chart data ── */
const barHeights = [35, 55, 45, 70, 60, 80, 65, 90, 75, 85, 70, 95];

/* ── Live counter hook ── */
function useCounter(target, duration = 2000) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);
  return count;
}

const metrics = [
  { label: 'Uptime',               value: '99.999%', tag: null },
  { label: 'System Flux',          value: 'Undetected Route Scale', tag: null },
  { label: 'Critical Latency',     value: '0.4ms',   tag: null },
  { label: 'Synchronization Rate', value: '1 Tb/s',  tag: null },
  { label: 'Message Durability',   value: '00.000000015%', tag: null },
];

const supportStats = [
  { label: 'UPTIME', value: '99.99%' },
  { label: 'NODES',  value: '47+' },
  { label: 'AGE / SLA', value: '4h/99.9%' },
  { label: 'REDUNDANCY', value: 'N+2' },
];

export default function DataFlowManagement({ setActivePage }) {
  const nodes = useCounter(12842, 1800);
  const [activeBar, setActiveBar] = useState(null);

  return (
    <div className="dfm-root">

      {/* ── NAV ── */}
      <nav className="dfm-nav">
        <span className="dfm-nav-brand">Console</span>
        <div className="dfm-nav-links">
          <span onClick={() => setActivePage('solutions')}>Solutions</span>
          <span onClick={() => setActivePage('projectdevelopment')}>Architecture</span>
          <span className="dfm-nav-active">Insights</span>
          <span onClick={() => setActivePage('home')}>Resources</span>
          <span onClick={() => setActivePage('home')}>Network</span>
        </div>
        <div className="dfm-nav-right">
          <Search size={15} className="dfm-nav-icon" />
          <span className="dfm-nav-search-text">Search doc resources</span>
          <button className="dfm-btn-primary" onClick={() => setActivePage('getstarted')}>
            Get Started
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="dfm-hero">
        <div className="dfm-hero-left">
          <span className="dfm-label">DATA FLOW MANAGEMENT</span>
          <h1 className="dfm-hero-title">
            Fluidic<br />
            <span className="dfm-blue">Architecture</span>
          </h1>
          <p className="dfm-hero-desc">
            Move beyond rigid pipelines. Our autonomous data orchestration layer adapts in real time to volume spikes and structural shifts.
          </p>
          <div className="dfm-hero-actions">
            <button className="dfm-btn-primary" onClick={() => setActivePage('getstarted')}>Financial Update</button>
            <button className="dfm-btn-ghost" onClick={() => setActivePage('documentation')}>Technical Spec</button>
          </div>
        </div>

        <div className="dfm-hero-right">
          <img src={heroImg} alt="Fluidic Data Architecture" className="dfm-hero-img" />
          <div className="dfm-hero-stats">
            <div className="dfm-stat-chip">
              <span className="dfm-stat-sublabel">THROUGHPUT</span>
              <span className="dfm-stat-value">84.2 PB/s</span>
            </div>
            <div className="dfm-stat-chip dfm-stat-chip--right">
              <span className="dfm-stat-sublabel">AVAILABILITY</span>
              <span className="dfm-stat-value dfm-green">99.98%</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── PIPELINE FLUX ── */}
      <section className="dfm-flux-section">
        <div className="dfm-flux-header">
          <div>
            <h2 className="dfm-flux-title">Pipeline Flux</h2>
            <p className="dfm-flux-sub">Real-time telemetry of global data streams. Observe the pulse of your worldwide acquisition with zero-latency state confirmation.</p>
          </div>
          <a href="#" className="dfm-live-link" onClick={e => e.preventDefault()}>
            ← Live Status
          </a>
        </div>

        <div className="dfm-flux-body">
          {/* Left — chart + counter */}
          <div className="dfm-chart-panel">
            <div className="dfm-counter-row">
              <div>
                <span className="dfm-counter-label">ACTIVE NODES</span>
                <div className="dfm-counter-value">{nodes.toLocaleString()}</div>
              </div>
              <div className="dfm-chart-controls">
                <span className="dfm-ctrl-btn">≡</span>
                <span className="dfm-ctrl-btn">⊞</span>
              </div>
            </div>

            {/* Bar chart */}
            <div className="dfm-bar-chart">
              {barHeights.map((h, i) => (
                <div
                  key={i}
                  className={`dfm-bar ${activeBar === i ? 'dfm-bar--active' : ''}`}
                  style={{ height: `${h}%` }}
                  onMouseEnter={() => setActiveBar(i)}
                  onMouseLeave={() => setActiveBar(null)}
                />
              ))}
            </div>
          </div>

          {/* Right — latency card + sync card */}
          <div className="dfm-flux-cards">
            <div className="dfm-flux-card dfm-flux-card--light">
              <div className="dfm-flux-card-icon dfm-blue-bg">
                <Activity size={16} />
              </div>
              <div>
                <p className="dfm-card-label">Pipeline Latency</p>
                <p className="dfm-card-big dfm-blue">~0.4ms</p>
              </div>
              <div className="dfm-latency-bar-track">
                <div className="dfm-latency-bar-fill" style={{ width: '15%' }} />
              </div>
            </div>

            <div className="dfm-flux-card dfm-flux-card--dark">
              <div className="dfm-flux-card-icon dfm-white-bg">
                <RefreshCw size={16} color="#2f6be8" />
              </div>
              <p className="dfm-card-label dfm-white">Multi-region Sync</p>
              <p className="dfm-card-sub dfm-gray">Concurrent distributed processing across all edge nodes.</p>
              <a href="#" className="dfm-card-link-white" onClick={e => e.preventDefault()}>
                View all regions <ArrowRight size={12} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── HYBRID CLOUD + AI TUNING ── */}
      <section className="dfm-two-col-section">
        <div className="dfm-two-col-card">
          <div className="dfm-two-col-icon-wrap dfm-icon-blue">
            <Cloud size={20} />
          </div>
          <h3>Hybrid Cloud Orchestration</h3>
          <p>Dynamically distributes between on-premise hardware and public clouds. Our orchestration engine prioritises the criticality of data parity over low cost automatically.</p>
          <ul className="dfm-check-list">
            <li><CheckCircle size={14} className="dfm-check-icon" /> Global Cloud Placement</li>
            <li><CheckCircle size={14} className="dfm-check-icon" /> Automated Cost Optimisation</li>
            <li><CheckCircle size={14} className="dfm-check-icon" /> Ultra-high Cloud Portability</li>
          </ul>
          <a href="#" className="dfm-arrow-link" onClick={e => e.preventDefault()}>
            Explore Cloud Layer <ArrowRight size={13} />
          </a>
        </div>

        <div className="dfm-two-col-card">
          <div className="dfm-two-col-icon-wrap dfm-icon-purple">
            <Cpu size={20} />
          </div>
          <h3>AI Driven Tuning</h3>
          <p>Adaptive machine learning continuously analyses traffic patterns to tune cache sizes and thread pools for maximum efficiency.</p>
          <ul className="dfm-alert-list">
            <li><AlertCircle size={14} className="dfm-alert-icon" /> Configuration Management</li>
            <li><AlertCircle size={14} className="dfm-alert-icon" /> Anomaly Management</li>
            <li><AlertCircle size={14} className="dfm-alert-icon" /> Anomaly Notifications</li>
          </ul>
          <a href="#" className="dfm-arrow-link" onClick={e => e.preventDefault()}>
            Discover Optimisations <ArrowRight size={13} />
          </a>
        </div>
      </section>

      {/* ── SECURITY PROTOCOLS ── */}
      <section className="dfm-security-section">
        <div className="dfm-security-inner">
          <p className="dfm-security-label">ENTERPRISE SECURITY</p>
          <h2 className="dfm-security-title">Security Protocols</h2>
          <p className="dfm-security-sub">
            We all the hardship framing ours that pertains our a-prioness at every data. We don't just secure in a peripheral way – we secure the flow.
          </p>

          <div className="dfm-security-cards">
            <div className="dfm-sec-card">
              <div className="dfm-sec-icon dfm-sec-icon--blue">
                <Shield size={20} />
              </div>
              <h4>AES-256 Military Grade</h4>
              <p>Structured encryption and key rotations for all data pathways within trusted network borders.</p>
            </div>
            <div className="dfm-sec-card dfm-sec-card--featured">
              <div className="dfm-sec-icon dfm-sec-icon--white">
                <Lock size={20} />
              </div>
              <h4>Zero-Trust Framework</h4>
              <p>Every packet verified. Access policies continuously synchronized across authentication boundaries.</p>
            </div>
            <div className="dfm-sec-card">
              <div className="dfm-sec-icon dfm-sec-icon--blue">
                <Layers size={20} />
              </div>
              <h4>Quantum-Ready</h4>
              <p>Post-quantum cryptographic algorithms deployed across the entire message-passing substrate for smart scaling.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── PERFORMANCE METRICS ── */}
      <section className="dfm-perf-section">
        <h2 className="dfm-perf-title">Performance Metrics</h2>

        <div className="dfm-perf-body">
          {/* Left — table */}
          <div className="dfm-perf-table">
            <div className="dfm-perf-table-head">
              <span>METRIC</span>
              <span>VALUE</span>
            </div>
            {metrics.map((m) => (
              <div key={m.label} className="dfm-perf-row">
                <span className="dfm-perf-metric-label">{m.label}</span>
                <span className="dfm-perf-metric-value">{m.value}</span>
              </div>
            ))}
          </div>

          {/* Right — support panel */}
          <div className="dfm-support-panel">
            <div className="dfm-support-header">
              <span className="dfm-support-tag">TECHNICAL SUPPORT</span>
              <div className="dfm-support-stats">
                {supportStats.map((s) => (
                  <div key={s.label} className="dfm-support-stat">
                    <span className="dfm-support-stat-val">{s.value}</span>
                    <span className="dfm-support-stat-lbl">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <img src={serverImg} alt="Server Infrastructure" className="dfm-server-img" />
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="dfm-cta-section">
        <div className="dfm-cta-inner">
          <Globe size={36} className="dfm-cta-globe" />
          <h2>Ready to streamline your<br />digital circulatory system?</h2>
          <p>Engineer grade data infrastructure that scales at the speed of your ambition.</p>
          <div className="dfm-cta-actions">
            <button className="dfm-btn-primary" onClick={() => setActivePage('getstarted')}>Build our Pack</button>
            <button className="dfm-btn-cta-ghost" onClick={() => setActivePage('solutions')}>Talk to Architect</button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="dfm-footer">
        <span className="dfm-footer-brand">Console</span>
        <div className="dfm-footer-links">
          <a href="#" onClick={e => { e.preventDefault(); setActivePage('documentation'); }}>Documentation</a>
          <a href="#" onClick={e => { e.preventDefault(); setActivePage('home'); }}>System Status</a>
          <a href="#" onClick={e => { e.preventDefault(); setActivePage('home'); }}>Privacy Policy</a>
          <a href="#" onClick={e => { e.preventDefault(); setActivePage('home'); }}>Terms of Service</a>
          <a href="#" onClick={e => { e.preventDefault(); setActivePage('home'); }}>Security</a>
        </div>
        <span className="dfm-footer-copy">© 2024 Console Corporation</span>
      </footer>
    </div>
  );
}
