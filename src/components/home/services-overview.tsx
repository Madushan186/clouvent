import { Container } from "@/components/ui/container";

/**
 * "Our Capabilities" — vertical editorial index, not cards. Hover uses
 * Tailwind `group`/`group-hover` (pure CSS), so this stays a Server
 * Component. Grow's ascending-vector motif is the homepage's one
 * approved use (HOMEPAGE_DESIGN_SPEC.md §16) — kept, not duplicated.
 */
const capabilities = [
  {
    number: "01",
    name: "Build",
    title: "Digital experiences, engineered properly.",
    services: ["Web Design", "Web Development", "Responsive Experiences", "Performance Engineering"],
    description:
      "Distinctive websites built around your brand, your audience and the way your business actually works.",
  },
  {
    number: "02",
    name: "Manage",
    title: "The infrastructure behind the experience.",
    services: ["Cloud Hosting", "Website Maintenance", "Security & Updates", "Analytics Infrastructure"],
    description: "Reliable ongoing management that keeps your digital presence secure, current and performing.",
  },
  {
    number: "03",
    name: "Grow",
    title: "Turn presence into progress.",
    services: ["SEO", "Search Console", "Analytics", "Digital Campaign Support"],
    description:
      "Measurement, search visibility and ongoing optimisation designed to help your digital presence create measurable value.",
  },
];

export function ServicesOverview() {
  return (
    <section className="bg-background py-(--spacing-section-y)">
      <Container>
        <p className="eyebrow text-foreground-muted">Our Capabilities</p>
        <h2 className="mt-(--spacing-content) max-w-(--width-content) font-display text-display text-foreground">
          We build digital systems that keep working.
        </h2>
        <p className="mt-(--spacing-content) max-w-(--width-content) text-body-lg text-foreground-muted">
          From the first line of code to ongoing growth, Clouvent creates and manages digital experiences built
          for performance, clarity and long-term value.
        </p>

        <div className="mt-(--spacing-content)">
          {capabilities.map((capability, index) => (
            <div
              key={capability.number}
              className={`group relative py-(--spacing-section-y) ${index > 0 ? "border-t border-border-subtle" : ""}`}
            >
              <div className="grid grid-cols-1 gap-(--spacing-content) md:grid-cols-12 md:gap-(--spacing-gutter)">
                <div className="flex items-center gap-(--spacing-content) md:col-span-3 md:block">
                  <span className="font-display text-display text-foreground-muted transition-colors duration-(--duration-standard) ease-(--ease-standard) group-hover:text-foreground">
                    {capability.number}
                  </span>
                  <span
                    aria-hidden="true"
                    className="h-px w-6 bg-accent transition-[width] duration-(--duration-standard) ease-(--ease-standard) group-hover:w-12 md:mt-(--spacing-content) md:block"
                  />
                </div>

                <div className="md:col-span-9">
                  <h3 className="font-display text-h2 text-foreground transition-transform duration-(--duration-standard) ease-(--ease-standard) group-hover:translate-x-1">
                    {capability.name}
                  </h3>
                  <p className="mt-(--spacing-content) font-display text-h3 text-foreground-muted">
                    {capability.title}
                    {capability.name === "Grow" && (
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        className="ml-2 inline-block h-5 w-5 text-foreground-muted"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <path d="M5 19 19 5M19 5H10M19 5V14" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </p>

                  <ul className="mt-(--spacing-content) grid max-w-(--width-content) grid-cols-1 gap-x-(--spacing-content) gap-y-2 text-body text-foreground-muted sm:grid-cols-2">
                    {capability.services.map((service) => (
                      <li key={service}>{service}</li>
                    ))}
                  </ul>

                  <p className="mt-(--spacing-content) max-w-(--width-content) text-body text-foreground-muted">
                    {capability.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
