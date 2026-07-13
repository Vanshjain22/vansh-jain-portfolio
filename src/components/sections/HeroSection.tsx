"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/layout/Container";
import { HeroVisual } from "@/components/hero/HeroVisual";
import { ArrowRight, ArrowUpRight, Mouse } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "framer-motion";

interface ParticleConfig {
  id: number;
  left: number;
  top: number;
  size: number;
  color: string;
  opacity: number;
  duration: number;
  delay: number;
  driftX: number;
  verticalTravel: number;
  blur: number;
  depth: 1 | 2 | 3;
  isBubble?: boolean;
}

const heroParticles: ParticleConfig[] = [
  { id: 1, left: 10, top: 20, size: 2, color: "#32d6a0", opacity: 0.12, duration: 18, delay: -2, driftX: 12, verticalTravel: -120, blur: 0, depth: 1 },
  { id: 2, left: 25, top: 40, size: 3, color: "#22e6c3", opacity: 0.15, duration: 20, delay: -5, driftX: -15, verticalTravel: -150, blur: 0.5, depth: 1 },
  { id: 3, left: 38, top: 15, size: 2, color: "#32c8ff", opacity: 0.1, duration: 16, delay: -8, driftX: 18, verticalTravel: -100, blur: 0, depth: 1 },
  { id: 4, left: 50, top: 75, size: 3, color: "#32d6a0", opacity: 0.18, duration: 22, delay: -1, driftX: -10, verticalTravel: -160, blur: 0.8, depth: 1 },
  { id: 5, left: 62, top: 30, size: 2, color: "rgba(230, 255, 248, 0.8)", opacity: 0.14, duration: 17, delay: -12, driftX: 14, verticalTravel: -110, blur: 0, depth: 1 },
  { id: 6, left: 85, top: 60, size: 3, color: "#22e6c3", opacity: 0.11, duration: 19, delay: -3, driftX: -12, verticalTravel: -140, blur: 0.5, depth: 1 },
  { id: 7, left: 15, top: 80, size: 2, color: "#32c8ff", opacity: 0.16, duration: 21, delay: -15, driftX: 10, verticalTravel: -130, blur: 0, depth: 1 },
  { id: 8, left: 78, top: 15, size: 3, color: "#32d6a0", opacity: 0.09, duration: 18, delay: -6, driftX: -8, verticalTravel: -125, blur: 0.5, depth: 1 },
  { id: 9, left: 92, top: 45, size: 2, color: "#22e6c3", opacity: 0.13, duration: 20, delay: -9, driftX: 15, verticalTravel: -145, blur: 0, depth: 1 },
  { id: 10, left: 45, top: 65, size: 3, color: "#32c8ff", opacity: 0.17, duration: 22, delay: -14, driftX: -15, verticalTravel: -155, blur: 0.8, depth: 1 },
  { id: 11, left: 5, top: 35, size: 2, color: "#32d6a0", opacity: 0.11, duration: 17, delay: -4, driftX: 12, verticalTravel: -115, blur: 0, depth: 1 },
  { id: 12, left: 30, top: 85, size: 3, color: "#22e6c3", opacity: 0.14, duration: 19, delay: -7, driftX: -10, verticalTravel: -135, blur: 0.5, depth: 1 },
  { id: 13, left: 55, top: 25, size: 2, color: "#32c8ff", opacity: 0.1, duration: 21, delay: -11, driftX: 16, verticalTravel: -125, blur: 0, depth: 1 },
  { id: 14, left: 70, top: 80, size: 3, color: "rgba(230, 255, 248, 0.8)", opacity: 0.15, duration: 18, delay: -13, driftX: -14, verticalTravel: -140, blur: 0.8, depth: 1 },
  { id: 15, left: 82, top: 38, size: 2, color: "#32d6a0", opacity: 0.12, duration: 20, delay: -16, driftX: 11, verticalTravel: -130, blur: 0, depth: 1 },
  { id: 16, left: 20, top: 12, size: 3, color: "#22e6c3", opacity: 0.08, duration: 22, delay: -2, driftX: -9, verticalTravel: -150, blur: 0.5, depth: 1 },
  { id: 17, left: 95, top: 70, size: 2, color: "#32c8ff", opacity: 0.16, duration: 16, delay: -5, driftX: 13, verticalTravel: -110, blur: 0, depth: 1 },
  { id: 18, left: 18, top: 50, size: 4, color: "#32d6a0", opacity: 0.22, duration: 14, delay: -3, driftX: 15, verticalTravel: -140, blur: 0, depth: 2 },
  { id: 19, left: 32, top: 30, size: 5, color: "#22e6c3", opacity: 0.28, duration: 15, delay: -6, driftX: -18, verticalTravel: -160, blur: 0, depth: 2, isBubble: true },
  { id: 20, left: 42, top: 60, size: 3, color: "#32c8ff", opacity: 0.2, duration: 12, delay: -9, driftX: 12, verticalTravel: -120, blur: 0, depth: 2 },
  { id: 21, left: 58, top: 20, size: 4, color: "rgba(230, 255, 248, 0.8)", opacity: 0.32, duration: 16, delay: -12, driftX: -14, verticalTravel: -150, blur: 0.5, depth: 2 },
  { id: 22, left: 72, top: 70, size: 5, color: "#32d6a0", opacity: 0.26, duration: 13, delay: -1, driftX: 16, verticalTravel: -130, blur: 0, depth: 2 },
  { id: 23, left: 80, top: 48, size: 3, color: "#22e6c3", opacity: 0.24, duration: 15, delay: -4, driftX: -10, verticalTravel: -145, blur: 0, depth: 2 },
  { id: 24, left: 22, top: 75, size: 4, color: "#32c8ff", opacity: 0.3, duration: 17, delay: -8, driftX: 13, verticalTravel: -155, blur: 0, depth: 2 },
  { id: 25, left: 64, top: 85, size: 5, color: "#32d6a0", opacity: 0.25, duration: 14, delay: -11, driftX: -15, verticalTravel: -135, blur: 0, depth: 2, isBubble: true },
  { id: 26, left: 90, top: 12, size: 3, color: "#22e6c3", opacity: 0.19, duration: 12, delay: -14, driftX: 11, verticalTravel: -125, blur: 0.5, depth: 2 },
  { id: 27, left: 16, top: 62, size: 6, color: "#32d6a0", opacity: 0.35, duration: 10, delay: -2, driftX: 20, verticalTravel: -150, blur: 1.2, depth: 3 },
  { id: 28, left: 24, top: 15, size: 8, color: "#22e6c3", opacity: 0.24, duration: 12, delay: -5, driftX: -22, verticalTravel: -180, blur: 1.8, depth: 3, isBubble: true },
  { id: 29, left: 54, top: 55, size: 7, color: "#32c8ff", opacity: 0.38, duration: 9, delay: -7, driftX: 15, verticalTravel: -130, blur: 1.5, depth: 3 },
  { id: 30, left: 76, top: 62, size: 9, color: "#32d6a0", opacity: 0.28, duration: 13, delay: -12, driftX: 22, verticalTravel: -170, blur: 2.2, depth: 3, isBubble: true }
];

export function HeroSection() {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  // Mark mounted on client to prevent hydration mismatch for random-positioned particles
  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  // ── GSAP Animations & Parallax ──────────────────────────────────────────
  useEffect(() => {
    if (typeof window === "undefined" || !mounted) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Initial entrance animations
      if (!reducedMotion) {
        // Hide elements initially to avoid flash of content
        gsap.set([".hero-role", ".hero-heading > span", ".hero-description", ".hero-actions a"], {
          opacity: 0,
        });

        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.fromTo(".hero-role",
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.6 }
        );

        const lines = gsap.utils.toArray<HTMLElement>(".hero-heading > span");
        if (lines.length >= 3) {
          // Line 1: I Build
          tl.fromTo(lines[0],
            { opacity: 0, y: 24 },
            { opacity: 1, y: 0, duration: 0.6 },
            "-=0.36"
          );

          // Line 2: Intelligent (with a temporary stronger green glow during entrance)
          tl.fromTo(lines[1],
            { opacity: 0, y: 24 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              textShadow: "0 0 20px rgba(52, 211, 153, 0.65)",
              onComplete: function () {
                gsap.to(lines[1], { textShadow: "none", duration: 0.8 });
              }
            },
            "-=0.4"
          );

          // Line 3: Web Experiences
          tl.fromTo(lines[2],
            { opacity: 0, y: 24 },
            { opacity: 1, y: 0, duration: 0.6 },
            "-=0.4"
          );
        }

        tl.fromTo(".hero-description",
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.3"
        );

        tl.fromTo(".hero-actions a",
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.12 },
          "-=0.3"
        );
      }

      // 2. Floating Badges Animation
      if (!reducedMotion) {
        gsap.set(".tech-badge", { animation: "none" });

        // React badge
        gsap.to(".badge-react", {
          y: -12,
          rotation: 2.5,
          duration: 6.2,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
        });

        // Node.js badge
        gsap.to(".badge-node", {
          x: 10,
          y: -8,
          rotation: -1.5,
          duration: 5.4,
          delay: 0.6,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
        });

        // Mongo badge (acting as Spring badge replacement for opposite slow float)
        gsap.to(".badge-mongo", {
          y: 14,
          rotation: 1.8,
          duration: 7.1,
          delay: 1.2,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
        });

        // TypeScript badge: small horizontal/vertical orbit-like motion
        gsap.to(".badge-typescript", {
          x: 8,
          duration: 4.8,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
        });
        gsap.to(".badge-typescript", {
          y: -10,
          duration: 5.6,
          delay: 0.8,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
        });
      } else {
        gsap.set(".tech-badge", { animation: "none" });
      }

      // 3. Laptop vertical bob idle motion
      if (!reducedMotion) {
        gsap.to(".hero-laptop", {
          y: -5,
          duration: 5.8,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
        });
      }

      // 4. Parallax scroll effect
      if (!reducedMotion) {
        // Hero Content parallax
        gsap.to(".hero-content", {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
          y: -30,
          ease: "none",
        });

        // Laptop parallax
        gsap.to(".hero-laptop", {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
          y: -15,
          ease: "none",
        });

        // Floating Badges parallax
        gsap.to(".badge-react", {
          scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: true },
          y: -25,
          ease: "none",
        });
        gsap.to(".badge-node", {
          scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: true },
          y: -10,
          ease: "none",
        });
        gsap.to(".badge-mongo", {
          scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: true },
          y: -20,
          ease: "none",
        });
        gsap.to(".badge-typescript", {
          scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: true },
          y: -35,
          ease: "none",
        });

        // Background particles layer parallax
        gsap.to(".hero-particles--background", {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
          y: 35,
          ease: "none",
        });

        // Foreground particles layer parallax
        gsap.to(".hero-particles--foreground", {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
          y: -45,
          ease: "none",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion, mounted]);

  // ── Mouse-Reactive Ambient Glow ─────────────────────────────────────────
  useEffect(() => {
    if (typeof window === "undefined" || reducedMotion) return;

    const section = sectionRef.current;
    const glow = glowRef.current;
    if (!section || !glow) return;

    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) {
      glow.classList.add("static-glow");
      return;
    }

    const xTo = gsap.quickTo(glow, "x", { duration: 0.6, ease: "power3.out" });
    const yTo = gsap.quickTo(glow, "y", { duration: 0.6, ease: "power3.out" });

    const handleMouseEnter = () => {
      gsap.to(glow, { opacity: 1, duration: 0.4 });
    };
    const handleMouseLeave = () => {
      gsap.to(glow, { opacity: 0, duration: 0.4 });
    };
    const handleMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      xTo(x);
      yTo(y);
    };

    section.addEventListener("mouseenter", handleMouseEnter);
    section.addEventListener("mouseleave", handleMouseLeave);
    section.addEventListener("mousemove", handleMouseMove);

    return () => {
      section.removeEventListener("mouseenter", handleMouseEnter);
      section.removeEventListener("mouseleave", handleMouseLeave);
      section.removeEventListener("mousemove", handleMouseMove);
    };
  }, [reducedMotion]);

  return (
    <section ref={sectionRef} id="home" className="hero" aria-labelledby="hero-title">
      {/* Mouse reactive glow & fallback */}
      <div className={`hero-mouse-glow${reducedMotion ? " static-glow" : ""}`} ref={glowRef} />

      {/* Background Atmosphere Particles */}
      {mounted && (
        <div className={`hero-particles hero-particles--background${reducedMotion ? " reduced-motion" : ""}`} aria-hidden="true">
          {heroParticles
            .filter((p) => p.depth !== 3)
            .map((p) => (
              <div
                key={p.id}
                className={`hero-particle depth-${p.depth}${p.isBubble ? " hero-particle__bubble" : ""}`}
                style={{
                  left: `${p.left}%`,
                  top: `${p.top}%`,
                  width: `${p.size}px`,
                  height: `${p.size}px`,
                  backgroundColor: p.color,
                  opacity: p.opacity,
                  filter: p.blur > 0 ? `blur(${p.blur}px)` : "none",
                  boxShadow: p.opacity > 0.28 ? `0 0 5px ${p.color}` : "none",
                  "--particle-duration": `${p.duration}s`,
                  "--particle-delay": `${p.delay}s`,
                  "--particle-drift-x": `${p.driftX}px`,
                  "--particle-travel-y": `${p.verticalTravel}px`,
                  "--item-base-opacity": p.opacity,
                } as React.CSSProperties}
              />
            ))}
        </div>
      )}

      <Container className="hero-grid">
        <div className="hero-content">
          <p className="eyebrow hero-role"><span />Full Stack Developer</p>
          <h1 id="hero-title" className="hero-heading">
            <span>I Build</span>
            <span className="hero-heading-accent">Intelligent</span>
            <span>Web Experiences</span>
          </h1>
          <p className="hero-description">Full Stack Developer passionate about AI, building scalable SaaS products and delivering impactful digital experiences.</p>
          <div className="hero-actions">
            <a className="hero-button hero-button-primary" href="#projects">View My Work <ArrowUpRight aria-hidden="true" size={17} /></a>
            <a className="hero-button hero-button-secondary" href="#contact">Let&apos;s Connect <ArrowRight aria-hidden="true" size={17} /></a>
          </div>
        </div>
        <HeroVisual />
        {/* Foreground Atmosphere Particles */}
        {mounted && (
          <div className={`hero-particles hero-particles--foreground${reducedMotion ? " reduced-motion" : ""}`} aria-hidden="true">
            {heroParticles
              .filter((p) => p.depth === 3)
              .map((p) => (
                <div
                  key={p.id}
                  className={`hero-particle depth-${p.depth}${p.isBubble ? " hero-particle__bubble" : ""}`}
                  style={{
                    left: `${p.left}%`,
                    top: `${p.top}%`,
                    width: `${p.size}px`,
                    height: `${p.size}px`,
                    backgroundColor: p.color,
                    opacity: p.opacity,
                    filter: p.blur > 0 ? `blur(${p.blur}px)` : "none",
                    boxShadow: `0 0 8px ${p.color}`,
                    "--particle-duration": `${p.duration}s`,
                    "--particle-delay": `${p.delay}s`,
                    "--particle-drift-x": `${p.driftX}px`,
                    "--particle-travel-y": `${p.verticalTravel}px`,
                    "--item-base-opacity": p.opacity,
                  } as React.CSSProperties}
                />
              ))}
          </div>
        )}
        <div className="scroll-indicator"><Mouse aria-hidden="true" size={19} /><span>Scroll Down</span></div>
      </Container>
    </section>
  );
}

