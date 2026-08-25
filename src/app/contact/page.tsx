import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { ContactForm } from "./contact-form";

/**
 * Contact / Project Enquiry page.
 *
 * Architecture:
 * - Server Component. The only client boundary is ContactForm (via
 *   useActionState + useReducedMotion + useId).
 * - searchParams?.service is validated and passed as defaultServices to
 *   pre-select the relevant service checkbox(es).
 *   Valid values: "build" | "manage" | "grow" | "general" (general = no preselect).
 *   Unknown values → empty array → no preselection → no error.
 * - Two-column editorial composition on desktop:
 *     LEFT (~40%): large heading, copy, BUILD→MANAGE→GROW, email link
 *     RIGHT (~60%): the project enquiry form
 * - Mobile: left column first (reading order), form below.
 *
 * SEO: title/description metadata set per project conventions.
 *
 * Note on business information:
 * - No phone number, ABN, or physical address is shown because this
 *   information has not yet been verified. See PROJECT_BRIEF.md §22.
 * - Email: clouventsolutions@gmail.com (confirmed).
 */

export const metadata: Metadata = {
  title: "Contact | CLOUVENT",
  description:
    "Start a project with CLOUVENT. Tell us about your website, digital management or growth requirements.",
};

// Valid service IDs that can be passed via ?service= query parameter.
// This is the single source of truth — the same values used in pricing-data.ts.
const VALID_SERVICE_PARAMS = new Set(["build", "manage", "grow"]);

interface ContactPageProps {
  searchParams?: Promise<{ service?: string }>;
}

export default async function ContactPage({ searchParams }: ContactPageProps) {
  // Resolve searchParams (Next.js 15: searchParams is a Promise)
  const resolvedParams = await searchParams;
  const rawService = resolvedParams?.service ?? "";

  // Validate — only known values pass through to preselect
  const defaultServices = VALID_SERVICE_PARAMS.has(rawService) ? [rawService] : [];

  return (
    <main>

      {/* ── Page introduction ─────────────────────────────────────────────── */}
      <section className="bg-background pt-(--spacing-section-y) pb-12">
        <Container>
          <div className="grid grid-cols-1 gap-(--spacing-content) md:grid-cols-2 md:gap-(--spacing-gutter) md:items-end">
            <div>
              <p className="eyebrow text-foreground-muted">Start a project</p>
              <h1 className="mt-(--spacing-content) font-display text-display text-foreground leading-[1.05] tracking-tight text-balance max-w-[14ch]">
                Let&apos;s build something worth remembering.
              </h1>
            </div>
            <div className="md:pb-1">
              <p className="font-sans text-body-lg text-foreground-muted leading-[1.6] max-w-[48ch]">
                Whether you need a new digital presence, ongoing management, or a stronger
                foundation for growth — tell us where you are and where you want to go.
                We&apos;ll start with a conversation.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Two-column editorial: left context / right form ────────────────── */}
      <section className="bg-background pb-(--spacing-section-y)">
        <Container>

          {/* Fine rule — close of introduction, open of form zone */}
          <div className="h-px bg-border-subtle mb-(--spacing-section-y)" />

          <div className="grid grid-cols-1 gap-(--spacing-section-y) lg:grid-cols-12 lg:gap-(--spacing-gutter)">

            {/* ── Left column: context ─────────────────────────────────── */}
            <aside className="lg:col-span-4 flex flex-col gap-8">

              {/* Eyebrow + label */}
              <div>
                <p className="eyebrow text-foreground-muted mb-(--spacing-content)">
                  Project enquiry
                </p>
                {/* BUILD → MANAGE → GROW architecture — three stacked lines */}
                <div className="flex flex-col gap-2">
                  {(["Build.", "Manage.", "Grow."] as const).map((word) => (
                    <span
                      key={word}
                      className="font-display text-h3 text-foreground leading-[1.15] cursor-default"
                    >
                      {word}
                    </span>
                  ))}
                </div>
                <p className="mt-(--spacing-content) font-sans text-body text-foreground-muted leading-[1.65] max-w-[36ch]">
                  Three interconnected disciplines, delivered as one ongoing relationship.
                </p>
              </div>

              {/* Fine copper rule — editorial detail */}
              <span aria-hidden="true" className="h-px w-8 bg-accent block" />

              {/* What to expect */}
              <div className="flex flex-col gap-3">
                <p className="font-sans text-small font-semibold uppercase tracking-[0.08em] text-foreground-muted/60">
                  What happens next
                </p>
                {[
                  "We review your enquiry in full.",
                  "We'll reach out to discuss your project.",
                  "A clear proposal before any work begins.",
                ].map((step, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span aria-hidden="true" className="mt-[0.35em] h-px w-3 bg-accent shrink-0" />
                    <p className="font-sans text-small text-foreground-muted leading-[1.55]">
                      {step}
                    </p>
                  </div>
                ))}
              </div>

              {/* Direct email — the only verified contact information */}
              <div className="flex flex-col gap-2">
                <p className="font-sans text-small font-semibold uppercase tracking-[0.08em] text-foreground-muted/60">
                  Prefer email?
                </p>
                <a
                  href="mailto:clouventsolutions@gmail.com"
                  className="font-sans text-body text-foreground underline underline-offset-4 decoration-border-subtle hover:text-accent hover:decoration-accent transition-colors duration-[120ms]"
                >
                  clouventsolutions@gmail.com
                </a>
              </div>

            </aside>

            {/* ── Right column: form ───────────────────────────────────── */}
            <div className="lg:col-span-8">
              <ContactForm defaultServices={defaultServices} />
            </div>

          </div>
        </Container>
      </section>

    </main>
  );
}
