import { Container } from "@/components/layout/Container";
import { BarChart3, Check, ChevronRight, Code2, Zap } from "lucide-react";

const aboutStats = [{ value: "10+", label: "Projects" }, { value: "2+", label: "Years of Coding" }, { value: "5+", label: "Technologies" }, { value: "100%", label: "Dedication" }];
const highlights = ["Clean, efficient and scalable code", "User-focused development approach", "Strong problem-solving skills", "Passionate about AI & SaaS", "Always learning, always building"];

export function AboutSection() {
  return (
    <section id="about" className="about-section" aria-labelledby="about-title">
      <Container>
        <div className="about-layout">
          <div className="about-portrait" role="img" aria-label="Portrait placeholder for Vansh Jain">
            <div className="about-portrait__glow" /><div className="about-portrait__orbit about-portrait__orbit--one" /><div className="about-portrait__orbit about-portrait__orbit--two" />
            <span className="about-portrait__particle about-portrait__particle--one" /><span className="about-portrait__particle about-portrait__particle--two" /><span className="about-portrait__particle about-portrait__particle--three" />
            <div className="portrait-placeholder"><span>VJ</span></div>
            <div className="portrait-badge portrait-badge--code"><Code2 aria-hidden="true" /></div><div className="portrait-badge portrait-badge--zap"><Zap aria-hidden="true" /></div><div className="portrait-badge portrait-badge--chart"><BarChart3 aria-hidden="true" /></div>
          </div>
          <div className="about-content">
            <div className="about-copy">
              <p className="eyebrow">About Me</p><h2 id="about-title">Turning Ideas Into <span>Real Products</span></h2>
              <p className="about-description">I&apos;m a Computer Science student and Full Stack Developer who enjoys turning real-world problems into scalable digital products. I build AI-powered platforms, collaborative web applications, and user-focused experiences using modern web technologies.</p>
              <dl className="about-stats">{aboutStats.map((stat) => <div key={stat.label}><dt>{stat.value}</dt><dd>{stat.label}</dd></div>)}</dl>
            </div>
            <aside className="about-highlights" aria-label="Developer highlights"><ul>{highlights.map((highlight) => <li key={highlight}><Check aria-hidden="true" />{highlight}</li>)}</ul><a className="about-contact-link" href="#contact">Let&apos;s Work Together <ChevronRight aria-hidden="true" /></a></aside>
          </div>
        </div>
      </Container>
    </section>
  );
}
