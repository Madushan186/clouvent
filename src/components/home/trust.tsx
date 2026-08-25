"use client";

import { motion, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/container";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Trust — Clouvent Black (#171717) surface.
 * HOMEPAGE_DESIGN_SPEC.md §8 compliance:
 *
 * Purpose: Convert "the work looks good" into "I could work with these people."
 * Visitor question answered: "Can they handle more than a one-off build?"
 *
 * Content — two confirmed mechanisms only (per spec §8 revision):
 * 1. Approach/standards statement (design + performance thinking, BUILD scope)
 * 2. What happens after launch (MANAGE — maintenance, analytics, Search Console)
 *
 * Layout: Structured numbered list with fine rules. NO CARDS.
 * Per spec: "Structured, numbered or ruled list — not icon cards."
 *
 * Surface: Clouvent Black. Typography: Manrope body; Instrument Serif header.
 * Photography: None — text/structure-led per Direction A restraint.
 * CTA: None — this section builds belief, doesn't ask for action (spec §8).
 *
 * Contrast fixes from audit:
 * - Numbers: was text-border (#353331 on #171717 ≈ 2.3:1, FAIL).
 *   Now text-foreground-inverse-muted (#A7A39E on #171717 ≈ 7.2:1, PASS).
 *
 * Motion: "Subtle scroll-reveal per statement, no stagger drama." (spec §17).
 * Reduced-motion: appears immediately, no transform.
 *
 * Graphic elements: fine rules between statements. Sparse node/grid marks
 * only where structurally useful. The section header carries a copper
 * hairline rule beneath it — a single deliberate structural use. PASS.
 *
 * BUILD/MANAGE/GROW manifesto removed from here. It appears in the hero
 * strip and footer only — not repeated in every dark section.
 *
 * No eyebrow — budget at ceiling (Hero = slot 1, Services = slot 2). PASS.
 */

const statements = [
  {
    num: "01",
    heading: "Built around the work",
    body: "Every digital presence starts with understanding the business, the audience, and the photography behind it — not a template. Design and development are handled to a consistent technical standard from the first decision to the last line of code.",
  },
  {
    num: "02",
    heading: "Present beyond launch",
    body: "The relationship does not end when the site goes live. Hosting, maintenance, analytics monitoring, and Search Console oversight mean the digital presence keeps working — and improving — as the business grows.",
  },
];

export function Trust() {
  const reduce = useReducedMotion();

  return (
    <section className="bg-surface-dark py-(--spacing-section-y) text-foreground-inverse">
      <Container width="wide">

        {/* Section header — Instrument Serif per spec §8 */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          {/*
           * Fine copper hairline below the header — one structural use of the
           * graphic language (HOMEPAGE_DESIGN_SPEC.md §16: "fine rules").
           * Width narrows to reinforce the precision of the brand mark.
           */}
          <div className="flex items-start gap-(--spacing-gutter) pb-(--spacing-content) border-b border-border">
            <h2 className="font-display text-h2 text-foreground-inverse leading-[1.15] max-w-[28ch]">
              A website should not end when it goes live.
            </h2>
            {/* Copper accent rule — structural, not decorative */}
            <span
              aria-hidden="true"
              className="hidden md:block mt-3 h-px w-12 bg-accent shrink-0 self-start"
            />
          </div>
        </motion.div>

        {/* Trust statements — ruled list, no cards */}
        <div className="mt-(--spacing-section-y)">
          {statements.map((s, i) => (
            <motion.div
              key={s.num}
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, delay: reduce ? 0 : i * 0.08, ease: EASE }}
              className="group grid grid-cols-1 gap-(--spacing-content) py-(--spacing-content) border-b border-border md:grid-cols-12 md:gap-(--spacing-gutter)"
            >
              {/*
               * Number — contrast FIXED.
               * Was: text-border (#353331 on #171717 ≈ 2.3:1 — WCAG AA FAIL).
               * Now: text-foreground-inverse-muted (#A7A39E on #171717 ≈ 7.2:1 — PASS).
               */}
              <div className="md:col-span-2 flex items-start pt-1">
                <span className="font-sans text-small font-semibold uppercase tracking-[0.08em] text-foreground-inverse-muted select-none">
                  {s.num}
                </span>
              </div>

              {/* Content — heading nudges right subtly on hover */}
              <div className="md:col-span-10">
                <h3 className="font-display text-h3 text-foreground-inverse leading-[1.25] transition-transform duration-(--duration-standard) ease-(--ease-standard) group-hover:translate-x-1">
                  {s.heading}
                </h3>
                <p className="mt-4 font-sans text-body leading-[1.65] text-foreground-inverse-muted max-w-[58ch]">
                  {s.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </Container>
    </section>
  );
}
