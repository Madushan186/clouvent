"use client";

import { motion, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/container";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Why Clouvent Exists — manifesto-style, Studio White. Text-led, no
 * imagery, no cards — the argument is carried entirely by typography
 * and pacing. Transitions the reader toward BUILD -> MANAGE -> GROW
 * without naming it yet (that's its own section further down).
 */
export function WhyClouvent() {
  const reduce = useReducedMotion();

  const reveal = (delay = 0) => ({
    initial: reduce ? false : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.7, delay: reduce ? 0 : delay, ease: EASE },
  });

  return (
    <section id="why-clouvent" className="bg-background-subtle py-(--spacing-section-y)">
      <Container width="content">
        <motion.p {...reveal(0)} className="eyebrow text-foreground-muted">
          Why Clouvent
        </motion.p>

        <motion.h2
          {...reveal(0.08)}
          className="mt-(--spacing-content) font-display text-h1 text-foreground leading-[1.1] max-w-[16ch]"
        >
          Great work can be undersold by an ordinary digital presence.
        </motion.h2>

        <motion.div {...reveal(0.16)} className="mt-(--spacing-section-y) flex flex-col gap-5">
          <p className="font-sans text-body-lg text-foreground-muted leading-[1.65]">
            Many photographers and creative businesses invest deeply in
            their craft, but their digital presence does not always
            communicate the same level of quality. Clouvent exists to
            close that gap.
          </p>
          <p className="font-sans text-body-lg text-foreground-muted leading-[1.65]">
            We combine thoughtful design, modern engineering and ongoing
            digital management to create digital experiences that reflect
            the quality of the business behind them.
          </p>
        </motion.div>

        <motion.div
          {...reveal(0.24)}
          className="mt-(--spacing-section-y) border-t border-border-subtle pt-(--spacing-content)"
        >
          <p className="font-display text-h3 text-foreground leading-[1.3] max-w-[24ch]">
            We don&apos;t believe launch day is the finish line.
          </p>
          <p className="mt-4 font-sans text-body text-foreground-muted leading-[1.65] max-w-[52ch]">
            A digital presence should continue to be maintained, measured,
            refined and strengthened.
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
