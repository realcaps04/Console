import React from 'react';
import { Search, Filter, MapPin, Clock, Banknote, ArrowUpRight, CloudUpload } from 'lucide-react';
import './Jobs.css';

export default function Jobs({ setActivePage }) {
  return (
    <div className="jobs-page">

      {/* Hero Section */}
      <section className="jobs-hero">
        <div className="jh-content">
          <div className="jh-subtitle">PRECISION IN ENGINEERING</div>
          <h1 className="jh-title">
            Join the <span className="jh-title-accent">Console</span>.
          </h1>
          <p className="jh-desc">
            We build high-fidelity digital environments. Join a collective of architects, engineers, and designers dedicated to the art of the console.
          </p>
          <div className="jh-actions">
            <button className="jh-btn-primary" onClick={() => setActivePage('openpositions')}>View Open Roles</button>
            <button className="jh-btn-secondary" onClick={() => setActivePage('notfound')}>Our Process</button>
          </div>
        </div>

        <div className="jh-visual">
          <div className="jh-image-mask">
            <div className="mock-desk-scene"></div>
          </div>
          <div className="jh-float-card">
            <div className="float-top">
              <div className="float-icon">A</div>
              <div className="float-info">
                <h4>Precision Design</h4>
                <p>Architecture over Templates</p>
              </div>
            </div>
            <p className="float-quote">"We treat every line of code like a structural beam in a skyscraper."</p>
          </div>
        </div>
      </section>

      {/* Destinations / Listings */}
      <section className="jobs-destinations">
        <div className="dest-container">

          <div className="dest-header">
            <div className="dest-title">
              <h2>Open Destinations</h2>
              <p>Find your next challenge in our specialized practices.</p>
            </div>
            <div className="dest-controls">
              <div className="dest-searchbar">
                <Search size={18} color="#94a3b8" />
                <input type="text" placeholder="Quick find a role..." />
                <button className="dest-filter-btn"><Filter size={14} /></button>
                <button className="dest-search-submit">Search</button>
              </div>
              <div className="dest-tabs">
                <button className="dest-tab active">All</button>
                <button className="dest-tab">Engineering</button>
                <button className="dest-tab">Design</button>
                <button className="dest-tab">Operations</button>
              </div>
            </div>
          </div>

          <div className="job-grid">

            {/* Card 1 */}
            <div className="job-card">
              <ArrowUpRight size={20} className="jc-arrow" />
              <div className="jc-badge">HIGH PRIORITY</div>
              <h3 className="jc-title">Senior Product Designer</h3>
              <p className="jc-desc">
                Lead the creative vision for our core infrastructure platform. You will translate complex cloud systems into elegant, architectural interfaces.
              </p>
              <div className="jc-meta">
                <div className="jc-meta-item"><MapPin size={14} /> Remote / London</div>
                <div className="jc-meta-item"><Clock size={14} /> Full-time</div>
                <div className="jc-meta-item"><Banknote size={14} /> £90k - £120k</div>
              </div>
              <button className="jc-btn-blue">Apply Now</button>
            </div>

            {/* Card 2 */}
            <div className="job-card">
              <h3 className="jc-title">Full-Stack Engineer</h3>
              <p className="jc-desc">
                Architecting scalable microservices using Rust, Go, and React. Passion for performance is a must.
              </p>

              <div className="jc-progress-container">
                <div className="jc-prog-labels">
                  <span>ENGINEERING</span>
                  <span>MID-LEVEL</span>
                </div>
                <div className="jc-prog-bar">
                  <div className="jc-prog-fill" style={{ width: '70%', background: '#818cf8' }}></div>
                </div>
              </div>

              <button className="jc-btn-gray" onClick={() => setActivePage('notfound')}>Details</button>
            </div>

            {/* Card 3 */}
            <div className="job-card">
              <h3 className="jc-title">Project Manager</h3>
              <p className="jc-desc">
                Orchestrating the intersection of design, engineering, and client success in our agile workspace.
              </p>

              <div className="jc-progress-container">
                <div className="jc-prog-labels">
                  <span>OPERATIONS</span>
                  <span>SENIOR</span>
                </div>
                <div className="jc-prog-bar">
                  <div className="jc-prog-fill" style={{ width: '90%', background: '#fb7185' }}></div>
                </div>
              </div>

              <button className="jc-btn-gray" onClick={() => setActivePage('notfound')}>Details</button>
            </div>

            {/* Card 4 */}
            <div className="job-card" style={{ flexDirection: 'row', alignItems: 'center' }}>
              <div className="jc-image-block"></div>
              <div className="jc-content" style={{ flex: 1 }}>
                <h3 className="jc-title" style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Technical Lead (Core Systems)</h3>
                <p className="jc-desc" style={{ fontSize: '0.85rem', marginBottom: '1rem' }}>
                  Driving the technical roadmap for high-frequency trading infrastructure. Requires deep knowledge of distributed systems.
                </p>
                <div className="jc-flex-row">
                  <button className="jc-btn-blue" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}>Apply</button>
                  <a href="#" className="jc-link" onClick={e => { e.preventDefault(); setActivePage('notfound') }}>Read Job Description <ArrowUpRight size={14} style={{ marginLeft: '0.25rem' }} /></a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="jobs-application">
        <h2 className="app-title">The Application</h2>
        <p className="app-desc">Simple, direct, and focused. Just like our work.</p>

        <div className="app-form">
          <div className="form-row">
            <div className="form-group">
              <label>FULL NAME</label>
              <input type="text" placeholder="Jonathan Doe" />
            </div>
            <div className="form-group">
              <label>EMAIL ADDRESS</label>
              <input type="email" placeholder="j.doe@architecture.com" />
            </div>
          </div>

          <div className="form-group">
            <label>PORTFOLIO / PERSONAL LINK</label>
            <input type="url" placeholder="https://behance.net/jdoe" />
          </div>

          <div className="form-group">
            <label>ROLE OF INTEREST</label>
            <select>
              <option>Senior Product Designer</option>
              <option>Full-Stack Engineer</option>
              <option>Project Manager</option>
              <option>Technical Lead (Core Systems)</option>
            </select>
          </div>

          <div className="form-group">
            <label>CV / RESUME UPLOAD</label>
            <div className="upload-box">
              <CloudUpload size={28} className="upload-icon" />
              <h4 className="upload-title">Drop your file here or click to browse</h4>
              <p className="upload-sub">PDF, DOCX up to 10MB</p>
            </div>
          </div>

          <button className="app-submit-btn">Submit Application</button>

          <div className="app-legal">
            By submitting, you agree to our <a href="#" onClick={e => { e.preventDefault(); setActivePage('notfound') }}>Privacy Policy</a> and data processing terms.
          </div>
        </div>
      </section>

    </div>
  );
}
