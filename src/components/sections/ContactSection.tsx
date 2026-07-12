"use client";

import { portfolio } from "@/data/portfolio";
import { Container } from "@/components/layout/Container";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, GitFork, Mail, Network } from "lucide-react";

const socialLinks = [
  { label: "GitHub", url: portfolio.githubUrl, icon: GitFork },
  { label: "LinkedIn", url: portfolio.linkedinUrl, icon: Network },
  { label: "Email", url: portfolio.email ? `mailto:${portfolio.email}` : "", icon: Mail },
].filter((link) => Boolean(link.url));

export function ContactSection() {
  const reducedMotion = useReducedMotion();
  const reveal = reducedMotion ? {} : { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.35 } };

  return (
    <section id="contact" className="contact-section" aria-labelledby="contact-title">
      <Container>
        <motion.div className="contact-cta" {...reveal} transition={{ duration: 0.75, ease: "easeOut" }}>
          <motion.div className="contact-copy" {...reveal} transition={{ duration: 0.65, delay: 0.08, ease: "easeOut" }}>
            <p className="eyebrow">Have an idea?</p>
            <h2 id="contact-title">Let&apos;s Build <br />Something <span>Great.</span></h2>
          </motion.div>
          <motion.div className="contact-visual" aria-hidden="true" {...reveal} transition={{ duration: 0.8, delay: 0.16, ease: "easeOut" }}>
            <span className="contact-orbit contact-orbit--one" /><span className="contact-orbit contact-orbit--two" /><span className="contact-orbit contact-orbit--three" />
            <span className="contact-particle contact-particle--one" /><span className="contact-particle contact-particle--two" /><span className="contact-node contact-node--one" /><span className="contact-node contact-node--two" />
          </motion.div>
          <motion.div className="contact-actions" {...reveal} transition={{ duration: 0.65, delay: 0.26, ease: "easeOut" }}>
            {portfolio.email ? <a className="contact-button" href={`mailto:${portfolio.email}`}>Get In Touch <ArrowRight aria-hidden="true" /></a> : <span className="contact-button is-disabled" aria-disabled="true">Get In Touch <ArrowRight aria-hidden="true" /></span>}
            {socialLinks.length > 0 && <div className="contact-socials">{socialLinks.map(({ label, url, icon: Icon }) => <a key={label} href={url} className="social-button" aria-label={label} target={url.startsWith("http") ? "_blank" : undefined} rel={url.startsWith("http") ? "noopener noreferrer" : undefined}><Icon aria-hidden="true" /></a>)}</div>}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
