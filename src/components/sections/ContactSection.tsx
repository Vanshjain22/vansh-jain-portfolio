import { Container } from "@/components/layout/Container";

export function ContactSection() {
  return (
    <section id="contact" className="section contact-section" aria-labelledby="contact-title">
      <Container>
        <div className="contact-placeholder">
          <p className="eyebrow">Have an idea?</p>
          <h2 id="contact-title">Let&apos;s Build Something <span>Great.</span></h2>
        </div>
      </Container>
    </section>
  );
}
