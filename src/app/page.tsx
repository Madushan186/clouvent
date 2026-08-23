import { Hero } from "@/components/home/hero";
import { SelectedWork } from "@/components/home/selected-work";
import { Trust } from "@/components/home/trust";
import { ServicesOverview } from "@/components/home/services-overview";
import { EnquiryCTA } from "@/components/home/enquiry-cta";

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
