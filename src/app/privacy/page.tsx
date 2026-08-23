import { Container } from "@/components/ui/container";

/**
 * Route-safe placeholder only — prevents a broken footer link during
 * Phase 7 QA. Real privacy policy content requires legal input not
 * yet available (CLAUDE.md → Analytics & Privacy) and is not written
 * here.
 */
export default function PrivacyPage() {
  return (
    <section className="bg-background py-(--spacing-section-y)">
      <Container width="content">
        <p className="eyebrow text-foreground-muted">Privacy Policy</p>
        <h1 className="mt-(--spacing-content) font-display text-h1 text-foreground">Coming soon</h1>
      </Container>
    </section>
  );
}
