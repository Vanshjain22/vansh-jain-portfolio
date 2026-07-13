"use client";

import { portfolio } from "@/data/portfolio";
import { Container } from "@/components/layout/Container";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Github, Mail, Linkedin } from "lucide-react";

const socialLinks = [
  { label: "GitHub", url: portfolio.githubUrl, icon: Github },
  { label: "LinkedIn", url: portfolio.linkedinUrl, icon: Linkedin },
  { label: "Email", url: portfolio.email ? `mailto:${portfolio.email}` : "", icon: Mail },
].filter((link) => Boolean(link.url));

export function ContactSection() {
  const reducedMotion = useReducedMotion() ?? false;
  const reveal = reducedMotion 
    ? {} 
    : { 
        initial: { opacity: 0, y: 24 }, 
        whileInView: { opacity: 1, y: 0 }, 
        viewport: { once: true, amount: 0.35 } 
      };

  return (
    <section id="contact" className="contact-section" aria-labelledby="contact-title">
      <Container>
        <motion.div 
          className="contact-cta" 
          {...reveal}
          transition={{ duration: 0.75, ease: "easeOut" }}
        >
          <div className="contact-copy">
            <p className="eyebrow">Have an idea?</p>
            <h2 id="contact-title">Let&apos;s Build <br />Something <span>Great.</span></h2>
          </div>
          <div className="contact-visual" aria-hidden="true">
            <span className="contact-orbit contact-orbit--one" />
            <span className="contact-orbit contact-orbit--two" />
            <span className="contact-orbit contact-orbit--three" />
            <span className="contact-particle contact-particle--one" />
            <span className="contact-particle contact-particle--two" />
            <span className="contact-node contact-node--one" />
            <span className="contact-node contact-node--two" />
          </div>
          <div className="contact-actions">
            {portfolio.email ? (
              <a className="contact-button" href={`mailto:${portfolio.email}`}>
                Get In Touch <ArrowRight aria-hidden="true" />
              </a>
            ) : (
              <span className="contact-button is-disabled" aria-disabled="true">
                Get In Touch <ArrowRight aria-hidden="true" />
              </span>
            )}
            {socialLinks.length > 0 && (
              <div className="contact-socials">
                {socialLinks.map(({ label, url, icon: Icon }) => (
                  <a 
                    key={label} 
                    href={url} 
                    className="social-button" 
                    aria-label={label} 
                    target={url.startsWith("http") ? "_blank" : undefined} 
                    rel={url.startsWith("http") ? "noopener noreferrer" : undefined}
                  >
                    <Icon aria-hidden="true" />
                  </a>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
