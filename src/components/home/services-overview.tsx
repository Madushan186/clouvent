import { Container } from "@/components/ui/container";
import { TextLink } from "@/components/ui/text-link";

/**
 * 01 BUILD / 02 MANAGE / 03 GROW as one continuous sequence, not three
 * cards — HOMEPAGE_DESIGN_SPEC.md §9. GROW's copy stays capability-framed
 * (PROJECT_BRIEF.md §7): "we bring an approach," never a claimed result.
 */
const services = [
  {
    number: "01",
    name: "Build",
    role: "A website designed and engineered properly, once.",
  },
  {
    number: "02",
    name: "Manage",
    role: "Kept working, maintained, and understood after launch.",
  },
  {
    number: "03",
    name: "Grow",
    role: "Improved deliberately — an SEO- and performance-informed approach, not a promised result.",
  },
];

export function ServicesOverview() {
  return (
    <section className="bg-background py-(--spacing-section-y)">
      <Container>
        <p className="eyebrow text-foreground-muted">How the relationship is structured</p>

        <div className="mt-(--spacing-content) grid grid-cols-1 divide-y divide-border-subtle md:grid-cols-3 md:divide-x md:divide-y-0">
          {services.map((service) => (
            <div key={service.number} className="relative py-(--spacing-content) md:px-(--spacing-content) md:py-0">
              {/* Copper text/icon on Cloud Ivory measures ~2.94:1 — fails
                  WCAG's 3:1 threshold even for large text (same failure
                  mode fixed for TextLink hover in Phase 5). Numerals stay
                  foreground (black); copper stays reserved for elements
                  with adequate contrast (CTA buttons). */}
              <p className="font-display text-h2 text-foreground">{service.number}</p>
              <h3 className="mt-(--spacing-content) font-display text-h3 text-foreground">{service.name}</h3>
              <p className="mt-(--spacing-content) text-body text-foreground-muted">{service.role}</p>

              {service.name === "Grow" && (
                // The homepage's one deliberate ascending-vector use
                // (HOMEPAGE_DESIGN_SPEC.md §16) — not decoration elsewhere.
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="mt-(--spacing-content) h-5 w-5 text-foreground-muted"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M5 19 19 5M19 5H10M19 5V14" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
          ))}
        </div>

        <TextLink href="/services" className="mt-(--spacing-section-y) inline-block text-body">
          See how we work
        </TextLink>
      </Container>
    </section>
  );
}
