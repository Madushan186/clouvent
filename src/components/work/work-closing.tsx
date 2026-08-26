"use client";

import { motion, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/container";
import Link from "next/link";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Brand Statement + Final CTA — two adjacent Clouvent Black sections.
 * Kept as two distinct beats (statement, then ask) per the brief, with
 * a border-t seam on the CTA rather than a colour change to separate
 * them without introducing a third surface.
 */
export function BrandStatement() {
  const reduce = useReducedMotion();

  return (
    <section className="bg-surface-dark py-(--spacing-section-y) text-foreground-inverse">
      <Container width="content" className="text-center">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="flex flex-col items-center"
        >
          <span aria-hidden="true" className="h-px w-12 bg-accent mb-(--spacing-content)" />
          <h2 className="font-display text-h1 text-foreground-inverse leading-[1.1]">
            Your work deserves a digital presence to match.
          </h2>
        </motion.div>
      </Container>
    </section>
  );
}

export function WorkFinalCTA() {
  const reduce = useReducedMotion();

  return (
    <section className="bg-surface-dark border-t border-border py-(--spacing-section-y) text-foreground-inverse">
      <Container width="wide">
        <div className="grid grid-cols-1 gap-(--spacing-content) md:grid-cols-5 md:gap-(--spacing-gutter) md:items-end">

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.75, ease: EASE }}
            className="md:col-span-3"
          >
            <h2 className="font-display text-h2 text-foreground-inverse leading-[1.15]">
              Have a project worth building properly?
            </h2>
            <p className="mt-(--spacing-content) font-sans text-body-lg text-foreground-inverse-muted leading-[1.6] max-w-[46ch]">
              Tell us where your digital presence is now, and where you want it to go.
            </p>
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.65, delay: reduce ? 0 : 0.18, ease: EASE }}
            className="md:col-span-2 flex flex-wrap items-center gap-4"
          >
            <Link
              href="/contact"
              className="inline-flex items-center justify-center font-sans text-body font-medium rounded-(--radius-control) bg-accent text-foreground px-7 py-3.5 transition-colors duration-(--duration-standard) ease-(--ease-standard) hover:bg-accent-hover active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              Start a project
            </Link>
            <Link
              href="/services"
              className="font-sans text-body font-medium text-foreground-inverse-muted hover:text-foreground-inverse transition-colors duration-(--duration-fast) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent rounded-(--radius-control)"
            >
              Explore services
            </Link>
          </motion.div>

        </div>
      </Container>
    </section>
  );
}
