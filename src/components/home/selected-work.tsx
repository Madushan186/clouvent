import { Container } from "@/components/ui/container";
import { BeforeAfterComparison } from "@/components/ui/before-after-comparison";

/**
 * The homepage's primary proof asset — HOMEPAGE_DESIGN_SPEC.md §7.
 * Only verified facts from PROJECT_BRIEF.md §10: design, React +
 * TypeScript development, ongoing maintenance, analytics/Search Console
 * monitoring, paid social support. No business outcomes are claimed.
 *
 * Real project screenshots (Phase 7.5) —
 * public/projects/once-upon-a-time/{before-wordpress,after-clouvent}.png.
 * Shared 16:9 viewport chosen from the redesign (after) screenshot's own
 * ratio, per prior crop analysis — before-wordpress.png (1366x768,
 * exactly 16:9) needs no crop at all; after-clouvent.png (3600x2084,
 * ~1.73:1) gets the same small bottom crop already established,
 * object-top keeping nav/branding/headline intact for both. A duplicate
 * of after-clouvent.png (previously at public/once-upon-a-time-homepage.png,
 * byte-identical, verified by checksum) has been removed — one
 * canonical AFTER asset only.
 */
export function SelectedWork() {
  return (
    <section id="selected-work" className="bg-background-subtle py-(--spacing-section-y)">
      <Container>
        <p className="eyebrow text-foreground-muted">Selected Work</p>

        <div className="mt-(--spacing-content) grid grid-cols-1 gap-(--spacing-content) md:grid-cols-5 md:gap-(--spacing-gutter)">
          {/* No initialPosition passed — the component's own default (0)
              applies, so this reads as a normal finished portfolio image
              on first load, not a mid-comparison state. The "Reveal
              before" button is the discovery path in. */}
          <BeforeAfterComparison
            beforeSrc="/projects/once-upon-a-time/before-wordpress.png"
            beforeAlt="Once Upon a Time Photography's previous WordPress website"
            afterSrc="/projects/once-upon-a-time/after-clouvent.png"
            afterAlt="Once Upon a Time Photography's Clouvent-redesigned website"
            accessibleLabel="Compare previous WordPress website with Clouvent redesign"
            className="md:col-span-3"
          />

          <div className="md:col-span-2">
            <h2 className="font-display text-h2 text-foreground">Once Upon a Time Photography</h2>
            <p className="mt-(--spacing-content) max-w-(--width-content) text-body text-foreground-muted">
              Design, React and TypeScript development, ongoing website
              maintenance, analytics and Search Console monitoring, and
              paid social support for an Australian photography business.
            </p>
            {/* External link to the real live project — a plain anchor,
                not next/link's Link (which is for internal routing), and
                not the shared TextLink primitive (kept untouched so
                other call sites are unaffected). Styling copied
                byte-for-byte from TextLink's own className so nothing
                visually changes. */}
            <a
              href="https://www.onceuponatimesphotography.com.au/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-border-subtle decoration-1 underline-offset-4 transition-[text-decoration-color,text-decoration-thickness] duration-(--duration-fast) ease-(--ease-standard) hover:decoration-foreground hover:decoration-2 mt-(--spacing-content) inline-block text-body"
            >
              View the work
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
