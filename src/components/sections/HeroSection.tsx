import { Container } from "@/components/layout/Container";
import { HeroVisual } from "@/components/hero/HeroVisual";
import { ArrowRight, ArrowUpRight, Mouse } from "lucide-react";

export function HeroSection() {
  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
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
