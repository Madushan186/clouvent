"use client";

import { motion, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/container";
import Link from "next/link";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Positioning Statement — Cloud Ivory, continues the Hero's chapter.
 * A calm editorial statement, not a service explainer — full BUILD /
 * MANAGE / GROW detail belongs to the Services section further down
 * the page and to /services. No eyebrow here: Hero already spent it.
 */
const architecture = [
  { num: "01", name: "Build", role: "Design + development" },
  { num: "02", name: "Manage", role: "Maintenance + infrastructure" },
  { num: "03", name: "Grow", role: "Visibility + optimisation" },
] as const;

export function PositioningStatement() {
  const reduce = useReducedMotion();

  return (
    <section className="bg-background py-(--spacing-section-y)">
      <Container>
        <div className="grid grid-cols-1 gap-(--spacing-section-y) md:grid-cols-12 md:gap-(--spacing-gutter)">

          {/* Statement */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.65, ease: EASE }}
            className="md:col-span-7"
          >
            <h2 className="font-display text-h2 text-foreground leading-[1.15] max-w-[14ch]">
              A better website is only the beginning.
            </h2>
            <p className="mt-(--spacing-content) font-sans text-body-lg text-foreground-muted leading-[1.6] max-w-[46ch]">
              We design and develop distinctive digital experiences, keep
              them properly managed after launch, and create the
              foundation for continuous improvement.
            </p>
            <Link
              href="/services"
              className="group mt-(--spacing-content) inline-flex items-center gap-1.5 font-sans text-body font-medium text-foreground hover:text-accent transition-colors duration-(--duration-fast) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent rounded-(--radius-control)"
            >
              Explore services
              <svg
                aria-hidden="true"
                width="13" height="13"
                viewBox="0 0 13 13"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform duration-(--duration-fast) group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              >
                <path d="M2.5 10.5 10.5 2.5M10.5 2.5H5M10.5 2.5V8" />
              </svg>
            </Link>
          </motion.div>

          {/* BUILD / MANAGE / GROW — teaser only, no descriptions */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: reduce ? 0 : 0.12, ease: EASE }}
            className="md:col-span-5 flex flex-col gap-5 border-l border-border-subtle pl-(--spacing-content)"
          >
            {architecture.map((item) => (
              <div key={item.num} className="flex items-baseline gap-4">
                <span className="font-sans text-small font-semibold text-foreground-muted/50 shrink-0">
                  {item.num}
                </span>
                <div>
                  <span className="font-display text-h3 text-foreground leading-[1.2]">
                    {item.name}
                  </span>
                  <span className="block font-sans text-small text-foreground-muted">
                    {item.role}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>

        </div>
      </Container>
    </section>
  );
}
