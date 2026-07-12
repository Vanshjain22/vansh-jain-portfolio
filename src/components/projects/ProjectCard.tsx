"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";

type Props = {
  project: Project;
  variant?: "left" | "right";
  children?: React.ReactNode;
};

export function ProjectCard({ project, variant = "left", children }: Props) {
  return (
    <motion.article
      className={`project-card project-card--${variant}`}
      whileHover={{ scale: 1.01 }}
      transition={{ type: "tween", duration: 0.22 }}
      tabIndex={0}
      aria-labelledby={`proj-${project.number}-title`}
    >
      <div className="project-card__content">
        <small className="project-number">{project.number}</small>
        <div className="project-category">{project.category.toUpperCase()}</div>
        <h3 id={`proj-${project.number}-title`} className="project-title">{project.title}</h3>
        <p className="project-desc">{project.description}</p>

        <div className="project-tech">
          {project.technologies.map((t) => (
            <span key={t} className="tech-pill">{t}</span>
          ))}
        </div>

        <div className="project-actions">
          <Link href={project.liveUrl || "#"} className="btn btn-primary" aria-disabled={!project.liveUrl}>
            Live Demo <ArrowUpRight aria-hidden="true" size={14} />
          </Link>
          <Link href={project.caseStudyUrl || "#"} className="btn btn-secondary" aria-disabled={!project.caseStudyUrl}>
            Case Study →
          </Link>
        </div>
      </div>

      <div className="project-card__visual">{children}</div>
    </motion.article>
  );
}
