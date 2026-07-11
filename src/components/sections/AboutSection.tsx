import { Container } from "@/components/layout/Container";

export function AboutSection() {
  return (
    <section id="about" className="section section-base" aria-labelledby="about-title">
      <Container>
        <p className="eyebrow">About Me</p>
        <h2 id="about-title">Turning Ideas Into <span>Real Products</span></h2>
      </Container>
    </section>
  );
}
