"use client";

import { motion, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/container";
import Link from "next/link";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Brand Statement + Enquiry CTA — two adjacent Clouvent Black sections,
 * separated by a border-t seam rather than a colour change (same
 * technique as work-closing.tsx). Deliberately not a literal reuse of
 * <EnquiryCTA> — that component's copy is specific to the homepage's
 * closing moment ("Start a project." / email as secondary); this page
 * needs its own headline and a "View Selected Work" secondary instead,
 * so it follows the same visual shell rather than force-fitting mismatched copy
 * into a shared component.
 */
export function AboutBrandStatement() {
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
          <p className="eyebrow text-foreground-inverse-muted mb-(--spacing-content)">
            Clouvent
          </p>
          <h2 className="font-display text-h1 text-foreground-inverse leading-[1.1] max-w-[16ch]">
            Built beautifully. Managed properly. Designed to grow.
          </h2>

          <div className="mt-(--spacing-section-y) flex items-center gap-3 sm:gap-4">
            {(["Build.", "Manage.", "Grow."] as const).map((word, i) => (
              <span key={word} className="flex items-center gap-3 sm:gap-4">
                {i > 0 && <span aria-hidden="true" className="h-px w-6 bg-border" />}
                <span className="font-display text-h3 text-foreground-inverse-muted leading-none">
                  {word}
                </span>
              </span>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

export function AboutEnquiryCTA() {
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
            <span aria-hidden="true" className="block h-px w-12 bg-accent mb-(--spacing-content)" />
            <h2 className="font-display text-h2 text-foreground-inverse leading-[1.15]">
              Your work deserves a digital presence to match.
            </h2>
            <p className="mt-(--spacing-content) font-sans text-body-lg text-foreground-inverse-muted leading-[1.6] max-w-[46ch]">
              If you&apos;re building something considered and want a
              digital partner who thinks beyond launch day, we&apos;d like
              to hear about it.
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
              href="/work"
              className="font-sans text-body font-medium text-foreground-inverse-muted hover:text-foreground-inverse transition-colors duration-(--duration-fast) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent rounded-(--radius-control)"
            >
              View selected work
            </Link>
          </motion.div>

        </div>
      </Container>
    </section>
  );
}
