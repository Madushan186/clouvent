"use client";

import { motion, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/container";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Ties the case study back to CLOUVENT's BUILD → MANAGE → GROW model.
 * Page-level, renders once regardless of how many case studies exist —
 * lives in page.tsx, not inside CaseStudy.
 */
const architecture = [
  { num: "01", name: "Build", role: "Design + Development" },
  { num: "02", name: "Manage", role: "Maintenance + Monitoring" },
  { num: "03", name: "Grow", role: "Paid Social + Digital Support" },
] as const;

export function BeyondTheBuild() {
  const reduce = useReducedMotion();

  return (
    <section className="bg-background py-(--spacing-section-y)">
      <Container>
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.65, ease: EASE }}
          className="border-b border-border-subtle pb-(--spacing-content)"
        >
          <h2 className="font-display text-h2 text-foreground leading-[1.15] max-w-[18ch]">
            Beyond the build.
          </h2>
          <p className="mt-(--spacing-content) font-sans text-body-lg text-foreground-muted leading-[1.6] max-w-[52ch]">
            The website is only one part of the digital presence. Our ongoing
            work extends into maintenance, monitoring and digital growth support.
          </p>
        </motion.div>

        <div className="mt-(--spacing-section-y) grid grid-cols-1 gap-0 divide-y divide-border-subtle md:grid-cols-3 md:divide-y-0 md:divide-x md:divide-border-subtle">
          {architecture.map((item, i) => (
            <motion.div
              key={item.num}
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: reduce ? 0 : i * 0.09, ease: EASE }}
              className="flex flex-col gap-2 py-(--spacing-content) md:px-(--spacing-gutter) first:md:pl-0 last:md:pr-0"
            >
              <span className="font-sans text-small font-semibold uppercase tracking-[0.1em] text-foreground-muted/50">
                {item.num}
              </span>
              <span className="font-display text-h3 text-foreground leading-[1.15]">
                {item.name}
              </span>
              <span className="font-sans text-small text-foreground-muted">
                {item.role}
              </span>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
