"use client";

import { useState } from "react";
import Image from "next/image";

interface BeforeAfterComparisonProps {
  beforeSrc: string;
  beforeAlt: string;
  afterSrc: string;
  afterAlt: string;
  accessibleLabel: string;
  initialPosition?: number;
  className?: string;
}

/**
 * Generic before/after image comparison — no project-specific content
 * baked in, so it can be reused wherever real project proof calls for it
 * (e.g. a future Work case-study page), not just this one homepage use.
 *
 * The real control is a native <input type="range"> spanning the full
 * box: keyboard (arrow keys, Home/End), touch, and pointer support all
 * come from the browser for free, rather than a custom pointer-only
 * control. Its thumb *is* the visible handle (styled via the
 * `comparison-slider` class in globals.css); the track is transparent.
 * The decorative divider line and labels are aria-hidden and
 * pointer-events-none — the range input is the only real interactive
 * element, and it carries the accessible label. That label is static
 * regardless of value, so hiding a visual label never affects the
 * accessible name or native range/keyboard semantics.
 *
 * BEFORE = old WordPress base layer. AFTER = Clouvent redesign, revealed
 * on the right of the divider via clip-path. `value` is the divider
 * position from the left: 0 = full After (the default — Selected Work
 * should first read as a normal finished portfolio image, not a
 * comparison mid-state), 100 = full Before. Before occupies [0, value]%,
 * After occupies [value, 100]%.
 */
const EDGE_THRESHOLD = 10;

export function BeforeAfterComparison({
  beforeSrc,
  beforeAlt,
  afterSrc,
  afterAlt,
  accessibleLabel,
  initialPosition = 0,
  className = "",
}: BeforeAfterComparisonProps) {
  const [value, setValue] = useState(initialPosition);
  // Gates the "Reveal before" button — permanently dismissed after the
  // first real interaction, by any method. Plain state, no storage.
  const [hasInteracted, setHasInteracted] = useState(false);
  // True only for the brief, explicitly user-triggered 0->50 transition
  // fired by the button — never during manual dragging, which must stay
  // instant. Cleared the moment the user touches the slider directly.
  const [animateReveal, setAnimateReveal] = useState(false);

  const showBeforeLabel = value > EDGE_THRESHOLD;
  const showAfterLabel = value < 100 - EDGE_THRESHOLD;
  // At value=0 there's nothing to divide yet — no divider line, no
  // visible handle, just the finished image and the discovery button.
  const showDivider = value > 0;

  function handleManualInteractionStart() {
    setHasInteracted(true);
    setAnimateReveal(false);
  }

  function handleReveal() {
    setValue(50);
    setHasInteracted(true);
    setAnimateReveal(true);
  }

  return (
    <div className={`relative aspect-[16/9] w-full touch-pan-y overflow-hidden select-none ${className}`}>
      <Image
        src={beforeSrc}
        alt={beforeAlt}
        fill
        sizes="(min-width: 768px) 60vw, 100vw"
        className="object-cover object-top"
      />

      {/* inset(top right bottom left) insets FROM each edge — insetting
          the left edge by value% (right edge at 0) reveals After from
          value% to 100%, i.e. the right side. Get this backwards and the
          two images swap sides while everything else still looks
          correct — verify visually, not just by reading the logic.
          transition-[clip-path] is only added for the one explicit
          button-triggered reveal (animateReveal) — manual dragging must
          never have a transition lag. */}
      <div
        className={`absolute inset-0 ${
          animateReveal ? "transition-[clip-path] duration-(--duration-deliberate) ease-(--ease-standard)" : ""
        }`}
        style={{ clipPath: `inset(0 0 0 ${value}%)` }}
      >
        <Image
          src={afterSrc}
          alt={afterAlt}
          fill
          sizes="(min-width: 768px) 60vw, 100vw"
          className="object-cover object-top"
        />
      </div>

      {showDivider && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 w-0.5 bg-background-subtle"
          style={{ left: `calc(${value}% - 1px)` }}
        />
      )}

      {/* Anchored to the outer edges, not the divider — only opacity
          changes, position never does, so labels don't chase the handle. */}
      <span
        aria-hidden="true"
        className={`eyebrow pointer-events-none absolute top-3 left-3 bg-surface-dark/70 px-2 py-1 text-foreground-inverse transition-opacity duration-(--duration-fast) ease-(--ease-standard) ${
          showBeforeLabel ? "opacity-100" : "opacity-0"
        }`}
      >
        Before
      </span>
      <span
        aria-hidden="true"
        className={`eyebrow pointer-events-none absolute top-3 right-3 bg-surface-dark/70 px-2 py-1 text-foreground-inverse transition-opacity duration-(--duration-fast) ease-(--ease-standard) ${
          showAfterLabel ? "opacity-100" : "opacity-0"
        }`}
      >
        After
      </span>

      {/* Discovery control — a real button, not a decorative div, since
          it's an actual action (reveals Before at 50%). Dismissed
          permanently once any interaction happens, same as the divider
          becoming visible. z-10 so it takes click priority over the
          full-box range input beneath it. */}
      {!hasInteracted && (
        <button
          type="button"
          onClick={handleReveal}
          aria-label="Reveal previous website for comparison"
          className="eyebrow absolute bottom-4 left-4 z-10 flex items-center gap-1.5 rounded-full bg-surface-dark/60 px-3 py-1.5 text-foreground-inverse transition-[background-color,transform] duration-(--duration-fast) ease-(--ease-standard) hover:bg-surface-dark/80 active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <span aria-hidden="true" className="discovery-nudge">
            ←
          </span>
          Reveal before
        </button>
      )}

      <input
        type="range"
        min={0}
        max={100}
        step={1}
        value={value}
        onChange={(event) => setValue(Number(event.target.value))}
        onPointerDown={handleManualInteractionStart}
        onKeyDown={handleManualInteractionStart}
        aria-label={accessibleLabel}
        className={`comparison-slider absolute inset-0 h-full w-full cursor-ew-resize appearance-none bg-transparent ${
          showDivider ? "" : "comparison-slider--edge"
        }`}
      />
    </div>
  );
}
