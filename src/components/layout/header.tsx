"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const links = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
];

/**
 * Sticky nav gets its own solid light background once the hero has
 * scrolled out of view (IntersectionObserver on #hero, set in page.tsx).
 * This is deliberate: it means the black-only logo asset works in every
 * scroll position without needing a white/reversed variant, which doesn't
 * exist yet (see Phase 3 logo audit) — reported as the resolution, not an
 * open gap.
 */
export function Header() {
  const [scrolledPastHero, setScrolledPastHero] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;
    const observer = new IntersectionObserver(([entry]) => setScrolledPastHero(!entry.isIntersecting), {
      rootMargin: "-1px 0px 0px 0px",
    });
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (menuOpen) {
      closeButtonRef.current?.focus();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && menuOpen) {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-(--duration-standard) ease-(--ease-standard) ${
        scrolledPastHero ? "bg-background border-b border-border-subtle" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex w-full max-w-(--width-wide) items-center justify-between px-(--spacing-gutter) py-4">
        <Link href="/" className="flex items-center" aria-label="Clouvent home">
          <Image src="/logo.png" alt="Clouvent" width={160} height={40} priority className="h-8 w-auto" />
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-sans text-small text-foreground transition-colors duration-(--duration-fast) hover:text-accent"
            >
              {link.label}
            </Link>
          ))}
          <Button href="/contact" variant="primary" className="px-5 py-2 text-small">
            Enquire
          </Button>
        </nav>

        <button
          ref={menuButtonRef}
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

      {menuOpen && (
        <div
          id="mobile-nav"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="fixed inset-0 z-50 flex flex-col bg-background"
        >
          <div className="flex items-center justify-between px-(--spacing-gutter) py-4">
            <Link href="/" className="flex items-center" aria-label="Clouvent home" onClick={() => setMenuOpen(false)}>
              <Image src="/logo.png" alt="Clouvent" width={160} height={40} className="h-8 w-auto" />
            </Link>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={() => setMenuOpen(false)}
              className="font-sans text-small text-foreground"
            >
              Close
            </button>
          </div>

          <nav className="flex flex-1 flex-col items-start justify-center gap-8 px-(--spacing-gutter)" aria-label="Primary">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="font-display text-h2 text-foreground"
              >
                {link.label}
              </Link>
            ))}
            <Button href="/contact" variant="primary" onClick={() => setMenuOpen(false)}>
              Enquire
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
