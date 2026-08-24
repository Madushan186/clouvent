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
 * `value` is the reveal position of the AFTER (right/redesign) layer:
 * 0 = fully Before, 100 = fully After. Before occupies [0, value]%,
 * After occupies [value, 100]% — so the Before label hides as value
 * approaches 0 (its region gets narrow) and the After label hides as
 * value approaches 100, not the other way around.
 */
const EDGE_THRESHOLD = 10;

export function BeforeAfterComparison({
  beforeSrc,
  beforeAlt,
  afterSrc,
  afterAlt,
  accessibleLabel,
  initialPosition = 50,
  className = "",
}: BeforeAfterComparisonProps) {
  const [value, setValue] = useState(initialPosition);
  const showBeforeLabel = value > EDGE_THRESHOLD;
  const showAfterLabel = value < 100 - EDGE_THRESHOLD;

  return (
    <div className={`relative aspect-[16/9] w-full touch-pan-y overflow-hidden select-none ${className}`}>
      <Image
        src={beforeSrc}
        alt={beforeAlt}
        fill
        sizes="(min-width: 768px) 60vw, 100vw"
        className="object-cover object-top"
      />

      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - value}% 0 0)` }}>
        <Image
          src={afterSrc}
          alt={afterAlt}
          fill
          sizes="(min-width: 768px) 60vw, 100vw"
          className="object-cover object-top"
        />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 w-0.5 bg-background-subtle"
        style={{ left: `calc(${value}% - 1px)` }}
      />

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

      <input
        type="range"
        min={0}
        max={100}
        step={1}
        value={value}
        onChange={(event) => setValue(Number(event.target.value))}
        aria-label={accessibleLabel}
        className="comparison-slider absolute inset-0 h-full w-full cursor-ew-resize appearance-none bg-transparent"
      />
    </div>
  );
}
