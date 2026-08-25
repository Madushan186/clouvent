"use client";

import { motion, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/container";
import Link from "next/link";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Services Overview — Cloud Ivory (#F3F0EB) surface.
 * HOMEPAGE_DESIGN_SPEC.md §9 compliance:
 *
 * Purpose: Translate belief (built by Trust) into a concrete engagement structure.
 * Visitor question: "What exactly would I be buying?"
 *
 * Layout: Horizontal sequence on desktop, vertical on mobile.
 * Continuity shown via a connecting fine rule running across the three services.
 * NOT three isolated cards.
 *
 * Content: One continuous editorial numbered sequence.
 * BUILD → MANAGE → GROW. Homepage depth only — full detail at /services.
 *
 * Typography: Large editorial numerals (Instrument Serif). Manrope labels/descriptions.
 *
 * Graphic elements:
 * - Editorial numbering is the primary graphic device (spec §9).
 * - The ascending-vector motif: one deliberate use per page, spent here
 *   on GROW (spec §16 — "most naturally accents GROW"). Implemented as a
 *   small copper SVG arrow pointing up-right, visible desktop only.
 * - No "Our Capabilities" eyebrow. The editorial numbers carry the section
 *   identity. Eyebrow budget is at ceiling (Hero + removed here). PASS.
 *
 * Motion: "Minimal fade-in per item on scroll." (spec §17). No stagger drama.
 * Mobile: Vertical stack. Connecting rule becomes a vertical line.
 *
 * CTA: Optional quiet text link "See how we work" → /services. Not a hard CTA.
 * The hard ask comes in Enquiry.
 */

const services = [
  {
    num: "01",
    name: "Build",
    role: "Design + development",
    description:
      "Distinctive websites built around your brand and the way your business actually works — not templates.",
    items: [
      "Web Design",
      "Web Development",
      "Responsive Architecture",
      "Performance Engineering",
    ],
    vector: false,
  },
  {
    num: "02",
    name: "Manage",
    role: "Maintenance + infrastructure",
    description:
      "Reliable ongoing management that keeps your digital presence secure, current and performing after launch day.",
    items: [
      "Website Maintenance",
      "Content Updates",
      "Analytics Monitoring",
      "Search Console",
    ],
    vector: false,
  },
  {
    num: "03",
    name: "Grow",
    role: "Visibility + optimisation",
    description:
      "Measurement and search visibility designed to help your digital presence create real business value.",
    items: [
      "SEO",
      "Paid Social",
      "Conversion Optimisation",
      "Content Strategy",
    ],
    vector: true, // ascending-vector graphic — single deliberate use per spec §16
  },
];

export function ServicesOverview() {
  const reduce = useReducedMotion();

  return (
    <section className="bg-background py-(--spacing-section-y)">
      <Container>

        {/* Section header — Instrument Serif, left-aligned, no eyebrow (budget exhausted) */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-(--spacing-content) border-b border-border-subtle pb-(--spacing-content)"
        >
          <h2 className="font-display text-h2 text-foreground leading-[1.15] max-w-[24ch]">
            One studio. Three disciplines. One ongoing relationship.
          </h2>
          <Link
            href="/services"
            className="group inline-flex items-center gap-1.5 font-sans text-small font-semibold uppercase tracking-[0.08em] text-foreground-muted hover:text-foreground transition-colors duration-(--duration-fast) shrink-0 self-end md:self-auto"
          >
            Full services
            <svg
              aria-hidden="true"
              width="12" height="12"
              viewBox="0 0 12 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform duration-(--duration-fast) group-hover:translate-x-0.5"
            >
              <path d="M1 6h10M7.5 2.5l3.5 3.5-3.5 3.5" />
            </svg>
          </Link>
        </motion.div>

        {/*
         * The three services.
         *
         * Desktop: CSS grid 3 columns, services sit side by side.
         * A fine horizontal rule runs across all three from the section header
         * above, communicating continuity across BUILD → MANAGE → GROW.
         *
         * Mobile: single column, stacked vertically.
         * Per spec §9: "Vertical stack, connecting rule becomes vertical."
         * The left border on each item creates the vertical rule on mobile.
         */}
        <div className="mt-(--spacing-section-y) grid grid-cols-1 md:grid-cols-3 gap-0 divide-y divide-border-subtle md:divide-y-0 md:divide-x md:divide-border-subtle">
          {services.map((s, i) => (
            <motion.div
              key={s.num}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: reduce ? 0 : i * 0.09, ease: EASE }}
              className="group relative flex flex-col gap-5 pt-(--spacing-content) pb-(--spacing-content) md:px-(--spacing-gutter) first:md:pl-0 last:md:pr-0"
            >
              {/* Number — editorial, Instrument Serif, muted by default */}
              <div className="flex items-start justify-between">
                <span className="font-display text-[3.5rem] leading-none text-foreground/20 select-none transition-colors duration-(--duration-standard) group-hover:text-foreground/40">
                  {s.num}
                </span>

                {/*
                 * Ascending vector — one deliberate use per page (spec §16).
                 * Only on GROW (s.vector === true).
                 * A copper SVG arrow pointing up-right — controlled, precise.
                 * Reduced-motion: visible but not animated.
                 */}
                {s.vector && (
                  <svg
                    aria-hidden="true"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="var(--color-accent)"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mt-1 opacity-60 group-hover:opacity-100 transition-opacity duration-(--duration-standard)"
                  >
                    <path d="M4 16 16 4M16 4H8M16 4v8" />
                  </svg>
                )}
              </div>

              {/* Service name — Instrument Serif, display role */}
              <div>
                <h3 className="font-display text-h3 text-foreground leading-[1.2] transition-transform duration-(--duration-standard) ease-(--ease-standard) group-hover:translate-x-0.5">
                  {s.name}
                </h3>
                {/* Role — Manrope, copper accent, small */}
                <p className="mt-1 font-sans text-small font-semibold uppercase tracking-[0.08em] text-accent">
                  {s.role}
                </p>
              </div>

              {/* Description — homepage depth */}
              <p className="font-sans text-body leading-[1.65] text-foreground-muted">
                {s.description}
              </p>

              {/* Service items — fine copper markers */}
              <ul className="flex flex-col gap-2" aria-label={`${s.name} services`}>
                {s.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2.5 font-sans text-small text-foreground-muted"
                  >
                    <span
                      aria-hidden="true"
                      className="h-px w-3 bg-accent shrink-0"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom line — visual close of the section */}
        <div className="mt-(--spacing-section-y) h-px w-full bg-border-subtle" />

      </Container>
    </section>
  );
}
