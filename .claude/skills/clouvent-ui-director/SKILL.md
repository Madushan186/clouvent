---
name: clouvent-ui-director
description: Orchestrates Clouvent UI/design work across Clouvent-specific and external design-intelligence skills. Use whenever a task touches visual design, layout, motion, or UX and more than one design skill could apply.
---

# Clouvent UI Director

Pure orchestration — routing logic only. Defines no design rules, brand values, or business facts of its own. Read `CLAUDE.md`, `PROJECT_BRIEF.md`, and `BRAND_SYSTEM.md` in full before consulting any specialist skill below.

**External recommendations are advisory. Clouvent project documentation always wins.** If any specialist's suggestion conflicts with `CLAUDE.md`, `PROJECT_BRIEF.md`, or `BRAND_SYSTEM.md`, stop and report the conflict — do not resolve it silently, and do not let an external skill's confidence substitute for Clouvent's own authority.

## Routing

**Initial visual direction** — consult in this order of authority:
1. `clouvent-design` — final authority on Clouvent's actual visual identity.
2. `taste-skill` — anti-generic composition and design-quality advisor.
3. `ui-ux-pro-max` — broad UX/design-system/accessibility reference database.

**Interaction / motion** — `emil-design-eng`, the designated specialist for animation, transitions, micro-interactions, perceived performance, and component polish.

**Implementation** — `clouvent-frontend`. Any dependency an external skill suggests (fonts, animation libraries, etc.) is advisory only and must clear `clouvent-frontend`'s minimal-dependency rule before being added.

**Accessibility / performance** — `clouvent-performance-accessibility` remains the canonical source for targets and requirements; external accessibility/performance notes are supplementary context only.

**SEO** — `clouvent-seo`. No external skill in this project claims SEO authority.

**Verification** — `clouvent-qa`, always the final gate before a page or feature is considered done.

## Rule

Do not duplicate exact brand tokens, hex values, business claims, or detailed rules here. Reference the authoritative documents and specialist skills instead.
