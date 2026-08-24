import { Hero } from "@/components/home/hero";
import { SelectedWork } from "@/components/home/selected-work";
import { WhyClouvent } from "@/components/home/why-clouvent";
import { ServicesOverview } from "@/components/home/services-overview";
import { EnquiryCTA } from "@/components/home/enquiry-cta";

export default function Home() {
  return (
    <>
      <Hero />
      <SelectedWork />
      <ServicesOverview />
      <WhyClouvent />
      <EnquiryCTA />
    </>
  );
}
