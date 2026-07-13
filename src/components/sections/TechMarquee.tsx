"use client";

import { Container } from "@/components/layout/Container";
import { Atom, Braces, Database, GitBranch, Hexagon, Server, Triangle, Wind, type LucideIcon } from "lucide-react";
import { technologies, type TechnologyIcon } from "@/data/technologies";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { gsap, setupScrollTrigger, ScrollTrigger } from "@/lib/gsap";

const iconMap: Record<TechnologyIcon, LucideIcon> = { 
  atom: Atom, 
  triangle: Triangle, 
  braces: Braces, 
  hexagon: Hexagon, 
  server: Server, 
  leaf: Database, 
  wind: Wind, 
  "git-branch": GitBranch, 
  database: Database 
};

const accentMap: Record<TechnologyIcon, string> = {
  atom: "var(--cyan)",
  triangle: "var(--primary)",
  braces: "var(--primary)",
  hexagon: "var(--primary)",
  server: "var(--primary)",
  leaf: "var(--primary)",
  wind: "var(--cyan)",
  "git-branch": "var(--primary)",
  database: "var(--primary)"
};

export function TechMarquee() {
  const rootRef = useRef<HTMLElement | null>(null);
  const marqueeRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLParagraphElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  
  const reducedMotionHook = useReducedMotion();
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false);
  const marqueeItems = [...technologies, ...technologies];

  useEffect(() => {
    if (reducedMotionHook) {
      const timer = setTimeout(() => {
        setShouldReduceMotion(true);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [reducedMotionHook]);

  useEffect(() => {
    if (shouldReduceMotion) return;

    const root = rootRef.current;
    const marquee = marqueeRef.current;
    const title = titleRef.current;
    const track = trackRef.current;

    if (!root || !marquee || !title || !track) return;

    const items = root.querySelectorAll(".tech-marquee__item");
    if (!items || items.length === 0) return;

    setupScrollTrigger();

    // Determine speed based on screen size (slower on mobile)
    const isMobile = window.innerWidth < 1024;
    const duration = isMobile ? 52 : 38;

    let animFrameId: number;
    let isIntersecting = false;
    let lastTime = 0;

    // 1. Throttled (25 FPS) and batched requestAnimationFrame loop
    const updateFocusEffect = (timestamp: number) => {
      if (!isIntersecting || !marquee) return;

      // Throttle calculation rate to 25 FPS (~40ms) to conserve CPU
      if (timestamp - lastTime < 40) {
        animFrameId = requestAnimationFrame(updateFocusEffect);
        return;
      }
      lastTime = timestamp;

      const marqueeRect = marquee.getBoundingClientRect();
      const centerPoint = marqueeRect.left + marqueeRect.width / 2;
      const isMobileViewport = window.innerWidth < 768;
      
      const focusRange = isMobileViewport ? 160 : 350; 
      const pulseActivationThreshold = isMobileViewport ? 30 : 55;
      const pulseResetThreshold = isMobileViewport ? 45 : 75;

      const currentItems = marquee.querySelectorAll(".tech-marquee__item");
      
      // Batch Read Phase (stops forced layout thrashing)
      const measurements = Array.from(currentItems).map((item) => {
        const itemHtml = item as HTMLElement;
        const itemRect = itemHtml.getBoundingClientRect();
        return {
          itemHtml,
          itemCenter: itemRect.left + itemRect.width / 2,
        };
      });

      // Batch Write Phase
      measurements.forEach(({ itemHtml, itemCenter }) => {
        const distance = Math.abs(itemCenter - centerPoint);

        let intensity = 0;
        if (distance < focusRange) {
          intensity = 1 - distance / focusRange;
        }

        const opacityVal = 0.42 + intensity * 0.58;
        const scaleVal = 0.96 + intensity * 0.12;

        itemHtml.style.setProperty("--item-opacity", opacityVal.toFixed(3));
        itemHtml.style.setProperty("--item-scale", scaleVal.toFixed(3));

        // Center zone class updates
        if (distance <= pulseActivationThreshold) {
          if (!itemHtml.classList.contains("in-center-zone")) {
            itemHtml.classList.add("in-center-zone");

            const pulse = itemHtml.querySelector(".tech-marquee__pulse");
            if (pulse) {
              pulse.classList.remove("animate-pulse-ring");
              void (pulse as HTMLElement).offsetWidth;
              pulse.classList.add("animate-pulse-ring");
            }

            const svg = itemHtml.querySelector("svg");
            if (svg) {
              svg.classList.remove("icon-micro-motion-a", "icon-micro-motion-b", "icon-micro-motion-c");
              void (svg as unknown as HTMLElement).offsetWidth;

              const indexAttr = itemHtml.getAttribute("data-index");
              const index = indexAttr ? parseInt(indexAttr, 10) : 0;
              if (index % 3 === 0) {
                svg.classList.add("icon-micro-motion-a");
              } else if (index % 3 === 1) {
                svg.classList.add("icon-micro-motion-b");
              } else {
                svg.classList.add("icon-micro-motion-c");
              }
            }
          }
        } else if (distance > pulseResetThreshold) {
          itemHtml.classList.remove("in-center-zone");
        }
      });

      animFrameId = requestAnimationFrame(updateFocusEffect);
    };

    // IntersectionObserver to pause loop calculations when section is out of viewport
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        isIntersecting = entry.isIntersecting;
        if (isIntersecting) {
          updateFocusEffect(performance.now());
        } else {
          cancelAnimationFrame(animFrameId);
        }
      });
    }, { threshold: 0.05 });

    observer.observe(root);

    const ctx = gsap.context(() => {
      // 2. Entrance Animation (title only)
      gsap.from(title, {
        opacity: 0,
        y: 15,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: root,
          start: "top 85%",
          once: true
        }
      });

      // 3. Constant linear translation loop
      const loop = gsap.to(track, {
        xPercent: -50,
        duration: duration,
        ease: "none",
        repeat: -1
      });

      // 4. Hover Speed deceleration on Desktop
      if (!isMobile) {
        const handleMouseEnter = () => {
          gsap.to(loop, { timeScale: 0.25, duration: 0.8, ease: "power2.out", overwrite: "auto" });
        };

        const handleMouseLeave = () => {
          gsap.to(loop, { timeScale: 1.0, duration: 0.8, ease: "power2.out", overwrite: "auto" });
        };

        marquee.addEventListener("mouseenter", handleMouseEnter);
        marquee.addEventListener("mouseleave", handleMouseLeave);

        // Speed boost interaction on rapid scroll
        ScrollTrigger.create({
          trigger: root,
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) => {
            const velocity = Math.abs(self.getVelocity());
            if (velocity < 20) return;

            const isHovered = marquee.matches(":hover");
            const baseSpeed = isHovered ? 0.25 : 1.0;
            const speedBoost = Math.min(velocity / 1200, 1.2);
            const targetSpeed = baseSpeed + speedBoost;

            gsap.to(loop, {
              timeScale: targetSpeed,
              duration: 0.15,
              overwrite: "auto",
              onComplete: () => {
                const currentHovered = marquee.matches(":hover");
                gsap.to(loop, {
                  timeScale: currentHovered ? 0.25 : 1.0,
                  duration: 1.0,
                  ease: "power2.out",
                  overwrite: "auto"
                });
              }
            });
          }
        });
      }
    }, rootRef);

    return () => {
      ctx.revert();
      cancelAnimationFrame(animFrameId);
      observer.disconnect();
    };
  }, [shouldReduceMotion]);

  return (
    <section ref={rootRef} id="skills" className="tech-marquee-section" aria-labelledby="tech-title">
      <Container>
        <p ref={titleRef} id="tech-title" className="eyebrow">Technologies I Work With</p>
      </Container>
      
      <div 
        ref={marqueeRef} 
        className="tech-marquee" 
        aria-label="Technologies I work with"
      >
        {/* Invisible-looking Focus Field Gradient overlay */}
        <div className="tech-marquee__focus-glow" aria-hidden="true" />

        <div 
          ref={trackRef} 
          className={shouldReduceMotion ? "tech-static-grid" : "tech-marquee__track"}
        >
          {marqueeItems.map((technology, index) => {
            const Icon = iconMap[technology.icon];
            const iconAccent = accentMap[technology.icon];
            
            // Standard styles fallback for reduced motion cases
            const fallbackStyle = shouldReduceMotion 
              ? { "--focus-intensity": 1, "--icon-accent": iconAccent } as React.CSSProperties
              : { "--icon-accent": iconAccent } as React.CSSProperties;

            return (
              <div 
                className="tech-marquee__item" 
                key={`${technology.name}-${index}`}
                data-index={index}
                style={fallbackStyle}
                aria-hidden={!shouldReduceMotion && index >= technologies.length}
              >
                <div className="tech-icon-container">
                  <span className="tech-marquee__pulse" />
                  <Icon aria-hidden="true" strokeWidth={1.8} />
                </div>
                <span>{technology.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
