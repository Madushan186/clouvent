import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { TextLink } from "@/components/ui/text-link";

/**
 * Temporary internal design-system preview — NOT the Clouvent homepage.
 * Exists only to verify tokens, primitives, and surfaces render correctly.
 * No marketing copy, sections, or claims belong here.
 */
export default function Home() {
  return (
    <main>
      <Section surface="light">
        <Container>
          <p className="eyebrow text-foreground-muted">Internal preview — not the homepage</p>
          <h1 className="mt-(--spacing-content) font-display text-display">
            Clouvent design system
          </h1>
          <p className="mt-(--spacing-content) max-w-(--width-content) text-body-lg text-foreground-muted">
            This page exists to verify the token architecture and foundation
            primitives established in Phase 5. It is intentionally neutral —
            no marketing copy, sections, or claims.
          </p>
          <hr className="divider mt-(--spacing-section-y)" />
        </Container>
      </Section>

      <Section surface="light-subtle">
        <Container>
          <h2 className="font-display text-h2">Typography roles</h2>
          <div className="mt-(--spacing-content) flex flex-col gap-(--spacing-content)">
            <p className="font-display text-h1">Heading — H1</p>
            <p className="font-display text-h2">Heading — H2</p>
            <p className="font-display text-h3">Heading — H3</p>
            <p className="max-w-(--width-content) text-body-lg">
              Body large — for lead paragraphs and introductory copy that
              needs slightly more visual weight than standard body text.
            </p>
            <p className="max-w-(--width-content) text-body">
              Body — the default reading size for most content on the site,
              set for comfortable line length and editorial rhythm.
            </p>
            <p className="text-small text-foreground-muted">Small — captions and metadata.</p>
            <p className="eyebrow">Eyebrow / UI label</p>
          </div>
        </Container>
      </Section>

      <Section surface="dark">
        <Container>
          <p className="eyebrow text-foreground-inverse-muted">Dark editorial surface</p>
          <h2 className="mt-(--spacing-content) font-display text-h2">
            Surface rhythm, applied deliberately
          </h2>
          <p className="mt-(--spacing-content) max-w-(--width-content) text-body text-foreground-inverse-muted">
            Dark sections are a per-section choice made by the page, not a
            system-preference toggle — see globals.css for why.
          </p>
          <hr className="divider-dark mt-(--spacing-section-y)" />
        </Container>
      </Section>

      <Section surface="light">
        <Container>
          <h2 className="font-display text-h2">Interaction</h2>
          <div className="mt-(--spacing-content) flex flex-wrap items-center gap-(--spacing-content)">
            <Button variant="primary">Primary button</Button>
            <Button variant="secondary">Secondary button</Button>
            <Button variant="text">Text button</Button>
          </div>
          <p className="mt-(--spacing-content) max-w-(--width-content) text-body">
            An inline <TextLink href="/">example text link</TextLink> within a
            paragraph, and a focus target for keyboard verification:{" "}
            <Button variant="text">tab to me</Button>.
          </p>
        </Container>
      </Section>

      <Section surface="light-subtle">
        <Container width="content">
          <p className="eyebrow text-foreground-muted">Container widths</p>
          <p className="mt-(--spacing-content) text-body">
            This block uses the <code>content</code> container width, capped
            at a readable measure. The sections above use the default{" "}
            <code>wide</code> width.
          </p>
        </Container>
      </Section>
    </main>
  );
}
