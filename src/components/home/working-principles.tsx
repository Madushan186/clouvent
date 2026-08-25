"use client";

import { motion, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/container";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Why Clouvent / Working Principles — Clouvent Black.
 * Supersedes the earlier two-statement Trust section: same ruled-list
 * treatment (no cards), extended to four principles. CRAFT and
 * CONTINUITY are the original two statements verbatim; PERFORMANCE and
 * GROWTH are new but stay to the same rule as the original two — process
 * and standards claims only, never invented statistics or promised
 * outcomes (PROJECT_BRIEF.md's GROW copy rule: capability language, not
 * results language).
 */
const principles = [
  {
    num: "01",
    label: "Craft",
    heading: "Built around the work",
    body: "Every digital presence starts with understanding the business, the audience, and the photography behind it — not a template. Design and development are handled to a consistent technical standard from the first decision to the last line of code.",
  },
  {
    num: "02",
    label: "Performance",
    heading: "Performance by design",
    body: "Speed, usability, and discoverability are treated as design decisions from the start — not problems fixed after launch. Technical choices are made to protect the experience, not just the visuals.",
  },
  {
    num: "03",
    label: "Continuity",
    heading: "Present beyond launch",
    body: "The relationship does not end when the site goes live. Hosting, maintenance, analytics monitoring, and Search Console oversight mean the digital presence keeps working — and improving — as the business grows.",
  },
  {
    num: "04",
    label: "Growth",
    heading: "A foundation for what's next",
    body: "Analytics, search visibility, and optimisation are approached as an ongoing practice, not a one-off report — so a digital presence has room to keep improving as the business does.",
  },
];

export function WorkingPrinciples() {
  const reduce = useReducedMotion();

  return (
    <section className="bg-surface-dark py-(--spacing-section-y) text-foreground-inverse">
      <Container width="wide">

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <div className="flex items-start gap-(--spacing-gutter) pb-(--spacing-content) border-b border-border">
            <h2 className="font-display text-h2 text-foreground-inverse leading-[1.15] max-w-[22ch]">
              More than launch day.
            </h2>
            <span
              aria-hidden="true"
              className="hidden md:block mt-3 h-px w-12 bg-accent shrink-0 self-start"
            />
          </div>
        </motion.div>

        <div className="mt-(--spacing-section-y)">
          {principles.map((p, i) => (
            <motion.div
              key={p.num}
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55, delay: reduce ? 0 : i * 0.06, ease: EASE }}
              className="group grid grid-cols-1 gap-(--spacing-content) py-(--spacing-content) border-b border-border md:grid-cols-12 md:gap-(--spacing-gutter)"
            >
              <div className="md:col-span-2 flex flex-col gap-1 pt-1">
                <span className="font-sans text-small font-semibold uppercase tracking-[0.08em] text-foreground-inverse-muted select-none">
                  {p.num}
                </span>
                <span className="font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-accent select-none">
                  {p.label}
                </span>
              </div>

              <div className="md:col-span-10">
                <h3 className="font-display text-h3 text-foreground-inverse leading-[1.25] transition-transform duration-(--duration-standard) ease-(--ease-standard) group-hover:translate-x-1">
                  {p.heading}
                </h3>
                <p className="mt-4 font-sans text-body leading-[1.65] text-foreground-inverse-muted max-w-[58ch]">
                  {p.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </Container>
    </section>
  );
}
