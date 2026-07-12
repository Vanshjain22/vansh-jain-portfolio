"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";

type Props = {
  project: Project;
  variant?: "left" | "right";
  children?: React.ReactNode;
};

export function ProjectCard({ project, variant = "left", children }: Props) {
  return (
    <motion.article className={`project-card project-card--${variant}`} whileHover={{ scale: 1.01 }} transition={{ type: "tween", duration: 0.22 }} tabIndex={0} aria-labelledby={`proj-${project.number}-title`}>
      <div className="project-card__content">
        <small className="project-number">{project.number}</small>
        <div className="project-category">{project.category.toUpperCase()}</div>
        <h3 id={`proj-${project.number}-title`} className="project-title">{project.title}</h3>
        <p className="project-desc">{project.description}</p>
        <div className="project-tech">{project.technologies.map((technology) => <span key={technology} className="tech-pill">{technology}</span>)}</div>
        <div className="project-actions">
          {project.liveUrl ? <a href={project.liveUrl} className="btn btn-primary" target="_blank" rel="noopener noreferrer">Live Demo <ArrowUpRight aria-hidden="true" size={14} /></a> : <span className="btn btn-primary is-disabled" aria-disabled="true">Coming Soon <ArrowUpRight aria-hidden="true" size={14} /></span>}
          {project.caseStudyUrl && <a href={project.caseStudyUrl} className="btn btn-secondary" target="_blank" rel="noopener noreferrer">Case Study <ArrowUpRight aria-hidden="true" size={14} /></a>}
        </div>
      </div>
      <div className="project-card__visual">{children}</div>
    </motion.article>
  );
}
