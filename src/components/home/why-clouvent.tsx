import { Container } from "@/components/ui/container";

const principles = [
  {
    number: "01",
    title: "Built around you",
    description: "No recycled templates. Every digital experience starts with the business, audience and objectives behind it.",
  },
  {
    number: "02",
    title: "Engineered to last",
    description: "Clean development, responsive architecture and performance-conscious implementation from the beginning.",
  },
  {
    number: "03",
    title: "Managed beyond launch",
    description: "Hosting, maintenance, updates and monitoring keep your digital presence working after launch day.",
  },
  {
    number: "04",
    title: "Improved with evidence",
    description: "Analytics, Search Console and real performance data guide what we improve next.",
  },
];

export function WhyClouvent() {
  return (
    <section className="bg-surface-dark py-(--spacing-section-y) text-foreground-inverse">
      <Container>
        <p className="eyebrow text-foreground-inverse-muted">Why Clouvent</p>

        <div className="mt-(--spacing-content) grid grid-cols-1 gap-(--spacing-content) md:grid-cols-12 md:gap-(--spacing-gutter)">
          <h2 className="font-display text-display md:col-span-7">A website shouldn&rsquo;t end when it goes live.</h2>
          <p className="text-body-lg text-foreground-inverse-muted md:col-span-4 md:col-start-9 md:self-end">
            We stay involved beyond launch — maintaining, measuring and improving the digital systems we build as
            your business evolves.
          </p>
        </div>

        <div className="mt-(--spacing-section-y) grid grid-cols-1 gap-(--spacing-content) sm:grid-cols-2 sm:gap-x-(--spacing-gutter) sm:gap-y-0">
          {principles.map((principle) => (
            <div key={principle.number} className="group border-t border-border py-(--spacing-content)">
              <span className="eyebrow text-foreground-inverse-muted transition-colors duration-(--duration-standard) ease-(--ease-standard) group-hover:text-foreground-inverse">
                {principle.number}
              </span>
              <h3 className="mt-(--spacing-content) font-display text-h3 text-foreground-inverse transition-transform duration-(--duration-standard) ease-(--ease-standard) group-hover:translate-x-1">
                {principle.title}
              </h3>
              <p className="mt-(--spacing-content) max-w-(--width-content) text-body text-foreground-inverse-muted">
                {principle.description}
              </p>
            </div>
          ))}
        </div>

        {/* Signature closing statement — one-time reveal via the existing
            field-reveal utility (Phase 7.5, Hero precision field), not a
            new animation. Copper appears only on hover, per word — no
            second ascending-vector motif; a plain rule is enough. */}
        <div className="field-reveal mt-(--spacing-section-y)">
          {/* text-h1, one step below the opening text-display headline —
              memorable, but never competes with the primary statement. */}
          <div className="flex flex-col gap-(--spacing-content) sm:flex-row sm:items-baseline sm:justify-between">
            <span className="font-display text-h1 transition-colors duration-(--duration-standard) ease-(--ease-standard) hover:text-accent">
              Build.
            </span>
            <span className="font-display text-h1 transition-colors duration-(--duration-standard) ease-(--ease-standard) hover:text-accent">
              Manage.
            </span>
            <span className="font-display text-h1 transition-colors duration-(--duration-standard) ease-(--ease-standard) hover:text-accent">
              Grow.
            </span>
          </div>
          <hr className="divider-dark mt-(--spacing-content)" />
        </div>
      </Container>
    </section>
  );
}
