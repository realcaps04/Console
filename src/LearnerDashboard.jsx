import React, { useState } from 'react';
import { 
  Flame, 
  Zap, 
  Target, 
  Users, 
  Calendar, 
  Keyboard, 
  FileCode,
  LayoutDashboard,
  BookOpen,
  ClipboardList,
  StickyNote,
  HelpCircle,
  Video,
  CheckSquare,
  Star,
  Layers,
  Settings,
  LogOut,
  Search,
  Bell,
  PanelLeftClose,
  PanelLeftOpen,
  ChevronLeft,
  X,
  ChevronRight,
  Play,
  SlidersHorizontal,
  User,
  Plus,
  Code,
  Database,
  UserPlus,
  UploadCloud,
  CheckCircle2,
  Clock,
  Menu,
  Bookmark,
  Share2,
  Lock,
  ChevronDown,
  Sparkles,
  PlayCircle,
  Clipboard
} from 'lucide-react';
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
  const [courseFilter, setCourseFilter] = useState('all');
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadUrl, setUploadUrl] = useState('');
  const [uploadError, setUploadError] = useState('');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleUploadSubmit = () => {
    if (!uploadUrl) {
      setUploadError('Please enter a link.');
      return;
    }
    const lowerUrl = uploadUrl.toLowerCase();
    const isValid = lowerUrl.includes('github.com') ||
                    lowerUrl.includes('docs.google.com') ||
                    lowerUrl.includes('vercel.app') ||
                    lowerUrl.includes('netlify.app');
    
    if (!isValid) {
      setUploadError('Only GitHub, Google Docs, Vercel, or Netlify links are permitted.');
      return;
    }
    
    // Success scenario
    setUploadError('');
    setShowUploadModal(false);
    setUploadUrl('');
    
    // Show success popup
    setShowSuccessPopup(true);
    setTimeout(() => {
      setShowSuccessPopup(false);
    }, 3000);
  };

  const COURSES = [
    {
      id: 1,
      level: 'INTERMEDIATE',
      title: 'Mastering React 18 & Ecosystem',
      instructor: 'Sarah Drasner',
      module: 4,
      progress: 68,
      img: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&q=80',
      status: 'progress',
    },
    {
      id: 2,
      level: 'ADVANCED',
      title: 'System Architecture Design',
      instructor: 'Marcus Holloway',
      module: 2,
      progress: 24,
      img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80',
      status: 'progress',
    },
    {
      id: 3,
      level: 'FOUNDATIONS',
      title: 'UI/UX Fundamentals',
      instructor: 'Elena Rodriguez',
      module: 12,
      progress: 92,
      img: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=600&q=80',
      status: 'completed',
    },
    {
      id: 4,
      level: 'INTERMEDIATE',
      title: 'Modern Node.js Backend',
      instructor: 'Tom Preston',
      module: 1,
      progress: 5,
      img: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=600&q=80',
      status: 'progress',
    },
  ];

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
    { icon: <Calendar size={14} />, title: 'Complete HTML/CSS Module 4', due: 'Due Today, 5:00 PM', color: '#ef4444' },
    { icon: <Keyboard size={14} />, title: 'Git Fundamentals Quiz', due: 'Due Tomorrow', color: '#f59e0b' },
    { icon: <FileCode size={14} />, title: 'Submit Portfolio V1', due: 'Due Friday', color: '#8b5cf6' },
  ];

  const MILESTONES = [
    { icon: <Flame size={18} />, name: '7-Day Streak', sub: 'Consistency King', done: true, color: '#f97316' },
    { icon: <Zap size={18} />, name: 'First Commit', sub: 'Hello World Moment', done: true, color: '#eab308' },
    { icon: <Target size={18} />, name: 'Fast Learner', sub: '20 Hours This Week', done: true, color: '#3b5fe2' },
    { icon: <Users size={18} />, name: 'Community Ally', sub: '5 Peer Reviews Done', done: false, color: '#0d9488' },
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

  const learnerGoalCopy = {
    skills: 'Build job-ready depth with curated learning tracks and practical labs.',
    career: 'Accelerate your next role with guided pathways that sharpen real-world delivery.',
    certification: 'Prepare for certification milestones with focused modules and hands-on drills.',
    portfolio: 'Create standout project work with courses that move from fundamentals to shipping.',
  };

  const focusAreas = areas.length ? areas : ['Frontend Foundations', 'Backend APIs', 'Cloud Deployment'];

  const SKILL_PATHS = [
    {
      id: 'frontend-accelerator',
      tag: 'TOP PICK',
      title: 'Frontend Engineering Accelerator',
      description: 'Sharpen component architecture, performance, accessibility, and production React patterns.',
      duration: '8 weeks',
      format: '24 guided lessons',
      icon: <Code size={18} />,
      accent: '#3b5fe2',
      bg: '#eef2ff',
    },
    {
      id: 'backend-systems',
      tag: 'IN DEMAND',
      title: 'Backend & API Systems',
      description: 'Master service design, authentication, database integration, and resilient API workflows.',
      duration: '6 weeks',
      format: '18 practical labs',
      icon: <Database size={18} />,
      accent: '#0f766e',
      bg: '#ecfeff',
    },
    {
      id: 'team-collab',
      tag: 'CAREER',
      title: 'Engineering Collaboration Skills',
      description: 'Improve review habits, team communication, delivery planning, and developer workflow habits.',
      duration: '4 weeks',
      format: '12 live workshops',
      icon: <Users size={18} />,
      accent: '#9333ea',
      bg: '#f5f3ff',
    },
    {
      id: 'cloud-foundations',
      tag: 'GROWTH',
      title: 'Cloud Deployment Foundations',
      description: 'Learn hosting, CI/CD, observability, and deployment thinking for production-ready apps.',
      duration: '5 weeks',
      format: '15 deployment exercises',
      icon: <UploadCloud size={18} />,
      accent: '#ea580c',
      bg: '#fff7ed',
    },
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
            <Search size={14} color="#94a3b8" />
            <input placeholder="Search resources..." className="ld-header-search-input" />
          </div>
          <button className="ld-header-icon-btn" title="Notifications">
            <Bell size={17} />
          </button>
          <button className="ld-header-icon-btn" title="Help">
            <HelpCircle size={17} />
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
          {sidebarCollapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
        </button>

        {/* Nav */}
        <nav className="ld-nav">
          {[
            { key: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
            { key: 'courses', label: 'My Courses', icon: <BookOpen size={18} /> },
            { key: 'assignments', label: 'Assignments', icon: <ClipboardList size={18} /> },
            { key: 'skills', label: 'Skills', icon: <Sparkles size={18} /> },
            { key: 'notes', label: 'Notes', icon: <StickyNote size={18} /> },
            { key: 'support', label: 'Support', icon: <HelpCircle size={18} /> },
            { key: 'live', label: 'Live Sessions', icon: <Video size={18} /> },
            { key: 'quizzes', label: 'Quiz', icon: <CheckSquare size={18} /> },
            { key: 'new', label: 'New to you', icon: <Star size={18} /> },
            { key: 'projects', label: 'Projects', icon: <Layers size={18} /> },
            { key: 'settings', label: 'Settings', icon: <Settings size={18} /> },
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
          <LogOut size={14} strokeWidth={2.5} />
          <span className="ld-nav-label">Logout</span>
        </button>

        <button className="ld-help">
          <HelpCircle size={16} />
          Help Center
        </button>
      </aside>

      {/* ── Main wrapper ── */}
      <div className={`ld-main-wrap ${sidebarCollapsed ? 'ld-main-wrap--collapsed' : ''}`}>

        {/* ── Content ── */}
        <main className="ld-content">

          {/* ═══════════════════════════════
               MY COURSES VIEW
          ═══════════════════════════════ */}
          {activeNav === 'courses' && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh', textAlign: 'center', color: '#64748b' }}>
              <div style={{ width: '64px', height: '64px', background: '#eff6ff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <BookOpen size={32} color="#3b5fe2" />
              </div>
              <h2 style={{ color: '#0f172a', fontSize: '1.75rem', marginBottom: '0.75rem', fontWeight: '600' }}>
                No active courses
              </h2>
              <p style={{ maxWidth: '420px', lineHeight: '1.6', marginBottom: '2rem' }}>
                You haven't enrolled in any courses yet. Explore our curated pathways to start your learning journey.
              </p>
              <button 
                onClick={() => setActiveNav('skills')} 
                style={{ background: '#0f172a', color: '#fff', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '6px', fontWeight: '500', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              >
                Browse Pathways
              </button>
            </div>
          )}

          {/* ═══════════════════════════════
               DASHBOARD VIEW
          ═══════════════════════════════ */}
          {activeNav === 'dashboard' && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh', textAlign: 'center', color: '#64748b' }}>
              <div style={{ width: '64px', height: '64px', background: '#eff6ff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <LayoutDashboard size={32} color="#3b5fe2" />
              </div>
              <h2 style={{ color: '#0f172a', fontSize: '1.75rem', marginBottom: '0.75rem', fontWeight: '600' }}>
                Hello, {sessionStorage.getItem('ld_firstName') || 'Learner'}!
              </h2>
              <p style={{ maxWidth: '420px', lineHeight: '1.6', marginBottom: '2rem' }}>
                Welcome to your workspace. Your active courses, upcoming assignments, and learning milestones will appear here once you begin.
              </p>
              <button 
                onClick={() => setActiveNav('skills')} 
                style={{ background: '#0f172a', color: '#fff', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '6px', fontWeight: '500', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              >
                Browse Pathways
              </button>
            </div>
          )}

          {/* ═══════════════════════════════
               ASSIGNMENTS VIEW
          ═══════════════════════════════ */}
          {activeNav === 'assignments' && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh', textAlign: 'center', color: '#64748b' }}>
              <div style={{ width: '64px', height: '64px', background: '#eff6ff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <ClipboardList size={32} color="#3b5fe2" />
              </div>
              <h2 style={{ color: '#0f172a', fontSize: '1.75rem', marginBottom: '0.75rem', fontWeight: '600' }}>
                All caught up
              </h2>
              <p style={{ maxWidth: '420px', lineHeight: '1.6', marginBottom: '2rem' }}>
                You have no active assignments. Once you enroll in a course, your upcoming tasks and due dates will appear here.
              </p>
            </div>
          )}

          {activeNav === 'skills' && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh', textAlign: 'center', color: '#64748b' }}>
              <div style={{ width: '64px', height: '64px', background: '#eff6ff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <Sparkles size={32} color="#3b5fe2" />
              </div>
              <h2 style={{ color: '#0f172a', fontSize: '1.75rem', marginBottom: '0.75rem', fontWeight: '600' }}>
                Pathways coming soon
              </h2>
              <p style={{ maxWidth: '420px', lineHeight: '1.6', marginBottom: '2rem' }}>
                Our curated skill tracks are currently being updated. Check back shortly to explore and enroll in new pathways.
              </p>
            </div>
          )}

          {/* ═══════════════════════════════
               MODULE VIEW
          ═══════════════════════════════ */}
          {activeNav === 'module_view' && (
            <div className="mv-page">
              <div className="mv-left">
                {/* Video Player */}
                <div className="mv-video-wrapper">
                  <img src="https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" alt="Video Placeholder" className="mv-video-img" />
                  <button className="mv-play-btn"><Play fill="currentColor" size={32} /></button>
                  <div className="mv-video-progress"></div>
                </div>

                {/* Info Block */}
                <div className="mv-info">
                  <div className="mv-info-header">
                    <div>
                      <span className="mv-badge">INTERMEDIATE LEVEL</span>
                      <h1 className="mv-title">Advanced Systems Architecture & Scalability: Distributed Databases</h1>
                    </div>
                    <div className="mv-actions">
                      <button className="mv-btn-save"><Bookmark size={14} /> Save</button>
                      <button className="mv-btn-share"><Share2 size={16} color="#475569" /></button>
                    </div>
                  </div>

                  <div className="mv-meta-row">
                    <div className="mv-instructor">
                      <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" alt="Instructor" className="mv-instructor-img" />
                      <div>
                        <div className="mv-instructor-name">Elena Petrova</div>
                        <div className="mv-instructor-title">Senior Architect • 12k students</div>
                      </div>
                    </div>
                    <div className="mv-meta-divider"></div>
                    <div className="mv-meta-item">
                      <div className="mv-meta-label">Published</div>
                      <div className="mv-meta-val">Oct 14, 2023</div>
                    </div>
                    <div className="mv-meta-item">
                      <div className="mv-meta-label">Progress</div>
                      <div className="mv-meta-val mv-val-blue">75% Complete</div>
                    </div>
                  </div>

                  {/* Tabs */}
                  <div className="mv-tabs">
                    <button className="mv-tab mv-tab-active">Description</button>
                    <button className="mv-tab">Resources</button>
                    <button className="mv-tab">Assignments (1)</button>
                    <button className="mv-tab">Discussion (42)</button>
                  </div>

                  {/* Content */}
                  <div className="mv-desc">
                    <p>In this module, we dive deep into the trade-offs of distributed storage systems. We'll explore the CAP theorem, eventual consistency vs. strong consistency, and how modern databases like Cassandra and DynamoDB handle massive scale.</p>
                    <h4>What you'll learn:</h4>
                    <ul>
                      <li>Partitioning strategies and consistent hashing</li>
                      <li>Quorum-based replication protocols</li>
                      <li>Handling network partitions and conflict resolution</li>
                    </ul>
                  </div>

                  {/* Ask AI */}
                  <div className="mv-ask-ai">
                    <Sparkles size={16} className="mv-ai-icon" />
                    <input type="text" placeholder="Ask AI about this lesson..." className="mv-ai-input" />
                    <button className="mv-ai-btn">ASK</button>
                  </div>
                </div>
              </div>

              <div className="mv-right">
                {/* Curriculum */}
                <div className="mv-curriculum">
                  <div className="mv-curr-header">
                    <h3>Course Curriculum</h3>
                    <span className="mv-curr-progress">14 / 20 Lessons</span>
                  </div>

                  {/* Week 1 */}
                  <div className="mv-week">
                    <div className="mv-week-header mv-week-header-collapsed">
                      <span>WEEK 1: FUNDAMENTALS</span>
                      <ChevronDown size={14} />
                    </div>
                  </div>

                  {/* Week 2 */}
                  <div className="mv-week">
                    <div className="mv-week-header mv-week-header-active">
                      <span>WEEK 2: DISTRIBUTED DATABASES</span>
                    </div>
                    <div className="mv-week-content">
                      {/* Sub-item 1 */}
                      <div className="mv-lesson mv-lesson-active">
                        <div className="mv-lesson-thumb">
                          <img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" alt="Lesson" />
                          <div className="mv-lesson-play"><Play fill="currentColor" size={10} /></div>
                        </div>
                        <div className="mv-lesson-info">
                          <span className="mv-lesson-label">LESSON 2.1</span>
                          <h4 className="mv-lesson-title">Introduction to CAP Theorem</h4>
                          <span className="mv-lesson-meta">45 mins • In Progress</span>
                        </div>
                      </div>
                      
                      {/* Sub-item 2 */}
                      <div className="mv-lesson">
                        <div className="mv-lesson-icon-box">
                          <HelpCircle size={16} />
                        </div>
                        <div className="mv-lesson-info">
                          <span className="mv-lesson-label">QUIZ</span>
                          <h4 className="mv-lesson-title">Database Consistency Patterns</h4>
                          <span className="mv-lesson-meta"><Lock size={10}/> Locked</span>
                        </div>
                      </div>

                      {/* Sub-item 3 */}
                      <div className="mv-lesson">
                        <div className="mv-lesson-icon-box">
                          <Clipboard size={16} />
                        </div>
                        <div className="mv-lesson-info">
                          <span className="mv-lesson-label">ASSIGNMENT</span>
                          <h4 className="mv-lesson-title">Fault-Tolerant System Design</h4>
                          <span className="mv-lesson-meta mv-meta-red">Due: Friday</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Week 3 */}
                  <div className="mv-week">
                    <div className="mv-week-header mv-week-header-collapsed">
                      <span>WEEK 3: MICROSERVICES</span>
                      <Lock size={14} />
                    </div>
                  </div>
                </div>

                {/* Live Session */}
                <div className="mv-live-card">
                  <div className="mv-live-badge">LIVE SESSION <div className="mv-live-dot"></div></div>
                  <h3 className="mv-live-title">Q&A: Architecture Review</h3>
                  <p className="mv-live-time">Tomorrow at 10:00 AM</p>
                  <button className="mv-live-btn">ADD TO CALENDAR</button>
                </div>

                {/* Recent Recordings */}
                <div className="mv-recordings">
                  <h3 className="mv-rec-head">Recent Recordings</h3>
                  <div className="mv-recording-card">
                    <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="Recording" />
                    <span className="mv-rec-time">1:12:05</span>
                  </div>
                  <h4 className="mv-rec-title">NoSQL vs Relational Storage</h4>
                  <span className="mv-rec-meta">1 week ago • 1.2k views</span>
                </div>
              </div>
            </div>
          )}

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
      
      {/* ── Success Toast ── */}
      {showSuccessPopup && (
        <div className="ld-toast-success">
          <CheckCircle2 size={18} />
          <span>Link submitted successfully!</span>
        </div>
      )}
    </div>
  );
};

export default LearnerDashboard;
