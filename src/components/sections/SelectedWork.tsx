"use client";

import { Container } from "@/components/layout/Container";
import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { CareerAIVisual } from "@/components/projects/CareerAIVisual";
import { SyncSpaceVisual } from "@/components/projects/SyncSpaceVisual";
import { motion, useReducedMotion } from "framer-motion";

const labelVariants = {
  hidden: { opacity: 0, y: 12, letterSpacing: "0.24em" },
  visible: {
    opacity: 1,
    y: 0,
    letterSpacing: "0.06em",
    transition: { duration: 0.5, ease: "easeOut" }
  }
} as const;

const headingVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
} as const;

const cardWrapperVariants = (delay: number) => ({
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.85,
      ease: [0.22, 1, 0.36, 1] as const,
      delay: delay
    }
  }
});

export function SelectedWork() {
  const reducedMotion = useReducedMotion() ?? false;

  return (
    <section
      id="projects"
      className="section selected-work"
      aria-labelledby="work-title"
      style={{ position: "relative" }}
    >
      {/* Static radial background glow (No scroll-linked opacity calculations) */}
      {!reducedMotion && (
        <div 
          className="projects-bg-glow"
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse at 50% 45%, rgba(52, 211, 153, 0.08), transparent 68%)",
            pointerEvents: "none",
            zIndex: -1,
          }}
        />
      )}

      <Container>
        <div className="selected-work__header">
          <div>
            <motion.p 
              className="eyebrow"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={reducedMotion ? {} : labelVariants}
            >
              Featured Work
            </motion.p>
            <div style={{ overflow: "hidden" }}>
              <motion.h2 
                id="work-title" 
                style={{ transformOrigin: "bottom" }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={reducedMotion ? {} : headingVariants}
              >
                Selected Work
              </motion.h2>
            </div>
          </div>
        </div>

        <div className="project-grid">
          {/* Card 1: Career AI */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={reducedMotion ? {} : cardWrapperVariants(0.1)}
          >
            <ProjectCard 
              project={projects[0]} 
              variant="left"
              cardDelay={0.25}
              reducedMotion={reducedMotion}
            >
              <CareerAIVisual />
            </ProjectCard>
          </motion.div>

          {/* Card 2: SyncSpace */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={reducedMotion ? {} : cardWrapperVariants(0.55)}
          >
            <ProjectCard 
              project={projects[1]} 
              variant="right"
              cardDelay={0.7}
              reducedMotion={reducedMotion}
            >
              <SyncSpaceVisual />
            </ProjectCard>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
