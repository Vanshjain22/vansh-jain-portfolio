"use client";

import { Container } from "@/components/layout/Container";
import { BarChart3, Check, ChevronRight, Code2, Zap } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { gsap, setupScrollTrigger, ScrollTrigger } from "@/lib/gsap";

const aboutStats = [
  { value: "5+", label: "Projects" },
  { value: "2+", label: "Years of Coding" },
  { value: "10+", label: "Technologies" },
  { value: "Always", label: "Building" }
];
const highlights = [
  "Clean, efficient and scalable code",
  "User-focused development approach",
  "Strong problem-solving skills",
  "Passionate about AI & SaaS",
  "Always learning, always building"
];

// Electric Effect Configurations (10 independent jagged discharge segments)
// Electric Effect Configurations (6 independent jaggy discharge segments)
const lightningSegments = [
  {
    id: "top-arch",
    coreD: "M 46 1 L 49 -2 L 51 2 L 54 -1",
    branchD: "M 51 2 L 48 -4 L 46 -6"
  },
  {
    id: "upper-right",
    coreD: "M 76 6 L 79 3 L 81 8 L 84 5",
    branchD: ""
  },
  {
    id: "right-upper",
    coreD: "M 98 32 L 101 35 L 98 38 L 101.5 41",
    branchD: ""
  },
  {
    id: "bottom-edge",
    coreD: "M 48 101 L 51 98 L 54 102 L 57 99",
    branchD: "M 51 98 L 50 106 L 48 109"
  },
  {
    id: "left-upper",
    coreD: "M 2 32 L -1 35 L 2 38 L -1.5 41",
    branchD: ""
  },
  {
    id: "lower-left",
    coreD: "M 8 95 L 5 92 L 3 96 L 0 93",
    branchD: ""
  }
];

export function AboutSection() {
  const rootRef = useRef<HTMLElement | null>(null);
  
  // Left composition refs
  const portraitWrapperRef = useRef<HTMLDivElement | null>(null);
  const portraitImageRef = useRef<HTMLDivElement | null>(null);
  const orbitOneRef = useRef<HTMLDivElement | null>(null);
  const orbitTwoRef = useRef<HTMLDivElement | null>(null);
  
  // Floating icons refs
  const codeEntranceRef = useRef<HTMLDivElement | null>(null);
  const codeFloatRef = useRef<HTMLDivElement | null>(null);
  const zapEntranceRef = useRef<HTMLDivElement | null>(null);
  const zapFloatRef = useRef<HTMLDivElement | null>(null);
  const chartEntranceRef = useRef<HTMLDivElement | null>(null);
  const chartFloatRef = useRef<HTMLDivElement | null>(null);
  
  // Copy refs
  const labelRef = useRef<HTMLParagraphElement | null>(null);
  const headingLine1Ref = useRef<HTMLSpanElement | null>(null);
  const headingLine2Ref = useRef<HTMLSpanElement | null>(null);
  const descriptionRef = useRef<HTMLParagraphElement | null>(null);
  const statsRef = useRef<HTMLDListElement | null>(null);
  
  // Strengths/Highlights Card ref
  const highlightsCardRef = useRef<HTMLElement | null>(null);
  
  const reducedMotion = useReducedMotion();
  
  useEffect(() => {
    if (typeof window === "undefined" || reducedMotion) return;
    setupScrollTrigger();

    const root = rootRef.current;
    
    // Left composition elements
    const portraitWrapper = portraitWrapperRef.current;
    const portraitImage = portraitImageRef.current;
    const orbitOne = orbitOneRef.current;
    const orbitTwo = orbitTwoRef.current;
    
    // Floating icons
    const codeEntrance = codeEntranceRef.current;
    const codeFloat = codeFloatRef.current;
    const zapEntrance = zapEntranceRef.current;
    const zapFloat = zapFloatRef.current;
    const chartEntrance = chartEntranceRef.current;
    const chartFloat = chartFloatRef.current;
    
    // Copy
    const label = labelRef.current;
    const heading1 = headingLine1Ref.current;
    const heading2 = headingLine2Ref.current;
    const description = descriptionRef.current;
    const statsContainer = statsRef.current;
    const strengthsCard = highlightsCardRef.current;
    
    if (!root || !portraitWrapper || !portraitImage || !orbitOne || !orbitTwo ||
        !codeEntrance || !codeFloat || !zapEntrance || !zapFloat || !chartEntrance || !chartFloat ||
        !label || !heading1 || !heading2 || !description || !statsContainer || !strengthsCard) {
      return;
    }

    const statBlocks = statsContainer.querySelectorAll("div");
    const checkRows = strengthsCard.querySelectorAll("li");
    const checkIcons = strengthsCard.querySelectorAll("svg");
    const cta = strengthsCard.querySelector(".about-contact-link");
    
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add({
        isMobile: "(max-width: 767px)",
        isTablet: "(min-width: 768px) and (max-width: 1023px)",
        isDesktop: "(min-width: 1024px)",
      }, (context) => {
        const { isMobile, isTablet } = context.conditions || {};
        
        // Dynamic horizontal travel offsets
        const xPortrait = isMobile ? -80 : isTablet ? -300 : -650;
        const xStrengths = isMobile ? 80 : isTablet ? 300 : 650;
        
        // Rotations (reduced on mobile)
        const rotYPortrait = isMobile ? -6 : isTablet ? -12 : -22;
        const rotYStrengths = isMobile ? 6 : isTablet ? 12 : 22;
        const rotZPortrait = isMobile ? -1 : isTablet ? -3 : -5;
        const rotZStrengths = isMobile ? 1 : isTablet ? 2 : 3;
        
        // Heading & description horizontal offsets
        const xHeadingLeft = isMobile ? 40 : isTablet ? 90 : 180;
        const xHeadingRight = isMobile ? -40 : isTablet ? -90 : -180;
        const xDesc = isMobile ? 50 : isTablet ? 110 : 220;
        
        // Floating icon offsets (reduced on mobile)
        const codeX = isMobile ? -65 : -220;
        const codeY = isMobile ? -40 : -130;
        const codeRot = isMobile ? -12 : -40;
        
        const zapX = isMobile ? 70 : 230;
        const zapY = isMobile ? -30 : -100;
        const zapRot = isMobile ? 13 : 45;
        
        const chartX = isMobile ? -55 : -180;
        const chartY = isMobile ? 50 : 170;
        const chartRot = isMobile ? -10 : -35;
        
        // Master scroll-trigger timeline (Shorter and stronger range)
        const masterTl = gsap.timeline({
          scrollTrigger: {
            trigger: root,
            start: "top 88%",
            end: "top 48%",
            scrub: 0.7,
          }
        });

        // ==================================================
        // PHASE 1 — OUTER PANELS CONVERGE (Starts at 0)
        // ==================================================
        
        // Portrait Wrapper fly-in
        masterTl.fromTo(portraitWrapper,
          {
            x: xPortrait,
            opacity: 0,
            scale: 0.68,
            rotateY: rotYPortrait,
            rotateZ: rotZPortrait,
            transformPerspective: 1200,
          },
          {
            x: 0,
            opacity: 1,
            scale: 1,
            rotateY: 0,
            rotateZ: 0,
            ease: "power2.out",
          },
          0
        );

        // Portrait clip reveal
        masterTl.fromTo(portraitImage,
          {
            clipPath: "inset(0 100% 0 0)",
          },
          {
            clipPath: "inset(0 0% 0 0)",
            ease: "power1.inOut",
          },
          0
        );

        // Orbit ring 1 assembly
        masterTl.fromTo(orbitOne,
          {
            rotate: -140,
            scale: 0.45,
            opacity: 0,
          },
          {
            rotate: 10,
            scale: 1,
            opacity: 1,
            ease: "power2.out",
          },
          0
        );

        // Orbit ring 2 assembly
        masterTl.fromTo(orbitTwo,
          {
            rotate: 150,
            scale: 1.6,
            opacity: 0,
          },
          {
            rotate: -8,
            scale: 1,
            opacity: 1,
            ease: "power2.out",
          },
          0
        );

        // Strengths card wrapper fly-in
        masterTl.fromTo(strengthsCard,
          {
            x: xStrengths,
            opacity: 0,
            scale: 0.72,
            rotateY: rotYStrengths,
            rotateZ: rotZStrengths,
            transformPerspective: 1200,
          },
          {
            x: 0,
            opacity: 1,
            scale: 1,
            rotateY: 0,
            rotateZ: 0,
            ease: "power2.out",
          },
          0
        );

        // ==================================================
        // PHASE 2 — CENTER HEADLINE ASSEMBLES (Starts at 0.3)
        // ==================================================
        
        // ABOUT ME label drops
        masterTl.fromTo(label,
          {
            y: -80,
            opacity: 0,
            scale: 0.7,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            ease: "power3.out",
          },
          0.3
        );

        // Heading line 1 slides from right
        masterTl.fromTo(heading1,
          {
            x: xHeadingLeft,
            yPercent: 120,
            opacity: 0,
            rotateX: -35,
            transformPerspective: 800,
          },
          {
            x: 0,
            yPercent: 0,
            opacity: 1,
            rotateX: 0,
            ease: "power3.out",
          },
          0.35
        );

        // Heading line 2 slides from left with scale
        masterTl.fromTo(heading2,
          {
            x: xHeadingRight,
            yPercent: 130,
            opacity: 0,
            scale: 0.75,
            rotateX: 30,
            transformPerspective: 800,
          },
          {
            x: 0,
            yPercent: 0,
            opacity: 1,
            scale: 1,
            rotateX: 0,
            ease: "power3.out",
          },
          0.42
        );

        // Description paragraph horizontal wipe/sweep
        masterTl.fromTo(description,
          {
            x: xDesc,
            opacity: 0,
            clipPath: "inset(0 100% 0 0)",
          },
          {
            x: 0,
            opacity: 1,
            clipPath: "inset(0 0% 0 0)",
            ease: "power2.inOut",
          },
          0.5
        );

        // ==================================================
        // PHASE 3 — DETAILS EXPLODE INTO POSITION (Starts at 0.65)
        // ==================================================
        
        // Floating icons enter from three directions
        masterTl.fromTo(codeEntrance,
          { x: codeX, y: codeY, rotate: codeRot, scale: 0, opacity: 0 },
          { x: 0, y: 0, rotate: 0, scale: 1, opacity: 1, ease: "power2.out" },
          0.65
        );

        masterTl.fromTo(zapEntrance,
          { x: zapX, y: zapY, rotate: zapRot, scale: 0, opacity: 0 },
          { x: 0, y: 0, rotate: 0, scale: 1, opacity: 1, ease: "power2.out" },
          0.68
        );

        masterTl.fromTo(chartEntrance,
          { x: chartX, y: chartY, rotate: chartRot, scale: 0, opacity: 0 },
          { x: 0, y: 0, rotate: 0, scale: 1, opacity: 1, ease: "power2.out" },
          0.71
        );

        // Stats blocks stagger entrance
        if (statBlocks.length > 0) {
          masterTl.fromTo(statBlocks,
            {
              y: 100,
              opacity: 0,
              scale: 0.55,
              rotateX: -35,
              transformPerspective: 800,
            },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              rotateX: 0,
              stagger: 0.12,
              ease: "power3.out",
            },
            0.65
          );

          // Counter animations start after stat blocks become visibly present
          statBlocks.forEach((block, index) => {
            const dtElement = block.querySelector("dt");
            if (dtElement) {
              const originalText = dtElement.textContent || "";
              const match = originalText.match(/^(\d+)(\+)?$/);
              const startTime = 0.78 + index * 0.12;
              
              if (match) {
                const targetValue = parseInt(match[1], 10);
                const suffix = match[2] || "";
                
                const counterObj = { val: 0 };
                masterTl.to(counterObj, {
                  val: targetValue,
                  duration: 0.8,
                  ease: "power1.out",
                  onUpdate: () => {
                    dtElement.textContent = Math.floor(counterObj.val) + suffix;
                  }
                }, startTime);
              } else {
                masterTl.fromTo(dtElement,
                  { scale: 0.8, opacity: 0 },
                  { scale: 1, opacity: 1, ease: "power2.out" },
                  startTime
                );
              }
            }
          });
        }

        // ==================================================
        // PHASE 4 — RIGHT CARD DETAILS COMPLETE (Starts at 0.95)
        // ==================================================
        
        // Checklist rows cascade
        if (checkRows.length > 0) {
          masterTl.fromTo(checkRows,
            {
              x: 100,
              opacity: 0,
            },
            {
              x: 0,
              opacity: 1,
              stagger: 0.1,
              ease: "power2.out",
            },
            0.95
          );
        }

        // Checklist check circles rotate and scale
        if (checkIcons.length > 0) {
          masterTl.fromTo(checkIcons,
            {
              scale: 0,
              rotate: -180,
            },
            {
              scale: 1,
              rotate: 0,
              stagger: 0.1,
              ease: "back.out(1.5)",
            },
            1.0
          );
        }

        // CTA link arrives last
        if (cta) {
          masterTl.fromTo(cta,
            {
              y: 70,
              opacity: 0,
              scale: 0.65,
            },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              ease: "back.out(1.3)",
            },
            1.15
          );
        }
      });
      
      // Separate ScrollTrigger for parallax (runs after the main entrance range)
      ScrollTrigger.create({
        trigger: root,
        start: "top 48%",
        end: "bottom top",
        scrub: true,
        animation: gsap.timeline()
          .to(portraitWrapper, { y: -25, ease: "none" })
          .to(strengthsCard, { y: -15, ease: "none" }, 0)
          .to(root.querySelector(".about-copy"), { y: 15, ease: "none" }, 0)
      });
      
      // Infinite floating loop for badges (runs independently of ScrollTrigger)
      gsap.to(codeFloat, {
        y: -6,
        duration: 3.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      
      gsap.to(zapFloat, {
        y: 7,
        duration: 3.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      
      gsap.to(chartFloat, {
        y: -5,
        duration: 4.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Infinite 3D rocking loop for portrait image (dynamic visual)
      gsap.to(portraitImage, {
        rotateY: 8,
        rotateX: -6,
        duration: 6.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Infinite drifting/pulsing loop for background glow
      gsap.to(root.querySelector(".about-portrait__glow"), {
        x: 18,
        y: -12,
        scale: 1.04,
        duration: 5.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Infinite slow vertical drift for background particles
      gsap.to(root.querySelectorAll(".about-portrait__particle"), {
        y: -10,
        stagger: {
          each: 0.8,
          repeat: -1,
          yoyo: true,
        },
        duration: 4,
        ease: "sine.inOut",
      });
      
    }, root);

    let cachedCenterX = 0;
    let cachedCenterY = 0;
    let lastRectUpdate = 0;

    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (typeof window === "undefined" || window.innerWidth < 1024 || reducedMotion) return;
      const wrapper = portraitWrapperRef.current;
      if (!wrapper) return;

      const now = performance.now();
      if (now - lastRectUpdate > 500 || cachedCenterX === 0) {
        const rect = wrapper.getBoundingClientRect();
        cachedCenterX = rect.left + rect.width / 2 + window.scrollX;
        cachedCenterY = rect.top + rect.height / 2 + window.scrollY;
        lastRectUpdate = now;
      }
      
      const dist = Math.hypot(e.pageX - cachedCenterX, e.pageY - cachedCenterY);
      const maxDist = 450;
      const proximity = Math.max(0, 1 - dist / maxDist);
      
      const electricityEl = wrapper.querySelector(".portrait-electricity-glow-layer");
      if (electricityEl) {
        const opacity = 0.3 + proximity * 0.55; 
        const scale = 1 + proximity * 0.025;
        
        gsap.to(electricityEl, {
          opacity: opacity,
          scale: scale,
          duration: 0.35,
          ease: "power1.out",
          overwrite: "auto"
        });
      }
    };

    window.addEventListener("mousemove", handleGlobalMouseMove, { passive: true });

    return () => {
      ctx.revert();
      window.removeEventListener("mousemove", handleGlobalMouseMove);
    };
  }, [reducedMotion]);

  return (
    <section ref={rootRef} id="about" className="about-section" aria-labelledby="about-title">
      <Container>
        <div className="about-layout">
          <div ref={portraitWrapperRef} style={{ willChange: "transform, opacity" }}>
            <div
              className="about-portrait"
              role="img"
              aria-label="Portrait placeholder for Vansh Jain"
            >
              <div className="about-portrait__glow" />
              <div ref={orbitOneRef} className="about-portrait__orbit about-portrait__orbit--one" style={{ willChange: "transform, opacity" }} />
              <div ref={orbitTwoRef} className="about-portrait__orbit about-portrait__orbit--two" style={{ willChange: "transform, opacity" }} />
              <span className="about-portrait__particle about-portrait__particle--one" />
              <span className="about-portrait__particle about-portrait__particle--two" />
              <span className="about-portrait__particle about-portrait__particle--three" />
              
              <div ref={portraitImageRef} className="portrait-placeholder" style={{ willChange: "clip-path" }}>
                <Image
                  src="/images/vansh-portrait-new.png"
                  alt="Vansh Jain"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  priority
                  unoptimized
                  className="portrait-placeholder__image"
                />
              </div>

              {/* Electric charge effect wrapper */}
              {!reducedMotion && (
                <svg
                  className="portrait-electricity portrait-electricity-glow-layer"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    left: "12%",
                    width: "72%",
                    height: "81%",
                    bottom: 0,
                    pointerEvents: "none",
                    zIndex: 5,
                    overflow: "visible",
                    opacity: 0.3, // base opacity, GSAP will handle boosts on proximity
                    transformOrigin: "center center",
                  }}
                >
                  <defs>
                    <filter id="cyan-glow" x="-40%" y="-40%" width="180%" height="180%">
                      <feGaussianBlur stdDeviation="1.5" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  {lightningSegments.map((seg) => {
                    return (
                      <g
                        key={seg.id}
                        className={`lightning-arc lightning-arc--${seg.id}`}
                      >
                        {/* 1. Soft Blurred Glow layer behind the core */}
                        <path
                          d={seg.coreD}
                          fill="none"
                          stroke="#00ffc3"
                          strokeWidth="5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          opacity="0.18"
                          filter="url(#cyan-glow)"
                        />

                        {/* 2. Thin Sharp Electric Core (Near White Cyan) */}
                        <path
                          d={seg.coreD}
                          fill="none"
                          stroke="#bafff0"
                          strokeWidth="1.1"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          filter="url(#cyan-glow)"
                        />

                        {/* 3. Secondary Branch (if exists) */}
                        {seg.branchD && (
                          <>
                            {/* Branch Glow */}
                            <path
                              d={seg.branchD}
                              fill="none"
                              stroke="#5fffd0"
                              strokeWidth="3.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              opacity="0.12"
                              filter="url(#cyan-glow)"
                            />
                            {/* Branch Core */}
                            <path
                              d={seg.branchD}
                              fill="none"
                              stroke="#bafff0"
                              strokeWidth="0.7"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              filter="url(#cyan-glow)"
                            />
                          </>
                        )}
                      </g>
                    );
                  })}
                </svg>
              )}
              
              {/* Code Icon Wrapper */}
              <div ref={codeEntranceRef} className="portrait-badge-wrapper portrait-badge-wrapper--code">
                <div ref={codeFloatRef} className="portrait-badge">
                  <Code2 aria-hidden="true" />
                </div>
              </div>
              
              {/* Lightning Icon Wrapper */}
              <div ref={zapEntranceRef} className="portrait-badge-wrapper portrait-badge-wrapper--zap">
                <div ref={zapFloatRef} className="portrait-badge">
                  <Zap aria-hidden="true" />
                </div>
              </div>
              
              {/* Chart Icon Wrapper */}
              <div ref={chartEntranceRef} className="portrait-badge-wrapper portrait-badge-wrapper--chart">
                <div ref={chartFloatRef} className="portrait-badge">
                  <BarChart3 aria-hidden="true" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="about-content">
            <div className="about-copy">
              <p ref={labelRef} className="eyebrow" style={{ willChange: "transform, opacity, letter-spacing" }}>About Me</p>
              <h2 id="about-title" style={{ perspective: 800 }}>
                <span className="heading-line-container">
                  <span ref={headingLine1Ref} className="heading-line" style={{ willChange: "transform" }}>Turning Ideas Into</span>
                </span>
                <span className="heading-line-container">
                  <span ref={headingLine2Ref} className="heading-line" style={{ willChange: "transform" }}>Real Products</span>
                </span>
              </h2>
              <p ref={descriptionRef} className="about-description" style={{ willChange: "transform, opacity" }}>I&apos;m a Computer Science student and Full Stack Developer who enjoys turning real-world problems into scalable digital products. I build AI-powered platforms, collaborative web applications, and user-focused experiences using modern web technologies.</p>
              <dl ref={statsRef} className="about-stats" style={{ willChange: "transform, opacity" }}>
                {aboutStats.map((stat) => (
                  <div key={stat.label}>
                    <dt>{stat.value}</dt>
                    <dd>{stat.label}</dd>
                  </div>
                ))}
              </dl>
            </div>
            
            <aside ref={highlightsCardRef} className="about-highlights" aria-label="Developer highlights" style={{ willChange: "transform, opacity" }}>
              <ul>
                {highlights.map((highlight) => (
                  <li key={highlight} style={{ willChange: "transform, opacity" }}>
                    <Check aria-hidden="true" style={{ willChange: "transform" }} />
                    {highlight}
                  </li>
                ))}
              </ul>
              <a className="about-contact-link" href="#contact" style={{ willChange: "transform, opacity" }}>
                Let&apos;s Work Together <ChevronRight aria-hidden="true" />
              </a>
            </aside>
          </div>
        </div>
      </Container>
    </section>
  );
}

