import React, { useState } from 'react';
import {
  Search, Bell, Settings, Plus, LayoutDashboard,
  FolderKanban, MessageSquare, CreditCard, User,
  Shield, Users, Video, MoreVertical, Send,
  FileText, Banknote, History, Filter, Zap,
  Phone, Paperclip, Smile, Image as ImageIcon, Download, 
  Info, Star, Flag, Check, Clock, Folder, ChevronRight, HelpCircle, Database,
  Pencil, ShieldCheck, Palette, Command, RotateCcw, Menu
} from 'lucide-react';
import './UserDashboard.css';

export default function UserDashboard({ session, setActivePage, initialTab = 'overview' }) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const firstName = session?.user?.user_metadata?.first_name || 'Adrian';
  const lastName = session?.user?.user_metadata?.last_name || 'Sterling';
  const userInitials = firstName[0]?.toUpperCase();
  const avatarUrl = session?.user?.user_metadata?.avatar_url || 'https://i.pravatar.cc/150?u=adrian';

  return (
    <div className="user-dashboard">
      
      {/* Sidebar Navigation */}
      <aside className={`dash-sidebar${sidebarOpen ? '' : ' dash-sidebar-collapsed'}`}>
        <div className="dash-brand">
          <h2 className="dash-brand-title" style={{ opacity: sidebarOpen ? 1 : 0, transition: 'opacity 0.2s' }}>Console</h2>
          <button
            onClick={() => setSidebarOpen(o => !o)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: '#64748b', display: 'flex', alignItems: 'center',
              padding: '0.25rem', borderRadius: '0.4rem',
              transition: 'color 0.15s', flexShrink: 0,
            }}
            title={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
          >
            <Menu size={20} />
          </button>
          <div className="dash-brand-subtitle"></div>
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
          <div className="user-avatar-icon" style={{ width: 34, height: 34, borderRadius: 8, flexShrink: 0 }}>
            {userInitials}
          </div>
          <div className="dash-user-info">
            <span className="dash-user-name">{firstName} {lastName}</span>
            <span className="dash-user-role" style={{ fontSize: '0.7rem', color: '#94a3b8' }}>
              {session?.user?.email || ''}
            </span>
          </div>
        </div>
      </aside>

      {/* Main Container */}
      <div className="dash-main">
        {/* Top Header */}
        <header className="dash-header" style={{ position: 'relative' }}>
          <div className="dash-search">
            <Search size={18} color="#94a3b8" />
            <input type="text" placeholder={
              activeTab === 'messages' ? "Search conversations..." : 
              activeTab === 'payments' ? "Search billing, invoices..." : 
              activeTab === 'profile' ? "Search commands or data..." :
              "Search projects, logs, or phases..."
            } />
          </div>

          <nav className="dash-center-nav" style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', display: 'flex', alignItems: 'center' }}>
            <a 
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (setActivePage) setActivePage('home');
              }}
              style={{ 
                textDecoration: 'none', 
                color: '#64748b', 
                fontWeight: '600', 
                fontSize: '0.95rem', 
                padding: '0.5rem 1rem',
                borderRadius: '0.5rem',
                transition: 'all 0.2s ease',
              }}
              onMouseOver={(e) => { e.currentTarget.style.color = '#0f172a'; e.currentTarget.style.background = '#f1f5f9'; }}
              onMouseOut={(e) => { e.currentTarget.style.color = '#64748b'; e.currentTarget.style.background = 'transparent'; }}
            >
              Home
            </a>
          </nav>

          <div className="dash-header-actions">
            <button className="dash-icon-btn" style={{ position: 'relative' }}>
              <Bell size={20} />
              <div style={{ position: 'absolute', top: '8px', right: '8px', width: '6px', height: '6px', background: '#e3342f', borderRadius: '50%', border: '1.5px solid #fff' }}></div>
            </button>
            <button className="dash-icon-btn"><Settings size={20} /></button>
            {activeTab === 'messages' ? (
              <button className="ap-btn-new" style={{marginLeft: '1rem'}}><Plus size={16}/> New Message</button>
            ) : activeTab === 'payments' ? (
              <div className="pay-header-user">
                <div className="pay-hu-info">
                  <span className="pay-hu-name">{firstName} {lastName}</span>
                  <span className="pay-hu-role">Billing Admin</span>
                </div>
                <div className="user-avatar-icon" style={{ width: 36, height: 36, borderRadius: 8, fontSize: '1rem' }}>
                  {userInitials}
                </div>
              </div>
            ) : (
              <div className="user-avatar-icon" style={{ width: 32, height: 32, borderRadius: 8 }}>
                {userInitials}
              </div>
            )}
          </div>
        </header>

        {/* Scrollable Content Area */}
        {activeTab === 'messages' ? (
          <div className="msg-container" style={{ alignItems: 'center', justifyContent: 'center' }}>
            <div style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              justifyContent: 'center', padding: '5rem 2rem', gap: '1rem',
              textAlign: 'center', width: '100%',
            }}>
              <MessageSquare size={52} strokeWidth={1.2} color="#cbd5e1" />
              <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 700, color: '#334155' }}>
                No messages yet
              </h3>
              <p style={{ margin: 0, fontSize: '0.92rem', color: '#94a3b8', maxWidth: 360 }}>
                Your conversations with teammates and the support team will appear here.
              </p>
            </div>
          </div>
        ) : (
          <div className="dash-content" style={activeTab === 'payments' || activeTab === 'profile' ? {background:'#f8fafc', paddingBottom:'6rem'} : {}}>

          {activeTab === 'profile' && (
            <div className="pro-container">

              <div className="pro-grid-top">

                {/* Personal Details Card */}
                <div className="pro-card pro-card-main">
                  <div className="pro-main-top">
                    <div className="pro-avatar-wrapper">
                      <div className="user-avatar-icon" style={{ width: 72, height: 72, borderRadius: 16, fontSize: '1.75rem' }}>
                        {userInitials}
                      </div>
                    </div>

                    <div className="pro-main-info">
                      <h2>{firstName} {lastName}</h2>
                      <p className="pro-role-text" style={{ color: '#94a3b8' }}>{session?.user?.email || ''}</p>
                    </div>

                  </div>

                  <div className="pro-form-grid">
                    <div className="pro-form-group">
                      <label>FULL NAME</label>
                      <div className="pro-input-box">{firstName} {lastName}</div>
                    </div>
                    <div className="pro-form-group">
                      <label>EMAIL ADDRESS</label>
                      <div className="pro-input-box">{session?.user?.email || '—'}</div>
                    </div>
                    <div className="pro-form-group">
                      <label>USER ID</label>
                      <div className="pro-input-box" style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                        {session?.user?.id || '—'}
                      </div>
                    </div>
                    <div className="pro-form-group">
                      <label>ACCOUNT STATUS</label>
                      <div className="pro-input-box">
                        <span style={{ color: '#22c55e', fontWeight: 700 }}>● </span>Active
                      </div>
                    </div>
                  </div>
                </div>

              </div>



              {/* Danger Zone */}
              <div className="pro-danger-zone">
                <div className="pro-danger-info">
                  <h3 className="pro-danger-title">Delete Account</h3>
                  <p className="pro-danger-desc">Once you delete your account, there is no going back. Please be certain.</p>
                </div>
                <button className="pro-btn-danger">Deactivate Account</button>
              </div>

            </div>
          )}

          {activeTab === 'payments' && (
            <div className="pay-container" style={{ alignItems: 'center', justifyContent: 'center' }}>
              <div style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                justifyContent: 'center', padding: '5rem 2rem', gap: '1rem',
                textAlign: 'center', width: '100%',
              }}>
                <CreditCard size={52} strokeWidth={1.2} color="#cbd5e1" />
                <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 700, color: '#334155' }}>
                  No billing information yet
                </h3>
                <p style={{ margin: 0, fontSize: '0.92rem', color: '#94a3b8', maxWidth: 360 }}>
                  Your plan details, invoices, and payment methods will appear here once you subscribe.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'overview' && (
            <>
              <div className="dash-grid">

                {/* Left Column */}
                <div className="dash-col-left">

                  {/* Active Development — empty state */}
                  <div className="dash-card" style={{ marginBottom: '2rem' }}>
                    <div className="dash-card-header">
                      <h3 className="dash-card-title">Active Development</h3>
                    </div>
                    <div style={{
                      display: 'flex', flexDirection: 'column', alignItems: 'center',
                      justifyContent: 'center', padding: '3rem 1rem', gap: '0.75rem',
                      color: '#94a3b8', textAlign: 'center',
                    }}>
                      <FolderKanban size={36} strokeWidth={1.5} color="#cbd5e1" />
                      <p style={{ margin: 0, fontWeight: 600, fontSize: '0.95rem', color: '#64748b' }}>No active projects yet</p>
                      <p style={{ margin: 0, fontSize: '0.85rem' }}>Create your first project to start tracking progress here.</p>
                      <button
                        className="dash-btn-outline"
                        style={{ marginTop: '0.5rem' }}
                        onClick={() => setActiveTab('projects')}
                      >
                        Go to Projects
                      </button>
                    </div>
                  </div>

                  {/* Messages — empty state */}
                  <div className="dash-card">
                    <div className="dash-card-header">
                      <h3 className="dash-card-title">Messages</h3>
                    </div>
                    <div style={{
                      display: 'flex', flexDirection: 'column', alignItems: 'center',
                      justifyContent: 'center', padding: '3rem 1rem', gap: '0.75rem',
                      color: '#94a3b8', textAlign: 'center',
                    }}>
                      <MessageSquare size={36} strokeWidth={1.5} color="#cbd5e1" />
                      <p style={{ margin: 0, fontWeight: 600, fontSize: '0.95rem', color: '#64748b' }}>No messages yet</p>
                      <p style={{ margin: 0, fontSize: '0.85rem' }}>Your conversations with the team will appear here.</p>
                      <button
                        className="dash-btn-outline"
                        style={{ marginTop: '0.5rem' }}
                        onClick={() => setActiveTab('messages')}
                      >
                        Open Messages
                      </button>
                    </div>
                  </div>

                </div>

                {/* Right Column */}
                <div className="dash-col-right">

                  {/* Profile Card — real data only */}
                  <div className="dash-card dash-profile-card" style={{ marginBottom: '2rem' }}>
                    <div className="dash-pro-avatar-lg">
                      {userInitials}
                      <div className="dash-pro-badge"><Settings size={12}/></div>
                    </div>
                    <h3 className="dash-pro-name">{firstName} {lastName}</h3>
                    <p className="dash-pro-tier" style={{ color: '#94a3b8' }}>
                      {session?.user?.email || ''}
                    </p>
                    <div className="dash-pro-actions">
                      <button className="dash-pro-btn" onClick={() => setActiveTab('profile')}>
                        <Shield size={18} color="#2f6be8" /> Account Settings
                      </button>
                    </div>
                    <button className="dash-btn-outline" onClick={() => setActiveTab('payments')}>View Billing</button>
                  </div>

                  {/* Quick Actions Card */}
                  <div className="dash-card" style={{ marginBottom: '2rem' }}>
                    <div className="dash-card-header" style={{ marginBottom: '1rem' }}>
                      <h3 className="dash-card-title">Quick Actions</h3>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                      {[
                        { icon: <FolderKanban size={16} color="#2f6be8" />, label: 'New Project', tab: 'projects' },
                        { icon: <MessageSquare size={16} color="#2f6be8" />, label: 'Messages', tab: 'messages' },
                        { icon: <CreditCard size={16} color="#2f6be8" />, label: 'Billing & Payments', tab: 'payments' },
                        { icon: <User size={16} color="#2f6be8" />, label: 'Profile Settings', tab: 'profile' },
                      ].map(({ icon, label, tab }) => (
                        <button
                          key={tab}
                          onClick={() => setActiveTab(tab)}
                          style={{
                            display: 'flex', alignItems: 'center', gap: '0.75rem',
                            padding: '0.7rem 1rem', borderRadius: '0.6rem',
                            border: '1px solid #e2e8f0', background: '#f8fafc',
                            cursor: 'pointer', fontSize: '0.88rem', fontWeight: 600,
                            color: '#0f172a', transition: 'all 0.18s',
                            textAlign: 'left',
                          }}
                          onMouseOver={e => { e.currentTarget.style.background = '#eff6ff'; e.currentTarget.style.borderColor = '#bfdbfe'; }}
                          onMouseOut={e => { e.currentTarget.style.background = '#f8fafc'; e.currentTarget.style.borderColor = '#e2e8f0'; }}
                        >
                          {icon} {label}
                        </button>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            </>
          )}

          {activeTab === 'projects' && (
            <div className="ap-container">
              <div className="ap-header">
                <div>
                  <h1 className="ap-title">Active Projects</h1>
                </div>
                <div className="ap-actions">
                  <button className="ap-btn-filter"><Filter size={16}/> Filter</button>
                  <button className="ap-btn-new"><Plus size={16}/> New Project</button>
                </div>
              </div>

              {/* Empty State */}
              <div style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                justifyContent: 'center', padding: '5rem 2rem', gap: '1rem',
                textAlign: 'center',
              }}>
                <FolderKanban size={52} strokeWidth={1.2} color="#cbd5e1" />
                <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 700, color: '#334155' }}>
                  No projects yet
                </h3>
                <p style={{ margin: 0, fontSize: '0.92rem', color: '#94a3b8', maxWidth: 360 }}>
                  Create your first project to start tracking phases, progress, and team activity.
                </p>
                <button className="ap-btn-new" style={{ marginTop: '0.5rem' }}>
                  <Plus size={16}/> New Project
                </button>
              </div>
            </div>

          
          )}
        </div>
        )}

      </div>
    </div>
  );
}
