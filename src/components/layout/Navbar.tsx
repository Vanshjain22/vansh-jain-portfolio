"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Download, Menu, Moon, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Container } from "./Container";

const navigation = [
  { label: "Home", href: "#home", id: "home" },
  { label: "Projects", href: "#projects", id: "projects" },
  { label: "About", href: "#about", id: "about" },
  { label: "Skills", href: "#skills", id: "skills" },
  { label: "Contact", href: "#contact", id: "contact" },
] as const;

type Theme = "dark" | "light";

export function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("vansh-portfolio-theme") as Theme | null;
    const systemTheme: Theme = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
    const resolvedTheme = savedTheme === "light" || savedTheme === "dark" ? savedTheme : systemTheme;

    document.documentElement.dataset.theme = resolvedTheme;
    if (resolvedTheme !== theme) {
      const frame = window.requestAnimationFrame(() => setTheme(resolvedTheme));
      return () => window.cancelAnimationFrame(frame);
    }
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = navigation
      .map(({ id }) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry) setActiveSection(visibleEntry.target.id);
      },
      { rootMargin: "-22% 0px -62% 0px", threshold: [0, 0.1, 0.25, 0.5] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };
    const closeOnDesktop = () => {
      if (window.innerWidth >= 900) setIsMenuOpen(false);
    };

    window.addEventListener("keydown", handleEscape);
    window.addEventListener("resize", closeOnDesktop);
    return () => {
      window.removeEventListener("keydown", handleEscape);
      window.removeEventListener("resize", closeOnDesktop);
    };
  }, []);

  const toggleTheme = () => {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem("vansh-portfolio-theme", nextTheme);
  };

  return (
    <motion.header
      className={`site-header${isScrolled ? " is-scrolled" : ""}`}
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Container className="navbar">
        <Link href="#home" className="brand" aria-label="Vansh Jain home">
          <span className="brand-mark">VJ</span>
          <span>Vansh Jain</span>
        </Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navigation.map(({ label, href, id }) => (
            <Link key={id} className={activeSection === id ? "is-active" : ""} href={href} aria-current={activeSection === id ? "page" : undefined}>
              {label}
            </Link>
          ))}
        </nav>
        <div className="nav-actions">
          <span className="resume-link is-disabled" aria-disabled="true" title="Resume PDF will be available soon">
            Resume Coming Soon <Download aria-hidden="true" size={14} />
          </span>
          <button className="icon-button" type="button" onClick={toggleTheme} aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}>
            {theme === "dark" ? <Sun aria-hidden="true" size={18} /> : <Moon aria-hidden="true" size={18} />}
          </button>
          <button className="icon-button mobile-menu" type="button" onClick={() => setIsMenuOpen((open) => !open)} aria-controls="mobile-navigation" aria-expanded={isMenuOpen} aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}>
            {isMenuOpen ? <X aria-hidden="true" size={19} /> : <Menu aria-hidden="true" size={19} />}
          </button>
        </div>
      </Container>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav id="mobile-navigation" className="mobile-navigation" aria-label="Mobile navigation" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.24, ease: "easeOut" }}>
            <Container className="mobile-navigation-inner">
              {navigation.map(({ label, href, id }) => (
                <Link key={id} className={activeSection === id ? "is-active" : ""} href={href} onClick={() => setIsMenuOpen(false)}>
                  {label}
                </Link>
              ))}
              <span className="mobile-resume-link is-disabled" aria-disabled="true" title="Resume PDF will be available soon">
                Resume Coming Soon <Download aria-hidden="true" size={15} />
              </span>
            </Container>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
