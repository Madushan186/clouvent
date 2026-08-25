import { Hero } from "@/components/home/hero";
import { SelectedWork } from "@/components/home/selected-work";
import { Trust } from "@/components/home/trust";
import { ServicesOverview } from "@/components/home/services-overview";
import { EnquiryCTA } from "@/components/home/enquiry-cta";

/**
 * Homepage — narrative order per HOMEPAGE_DESIGN_SPEC.md §5:
 *
 * 1. Hero         — Impact / establish taste and positioning
 * 2. Selected Work — Fastest available proof
 * 3. Trust        — Convert "the work looks good" into "I could work with these people"
 * 4. Services     — Translate belief into a concrete engagement structure
 * 5. Enquiry      — Natural conclusion of the narrative
 *
 * Surface rhythm per §13:
 * Hero = Cloud Ivory / SelectedWork = Studio White / Trust = Clouvent Black /
 * Services = Cloud Ivory / Enquiry = Clouvent Black
 */
export default function Home() {
  return (
    <>
      <Hero />
      <SelectedWork />
      <Trust />
      <ServicesOverview />
      <EnquiryCTA />
    </>
  );
}
