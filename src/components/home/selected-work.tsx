import { Container } from "@/components/ui/container";
import { TextLink } from "@/components/ui/text-link";
import { MediaPlaceholder } from "./media-placeholder";

/**
 * The homepage's primary proof asset — HOMEPAGE_DESIGN_SPEC.md §7.
 * Only verified facts from PROJECT_BRIEF.md §10: design, React +
 * TypeScript development, ongoing maintenance, analytics/Search Console
 * monitoring, paid social support. No business outcomes are claimed.
 */
export function SelectedWork() {
  return (
    <section className="bg-background-subtle py-(--spacing-section-y)">
      <Container>
        <p className="eyebrow text-foreground-muted">Selected Work</p>

        <div className="mt-(--spacing-content) grid grid-cols-1 gap-(--spacing-content) md:grid-cols-5 md:gap-(--spacing-gutter)">
          <MediaPlaceholder
            label="Once Upon a Time Photography — licensed project imagery pending"
            className="aspect-[16/10] w-full md:col-span-3"
          />

          <div className="md:col-span-2">
            <h2 className="font-display text-h2 text-foreground">Once Upon a Time Photography</h2>
            <p className="mt-(--spacing-content) max-w-(--width-content) text-body text-foreground-muted">
              Design, React and TypeScript development, ongoing website
              maintenance, analytics and Search Console monitoring, and
              paid social support for an Australian photography business.
            </p>
            <TextLink href="/work" className="mt-(--spacing-content) inline-block text-body">
              View the work
            </TextLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
