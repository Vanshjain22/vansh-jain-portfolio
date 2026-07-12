"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Download, Menu, Moon, Sun, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Container } from "./Container";

const navigation = [
  { label: "Home", href: "#home", id: "home" },
  { label: "Projects", href: "#projects", id: "projects" },
  { label: "About", href: "#about", id: "about" },
  { label: "Skills", href: "#skills", id: "skills" },
  { label: "Contact", href: "#contact", id: "contact" },
] as const;

type NavId = (typeof navigation)[number]["id"];
type Theme = "dark" | "light";

const NAVBAR_HEIGHT = 88;

export function Navbar() {
  const [activeSection, setActiveSection] = useState<NavId>("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>("dark");
  // Guard: prevents scroll-observer from overriding a click-initiated scroll
  const isClickNavigating = useRef(false);

  // ── Theme init ─────────────────────────────────────────────────────────
  useEffect(() => {
    const saved = window.localStorage.getItem("vansh-portfolio-theme") as Theme | null;
    const system: Theme = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
    const resolved = saved === "light" || saved === "dark" ? saved : system;
    document.documentElement.dataset.theme = resolved;
    if (resolved !== theme) {
      const frame = window.requestAnimationFrame(() => setTheme(resolved));
      return () => window.cancelAnimationFrame(frame);
    }
  }, [theme]);

  // ── Scroll shadow ──────────────────────────────────────────────────────
  useEffect(() => {
    const handle = () => setIsScrolled(window.scrollY > 40);
    handle();
    window.addEventListener("scroll", handle, { passive: true });
    return () => window.removeEventListener("scroll", handle);
  }, []);

  // ── Active section tracking + passive hash replaceState ────────────────
  useEffect(() => {
    const sectionEls = navigation
      .map(({ id }) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (!sectionEls.length) return;

    // Scroll to section from URL hash on initial load + set client active section state
    const initId = (window.location.hash.slice(1) || "home") as NavId;
    if (navigation.some((n) => n.id === initId)) {
      requestAnimationFrame(() => {
        setActiveSection(initId);
      });
      if (initId !== "home") {
        const target = document.getElementById(initId);
        if (target) {
          requestAnimationFrame(() => {
            window.scrollTo({
              top: target.getBoundingClientRect().top + window.scrollY - NAVBAR_HEIGHT,
              behavior: "smooth",
            });
          });
        }
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (isClickNavigating.current) return;
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          const id = visible.target.id as NavId;
          setActiveSection(id);
          const hash = id === "home" ? "" : `#${id}`;
          const currentHash = window.location.hash;
          if (currentHash !== hash && !(id === "home" && currentHash === "")) {
            history.replaceState(null, "", hash || window.location.pathname);
          }
        }
      },
      { rootMargin: "-22% 0px -62% 0px", threshold: [0, 0.1, 0.25, 0.5] },
    );

    sectionEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // ── Keyboard / resize ─────────────────────────────────────────────────
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setIsMenuOpen(false); };
    const onResize = () => { if (window.innerWidth >= 900) setIsMenuOpen(false); };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => { window.removeEventListener("keydown", onKey); window.removeEventListener("resize", onResize); };
  }, []);

  // ── Click navigation: smooth scroll with navbar offset ─────────────────
  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, id: NavId) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (!target) return;
    setIsMenuOpen(false);
    setActiveSection(id);
    isClickNavigating.current = true;
    const hash = id === "home" ? "" : `#${id}`;
    history.replaceState(null, "", hash || window.location.pathname);
    const top = target.getBoundingClientRect().top + window.scrollY - NAVBAR_HEIGHT;
    window.scrollTo({ top, behavior: "smooth" });
    // Re-enable observer after scroll animation completes (~900 ms)
    setTimeout(() => { isClickNavigating.current = false; }, 950);
  }, []);

  const toggleTheme = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    window.localStorage.setItem("vansh-portfolio-theme", next);
  };

  return (
    <motion.header
      className={`site-header${isScrolled ? " is-scrolled" : ""}`}
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Container className="navbar">
        <a href="#home" className="brand" aria-label="Vansh Jain — back to top" onClick={(e) => handleNavClick(e, "home")}>
          <span className="brand-mark">VJ</span>
          <span>Vansh Jain</span>
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navigation.map(({ label, href, id }) => (
            <a
              key={id}
              className={activeSection === id ? "is-active" : ""}
              href={href}
              aria-current={activeSection === id ? "page" : undefined}
              onClick={(e) => handleNavClick(e, id)}
            >
              {label}
            </a>
          ))}
        </nav>
        <div className="nav-actions">
          <a
            className="resume-link"
            href="/Vansh_Jain_Resume.pdf"
            download="Vansh_Jain_Resume.pdf"
          >
            Download Resume <Download aria-hidden="true" size={14} />
          </a>
          <button
            className="icon-button"
            type="button"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
          >
            {theme === "dark" ? <Sun aria-hidden="true" size={18} /> : <Moon aria-hidden="true" size={18} />}
          </button>
          <button
            className="icon-button mobile-menu"
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-controls="mobile-navigation"
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            {isMenuOpen ? <X aria-hidden="true" size={19} /> : <Menu aria-hidden="true" size={19} />}
          </button>
        </div>
      </Container>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            id="mobile-navigation"
            className="mobile-navigation"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
          >
            <Container className="mobile-navigation-inner">
              {navigation.map(({ label, href, id }) => (
                <a
                  key={id}
                  className={activeSection === id ? "is-active" : ""}
                  href={href}
                  onClick={(e) => handleNavClick(e, id)}
                >
                  {label}
                </a>
              ))}
              <a
                className="mobile-resume-link"
                href="/Vansh_Jain_Resume.pdf"
                download="Vansh_Jain_Resume.pdf"
              >
                Download Resume <Download aria-hidden="true" size={15} />
              </a>
            </Container>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

