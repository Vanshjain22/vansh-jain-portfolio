import { Container } from "@/components/layout/Container";

export function SelectedWork() {
  return (
    <section id="projects" className="section section-surface" aria-labelledby="work-title">
      <Container>
        <p className="eyebrow">Featured Work</p>
        <h2 id="work-title">Selected Work</h2>
      </Container>
    </section>
  );
}
