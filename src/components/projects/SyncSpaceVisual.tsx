"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

const todo = [
  "Design landing page",
  "Create auth flow",
  "API integration",
];

const inProgress = ["Dashboard UI", "Real-time updates"];
const done = ["Project setup", "Database schema"];

// Task Card with temporary highlight flash
function TaskCard({ title, color, delay }: { title: string; color?: string; delay: number }) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div 
      className="task-card"
      variants={{
        hidden: { opacity: 0, scale: 0.82, y: 14 },
        visible: {
          opacity: 1,
          scale: 1,
          y: 0,
          transition: {
            type: "spring",
            stiffness: 240,
            damping: 20,
            delay: delay
          }
        }
      } as const}
      style={{ position: "relative" }}
    >
      {/* Accent flash overlay */}
      {!reducedMotion && (
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "6px",
            border: "1.5px solid var(--primary)",
            pointerEvents: "none",
            zIndex: 5,
          }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: [0, 0.95, 0],
              transition: { duration: 0.6, delay: delay + 0.1 }
            }
          } as const}
        />
      )}
      <div className={`pill ${color || "cyan"}`} />
      <div className="task-title">{title}</div>
      <div className="task-avatars">
        <span className="av" />
        <span className="av" />
      </div>
    </motion.div>
  );
}

const containerVariants = {
  hidden: {
    opacity: 0,
    scale: 0.94,
    rotateY: 5,
    filter: "blur(5px)",
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotateY: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.08,
      delayChildren: 0.25,
    }
  }
} as const;

const headerVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
} as const;

const sideItemVariants = {
  hidden: { opacity: 0, x: -8 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease: "easeOut" } }
} as const;

const columnTitleVariants = {
  hidden: { opacity: 0, y: -8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
} as const;

export function SyncSpaceVisual() {
  const reducedMotion = useReducedMotion();
  const animContainer = reducedMotion ? {} : containerVariants;

  return (
    <motion.div 
      className="sync-visual" 
      aria-hidden="true"
      style={{ perspective: 1200, transformStyle: "preserve-3d" }}
      variants={animContainer}
      initial="hidden"
      animate="visible"
    >
      <div className="sync-visual__sheet sheet-3" />
      <div className="sync-visual__sheet sheet-2" />
      
      <div className="sync-visual__panel" style={{ transformStyle: "preserve-3d" }}>
        {/* Header */}
        <motion.header className="sync-topbar" variants={reducedMotion ? {} : headerVariants}>
          <div className="sync-brand">SyncSpace</div>
          <div className="sync-meta">Website Redesign · Sprint Board</div>
          <div className="sync-actions">
            <div className="icon" />
            <div className="icon" />
            <div className="avatar" style={{ position: "relative" }}>
              {/* Online status indicator */}
              <motion.span 
                style={{
                  position: "absolute",
                  bottom: -2,
                  right: -2,
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "#10b981",
                  border: "1.5px solid #071012",
                  zIndex: 2,
                }}
                variants={{
                  hidden: { scale: 0 },
                  visible: { scale: 1, transition: { delay: 1.1, type: "spring", stiffness: 300, damping: 15 } }
                } as const}
              />
              {/* One-time soft pulse ring */}
              {!reducedMotion && (
                <motion.span
                  style={{
                    position: "absolute",
                    bottom: -2,
                    right: -2,
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    border: "1.5px solid #10b981",
                    zIndex: 1,
                  }}
                  variants={{
                    hidden: { scale: 1, opacity: 0 },
                    visible: {
                      scale: [1, 3.5, 3.5, 1],
                      opacity: [0, 0.6, 0, 0],
                      transition: { duration: 3.6, repeat: Infinity, ease: "easeOut" }
                    }
                  } as const}
                />
              )}
            </div>
          </div>
        </motion.header>

        <div className="sync-inner" style={{ transformStyle: "preserve-3d" }}>
          {/* Sidebar */}
          <aside className="sync-sidebar">
            {["Overview", "My Tasks", "Board", "Projects", "Create Task"].map((item, idx) => (
              <motion.div 
                key={item}
                className={`side-item ${item === "Board" ? "is-active" : ""}`}
                variants={reducedMotion ? {} : sideItemVariants}
                transition={{ delay: idx * 0.055 }}
              >
                {item}
              </motion.div>
            ))}
          </aside>

          {/* Kanban Board columns */}
          <section className="board-area" style={{ transformStyle: "preserve-3d" }}>
            <div className="board-columns" style={{ transformStyle: "preserve-3d" }}>
              
              {/* TO DO Column */}
              <div className="col">
                <motion.div className="col-title" variants={reducedMotion ? {} : columnTitleVariants}>TO DO</motion.div>
                {todo.map((t, idx) => (
                  <TaskCard key={t} title={t} color="purple" delay={0.4 + idx * 0.08} />
                ))}
              </div>

              {/* IN PROGRESS Column */}
              <div className="col">
                <motion.div className="col-title" variants={reducedMotion ? {} : columnTitleVariants}>IN PROGRESS</motion.div>
                {inProgress.map((t, idx) => (
                  <TaskCard key={t} title={t} color="cyan" delay={0.6 + idx * 0.08} />
                ))}
              </div>

              {/* DONE Column */}
              <div className="col">
                <motion.div className="col-title" variants={reducedMotion ? {} : columnTitleVariants}>DONE</motion.div>
                {done.map((t, idx) => (
                  <TaskCard key={t} title={t} color="emerald" delay={0.8 + idx * 0.08} />
                ))}
              </div>
              
            </div>
          </section>
        </div>
      </div>
      <div className="sync-glow" />
    </motion.div>
  );
}
