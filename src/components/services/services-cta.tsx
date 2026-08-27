"use client";

import { motion, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/container";
import Link from "next/link";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Final CTA — Clouvent Black. Services previously had no dark closing
 * moment (it ended on the FAQ, or before that on PricingTable's own
 * light-surface note); Home, Work and About all close dark, so this
 * brings Services in line. Copy is "Option 1" from the FAQ CTA
 * deliverable — the one written specifically to follow a block of
 * objection-handling, not a generic restatement of Hero's close.
 */
export function ServicesCTA() {
  const reduce = useReducedMotion();

  return (
    <section className="bg-surface-dark py-(--spacing-section-y) text-foreground-inverse">
      <Container width="wide">
        <div className="grid grid-cols-1 gap-(--spacing-content) md:grid-cols-5 md:gap-(--spacing-gutter) md:items-end">

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: reduce ? 0 : 0.75, ease: EASE }}
            className="md:col-span-3"
          >
            <span aria-hidden="true" className="block h-px w-12 bg-accent mb-(--spacing-content)" />
            <h2 className="font-display text-h2 text-foreground-inverse leading-[1.15]">
              Still deciding what you need?
            </h2>
            <p className="mt-(--spacing-content) font-sans text-body-lg text-foreground-inverse-muted leading-[1.6] max-w-[44ch]">
              That&apos;s a normal place to start. Tell us about your
              business and we&apos;ll help you work out where to begin.
            </p>
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: reduce ? 0 : 0.65, delay: reduce ? 0 : 0.18, ease: EASE }}
            className="md:col-span-2 flex flex-wrap items-center gap-4"
          >
            <Link
              href="/contact"
              className="inline-flex items-center justify-center font-sans text-body font-medium rounded-(--radius-control) bg-accent text-foreground px-7 py-3.5 transition-colors duration-(--duration-standard) ease-(--ease-standard) hover:bg-accent-hover active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              Start a project
            </Link>
          </motion.div>

        </div>
      </Container>
    </section>
  );
}
