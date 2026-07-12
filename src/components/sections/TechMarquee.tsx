import { Container } from "@/components/layout/Container";
import { Atom, Braces, Database, GitBranch, Hexagon, Server, Triangle, Wind, type LucideIcon } from "lucide-react";
import { technologies, type TechnologyIcon } from "@/data/technologies";

const iconMap: Record<TechnologyIcon, LucideIcon> = { atom: Atom, triangle: Triangle, braces: Braces, hexagon: Hexagon, server: Server, leaf: Database, wind: Wind, "git-branch": GitBranch, database: Database };

export function TechMarquee() {
  const marqueeItems = [...technologies, ...technologies];

  return (
    <section id="skills" className="tech-marquee-section" aria-labelledby="tech-title">
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
