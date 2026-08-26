"use client";

/**
 * PricingTable — client boundary is scoped here only.
 * Only this component needs "use client" for the currency useState.
 * The Services page itself remains a Server Component.
 *
 * Visual architecture: editorial index rows, not floating cards.
 * Each service occupies a full-width row divided by fine border-t rules.
 *
 * Desktop layout per row:
 * ┌──────────────────────────────────────────────────────────────────────┐
 * │ 01 / BUILD    From A$1,490   Design + dev    [description+services]  │
 * │               One-time       Start a Project →                        │
 * ├──────────────────────────────────────────────────────────────────────┤
 * │ 02 / MANAGE   ...                                                     │
 * │ 03 / GROW     ...                                                     │
 * └──────────────────────────────────────────────────────────────────────┘
 *
 * 12-column grid per row:
 * - col 1-2:  number + name (label zone)
 * - col 3-5:  price + billing (price zone — major typographic moment)
 * - col 6-12: descriptor + description + services + CTA + footnote
 *
 * Currency selector: segmented control using role="group" + radio-like
 * buttons. Keyboard-navigable. Copper accent marks active state — also
 * reinforced by aria-pressed and font-weight for non-colour users.
 *
 * Motion: restrained. Rows fade-up on scroll (whileInView, once).
 * Prices crossfade on currency change (opacity transition).
 * Copper rule expands on row hover. Arrow nudges on CTA hover.
 * All motion gated on useReducedMotion().
 */

import { useState, useId } from "react";
import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { pricingData, type Currency } from "./pricing-data";

const EASE = [0.22, 1, 0.36, 1] as const;

// ─── Currency Selector ────────────────────────────────────────────────────────

function CurrencySelector({
  value,
  onChange,
  groupId,
}: {
  value: Currency;
  onChange: (c: Currency) => void;
  groupId: string;
}) {
  const currencies: Currency[] = ["AUD", "USD"];

  return (
    <div
      role="group"
      aria-labelledby={`${groupId}-label`}
      className="inline-flex items-center rounded-(--radius-control) border border-border-subtle overflow-hidden"
    >
      <span id={`${groupId}-label`} className="sr-only">
        Select currency
      </span>
      {currencies.map((c) => {
        const isActive = value === c;
        return (
          <button
            key={c}
            type="button"
            onClick={() => onChange(c)}
            aria-pressed={isActive}
            className={[
              "relative font-sans text-small font-semibold uppercase tracking-[0.1em] px-4 py-2",
              "transition-colors duration-(--duration-standard) ease-(--ease-standard)",
              "focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-accent",
              isActive
                ? "bg-accent text-foreground"
                : "bg-transparent text-foreground-muted hover:text-foreground",
            ].join(" ")}
          >
            {c}
          </button>
        );
      })}
    </div>
  );
}

// ─── Price Display ─────────────────────────────────────────────────────────────
// Isolated so transition only wraps the price, not the surrounding layout.

function PriceDisplay({
  display,
  billing,
  reduce,
}: {
  display: string;
  billing: string;
  reduce: boolean;
}) {
  return (
    <div
      className="transition-opacity duration-(--duration-standard) ease-(--ease-standard)"
      style={{ opacity: reduce ? 1 : undefined }}
    >
      <span className="font-display text-h2 text-foreground leading-none tracking-tight block">
        {display}
      </span>
      <span className="mt-2 font-sans text-small text-foreground-muted uppercase tracking-[0.08em] font-semibold block">
        {billing}
      </span>
    </div>
  );
}

// ─── Service Row ───────────────────────────────────────────────────────────────

function ServiceRow({
  item,
  currency,
  index,
  reduce,
}: {
  item: (typeof pricingData)[number];
  currency: Currency;
  index: number;
  reduce: boolean;
}) {
  const price = item.pricing[currency];

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.65, delay: reduce ? 0 : index * 0.08, ease: EASE }}
      className="group border-t border-border-subtle"
    >
      {/*
       * Row grid — 12 columns on desktop.
       * Stacks to single column on mobile (natural reading order).
       */}
      <div className="grid grid-cols-1 gap-y-6 py-(--spacing-content) md:grid-cols-12 md:gap-x-(--spacing-gutter) md:items-start">

        {/* ── Label zone — col 1-3 ─────────────────────────────────── */}
        <div className="md:col-span-3">
          {/* Copper rule — expands width on group hover */}
          <span
            aria-hidden="true"
            className="mb-4 block h-px w-6 bg-accent transition-[width] duration-(--duration-deliberate) ease-(--ease-standard) group-hover:w-10"
          />
          {/* Number — editorial, Instrument Serif */}
          <span className="font-sans text-small font-semibold uppercase tracking-[0.1em] text-foreground-muted/60 block">
            {item.number}
          </span>
          <h3 className="mt-1 font-display text-h3 text-foreground leading-[1.1] transition-transform duration-(--duration-standard) ease-(--ease-standard) group-hover:translate-x-0.5">
            {item.name}
          </h3>
          <span className="mt-1 font-sans text-small text-foreground-muted block">
            {item.descriptor}
          </span>
        </div>

        {/* ── Price zone — col 4-6 ─────────────────────────────────── */}
        {/*
         * The price is the major typographic moment per the brief.
         * Instrument Serif at h2 scale makes it editorial, not promotional.
         * Transition on key change crossfades smoothly between AUD/USD.
         */}
        <div className="md:col-span-3">
          <motion.div
            key={`${item.id}-${currency}`}
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2, ease: EASE }}
          >
            <PriceDisplay display={price.display} billing={price.billing} reduce={reduce} />
          </motion.div>
        </div>

        {/* ── Content zone — col 7-12 ──────────────────────────────── */}
        <div className="md:col-span-6 flex flex-col gap-5">

          {/* Description */}
          <p className="font-sans text-body text-foreground-muted leading-[1.65] max-w-(--width-content)">
            {item.description}
          </p>

          {/* Services list — two columns on sm+ */}
          <ul
            className="grid grid-cols-1 sm:grid-cols-2 gap-x-(--spacing-content) gap-y-2"
            aria-label={`${item.name} services`}
          >
            {item.services.map((s) => (
              <li key={s} className="flex items-center gap-2.5 font-sans text-small text-foreground-muted">
                <span aria-hidden="true" className="h-px w-3 bg-accent shrink-0" />
                {s}
              </li>
            ))}
          </ul>

          {/* CTA + footnote */}
          <div className="flex flex-col gap-2.5">
            <Link
              href={item.cta.href}
              className="group/cta inline-flex items-center gap-2 font-sans text-body font-semibold text-foreground underline-offset-4 transition-colors duration-(--duration-fast) hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent rounded-sm w-fit"
            >
              {item.cta.label}
              <svg
                aria-hidden="true"
                width="14" height="14"
                viewBox="0 0 14 14"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform duration-(--duration-fast) group-hover/cta:translate-x-0.5"
              >
                <path d="M1 7h12M8 3l4 4-4 4" />
              </svg>
            </Link>

            {item.footNote && (
              <p className="font-sans text-small text-foreground-muted/60 leading-[1.5] max-w-[48ch]">
                {item.footNote}
              </p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── PricingTable (exported) ───────────────────────────────────────────────────

export function PricingTable() {
  const [currency, setCurrency] = useState<Currency>("AUD");
  const reduce = useReducedMotion() ?? false;
  const groupId = useId();

  return (
    <div>
      {/* Section header + currency selector — space-between on desktop */}
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          {/* Eyebrow */}
          <p className="eyebrow text-foreground-muted">Pricing</p>

          <h2 className="mt-(--spacing-content) font-display text-h1 text-foreground leading-[1.1] max-w-[18ch]">
            Choose where we start.
          </h2>

          <p className="mt-(--spacing-content) font-sans text-body-lg text-foreground-muted leading-[1.6] max-w-[52ch]">
            Start with the digital support your business needs today — build something distinctive,
            keep it properly managed, or create a foundation for ongoing growth.
          </p>
        </div>

        {/* Currency selector — top-right on desktop, below heading on mobile */}
        <div className="shrink-0 self-start sm:self-end">
          <CurrencySelector value={currency} onChange={setCurrency} groupId={groupId} />
        </div>
      </div>

      {/* Pricing rows */}
      <div className="mt-(--spacing-section-y)">
        {pricingData.map((item, i) => (
          <ServiceRow
            key={item.id}
            item={item}
            currency={currency}
            index={i}
            reduce={reduce}
          />
        ))}
      </div>

      {/* Bottom border to close the last row */}
      <div className="border-t border-border-subtle" />

      {/* ── Editorial closing note ────────────────────────────────────── */}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="mt-(--spacing-section-y) grid grid-cols-1 gap-(--spacing-content) md:grid-cols-12 md:gap-(--spacing-gutter)"
      >
        {/* Left: editorial closing copy */}
        <div className="md:col-span-7">
          <p className="font-display text-h3 text-foreground leading-[1.25]">
            Every business is different.
          </p>
          <p className="mt-(--spacing-content) font-sans text-body text-foreground-muted leading-[1.65] max-w-[58ch]">
            These prices are starting points. After understanding your goals, content, functionality
            and ongoing requirements, Clouvent provides a clear project proposal before work begins.
          </p>

          {/* USD indicative note — only shown when USD is active */}
          {currency === "USD" && (
            <motion.p
              initial={reduce ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, ease: EASE }}
              className="mt-4 font-sans text-small text-foreground-muted/60 leading-[1.5] max-w-[52ch]"
            >
              USD pricing is indicative. Final proposals are issued in the agreed billing currency.
            </motion.p>
          )}
        </div>

        {/* Right: CTA */}
        <div className="md:col-span-5 md:flex md:items-start md:justify-end">
          <Link
            href="/contact?service=general"
            className="group inline-flex items-center justify-center gap-2 font-sans text-body font-medium rounded-(--radius-control) bg-accent text-foreground px-7 py-3.5 transition-colors duration-(--duration-standard) ease-(--ease-standard) hover:bg-accent-hover active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent w-full sm:w-auto"
          >
            Start a project
            <svg
              aria-hidden="true"
              width="14" height="14"
              viewBox="0 0 14 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform duration-(--duration-fast) group-hover:translate-x-0.5"
            >
              <path d="M1 7h12M8 3l4 4-4 4" />
            </svg>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
