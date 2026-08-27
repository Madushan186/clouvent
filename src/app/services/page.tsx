import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { PricingTable } from "@/components/services/pricing-table";
import { ServicesHero } from "@/components/services/services-hero";
import { FAQ } from "@/components/services/faq";
import { ServicesCTA } from "@/components/services/services-cta";

/**
 * Services page — per PROJECT_BRIEF.md §20:
 * "Services is a single page with three sections (Build/Manage/Grow)."
 *
 * Architecture:
 * 1. Page header — what the studio offers and how it works
 * 2. Service disciplines overview — BUILD / MANAGE / GROW (editorial)
 * 3. Pricing table — transparent starting-from pricing with AUD/USD selector
 * 4. FAQ — objection-handling before enquiry, extending the pricing/
 *    scope questions raised above it
 * 5. Final CTA — Clouvent Black. Services previously ended on the FAQ
 *    (or PricingTable's own embedded light-surface note before that)
 *    with no dark closing moment, unlike Home/Work/About; this brings
 *    it in line with the rest of the site.
 *
 * ServicesHero, PricingTable, FAQ and ServicesCTA are separate client
 * boundaries (each needs motion/state); this page itself stays a
 * Server Component.
 */

export const metadata: Metadata = {
  title: "Services | CLOUVENT",
  description:
    "Starting pricing for CLOUVENT website design, ongoing management, SEO and digital growth services for Australian creative businesses.",
};

export default function ServicesPage() {
  return (
    <div className="flex flex-col">

      <ServicesHero />

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

      <FAQ />

      <ServicesCTA />

    </div>
  );
}
