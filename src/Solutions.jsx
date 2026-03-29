import React from 'react';
import { 
  ArrowRight,
  Database,
  FoldHorizontal,
  GraduationCap,
  Terminal,
  LineChart,
  LayoutTemplate,
  Wrench,
  ShieldCheck 
} from 'lucide-react';
import './Solutions.css';

const solutionsData = [
  {
    id: 1,
    categoryLabel: "LIFECYCLE MANAGEMENT",
    title: "Project development",
    description: "A centralized workspace for engineering teams to coordinate sprints, manage architectural debt, and deploy high-fidelity code with surgical precision.",
    icon: FoldHorizontal,
    imageStyle: { background: "linear-gradient(135deg, #101827, #1f2937)" }
  },
  {
    id: 2,
    categoryLabel: "INTELLIGENT PIPELINES",
    title: "Data Flow management",
    description: "Streamline complex ETL processes and real-time streaming architectures. Ensure every byte is validated, transformed, and delivered to its final destination securely.",
    icon: Database,
    imageStyle: { background: "linear-gradient(135deg, #0f172a, #1e293b)" }
  },
  {
    id: 3,
    categoryLabel: "COGNITIVE ASSETS",
    title: "Language Learning",
    description: "Leverage proprietary NLP models to facilitate cross-border collaboration and localized technical documentation. Bridge the gap between human talent and machine execution.",
    icon: GraduationCap,
    imageStyle: { background: "linear-gradient(135deg, #18181b, #27272a)" }
  },
  {
    id: 4,
    categoryLabel: "DEVELOPER UTILITIES",
    title: "Software Tools",
    description: "A curated suite of productivity boosters for the modern engineer. From automated testing scripts to sophisticated debugging consoles, we provide the instruments for excellence.",
    icon: Terminal,
    imageStyle: { background: "linear-gradient(135deg, #171717, #262626)" }
  },
  {
    id: 5,
    categoryLabel: "ANALYTICS & INSIGHTS",
    title: "Report Management",
    description: "Transform raw system telemetry into editorial-grade reports. Automated scheduling and stakeholder distribution ensure clarity at every organizational tier.",
    icon: LineChart,
    imageStyle: { background: "linear-gradient(135deg, #111827, #1f2937)" }
  },
  {
    id: 6,
    categoryLabel: "ENTERPRISE LOGISTICS",
    title: "Software Solutions",
    description: "Custom-built architectural frameworks that solve specific business challenges. We don't just provide code, we provide permanent solutions to transient problems.",
    icon: LayoutTemplate,
    imageStyle: { background: "linear-gradient(135deg, #0f172a, #1e293b)" }
  },
  {
    id: 7,
    categoryLabel: "HEALTH & UPTIME",
    title: "System Maintenance",
    description: "Predictive diagnostics and automated patching to keep your infrastructure resilient. Our atelier approach ensures zero-downtime deployments for critical workloads.",
    icon: Wrench,
    imageStyle: { background: "linear-gradient(135deg, #101827, #1f2937)" }
  },
  {
    id: 8,
    categoryLabel: "VELOCITY OPTIMIZATION",
    title: "Performance Boosting",
    description: "Fine-tune your application's vital signs. From query optimization to edge delivery acceleration, we maximize throughput and minimize latency at every layer.",
    icon: ShieldCheck,
    imageStyle: { background: "linear-gradient(135deg, #18181b, #27272a)" }
  }
];

export default function Solutions({ setActivePage }) {
  return (
    <div className="solutions-page">
      <section className="solutions-hero">
        <h1 className="solutions-hero-title">
          Our <span style={{ color: '#2f6be8' }}>Solutions</span> Ecosystem
        </h1>
        <p className="solutions-hero-desc">
          Precision-engineered tools designed for modern technical stations. Orchestrate data flows, accelerate development cycles, and maintain system integrity with an editorial level of care.
        </p>
      </section>

      <section className="solutions-list">
        {solutionsData.map((item, index) => {
          const isImageLeft = index % 2 === 0;
          return (
            <div key={item.id} className={`solution-block ${isImageLeft ? '' : 'reverse'}`}>
              <div className="solution-image-container" style={item.imageStyle}>
                <div className="solution-image-overlay">
                  {React.createElement(item.icon, { size: 100, color: "rgba(255,255,255,0.06)" })}
                  <div className="solution-image-glow"></div>
                </div>
              </div>

              <div className="solution-content">
                <div className="solution-category">{item.categoryLabel}</div>
                <h2 className="solution-title">{item.title}</h2>
                <p className="solution-description">{item.description}</p>
                <button className="btn-primary solution-btn" onClick={() => setActivePage('notfound')}>
                  Explore Module <ArrowRight size={16} style={{ marginLeft: '0.4rem' }} />
                </button>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}
