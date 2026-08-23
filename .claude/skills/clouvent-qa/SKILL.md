---
name: clouvent-qa
description: Executes Clouvent's final Definition of Done and UX-journey review before any page or feature is considered complete. Includes the merged UX-review responsibility (no standalone clouvent-ux-review skill exists).
---

# Clouvent QA

Executes Clouvent's Definition of Done as a checklist before marking any page or feature complete. Does not redefine the Definition of Done — reads it from source documents below. Includes UX-journey verification (merged from the originally proposed, and rejected as a separate skill, `clouvent-ux-review`).

## Must read

- `CLAUDE.md` → Definition of Done — canonical checklist.
- `PROJECT_BRIEF.md` — customer journey, conversion goals, audience, sitemap.
- `BRAND_SYSTEM.md` — visual/brand fidelity reference.

This skill must never override those documents. If they conflict, stop and report the conflict rather than choosing silently.

## Use for

Final review before marking any page or feature complete. Use browser/runtime verification (the `run` skill) where possible rather than rubber-stamping from code inspection alone.

## Checklist

**Visual** — brand fidelity, visual hierarchy, responsive behavior, typography, spacing, image treatment, mobile quality.

**UX** — clear visitor intent; portfolio → trust → service → enquiry journey where relevant; CTA clarity; no unnecessary friction; functional navigation; form usability.

**Accessibility** — keyboard behavior, focus states, semantic structure, reduced motion, contrast, form accessibility.

**SEO** — relevant metadata, semantic page structure, internal linking, appropriate image metadata, no accidental indexability issues.

**Performance** — obvious rendering/layout problems, image loading, unnecessary JavaScript, Core Web Vitals risks.

**Functional** — no console errors, no broken links, no broken assets, forms work, navigation works, interactive states work.

**Content** — no invented claims, no unsupported metrics, no fabricated social proof, no legacy tagline resurfacing ("Infrastructure With Intelligence Built In."), correct business positioning per `PROJECT_BRIEF.md`.
