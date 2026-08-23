# Clouvent Brand System

Version 1.0 / August 2026. This is the exact visual and verbal implementation source of truth for Clouvent, derived from the approved Clouvent Brand Identity Guidelines v1.0. It sits below `CLAUDE.md` (constitution) and alongside `PROJECT_BRIEF.md` (business facts) — it does not restate their content, only cross-references it. Where this document and another disagree, stop and report the conflict rather than silently choosing.

## 1. Brand Foundation

- Premium Digital Presence Studio.
- Australia-first, initial focus: photographers and visual/creative businesses.
- Long-term international capability — without claiming an international client base.
- Core service architecture: **BUILD → MANAGE → GROW**.
- Creative territory: **EDITORIAL CRAFT × DIGITAL PRECISION** — editorial craft contributes typography, photography, composition, and emotional restraint; digital precision contributes grids, structure, performance, geometric detail, and technical credibility.

## 2. Brand Personality

Precise, premium, editorial, intelligent, confident, human, image-first, modern but timeless.

## 3. Colour System

| Token | Hex | Role |
|---|---|---|
| Clouvent Black | `#171717` | Primary dark surface |
| Graphite | `#222120` | Elevated dark surface |
| Cloud Ivory | `#F3F0EB` | Primary light surface |
| Studio White | `#FAF9F7` | Clean neutral surface |
| Clouvent Copper | `#C9784E` | Signature accent / CTA |
| Soft Copper | `#D99068` | Secondary accent |
| Stone Grey | `#A7A39E` | Secondary text |
| Border Grey | `#353331` | Subtle dividers |

**Usage philosophy (directional, not a rigid formula):** ~70% neutral surfaces, ~20% photography/content, ~10% accent.

Copper is a restrained signature, not decoration. Use deliberately for: primary CTA emphasis, selected/active states, editorial numbering, fine rules, deliberate micro-details. Avoid large copper/orange fields unless there is a strong approved design reason. Copper is never the default full-logo treatment.

## 4. Typography

- **Display / editorial:** Instrument Serif.
- **Functional / UI:** Manrope.
- Production licensing/availability must be verified before final lock.

**Approved scale direction** (guidance for later responsive design tokens — not yet fixed implementation values):

| Level | Style | Range |
|---|---|---|
| Display XL | Serif | 56–80 px |
| H1 | Serif | 44–64 px |
| H2 | Serif / Sans | 32–48 px |
| H3 | Sans | 24–32 px |
| Body Large | Sans | 18–22 px |
| Body | Sans | 16–18 px |
| Eyebrow / UI | Sans | 12–14 px |

## 5. Logo System

The current logo (geometric network/grid mark + ascending vector) is the master visual reference. Build the identity around it — do not casually redesign it.

**Required master assets:** primary horizontal logo, black logo (light backgrounds), white/reversed logo (dark backgrounds), brandmark/icon-only asset, favicon and social-avatar crops, SVG master, transparent PNG exports.

**Rules:** predominantly monochrome; generous clear space; no stretching, skewing, rotation, shadows, or recolouring individual logo parts; copper is never the default full-logo treatment; use only high-contrast backgrounds that preserve legibility.

## 6. Graphic Language

**Approved motifs:** network/grid geometry, thin structural lines, sparse nodes, controlled ascending lines/vectors, editorial numbering (`01 BUILD / 02 MANAGE / 03 GROW`), fine copper or neutral rules.

**Avoid:** random blobs, unrelated abstract shapes, generic tech waves, neon effects, AI brain graphics, literal cloud graphics, decorative code brackets, visual clutter that competes with photography.

## 7. Photography Art Direction

Authentic client photography and verified project material only. Large editorial crops, full-bleed moments, generous negative space, minimal overlays preserving tonal detail. Device/site mockups only when they explain delivered work. Plan intentional desktop and mobile crops. Never present stock or AI-generated imagery as client work.

For Once Upon a Time Photography: public claims must focus on verified work delivered, not unverified business outcomes. See `PROJECT_BRIEF.md` §10 for the canonical case-study facts — do not duplicate them here.

## 8. UI & Interaction Language

**Buttons:** Primary — restrained copper signature CTA with strong contrast. Secondary — transparent or neutral with fine border. Text CTA — concise label with directional arrow when useful.

**Layout:** typography, whitespace, photography, composition, and hierarchy carry the design. Cards only when they improve information architecture. Avoid repeated rounded containers.

**Surfaces:** controlled rhythm between near-black editorial sections and warm ivory/light sections. Avoid excessive gradients and glassmorphism.

**Motion:** calm, restrained, precise, intentional — subtle text/image reveals, precise hover states, subtle scaling, deliberate transitions. See `CLAUDE.md` → Brand & Design → Motion for the canonical accessibility and reduced-motion rule — not duplicated here.

## 9. Brand Voice

Concise, confident, premium, human, specific, intelligent.

**Good territory:**
- "Your work deserves a digital presence to match."
- "Built beautifully. Managed properly. Designed to grow."
- "BUILD. MANAGE. GROW."

**Avoid:** generic agency language ("leading innovative digital solutions company," "cutting-edge solutions for clients worldwide").

For claims rules, see `CLAUDE.md` → Content / Portfolio and `PROJECT_BRIEF.md` → Content & Claims Rules — canonical, not duplicated here.

## 10. Tagline Status

- No permanent tagline is locked yet.
- **BUILD. MANAGE. GROW.** is the strongest recurring brand architecture/device — not a permanent tagline.
- **"Infrastructure With Intelligence Built In."** is legacy messaging from an earlier, infrastructure-heavy positioning. It must not be reused as current positioning, in website copy, skill guidance, or generated messaging.

## 11. Website Application

See `PROJECT_BRIEF.md` §20 for the canonical sitemap and conversion goals — not duplicated here.

Brand-level experience journey: **IMPACT → SELECTED WORK → TRUST → SERVICES → ENQUIRY**.

Website design must translate the identity into a premium, conversion-focused experience — not a social-poster aesthetic.

## 12. Do / Don't

**DO:** generous whitespace, deliberate composition, typography-led identity, photography-led identity, restrained copper, verified client material, first-class mobile design, purposeful accessible motion.

**DON'T:** generic SaaS card grids, excessive gradients, glassmorphism, decorative effects, copper everywhere, invented proof, reduced-desktop mobile design, random animation.

## 13. Brand Asset Checklist

- Master logo (SVG)
- Transparent PNG — dark and light variants
- Brandmark-only SVG/PNG
- Favicon set
- Social profile avatar
- Colour tokens and accessible combinations
- Licensed production font files / approved web-font source
- Typography scale and responsive rules
- Icon set
- Social post templates
- Proposal / presentation templates
- Open Graph template
- Website design tokens
- Photography usage permissions / source records

**`[NOT YET PROVIDED]`:**
- Clouvent legal entity / business registration details
- Clouvent base location
- Final domain
- Founding story / approved company bio
- Once Upon a Time Photography niche/style
- Verified testimonial text
- Production-ready logo export files (SVG/PNG variants beyond the existing reference mark)
- Licensed Instrument Serif / Manrope font files or confirmed web-font source

## 14. Governance & Versioning

- Brand System version: v1.0 / August 2026.
- New colours, fonts, icon styles, or layout patterns require a clear reason.
- Reusable design tokens (colour, typography, spacing, radius, motion) must govern implementation, not ad hoc values.
- Public claims must remain traceable to `PROJECT_BRIEF.md` or other verified/user-provided information.
- Accessibility and performance remain shipping requirements — see `CLAUDE.md` for canonical targets, not duplicated here.

### Source Reference

The original approved human-facing brand document is stored at `docs/brand/CLOUVENT_Brand_Identity_Guidelines_v1.0.pdf`. `BRAND_SYSTEM.md` is the machine-readable implementation translation of that approved brand direction. The current environment cannot independently render or re-read the on-disk PDF, so this document does not claim a fresh file-system re-verification against it — `BRAND_SYSTEM.md` was derived from the brand-guideline content previously shared directly and remains the implementation source of truth.
