import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { MediaPlaceholder } from "./media-placeholder";

/**
 * Structured Digital Editorial hero — HOMEPAGE_DESIGN_SPEC.md §6.
 * Unequal split, not a centered SaaS hero. The eyebrow + persistent
 * header logo (see Header) exist specifically so a visitor can never
 * mistake this for the photographer's own site — the photography zone
 * is explicitly labeled as a project preview, not presented as the
 * page's subject.
 */
export function Hero() {
  return (
    <section id="hero" className="bg-background pt-(--spacing-section-y) pb-(--spacing-content)">
      <Container>
        <div className="grid grid-cols-1 gap-(--spacing-content) md:grid-cols-5 md:items-end md:gap-(--spacing-gutter)">
          <div className="md:col-span-3">
            <p className="eyebrow text-foreground-muted">Clouvent — Digital Presence Studio</p>
            <h1 className="mt-(--spacing-content) font-display text-display text-foreground">
              Your work deserves a digital presence to match.
            </h1>
            <div className="mt-(--spacing-content) flex flex-wrap items-center gap-(--spacing-content)">
              <Button href="/contact" variant="primary">
                Start a project
              </Button>
              <Button variant="text" className="!p-0">
                See the work
              </Button>
            </div>
          </div>

          <div className="relative md:col-span-2">
            {/* Sparse structural node marking the split seam — approved
                graphic motif, used once, not decoration. */}
            <span
              aria-hidden="true"
              className="absolute -top-(--spacing-content) left-0 hidden h-1.5 w-1.5 rounded-full bg-accent md:block"
            />
            <div className="border-t border-border-subtle pt-(--spacing-content) md:border-t-0 md:border-l md:pt-0 md:pl-(--spacing-gutter)">
              <MediaPlaceholder label="Selected project preview — Once Upon a Time Photography" className="aspect-[4/5] w-full" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
