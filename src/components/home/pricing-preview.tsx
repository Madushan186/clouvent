"use client";

import { motion, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/container";
import Link from "next/link";
import { pricingData } from "@/components/services/pricing-data";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Pricing Preview — Studio White. AUD only, no currency switcher — that
 * interaction stays on /services (pricingData is the single source for
 * both). Static starting-price context, not the full offer detail.
 */
export function PricingPreview() {
  const reduce = useReducedMotion();

  return (
    <section className="bg-background-subtle py-(--spacing-section-y)">
      <Container>
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-(--spacing-content) border-b border-border-subtle pb-(--spacing-content)"
        >
          <h2 className="font-display text-h2 text-foreground leading-[1.15] max-w-[16ch]">
            A clear place to start.
          </h2>
          <Link
            href="/services"
            className="group inline-flex items-center gap-1.5 font-sans text-small font-semibold uppercase tracking-[0.08em] text-foreground-muted hover:text-foreground transition-colors duration-(--duration-fast) shrink-0 self-end md:self-auto"
          >
            View pricing
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

        <div className="mt-(--spacing-section-y) grid grid-cols-1 md:grid-cols-3 gap-0 divide-y divide-border-subtle md:divide-y-0 md:divide-x md:divide-border-subtle">
          {pricingData.map((item, i) => (
            <motion.div
              key={item.id}
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: reduce ? 0 : i * 0.08, ease: EASE }}
              className="flex flex-col gap-2 py-(--spacing-content) md:px-(--spacing-gutter) first:md:pl-0 last:md:pr-0"
            >
              <span className="font-sans text-small font-semibold uppercase tracking-[0.1em] text-foreground-muted/50">
                {item.number} / {item.name}
              </span>
              <span className="font-display text-h3 text-foreground leading-none">
                {item.pricing.AUD.display}
              </span>
              <span className="font-sans text-small text-foreground-muted uppercase tracking-[0.08em]">
                {item.pricing.AUD.billing}
              </span>
              <p className="mt-1 font-sans text-small text-foreground-muted leading-[1.55] max-w-[32ch]">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={reduce ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5, delay: reduce ? 0 : 0.2, ease: EASE }}
          className="mt-(--spacing-section-y) font-sans text-small text-foreground-muted/70 leading-[1.55] max-w-[52ch]"
        >
          Every project is different. These prices are starting points —
          final proposals are based on scope and ongoing requirements.
        </motion.p>
      </Container>
    </section>
  );
}
