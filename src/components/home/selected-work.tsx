"use client";

import { motion, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/container";
import { BeforeAfterComparison } from "@/components/ui/before-after-comparison";
import Link from "next/link";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Selected Work — Studio White (#FAF9F7) bg.
 * tasteskill layout family: asymmetric 3/5 comparison + 2/5 editorial sidebar.
 * Distinct from Hero (full-viewport split) and Services (editorial index rows). PASS.
 *
 * Motion: left slides in from left, right slides in from right, on scroll.
 * Service tags: staggered fade-in row.
 * No eyebrow — Hero used it (1/3 budget). This section needs none; the comparison
 * widget is self-evident. Headline carries section purpose alone. PASS.
 */
export function SelectedWork() {
  const reduce = useReducedMotion();

  const slide = (dir: "left" | "right", delay = 0) => ({
    initial: reduce ? false : { opacity: 0, x: dir === "left" ? -40 : 40 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.85, delay: reduce ? 0 : delay, ease: EASE },
  });

  const tags = ["Design", "Development", "Maintenance", "Analytics", "Paid Social"];

  return (
    <section id="selected-work" className="bg-background-subtle py-(--spacing-section-y)">
      <Container>
        <div className="grid grid-cols-1 gap-(--spacing-content) md:grid-cols-5 md:gap-(--spacing-gutter)">

          {/* Before/After comparison — 3/5 */}
          <motion.div {...slide("left")} className="md:col-span-3">
            <BeforeAfterComparison
              beforeSrc="/projects/once-upon-a-time/before-wordpress.png"
              beforeAlt="Once Upon a Time Photography's previous WordPress website"
              afterSrc="/projects/once-upon-a-time/after-clouvent.png"
              afterAlt="Once Upon a Time Photography's Clouvent-redesigned website"
              accessibleLabel="Compare previous WordPress website with Clouvent redesign"
            />
          </motion.div>

          {/* Project sidebar — 2/5 */}
          <motion.div
            {...slide("right", 0.12)}
            className="md:col-span-2 flex flex-col justify-center"
          >
            {/* Copper editorial number */}
            <span className="font-sans text-small font-semibold uppercase tracking-[0.08em] text-accent">
              Selected Work / 01
            </span>

            <h2 className="mt-(--spacing-content) font-display text-h2 text-foreground leading-[1.15]">
              Once Upon a Time Photography
            </h2>

            <p className="mt-(--spacing-content) font-sans text-body text-foreground-muted leading-[1.65] max-w-(--width-content)">
              Design, React and TypeScript development, ongoing website maintenance, analytics and Search Console monitoring, and paid social support for an Australian photography business.
            </p>

            {/* Service tags — stagger in */}
            <motion.ul
              initial={reduce ? false : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: reduce ? 0 : 0.3, ease: EASE }}
              className="mt-(--spacing-content) flex flex-wrap gap-2"
              aria-label="Services delivered"
            >
              {tags.map((tag, i) => (
                <motion.li
                  key={tag}
                  initial={reduce ? false : { opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: reduce ? 0 : 0.35 + i * 0.05, ease: EASE }}
                  className="font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-foreground-muted border border-border-subtle px-2.5 py-1 rounded-(--radius-control)"
                >
                  {tag}
                </motion.li>
              ))}
            </motion.ul>

            {/* Internal link to the full case study, now that /work exists */}
            <Link
              href="/work"
              className="mt-(--spacing-content) inline-flex items-center gap-1.5 font-sans text-body text-foreground underline decoration-border-subtle decoration-1 underline-offset-4 transition-[text-decoration-color,text-decoration-thickness] duration-(--duration-fast) hover:decoration-foreground hover:decoration-2 group"
            >
              View the work
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
                <path d="M1.5 11.5 11.5 1.5M11.5 1.5H5.5M11.5 1.5V7.5"/>
              </svg>
            </Link>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
