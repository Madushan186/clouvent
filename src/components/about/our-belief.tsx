"use client";

import { motion, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/container";

const EASE = [0.22, 1, 0.36, 1] as const;

const principles = [
  {
    name: "Craft",
    body: "Design should reflect the quality and character of the business.",
  },
  {
    name: "Precision",
    body: "Performance, accessibility, responsive behaviour and engineering quality matter as much as visual appearance.",
  },
  {
    name: "Continuity",
    body: "The relationship should continue beyond launch through management, measurement and improvement.",
  },
] as const;

/**
 * Our Belief — Studio White. Three principles as fine-ruled typography,
 * not icon cards. Distinct in treatment from Our Standard further down
 * (which uses a tighter numbered list) so the two principle sections
 * don't read as the same component reused twice.
 */
export function OurBelief() {
  const reduce = useReducedMotion();

  const reveal = (delay = 0) => ({
    initial: reduce ? false : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.7, delay: reduce ? 0 : delay, ease: EASE },
  });

  return (
    <section className="bg-background-subtle py-(--spacing-section-y)">
      <Container width="content">
        <motion.p {...reveal(0)} className="eyebrow text-foreground-muted">
          Our belief
        </motion.p>

        <motion.h2
          {...reveal(0.08)}
          className="mt-(--spacing-content) font-display text-h1 text-foreground leading-[1.1]"
        >
          A website shouldn&apos;t simply exist. It should represent. It
          should perform. It should evolve.
        </motion.h2>

        <motion.p
          {...reveal(0.16)}
          className="mt-(--spacing-section-y) font-sans text-body-lg text-foreground-muted leading-[1.65] max-w-[56ch]"
        >
          We consider design, development, performance, maintenance,
          measurement and growth as connected parts of one digital
          presence — not separate transactions.
        </motion.p>

        <div className="mt-(--spacing-section-y) flex flex-col">
          {principles.map((p, i) => (
            <motion.div
              key={p.name}
              {...reveal(0.2 + i * 0.08)}
              className="grid grid-cols-1 gap-2 py-6 border-t border-border-subtle last:border-b md:grid-cols-12 md:gap-(--spacing-gutter) md:items-baseline"
            >
              <h3 className="md:col-span-3 font-display text-h3 text-foreground leading-[1.2]">
                {p.name}
              </h3>
              <p className="md:col-span-9 font-sans text-body text-foreground-muted leading-[1.65] max-w-[52ch]">
                {p.body}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
