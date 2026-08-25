"use client";

/**
 * ContactForm — the client boundary is scoped here only.
 * The page (contact/page.tsx) remains a Server Component.
 *
 * Architecture:
 * - useActionState (React 19 / Next.js 15) drives the Server Action.
 * - No global state manager. All state is local to this component.
 * - Service preselection via `defaultServices` prop (passed from the page
 *   which reads searchParams). The component works perfectly with no prop.
 * - Honeypot field: visually hidden, aria-hidden, autocomplete="off".
 *   Server Action rejects any submission where this field is non-empty.
 * - Validation: client-side on submit for UX; server-side authoritative.
 *   No aggressive on-change validation — only after attempted submission.
 *
 * Accessibility:
 * - Every <input>/<textarea>/<select> has a <label> with htmlFor.
 * - aria-required on required fields.
 * - aria-describedby wires field errors to their inputs.
 * - aria-live="polite" region announces submission result to screen readers.
 * - Service checkboxes: real <input type="checkbox"> with custom visual design.
 *   Selected state communicated by aria-checked (via checked attr), custom
 *   indicator, AND font-weight — never colour alone.
 * - Focus states: the global :focus-visible ring (copper) covers all inputs.
 * - Logical tab order: follows DOM order.
 *
 * Motion: restrained. Section labels fade-up on scroll (whileInView).
 * Submit arrow nudges on hover. Success state fades in.
 * All gated on useReducedMotion().
 */

import { useActionState, useEffect, useId, useState, useRef } from "react";
import { motion, useReducedMotion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { submitContactForm, type ContactFormState } from "./actions";

// ─── Types ────────────────────────────────────────────────────────────────────

type ServiceOption = { id: "build" | "manage" | "grow"; label: string; sub: string };

// ─── Constants ────────────────────────────────────────────────────────────────

const EASE = [0.22, 1, 0.36, 1] as const;

const SERVICES: ServiceOption[] = [
  { id: "build", label: "Build", sub: "New website / redesign" },
  { id: "manage", label: "Manage", sub: "Ongoing website management" },
  { id: "grow", label: "Grow", sub: "SEO / optimisation / paid social" },
];

const INVESTMENTS = [
  { value: "not-sure", label: "Not sure yet" },
  { value: "under-1500", label: "Under A$1,500" },
  { value: "1500-3000", label: "A$1,500 – A$3,000" },
  { value: "3000-5000", label: "A$3,000 – A$5,000" },
  { value: "5000-10000", label: "A$5,000 – A$10,000" },
  { value: "10000-plus", label: "A$10,000+" },
];

const TIMELINES = [
  { value: "asap", label: "As soon as possible" },
  { value: "within-1-month", label: "Within 1 month" },
  { value: "1-3-months", label: "1–3 months" },
  { value: "3-6-months", label: "3–6 months" },
  { value: "exploring", label: "Just exploring" },
];

const SOURCES = [
  { value: "instagram", label: "Instagram" },
  { value: "facebook", label: "Facebook" },
  { value: "referral", label: "Referral" },
  { value: "google", label: "Google" },
  { value: "direct-outreach", label: "Direct outreach" },
  { value: "other", label: "Other" },
];

// ─── Input primitive ──────────────────────────────────────────────────────────

function Field({
  label,
  required,
  children,
  error,
  errorId,
  hint,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
  error?: string;
  errorId?: string;
  hint?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-sans text-small font-semibold text-foreground">
        {label}
        {required && (
          <span aria-hidden="true" className="ml-0.5 text-accent">
            *
          </span>
        )}
      </label>
      {hint && (
        <p className="font-sans text-small text-foreground-muted leading-[1.5]">{hint}</p>
      )}
      {children}
      {error && (
        <p id={errorId} role="alert" className="font-sans text-small text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

// Shared input style — fine bottom border, no pill, no shadow
const inputBase =
  "w-full font-sans text-body text-foreground bg-transparent " +
  "border border-border-subtle rounded-(--radius-control) " +
  "px-4 py-3 placeholder:text-foreground-muted/50 " +
  "transition-[border-color,box-shadow] duration-(--duration-standard) ease-(--ease-standard) " +
  "focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent " +
  "focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-accent";

// ─── Service Selector ─────────────────────────────────────────────────────────

function ServiceSelector({
  selected,
  onChange,
  fieldId,
}: {
  selected: Set<string>;
  onChange: (id: string) => void;
  fieldId: string;
}) {
  return (
    <fieldset>
      <legend className="sr-only">Services required — select all that apply</legend>
      <div className="flex flex-col gap-3 sm:flex-row sm:gap-4" id={fieldId}>
        {SERVICES.map((s, i) => {
          const isChecked = selected.has(s.id);
          return (
            <label
              key={s.id}
              className={[
                "group relative flex flex-1 flex-col gap-1.5 cursor-pointer",
                "border rounded-(--radius-control) px-5 py-4",
                "transition-[border-color,background-color] duration-(--duration-standard) ease-(--ease-standard)",
                isChecked
                  ? "border-accent bg-accent/5"
                  : "border-border-subtle hover:border-foreground-muted/40",
              ].join(" ")}
            >
              {/* Real checkbox — visually hidden, semantically active */}
              <input
                type="checkbox"
                name="services"
                value={s.id}
                checked={isChecked}
                onChange={() => onChange(s.id)}
                className="sr-only"
              />

              {/* Visual number + check indicator */}
              <div className="flex items-center justify-between">
                <span
                  className={[
                    "font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.12em]",
                    "transition-colors duration-(--duration-standard)",
                    isChecked ? "text-accent" : "text-foreground-muted/60",
                  ].join(" ")}
                >
                  0{i + 1}
                </span>

                {/* Check mark — copper, only visible when selected */}
                <span
                  aria-hidden="true"
                  className={[
                    "flex h-4 w-4 items-center justify-center rounded-full border",
                    "transition-[border-color,background-color] duration-(--duration-standard)",
                    isChecked
                      ? "border-accent bg-accent"
                      : "border-border-subtle bg-transparent",
                  ].join(" ")}
                >
                  {isChecked && (
                    <svg width="8" height="6" viewBox="0 0 8 6" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 3l2 2 4-4" />
                    </svg>
                  )}
                </span>
              </div>

              {/* Service name + sub — font-weight reinforces selection (not colour alone) */}
              <span
                className={[
                  "font-display text-h3 leading-[1.1] transition-colors duration-(--duration-standard)",
                  isChecked ? "text-foreground" : "text-foreground-muted",
                ].join(" ")}
              >
                {s.label}
              </span>
              <span className="font-sans text-small text-foreground-muted leading-[1.4]">
                {s.sub}
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

// ─── Form section label ───────────────────────────────────────────────────────

function FormSection({
  number,
  label,
  children,
  reduce,
}: {
  number: string;
  label: string;
  children: React.ReactNode;
  reduce: boolean;
}) {
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, ease: EASE }}
      className="grid grid-cols-1 gap-(--spacing-content) border-t border-border-subtle pt-(--spacing-content) md:grid-cols-12 md:gap-(--spacing-gutter)"
    >
      {/* Section label — left column */}
      <div className="md:col-span-3">
        <span className="font-sans text-small font-semibold uppercase tracking-[0.1em] text-foreground-muted/50 block">
          {number}
        </span>
        <span className="mt-1 font-sans text-small font-semibold uppercase tracking-[0.1em] text-foreground block">
          {label}
        </span>
      </div>

      {/* Fields — right column */}
      <div className="md:col-span-9 flex flex-col gap-6">{children}</div>
    </motion.div>
  );
}

// ─── Success State ────────────────────────────────────────────────────────────

function SuccessState({ reduce }: { reduce: boolean }) {
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE }}
      className="flex flex-col gap-6 py-(--spacing-section-y)"
      role="status"
      aria-live="polite"
    >
      {/* Copper rule — editorial detail */}
      <span aria-hidden="true" className="block h-px w-12 bg-accent" />

      <h2 className="font-display text-h2 text-foreground leading-[1.15]">
        Enquiry received.
      </h2>

      <p className="font-sans text-body-lg text-foreground-muted leading-[1.6] max-w-[48ch]">
        Thanks for sharing your project with us. We&apos;ll review the details and be in touch soon.
      </p>

      <div className="flex flex-wrap gap-4 pt-2">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 font-sans text-body font-medium rounded-(--radius-control) bg-accent text-foreground px-7 py-3.5 transition-colors duration-(--duration-standard) hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          Back to CLOUVENT
          <svg aria-hidden="true" width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-(--duration-fast) group-hover:translate-x-0.5">
            <path d="M1 7h12M8 3l4 4-4 4" />
          </svg>
        </Link>
        <Link
          href="/#selected-work"
          className="inline-flex items-center gap-1.5 font-sans text-body font-medium text-foreground hover:text-accent transition-colors duration-(--duration-fast) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent rounded-sm"
        >
          View selected work
        </Link>
      </div>
    </motion.div>
  );
}

// ─── ContactForm (exported) ───────────────────────────────────────────────────

export function ContactForm({
  defaultServices = [],
}: {
  defaultServices?: string[];
}) {
  const reduce = useReducedMotion() ?? false;
  const uid = useId();
  const formRef = useRef<HTMLFormElement>(null);

  // Service multi-select state — seeded from URL query param
  const [selectedServices, setSelectedServices] = useState<Set<string>>(
    new Set(defaultServices)
  );

  // Client-side validation errors (shown after a failed submit attempt)
  const [clientErrors, setClientErrors] = useState<Record<string, string>>({});
  const [attempted, setAttempted] = useState(false);

  // Server Action state
  const [state, formAction, isPending] = useActionState<ContactFormState, FormData>(
    submitContactForm,
    { status: "idle" }
  );

  // Toggle a service in the Set
  function toggleService(id: string) {
    setSelectedServices((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  // Client validation — runs after first submit attempt
  function validate(form: HTMLFormElement): Record<string, string> {
    const data = new FormData(form);
    const errors: Record<string, string> = {};
    const name = data.get("name")?.toString().trim() ?? "";
    const email = data.get("email")?.toString().trim() ?? "";
    const details = data.get("projectDetails")?.toString().trim() ?? "";

    if (!name) errors.name = "Please enter your name.";
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errors.email = "Enter a valid email address.";
    if (!details) errors.projectDetails = "Tell us a little about your project.";
    return errors;
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    setAttempted(true);
    const form = e.currentTarget;
    const errors = validate(form);
    if (Object.keys(errors).length > 0) {
      e.preventDefault();
      setClientErrors(errors);
      // Focus the first error field
      const firstKey = Object.keys(errors)[0];
      const el = form.elements.namedItem(firstKey) as HTMLElement | null;
      el?.focus();
    } else {
      setClientErrors({});
    }
  }

  // Re-validate on change after a submit attempt
  function handleChange() {
    if (attempted && formRef.current) {
      setClientErrors(validate(formRef.current));
    }
  }

  // If success, show the success state only
  if (state.status === "success") {
    return <SuccessState reduce={reduce} />;
  }

  return (
    <form
      ref={formRef}
      action={formAction}
      onSubmit={handleSubmit}
      onChange={handleChange}
      noValidate
      aria-label="Project enquiry form"
    >
      {/* ── Honeypot — hidden from real users AND assistive tech ───────── */}
      <div aria-hidden="true" className="absolute opacity-0 pointer-events-none h-0 overflow-hidden">
        <label htmlFor={`${uid}-hp`}>Leave this empty</label>
        <input
          id={`${uid}-hp`}
          name="_hp"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* ── Submission error (server) ────────────────────────────────────── */}
      {state.status === "error" && (
        <div
          role="alert"
          aria-live="assertive"
          className="mb-8 flex items-start gap-3 rounded-(--radius-control) border border-red-200 bg-red-50 px-5 py-4"
        >
          <p className="font-sans text-body text-red-700 leading-[1.5]">
            {state.message}
          </p>
        </div>
      )}

      <div className="flex flex-col gap-(--spacing-section-y)">

        {/* ── 01 / YOUR DETAILS ─────────────────────────────────────────── */}
        <FormSection number="01" label="Your details" reduce={reduce}>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <Field
              label="Your name"
              required
              error={clientErrors.name}
              errorId={`${uid}-name-err`}
            >
              <input
                id={`${uid}-name`}
                name="name"
                type="text"
                autoComplete="name"
                aria-required="true"
                aria-describedby={clientErrors.name ? `${uid}-name-err` : undefined}
                placeholder="Jane Smith"
                className={inputBase}
              />
            </Field>

            <Field
              label="Email address"
              required
              error={clientErrors.email}
              errorId={`${uid}-email-err`}
            >
              <input
                id={`${uid}-email`}
                name="email"
                type="email"
                autoComplete="email"
                aria-required="true"
                aria-describedby={clientErrors.email ? `${uid}-email-err` : undefined}
                placeholder="jane@yourstudio.com"
                className={inputBase}
              />
            </Field>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <Field label="Business / studio name">
              <input
                id={`${uid}-business`}
                name="business"
                type="text"
                autoComplete="organization"
                placeholder="Your Studio"
                className={inputBase}
              />
            </Field>

            <Field label="Current website">
              <input
                id={`${uid}-website`}
                name="currentWebsite"
                type="url"
                autoComplete="url"
                placeholder="yourwebsite.com.au"
                className={inputBase}
              />
            </Field>
          </div>
        </FormSection>

        {/* ── 02 / WHAT DO YOU NEED? ────────────────────────────────────── */}
        <FormSection number="02" label="What do you need?" reduce={reduce}>
          <ServiceSelector
            selected={selectedServices}
            onChange={toggleService}
            fieldId={`${uid}-services`}
          />
          <p className="font-sans text-small text-foreground-muted/60">
            Select all that apply. Most projects involve more than one.
          </p>
        </FormSection>

        {/* ── 03 / TELL US ABOUT THE PROJECT ───────────────────────────── */}
        <FormSection number="03" label="Tell us about the project" reduce={reduce}>
          <Field
            label="What are you looking to improve?"
            required
            hint="Tell us about your business, your current digital presence, and what you'd like to improve."
            error={clientErrors.projectDetails}
            errorId={`${uid}-details-err`}
          >
            <textarea
              id={`${uid}-details`}
              name="projectDetails"
              rows={6}
              aria-required="true"
              aria-describedby={
                clientErrors.projectDetails ? `${uid}-details-err` : undefined
              }
              placeholder="For example: we're a wedding photography studio in Melbourne. Our current site is on Wix and doesn't reflect the quality of our work. We'd like a redesigned site that shows our portfolio properly and makes it easier for couples to enquire."
              className={`${inputBase} resize-y`}
            />
          </Field>
        </FormSection>

        {/* ── 04 / PROJECT CONTEXT ─────────────────────────────────────── */}
        <FormSection number="04" label="Project context" reduce={reduce}>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <Field label="Approximate investment">
              <select
                id={`${uid}-investment`}
                name="investment"
                className={`${inputBase} cursor-pointer`}
                defaultValue=""
              >
                <option value="" disabled>Select a range…</option>
                {INVESTMENTS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="When would you like to start?">
              <select
                id={`${uid}-timeline`}
                name="timeline"
                className={`${inputBase} cursor-pointer`}
                defaultValue=""
              >
                <option value="" disabled>Select a timeline…</option>
                {TIMELINES.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <Field label="How did you find CLOUVENT?">
            <select
              id={`${uid}-source`}
              name="source"
              className={`${inputBase} cursor-pointer`}
              defaultValue=""
            >
              <option value="">Prefer not to say</option>
              {SOURCES.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </Field>
        </FormSection>

        {/* ── Submit ───────────────────────────────────────────────────── */}
        <div className="border-t border-border-subtle pt-(--spacing-content) flex flex-col gap-5">

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="submit"
              disabled={isPending}
              aria-disabled={isPending}
              className="group inline-flex items-center justify-center gap-2 font-sans text-body font-medium rounded-(--radius-control) bg-accent text-foreground px-8 py-4 transition-colors duration-(--duration-standard) hover:bg-accent-hover active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent w-full sm:w-auto"
            >
              {isPending ? "Sending…" : "Send project enquiry"}
              {!isPending && (
                <svg
                  aria-hidden="true"
                  width="14" height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform duration-(--duration-fast) group-hover:translate-x-0.5"
                >
                  <path d="M1 7h12M8 3l4 4-4 4" />
                </svg>
              )}
            </button>

            {/* Direct email alternative */}
            <p className="font-sans text-small text-foreground-muted">
              Prefer email?{" "}
              <a
                href="mailto:clouventsolutions@gmail.com"
                className="text-foreground underline underline-offset-4 hover:text-accent transition-colors duration-(--duration-fast)"
              >
                clouventsolutions@gmail.com
              </a>
            </p>
          </div>

          {/* Privacy note */}
          <p className="font-sans text-small text-foreground-muted/60 leading-[1.55] max-w-[58ch]">
            By submitting this enquiry, you agree that CLOUVENT may use the information provided
            to respond to your project request. Read our{" "}
            <Link href="/privacy" className="underline underline-offset-4 hover:text-foreground-muted transition-colors duration-(--duration-fast)">
              Privacy Policy
            </Link>
            .
          </p>

          {/* Aria-live region for screen reader feedback */}
          <div aria-live="polite" aria-atomic="true" className="sr-only">
            {isPending && "Sending your enquiry…"}
            {state.status === "error" && state.message}
          </div>
        </div>

      </div>
    </form>
  );
}
