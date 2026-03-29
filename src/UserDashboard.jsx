import React, { useState } from 'react';
import {
  Search, Bell, Settings, Plus, LayoutDashboard,
  FolderKanban, MessageSquare, CreditCard, User,
  Shield, Users, Video, MoreVertical, Send,
  FileText, Banknote, History
} from 'lucide-react';
import './UserDashboard.css';

export default function UserDashboard({ session }) {
  const [activeTab, setActiveTab] = useState('overview');

  const firstName = session?.user?.user_metadata?.first_name || 'Julian';
  const lastName = session?.user?.user_metadata?.last_name || 'Voss';
  const userInitials = firstName[0]?.toUpperCase();

  return (
    <div className="user-dashboard">
      
      {/* Sidebar Navigation */}
      <aside className="dash-sidebar">
        <div className="dash-brand">
          <h2 className="dash-brand-title">Console</h2>
          <div className="dash-brand-subtitle">PRECISION ATELIER</div>
        </div>

        <nav className="dash-nav">
          <div className={`dash-nav-item ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>
            <LayoutDashboard size={18} /> Overview
          </div>
          <div className={`dash-nav-item ${activeTab === 'projects' ? 'active' : ''}`} onClick={() => setActiveTab('projects')}>
            <FolderKanban size={18} /> Active Projects
          </div>
          <div className={`dash-nav-item ${activeTab === 'messages' ? 'active' : ''}`} onClick={() => setActiveTab('messages')}>
            <MessageSquare size={18} /> Messages
          </div>
          <div className={`dash-nav-item ${activeTab === 'payments' ? 'active' : ''}`} onClick={() => setActiveTab('payments')}>
            <CreditCard size={18} /> Payments
          </div>
          <div className={`dash-nav-item ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => setActiveTab('profile')}>
            <User size={18} /> Profile
          </div>
        </nav>

        <div className="dash-user-bottom">
          <div className="dash-user-avatar">{userInitials}</div>
          <div className="dash-user-info">
            <span className="dash-user-name">{firstName} {lastName}</span>
            <span className="dash-user-role">Director of UX</span>
          </div>
        </div>
      </aside>

      {/* Main Container */}
      <div className="dash-main">
        {/* Top Header */}
        <header className="dash-header">
          <div className="dash-search">
            <Search size={18} color="#94a3b8" />
            <input type="text" placeholder="Search projects or invoices..." />
          </div>
          <div className="dash-header-actions">
            <button className="dash-icon-btn"><Bell size={20} /></button>
            <button className="dash-icon-btn"><Settings size={20} /></button>
            <button className="dash-btn-primary">New Project</button>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <div className="dash-content">

          <div className="dash-greeting">
            <h2>Workspace Overview</h2>
            <p>Welcome back, {firstName}. You have 3 projects requiring review and 1 pending invoice.</p>
          </div>

          <div className="dash-grid">
            
            {/* Left Column */}
            <div className="dash-col-left">

              {/* Active Development Card */}
              <div className="dash-card" style={{ marginBottom: '2rem' }}>
                <div className="dash-card-header">
                  <h3 className="dash-card-title">Active Development</h3>
                  <span className="dash-badge-blue">3 Live Cycles</span>
                </div>

                <div className="dash-project-item">
                  <div className="dash-proj-top">
                    <div>
                      <h4 className="dash-proj-name">Project: Aether Core</h4>
                      <p className="dash-proj-ref">Ref: #ATC-2024-08</p>
                    </div>
                    <span className="dash-badge-progress">In Progress</span>
                  </div>
                  <div className="dash-progress-wrapper">
                    <div className="dash-progress-bar"><div className="dash-progress-fill" style={{width: '65%'}}></div></div>
                    <span className="dash-progress-text">65%</span>
                  </div>
                  <div className="dash-proj-comment">
                    <div className="dash-mini-avatar" style={{background: '#1e293b'}}></div>
                    <span>"Finalizing the API integration for the authentication module." — Leo S., Lead Dev</span>
                  </div>
                </div>

                <div className="dash-project-item">
                  <div className="dash-proj-top">
                    <div>
                      <h4 className="dash-proj-name">Console: UI System 2.0</h4>
                      <p className="dash-proj-ref">Ref: #CSL-SYS-99</p>
                    </div>
                    <span className="dash-badge-testing">Testing</span>
                  </div>
                  <div className="dash-progress-wrapper">
                    <div className="dash-progress-bar"><div className="dash-progress-fill red" style={{width: '92%'}}></div></div>
                    <span className="dash-progress-text">92%</span>
                  </div>
                  <div className="dash-proj-comment">
                    <div className="dash-mini-avatar" style={{background: '#334155'}}></div>
                    <span>"Regression tests passing. Accessibility audit starting in 2 hours." — Sara K., QA</span>
                  </div>
                </div>
              </div>

              {/* Chat / Support Card */}
              <div className="dash-card">
                <div className="dash-chat-header">
                  <div className="dash-chat-user">
                    <div className="dash-user-avatar" style={{borderRadius:'50%'}}><User size={20} color="#fff"/></div>
                    <div>
                      <h4 className="dash-chat-title">Project Support</h4>
                      <p className="dash-chat-status">Team sync: 4 Online</p>
                    </div>
                  </div>
                  <div style={{display:'flex', gap:'1rem', color:'#64748b'}}>
                    <Video size={18} cursor="pointer" />
                    <MoreVertical size={18} cursor="pointer" />
                  </div>
                </div>

                <div className="dash-chat-bubbles">
                  {/* Incoming Chat */}
                  <div className="dash-chat-bubble">
                    <div className="dash-mini-avatar" style={{background:'#0f172a', flexShrink: 0, marginTop:'4px'}}></div>
                    <div>
                      <div className="dash-chat-text">
                        Hey {firstName}, I've just uploaded the latest design specs for the dashboard. Can you take a look at the grid layout?
                      </div>
                      <div className="dash-chat-attachment">
                        <div className="dash-attach-info">
                          <div className="dash-attach-icon"><FileText size={16}/></div>
                          <div>
                            <p className="dash-attach-name">dashboard-grid.pdf</p>
                            <p className="dash-attach-size">4.2 MB • QUICK ACTIONS</p>
                          </div>
                        </div>
                        <div style={{display:'flex', gap:'0.6rem'}}>
                          <Settings size={14} color="#64748b"/>
                        </div>
                      </div>
                      <span className="dash-chat-time">10:45 AM</span>
                    </div>
                  </div>

                  {/* Outgoing Chat */}
                  <div className="dash-chat-bubble dash-chat-out">
                    <div>
                      <div className="dash-chat-text">
                        Looks clean! The asymmetric spacing in the Bento grid works perfectly. Let's push this to testing.
                      </div>
                    </div>
                  </div>
                </div>

                <div className="dash-chat-input">
                  <Plus size={18} color="#64748b" cursor="pointer" />
                  <input type="text" placeholder="Type a message..." />
                  <Send size={18} color="#2f6be8" cursor="pointer" />
                </div>
              </div>

            </div>

            {/* Right Column */}
            <div className="dash-col-right">

              {/* Profile Card */}
              <div className="dash-card dash-profile-card" style={{ marginBottom: '2rem' }}>
                <div className="dash-pro-avatar-lg">
                  {userInitials}
                  <div className="dash-pro-badge"><Settings size={12}/></div>
                </div>
                <h3 className="dash-pro-name">{firstName} {lastName}</h3>
                <p className="dash-pro-tier">Platinum Tier Client</p>
                
                <div className="dash-pro-actions">
                  <button className="dash-pro-btn">
                    <Shield size={18} color="#2f6be8"/>
                    Security
                  </button>
                  <button className="dash-pro-btn">
                    <Users size={18} color="#2f6be8"/>
                    Team
                  </button>
                </div>
                <button className="dash-btn-outline">Manage Account Settings</button>
              </div>

              {/* Billing Card */}
              <div className="dash-card" style={{ marginBottom: '2rem' }}>
                <div className="dash-card-header" style={{marginBottom:'0.5rem'}}>
                  <h3 className="dash-card-title">Billing</h3>
                  <FileText size={18} color="#64748b"/>
                </div>

                <div className="dash-billing-box">
                  <p className="dash-billing-label">Monthly Retainer</p>
                  <h2 className="dash-billing-amount">$4,500.00 <span className="dash-due-badge">DUE IN 4 DAYS</span></h2>
                </div>

                <h4 className="dash-trans-label">RECENT TRANSACTIONS</h4>
                
                <div className="dash-trans-list">
                  <div className="dash-trans-item">
                    <div className="dash-trans-left">
                      <div className="dash-trans-icon"><Banknote size={16}/></div>
                      <div>
                        <p className="dash-trans-name">Infrastructure Credits</p>
                        <p className="dash-trans-date">Feb 12, 2024</p>
                      </div>
                    </div>
                    <span className="dash-trans-val neg">-$240.00</span>
                  </div>

                  <div className="dash-trans-item">
                    <div className="dash-trans-left">
                      <div className="dash-trans-icon"><Banknote size={16}/></div>
                      <div>
                        <p className="dash-trans-name">Project Installment #2</p>
                        <p className="dash-trans-date">Feb 01, 2024</p>
                      </div>
                    </div>
                    <span className="dash-trans-val pos">+$12,000.00</span>
                  </div>
                </div>

                <button className="dash-btn-ghost"><History size={16}/> Full Transaction History</button>
              </div>

              {/* Technical Assistance Card */}
              <div className="dash-card dash-assistance">
                <h3 className="dash-assist-title">Need Technical Assistance?</h3>
                <p className="dash-assist-text">Our senior architects are available 24/7 for priority clients.</p>
                <button className="dash-btn-white">Open Priority Ticket</button>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
