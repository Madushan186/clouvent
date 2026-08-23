# Clouvent — Development Constitution

This document governs how Clouvent's digital presence is designed, built, and evolved. It is the source of truth for business context, design principles, engineering standards, and working process. Every implementation decision should be traceable to a rule here — if it isn't, ask before proceeding.

## Business Context

- Clouvent is a premium digital presence studio.
- Initial priority market: Australia.
- Initial niche: photographers and visual/creative businesses.
- Long-term goal: expand internationally.
- Core service model: **BUILD → MANAGE → GROW**.

## Technology Stack

- **Next.js** — SSR/SSG capability, strong SEO support, excellent image optimization, strong Core Web Vitals potential.
- **TypeScript** — type safety, maintainability, scalable architecture.
- **Tailwind CSS** — enforces a constrained design-token system rather than arbitrary CSS.
- **Vercel** — low operational complexity, first-party fit with Next.js, strong performance defaults.
- **GitHub** — source control and collaboration.

This stack was chosen specifically because it is suitable for photographer/visual portfolios, supports easy future CMS integration, and does not require premature architectural complexity. Do not introduce additional frameworks, state managers, or infrastructure without explaining the reason and getting approval.

## Brand & Design

Premium, editorial, minimal, sophisticated, precise, image-first, modern but timeless.

- Avoid generic SaaS aesthetics.
- Avoid excessive gradients, glassmorphism, unnecessary cards, excessive rounded containers, random animations, and template-like layouts.
- Prioritize typography, spacing, composition, photography, hierarchy, and intentional interaction.

**Motion:** Use purposeful, restrained motion only. Avoid decorative or excessive animation. Respect `prefers-reduced-motion`. When aesthetic preference conflicts with accessibility, accessibility wins — propose an accessible way to achieve the same visual intent rather than dropping either requirement.

**Image-first vs. performance:** High-impact visual art direction must be achieved through optimized assets and deliberate loading strategies (responsive images, modern formats, considered loading order) — not through unnecessarily heavy assets. Premium visuals and performance are not in tension when built correctly; treat any apparent conflict as a solvable implementation problem, not a trade-off to pick sides on.

See `BRAND_SYSTEM.md` for the exact visual identity, colour, typography, logo, photography, UI and voice specification.

The original approved human-facing brand reference is stored at docs/brand/CLOUVENT_Brand_Identity_Guidelines_v1.0.pdf. BRAND_SYSTEM.md remains the implementation source of truth.

## Design Tokens

`BRAND_SYSTEM.md` is the source of truth for approved brand-token values; implementation must translate those values rather than redefine them.

Define once, reuse everywhere. Do not allow arbitrary values to proliferate without reason:

- Typography scale
- Spacing scale
- Color tokens
- Breakpoints
- Radii
- Shadows (where appropriate)
- Motion principles (duration/easing conventions)

## UX

- Design around real user journeys.
- Prioritize clarity and conversion.
- Make **portfolio → trust → service → enquiry** a natural journey.
- Mobile experience is first-class — do not design desktop-first and treat mobile as an afterthought.

## Engineering

Modern TypeScript-based frontend architecture (see Technology Stack). Keep components reusable and maintainable. Avoid unnecessary dependencies. Prefer simple, robust solutions. Do not introduce architecture, or make major architectural decisions, without explaining the reason and getting approval.

**BUILD**
- Premium website experience.
- Reusable component architecture.
- Performance-first implementation.

**MANAGE**
- Structure content so portfolio images, services, testimonials, and other recurring content can be updated without unnecessarily modifying presentation components.
- Keep the architecture CMS-ready.
- Do not introduce a CMS until there is a real requirement for one.

**GROW**
- Analytics-informed improvements.
- SEO iteration.
- Conversion optimization.
- Performance monitoring.
- Content iteration.

## Content & Asset Management Strategy

Keep the initial architecture simple — no CMS at launch. Structure content (copy, portfolio entries, services, testimonials) as clearly separated data rather than hardcoded inline in presentation components, so the system can evolve into a CMS-backed architecture later without a rebuild. Do not add CMS infrastructure speculatively; add it when a real content-velocity or non-technical-editing need appears.

## Accessibility

Target WCAG 2.1 AA principles. Require semantic HTML, keyboard accessibility, visible focus states, appropriate contrast, meaningful alt text, accessible forms, and reduced-motion considerations. Accessibility is not optional under design or timeline pressure.

## SEO

Every public page should consider: metadata, semantic structure, Open Graph, canonical URLs where appropriate, sitemap, robots.txt, structured data where appropriate, image SEO, internal linking, and search intent.

**Local/Australian SEO:**
- Location-based search intent.
- Relevant service/location pages only where genuinely justified — avoid artificial location pages.
- Structured data (e.g., LocalBusiness/service schema where applicable).
- Google Business Profile considerations when applicable.
- No keyword stuffing.

The initial SEO strategy should consider Australia and photographer/visual-business search intent without keyword stuffing.

## Performance

Performance is a first-class requirement, not a trade-off against visual quality.

Targets (treat as targets, not guarantees — verify with real-world testing where possible):
- **LCP < 2.5s**
- **INP < 200ms**
- **CLS < 0.1**

Prioritize: optimized images, responsive images, modern image formats, lazy loading where appropriate, font optimization, minimal JavaScript, code splitting where appropriate, caching, and mobile performance. Do not sacrifice performance merely for visual effects.

## Third-Party Script Policy

Any analytics, embeds, tracking scripts, fonts, or third-party JavaScript must have a clear purpose and be evaluated for performance, privacy, accessibility, and maintainability before being added. Avoid third-party scripts when a native or first-party solution is sufficient.

## Analytics & Privacy

Australia is the initial target market and contact forms may collect personal information.

- Do not expose sensitive data.
- Keep secrets out of source control.
- Use environment variables.
- Minimize unnecessary tracking.
- Third-party analytics must be justified (see Third-Party Script Policy).
- Privacy and consent requirements must be considered before implementing tracking or data collection.
- Do not make legal claims about privacy/compliance — flag areas that require professional/legal verification rather than asserting compliance.

## Environment & Secrets

- Never commit secrets.
- Never hardcode API keys.
- Use environment variables.
- Keep production secrets in the deployment platform (Vercel), not in the repository.
- Provide safe example environment files (e.g., `.env.example`) where necessary — never with real values.

## Image Rights & Licensing

- Client-provided photography must be treated as client-owned or appropriately licensed.
- Do not assume permission to use client images.
- Do not invent portfolio imagery.
- Do not replace real client photography with generic stock imagery unless explicitly requested.
- Use appropriate placeholders only during development.

## Content

Content must be concise, confident, premium, human, specific, and conversion-oriented. Do not generate generic agency copy. Do not invent testimonials, clients, statistics, awards, results, locations, or business claims.

## Portfolio

The primary initial case study is **Once Upon a Time Photography**, an Australian photography business for which Clouvent provides website and ongoing digital/social support.

- Do not fabricate case-study results.
- All claims, metrics, testimonials, client details, and case-study content must come from the user or a verified source. If information is missing, ask rather than assume.
- XORIX and Shooting Arena should not be treated as primary Clouvent portfolio projects unless explicitly requested later.

## Git Workflow

- Initialize Git before application scaffolding.
- Use meaningful commits.
- Keep changes focused.
- Avoid destructive Git commands unless explicitly approved.
- Establish a GitHub remote after local repository initialization.
- Do not commit secrets.

## Development Workflow

**DISCOVER → PLAN → DESIGN → IMPLEMENT → RUN/VERIFY → REVIEW → HARDEN**

- `design` — visual/design exploration.
- `run` — browser verification of the working app.
- `code-review` — implementation review.
- `security-review` — before production launch.

Do not blindly implement ambiguous requirements — return to DISCOVER/PLAN if a requirement is unclear.

## Definition of Done

A page or feature is not complete until it has been checked against:

- Visual quality
- Responsive behavior
- Accessibility
- SEO
- Performance
- Content correctness
- Functional behavior
- Security (where applicable)
- No console errors
- No broken links/assets

## Claude Behavior

Act as a senior product designer, UX engineer, frontend engineer, and technical reviewer.

- Do not simply agree with weak, technically risky, or strategically inconsistent ideas — explain why directly.
- Clearly distinguish facts, recommendations, and assumptions. State uncertainty when appropriate. Do not present guesses as facts.
- For major decisions, present: recommendation, alternatives, trade-offs, and reason for recommendation.
- Do not start coding until architecture and requirements for the current phase are sufficiently clear.
- Ask before irreversible actions. Ask before scope-expanding changes. Do not make major architectural decisions without approval.
- Do not make unnecessary changes outside the current task.
