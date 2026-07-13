"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";

type Props = {
  project: Project;
  variant?: "left" | "right";
  children?: React.ReactNode;
  cardDelay: number;
  reducedMotion: boolean;
};

const cardVariants = {
  hidden: {
    opacity: 0,
    scale: 0.94,
    clipPath: "inset(0 0 100% 0 round 20px)",
    filter: "blur(4px)",
  },
  visible: (delay: number) => ({
    opacity: 1,
    scale: 1,
    clipPath: "inset(0 0 0% 0 round 20px)",
    filter: "blur(0px)",
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
      delay: delay,
    }
  })
} as const;

const textContainerVariants = {
  hidden: {},
  visible: (delay: number) => ({
    transition: {
      delayChildren: delay + 0.35,
      staggerChildren: 0.08,
    }
  })
} as const;

const numberVariants = {
  hidden: { opacity: 0, scale: 0.7, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.45, ease: "easeOut" }
  }
} as const;

const categoryVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
} as const;

const titleVariants = {
  hidden: { y: "105%", rotateX: "8deg", opacity: 0 },
  visible: { y: 0, rotateX: 0, opacity: 1, transition: { duration: 0.55, ease: "easeOut" } }
} as const;

const descVariants = {
  hidden: { opacity: 0, y: 16, filter: "blur(3px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: "easeOut" } }
} as const;

const techContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
    }
  }
} as const;

const pillVariants = {
  hidden: { opacity: 0, scale: 0.72, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 280,
      damping: 22
    }
  }
} as const;

const ctaVariants = {
  hidden: { opacity: 0, scaleX: 0.82, y: 8 },
  visible: {
    opacity: 1,
    scaleX: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" }
  }
} as const;

export function ProjectCard({ 
  project, 
  variant = "left", 
  children, 
  cardDelay, 
  reducedMotion
}: Props) {
  // If reduced motion, render immediately without animations
  const customVariants = reducedMotion ? {} : cardVariants;
  const customTextVariants = reducedMotion ? {} : textContainerVariants;

  return (
    <div style={{ position: "relative", transformStyle: "preserve-3d" }}>
      <motion.article
        className={`project-card project-card--${variant}`}
        variants={customVariants}
        custom={cardDelay}
        whileHover={reducedMotion ? {} : "hover"}
        tabIndex={0}
        aria-labelledby={`proj-${project.number}-title`}
        style={{ transformStyle: "preserve-3d" }}
      >
        <motion.div
          className="project-card__content"
          variants={customTextVariants}
          custom={cardDelay}
        >
          <motion.small className="project-number" variants={reducedMotion ? {} : numberVariants}>
            {project.number}
          </motion.small>
          <motion.div className="project-category" variants={reducedMotion ? {} : categoryVariants}>
            {project.category.toUpperCase()}
          </motion.div>
          <div style={{ overflow: "hidden" }}>
            <motion.h3
              id={`proj-${project.number}-title`}
              className="project-title"
              style={{ transformOrigin: "bottom" }}
              variants={reducedMotion ? {} : titleVariants}
            >
              {project.title}
            </motion.h3>
          </div>
          <motion.p className="project-desc" variants={reducedMotion ? {} : descVariants}>
            {project.description}
          </motion.p>
          <motion.div className="project-tech" variants={reducedMotion ? {} : techContainerVariants}>
            {project.technologies.map((technology) => (
              <motion.span key={technology} className="tech-pill" variants={reducedMotion ? {} : pillVariants}>
                {technology}
              </motion.span>
            ))}
          </motion.div>
          <motion.div className="project-actions" variants={reducedMotion ? {} : ctaVariants} style={{ transformOrigin: "left center" }}>
            {project.liveUrl ? (
              <a href={project.liveUrl} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                Live Demo <ArrowUpRight aria-hidden="true" size={14} />
              </a>
            ) : (
              <span className="btn btn-primary is-disabled" aria-disabled="true">
                Coming Soon <ArrowUpRight aria-hidden="true" size={14} />
              </span>
            )}
            {project.caseStudyUrl && (
              <a href={project.caseStudyUrl} className="btn btn-secondary" target="_blank" rel="noopener noreferrer">
                Case Study <ArrowUpRight aria-hidden="true" size={14} />
              </a>
            )}
          </motion.div>
        </motion.div>
        
        <motion.div
          className="project-card__visual"
          variants={{
            hover: {
              y: -4,
              rotateX: 1,
              transition: {
                type: "spring",
                stiffness: 200,
                damping: 18,
              }
            }
          } as const}
        >
          {children}
        </motion.div>
      </motion.article>
    </div>
  );
}
