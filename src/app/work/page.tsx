import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { CaseStudy } from "@/components/work/case-study";
import { BeyondTheBuild } from "@/components/work/beyond-the-build";
import { BrandStatement, WorkFinalCTA } from "@/components/work/work-closing";
import { caseStudies } from "@/components/work/work-data";

/**
 * Selected Work — premium editorial case-study experience.
 * Architecture: WorkHero (static, matches /services and /contact
 * header convention) -> CaseStudy per project (reusable, motion-driven)
 * -> BeyondTheBuild -> BrandStatement -> WorkFinalCTA.
 *
 * Adding a second project is one new entry in work-data.ts's
 * `caseStudies` array — no structural change to this file.
 */

export const metadata: Metadata = {
  title: "Selected Work | CLOUVENT",
  description:
    "Clouvent selected work: the Once Upon a Time Photography case study — website design, React and TypeScript development, and ongoing digital support for an Australian photography business.",
};

export default function WorkPage() {
  return (
    <main className="flex flex-col">

      {/* ── Work Hero — static, no image, matches Services/Contact header pattern ── */}
      <section className="bg-background py-(--spacing-section-y)">
        <Container>
          <p className="eyebrow text-foreground-muted">Selected Work / 01</p>
          <h1 className="mt-(--spacing-content) font-display text-display text-foreground leading-[1.05] tracking-tight text-balance max-w-[16ch]">
            Selected work, built with intention.
          </h1>
          <p className="mt-(--spacing-content) font-sans text-body-lg text-foreground-muted leading-[1.6] max-w-[48ch]">
            A closer look at the digital experiences we design, build and continue to support.
          </p>
        </Container>
      </section>

      {caseStudies.map((study) => (
        <CaseStudy key={study.id} data={study} />
      ))}

      <BeyondTheBuild />
      <BrandStatement />
      <WorkFinalCTA />

    </main>
  );
}
