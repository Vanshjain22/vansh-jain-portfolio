import { Atom, Braces, Leaf, Code2 } from "lucide-react";

export function HeroVisual() {
  return (
    <div className="hero-product-stage" aria-hidden="true">
      <div className="product-glow product-glow-emerald" />
      <div className="product-glow product-glow-cyan" />
      <div className="digital-wave" />
      <div className="tech-badge badge-react"><Atom size={27} /></div>
      <div className="tech-badge badge-node"><span>node</span></div>
      <div className="tech-badge badge-mongo"><Leaf size={24} /></div>
      <div className="tech-badge badge-typescript"><Braces size={23} /><span>TS</span></div>
      <div className="tech-badge badge-code"><Code2 size={22} /></div>
      <div className="tech-badge badge-braces"><span>{"{}"}</span></div>
      <div className="laptop-halo" />
      <div className="hero-laptop">
        <div className="laptop-energy-particles">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className={`laptop-particle particle-${i}`} />
          ))}
        </div>
        <div className="laptop-screen-shell">
          <div className="laptop-camera" />
          <div className="laptop-screen">
            <div className="dashboard-aurora">
              <div className="dash-aurora-1" />
              <div className="dash-aurora-2" />
              <div className="dash-aurora-3" />
              <div className="dash-aurora-4" />
            </div>
            <div className="laptop-screen__scanline" />
            <div className="mock-topbar"><span className="mock-brand">◉ Career AI</span><span className="mock-status">OVERVIEW</span><span className="mock-avatar" /></div>
            <div className="mock-content">
              <div className="mock-intro">
                <span className="mock-kicker">● CAREER AI</span>
                <h3>Career AI</h3>
                <p>AI-Powered Career Platform<br />for Smarter Decisions</p>
                <span className="mock-description">Your personal career companion for growth and opportunity.</span>
                <span className="mock-button">Get Started</span>
              </div>
              <div className="mock-dashboard">
                <div className="score-card"><span>Resume Score</span><strong>86</strong><i>Strong Match</i></div>
                <div className="skills-card"><span>Top Skills</span>{["JavaScript", "React", "Node.js", "MongoDB", "TypeScript"].map((skill) => <div key={skill}><small>{skill}</small><b /></div>)}</div>
              </div>
              <div className="mock-feature-grid">
                <div><em>✦</em><span>AI Interview</span><small>Practice now</small></div>
                <div><em>↗</em><span>Job Match</span><small>7 new roles</small></div>
                <div><em>◇</em><span>Skill Gap</span><small>4 insights</small></div>
              </div>
            </div>
          </div>
        </div>
        <div className="laptop-base"><span /></div>
      </div>
    </div>
  );
}
