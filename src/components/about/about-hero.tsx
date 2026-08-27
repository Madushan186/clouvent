"use client";

import { motion, useReducedMotion } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

// `animate` stays defined even when reduce is true — omitting it entirely
// can leave an element stuck at its SSR-rendered starting style after
// hydration (the bug confirmed and fixed across Hero/ServicesHero/
// ContactHero/AboutHero earlier this session).
function up(i: number, reduce: boolean) {
  if (reduce) return { initial: false, animate: { opacity: 1, y: 0 } };
  return {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay: i * 0.09, ease: EASE },
  };
}

/**
 * "Digital architecture" composition for the dark panel — thin grid
 * lines, sparse nodes, one ascending trajectory anchored by a single
 * copper node. Square viewBox (500x500) so the same geometry scales
 * cleanly via preserveAspectRatio="meet" (contain, never cropped) into
 * both the tall desktop panel and the wide mobile band, rather than
 * authoring two coordinate systems.
 *
 * `simplified` drops the secondary grid lines/nodes/ticks/metadata for
 * the mobile band per the brief's "reduced horizontal fragment"
 * instruction — genuinely less content, not just a smaller crop of the
 * same density.
 */
function ArchitectureGraphic({
  reduce,
  simplified = false,
}: {
  reduce: boolean;
  simplified?: boolean;
}) {
  const lineReveal = (delay: number) => ({
    initial: reduce ? false : { opacity: 0 },
    animate: { opacity: simplified ? 0.16 : 0.12 },
    transition: { duration: 0.5, delay: reduce ? 0 : delay, ease: EASE },
  });

  const nodeReveal = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, scale: 0.4 },
    animate: { opacity: 0.35, scale: 1 },
    transition: { duration: 0.4, delay: reduce ? 0 : delay, ease: EASE },
  });

  return (
    <svg
      viewBox="0 0 500 500"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      className="h-full w-full"
    >
      {/* Structural grid lines */}
      <motion.line x1="0" y1="180" x2="500" y2="180" stroke="var(--color-border)" strokeWidth="1" {...lineReveal(0)} />
      <motion.line x1="0" y1="340" x2="500" y2="340" stroke="var(--color-border)" strokeWidth="1" {...lineReveal(0.08)} />
      {!simplified && (
        <>
          <motion.line x1="0" y1="60" x2="500" y2="60" stroke="var(--color-border)" strokeWidth="1" {...lineReveal(0.04)} />
          <motion.line x1="150" y1="0" x2="150" y2="500" stroke="var(--color-border)" strokeWidth="1" {...lineReveal(0.12)} />
          <motion.line x1="360" y1="0" x2="360" y2="500" stroke="var(--color-border)" strokeWidth="1" {...lineReveal(0.16)} />
        </>
      )}

      {/* Sparse connection nodes */}
      <motion.circle cx="150" cy="180" r="2" fill="var(--color-foreground-inverse-muted)" {...nodeReveal(0.2)} />
      <motion.circle cx="360" cy="340" r="2" fill="var(--color-foreground-inverse-muted)" {...nodeReveal(0.26)} />
      {!simplified && (
        <>
          <motion.circle cx="150" cy="60" r="2" fill="var(--color-foreground-inverse-muted)" {...nodeReveal(0.22)} />
          <motion.circle cx="360" cy="60" r="2" fill="var(--color-foreground-inverse-muted)" {...nodeReveal(0.3)} />
          <motion.circle cx="70" cy="340" r="2" fill="var(--color-foreground-inverse-muted)" {...nodeReveal(0.34)} />
        </>
      )}

      {/* Coordinate tick marks — decorative structure only, no invented data */}
      {!simplified && (
        <motion.g {...lineReveal(0.1)} stroke="var(--color-border)" strokeWidth="1">
          <line x1="20" y1="450" x2="20" y2="462" />
          <line x1="20" y1="456" x2="70" y2="456" />
          <line x1="480" y1="40" x2="480" y2="52" />
          <line x1="430" y1="46" x2="480" y2="46" />
        </motion.g>
      )}

      {/* The one ascending trajectory — BUILD -> MANAGE -> GROW,
          communicated as progression, never spelled out literally. */}
      <motion.path
        d="M100 400 C 170 360, 210 300, 250 260 C 290 220, 330 170, 410 100"
        fill="none"
        stroke="var(--color-accent)"
        strokeWidth="1.5"
        strokeLinecap="round"
        initial={reduce ? false : { pathLength: 0, opacity: 0.7 }}
        animate={{ pathLength: 1, opacity: 0.7 }}
        transition={{ duration: 0.7, delay: reduce ? 0 : 0.42, ease: EASE }}
      />

      {/* The single primary copper node — appears last, the focal point */}
      <motion.circle
        cx="250"
        cy="260"
        r="4.5"
        fill="var(--color-accent)"
        initial={reduce ? false : { opacity: 0, scale: 0.4 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35, delay: reduce ? 0 : 0.85, ease: EASE }}
        style={{ transformOrigin: "250px 260px" }}
      />

      {!simplified && (
        <motion.g
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: reduce ? 0 : 1.0, ease: EASE }}
          fill="var(--color-foreground-inverse-muted)"
          fontFamily="var(--font-sans)"
          fontSize="9"
          fontWeight={600}
          letterSpacing="1.2"
        >
          <text x="480" y="470" textAnchor="end">EDITORIAL CRAFT</text>
          <text x="480" y="483" textAnchor="end" opacity="0.6">×</text>
          <text x="480" y="496" textAnchor="end">DIGITAL PRECISION</text>
        </motion.g>
      )}
    </svg>
  );
}

/**
 * About Hero — redesigned per approved brief (2026-08-27), scoped to
 * this section only. Asymmetric split: 58% Cloud Ivory editorial
 * message / 42% Clouvent Black+Graphite "digital architecture" panel.
 * id="hero" preserved — Header's scroll-opacity IntersectionObserver
 * depends on it (see header.tsx's comment).
 */
export function AboutHero() {
  const reduce = useReducedMotion() ?? false;

  return (
    <section
      id="hero"
      className="relative bg-background min-h-[90vh] flex flex-col md:flex-row overflow-hidden"
    >
      {/* LEFT — editorial message, 58% on desktop */}
      <div className="relative z-10 flex-1 md:w-[58%] flex flex-col justify-center px-(--spacing-gutter) py-(--spacing-section-y)">
        <div className="w-full max-w-(--width-wide) mx-auto md:mx-0 md:ml-auto md:max-w-[34rem]">
          <motion.p {...up(0, reduce)} className="eyebrow text-accent">
            About / Clouvent
          </motion.p>

          <motion.h1
            {...up(1, reduce)}
            className="mt-(--spacing-content) font-display text-display text-foreground leading-[1.02] tracking-tight text-balance max-w-[14ch]"
          >
            Digital presence,{" "}
            <span className="italic text-foreground-muted">
              built with intention.
            </span>
          </motion.h1>

          <motion.p
            {...up(2, reduce)}
            className="mt-(--spacing-content) font-sans text-body-lg text-foreground-muted leading-[1.6] max-w-[38ch]"
          >
            Clouvent is a premium digital presence studio creating
            considered digital experiences — then managing and improving
            them beyond launch.
          </motion.p>

          <motion.div {...up(3, reduce)} className="mt-(--spacing-section-y)">
            <a
              href="#why-clouvent"
              className="group inline-flex items-center gap-1.5 font-sans text-small font-semibold uppercase tracking-[0.08em] text-foreground-muted hover:text-foreground transition-colors duration-(--duration-fast) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent rounded-(--radius-control)"
            >
              Our approach
              <svg
                aria-hidden="true"
                width="12" height="12"
                viewBox="0 0 13 13"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform duration-(--duration-fast) group-hover:translate-y-0.5"
              >
                <path d="M6.5 2v9M2.5 7.5l4 4 4-4" />
              </svg>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Thin copper seam — crosses both worlds, desktop only */}
      <motion.div
        aria-hidden="true"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 0.35 }}
        transition={{ duration: 0.6, delay: reduce ? 0 : 0.15, ease: EASE }}
        className="hidden md:block absolute left-0 right-0 top-[42%] h-px bg-accent z-20 pointer-events-none"
      />

      {/* RIGHT — digital architecture panel, 42% on desktop */}
      <div className="hidden md:block md:w-[42%] relative bg-surface-dark-elevated">
        <ArchitectureGraphic reduce={reduce} />
      </div>

      {/* Mobile — reduced horizontal fragment, below the text */}
      <div className="block md:hidden relative aspect-[2/1] w-full bg-surface-dark-elevated">
        <ArchitectureGraphic reduce={reduce} simplified />
      </div>
    </section>
  );
}
