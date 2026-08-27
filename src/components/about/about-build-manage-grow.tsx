"use client";

import { motion, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/container";
import Link from "next/link";

const EASE = [0.22, 1, 0.36, 1] as const;

const stages = [
  {
    num: "01",
    name: "Build",
    line: "Create the foundation.",
    items: ["Strategy", "Design", "Development", "Performance"],
  },
  {
    num: "02",
    name: "Manage",
    line: "Protect and maintain it.",
    items: ["Maintenance", "Content", "Analytics", "Search visibility"],
  },
  {
    num: "03",
    name: "Grow",
    line: "Improve what comes next.",
    items: ["SEO", "Paid social", "Conversion optimisation", "Content strategy"],
  },
] as const;

/**
 * BUILD -> MANAGE -> GROW as philosophy, not service detail — that
 * belongs to /services (linked via the closing CTA). This section
 * explains *why* the studio is organised this way.
 */
export function AboutBuildManageGrow() {
  const reduce = useReducedMotion();

  const reveal = (delay = 0) => ({
    initial: reduce ? false : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.25 },
    transition: { duration: 0.7, delay: reduce ? 0 : delay, ease: EASE },
  });

  return (
    <section className="bg-background py-(--spacing-section-y)">
      <Container>
        <motion.div {...reveal(0)} className="border-b border-border-subtle pb-(--spacing-content)">
          <p className="eyebrow text-foreground-muted">How we think</p>
          <h2 className="mt-(--spacing-content) font-display text-h1 text-foreground leading-[1.1] max-w-[18ch]">
            One digital presence. Three continuous disciplines.
          </h2>
        </motion.div>

        <div className="mt-(--spacing-section-y) grid grid-cols-1 gap-0 divide-y divide-border-subtle md:grid-cols-3 md:divide-y-0 md:divide-x md:divide-border-subtle">
          {stages.map((s, i) => (
            <motion.div
              key={s.num}
              {...reveal(0.1 + i * 0.09)}
              className="flex flex-col gap-4 py-(--spacing-content) md:px-(--spacing-gutter) first:md:pl-0 last:md:pr-0"
            >
              <span className="font-display text-[3rem] leading-none text-foreground/20">
                {s.num}
              </span>
              <div>
                <h3 className="font-display text-h3 text-foreground leading-[1.2]">
                  {s.name}
                </h3>
                <p className="mt-1 font-sans text-small text-foreground-muted">{s.line}</p>
              </div>
              <ul className="flex flex-col gap-2">
                {s.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2.5 font-sans text-small text-foreground-muted"
                  >
                    <span aria-hidden="true" className="h-px w-3 bg-accent shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          {...reveal(0.4)}
          className="mt-(--spacing-section-y) flex flex-col gap-(--spacing-content) border-t border-border-subtle pt-(--spacing-content) md:flex-row md:items-center md:justify-between"
        >
          <p className="font-display text-h3 text-foreground leading-[1.35] max-w-[42ch]">
            BUILD → MANAGE → GROW isn&apos;t simply how our services are
            organised. It&apos;s how we believe a serious digital presence
            should be treated.
          </p>
          <Link
            href="/services"
            className="group inline-flex items-center gap-1.5 font-sans text-body font-medium text-foreground hover:text-accent transition-colors duration-(--duration-fast) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent rounded-(--radius-control) shrink-0"
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
      </Container>
    </section>
  );
}
