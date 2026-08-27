"use client";

import { motion, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/container";

const EASE = [0.22, 1, 0.36, 1] as const;

const standards = [
  {
    num: "01",
    name: "Design with purpose",
    body: "Every visual decision should strengthen communication, hierarchy and brand perception.",
  },
  {
    num: "02",
    name: "Engineer for performance",
    body: "A premium experience should also be fast, responsive, accessible and technically considered.",
  },
  {
    num: "03",
    name: "Think beyond launch",
    body: "Maintenance, analytics, search visibility and iteration should be considered from the beginning.",
  },
  {
    num: "04",
    name: "Keep the work human",
    body: "Technology should support the business and its audience rather than becoming the centre of the experience.",
  },
] as const;

/**
 * Our Standard — Studio White, tight numbered ruled list. Deliberately
 * a different visual treatment from Our Belief above (baseline-aligned
 * two-column rows there vs. a compact vertical list here) so the two
 * principle sections don't feel like the same component twice.
 */
export function OurStandard() {
  const reduce = useReducedMotion();

  const reveal = (delay = 0) => ({
    initial: reduce ? false : { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.25 },
    transition: { duration: 0.6, delay: reduce ? 0 : delay, ease: EASE },
  });

  return (
    <section className="bg-background-subtle py-(--spacing-section-y)">
      <Container width="content">
        <motion.p {...reveal(0)} className="eyebrow text-foreground-muted">
          Our standard
        </motion.p>

        <motion.h2
          {...reveal(0.08)}
          className="mt-(--spacing-content) font-display text-h1 text-foreground leading-[1.1] max-w-[16ch]"
        >
          Thoughtful by design. Precise by default.
        </motion.h2>

        <ol className="mt-(--spacing-section-y) border-t border-border-subtle">
          {standards.map((s, i) => (
            <motion.li
              key={s.num}
              {...reveal(0.14 + i * 0.06)}
              className="group flex flex-col gap-1 border-b border-border-subtle py-6 md:flex-row md:items-baseline md:gap-(--spacing-gutter)"
            >
              <span className="font-sans text-small font-semibold uppercase tracking-[0.1em] text-foreground-muted/50 shrink-0 md:w-10">
                {s.num}
              </span>
              <h3 className="font-display text-h3 text-foreground leading-[1.2] md:w-[26ch] shrink-0">
                {s.name}
              </h3>
              <p className="font-sans text-body text-foreground-muted leading-[1.65] max-w-[48ch]">
                {s.body}
              </p>
            </motion.li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
