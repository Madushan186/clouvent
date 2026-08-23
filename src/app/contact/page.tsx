import { Container } from "@/components/ui/container";

/**
 * Route-safe placeholder only — prevents a broken enquiry CTA during
 * Phase 7 QA. The real enquiry form is out of scope for this phase
 * (not included in HOMEPAGE_DESIGN_SPEC.md) and belongs to a future
 * phase, not designed here.
 */
export default function ContactPage() {
  return (
    <section className="bg-background py-(--spacing-section-y)">
      <Container width="content">
        <p className="eyebrow text-foreground-muted">Contact</p>
        <h1 className="mt-(--spacing-content) font-display text-h1 text-foreground">Coming soon</h1>
      </Container>
    </section>
  );
}
