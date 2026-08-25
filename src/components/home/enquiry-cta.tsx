"use client";

import { motion, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/container";
import Link from "next/link";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Enquiry CTA — Clouvent Black (#171717) surface.
 * HOMEPAGE_DESIGN_SPEC.md §10 compliance:
 *
 * Purpose: Natural conclusion of the narrative.
 * Visitor question: "How do I start, and what happens next?"
 *
 * Content:
 * - Short, confident closing statement
 * - Primary enquiry CTA → /contact (copper, strong contrast)
 * - Secondary direct-email path (per spec §10 — required, currently placeholder)
 *
 * Layout: Left-aligned editorial close, generous whitespace (not centred — asymmetric
 * is stronger than centred at this point in the narrative).
 *
 * Surface: Clouvent Black — bookends the light hero with a confident close.
 * Typography: Instrument Serif closing statement; Manrope for secondary/email.
 * Accessibility: Studio White (#FAF9F7) on Clouvent Black (#171717) ≈ 15.7:1. PASS.
 *
 * "No newsletter, no lead magnet, no fake scarcity." (spec §10) PASS.
 *
 * Motion: fade-up on scroll. CTA slightly delayed.
 * Reduced-motion: appears immediately.
 */
export function EnquiryCTA() {
  const reduce = useReducedMotion();

  return (
    <section className="bg-surface-dark py-(--spacing-section-y) text-foreground-inverse">
      <Container width="wide">

        <div className="grid grid-cols-1 gap-(--spacing-content) md:grid-cols-5 md:gap-(--spacing-gutter) md:items-end">

          {/* Left: closing statement — 3/5 */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.75, ease: EASE }}
            className="md:col-span-3"
          >
            {/* Fine copper seam above the statement */}
            <span aria-hidden="true" className="block h-px w-12 bg-accent mb-(--spacing-content)" />

            <h2 className="font-display text-h2 text-foreground-inverse leading-[1.15]">
              Start a project.
            </h2>

            <p className="mt-(--spacing-content) font-sans text-body-lg text-foreground-inverse-muted leading-[1.6] max-w-[46ch]">
              Tell us about your business and what you are looking for. It starts with a conversation, not a commitment.
            </p>
          </motion.div>

          {/* Right: CTAs — 2/5 */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.65, delay: reduce ? 0 : 0.18, ease: EASE }}
            className="md:col-span-2 flex flex-col items-start gap-5"
          >
            {/* Primary CTA — copper, dark text, strong contrast */}
            <Link
              href="/contact"
              className="inline-flex items-center justify-center font-sans text-body font-medium rounded-(--radius-control) bg-accent text-foreground px-7 py-3.5 transition-colors duration-(--duration-standard) ease-(--ease-standard) hover:bg-accent-hover active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              Enquire
            </Link>

            {/*
             * Secondary — direct email path (spec §10).
             * Address is a placeholder — [NEEDS INPUT].
             * Shown honestly with the placeholder label.
             */}
            <div className="flex flex-col gap-1">
              <p className="font-sans text-small text-foreground-inverse-muted">
                Or email directly:
              </p>
              <a
                href="mailto:clouventsolutions@gmail.com"
                className="font-sans text-body text-foreground-inverse underline decoration-border decoration-1 underline-offset-4 transition-[text-decoration-color] duration-(--duration-fast) hover:decoration-foreground-inverse"
              >
                clouventsolutions@gmail.com
              </a>
            </div>
          </motion.div>

        </div>

      </Container>
    </section>
  );
}
