"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import Link from "next/link";
import { Logo } from "@/components/ui/logo";

const navLinks = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
];

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Header — light-native sticky nav.
 * tasteskill: single-line at desktop, height ≤ 80px (64px), Motion mount stagger.
 *
 * Scroll behaviour: transparent over hero (Cloud Ivory page body is the bg),
 * transitions to bg-background + border-b once hero exits viewport.
 * Uses IntersectionObserver on #hero — NO window.addEventListener('scroll').
 *
 * CTA: "Enquire" — ONE contact-intent label across all nav occurrences. PASS.
 * Mobile menu: full-screen overlay with Motion AnimatePresence slide.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLButtonElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;
    const obs = new IntersectionObserver(
      ([e]) => setScrolled(!e.isIntersecting),
      { rootMargin: "-1px 0px 0px 0px" }
    );
    obs.observe(hero);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (menuOpen) {
      closeRef.current?.focus();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && menuOpen) {
        setMenuOpen(false);
        menuRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [menuOpen]);

  return (
    <header
      className={`sticky top-0 z-50 h-16 flex items-center transition-[background-color,border-color,box-shadow] duration-(--duration-standard) ease-(--ease-standard) ${
        scrolled
          ? "bg-background border-b border-border-subtle shadow-[0_1px_0_var(--color-border-subtle)]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex w-full max-w-(--width-wide) items-center justify-between px-(--spacing-gutter)">

        {/* Logo — fades in on mount */}
        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <Link href="/" aria-label="Clouvent home" className="flex items-center">
            <Logo priority />
          </Link>
        </motion.div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Primary">
          {navLinks.map((link, i) => (
            <motion.div
              key={link.href}
              initial={reduce ? false : { opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: reduce ? 0 : 0.08 + i * 0.06, ease: EASE }}
            >
              <Link
                href={link.href}
                className="font-sans text-small text-foreground transition-colors duration-(--duration-fast) hover:text-accent"
              >
                {link.label}
              </Link>
            </motion.div>
          ))}

          <motion.div
            initial={reduce ? false : { opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: reduce ? 0 : 0.26, ease: EASE }}
          >
            <Link
              href="/contact"
              className="inline-flex items-center justify-center font-sans text-small font-medium rounded-(--radius-control) bg-accent text-foreground px-5 py-2 transition-colors duration-(--duration-standard) hover:bg-accent-hover active:scale-[0.98]"
            >
              Enquire
            </Link>
          </motion.div>
        </nav>

        {/* Mobile trigger */}
        <button
          ref={menuRef}
          type="button"
          onClick={() => setMenuOpen(true)}
          className="font-sans text-small text-foreground md:hidden"
          aria-haspopup="true"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
        >
          Menu
        </button>
      </div>

      {/* Mobile overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: EASE }}
            className="fixed inset-0 z-50 flex flex-col bg-background"
          >
            <div className="flex items-center justify-between px-(--spacing-gutter) h-16 border-b border-border-subtle">
              <Link href="/" aria-label="Clouvent home" onClick={() => setMenuOpen(false)}>
                <Logo />
              </Link>
              <button
                ref={closeRef}
                type="button"
                onClick={() => setMenuOpen(false)}
                className="font-sans text-small text-foreground"
              >
                Close
              </button>
            </div>

            <nav
              className="flex flex-1 flex-col items-start justify-center gap-8 px-(--spacing-gutter)"
              aria-label="Primary"
            >
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={reduce ? false : { opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: reduce ? 0 : i * 0.07, ease: EASE }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="font-display text-h2 text-foreground hover:text-accent transition-colors duration-(--duration-fast)"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <Link
                href="/contact"
                onClick={() => setMenuOpen(false)}
                className="inline-flex items-center justify-center font-sans text-body font-medium rounded-(--radius-control) bg-accent text-foreground px-7 py-3.5 transition-colors duration-(--duration-standard) hover:bg-accent-hover"
              >
                Enquire
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
