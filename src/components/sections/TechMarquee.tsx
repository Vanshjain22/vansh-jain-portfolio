"use client";

import { Container } from "@/components/layout/Container";
import { Atom, Braces, Database, GitBranch, Hexagon, Server, Triangle, Wind, type LucideIcon } from "lucide-react";
import { technologies, type TechnologyIcon } from "@/data/technologies";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

const iconMap: Record<TechnologyIcon, LucideIcon> = {
  atom: Atom,
  triangle: Triangle,
  braces: Braces,
  hexagon: Hexagon,
  server: Server,
  leaf: Database,
  wind: Wind,
  "git-branch": GitBranch,
  database: Database,
};

export function TechMarquee() {
  const reducedMotion = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);

  // Pause CSS animation when the browser tab is hidden
  useEffect(() => {
    if (reducedMotion) return;
    const track = trackRef.current;
    if (!track) return;
    const handleVisibility = () => {
      track.style.animationPlayState = document.hidden ? "paused" : "running";
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, [reducedMotion]);

  // Duplicate items to fill the loop seamlessly — use 4× to ensure no gap at all screen sizes
  const marqueeItems = [...technologies, ...technologies, ...technologies, ...technologies];

  if (reducedMotion) {
    return (
      <section id="skills" className="tech-marquee-section" aria-labelledby="tech-title">
        <Container>
          <p id="tech-title" className="eyebrow">Technologies I Work With</p>
          <div className="tech-static-grid" role="list">
            {technologies.map((technology) => {
              const Icon = iconMap[technology.icon];
              return (
                <div className="tech-marquee__item" key={technology.name} role="listitem">
                  <Icon aria-hidden="true" strokeWidth={1.8} />
                  <span>{technology.name}</span>
                </div>
              );
            })}
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section id="skills" className="tech-marquee-section" aria-labelledby="tech-title">
      <Container>
        <p id="tech-title" className="eyebrow">Technologies I Work With</p>
      </Container>
      <div className="tech-marquee" aria-label="Technologies I work with">
        <div className="tech-marquee__track" ref={trackRef}>
          {marqueeItems.map((technology, index) => {
            const Icon = iconMap[technology.icon];
            return (
              <div
                className="tech-marquee__item"
                key={`${technology.name}-${index}`}
                aria-hidden={index >= technologies.length}
              >
                <Icon aria-hidden="true" strokeWidth={1.8} />
                <span>{technology.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
