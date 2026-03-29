import React from 'react';
import { Home, Mail, ArrowLeft } from 'lucide-react';
import './NotFound.css';

export default function NotFound({ setActivePage, previousPage, setIsQueryModalOpen }) {
  return (
    <div className="notfound-container">
      <div className="notfound-content">
        <h1 className="notfound-error-code">404</h1>
        <h2 className="notfound-title">Module Not Found</h2>
        <p className="notfound-desc">
          The requested system feature or module has not been deployed yet. Please return to the Platform dashboard or reach out for priority access.
        </p>
        
        <div className="notfound-actions">
          <button className="btn-primary notfound-btn" onClick={() => setActivePage('home')}>
            <Home size={18} />
            Go to Home
          </button>
          
          <button className="btn-secondary notfound-btn secondary" onClick={() => setActivePage(previousPage || 'home')}>
            <ArrowLeft size={18} />
            Go Back
          </button>
          <button 
            className="btn-secondary notfound-btn secondary" 
            onClick={() => setIsQueryModalOpen(true)}
          >
            <Mail size={18} />
            Contact Administrator
          </button>
        </div>
      </div>
    </div>
  );
}
