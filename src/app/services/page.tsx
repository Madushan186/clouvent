import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { PricingTable } from "@/components/services/pricing-table";

/**
 * Services page — per PROJECT_BRIEF.md §20:
 * "Services is a single page with three sections (Build/Manage/Grow)."
 *
 * Architecture:
 * 1. Page header — what the studio offers and how it works
 * 2. Service disciplines overview — BUILD / MANAGE / GROW (editorial)
 * 3. Pricing table — transparent starting-from pricing with AUD/USD selector
 *
 * The PricingTable is the only client component on this page;
 * everything else is a Server Component (no "use client" here).
 */

export const metadata: Metadata = {
  title: "Services | CLOUVENT",
  description:
    "Starting pricing for CLOUVENT website design, ongoing management, SEO and digital growth services for Australian creative businesses.",
};

export default function ServicesPage() {
  return (
    <main className="flex flex-col">

      {/* ── Page header ─────────────────────────────────────────────────── */}
      <section className="bg-background py-(--spacing-section-y)">
        <Container>

          {/* Editorial header — eyebrow / display headline / subtext */}
          <div className="grid grid-cols-1 gap-(--spacing-content) md:grid-cols-2 md:gap-(--spacing-gutter)">
            <div>
              <p className="eyebrow text-foreground-muted">Services</p>
              <h1 className="mt-(--spacing-content) font-display text-display text-foreground leading-[1.05] tracking-tight text-balance max-w-[16ch]">
                Build. Manage. Grow.
              </h1>
            </div>
            <div className="flex items-end">
              <p className="font-sans text-body-lg text-foreground-muted leading-[1.65] max-w-[50ch]">
                Clouvent offers three interconnected disciplines — designed to work together
                as a complete, ongoing partnership or independently as your business needs today.
              </p>
            </div>
          </div>

          {/* Fine divider — structural close of header */}
          <div className="mt-(--spacing-section-y) h-px bg-border-subtle" />

          {/* Architecture sequence — three disciplines, editorial horizontal */}
          <div className="mt-(--spacing-content) grid grid-cols-1 gap-0 divide-y divide-border-subtle md:grid-cols-3 md:divide-y-0 md:divide-x">
            {(
              [
                { num: "01", name: "Build", desc: "Design + development" },
                { num: "02", name: "Manage", desc: "Maintenance + infrastructure" },
                { num: "03", name: "Grow", desc: "Visibility + optimisation" },
              ] as const
            ).map((s, i) => (
              <div
                key={s.num}
                className="flex flex-col gap-2 py-(--spacing-content) md:px-(--spacing-gutter) first:md:pl-0 last:md:pr-0"
              >
                <span className="font-sans text-small font-semibold uppercase tracking-[0.1em] text-foreground-muted/50">
                  {s.num}
                </span>
                <span className="font-display text-h3 text-foreground leading-[1.15]">
                  {s.name}
                </span>
                <span className="font-sans text-small text-foreground-muted">
                  {s.desc}
                </span>
                {/* Ascending vector on GROW — one deliberate use per page */}
                {i === 2 && (
                  <svg
                    aria-hidden="true"
                    width="18" height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    stroke="var(--color-accent)"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mt-1 opacity-50"
                  >
                    <path d="M3 15 15 3M15 3H7M15 3v8" />
                  </svg>
                )}
              </div>
            ))}
          </div>

        </Container>
      </section>

      {/* ── Pricing table ───────────────────────────────────────────────── */}
      {/*
       * Cloud Ivory (#F3F0EB) — same light surface as the page header,
       * keeps a consistent ivory rhythm on a light page.
       * The PricingTable "use client" boundary is isolated inside this import.
       */}
      <section className="bg-background py-(--spacing-section-y)">
        <Container>
          <PricingTable />
        </Container>
      </section>

    </main>
  );
}
