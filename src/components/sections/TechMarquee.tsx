"use client";

import { Container } from "@/components/layout/Container";
import { Atom, Braces, Database, GitBranch, Hexagon, Server, Triangle, Wind, type LucideIcon } from "lucide-react";
import { technologies, type TechnologyIcon } from "@/data/technologies";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { gsap, setupScrollTrigger } from "@/lib/gsap";

const iconMap: Record<TechnologyIcon, LucideIcon> = { atom: Atom, triangle: Triangle, braces: Braces, hexagon: Hexagon, server: Server, leaf: Database, wind: Wind, "git-branch": GitBranch, database: Database };

export function TechMarquee() {
  const rootRef = useRef<HTMLElement | null>(null);
  const reducedMotion = useReducedMotion();
  const marqueeItems = [...technologies, ...technologies];

  useEffect(() => {
    if (reducedMotion) return;
    setupScrollTrigger();
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: rootRef.current, start: "top 78%", once: true } });
      tl.from(".tech-marquee", { clipPath: "inset(0 100% 0 0)", duration: 1, ease: "power4.out" })
        .from("#tech-title", { opacity: 0, x: -20, duration: 0.55, ease: "power3.out" }, "<.12")
        .from(".tech-marquee__item", { opacity: 0, x: 26, duration: 0.45, stagger: 0.05, ease: "power3.out" }, "<.16")
        .from(".tech-marquee::after", { xPercent: -120, opacity: 0, duration: 0.85, ease: "power2.out" }, "<");
      gsap.to(".tech-marquee__track", { xPercent: -50, duration: 38, ease: "none", repeat: -1 });
    }, rootRef);
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section ref={rootRef} id="skills" className="tech-marquee-section" aria-labelledby="tech-title">
      <Container>
        <p id="tech-title" className="eyebrow">Technologies I Work With</p>
      </Container>
      <div className="tech-marquee" aria-label="Technologies I work with">
        <div className="tech-marquee__track">
          {marqueeItems.map((technology, index) => {
            const Icon = iconMap[technology.icon];
            return <div className="tech-marquee__item" key={`${technology.name}-${index}`} aria-hidden={index >= technologies.length}><Icon aria-hidden="true" strokeWidth={1.8} /><span>{technology.name}</span></div>;
          })}
        </div>
      </div>
    </section>
  );
}
