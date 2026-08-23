---
name: clouvent-performance-accessibility
description: Applies Clouvent's performance and accessibility implementation requirements — WCAG 2.1 AA, Core Web Vitals targets, responsive/optimized images, minimal JS, reduced motion. Use for component/page implementation and review.
---

# Clouvent Performance & Accessibility

Applies Clouvent's approved performance and accessibility requirements. Does not define the targets themselves beyond what's stated here — reads canonical detail from source documents below.

## Must read

- `CLAUDE.md` → Accessibility, Performance — canonical requirements and targets.
- `BRAND_SYSTEM.md` → UI & Interaction Language (motion), Photography Art Direction (image handling).

This skill must never override those documents. If they conflict, stop and report the conflict rather than choosing silently.

## Use for

Component implementation, page implementation, image strategy, responsive behavior, interaction design, performance review, accessibility review.

## Targets (treat as targets, not guarantees)

- LCP < 2.5s
- INP < 200ms
- CLS < 0.1

Verify with real-world testing where possible.

## Checks

- Semantic HTML, keyboard access, visible focus states, sufficient contrast, accessible forms, meaningful alt text, reduced-motion support.
- Responsive images, modern formats, correct loading strategy (lazy where appropriate), font optimization, minimal JavaScript, mobile performance.

## Rule

Accessibility wins when an aesthetic preference conflicts with accessibility — propose an accessible way to achieve the same visual intent rather than dropping either requirement (per `CLAUDE.md` → Brand & Design → Motion).

## Boundary with `clouvent-seo`

This skill owns technical image optimization (formats, sizing, lazy-loading). Image SEO metadata (alt text content, filenames, structured data) belongs to `clouvent-seo` — do not duplicate that guidance here.
