import { Container } from "@/components/ui/container";

/**
 * HOMEPAGE_DESIGN_SPEC.md §8 — deliberately two mechanisms, not three.
 * A claim about team structure ("no account-manager layer") was
 * considered and rejected in Phase 6 because it isn't confirmed in
 * PROJECT_BRIEF.md. Do not add a third statement here without that
 * confirmation first.
 */
const statements = [
  {
    title: "Design and performance thinking, together",
    body: "Every build is approached as both a design problem and an engineering one — premium visual craft implemented with real performance discipline, not template convenience.",
  },
  {
    title: "The relationship doesn't end at launch",
    body: "Ongoing maintenance, analytics, and Search Console monitoring keep a site working after it ships — not a one-off handoff.",
  },
];

export function Trust() {
  return (
    <section className="bg-surface-dark py-(--spacing-section-y) text-foreground-inverse">
      <Container width="content">
        <h2 className="font-display text-h2">How Clouvent works</h2>
        <div className="mt-(--spacing-section-y) flex flex-col">
          {statements.map((statement, index) => (
            <div key={statement.title}>
              {index > 0 && <hr className="divider-dark" />}
              <div className="py-(--spacing-content)">
                <h3 className="font-display text-h3">{statement.title}</h3>
                <p className="mt-(--spacing-content) text-body text-foreground-inverse-muted">{statement.body}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
