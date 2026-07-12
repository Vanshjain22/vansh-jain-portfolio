"use client";

import React from "react";

const skills = [
  { name: "JavaScript", value: 88 },
  { name: "React", value: 81 },
  { name: "Node.js", value: 76 },
  { name: "MongoDB", value: 68 },
];

const features = [
  { title: "AI Interview", meta: "Practice now" },
  { title: "Job Match", meta: "7 new roles" },
  { title: "Skill Gap", meta: "4 insights" },
];

export function CareerAIVisual() {
  return (
    <div className="career-visual" aria-hidden="true">
      <div className="career-visual__sheet sheet-3" />
      <div className="career-visual__sheet sheet-2" />
      <div className="career-visual__panel">
        <header className="career-topbar">
          <div className="brand">Γùë Career AI</div>
          <div className="top-right">
            <span className="status-dot" />
            <span className="overview">Overview</span>
          </div>
        </header>

        <div className="career-inner">
          <nav className="career-sidebar">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className={`nav-icon ${i === 0 ? "is-active" : ""}`} />
            ))}
          </nav>

          <main className="career-main">
            <div className="top-row">
              <div className="panel resume-score">
                <div className="panel-label">Resume Score</div>
                <div className="score-ring">
                  <div className="score-value">86</div>
                </div>
                <div className="score-sub">Strong Match</div>
              </div>

              <div className="panel top-skills">
                <div className="panel-label">Top Skills</div>
                <div className="skills-list">
                  {skills.map((s) => (
                    <div key={s.name} className="skill-row">
                      <div className="skill-name">{s.name}</div>
                      <div className="skill-bar"><div style={{ width: `${s.value}%` }} className="skill-fill" /></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bottom-row">
              {features.map((f) => (
                <div key={f.title} className="feature-card">
                  <div className="feature-title">{f.title}</div>
                  <div className="feature-meta">{f.meta}</div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
      <div className="career-glow" />
    </div>
  );
}

