import { Hero } from "@/components/home/hero";
import { PositioningStatement } from "@/components/home/positioning-statement";
import { SelectedWork } from "@/components/home/selected-work";
import { WorldMarketMap } from "@/components/home/world-market-map";
import { ServicesOverview } from "@/components/home/services-overview";
import { WorkingPrinciples } from "@/components/home/working-principles";
import { PricingPreview } from "@/components/home/pricing-preview";
import { EnquiryCTA } from "@/components/home/enquiry-cta";

/**
 * Homepage — expanded structure, approved 2026-08-26 (supersedes the
 * five-section HOMEPAGE_DESIGN_SPEC.md §5 order):
 *
 * 1. Hero                 — Impact
 * 2. Positioning Statement — What Clouvent does, calmly, before proof
 * 3. Selected Work        — Fastest available proof
 * 4. Australia / Global   — Honest market positioning, no fabricated reach
 * 5. Services (Build/Manage/Grow) — Concrete engagement structure
 * 6. Why Clouvent         — Craft, performance, continuity, growth
 * 7. Pricing Preview      — Where to start (full detail on /services)
 * 8. Enquiry              — Natural conclusion of the narrative
 *
 * Surface rhythm: ivory, ivory, studio white, black, ivory, black,
 * studio white, black — light hero open, dark close, no two identical
 * surfaces back-to-back except the deliberate Hero/Positioning pairing.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <PositioningStatement />
      <SelectedWork />
      <WorldMarketMap />
      <ServicesOverview />
      <WorkingPrinciples />
      <PricingPreview />
      <EnquiryCTA />
    </>
  );
}
