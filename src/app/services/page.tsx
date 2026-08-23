import { Container } from "@/components/ui/container";

/**
 * Route-safe placeholder only — prevents a broken nav link during
 * Phase 7 QA. Not a designed page; scoped for a future phase.
 */
export default function ServicesPage() {
  return (
    <section className="bg-background py-(--spacing-section-y)">
      <Container width="content">
        <p className="eyebrow text-foreground-muted">Services</p>
        <h1 className="mt-(--spacing-content) font-display text-h1 text-foreground">Coming soon</h1>
      </Container>
    </section>
  );
}
