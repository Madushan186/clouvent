import type { Metadata } from "next";
import { AboutHero } from "@/components/about/about-hero";
import { WhyClouvent } from "@/components/about/why-clouvent";
import { VisionMission } from "@/components/about/vision-mission";
import { OurBelief } from "@/components/about/our-belief";
import { AboutBuildManageGrow } from "@/components/about/about-build-manage-grow";
import { AboutMap } from "@/components/about/about-map";
import { OurStandard } from "@/components/about/our-standard";
import { AboutBrandStatement, AboutEnquiryCTA } from "@/components/about/about-closing";

/**
 * About — one continuous editorial story, not isolated cards:
 * Hero -> Why Clouvent Exists -> Vision + Mission -> Our Belief ->
 * Build/Manage/Grow (philosophy) -> Australia/Global -> Our Standard ->
 * Brand Statement -> Enquiry CTA.
 *
 * Surface rhythm: ivory, white, ivory, white, ivory, black (map),
 * white, black, black (seam) — echoes the homepage's alternation
 * discipline; the two dark moments (map, closing) are the only
 * repeats, both deliberate.
 */

export const metadata: Metadata = {
  title: "About Clouvent | Premium Digital Presence Studio",
  description:
    "Meet Clouvent — an Australia-first premium digital presence studio building, managing and growing considered digital experiences for photographers, visual creatives and ambitious businesses.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <WhyClouvent />
      <VisionMission />
      <OurBelief />
      <AboutBuildManageGrow />
      <AboutMap />
      <OurStandard />
      <AboutBrandStatement />
      <AboutEnquiryCTA />
    </>
  );
}
