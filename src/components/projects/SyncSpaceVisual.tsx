"use client";

import React from "react";

const todo = [
  "Design landing page",
  "Create auth flow",
  "API integration",
];

const inProgress = ["Dashboard UI", "Real-time updates"];
const done = ["Project setup", "Database schema"];

function TaskCard({ title, color }: { title: string; color?: string }) {
  return (
    <div className="task-card">
      <div className={`pill ${color || "cyan"}`} />
      <div className="task-title">{title}</div>
      <div className="task-avatars">
        <span className="av" />
        <span className="av" />
      </div>
    </div>
  );
}

export function SyncSpaceVisual() {
  return (
    <div className="sync-visual" aria-hidden="true">
      <div className="sync-visual__sheet sheet-3" />
      <div className="sync-visual__sheet sheet-2" />
      <div className="sync-visual__panel">
        <header className="sync-topbar">
          <div className="sync-brand">SyncSpace</div>
          <div className="sync-meta">Website Redesign · Sprint Board</div>
          <div className="sync-actions">
            <div className="icon" />
            <div className="icon" />
            <div className="avatar" />
          </div>
        </header>

        <div className="sync-inner">
          <aside className="sync-sidebar">
            <div className="side-item">Overview</div>
            <div className="side-item">My Tasks</div>
            <div className="side-item is-active">Board</div>
            <div className="side-item">Projects</div>
            <div className="side-item">Create Task</div>
          </aside>

          <section className="board-area">
            <div className="board-columns">
              <div className="col">
                <div className="col-title">TO DO</div>
                {todo.map((t) => <TaskCard key={t} title={t} color="purple" />)}
              </div>

              <div className="col">
                <div className="col-title">IN PROGRESS</div>
                {inProgress.map((t) => <TaskCard key={t} title={t} color="cyan" />)}
              </div>

              <div className="col">
                <div className="col-title">DONE</div>
                {done.map((t) => <TaskCard key={t} title={t} color="emerald" />)}
              </div>
            </div>
          </section>
        </div>
      </div>
      <div className="sync-glow" />
    </div>
  );
}

