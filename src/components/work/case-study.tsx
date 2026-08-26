"use client";

import { motion, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/container";
import { BeforeAfterComparison } from "@/components/ui/before-after-comparison";
import Image from "next/image";
import type { CaseStudy as CaseStudyType } from "./work-data";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * One full case-study "chapter" — Featured Project image, story, an
 * optional before/after, the delivered list, and a built-with footnote.
 * Reusable: takes a CaseStudy record as its only prop, so a second
 * project is a second <CaseStudy data={...} /> with no structural
 * change here. Studio White surface, matching the homepage's Selected
 * Work "proof" chapter.
 */
export function CaseStudy({ data }: { data: CaseStudyType }) {
  const reduce = useReducedMotion();

  const reveal = (delay = 0) => ({
    initial: reduce ? false : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.7, delay: reduce ? 0 : delay, ease: EASE },
  });

  return (
    <article className="bg-background-subtle py-(--spacing-section-y)">
      <Container width="wide">

        {/* ── Featured image — full-bleed, no overlay text, no slider.
             The comparison widget is reserved for its own section below,
             so this stays a plain, confident presentation. ── */}
        <motion.div
          {...reveal(0)}
          className="relative w-full overflow-hidden"
          style={{ aspectRatio: "3600 / 2084" }}
        >
          <Image
            src={data.featuredImage.src}
            alt={data.featuredImage.alt}
            fill
            sizes="(min-width: 1280px) 1200px, 100vw"
            className="object-cover object-top"
          />
        </motion.div>

        {/* ── Metadata row ── */}
        <motion.div
          {...reveal(0.1)}
          className="mt-(--spacing-content) flex flex-col gap-(--spacing-content) border-b border-border-subtle pb-(--spacing-section-y) md:flex-row md:items-end md:justify-between"
        >
          <div>
            <span className="font-sans text-small font-semibold uppercase tracking-[0.08em] text-accent">
              Selected Work / 01
            </span>
            <h2 className="mt-(--spacing-content) font-display text-h1 text-foreground leading-[1.1]">
              {data.name}
            </h2>
            <p className="mt-2 font-sans text-body text-foreground-muted">
              {data.location} · {data.summary}
            </p>
          </div>

          <div className="flex flex-col items-start gap-4 md:items-end">
            <ul className="flex flex-wrap gap-2 md:justify-end" aria-label="Services delivered">
              {data.tags.map((tag) => (
                <li
                  key={tag}
                  className="font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-foreground-muted border border-border-subtle px-2.5 py-1 rounded-(--radius-control)"
                >
                  {tag}
                </li>
              ))}
            </ul>
            <a
              href={data.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 font-sans text-body text-foreground underline decoration-border-subtle decoration-1 underline-offset-4 transition-[text-decoration-color,text-decoration-thickness] duration-(--duration-fast) hover:decoration-foreground hover:decoration-2"
            >
              Visit the live site
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
                <path d="M1.5 11.5 11.5 1.5M11.5 1.5H5.5M11.5 1.5V7.5" />
              </svg>
            </a>
          </div>
        </motion.div>

        {/* ── The Project (story) ── */}
        <motion.div {...reveal(0)} className="mt-(--spacing-section-y) max-w-(--width-content)">
          <h3 className="font-sans text-small font-semibold uppercase tracking-[0.1em] text-foreground-muted/60">
            The project
          </h3>
          <div className="mt-(--spacing-content) flex flex-col gap-5">
            {data.story.map((paragraph, i) => (
              <p key={i} className="font-sans text-body-lg text-foreground-muted leading-[1.65]">
                {paragraph}
              </p>
            ))}
          </div>
        </motion.div>

        {/* ── Before & after (conditional — only if real assets exist) ── */}
        {data.beforeAfter && (
          <motion.div {...reveal(0)} className="mt-(--spacing-section-y)">
            <h3 className="font-sans text-small font-semibold uppercase tracking-[0.1em] text-foreground-muted/60">
              Before &amp; after
            </h3>
            <p className="mt-(--spacing-content) font-sans text-body text-foreground-muted max-w-(--width-content)">
              Drag to compare the previous WordPress site with the Clouvent redesign.
            </p>
            <div className="mt-(--spacing-content)">
              <BeforeAfterComparison
                beforeSrc={data.beforeAfter.beforeSrc}
                beforeAlt={data.beforeAfter.beforeAlt}
                afterSrc={data.beforeAfter.afterSrc}
                afterAlt={data.beforeAfter.afterAlt}
                accessibleLabel={`Compare ${data.name}'s previous website with the Clouvent redesign`}
              />
            </div>
          </motion.div>
        )}

        {/* ── What we delivered — ruled list, one interaction pattern ── */}
        <motion.div {...reveal(0)} className="mt-(--spacing-section-y)">
          <h3 className="font-sans text-small font-semibold uppercase tracking-[0.1em] text-foreground-muted/60">
            What we delivered
          </h3>
          <ol className="mt-(--spacing-content) border-t border-border-subtle">
            {data.delivered.map((item, i) => (
              <li
                key={item}
                className="group flex items-center justify-between gap-4 border-b border-border-subtle py-4"
              >
                <span className="flex items-center gap-4">
                  <span
                    aria-hidden="true"
                    className="h-px w-6 bg-accent transition-[width] duration-(--duration-deliberate) ease-(--ease-standard) group-hover:w-10"
                  />
                  <span className="font-sans text-body text-foreground transition-transform duration-(--duration-standard) ease-(--ease-standard) group-hover:translate-x-1">
                    {item}
                  </span>
                </span>
                <span className="font-sans text-small text-foreground-muted/50 shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </li>
            ))}
          </ol>

          {/* Built with — compact footnote, not its own section */}
          <p className="mt-(--spacing-content) font-sans text-small text-foreground-muted/60 uppercase tracking-[0.08em]">
            Built with — {data.builtWith.join(" · ")}
          </p>
        </motion.div>

      </Container>
    </article>
  );
}
