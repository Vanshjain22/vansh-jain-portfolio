import { portfolio } from "@/data/portfolio";
import { Container } from "./Container";

export function Footer() {
  return (
    <footer className="footer">
      <Container className="footer-content">
        <p>© 2026 {portfolio.name}. All rights reserved.</p>
        <p>Built with care using Next.js &amp; Tailwind CSS</p>
        <p>Designed to make an impact.</p>
      </Container>
    </footer>
  );
}
