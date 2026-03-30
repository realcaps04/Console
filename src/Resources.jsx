import React, { useState } from 'react';
import { 
  Search,
  FileText,
  Image as ImageIcon,
  Calculator,
  Puzzle,
  ArrowRight,
  BookOpen,
  LifeBuoy,
  History,
  X,
  Unlock, FileArchive, FileImage, Layers,
  Scissors, ImageOff, Replace, Copy,
  BadgeDollarSign, Binary, Ruler, Radical
} from 'lucide-react';
import './Resources.css';

export default function Resources({ setActivePage }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModal, setActiveModal] = useState(null);

  const tools = [
    {
      id: 1,
      title: "PDF Management",
      icon: <FileText size={20} color="#2f6be8" />,
      desc: "Advanced cryptographic encryption and lossless merging protocols for professional document handling.",
      iconBg: "#eff6ff",
      subTools: [
        { name: "PDF Unlock", icon: <Unlock size={16} /> },
        { name: "PDF Compressor", icon: <FileArchive size={16} /> },
        { name: "PDF to Image", icon: <FileImage size={16} /> },
        { name: "Merge PDFs", icon: <Layers size={16} /> }
      ]
    },
    {
      id: 2,
      title: "Image Suite",
      icon: <ImageIcon size={20} color="#2f6be8" />,
      desc: "Batch processing engine with neural web-optimization and intelligent focal cropping capabilities.",
      iconBg: "#eff6ff",
      subTools: [
        { name: "Image Compressor", icon: <FileArchive size={16} /> },
        { name: "Background Remover", icon: <ImageOff size={16} /> },
        { name: "Format Converter", icon: <Replace size={16} /> },
        { name: "Resize Editor", icon: <Scissors size={16} /> }
      ]
    },
    {
      id: 3,
      title: "Calculators",
      icon: <Calculator size={20} color="#2f6be8" />,
      desc: "High-precision engineering units and complex financial modeling modules for technical accuracy.",
      iconBg: "#eff6ff",
      subTools: [
        { name: "Financial Modeler", icon: <BadgeDollarSign size={16} /> },
        { name: "Scientific Calculator", icon: <Radical size={16} /> },
        { name: "Unit Converter", icon: <Ruler size={16} /> },
        { name: "Hex Converter", icon: <Binary size={16} /> }
      ]
    }
  ];

  const filteredTools = tools.filter(tool => 
    tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="resources-page">
      <div className="resources-header">
        <h1 className="resources-title">Precision Tools</h1>
        <p className="resources-desc">
          Elevate your digital workflow with our curated suite of high-performance utilities, engineered for the modern technical architect.
        </p>

        <div className="resources-search-wrapper">
          <Search size={18} color="#9ca3af" className="resources-search-icon" />
          <input 
            type="text" 
            placeholder="Search for precision tools..." 
            className="resources-search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="resources-grid-top">
        {filteredTools.map((tool) => (
          <div key={tool.id} className="resource-card">
            <div className="resource-icon-box" style={{ backgroundColor: tool.iconBg }}>
              {tool.icon}
            </div>
            
            <h3 className="resource-card-title">{tool.title}</h3>
            <p className="resource-card-desc">{tool.desc}</p>
            
            <button className="btn-secondary resource-card-btn" onClick={() => setActiveModal(tool)}>
              Launch Tool
            </button>
          </div>
        ))}
      </div>

      <div className="resources-grid-bottom">
        
        {/* Left Span Card - More Tools */}
        <div className="resource-beta-card">
          
          {/* Floating Action Pill */}
          <div className="floating-action-pill">
            <button onClick={() => setActivePage('notfound')}><BookOpen size={14} /> API Docs</button>
            <div className="divider"></div>
            <button onClick={() => setActivePage('notfound')}><LifeBuoy size={14} /> Help Center</button>
            <div className="divider"></div>
            <button onClick={() => setActivePage('notfound')}><History size={14} /> Changelog</button>
          </div>

          <div className="beta-card-content">
            <span className="beta-tag">BETA ACCESS</span>
            <h2 className="beta-title">More Tools & Custom Nodes</h2>
            <p className="beta-desc">
              Explore our experimental repository of automation nodes. From custom JSON parsers to serverless edge functions, our community-driven tools extend the Console ecosystem.
            </p>
            <button className="beta-link-btn" onClick={() => setActivePage('notfound')}>
              Browse Beta Repository <ArrowRight size={16} style={{ marginLeft: '0.4rem' }} />
            </button>
          </div>
          
          <div className="beta-card-visual">
            <Puzzle size={48} color="#cbd5e1" />
          </div>
        </div>

        {/* Right Span Card - Architecting the Future */}
        <div className="resource-promo-card">
          <div className="promo-overlay-pattern"></div>
          <div className="promo-content">
            <h2 className="promo-title">Architecting the Future</h2>
            <p className="promo-desc">
              Discover the methodology behind our precision-first engineering approach.
            </p>
            <button className="btn-white promo-btn" onClick={() => setActivePage('notfound')}>
              Read the Manifesto
            </button>
          </div>
        </div>

      </div>

      {activeModal && (
        <div className="res-modal-overlay" onClick={() => setActiveModal(null)}>
          <div className="res-modal" onClick={e => e.stopPropagation()}>
            <div className="res-modal-header">
              <div className="res-modal-title-box">
                <div className="res-modal-icon" style={{ backgroundColor: activeModal.iconBg }}>
                  {activeModal.icon}
                </div>
                <h2>{activeModal.title}</h2>
              </div>
              <button className="res-modal-close" onClick={() => setActiveModal(null)}>
                <X size={20} />
              </button>
            </div>
            
            <p className="res-modal-desc">Select a specific utility from the {activeModal.title} suite to initiate its workspace interface.</p>
            
            <div className="res-modal-grid">
              {activeModal.subTools.map((sub, idx) => (
                <div key={idx} className="res-subtool-card">
                  <div className="res-subtool-icon">{sub.icon}</div>
                  <span className="res-subtool-name">{sub.name}</span>
                  <button className="res-subtool-btn" onClick={() => setActivePage('notfound')}>Open</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
