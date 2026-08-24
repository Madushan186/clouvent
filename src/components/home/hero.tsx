import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { HeroFilm } from "./hero-film";

/**
 * Structured Digital Editorial hero — HOMEPAGE_DESIGN_SPEC.md §6.
 * Unequal split, not a centered SaaS hero. Right side is now a
 * cinematic Clouvent brand film (atmosphere), not a project preview —
 * that concept lives in Selected Work below, reached via "See the work".
 */
export function Hero() {
  return (
    <section id="hero" className="bg-background pt-(--spacing-section-y) pb-(--spacing-content)">
      <Container>
        {/* items-start, not items-end: the tall aspect-[4/5] placeholder
            was stretching the row height and pushing the shorter text
            column down to match its bottom, creating the dead space above
            the headline visible in the Phase 7.5 screenshot review. */}
        <div className="relative grid grid-cols-1 gap-(--spacing-content) md:grid-cols-5 md:items-start md:gap-(--spacing-gutter)">
          {/* Precision Field (Phase 7.5, Direction A) — quiet architectural
              structure, not decoration. Rule 1 marks the unused negative
              space above the eyebrow, flush with the text column's own
              left edge, ending in one quiet node — the least essential
              pair, so it's the first to drop (lg and up only). The seam
              extension (Rule 2 + its node) lives with the media column
              below, where it can be positioned precisely relative to the
              *existing* approved seam rather than recalculated from the
              grid. The existing copper node stays the only emphasized
              point. One-time opacity reveal only; prefers-reduced-motion
              is handled globally in globals.css. */}
          <span
            aria-hidden="true"
            className="field-reveal absolute top-0 left-0 hidden h-px w-16 bg-field-detail lg:block"
          />
          <span
            aria-hidden="true"
            className="field-reveal absolute top-0 left-16 hidden h-1 w-1 -translate-y-1/2 rounded-full bg-field-detail lg:block"
          />

          <div className="md:col-span-3">
            <p className="eyebrow text-foreground-muted">Clouvent — Digital Presence Studio</p>
            <h1 className="mt-(--spacing-content) font-display text-display text-foreground">
              Your work deserves a digital presence to match.
            </h1>
            <div className="mt-(--spacing-content) flex flex-wrap items-center gap-(--spacing-content)">
              <Button href="/contact" variant="primary">
                Start a project
              </Button>
              <Button href="#selected-work" variant="text" className="!p-0">
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
              <div className="aspect-[5/4] w-full">
                <HeroFilm />
              </div>
              {/* Precision Field, Rule 2: extends the existing seam rule a
                  short distance past the media frame — the field's most
                  essential pair, since it's directly tied to what was
                  already approved. Positioned relative to the same
                  ancestor as the copper node above (the outer, relative
                  md:col-span-2 div): the seam's border-l sits at
                  spacing-gutter from that div's left edge (it's on the
                  inner div, offset by md:pl-(--spacing-gutter)), so this
                  matches that exact offset rather than guessing. Kept
                  from md up — drops only on mobile, alongside the seam
                  itself. */}
              <span
                aria-hidden="true"
                className="field-reveal absolute -bottom-8 left-(--spacing-gutter) hidden h-8 w-px bg-field-detail md:block"
              />
              <span
                aria-hidden="true"
                className="field-reveal absolute -bottom-8 left-(--spacing-gutter) hidden h-1 w-1 -translate-x-1/2 translate-y-full rounded-full bg-field-detail md:block"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
