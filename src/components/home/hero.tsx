"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

/**
 * HERO — Redesigned. Cloud Ivory surface.
 *
 * The core problem with v1: content was centered in a min-h-[100dvh] section,
 * leaving identical dead space above and below — the image was a small
 * landscape thumbnail with no visual authority.
 *
 * This redesign uses a full-height compositional structure:
 *
 * ┌──────────────────────────────────────────────────────────┐
 * │ NAV (sticky, above)                                      │
 * ├──────────────────────────────────── ┊ ───────────────────┤
 * │                                     ┊                    │
 * │  Eyebrow                            ┊   FULL-HEIGHT      │
 * │                                     ┊   IMAGE PANEL      │
 * │  H1 — large Instrument Serif        ┊   object-cover     │
 * │                                     ┊                    │
 * │  Subtext                            ┊   [caption strip]  │
 * │                                     ┊                    │
 * │  [Start a project]   See the work   ┊                    │
 * │                                     ┊                    │
 * ├─────────────────────────────────────┊───────────────────-┤
 * │  BUILD · MANAGE · GROW                                   │
 * └──────────────────────────────────────────────────────────┘
 *
 * Key decisions:
 * 1. Image panel uses absolute positioning to fill full section height.
 *    This is "contained within its zone" per spec §6 — it stays in
 *    the right 40% and does not cover the text.
 * 2. The seam is a real, visible vertical rule at the 62% mark.
 *    A copper node sits at the seam top — precise graphic motif.
 * 3. BUILD/MANAGE/GROW is anchored to the section bottom as a
 *    structural footer strip — gives the section a full floor.
 * 4. Text is vertically distributed (not just centered) using flex
 *    column with justify-center inside the left zone.
 * 5. Mobile: image moves below text, full-width, 3:2 crop.
 *    BUILD/MANAGE/GROW remains as section close.
 *
 * Performance: image is LCP candidate — priority, correctly sized.
 * Motion: fade+translate, staggered, once. Spec §17.
 * Accessibility: h1, semantic landmarks, focus states preserved.
 */

const EASE = [0.22, 1, 0.36, 1] as const;

// Stagger helper — slide up + fade. Used for text elements in sequence.
//
// `animate` is always defined, even when reduce is true — only `initial`
// is gated to `false`. This matters: if `animate` were omitted too (as an
// earlier version of this helper did), a component could get stuck at its
// SSR-rendered opacity:0 forever. SSR always renders as if reduce=false
// (matchMedia isn't available server-side), so the server HTML bakes in
// the animated starting style; on hydration, if the client's real
// prefers-reduced-motion is "reduce", framer-motion needs an unconditional
// `animate` target to drive the element to its correct final state —
// `initial={false}` alone just means "don't play a transition from here,"
// not "ignore whatever the DOM already has."
function up(i: number, reduce: boolean) {
  if (reduce) return { initial: false, animate: { opacity: 1, y: 0 } };
  return {
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.65, delay: i * 0.1, ease: EASE },
  };
}

// Pure fade, no transform. Used for the image panel and strip.
function fade(delay: number, reduce: boolean) {
  if (reduce) return { initial: false, animate: { opacity: 1 } };
  return {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.85, delay, ease: EASE },
  };
}

// Clip-path mask-wipe + slight rise, reserved for the headline only — the
// one signature reveal in the sequence. Everything else keeps the plain
// fade+translate in `up()` above; emil-design-eng's clip-path guidance
// treats reveals like this as a first-class use of the property.
function maskUp(delay: number, reduce: boolean) {
  if (reduce) {
    return { initial: false, animate: { clipPath: "inset(0% 0 0% 0)", opacity: 1, y: 0 } };
  }
  return {
    initial: { clipPath: "inset(0% 0 100% 0)", opacity: 0, y: 12 },
    animate: { clipPath: "inset(0% 0 0% 0)", opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: EASE },
  };
}

// One-time scale-settle on load — not a Ken Burns loop. Starts very
// slightly zoomed and eases to rest, once, on mount only.
function settle(delay: number, reduce: boolean) {
  if (reduce) return { initial: false, animate: { scale: 1 } };
  return {
    initial: { scale: 1.045 },
    animate: { scale: 1 },
    transition: { duration: 1.3, delay, ease: EASE },
  };
}

export function Hero() {
  const reduce = useReducedMotion() ?? false;

  return (
    <section
      id="hero"
      className="relative bg-background min-h-[100dvh] flex flex-col overflow-hidden"
    >

      {/* ─────────────────────────────────────────────────────
          RIGHT PANEL: full-height image — desktop only.
          Absolute so it fills the section from nav to BUILD strip.
          Left-bounded at 62% of the section width.
          The seam rule (below) marks exactly this 62% boundary.
          ───────────────────────────────────────────────────── */}
      <motion.div
        {...fade(0.25, reduce)}
        className="absolute top-0 right-0 bottom-0 left-[62%] hidden md:block overflow-hidden"
      >
        {/* Scale-settle layer — isolated from the caption strip below so
            only the photograph zooms, not the caption text. */}
        <motion.div {...settle(0.25, reduce)} className="absolute inset-0">
          <Image
            src="/studio-workspace.jpg"
            alt="A photographer's studio — Clouvent serves photographers and visual businesses"
            fill
            priority
            sizes="38vw"
            className="object-cover object-center"
          />
        </motion.div>

        {/*
         * Caption strip — solid, not a gradient scrim.
         * Per spec §15: "where text must sit over an image, a solid
         * caption zone is used, not a gradient scrim."
         * Cloud Ivory background matches the page — clean, intentional.
         */}
        <div className="absolute bottom-0 inset-x-0 bg-background/90 backdrop-blur-[2px] px-5 py-3 border-t border-border-subtle/40">
          <p className="font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-foreground-muted">
            <span className="text-accent mr-1.5">Focus</span>
            Photography &amp; visual businesses
          </p>
        </div>
      </motion.div>

      {/* ─────────────────────────────────────────────────────
          SEAM — visible vertical rule at 62%. Desktop only.
          A copper node at the top marks the split precisely.
          This replaces the barely-visible dot from v1.
          ───────────────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute top-0 bottom-[3.25rem] left-[62%] w-px bg-border-subtle/60 hidden md:block"
      />
      {/* Copper seam node — top of seam rule */}
      <div
        aria-hidden="true"
        className="absolute top-6 left-[62%] -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-accent hidden md:block"
      />
      {/* Copper seam node — bottom of seam rule (where it meets BUILD strip) */}
      <div
        aria-hidden="true"
        className="absolute bottom-[3.25rem] left-[62%] -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-accent hidden md:block"
      />

      {/* ─────────────────────────────────────────────────────
          LEFT ZONE: text content.
          flex-1 so it fills the section between the top and the
          BUILD strip. items-center vertically centers the text
          in the available height without dead symmetrical space.
          ───────────────────────────────────────────────────── */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="mx-auto w-full max-w-(--width-wide) px-(--spacing-gutter)">

          {/* Text constrained to left 60% on desktop. Full width on mobile. */}
          <div className="w-full md:w-[58%] flex flex-col">

            {/* Eyebrow — with a leading copper rule for visual weight */}
            <motion.div
              {...up(0, reduce)}
              className="flex items-center gap-3"
            >
              <span aria-hidden="true" className="h-px w-8 bg-accent shrink-0" />
              <p className="eyebrow text-foreground-muted">
                Clouvent — Digital Presence Studio
              </p>
            </motion.div>

            {/*
             * H1 — Instrument Serif, display scale, text-balance.
             * line-height tightened to 0.98 for editorial density.
             * max-w constrains to ~2 lines at all display sizes.
             */}
            <motion.h1
              {...maskUp(0.1, reduce)}
              className="mt-8 font-display text-display leading-[0.98] tracking-tight text-foreground text-balance max-w-[13ch]"
            >
              Your work deserves a digital presence to match.
            </motion.h1>

            <motion.p
              {...up(2, reduce)}
              className="mt-6 font-sans text-body-lg leading-[1.6] text-foreground-muted max-w-[40ch]"
            >
              Premium websites built, managed, and grown as a continuous partnership.
            </motion.p>

            {/* CTAs */}
            <motion.div
              {...up(3, reduce)}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <Link
                href="/contact"
                className="inline-flex items-center justify-center font-sans text-body font-medium rounded-(--radius-control) bg-accent text-foreground px-7 py-3.5 transition-colors duration-(--duration-standard) ease-(--ease-standard) hover:bg-accent-hover active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                Start a project
              </Link>

              <Link
                href="#selected-work"
                className="group inline-flex items-center gap-1.5 font-sans text-body font-medium text-foreground-muted hover:text-foreground transition-colors duration-(--duration-fast) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent rounded-(--radius-control)"
              >
                <span className="relative">
                  See the work
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-0.5 h-px bg-current origin-left scale-x-0 transition-transform duration-(--duration-standard) ease-(--ease-standard) group-hover:scale-x-100"
                  />
                </span>
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

            {/*
             * Mobile-only image — full-width below CTAs.
             * Spec §18: "Mobile: split stacks vertically — typography first,
             * image second."
             * Uses 3:2 aspect on mobile — wider than portrait, better for
             * smaller screens.
             */}
            <motion.div
              {...fade(0.3, reduce)}
              className="mt-8 block md:hidden relative aspect-[3/2] w-full overflow-hidden rounded-(--radius-control)"
            >
              <motion.div {...settle(0.3, reduce)} className="absolute inset-0">
                <Image
                  src="/studio-workspace.jpg"
                  alt="A photographer's studio — Clouvent serves photographers and visual businesses"
                  fill
                  sizes="100vw"
                  className="object-cover object-center"
                />
              </motion.div>
            </motion.div>

          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────
          BUILD · MANAGE · GROW — anchored to section bottom.
          Full-width strip that acts as the visual floor of the
          hero. The seam nodes above terminate exactly here.
          ───────────────────────────────────────────────────── */}
      <motion.div
        {...fade(0.55, reduce)}
        className="relative z-10 border-t border-border-subtle"
      >
        <div className="mx-auto flex w-full max-w-(--width-wide) items-center justify-between px-(--spacing-gutter) py-4">

          {/* Left: brand architecture labels */}
          <div className="flex items-center gap-1 sm:gap-2">
            {(["Build", "Manage", "Grow"] as const).map((word, i) => (
              <span key={word} className="flex items-center gap-1 sm:gap-2">
                {i > 0 && (
                  <span
                    aria-hidden="true"
                    className="h-px w-4 bg-border-subtle hidden sm:block"
                  />
                )}
                <span className="font-sans text-small font-semibold uppercase tracking-[0.14em] text-foreground-muted hover:text-accent transition-colors duration-(--duration-standard) cursor-default select-none">
                  {word}
                </span>
              </span>
            ))}
          </div>

          {/* Right: subtle scroll-to-work indicator */}
          <Link
            href="#selected-work"
            aria-label="Scroll to selected work"
            className="flex items-center gap-1.5 font-sans text-small text-foreground-muted/50 hover:text-foreground-muted transition-colors duration-(--duration-fast) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent rounded-sm"
          >
            <svg
              aria-hidden="true"
              width="14" height="14"
              viewBox="0 0 14 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 2v10M3 8l4 4 4-4" />
            </svg>
          </Link>

        </div>
      </motion.div>

    </section>
  );
}
