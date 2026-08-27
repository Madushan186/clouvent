"use client";

import { motion, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/container";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Vision + Mission — the page's signature visual moment. An editorial
 * split (fine rule between, not two rounded cards), Cloud Ivory. Copper
 * used only for the "01"/"02" numbering, per the brand's "signature not
 * decoration" rule for accent colour.
 */
export function VisionMission() {
  const reduce = useReducedMotion();

  const reveal = (delay = 0, x = 0) => ({
    initial: reduce ? false : { opacity: 0, y: 24, x },
    whileInView: { opacity: 1, y: 0, x: 0 },
    viewport: { once: true, amount: 0.25 },
    transition: { duration: 0.75, delay: reduce ? 0 : delay, ease: EASE },
  });

  return (
    <section className="bg-background py-(--spacing-section-y)">
      <Container width="wide">
        <div className="grid grid-cols-1 md:grid-cols-2 md:divide-x md:divide-border-subtle">

          {/* 01 / Vision */}
          <motion.div {...reveal(0, -20)} className="md:pr-(--spacing-gutter) pb-(--spacing-section-y) md:pb-0">
            <span className="font-sans text-small font-semibold uppercase tracking-[0.1em] text-accent">
              01 / Vision
            </span>
            <h2 className="mt-(--spacing-content) font-display text-h2 text-foreground leading-[1.15]">
              To raise the standard of digital presence for ambitious
              creative businesses — beginning in Australia and growing
              internationally.
            </h2>
            <p className="mt-(--spacing-content) font-sans text-body text-foreground-muted leading-[1.65] max-w-[42ch]">
              We envision a digital landscape where the quality of a
              business&apos;s online presence reflects the quality of the
              work behind it.
            </p>
          </motion.div>

          {/* 02 / Mission */}
          <motion.div {...reveal(0.1, 20)} className="md:pl-(--spacing-gutter) pt-(--spacing-section-y) md:pt-0 border-t md:border-t-0 border-border-subtle">
            <span className="font-sans text-small font-semibold uppercase tracking-[0.1em] text-accent">
              02 / Mission
            </span>
            <h2 className="mt-(--spacing-content) font-display text-h2 text-foreground leading-[1.15]">
              To build exceptional digital experiences, manage them with
              care, and continuously improve how they perform, communicate
              and grow.
            </h2>
            <p className="mt-(--spacing-content) font-sans text-body text-foreground-muted leading-[1.65] max-w-[42ch]">
              We bring design, engineering, ongoing management and digital
              growth into one considered relationship.
            </p>
          </motion.div>

        </div>
      </Container>
    </section>
  );
}
