"use client";

import { motion, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/container";
import {
  WORLD_MAP_VIEWBOX,
  WORLD_LAND_PATH,
  AUSTRALIA_PATH,
  AUSTRALIA_CENTROID,
  REGION_ANCHORS,
} from "./world-map-data";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Australia / Global Perspective — Clouvent Black surface.
 *
 * Purpose: state market positioning honestly (Australia-first today,
 * international standard of craft) — not to display a client footprint.
 * No markers, routes, or labels imply an operating location, client, or
 * office anywhere outside Australia. See world-map-data.ts for the
 * geometry's provenance (real, public-domain landmass data, not
 * hand-drawn borders).
 *
 * Reveal sequence on scroll-into-view, once: world outline fades in,
 * then Australia's fill crossfades from neutral to copper, then its
 * node + label settle in. Reduced motion shows the finished state
 * immediately — nothing here depends on the sequence to convey meaning.
 */
export function WorldMarketMap() {
  const reduce = useReducedMotion() ?? false;

  const [cx, cy] = AUSTRALIA_CENTROID;
  const labelX = cx + 34;
  const labelY = cy - 6;

  return (
    <section className="bg-surface-dark py-(--spacing-section-y) text-foreground-inverse">
      <Container width="wide">
        <div className="grid grid-cols-1 gap-(--spacing-section-y) lg:grid-cols-12 lg:gap-(--spacing-gutter) lg:items-center">

          {/* ── Text column ──────────────────────────────────────────── */}
          <div className="lg:col-span-5">
            <motion.h2
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.65, ease: EASE }}
              className="font-display text-h2 text-foreground-inverse leading-[1.15] max-w-[16ch]"
            >
              Australia-first. International by design.
            </motion.h2>

            <motion.p
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: reduce ? 0 : 0.1, ease: EASE }}
              className="mt-(--spacing-content) font-sans text-body text-foreground-inverse-muted leading-[1.65] max-w-[42ch]"
            >
              Australia is Clouvent&apos;s priority market today, with an initial
              focus on photographers and visual/creative businesses. The
              studio is built around standards and systems designed to
              support businesses beyond one market over time.
            </motion.p>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.5, delay: reduce ? 0 : 0.25, ease: EASE }}
              className="mt-(--spacing-content) flex items-center gap-3"
            >
              <span aria-hidden="true" className="h-px w-8 bg-accent shrink-0" />
              <p className="font-sans text-small font-semibold uppercase tracking-[0.1em] text-accent">
                Primary market / Australia
              </p>
            </motion.div>
          </div>

          {/* ── Map column ───────────────────────────────────────────── */}
          <div className="lg:col-span-7">
            <div
              role="img"
              aria-label="World map highlighting Australia as Clouvent's current priority market. Australia is emphasized in copper; the rest of the world is shown in a neutral tone, with no client or office locations implied."
              className="relative w-full"
              style={{ aspectRatio: "980 / 500" }}
            >
              <svg
                viewBox={WORLD_MAP_VIEWBOX}
                aria-hidden="true"
                className="absolute inset-0 h-full w-full"
              >
                <motion.path
                  d={WORLD_LAND_PATH}
                  fill="var(--color-border)"
                  initial={reduce ? false : { opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.9, ease: EASE }}
                />

                <motion.path
                  d={AUSTRALIA_PATH}
                  fill="var(--color-accent)"
                  initial={reduce ? false : { opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: reduce ? 0 : 0.7, ease: EASE }}
                />

                {/* Sparse node marking Australia — approved graphic motif */}
                <motion.circle
                  cx={cx}
                  cy={cy}
                  r={4}
                  fill="var(--color-background)"
                  initial={reduce ? false : { opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.4, delay: reduce ? 0 : 1.1, ease: EASE }}
                  style={{ transformOrigin: `${cx}px ${cy}px` }}
                />

                {/* Restrained region orientation labels — real geography,
                    not client markers. Hidden on small screens per the
                    mobile legibility rule (no tiny unreadable labels). */}
                <g
                  className="hidden sm:block"
                  fill="var(--color-foreground-inverse-muted)"
                  fontFamily="var(--font-sans)"
                  fontSize="15"
                  fontWeight={600}
                  letterSpacing="1.5"
                  opacity={0.65}
                >
                  <text x={REGION_ANCHORS.asia[0]} y={REGION_ANCHORS.asia[1]} textAnchor="middle">
                    ASIA
                  </text>
                  <text x={REGION_ANCHORS.europe[0]} y={REGION_ANCHORS.europe[1]} textAnchor="middle">
                    EUROPE
                  </text>
                  <text
                    x={REGION_ANCHORS.northAmerica[0]}
                    y={REGION_ANCHORS.northAmerica[1]}
                    textAnchor="middle"
                  >
                    N. AMERICA
                  </text>
                </g>
              </svg>

              {/* AUSTRALIA label — HTML, not SVG text, so it stays a fixed
                  legible size regardless of the map's rendered width. */}
              <motion.div
                initial={reduce ? false : { opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: reduce ? 0 : 1.2, ease: EASE }}
                className="absolute hidden md:block"
                style={{ left: `${(labelX / 980) * 100}%`, top: `${(labelY / 500) * 100}%` }}
              >
                <p className="font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-accent whitespace-nowrap">
                  Australia
                </p>
              </motion.div>
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}
