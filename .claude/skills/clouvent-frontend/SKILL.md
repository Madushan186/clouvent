---
name: clouvent-frontend
description: Applies Clouvent's frontend architecture and implementation standards (Next.js, TypeScript, Tailwind CSS). Use for application scaffolding, component implementation, and content architecture.
---

# Clouvent Frontend

Applies Clouvent's engineering conventions to implementation. Does not define business or brand facts — reads them from source documents below.

## Must read

- `CLAUDE.md` → Technology Stack, Engineering, Content & Asset Management Strategy — canonical stack and architecture rules.
- `BRAND_SYSTEM.md` — tokens and typography scale to translate into implementation (Tailwind config etc.).
- `PROJECT_BRIEF.md` — content/business requirements relevant to the component or page being built.

This skill must never override those documents. If they conflict, stop and report the conflict rather than choosing silently.

## Default stack

Next.js, TypeScript, Tailwind CSS — the approved default per `CLAUDE.md`. Treat as default, not absolute: a genuine technical reason to deviate must be explained, with trade-offs, and approved before changing.

## Use for

Application scaffolding (after explicit approval), component implementation, layout implementation, content architecture, reusable design-system implementation.

## Rules

- Reusable, maintainable component structure.
- Minimal dependencies — justify anything added.
- CMS-ready content separation (data separated from presentation components) — no CMS until there is a real requirement for one.
- No unapproved framework, state-manager, or major architecture changes.
- Prefer simple, robust solutions.
- Translate `BRAND_SYSTEM.md` token values into implementation (e.g. Tailwind config) — do not redefine or invent values.

## Avoid

- Hardcoding business content (copy, portfolio entries, services, testimonials) inline in presentation components.
- Unapproved dependencies or speculative infrastructure.
- Unnecessary client-side JavaScript.
- Stack deviation without explanation and approval.
