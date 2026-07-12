"use client";

import { Container } from "@/components/layout/Container";
import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { CareerAIVisual } from "@/components/projects/CareerAIVisual";
import { SyncSpaceVisual } from "@/components/projects/SyncSpaceVisual";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function SelectedWork() {
  const rootRef = useRef<HTMLElement | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (typeof window === "undefined" || reducedMotion) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 85%",
        },
      });

      tl.from(".selected-work__header p", { opacity: 0, y: 10, duration: 0.36 });
      tl.from(".selected-work__header h2", { opacity: 0, y: 14, duration: 0.42 }, "-=.18");
      tl.from(".project-card--left", { opacity: 0, y: 18, duration: 0.6, ease: "power2.out" });
      tl.from(".project-card--right", { opacity: 0, y: 18, duration: 0.6, ease: "power2.out" }, "-=.45");
    }, rootRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section ref={rootRef} id="projects" className="section selected-work" aria-labelledby="work-title">
      <Container>
        <div className="selected-work__header">
          <div>
            <p className="eyebrow">Featured Work</p>
            <h2 id="work-title">Selected Work</h2>
          </div>
        </div>

        <div className="project-grid">
          <ProjectCard project={projects[0]} variant="left">
            <CareerAIVisual />
          </ProjectCard>

          <ProjectCard project={projects[1]} variant="right">
            <SyncSpaceVisual />
          </ProjectCard>
        </div>
      </Container>
    </section>
  );
}
