import React, { useState } from 'react';
import { Search, MapPin, Clock, Banknote, Rocket, SlidersHorizontal, ArrowDown } from 'lucide-react';
import './OpenPositions.css';

export default function OpenPositions({ setActivePage, session }) {
  
  const jobs = [
    {
      id: 1,
      department: "ENGINEERING",
      time: "Posted 2 days ago",
      title: "Senior Systems Architect",
      desc: "Shape the foundation of our next-generation cloud infrastructure. You will lead technical strategy and collaborate with multidisciplinary teams to solve complex problems at an enterprise scale.",
      location: "London / Hybrid",
      type: "Full-time",
      salary: "£120k — £160k"
    },
    {
      id: 2,
      department: "DESIGN",
      time: "Posted 5 days ago",
      title: "Principal Product Designer",
      desc: "Drive the aesthetic and functional evolution of the Console ecosystem. We're looking for a designer who values precision, editorial layout, and technical depth.",
      location: "New York / Remote",
      type: "Full-time",
      salary: "$180k — $230k"
    },
    {
      id: 3,
      department: "ENGINEERING",
      time: "New",
      title: "Full Stack Developer (Next.js)",
      desc: "Build high-performance internal tools that power our architectural simulation engine. Expertise in React, TypeScript, and Tailwind CSS is essential.",
      location: "Singapore",
      type: "Contract",
      salary: "Competitive Hourly"
    },
    {
      id: 4,
      department: "OPERATIONS",
      time: "Posted 1 week ago",
      title: "Strategy & Growth Lead",
      desc: "Help us scale our global ecosystem by identifying new market opportunities and optimizing operational frameworks for peak performance.",
      location: "Remote",
      type: "Full-time",
      salary: "$140k — $175k"
    }
  ];

  return (
    <div className="op-page">
      
      {/* Custom Header for Open Positions */}
      <header className="op-header">
        <div className="op-header-left">
          <div className="op-brand" onClick={() => setActivePage('home')}>CONSOLE</div>
          <nav className="op-nav">
            <span className="op-nav-item active">Opportunities</span>
            <span className="op-nav-item">Insights</span>
            <span className="op-nav-item">Network</span>
            <span className="op-nav-item">Ecosystem</span>
          </nav>
        </div>
        <div className="op-header-right">
          {!session ? (
            <>
              <button className="op-btn-text" onClick={() => setActivePage('signin')}>Sign in</button>
              <button className="op-btn-primary" onClick={() => setActivePage('getstarted')}>Join Console</button>
            </>
          ) : (
            <div className="op-user-profile" onClick={() => setActivePage('userdashboard')}>
              <div className="op-avatar">
                {session.user?.user_metadata?.first_name?.[0]?.toUpperCase() || session.user?.email?.[0]?.toUpperCase() || 'U'}
              </div>
              <span className="op-username">
                {session.user?.user_metadata?.first_name || session.user?.email?.split('@')[0]} {session.user?.user_metadata?.last_name || ''}
              </span>
            </div>
          )}
        </div>
      </header>

      {/* Hero & Search */}
      <section className="op-hero">
        <div className="op-hero-content">
          <h1 className="op-title">Open Positions</h1>
          <p className="op-subtitle">
            Join a collective of precision-driven engineers and designers. We currently have <span className="op-accent-text">24 active vacancies</span> across our global studios.
          </p>
        </div>
        
        <div className="op-search-row">
          <div className="op-search-input-box">
            <Search size={18} color="#94a3b8" />
            <input type="text" placeholder="Search by job title, skill, or keyword..." />
          </div>
          <button className="op-filter-btn">
            <SlidersHorizontal size={16} color="#3b82f6" /> 
            Saved Filters
          </button>
        </div>
      </section>

      {/* Main Layout */}
      <section className="op-main-layout">
        
        {/* Sidebar Nav Filters */}
        <aside className="op-sidebar">
          <div className="op-filter-group">
            <h4 className="op-filter-title">DEPARTMENT</h4>
            <label className="op-checkbox-lbl"><input type="checkbox" defaultChecked /> <span>Engineering</span></label>
            <label className="op-checkbox-lbl"><input type="checkbox" /> <span>Design</span></label>
            <label className="op-checkbox-lbl"><input type="checkbox" /> <span>Operations</span></label>
            <label className="op-checkbox-lbl"><input type="checkbox" /> <span>Legal</span></label>
          </div>

          <div className="op-filter-group">
            <h4 className="op-filter-title">LOCATION</h4>
            <label className="op-checkbox-lbl"><input type="checkbox" /> <span>Remote</span></label>
            <label className="op-checkbox-lbl"><input type="checkbox" defaultChecked /> <span>London</span></label>
            <label className="op-checkbox-lbl"><input type="checkbox" /> <span>New York</span></label>
            <label className="op-checkbox-lbl"><input type="checkbox" /> <span>Singapore</span></label>
          </div>

          <div className="op-filter-group">
            <h4 className="op-filter-title">EXPERIENCE LEVEL</h4>
            <label className="op-checkbox-lbl"><input type="checkbox" /> <span>Junior</span></label>
            <label className="op-checkbox-lbl"><input type="checkbox" /> <span>Mid-Level</span></label>
            <label className="op-checkbox-lbl"><input type="checkbox" defaultChecked /> <span>Senior</span></label>
            <label className="op-checkbox-lbl"><input type="checkbox" /> <span>Lead</span></label>
          </div>

          <div className="op-pro-tip">
            <span className="pro-tip-lbl">PRO TIP</span>
            <p>Enable "Instant Match" to get notified when a role fits your unique skill profile.</p>
          </div>
        </aside>

        {/* Job Listings */}
        <div className="op-job-list">
          
          {jobs.map((job, idx) => (
            <React.Fragment key={job.id}>
              
              <div className="op-job-card">
                <div className="op-job-top">
                  <span className="op-job-badge">{job.department}</span>
                  <span className="op-job-time">{job.time}</span>
                </div>
                
                <div className="op-job-content-row">
                  <div className="op-job-left">
                    <h3 className="op-job-role">{job.title}</h3>
                    <p className="op-job-desc">{job.desc}</p>
                    
                    <div className="op-job-meta">
                      <span className="meta-item"><MapPin size={14}/> {job.location}</span>
                      <span className="meta-item"><Clock size={14}/> {job.type}</span>
                      <span className="meta-item"><Banknote size={14}/> {job.salary}</span>
                    </div>
                  </div>
                  
                  <div className="op-job-actions">
                    <button className="op-action-primary">Apply Now</button>
                    <button className="op-action-secondary">Quick View</button>
                  </div>
                </div>
              </div>

              {/* Insert Career Match floating pill after the second card */}
              {idx === 1 && (
                <div className="op-match-pill-container">
                  <div className="op-match-pill">
                    <div className="pill-left">
                      <Rocket size={18} color="#3b82f6" />
                      <strong>Console Career Match</strong>
                      <span className="pill-divider"></span>
                      <span className="pill-text-light">Find your perfect role in 30 seconds</span>
                    </div>
                    <button className="pill-btn">Start Matching</button>
                  </div>
                </div>
              )}

            </React.Fragment>
          ))}

          <div className="op-load-more">
            <button className="op-load-btn">
              Load More Vacancies <ArrowDown size={16} />
            </button>
          </div>

        </div>
      </section>

      {/* Custom Footer */}
      <footer className="op-footer">
        <div className="op-footer-left">
          <h4 className="op-footer-brand">Console Architectural Systems</h4>
          <p className="op-footer-copy">© 2024 CONSOLE ARCHITECTURAL SYSTEMS. ALL RIGHTS RESERVED.</p>
        </div>
        <div className="op-footer-right">
          <span>PRIVACY PROTOCOL</span>
          <span>TERMS OF ENGAGEMENT</span>
          <span>SYSTEM STATUS</span>
          <span>SECURITY</span>
        </div>
      </footer>

    </div>
  );
}
