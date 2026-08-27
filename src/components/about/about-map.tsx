"use client";

import { motion, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/container";
import {
  WORLD_MAP_VIEWBOX,
  WORLD_LAND_PATH,
  AUSTRALIA_PATH,
  AUSTRALIA_CENTROID,
  REGION_ANCHORS,
} from "@/components/home/world-map-data";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Australia First. Built to go further. — Clouvent Black.
 *
 * Reuses the homepage's real map geometry (world-map-data.ts) rather
 * than inventing new coordinates or a second map asset — same
 * accurate, public-domain landmass data, same Australia emphasis.
 * Framing differs deliberately from the homepage: no per-region text
 * labels (Asia/Europe/N. America) here, since this section wants a
 * more abstract "global direction" read rather than named geography.
 * The three region anchors still get quiet neutral dots — reference
 * points, explicitly not client markers — under one shared label.
 */
export function AboutMap() {
  const reduce = useReducedMotion() ?? false;

  const [cx, cy] = AUSTRALIA_CENTROID;
  const labelX = cx + 34;
  const labelY = cy - 6;

  const globalNodes = [REGION_ANCHORS.asia, REGION_ANCHORS.europe, REGION_ANCHORS.northAmerica];

  return (
    <section className="bg-surface-dark py-(--spacing-section-y) text-foreground-inverse">
      <Container width="wide">
        <div className="grid grid-cols-1 gap-(--spacing-section-y) lg:grid-cols-12 lg:gap-(--spacing-gutter) lg:items-center">

          {/* Text column */}
          <div className="lg:col-span-5">
            <motion.p
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="eyebrow text-foreground-inverse-muted"
            >
              Our direction
            </motion.p>

            <motion.h2
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.65, delay: reduce ? 0 : 0.08, ease: EASE }}
              className="mt-(--spacing-content) font-display text-h2 text-foreground-inverse leading-[1.15] max-w-[14ch]"
            >
              Australia first. Built to go further.
            </motion.h2>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: reduce ? 0 : 0.16, ease: EASE }}
              className="mt-(--spacing-content) flex flex-col gap-4"
            >
              <p className="font-sans text-body text-foreground-inverse-muted leading-[1.65] max-w-[42ch]">
                Clouvent is beginning with a clear focus on Australian
                photographers, visual creatives and premium creative
                businesses.
              </p>
              <p className="font-sans text-body text-foreground-inverse-muted leading-[1.65] max-w-[42ch]">
                But our standards, systems and ambitions are intentionally
                broader. We are building Clouvent to become an
                internationally capable digital presence studio — one
                relationship and one carefully delivered project at a time.
              </p>
            </motion.div>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.5, delay: reduce ? 0 : 0.28, ease: EASE }}
              className="mt-(--spacing-content) flex items-center gap-3"
            >
              <span aria-hidden="true" className="h-px w-8 bg-accent shrink-0" />
              <p className="font-sans text-small font-semibold uppercase tracking-[0.1em] text-accent">
                Australia / Initial focus
              </p>
            </motion.div>
          </div>

          {/* Map column */}
          <div className="lg:col-span-7">
            <div
              role="img"
              aria-label="Abstract world map highlighting Australia as Clouvent's initial focus market, with quiet reference nodes elsewhere representing long-term international direction — not existing clients or offices."
              className="relative w-full"
              style={{ aspectRatio: "980 / 500" }}
            >
              <svg viewBox={WORLD_MAP_VIEWBOX} aria-hidden="true" className="absolute inset-0 h-full w-full">
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
                  transition={{ duration: 0.5, delay: reduce ? 0 : 0.4, ease: EASE }}
                />

                <motion.circle
                  cx={cx}
                  cy={cy}
                  r={4}
                  fill="var(--color-background)"
                  initial={reduce ? false : { opacity: 0, scale: 0.4 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.35, delay: reduce ? 0 : 0.6, ease: EASE }}
                  style={{ transformOrigin: `${cx}px ${cy}px` }}
                />

                {/* Quiet neutral reference nodes — deliberately unlabeled by
                    place name, so they read as abstract "global direction"
                    texture rather than named target markets or clients. */}
                {globalNodes.map(([nx, ny], i) => (
                  <motion.circle
                    key={i}
                    cx={nx}
                    cy={ny}
                    r={2.5}
                    fill="var(--color-foreground-inverse-muted)"
                    initial={reduce ? false : { opacity: 0 }}
                    whileInView={{ opacity: 0.5 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: reduce ? 0 : 0.7 + i * 0.08, ease: EASE }}
                  />
                ))}
              </svg>

              {/* AUSTRALIA label — HTML, fixed legible size regardless of
                  the map's rendered width. */}
              <motion.div
                initial={reduce ? false : { opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: reduce ? 0 : 0.7, ease: EASE }}
                className="absolute hidden md:block"
                style={{ left: `${(labelX / 980) * 100}%`, top: `${(labelY / 500) * 100}%` }}
              >
                <p className="font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-accent whitespace-nowrap">
                  Australia
                </p>
              </motion.div>

              {/* GLOBAL / LONG-TERM DIRECTION — single conceptual label,
                  not per-node names. */}
              <motion.div
                initial={reduce ? false : { opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: reduce ? 0 : 0.9, ease: EASE }}
                className="absolute hidden md:block"
                style={{ left: "6%", top: "8%" }}
              >
                <p className="font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-foreground-inverse-muted whitespace-nowrap">
                  Global / Long-term direction
                </p>
              </motion.div>
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}
