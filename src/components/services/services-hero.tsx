"use client";

import { motion, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/container";

const EASE = [0.22, 1, 0.36, 1] as const;

// `animate` stays defined even when reduce is true — see hero.tsx's up()
// for why omitting it entirely can leave an element stuck at its
// SSR-rendered opacity:0 after hydration.
function up(i: number, reduce: boolean) {
  if (reduce) return { initial: false, animate: { opacity: 1, y: 0 } };
  return {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay: i * 0.08, ease: EASE },
  };
}

const architecture = [
  { num: "01", name: "Build", desc: "Design + development" },
  { num: "02", name: "Manage", desc: "Maintenance + infrastructure" },
  { num: "03", name: "Grow", desc: "Visibility + optimisation" },
] as const;

/**
 * Services page header — load-time staggered reveal, matching Hero's
 * up() pattern for consistency across the site rather than the plain
 * static render this page had before. Only the header is a client
 * boundary; PricingTable below stays its own separate boundary.
 */
export function ServicesHero() {
  const reduce = useReducedMotion() ?? false;

  return (
    <section id="hero" className="bg-background py-(--spacing-section-y)">
      <Container>

        <div className="grid grid-cols-1 gap-(--spacing-content) md:grid-cols-2 md:gap-(--spacing-gutter)">
          <motion.div {...up(0, reduce)}>
            <p className="eyebrow text-foreground-muted">Services</p>
            <h1 className="mt-(--spacing-content) font-display text-display text-foreground leading-[1.05] tracking-tight text-balance max-w-[16ch]">
              Build. Manage. Grow.
            </h1>
          </motion.div>
          <motion.div {...up(1, reduce)} className="flex items-end">
            <p className="font-sans text-body-lg text-foreground-muted leading-[1.65] max-w-[50ch]">
              Clouvent offers three interconnected disciplines — designed to work together
              as a complete, ongoing partnership or independently as your business needs today.
            </p>
          </motion.div>
        </div>

        <motion.div
          {...up(2, reduce)}
          className="mt-(--spacing-section-y) h-px bg-border-subtle"
        />

        <div className="mt-(--spacing-content) grid grid-cols-1 gap-0 divide-y divide-border-subtle md:grid-cols-3 md:divide-y-0 md:divide-x">
          {architecture.map((s, i) => (
            <motion.div
              key={s.num}
              {...up(3 + i * 0.5, reduce)}
              className="flex flex-col gap-2 py-(--spacing-content) md:px-(--spacing-gutter) first:md:pl-0 last:md:pr-0"
            >
              <span className="font-sans text-small font-semibold uppercase tracking-[0.1em] text-foreground-muted/50">
                {s.num}
              </span>
              <span className="font-display text-h3 text-foreground leading-[1.15]">
                {s.name}
              </span>
              <span className="font-sans text-small text-foreground-muted">
                {s.desc}
              </span>
              {i === 2 && (
                <svg
                  aria-hidden="true"
                  width="18" height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  stroke="var(--color-accent)"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mt-1 opacity-50"
                >
                  <path d="M3 15 15 3M15 3H7M15 3v8" />
                </svg>
              )}
            </motion.div>
          ))}
        </div>

      </Container>
    </section>
  );
}
