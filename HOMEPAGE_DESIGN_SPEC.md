# Clouvent Homepage Design Specification

**Superseded 2026-08-26.** The five-section structure below (§5, §13) was approved Phase 6 output and shipped in Phase 7. It was deliberately expanded to eight sections — adding a Positioning Statement, an Australia/Global market-positioning section with a world map, and a Pricing Preview — per explicit direction to rebuild the homepage to a larger brief, confirmed with the user given the conflict with this document's "keep the homepage disciplined" guidance. `src/app/page.tsx`'s header comment is the current source of truth for section order and surface rhythm. This document is kept for historical context on the original five-section reasoning (Trust's two-mechanism rule, the ascending-vector budget, etc.), most of which the new sections still honour.

Approved Phase 6 output. This is the implementation reference for Phase 7 — it does not override `CLAUDE.md`, `PROJECT_BRIEF.md`, or `BRAND_SYSTEM.md`, it applies them to one page. Where this document and another disagree, the other wins and the conflict should be reported, not silently resolved.

## 1. Purpose

Specify the homepage's narrative, art direction, section-by-section blueprint, and implementation guardrails before any Phase 7 build work begins. Specification only — no production copy is locked here; messaging territories are placeholders.

## 2. Homepage Business Objective

The homepage is not a portfolio landing page — its job is to support Clouvent's actual acquisition model (`PROJECT_BRIEF.md` §19). Primary audience: Australia-first photographers and visual/creative businesses, including a meaningful share arriving via personalized outreach who are actively deciding whether Clouvent is legitimate, technically credible, and capable of an ongoing relationship. Primary conversion: project enquiry. Secondary: direct email / discovery conversation. Credibility must come from real, verifiable work — never fabricated scale (`PROJECT_BRIEF.md` §9).

## 3. Visitor Narrative

1. **First 5 seconds:** This is a real, precise, premium studio — not a template, not a generic freelancer.
2. **After 20 seconds:** Specific, demonstrated expertise (design + engineering); not a one-off transaction — an ongoing relationship model exists.
3. **First proof encountered:** The Once Upon a Time Photography case study — real, specific, delivered work.
4. **What Services must resolve:** "What exactly am I buying, and does it match what I'll need after launch too?"
5. **What must happen before the CTA feels earned:** proof of craft seen, the partnership model understood, a sense of what happens next (a conversation, not a commitment).

## 4. Approved Art Direction

**Structured Digital Editorial** (Direction C) as the primary structural and art-direction framework — the only concept that visibly embodies both halves of `EDITORIAL CRAFT × DIGITAL PRECISION` at once, and gives `01 BUILD / 02 MANAGE / 03 GROW` its most natural expression.

Hybrid refinements folded in:
- **Selected Work** uses Direction B's full-bleed photography treatment — photography should still dominate its own section even though it doesn't dominate the whole site.
- **Hero and Trust** use Direction A's typographic restraint and negative-space discipline.

Explicitly not carried forward: Direction B's photography-dominant hero (identity-confusion risk, addressed directly in §6) and Direction A's site-wide under-use of photography (undersells the one real proof asset Clouvent has).

## 5. Final Section Order

1. Hero (Impact)
2. Selected Work
3. Trust
4. Services (Build → Manage → Grow)
5. Enquiry

## 6. Hero Specification

- **Purpose:** Establish premium, precise, credible identity in under 5 seconds.
- **Visitor question answered:** "Is this a real, high-quality studio?"
- **Layout:** Unequal split — typography zone (~60%) / photography zone (~40%), separated by a fine rule. Genuinely asymmetric, not a lazy 50/50 split.
- **Surface:** Cloud Ivory (light).
- **Typography:** Instrument Serif display statement; Manrope eyebrow/CTA.
- **Photography:** One carefully chosen, real project image, contained within its zone (not full-bleed in the hero — full-bleed treatment is reserved for Selected Work).
- **Identity clarity — non-negotiable refinement:** The hero must never leave a visitor uncertain whether they're viewing the photographer's own site rather than Clouvent's. Concretely: the Clouvent logo/wordmark is visible in the header above the hero at all times; the hero eyebrow label identifies Clouvent and its positioning (e.g., "Clouvent — Digital Presence Studio," territory only, not locked copy) before or alongside the photography zone; the photography zone is framed as a project preview (small caption/label identifying it as client work), never presented as if it were the subject of the page itself.
- **Graphic elements:** One fine rule at the split seam. No decorative grid texture unless it clearly improves the composition — default to none.
- **Primary interaction:** Single restrained entrance reveal on load only (see §17).
- **CTA:** Primary "Start a project" (copper), secondary text link to Selected Work.
- **Mobile behavior:** Split stacks vertically — typography first, image second.
- **Performance:** Hero image is the LCP element — `next/image`, priority-loaded, correctly sized.
- **Accessibility:** Headline as a real `h1`; contrast verified before copy is locked (per the method used in Phase 5, not assumed).

## 7. Selected Work Specification

- **Purpose:** Deliver the fastest, strongest proof available.
- **Visitor question answered:** "Is the actual work good?"
- **Content:** Case-study preview — project label, 2–3 line delivered-work summary covering design, React + TypeScript development, ongoing maintenance, analytics/Search Console monitoring, and paid social support (per `PROJECT_BRIEF.md` §10) — no claimed business outcomes.
- **Layout:** Full-bleed or near-full-bleed photography block with an adjacent (not overlaid) content zone.
- **Surface:** Studio White (light-subtle).
- **Photography:** Large editorial crop(s) from Once Upon a Time Photography. Exact crop plan deferred until real images and confirmed niche are available — `[NEEDS INPUT]`.
- **Primary interaction:** Restrained hover state on the preview (subtle scale, ~1.01–1.02, or a border/opacity shift).
- **CTA:** "View the work" → `/work`.
- **Mobile behavior:** Image becomes a full-width top band; summary and link stack below.
- **Performance:** Lazy-loaded (below the fold), responsive `next/image` sizes.
- **Accessibility:** Descriptive alt text sourced from real project context once available — never generic or invented.

## 8. Trust Specification

- **Purpose:** Convert "the work looks good" into "I could work with these people."
- **Visitor question answered:** "Can they handle more than a one-off build? Is this safe to enter into?"
- **Content — revised per refinement 2:** Legitimate trust mechanisms limited to what is actually confirmed. Confirmed and safe to state: an approach/standards statement (design + performance thinking, per `PROJECT_BRIEF.md` §7 BUILD scope), and what happens after launch (ties directly to MANAGE — ongoing maintenance, analytics/Search Console monitoring). **Removed:** any claim about organizational structure such as "no account-manager layer" or a "direct relationship with the person doing the work" — `PROJECT_BRIEF.md` §1 lists Clouvent's legal/business basics as `[NEEDS INPUT]` and does not confirm team size or structure anywhere; this is an absence of confirmation, not a stated fact, so it cannot be asserted on the homepage. If a third trust statement is wanted, it must wait for that confirmation rather than assume solo-founder positioning; until then, Trust runs on two mechanisms (method/standards, post-launch partnership), not three.
- **Layout:** Structured, numbered or ruled list — not icon cards.
- **Surface:** Clouvent Black (dark).
- **Typography:** Manrope body; Instrument Serif for a short section header.
- **Photography:** None — text/structure-led, per Direction A's restraint.
- **Graphic elements:** Fine rules between statements. Sparse node/grid marks only where structurally useful, not as filler.
- **Primary interaction:** Subtle scroll-reveal per statement, no stagger drama.
- **CTA:** None — this section builds belief, doesn't ask for action.
- **Mobile behavior:** Statements stack; rules remain full-width dividers.
- **Accessibility:** Studio White on Clouvent Black — contrast already verified in Phase 5 (15.77:1).

## 9. Services Specification

- **Purpose:** Translate belief into a concrete, understandable engagement structure.
- **Visitor question answered:** "What exactly would I be buying?"
- **Content:** One continuous editorial numbered sequence (`01 BUILD / 02 MANAGE / 03 GROW`), one line each stating role, scoped per `PROJECT_BRIEF.md` §7 — homepage depth only, full detail deferred to `/services`.
- **Layout:** Horizontal sequence on desktop (vertical on mobile), continuity shown via a connecting fine rule or the ascending-vector motif — not three isolated cards.
- **Surface:** Cloud Ivory (light).
- **Typography:** Large editorial numerals (Instrument Serif); Manrope labels/descriptions.
- **Graphic elements:** Editorial numbering is the primary graphic device here. The ascending-vector motif, if used on this page at all, is spent here (see §16 — one deliberate use per page maximum) and most naturally accents GROW.
- **Primary interaction:** Minimal fade-in per item on scroll.
- **CTA:** Optional quiet text link "See how we work" → `/services` — not a hard CTA; the hard ask comes next.
- **Mobile behavior:** Vertical stack, connecting rule becomes vertical.
- **Accessibility:** Numbering conveyed in real text, not decorative/image-only, so it's screen-reader legible.

## 10. Enquiry Specification

- **Purpose:** Provide the natural conclusion of the narrative.
- **Visitor question answered:** "How do I start, and what happens next?"
- **Content:** Short, confident closing statement + primary enquiry CTA + secondary direct-email path. No newsletter, no lead magnet, no fake scarcity.
- **Layout:** Centered or left-aligned editorial close, generous whitespace.
- **Surface:** Clouvent Black (dark) — bookends the light hero with a confident close.
- **Typography:** Instrument Serif closing statement; Manrope for the email/secondary path.
- **CTA:** Primary "Start a project" → enquiry form/page. Secondary: visible direct email text — `[NEEDS INPUT]`, no address exists yet.
- **Mobile behavior:** Full-width primary CTA, email beneath it.
- **Accessibility:** Studio White on Clouvent Black — already contrast-verified.

## 11. Navigation Specification

- **Desktop:** Logo top-left. Nav links (Work, Services, About) right of center. Enquiry CTA as a visually distinct copper button at the far right — the one persistent place copper appears as a CTA outside the hero/close. Sticky on scroll, background fades in subtly once past the hero (not an abrupt jump).
- **Mobile — locked per approval, exact specification:**
  - Minimal full-screen navigation (not a slide-in panel, not a mega-menu).
  - A clear, unambiguous close control.
  - Links: Work / Services / About / Contact.
  - The primary enquiry action present within the mobile navigation.
  - No decorative menu animation — open/close is a simple, functional transition only (opacity/transform, consistent with §17's motion budget), nothing performative.

## 12. Footer Specification

Small, secondary-role logo/brandmark (not a repeat of header prominence). Essential nav (Work, Services, About, Contact). Direct email as visible plain text — `[NEEDS INPUT]`. Legal links (Privacy Policy, Terms) per the approved sitemap. Minimal business information — entity name, ABN, and base location are all `[NEEDS INPUT]` per `PROJECT_BRIEF.md` §22 and must render as pending placeholders in implementation, never fabricated. Social links only if/when a real, live account exists to link to — not assumed.

## 13. Surface Rhythm

| # | Section | Surface |
|---|---|---|
| 1 | Hero | Cloud Ivory (light) |
| 2 | Selected Work | Studio White (light-subtle) |
| 3 | Trust | Clouvent Black (dark) |
| 4 | Services | Cloud Ivory (light) |
| 5 | Enquiry | Clouvent Black (dark) |

Deliberate alternation, not mechanical repetition; bookended by the light hero and dark close. Copper stays restrained throughout — CTA emphasis, hover states, and the single §16 motif accent only.

## 14. Typography Direction

Instrument Serif carries display statements and section headers (Hero, Selected Work eyebrow, Trust header, Services numerals, Enquiry close). Manrope carries everything functional — body copy, navigation, buttons, forms, metadata — exactly per `BRAND_SYSTEM.md` §4, using the type-scale and font-binding tokens already implemented in Phase 5. No new typographic values are introduced here.

## 15. Photography Art Direction

Selected Work carries the photography weight: full-bleed or large contained crops. Exact aspect ratio/crop plan deferred until real Once Upon a Time Photography images and confirmed niche are available (`[NEEDS INPUT]`). Minimal overlays throughout, per `BRAND_SYSTEM.md` §7 — where text must sit over an image, a solid caption zone is used, not a gradient scrim. Desktop favors large single images; mobile crops are planned deliberately per image, never auto-center-cropped. No stock or AI imagery anywhere on the page.

## 16. Graphic Language

Strengthened per approval:
- Approved motifs only: fine rules, editorial numbering, sparse nodes.
- Sparse nodes appear only where structurally useful (e.g., marking the hero's split seam) — never as filler or texture.
- **Maximum one deliberate ascending-vector treatment across the entire homepage experience** — not once per section. Its one use is spent in Services, most naturally accenting GROW (§9).
- No generic tech-pattern wallpaper anywhere.
- No decorative grid texture unless it clearly, demonstrably improves a specific composition — the default assumption is none.
- The literal logo mark is never repeated as background decoration.

## 17. Motion & Interaction

| Element | Trigger | Type | Intensity | Reduced-motion |
|---|---|---|---|---|
| Navigation | Scroll past hero | Background opacity fade | Subtle, 200ms | Snaps instantly |
| Hero | Page load | Fade + small translate, once | Restrained, 320ms | Appears immediately, no transform |
| Mobile nav open/close | Tap | Opacity/transform only | Functional, not decorative | Appears/dismisses immediately |
| Selected Work image | Scroll into view / hover | Reveal once + subtle hover scale | ~1.01–1.02 scale | No reveal; hover becomes a static border/opacity shift |
| Services items | Scroll into view | Fade, no stagger | Minimal | None |
| TextLink | Hover | Underline-weight change (existing Phase 5 primitive) | 120ms | Already reduced-motion-safe |
| Primary CTA | Hover | Background shift (existing) + subtle arrow-nudge translate | <200ms | Nudge removed; background shift remains (color change isn't motion) |

No scroll-jacking. No parallax — no exceptional reason found to justify it. No multi-step intro sequence.

## 18. Mobile-First Behavior

Hero's split stacks (type first, image second). Selected Work's image becomes a full-width top band, content below, never auto-cropped. Trust's statements stack with full-width dividers. Services becomes a vertical numbered sequence with a vertical connecting rule. Enquiry's CTA goes full-width with email beneath. Mobile navigation follows §11's locked specification exactly. Text measure stays within the existing `content` container width token at every breakpoint — no oversized mobile display type for drama.

## 19. Accessibility Requirements

WCAG 2.1 AA target per `CLAUDE.md`. Every color pairing used on this page must be contrast-verified by computation before copy is locked, using the same method applied in Phase 5 (two real failures were found and fixed at the token level that way — this page inherits those fixed tokens but any new pairing introduced during implementation needs its own check). Real semantic HTML throughout (`h1`/`h2` hierarchy, `nav`, `section`, native `button`/`a`). Visible `:focus-visible` on every interactive element (already a global default from Phase 5). `prefers-reduced-motion` behavior specified per §17. Alt text on all photography sourced from real context, never generic or invented.

## 20. Performance Requirements

Hero image is the LCP candidate — priority-loaded, correctly sized `next/image`. All other imagery lazy-loaded. Zero new client-side JavaScript beyond what genuine interactivity requires (mobile nav toggle, hover states already achievable via CSS). No animation library. Core Web Vitals targets (`LCP < 2.5s`, `INP < 200ms`, `CLS < 0.1`) remain targets to verify in Phase 7, not guarantees claimed here.

## 21. Content / Asset Requirements

**Already Available:** brand tokens/typography/logo (black horizontal variant), Once Upon a Time Photography delivered-work facts, approved sitemap, service scope (`PROJECT_BRIEF.md` §7).

**Needs Input (cannot be fabricated):** licensed Once Upon a Time Photography images + confirmed niche/style; direct enquiry email address; company bio/founding basics; testimonial text (once obtained); legal/business details for the footer; Clouvent team size/structure (relevant to any future Trust-section expansion); white/reversed and icon-only logo variants; favicon.

**Nice to Have:** additional case-study angle images; a confirmed discovery-call booking mechanism (vs. plain email); social links.

## 22. Risks / Open Questions

The largest open risk is structural, not stylistic: the entire homepage's proof burden rests on one case study, and Selected Work is asked to work harder than a normal portfolio grid item because there's no second project to spread the load. Split-hero layouts are a known agency pattern — mitigated by requiring genuine asymmetry and a grid-logic justification, not a lazy 50/50 split (§6). Trust currently runs on two confirmed mechanisms rather than three, pending `PROJECT_BRIEF.md` updates on team structure — implementation should not pad this back to three with an unconfirmed claim. Photography crop planning for Selected Work cannot be finalized until real images and niche are provided.

## 23. Phase 7 Implementation Guardrails

- Implement from this document rather than improvising new page structure.
- External design skills (`design-taste-frontend`, `ui-ux-pro-max`, `emil-design-eng`) remain advisory only.
- `BRAND_SYSTEM.md` remains the visual identity authority.
- `PROJECT_BRIEF.md` remains the business/content authority.
- No final copy may fabricate facts or claims — anything marked `[NEEDS INPUT]` here stays a neutral placeholder until real information arrives.
- No new dependencies without justification and explicit approval.
- No generic SaaS/card-grid design patterns.
- No excessive animation — stay within the motion budget in §17.
- Mobile must be treated as first-class, not a shrunk desktop layout.
- Real photography must remain the primary proof asset — Selected Work is not optional polish, it's the section carrying the most business weight on this page.
