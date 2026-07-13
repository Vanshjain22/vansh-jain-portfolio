"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

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

// Animation configurations (as const to prevent TS type widening)
const containerVariants = {
  hidden: {
    opacity: 0,
    scale: 0.92,
    rotateY: -6,
    rotateX: 3,
    filter: "blur(6px)",
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotateY: 0,
    rotateX: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.08,
      delayChildren: 0.2, // starts after panel container is loaded
    }
  }
} as const;

const childVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
} as const;

const sidebarVariants = {
  hidden: { opacity: 0, scaleY: 0 },
  visible: { opacity: 1, scaleY: 1, transition: { duration: 0.6, ease: "easeOut" } }
} as const;

const statCardVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 18 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0, 
    transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] } 
  }
} as const;

export function CareerAIVisual() {
  const reducedMotion = useReducedMotion();
  const animContainer = reducedMotion ? {} : containerVariants;

  return (
    <motion.div 
      className="career-visual" 
      aria-hidden="true"
      style={{ perspective: 1200, transformStyle: "preserve-3d" }}
      variants={animContainer}
      initial="hidden"
      animate="visible"
    >
      <div className="career-visual__sheet sheet-3" />
      <div className="career-visual__sheet sheet-2" />
      
      <div className="career-visual__panel" style={{ transformStyle: "preserve-3d" }}>
        {/* Logo / Header */}
        <motion.header className="career-topbar" variants={reducedMotion ? {} : childVariants}>
          <div className="brand">◉ Career AI</div>
          <div className="top-right">
            <span className="status-dot" />
            <span className="overview">Overview</span>
          </div>
        </motion.header>

        <div className="career-inner" style={{ transformStyle: "preserve-3d" }}>
          {/* Sidebar */}
          <nav className="career-sidebar">
            {Array.from({ length: 5 }).map((_, i) => (
              <motion.div 
                key={i} 
                className={`nav-icon ${i === 0 ? "is-active" : ""}`}
                variants={reducedMotion ? {} : sidebarVariants}
                style={{ transformOrigin: "top center" }}
              />
            ))}
          </nav>

          <main className="career-main" style={{ transformStyle: "preserve-3d" }}>
            <div className="top-row">
              {/* Resume Score */}
              <motion.div className="panel resume-score" variants={reducedMotion ? {} : childVariants}>
                <div className="panel-label">Resume Score</div>
                <motion.div 
                  className="score-ring"
                  variants={{
                    hidden: { scale: 0.7, opacity: 0, rotate: -30 },
                    visible: { scale: 1, opacity: 1, rotate: 0, transition: { duration: 0.6, ease: "easeOut", delay: 0.4 } }
                  } as const}
                >
                  <motion.div 
                    className="score-value"
                    variants={{
                      hidden: { opacity: 0, filter: "blur(4px)", scale: 0.8 },
                      visible: { opacity: 1, filter: "blur(0px)", scale: 1, transition: { duration: 0.4, delay: 0.6 } }
                    } as const}
                  >
                    86
                  </motion.div>
                </motion.div>
                <div className="score-sub">Strong Match</div>
              </motion.div>

              {/* Top Skills */}
              <motion.div className="panel top-skills" variants={reducedMotion ? {} : childVariants}>
                <div className="panel-label">Top Skills</div>
                <div className="skills-list">
                  {skills.map((s, idx) => (
                    <motion.div 
                      key={s.name} 
                      className="skill-row"
                      variants={{
                        hidden: { opacity: 0, x: 8 },
                        visible: { opacity: 1, x: 0, transition: { duration: 0.4, delay: 0.5 + idx * 0.07 } }
                      } as const}
                    >
                      <div className="skill-name">{s.name}</div>
                      <div className="skill-bar">
                        <motion.div 
                          style={{ width: `${s.value}%` }} 
                          className="skill-fill" 
                          variants={{
                            hidden: { width: "0%" },
                            visible: { width: `${s.value}%`, transition: { duration: 0.8, ease: "easeOut", delay: 0.7 } }
                          } as const}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Bottom feature cards */}
            <div className="bottom-row">
              {features.map((f, idx) => (
                <motion.div 
                  key={f.title} 
                  className="feature-card"
                  variants={reducedMotion ? {} : statCardVariants}
                  style={{ position: "relative" }}
                >
                  {/* Subtle temporary green flash behind each card */}
                  {!reducedMotion && (
                    <motion.div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: "rgba(52, 211, 153, 0.06)",
                        borderRadius: "8px",
                        boxShadow: "0 0 15px rgba(52, 211, 153, 0.15)",
                        pointerEvents: "none",
                        zIndex: -1,
                      }}
                      variants={{
                        hidden: { opacity: 0 },
                        visible: {
                          opacity: [0, 0.9, 0],
                          transition: { duration: 0.7, delay: 0.65 + idx * 0.1 }
                        }}
                      }
                    />
                  )}
                  <div className="feature-title">{f.title}</div>
                  <div className="feature-meta">{f.meta}</div>
                </motion.div>
              ))}
            </div>
          </main>
        </div>
      </div>
      <div className="career-glow" />
    </motion.div>
  );
}
