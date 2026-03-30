import React, { useState } from 'react';
import {
  Search, Bell, Settings, Plus, LayoutDashboard,
  FolderKanban, MessageSquare, CreditCard, User,
  Shield, Users, Video, MoreVertical, Send,
  FileText, Banknote, History, Filter, Zap,
  Phone, Paperclip, Smile, Image as ImageIcon, Download, 
  Info, Star, Flag, Check, Clock, Folder, ChevronRight, HelpCircle, Database,
  Pencil, ShieldCheck, Palette, Command, RotateCcw
} from 'lucide-react';
import './UserDashboard.css';

export default function UserDashboard({ session, setActivePage, initialTab = 'overview' }) {
  const [activeTab, setActiveTab] = useState(initialTab);

  const firstName = session?.user?.user_metadata?.first_name || 'Adrian';
  const lastName = session?.user?.user_metadata?.last_name || 'Sterling';
  const userInitials = firstName[0]?.toUpperCase();
  const avatarUrl = session?.user?.user_metadata?.avatar_url || 'https://i.pravatar.cc/150?u=adrian';

  return (
    <div className="user-dashboard">
      
      {/* Sidebar Navigation */}
      <aside className="dash-sidebar">
        <div className="dash-brand">
          <h2 className="dash-brand-title">Console</h2>
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

        {activeTab === 'payments' ? (
          <div className="dash-user-bottom pay-sidebar-bottom">
            <div className="pay-support-icon">
              <Shield size={16} /> 
            </div>
            <div className="pay-support-info">
              <span className="pay-support-title">Priority Support</span>
              <span className="pay-support-status">Enterprise Active</span>
            </div>
          </div>
        ) : activeTab === 'profile' ? (
          <div className="dash-user-bottom pay-sidebar-bottom" style={{backgroundColor: '#e2e8f0', borderRadius: '0.75rem'}}>
            <div className="dash-user-avatar" style={{width: 32, height: 32, borderRadius: 8, backgroundColor: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}><User size={16} color="#fff"/></div>
            <div className="dash-user-info">
              <span className="dash-user-name" style={{fontSize: '0.85rem'}}>Julian Vane</span>
              <span className="dash-user-role" style={{fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#64748b'}}>Pro Member</span>
            </div>
          </div>
        ) : (
          <div className="dash-user-bottom">
            <div className="dash-user-avatar" style={{backgroundImage: `url(${avatarUrl})`, backgroundSize: 'cover', backgroundPosition: 'center', color: 'transparent'}}>{userInitials}</div>
            <div className="dash-user-info">
              <span className="dash-user-name">{firstName} {lastName}</span>
              <span className="dash-user-role"></span>
            </div>
          </div>
        )}
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
                  <span className="pay-hu-name">Julian Vane</span>
                  <span className="pay-hu-role">Billing Admin</span>
                </div>
                <div className="dash-user-avatar" style={{width: 36, height: 36, borderRadius: 8, backgroundImage: `url('https://i.pravatar.cc/150?u=julian')`, backgroundSize: 'cover', backgroundPosition: 'center', color: 'transparent'}}>J</div>
              </div>
            ) : (
              <button className="dash-user-avatar" style={{width: 32, height: 32, borderRadius: 8, border:'none', cursor:'pointer', backgroundImage: `url(${avatarUrl})`, backgroundSize: 'cover', backgroundPosition: 'center', color: 'transparent'}}>{userInitials}</button>
            )}
          </div>
        </header>

        {/* Scrollable Content Area */}
        {activeTab === 'messages' ? (
          <div className="msg-container">
            {/* Left Sidebar */}
            <div className="msg-sidebar">
              <div className="msg-sidebar-header">
                <h2>Inbox</h2>
                <div className="msg-badge">4 New</div>
              </div>
              <div className="msg-tabs">
                <div className="msg-tab active">All</div>
                <div className="msg-tab">Developers</div>
                <div className="msg-tab">Support</div>
              </div>
              
              <div className="msg-list">
                <div className="msg-item active">
                  <div className="msg-avatar-wrapper">
                    <img src="https://i.pravatar.cc/150?u=sarahm" alt="Sarah" className="msg-avatar" />
                    <span className="msg-online-dot"></span>
                  </div>
                  <div className="msg-item-info">
                    <div className="msg-item-top">
                      <h4>Sarah Miller</h4>
                      <span className="msg-time">2m ago</span>
                    </div>
                    <span className="msg-role">Lead Developer</span>
                    <p className="msg-snippet">I've pushed the latest architectural components to the staging environment. Let me know if...</p>
                  </div>
                </div>

                <div className="msg-item">
                  <div className="msg-avatar-wrapper">
                    <img src="https://i.pravatar.cc/150?u=marcusv" alt="Marcus" className="msg-avatar" />
                  </div>
                  <div className="msg-item-info">
                    <div className="msg-item-top">
                      <h4>Marcus Vance</h4>
                      <span className="msg-time">1h ago</span>
                    </div>
                    <span className="msg-role">System Support</span>
                    <p className="msg-snippet">Ticket #4920 has been successfully resolved.</p>
                  </div>
                </div>

                <div className="msg-item">
                  <div className="msg-avatar-wrapper">
                    <img src="https://i.pravatar.cc/150?u=elena" alt="Elena" className="msg-avatar" />
                  </div>
                  <div className="msg-item-info">
                    <div className="msg-item-top">
                      <h4>Elena Rodriguez</h4>
                      <span className="msg-time">Yesterday</span>
                    </div>
                    <span className="msg-role">Project Manager</span>
                    <p className="msg-snippet">The Q4 roadmap looks solid. We should proceed.</p>
                  </div>
                </div>

                <div className="msg-item">
                  <div className="msg-avatar-wrapper group">
                    <Users size={16} color="#64748b" />
                  </div>
                  <div className="msg-item-info">
                    <div className="msg-item-top">
                      <h4>Frontend Team</h4>
                      <span className="msg-time">Mar 12</span>
                    </div>
                    <span className="msg-role">Group Chat</span>
                    <p className="msg-snippet">James: Can anyone check the API documentation?</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Middle Chat Area */}
            <div className="msg-chat-area">
              <div className="msg-chat-header">
                <div className="msg-chat-user">
                  <div className="msg-chat-avatar"><img src="https://i.pravatar.cc/150?u=sarahm" alt="Sarah" /></div>
                  <div>
                    <h3 className="msg-chat-name">Sarah Miller <span className="msg-status-badge"><span className="msg-status-dot"></span>ONLINE</span></h3>
                    <span className="msg-chat-role">Lead Developer • Precision Systems</span>
                  </div>
                </div>
                <div className="msg-chat-actions">
                  <Video size={20} cursor="pointer" color="#475569" className="msg-icon-action" />
                  <Phone size={20} cursor="pointer" color="#475569" className="msg-icon-action" />
                  <MoreVertical size={20} cursor="pointer" color="#475569" className="msg-icon-action" />
                </div>
              </div>

              <div className="msg-chat-scroll">
                <div className="msg-date-divider"><span>TODAY</span></div>

                <div className="msg-row incoming no-avatar">
                  <div className="msg-bubble">
                    Hello Alex! I just finished reviewing the design system specs for the "Precision Atelier" project. The asymmetric grid layout in the dashboard looks incredible.
                  </div>
                </div>

                <div className="msg-row incoming">
                  <img src="https://i.pravatar.cc/150?u=sarahm" alt="Sarah" className="msg-avatar-small" />
                  <div className="msg-bubble-group">
                    <div className="msg-bubble">
                      I've pushed the initial React components to the repo. Can you take a look at the navigation logic?
                    </div>
                    <div className="msg-meta">09:12 AM</div>
                  </div>
                </div>

                <div className="msg-row outgoing">
                  <div className="msg-bubble-group right">
                    <div className="msg-bubble primary">
                      That's great news, Sarah. I'll check the repository right away. Did you manage to implement the glassmorphism effects for the floating Command Bar?
                    </div>
                    <div className="msg-meta right">09:15 AM <div className="msg-read-check"><Check size={8} color="#fff" strokeWidth={3}/></div></div>
                  </div>
                </div>

                <div className="msg-row incoming">
                  <img src="https://i.pravatar.cc/150?u=sarahm" alt="Sarah" className="msg-avatar-small" />
                  <div className="msg-bubble-group">
                    <div className="msg-bubble">
                      Yes, I used the backdrop-blur filters we discussed. Here's a quick preview of the component in isolation.
                    </div>
                    <div className="msg-attachment-card">
                      <div className="msg-attach-icon-blue"><ImageIcon size={20} color="#2f6be8" /></div>
                      <div className="msg-attach-content">
                        <h5>command_bar_preview.png</h5>
                        <span>2.4 MB • PNG Image</span>
                      </div>
                      <Download size={18} color="#475569" cursor="pointer" className="msg-attach-dl" />
                    </div>
                    <div className="msg-meta">09:18 AM</div>
                  </div>
                </div>
              </div>

              <div className="msg-input-wrapper">
                <div className="msg-floating-cmd-container">
                    <div className="msg-floating-cmd">
                    <div className="msg-cmd-left">
                        <Search size={16} color="#2f6be8"/>
                        <span>Command (Ctrl + K)</span>
                    </div>
                    <div className="msg-cmd-right">
                        <div className="msg-cmd-item"><Clock size={14} color="#64748b"/> Meetings</div>
                        <div className="msg-cmd-item"><Folder size={14} color="#64748b"/> Vault</div>
                    </div>
                    </div>
                </div>
                
                <div className="msg-input-box">
                  <div className="msg-input-inner">
                    <input type="text" placeholder="Message Sarah Miller..." />
                    <div className="msg-input-actions">
                        <Paperclip size={20} color="#64748b" cursor="pointer" className="msg-icon-action" />
                        <Smile size={20} color="#64748b" cursor="pointer" className="msg-icon-action" />
                        <button className="msg-send-btn"><Send size={16} color="#fff" /></button>
                    </div>
                  </div>
                </div>
                <div className="msg-footer-text">
                  END-TO-END ENCRYPTED • CONSOLE PRECISION MESSENGER
                </div>
              </div>
            </div>

            {/* Right Action Bar */}
            <div className="msg-right-actions-bar">
              <div className="msg-right-group">
                <div className="msg-right-action"><Info size={16} color="#475569" /></div>
                <div className="msg-right-action"><History size={16} color="#475569" /></div>
                <div className="msg-right-action"><Star size={16} color="#475569" /></div>
              </div>
              <div className="msg-right-action red"><Flag size={16} color="#ef4444" /></div>
            </div>
          </div>
        ) : (
          <div className="dash-content" style={activeTab === 'payments' || activeTab === 'profile' ? {background:'#f8fafc', paddingBottom:'6rem'} : {}}>

          {activeTab === 'profile' && (
            <div className="pro-container">
              
              <div className="pro-header">
                <h1 className="pro-title">Account Settings</h1>
                <p className="pro-subtitle">Manage your atelier workspace identity, security preferences, and team permissions from a centralized control plane.</p>
              </div>

              <div className="pro-grid-top">
                
                {/* Personal Details Card */}
                <div className="pro-card pro-card-main">
                  <div className="pro-main-top">
                    <div className="pro-avatar-wrapper">
                      <img src="https://i.pravatar.cc/150?u=julian" alt="Julian" className="pro-avatar-img" />
                      <button className="pro-avatar-edit-btn"><Pencil size={12} color="#fff"/></button>
                    </div>
                    
                    <div className="pro-main-info">
                      <h2>Julian Vane</h2>
                      <p className="pro-role-text">Lead Architect & System Administrator</p>
                      <div className="pro-badges">
                        <span className="pro-badge blue">ADMIN</span>
                        <span className="pro-badge gray">PREMIUM PLAN</span>
                      </div>
                    </div>
                    
                    <button className="pro-btn-save">Save<br/>Changes</button>
                  </div>
                  
                  <div className="pro-form-grid">
                    <div className="pro-form-group">
                      <label>FULL NAME</label>
                      <div className="pro-input-box">Julian Vane</div>
                    </div>
                    <div className="pro-form-group">
                      <label>EMAIL ADDRESS</label>
                      <div className="pro-input-box">julian.v@console.atelier</div>
                    </div>
                    <div className="pro-form-group">
                      <label>WORKSPACE URL</label>
                      <div className="pro-input-box"><span className="pro-input-prefix">console.io/</span> julianvane</div>
                    </div>
                    <div className="pro-form-group">
                      <label>TIMEZONE</label>
                      <div className="pro-input-box">UTC-5 (Eastern Standard Time)</div>
                    </div>
                  </div>
                </div>
                
                {/* Account Security Card */}
                <div className="pro-card pro-card-side">
                  <div className="pro-card-header">
                    <ShieldCheck size={20} className="pro-hdr-icon"/> Account Security
                  </div>
                  
                  <div className="pro-2fa-box">
                    <div className="pro-2fa-top">
                      <span className="pro-2fa-title">Two-Factor<br/>Authentication</span>
                      <span className="pro-badge green">ENABLED</span>
                    </div>
                    <p className="pro-2fa-desc">Protect your account with an extra layer of security using an authenticator app.</p>
                    <button className="pro-btn-2fa">Configure 2FA</button>
                  </div>
                  
                  <div className="pro-list-item">
                    <span>Change Password</span>
                    <ChevronRight size={16} className="pro-list-icon"/>
                  </div>
                  <div className="pro-list-item">
                    <span>Session Management</span>
                    <ChevronRight size={16} className="pro-list-icon"/>
                  </div>
                  
                </div>

              </div>

              <div className="pro-grid-bottom" style={{position: 'relative'}}>
                
                {/* Workspace Theme Card */}
                <div className="pro-card">
                  <div className="pro-card-header">
                    <Palette size={20} className="pro-hdr-icon"/> Workspace Theme
                  </div>
                  
                  <div className="pro-theme-options">
                    <div className="pro-theme-box active">
                      <div className="pro-theme-color light"></div>
                      <span className="pro-theme-lbl">Atelier<br/>Light</span>
                    </div>
                    <div className="pro-theme-box">
                      <div className="pro-theme-color dark"></div>
                      <span className="pro-theme-lbl">Onyx<br/>Dark</span>
                    </div>
                    <div className="pro-theme-box">
                      <div className="pro-theme-color system"></div>
                      <span className="pro-theme-lbl">System</span>
                    </div>
                  </div>
                  
                  <div className="pro-toggle-row">
                    <div>
                      <h4 className="pro-toggle-title">Notification Pulse</h4>
                      <p className="pro-toggle-desc">Desktop alerts for project updates</p>
                    </div>
                    <div className="pro-toggle active"><div className="pro-toggle-knob"></div></div>
                  </div>
                  
                  <div className="pro-toggle-row">
                    <div>
                      <h4 className="pro-toggle-title">Compact Mode</h4>
                      <p className="pro-toggle-desc">Denser interface for high productivity</p>
                    </div>
                    <div className="pro-toggle"><div className="pro-toggle-knob"></div></div>
                  </div>
                </div>
                
                {/* Team Members Card */}
                <div className="pro-card">
                  <div className="pro-card-header flex-between mb-4">
                    <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}><Users size={20} className="pro-hdr-icon"/> Team Members</div>
                    <button className="pro-link-blue-sm" style={{textTransform:'uppercase', border:'none', background:'transparent', padding:0}}>+ INVITE MEMBER</button>
                  </div>
                  
                  <div className="pro-team-list">
                    <div className="pro-team-item">
                      <img src="https://i.pravatar.cc/150?u=elena_vance" alt="Elena" className="pro-team-avatar" />
                      <div className="pro-team-info">
                        <span className="pro-team-name">Elena Vance</span>
                        <span className="pro-team-email">elena.v@console.atelier</span>
                      </div>
                      <span className="pro-team-role">COLLABORATOR</span>
                    </div>

                    <div className="pro-team-item">
                      <img src="https://i.pravatar.cc/150?u=marcus_t" alt="Marcus" className="pro-team-avatar" />
                      <div className="pro-team-info">
                        <span className="pro-team-name">Marcus Thorne</span>
                        <span className="pro-team-email">m.thorne@console.atelier</span>
                      </div>
                      <span className="pro-team-role">PROJECT MANAGER</span>
                    </div>

                    <div className="pro-team-item">
                      <img src="https://i.pravatar.cc/150?u=sarah_c" alt="Sarah" className="pro-team-avatar" />
                      <div className="pro-team-info">
                        <span className="pro-team-name">Sarah Chen</span>
                        <span className="pro-team-email">schen@console.atelier</span>
                      </div>
                      <span className="pro-team-role">VIEWER</span>
                    </div>
                  </div>
                </div>

                {/* Floating mock-command palette overlapping */}
                <div className="pro-floating-cmd">
                    <Command size={16} color="#3b82f6" />
                    <span style={{fontSize: '0.8rem', fontWeight: '700', color: '#0f172a'}}>Command Palette</span>
                    <div className="pro-kbd-group">
                      <kbd>⌘</kbd> <kbd>K</kbd>
                    </div>
                    <HelpCircle size={14} color="#0f172a" style={{marginLeft: '0.75rem', cursor: 'pointer', opacity: 0.8}} />
                    <RotateCcw size={14} color="#0f172a" style={{cursor: 'pointer', opacity: 0.8}} />
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
            <div className="pay-container">
              {/* Header section */}
              <div className="pay-header">
                <div>
                  <h1 className="pay-title">Billing & Payments</h1>
                  <p className="pay-subtitle">Manage your subscriptions, view usage-based retainer balances, and access your invoice history.</p>
                </div>
                <div className="pay-actions">
                  <button className="pay-btn-report">Usage Report</button>
                  <button className="pay-btn-topup"><Plus size={16}/> Top up Retainer</button>
                </div>
              </div>

              {/* Top Grid */}
              <div className="pay-grid-top">
                {/* Active Plan Card */}
                <div className="pay-card">
                  <div className="pay-card-top">
                    <span className="pay-badge">ACTIVE PLAN</span>
                    <MoreVertical className="pay-icon-more" size={20}/>
                  </div>
                  <h2 className="pay-plan-title">Atelier Enterprise</h2>
                  
                  <div className="pay-plan-details">
                    <div>
                      <p className="pay-metric-lbl">Monthly Billing</p>
                      <p className="pay-metric-val">$2,450.00<span className="pay-metric-sub">/mo</span></p>
                    </div>
                    <div>
                      <p className="pay-metric-lbl">Renewal Date</p>
                      <p className="pay-metric-val">Oct 12, 2023</p>
                    </div>
                  </div>

                  <div className="pay-plan-footer">
                    <a href="#" className="pay-link-blue">Change Plan <ChevronRight size={14}/></a>
                    <a href="#" className="pay-link-gray">View Tier Comparison</a>
                  </div>
                </div>

                {/* Retainer Card */}
                <div className="pay-card pay-card-blue">
                  <div className="pay-card-top mb-1">
                    <span className="pay-retainer-lbl"><Database size={14}/> MONTHLY RETAINER BALANCE</span>
                  </div>
                  <h2 className="pay-retainer-val">$12,840.42</h2>
                  <p className="pay-retainer-desc">
                    Your available credit for specialized architectural consulting and custom engineering sprints.
                  </p>
                  
                  <div className="pay-progress-section">
                    <div className="pay-progress-labels">
                      <span>USAGE THIS MONTH</span>
                      <span>64% OF ALLOCATED</span>
                    </div>
                    <div className="pay-progress-bar"><div className="pay-progress-fill" style={{width: '64%'}}></div></div>
                  </div>
                </div>
              </div>

              {/* Bottom Grid */}
              <div className="pay-grid-bottom">
                
                {/* Payment Methods */}
                <div className="pay-section pay-methods-sec">
                  <div className="pay-sec-header">
                    <h3>Payment Methods</h3>
                    <a href="#" className="pay-link-blue-sm">Edit</a>
                  </div>

                  <div className="pay-method-card active">
                    <div className="pay-method-icon"><CreditCard size={20} color="#0f172a"/></div>
                    <div className="pay-method-info">
                      <p className="pay-method-name">Visa Ending in 8842</p>
                      <p className="pay-method-desc">Expires 12/26 • Default</p>
                    </div>
                    <div className="pay-method-check"><Check size={12} color="#fff" strokeWidth={3}/></div>
                  </div>

                  <button className="pay-btn-add-method">
                    <div className="pay-add-icon"><Plus size={16}/></div>
                    Add New Method
                  </button>
                </div>

                {/* Transaction History */}
                <div className="pay-section pay-trans-sec">
                  <div className="pay-sec-header">
                    <h3>Transaction History</h3>
                    <div className="pay-sec-actions">
                      <span className="pay-filter-txt">Last 6 Months</span>
                      <a href="#" className="pay-link-blue-sm"><Download size={14}/> Export All</a>
                    </div>
                  </div>

                  <div className="pay-trans-table">
                    <div className="pay-table-header">
                      <div className="pay-col pay-col-id">INVOICE ID</div>
                      <div className="pay-col pay-col-status">STATUS</div>
                      <div className="pay-col pay-col-date">DATE</div>
                      <div className="pay-col pay-col-amt">AMOUNT</div>
                      <div className="pay-col pay-col-act">ACTION</div>
                    </div>

                    <div className="pay-table-row">
                      <div className="pay-col pay-col-id font-bold">INV-98240-X1</div>
                      <div className="pay-col pay-col-status"><span className="pay-status-paid"><div className="pay-dot"></div> Paid</span></div>
                      <div className="pay-col pay-col-date">Sep 12,<br/>2023</div>
                      <div className="pay-col pay-col-amt font-bold">$2,450.00</div>
                      <div className="pay-col pay-col-act"><button className="pay-btn-dl"><Download size={18}/></button></div>
                    </div>

                    <div className="pay-table-row">
                      <div className="pay-col pay-col-id font-bold">INV-98239-X1</div>
                      <div className="pay-col pay-col-status"><span className="pay-status-paid"><div className="pay-dot"></div> Paid</span></div>
                      <div className="pay-col pay-col-date">Aug 12,<br/>2023</div>
                      <div className="pay-col pay-col-amt font-bold">$4,120.00</div>
                      <div className="pay-col pay-col-act"><button className="pay-btn-dl"><Download size={18}/></button></div>
                    </div>

                    <div className="pay-table-row">
                      <div className="pay-col pay-col-id font-bold">INV-98238-X1</div>
                      <div className="pay-col pay-col-status"><span className="pay-status-paid"><div className="pay-dot"></div> Paid</span></div>
                      <div className="pay-col pay-col-date">Jul 12,<br/>2023</div>
                      <div className="pay-col pay-col-amt font-bold">$2,450.00</div>
                      <div className="pay-col pay-col-act"><button className="pay-btn-dl"><Download size={18}/></button></div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Floating Action Bar */}
              <div className="pay-floating-bar-container">
                <div className="pay-floating-bar">
                  <div className="pay-float-left">
                    <div className="pay-float-icon-btn dark"><HelpCircle size={16}/></div> 
                    <div className="pay-float-icon-btn"><FileText size={16}/></div>
                  </div>
                  <div className="pay-float-search">
                    <Search size={16} color="#94a3b8"/>
                    <input type="text" placeholder="Jump to invoice..." />
                  </div>
                  <button className="pay-float-btn-primary"><Zap size={16}/> Update Plan</button>
                </div>
              </div>

            </div>
          )}

          {activeTab === 'overview' && (
            <>
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
            </>
          )}

          {activeTab === 'projects' && (
            <div className="ap-container">
              {/* Top Banner section */}
              <div className="ap-header">
                <div>
                  <h1 className="ap-title">Active Projects</h1>
                  <p className="ap-subtitle">Precision tracking for ongoing technical architectural cycles and deployment phases.</p>
                </div>
                <div className="ap-actions">
                  <button className="ap-btn-filter"><Filter size={16}/> Filter</button>
                  <button className="ap-btn-new"><Plus size={16}/> New Project</button>
                </div>
              </div>

              {/* Grid Section */}
              <div className="ap-grid">
                
                {/* Card 1: Quantum Core Framework */}
                <div className="ap-card">
                  <div className="ap-card-top">
                    <span className="ap-badge in-progress">PHASE: IN PROGRESS</span>
                    <MoreVertical className="ap-icon-more" size={20}/>
                  </div>
                  <h2 className="ap-proj-title">Quantum Core Framework</h2>
                  
                  <div className="ap-progress-section">
                    <div className="ap-progress-labels">
                      <span className="ap-prog-label">Development Progress</span>
                      <span className="ap-prog-perc blue">68%</span>
                    </div>
                    <div className="ap-progress-bar"><div className="ap-progress-fill" style={{width: '68%'}}></div></div>
                  </div>

                  <div className="ap-proj-footer">
                    <div className="ap-lead-info">
                      <div className="ap-lead-avatar bg-dark"><User size={20} color="#fff"/></div>
                      <div>
                        <p className="ap-metric-lbl">LEAD DEVELOPER</p>
                        <p className="ap-lead-name">Marcus<br/>Thorne</p>
                      </div>
                      <div className="ap-mail-icon"><MessageSquare size={16} color="#64748b"/></div>
                    </div>
                    
                    <div className="ap-recent-activity">
                      <h4 className="ap-metric-lbl mb-small">RECENT ACTIVITY</h4>
                      <ul className="ap-activity-list">
                        <li>
                          <div className="ap-activity-dot blue"></div>
                          <div>
                            <span className="lbl-bold">API Endpoint Refactoring</span>
                            <span className="lbl-date">2 hours ago • Marcus T.</span>
                          </div>
                        </li>
                        <li>
                          <div className="ap-activity-dot gray"></div>
                          <div>
                            <span className="lbl-bold">Database Schema Update</span>
                            <span className="lbl-date">Yesterday • Sarah L.</span>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Card 2: Helix Mobile Interface */}
                <div className="ap-card">
                  <div className="ap-card-top">
                    <span className="ap-badge in-review">PHASE: IN REVIEW</span>
                  </div>
                  <h2 className="ap-proj-title" style={{marginBottom: '1.5rem'}}>Helix Mobile Interface</h2>
                  
                  <div className="ap-progress-section">
                    <div className="ap-progress-labels">
                      <span className="ap-prog-label">Review Status</span>
                      <span className="ap-prog-perc red">92%</span>
                    </div>
                    <div className="ap-progress-bar"><div className="ap-progress-fill red" style={{width: '92%'}}></div></div>
                  </div>

                  <div className="ap-team-stack">
                    <div className="ap-mini-avatar-stack z-3"><User size={14} color="#fff"/></div>
                    <div className="ap-mini-avatar-stack z-2"><User size={14} color="#fff"/></div>
                    <div className="ap-mini-avatar-more">+3</div>
                  </div>

                  <div className="ap-critical-logs">
                    <p className="ap-metric-lbl mb-small">CRITICAL LOGS</p>
                    <div className="ap-log-box">
                      Feedback: Navigation latency exceeds 200ms on mobile devices.
                    </div>
                  </div>
                  
                  <button className="ap-btn-outline-full">View Details</button>
                </div>

                {/* Card 3: Cipher Encryption Module */}
                <div className="ap-card">
                  <div className="ap-card-top">
                    <span className="ap-badge testing">PHASE: TESTING</span>
                  </div>
                  <h2 className="ap-proj-title">Cipher Encryption Module</h2>
                  
                  <div className="ap-log-summary">
                    <div className="ap-log-box-stat pending">
                      <span className="ap-log-num">12</span>
                      <span className="ap-log-txt">PENDING</span>
                    </div>
                    <div className="ap-log-box-stat failed">
                      <span className="ap-log-num">2</span>
                      <span className="ap-log-txt">FAILED</span>
                    </div>
                  </div>

                  <div className="ap-lead-info mt-auto">
                    <div className="ap-lead-avatar bg-slate"><User size={20} color="#fff"/></div>
                    <div>
                      <p className="ap-lead-name mb-0">Elara Vance</p>
                      <p className="ap-metric-lbl" style={{textTransform:'none'}}>QA Specialist</p>
                    </div>
                  </div>
                </div>

                {/* Card 4: Nexus Data Lakehouse */}
                <div className="ap-card ap-card-wide">
                  <div className="ap-card-top" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <span className="ap-badge in-progress">PHASE: IN PROGRESS</span>
                    <span className="ap-live-indicator"><div className="ap-live-dot"></div> Live Syncing</span>
                  </div>
                  <h2 className="ap-proj-title">Nexus Data Lakehouse</h2>
                  
                  <div className="ap-nexus-layout">
                    <div className="ap-nexus-left">
                      <div className="ap-progress-section">
                        <div className="ap-progress-labels">
                          <span className="ap-prog-label">Deployment Progress</span>
                          <span className="ap-prog-perc blue">15%</span>
                        </div>
                        <div className="ap-progress-bar"><div className="ap-progress-fill" style={{width: '15%'}}></div></div>
                      </div>

                      <div className="ap-lead-info" style={{marginTop: '2rem'}}>
                        <div className="ap-lead-avatar bg-dark"><User size={20} color="#fff"/></div>
                        <div>
                          <p className="ap-metric-lbl">LEAD DEVELOPER</p>
                          <p className="ap-lead-name">Simon Keller</p>
                        </div>
                        <div className="ap-mail-icon"><MessageSquare size={16} color="#64748b"/></div>
                      </div>
                    </div>
                    
                    <div className="ap-nexus-right">
                      <div className="ap-chart-box">
                        <div className="ap-chart-header">
                          <span className="ap-metric-lbl">PIPELINE VISUAL</span>
                          <LayoutDashboard size={14} color="#2f6be8"/>
                        </div>
                        <div className="ap-chart-bars">
                          <div className="ap-bar" style={{height:'30%'}}></div>
                          <div className="ap-bar" style={{height:'50%'}}></div>
                          <div className="ap-bar" style={{height:'40%'}}></div>
                          <div className="ap-bar" style={{height:'80%'}}></div>
                          <div className="ap-bar" style={{height:'20%'}}></div>
                          <div className="ap-bar" style={{height:'60%'}}></div>
                          <div className="ap-bar" style={{height:'70%'}}></div>
                        </div>
                        <p className="ap-chart-caption">Traffic spikes observed in Node Cluster 4</p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Floating Quick Actions Bar */}
              <div className="ap-quick-actions">
                <div className="ap-quick-left">
                  <div className="ap-cmd-icon">{'>_'}</div>
                  <span className="ap-cmd-text">Press <kbd>⌘</kbd> + <kbd>K</kbd> to Search your projects......</span>
                </div>
                <div className="ap-quick-right">
                  <button className="ap-qw-btn"><Zap size={16}/></button>
                  <button className="ap-qw-btn"><History size={16}/></button>
                  <button className="ap-qw-btn primary"><Send size={16}/></button>
                </div>
              </div>
            </div>
          )}
        </div>
        )}

      </div>
    </div>
  );
}
