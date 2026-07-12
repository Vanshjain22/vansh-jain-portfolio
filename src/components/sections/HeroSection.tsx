"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/layout/Container";
import { HeroVisual } from "@/components/hero/HeroVisual";
import { ArrowRight, ArrowUpRight, Mouse } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "framer-motion";

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
    if (typeof window === "undefined") return;

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

        // Ambient particles slow drift
        gsap.utils.toArray<HTMLElement>(".ambient-particle").forEach((el, i) => {
          const xDrift = 15 + (i * 12) % 35;
          const yDrift = 25 + (i * 18) % 45;
          const duration = 9 + (i * 3) % 10;
          const delay = (i * 1.2) % 4;

          gsap.to(el, {
            x: `+=${xDrift}`,
            y: `+=${yDrift}`,
            opacity: gsap.utils.random(0.04, 0.22),
            duration,
            delay,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });

          // Particles parallax on scroll
          gsap.to(el, {
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
            y: -10 - (i * 7) % 25,
            ease: "none",
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

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

      {/* Subtle ambient moving particles */}
      {mounted && (
        <div className="ambient-particles">
          {Array.from({ length: 11 }).map((_, i) => (
            <div
              key={i}
              className="ambient-particle"
              style={{
                top: `${12 + (i * 71) % 75}%`,
                left: `${8 + (i * 83) % 85}%`,
                opacity: 0.06 + ((i * 11) % 13) / 100,
              }}
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
        <div className="scroll-indicator"><Mouse aria-hidden="true" size={19} /><span>Scroll Down</span></div>
      </Container>
    </section>
  );
}

