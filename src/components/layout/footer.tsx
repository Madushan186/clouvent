"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { Logo } from "@/components/ui/logo";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Footer — Studio White (#FAF9F7) surface.
 *
 * One restrained scroll-reveal on the whole footer (not a per-column
 * stagger — this is the page's administrative close, not a moment
 * that warrants drama). Matches the "Subtle" scroll-reveal tier: small
 * y-offset, ~350ms, once, reduced-motion safe. Previously the one
 * section on every page with zero motion at all.
 * HOMEPAGE_DESIGN_SPEC.md §12 compliance:
 *
 * - Secondary-role logo/brandmark (quieter than header, spec §12)
 * - Essential nav: Work / Services / About / Contact
 * - Direct email as visible plain text — [NEEDS INPUT], shown as placeholder
 * - Legal links: Privacy Policy, Terms
 * - Minimal business info — entity name, ABN, base location all [NEEDS INPUT];
 *   rendered as honest placeholders, never fabricated
 * - Social links: none — no confirmed live accounts yet (spec §12)
 * - BUILD → MANAGE → GROW echo — reinforces brand architecture at close
 * - "Elegant rather than overloaded" (spec §12)
 *
 * The page closes on Studio White (light) after the dark Enquiry CTA above.
 * This is intentional — not a mistake. The dark CTA is the emotional close;
 * the light footer is the administrative/identity close.
 *
 * Logo: black on Studio White — native brand application. No invert filter.
 */

const nav = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const legal = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms" },
];

export function Footer() {
  const reduce = useReducedMotion();

  return (
    <motion.footer
      initial={reduce ? false : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: reduce ? 0 : 0.35, ease: EASE }}
      className="bg-background-subtle border-t border-border-subtle"
    >

      {/* Main footer body */}
      <div className="mx-auto w-full max-w-(--width-wide) px-(--spacing-gutter) py-(--spacing-section-y)">
        <div className="grid grid-cols-1 gap-(--spacing-section-y) md:grid-cols-3">

          {/* ── Column 1: Identity ── */}
          <div className="flex flex-col gap-6">
            <Link href="/" aria-label="Clouvent home" className="flex items-center">
              <Logo variant="footer" />
            </Link>

            <p className="font-sans text-body text-foreground-muted leading-[1.65] max-w-[30ch]">
              Premium digital presence studio for photographers and visual businesses.
            </p>

            {/* BUILD → MANAGE → GROW echo — brand architecture close */}
            <div className="flex flex-col gap-1">
              {(["Build.", "Manage.", "Grow."] as const).map((word) => (
                <span
                  key={word}
                  className="font-display text-[1.125rem] leading-tight text-foreground-muted hover:text-foreground transition-colors duration-[120ms] cursor-default"
                >
                  {word}
                </span>
              ))}
            </div>
          </div>

          {/* ── Column 2: Navigation ── */}
          <div className="flex flex-col gap-4">
            <p className="font-sans text-small font-semibold uppercase tracking-[0.08em] text-foreground-muted/60">
              Navigation
            </p>
            <nav aria-label="Footer navigation" className="flex flex-col gap-3">
              {nav.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-sans text-body text-foreground-muted transition-colors duration-[120ms] hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* ── Column 3: Contact ── */}
          <div className="flex flex-col gap-4">
            <p className="font-sans text-small font-semibold uppercase tracking-[0.08em] text-foreground-muted/60">
              Get in touch
            </p>

            <div className="flex flex-col gap-3">
              {/*
               * Email — [NEEDS INPUT].
               * Shown as a placeholder so the layout is not broken.
               * Replace with the confirmed address before launch.
               */}
              <a
                href="mailto:clouventsolutions@gmail.com"
                className="font-sans text-body text-foreground-muted transition-colors duration-[120ms] hover:text-accent"
              >
                clouventsolutions@gmail.com
              </a>

              <Link
                href="/contact"
                className="font-sans text-body text-foreground-muted transition-colors duration-[120ms] hover:text-foreground"
              >
                Start a project
              </Link>
            </div>
          </div>

        </div>
      </div>

      {/* Legal bar */}
      <div className="border-t border-border-subtle">
        <div className="mx-auto flex w-full max-w-(--width-wide) flex-col items-start gap-4 px-(--spacing-gutter) py-5 md:flex-row md:items-center md:justify-between">

          {/* Business details — all [NEEDS INPUT], shown as honest placeholders */}
          <p className="font-sans text-small text-foreground-muted/50">
            {/* Entity name, ABN, location — replace with verified details before launch */}
            Clouvent
            <span className="mx-1.5 opacity-40">·</span>
            ABN [NEEDS INPUT]
            <span className="mx-1.5 opacity-40">·</span>
            Australia
          </p>

          {/* Legal links */}
          <div className="flex gap-5">
            {legal.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-sans text-small text-foreground-muted/50 transition-colors duration-[120ms] hover:text-foreground-muted"
              >
                {link.label}
              </Link>
            ))}
          </div>

        </div>
      </div>

    </motion.footer>
  );
}
