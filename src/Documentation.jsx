import React, { useState } from 'react';
import {
  FileText, Shield, Lock, Archive, Eye,
  Download, Printer, Link2, Search, CheckCircle2,
  Info, ChevronRight, ExternalLink, Database
} from 'lucide-react';
import './Documentation.css';

const sidebarItems = [
  { id: 'overview', label: 'Overview', icon: <Eye size={15} /> },
  { id: 'user-agreements', label: 'User Agreements', icon: <FileText size={15} />, active: true },
  { id: 'data-processing', label: 'Data Processing', icon: <Database size={15} /> },
  { id: 'api-licensing', label: 'API Licensing', icon: <Link2 size={15} /> },
  { id: 'patent-portfolio', label: 'Patent Portfolio', icon: <Shield size={15} /> },
  { id: 'archive', label: 'Archive', icon: <Archive size={15} /> },
];

const topNavItems = ['Home', 'Documentation', 'Compliance', 'Security', 'Privacy', 'Terms'];

const sections = [
  {
    number: 1,
    title: 'Scope of Services',
    content: [
      'This Master Service Agreement ("Agreement") governs the purchase and use of Console\'s professional IT infrastructure, cloud computing resources, and legal orchestration software. By accessing the Platform, the Customer agrees to abide by the architectural standards and security protocols defined herein.',
      'Console IT provides a suite of managed services, including but not limited to, automated compliance monitoring, neural-network-backed document parsing, and high-fidelity reporting interfaces.'
    ]
  },
  {
    number: 2,
    title: 'Data Privacy & Sovereignty',
    content: [
      'Console prioritizes the structural integrity of user data. We employ end-to-end encryption for all documents stored within the Legal Center. Data sovereignty is maintained through localized regional clusters, ensuring compliance with global data protection regulations (GDPR, CCPA).',
    ],
    hasCommandCenter: true
  },
  {
    number: 3,
    title: 'Liability and Indemnification',
    content: [
      'Each party shall indemnify, defend, and hold harmless the other from and against any third-party claims arising from breaches of confidentiality or gross negligence. Console\'s maximum aggregate liability under this agreement shall not exceed the total fees paid by the customer in the preceding twelve-month period.'
    ]
  }
];

export default function Documentation({ setActivePage, setIsQueryModalOpen }) {
  const [activeNav, setActiveNav] = useState('Compliance');
  const [activeSidebar, setActiveSidebar] = useState('user-agreements');
  const [searchVal, setSearchVal] = useState('');

  return (
    <div className="docs-page">
      {/* Docs Sub-header */}
      <div className="docs-topbar">
        <div className="docs-topbar-brand">Console Legal</div>
        <nav className="docs-topbar-nav">
          {topNavItems.map((item) => (
            <span
              key={item}
              className={`docs-topnav-item ${activeNav === item ? 'active' : ''}`}
              onClick={() => {
                if (item === 'Home') {
                  setActivePage('home');
                } else {
                  setActiveNav(item);
                }
              }}
            >
              {item}
            </span>
          ))}
        </nav>
        <div className="docs-topbar-right">
          <div className="docs-search-bar">
            <Search size={14} color="#9ca3af" />
            <input
              type="text"
              placeholder="Search legal documentation..."
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
            />
          </div>
          <button className="btn-primary docs-contact-btn" onClick={() => setActivePage('notfound')}>
            Contact Legal
          </button>
        </div>
      </div>

      <div className="docs-body">
        {/* Left Sidebar */}
        <aside className="docs-sidebar">
          <div className="docs-sidebar-heading">
            <h3>Legal Categories</h3>
            <p>Precision Documentation</p>
          </div>

          <nav className="docs-sidebar-nav">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                className={`docs-sidebar-item ${activeSidebar === item.id ? 'active' : ''}`}
                onClick={() => setActiveSidebar(item.id)}
              >
                <span className="docs-sidebar-icon">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>

          <div className="docs-internal-access">
            <span className="internal-tag">INTERNAL ACCESS</span>
            <div className="internal-user">
              <div className="internal-avatar">JV</div>
              <div>
                <div className="internal-name">Julian Vane</div>
                <div className="internal-role">General Counsel</div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="docs-main">
          {/* Breadcrumb */}
          <div className="docs-breadcrumb">
            <span onClick={() => setActivePage('resources')} className="crumb-link">Resources</span>
            <ChevronRight size={13} color="#9ca3af" />
            <span className="crumb-link" onClick={() => setActivePage('notfound')}>Legal Center</span>
            <ChevronRight size={13} color="#9ca3af" />
            <span className="crumb-current">User Agreements</span>
          </div>

          {/* Document Header */}
          <div className="docs-doc-header">
            <div className="docs-doc-title-row">
              <h1 className="docs-doc-title">Master Service Agreement</h1>
              <div className="docs-doc-actions">
                <button className="docs-action-btn" onClick={() => setActivePage('notfound')}>
                  <Download size={15} /> Download PDF
                </button>
                <button className="docs-action-btn" onClick={() => setActivePage('notfound')}>
                  <Printer size={15} /> Print
                </button>
                <button className="docs-action-btn" onClick={() => setActivePage('notfound')}>
                  <Link2 size={15} /> Copy Link
                </button>
              </div>
            </div>
            <div className="docs-doc-meta">
              <span className="docs-version-badge">
                <CheckCircle2 size={13} color="#22c55e" /> Version 2.4.1
              </span>
              <span className="docs-last-updated">Last Updated: October 24, 2024</span>
            </div>
          </div>

          <div className="docs-content-grid">
            {/* Sections */}
            <div className="docs-sections">
              {sections.map((section) => (
                <div key={section.number} className="docs-section">
                  <div className="docs-section-title">
                    <span className="docs-section-num">{section.number}</span>
                    <h2>{section.title}</h2>
                  </div>
                  {section.content.map((para, i) => (
                    <p key={i} className="docs-section-para">{para}</p>
                  ))}
                  {section.hasCommandCenter && (
                    <div className="docs-command-center">
                      <div className="command-left">
                        <span className="enc-label">ENC</span>
                        <span className="enc-label">AES</span>
                      </div>
                      <div className="command-center-middle">
                        <Database size={14} color="#6b7280" />
                        <span>COMMAND CENTER</span>
                      </div>
                      <div className="command-center-actions">
                        <button><Search size={14} /></button>
                        <button><Archive size={14} /></button>
                        <button><Link2 size={14} /></button>
                        <button className="command-new-btn" onClick={() => setActivePage('notfound')}>New Query</button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Right Sidebar */}
            <aside className="docs-right-sidebar">
              {/* Custom MSA */}
              <div className="docs-promo-box">
                <div className="promo-box-bg"></div>
                <div className="promo-box-content">
                  <h4>Need a custom MSA?</h4>
                  <p>Enterprise partners can request bespoke terms and SLA guarantees via our Priority Legal Desk.</p>
                  <button className="promo-box-btn" onClick={() => setActivePage('notfound')}>Request Review</button>
                </div>
              </div>

              {/* Quick Reference */}
              <div className="docs-quick-ref">
                <div className="quick-ref-header">
                  <Info size={15} color="#2f6be8" />
                  <h4>Quick Reference</h4>
                </div>
                <ul className="quick-ref-list">
                  <li>
                    <CheckCircle2 size={14} color="#22c55e" />
                    <div>
                      <strong>Effective Date</strong>
                      <span>Immediate upon platform sign-up</span>
                    </div>
                  </li>
                  <li>
                    <CheckCircle2 size={14} color="#22c55e" />
                    <div>
                      <strong>Governing Law</strong>
                      <span>State of Delaware, USA</span>
                    </div>
                  </li>
                  <li>
                    <CheckCircle2 size={14} color="#22c55e" />
                    <div>
                      <strong>Termination Notice</strong>
                      <span>30-day written notice required</span>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Webinar Promo */}
              <div className="docs-webinar-card">
                <div className="docs-webinar-img">
                  <Lock size={28} color="rgba(255,255,255,0.4)" />
                </div>
                <div className="docs-webinar-info">
                  <span className="webinar-label">Upcoming Webinar</span>
                  <p>Navigating Data Privacy in the AI Era</p>
                </div>
              </div>
            </aside>
          </div>
        </main>
      </div>

      {/* Page Footer */}
      <footer className="docs-footer">
        <div className="docs-footer-left">
          <span className="docs-footer-brand">Console IT</span>
          <span>© 2024 Console IT. All rights reserved. Professional Legal Services.</span>
        </div>
        <div className="docs-footer-links">
          {['Privacy Policy', 'Cookies', 'Status'].map((l) => (
            <a key={l} href="#" onClick={(e) => { e.preventDefault(); setActivePage('notfound'); }}>{l}</a>
          ))}
          <a href="#" onClick={(e) => { e.preventDefault(); setIsQueryModalOpen(true); }}>Support</a>
          <a href="#" onClick={(e) => { e.preventDefault(); setActivePage('notfound'); }}>System Status</a>
          <span className="docs-footer-icons">
            <ExternalLink size={14} />
            <Shield size={14} />
          </span>
        </div>
      </footer>
    </div>
  );
}
