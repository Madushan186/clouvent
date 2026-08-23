import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

/**
 * HOMEPAGE_DESIGN_SPEC.md §10. No verified email address exists yet
 * (PROJECT_BRIEF.md §21 — [NEEDS INPUT]), so the secondary "direct
 * email" path specified in the design spec is intentionally omitted
 * here rather than inventing an address or showing a placeholder
 * string publicly. Add it back once a real address is confirmed.
 */
export function EnquiryCTA() {
  return (
    <section className="bg-surface-dark py-(--spacing-section-y) text-foreground-inverse">
      <Container width="content">
        <h2 className="font-display text-h2">Start a project</h2>
        <p className="mt-(--spacing-content) text-body-lg text-foreground-inverse-muted">
          Tell us about your business and what you&rsquo;re looking for. It
          starts with a conversation, not a commitment.
        </p>
        <Button href="/contact" variant="primary" className="mt-(--spacing-content)">
          Enquire
        </Button>
      </Container>
    </section>
  );
}
