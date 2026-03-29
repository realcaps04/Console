import React, { useState, useEffect, useRef } from 'react';
import { supabase } from './utils/supabase';
import './App.css';
import {
  LayoutDashboard,
  FoldHorizontal,
  LayoutTemplate,
  GraduationCap,
  Wrench,
  Settings,
  HelpCircle,
  MessageSquare,
  Search,
  Plus,
  Bell,
  ArrowRight,
  Terminal,
  Database,
  LineChart,
  ShieldCheck,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    async function getTodos() {
      const { data: todosData } = await supabase.from('todos').select();

      if (todosData) {
        setTodos(todosData);
      }
    }

    getTodos();
  }, []);

  const carouselRef = useRef(null);

  const scrollCarousel = (dir) => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: dir * 340, behavior: 'smooth' });
    }
  };

  const categories = [
    { name: 'Project Development', icon: <FoldHorizontal size={24} />, desc: 'Plan, track and ship projects with precision using structured workflows.' },
    { name: 'Data Flow Management', icon: <Database size={24} />, desc: 'Orchestrate data pipelines and real-time sync across your stack.' },
    { name: 'Language Learning', icon: <GraduationCap size={24} />, desc: 'Structured curriculum to master new programming languages and frameworks.' },
    { name: 'Software Tools', icon: <Terminal size={24} />, desc: 'Integrated developer tools for building, testing and deploying apps.' },
    { name: 'Report Management', icon: <LineChart size={24} />, desc: 'Generate and share rich analytical reports across teams.' },
    { name: 'Software Solutions', icon: <LayoutTemplate size={24} />, desc: 'End-to-end enterprise software delivery from concept to production.' },
    { name: 'System Maintenance', icon: <Wrench size={24} />, desc: 'Monitor, audit and keep your infrastructure in peak condition.' },
    { name: 'Performance Boosting', icon: <ShieldCheck size={24} />, desc: 'Optimise runtime performance and eliminate bottlenecks at scale.' },
  ];

  const navItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    { name: 'Projects', icon: <FoldHorizontal size={18} /> },
    { name: 'Web Builder', icon: <LayoutTemplate size={18} /> },
    { name: 'Learning Hub', icon: <GraduationCap size={18} /> },
    { name: 'IT Tools', icon: <Wrench size={18} /> },
    { name: 'Settings', icon: <Settings size={18} /> },
  ];

  return (
    <div className="app-container">
      {/* Sidebar Navigation - Hidden for now */}
      {false && (
        <aside className="sidebar">
          <div className="brand-header">
            <h1 className="brand-title">Console</h1>
            <div className="brand-subtitle-group">
              <div className="brand-subtitle">The Precision Atelier</div>
              <div className="brand-subtitle-mini">Enterprise Console</div>
            </div>
          </div>

          <nav className="nav-links">
            {navItems.map((item) => (
              <li
                key={item.name}
                className={`nav-item ${activeTab === item.name ? 'active' : ''}`}
                onClick={() => setActiveTab(item.name)}
              >
                <div className="icon">{item.icon}</div>
                <span>{item.name}</span>
              </li>
            ))}
          </nav>

          <div className="sidebar-bottom">
            <li className="bottom-link">
              <HelpCircle size={16} className="icon" />
              <span>Support</span>
            </li>
            <li className="bottom-link">
              <MessageSquare size={16} className="icon" />
              <span>Feedback</span>
            </li>
          </div>
        </aside>
      )}

      {/* Main Content */}
      <main className="main-content">

        {/* Top Navigation */}
        <header className="top-nav">
          <div className="header-brand">
            <h1 className="brand-title" style={{ margin: 0 }}>Console</h1>
          </div>

          <div className="top-nav-links">
            <span className="top-nav-link active">Platform</span>
            <span className="top-nav-link">Solutions</span>
            <span className="top-nav-link">Learning</span>
            <span className="top-nav-link">Documentation</span>
          </div>

          <div className="top-nav-actions">
            <button className="btn-signin">Sign In</button>
            <button className="btn-primary">Get Started</button>
          </div>
        </header>

        {/* Hero Section */}
        <section className="hero-section">
          {/* Flex container to place hero text to the left and search bar to the right */}
          <div className="hero-container">
            {/* Hero text content — z-index above all wave layers */}
            <div className="hero-content">
              <h1 className="hero-title">
                Console: Elevating Technology from <span className="highlight">Learners to Entrepreneurs.</span>
              </h1>
              <p className="hero-description">
                The architect's choice for digital production. From fundamental curriculum to enterprise-grade infrastructure, we provide the tools to build the future.
              </p>
              <div className="hero-actions">
                <button className="btn-primary">Start Building</button>
                <button className="btn-secondary">View Platform Docs</button>
              </div>
            </div>

            {/* Floating Search Bar — now positioned on the right */}
            <div className="floating-search">
              <div className="search-input-group">
                <Search size={18} color="#9ca3af" />
                <input type="text" placeholder="Search you Dreams .........................!" />
              </div>
              <div className="floating-actions">
                <button><Plus size={20} color="#2f6be8" /></button>
                <button><Bell size={20} color="#6b7280" /></button>
                <div className="avatar-small">AM</div>
              </div>
            </div>
          </div>

          {/* Third wave layer — lightest foreground wave */}
          <div className="hero-wave-top">
            <svg viewBox="0 0 1440 180" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
              <path
                fill="#f5f6f8"
                fillOpacity="0.9"
                d="M0,128L60,117.3C120,107,240,85,360,90.7C480,96,600,128,720,133.3C840,139,960,117,1080,106.7C1200,96,1320,96,1380,96L1440,96L1440,180L1380,180C1320,180,1200,180,1080,180C960,180,840,180,720,180C600,180,480,180,360,180C240,180,120,180,60,180L0,180Z"
              />
            </svg>
          </div>
        </section>

        {/* Category Carousel Section */}
        <section className="carousel-section">
          <div className="carousel-header">
            <div>
              <div className="section-label">What We Offer</div>
              <h2 className="section-title" style={{ marginBottom: 0 }}>Explore by Category</h2>
            </div>
          </div>

          <div className="carousel-track" ref={carouselRef}>
            {categories.map((cat) => (
              <div key={cat.name} className="carousel-card">
                <div className="icon-box">{cat.icon}</div>
                <h3>{cat.name}</h3>
                <p>{cat.desc}</p>
                <a href="#" className="card-link">
                  Explore <ArrowRight size={14} />
                </a>
              </div>
            ))}
          </div>

          <div className="carousel-controls">
            <button className="carousel-btn" onClick={() => scrollCarousel(-1)}>
              <ChevronLeft size={20} />
            </button>
            <button className="carousel-btn" onClick={() => scrollCarousel(1)}>
              <ChevronRight size={20} />
            </button>
          </div>
        </section>

        {/* Learning Platform Section */}
        <section className="section-wrapper">
          <div className="section-label red">Learning Platform</div>
          <h2 className="section-title">Active Curriculum</h2>

          <div className="learning-layout">
            <div className="learning-content">
              <p>Bridge the gap between theory and industry. Our proprietary curriculum tracks your growth in real-time as you master the Console ecosystem.</p>

              <div className="progress-card">
                <div className="progress-header">
                  <span>Cloud Architecture 101</span>
                  <span className="progress-percent">75%</span>
                </div>
                <div className="progress-bar-bg">
                  <div className="progress-bar-fill" style={{ width: '75%' }}></div>
                </div>
              </div>

              <div className="progress-card">
                <div className="progress-header">
                  <span>Data Hub Management</span>
                  <span className="progress-label">Next: Chapter 4</span>
                </div>
                <div className="progress-bar-bg">
                  <div className="progress-bar-fill" style={{ width: '40%' }}></div>
                </div>
              </div>
            </div>

            <div className="video-placeholder">
              <div className="play-button"></div>
            </div>
          </div>
        </section>

        {/* Productivity Tools Section */}
        <section className="tools-section">
          <h2 className="section-title">Productivity & IT Tools</h2>
          <p>Seamless integration of enterprise-grade utilities for the modern digital workspace.</p>

          <div className="tools-grid">

            <div className="tool-card">
              <div className="tool-icon">
                <Terminal size={20} />
              </div>
              <h4>Console CLI</h4>
              <p>Unified command line interface for global deployments and resource management.</p>
              <div className="tool-footer">
                <div className="code-snippet">$ console deploy --prod</div>
              </div>
            </div>

            <div className="tool-card">
              <div className="tool-icon" style={{ backgroundColor: '#e0e7ff', color: '#4f46e5' }}>
                <Database size={20} />
              </div>
              <h4>Data Hub</h4>
              <p>High-concurrency data storage with automated sharding and real-time syncing.</p>
              <div className="tool-footer">
                <div className="abstract-shapes">
                  <div className="shape-circle" style={{ backgroundColor: '#c7d2fe' }}></div>
                  <div className="shape-circle" style={{ backgroundColor: '#a5b4fc', marginLeft: '-10px' }}></div>
                  <div className="shape-circle" style={{ backgroundColor: '#6366f1', marginLeft: '-10px' }}></div>
                </div>
              </div>
            </div>

            <div className="tool-card">
              <div className="tool-icon" style={{ backgroundColor: '#fae8ff', color: '#c026d3' }}>
                <LineChart size={20} />
              </div>
              <h4>Analytic</h4>
              <p>Deeper insights into your traffic patterns and system health metrics.</p>
              <div className="tool-footer">
                <div className="abstract-shapes">
                  <div className="shape-bar" style={{ height: '8px' }}></div>
                  <div className="shape-bar" style={{ height: '14px', backgroundColor: '#a5b4fc' }}></div>
                  <div className="shape-bar" style={{ height: '22px', backgroundColor: '#818cf8' }}></div>
                  <div className="shape-bar" style={{ height: '16px', backgroundColor: '#6366f1' }}></div>
                </div>
              </div>
            </div>

            <div className="tool-card">
              <div className="tool-icon" style={{ backgroundColor: '#ecfdf5', color: '#059669' }}>
                <ShieldCheck size={20} />
              </div>
              <h4>Guard</h4>
              <p>End-to-end encryption and automated threat detection for all projects.</p>
              <div className="tool-footer">
                <div className="status-badge">
                  <span className="status-dot"></span> System Secured
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Live Supabase Data Section */}
        {todos.length > 0 && (
          <section className="section-wrapper" style={{ paddingBottom: '2rem' }}>
            <div className="section-label" style={{ color: '#10b981' }}>Live Database Connect</div>
            <h2 className="section-title" style={{ marginBottom: '1.5rem' }}>Active Tasks</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: '800px' }}>
              {todos.map((todo) => (
                <div key={todo.id} style={{ padding: '1.25rem', backgroundColor: '#ffffff', borderRadius: '0.75rem', border: '1px solid #ebebed', boxShadow: '0 1px 4px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#10b981' }}></div>
                  <span style={{ fontSize: '1rem', fontWeight: 600, color: '#0d0f12' }}>{todo.name}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Footer */}
        <footer className="footer">
          <div className="footer-links">
            <a href="#" className="footer-link">Privacy Policy</a>
            <a href="#" className="footer-link">Terms of Service</a>
            <a href="#" className="footer-link">Security</a>
            <a href="#" className="footer-link">Status</a>
          </div>
          <div className="footer-copyright">
            © 2024 CONSOLE IT SOLUTIONS. ARCHITECTING THE DIGITAL FUTURE.
          </div>
        </footer>

      </main>
    </div>
  );
}

export default App;
