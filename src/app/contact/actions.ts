"use server";

/**
 * Contact form Server Action.
 *
 * Architecture:
 * - Runs entirely on the server — no API keys exposed to the browser.
 * - Uses Resend for email delivery. If RESEND_API_KEY is absent (local dev
 *   without .env.local), logs the submission to console and returns success
 *   so the form UX can be developed and tested without real credentials.
 * - No database. No logging of personal data beyond the immediate email.
 * - Honeypot field (_hp) is checked server-side — bots that fill it are
 *   silently rejected with a success response (don't tip off the bot).
 *
 * Security:
 * - All fields are trimmed and length-capped server-side.
 * - service values are validated against an allowlist.
 * - Email is validated with a basic pattern.
 * - URL is validated to prevent injection (must be empty or http/https).
 * - No user-supplied content is ever interpolated into email headers.
 * - investmentRange and timeline are validated against allowlists.
 *
 * To enable real email sending:
 * 1. Run: npm install resend
 * 2. Create .env.local from .env.example and add your RESEND_API_KEY.
 * 3. Uncomment the Resend import and sending block below.
 * 4. Verify your from address in the Resend dashboard.
 */

export type ContactFormState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string };

// Validated service values — allowlist. Matches pricing-data IDs.
const VALID_SERVICES = ["build", "manage", "grow"] as const;
type ServiceId = (typeof VALID_SERVICES)[number];

const SERVICE_LABELS: Record<ServiceId, string> = {
  build: "BUILD — New website / redesign",
  manage: "MANAGE — Ongoing website management",
  grow: "GROW — SEO / optimisation / paid social",
};

const VALID_INVESTMENTS = [
  "not-sure",
  "under-1500",
  "1500-3000",
  "3000-5000",
  "5000-10000",
  "10000-plus",
] as const;

const VALID_TIMELINES = [
  "asap",
  "within-1-month",
  "1-3-months",
  "3-6-months",
  "exploring",
] as const;

const INVESTMENT_LABELS: Record<string, string> = {
  "not-sure": "Not sure yet",
  "under-1500": "Under A$1,500",
  "1500-3000": "A$1,500 – A$3,000",
  "3000-5000": "A$3,000 – A$5,000",
  "5000-10000": "A$5,000 – A$10,000",
  "10000-plus": "A$10,000+",
};

const TIMELINE_LABELS: Record<string, string> = {
  asap: "As soon as possible",
  "within-1-month": "Within 1 month",
  "1-3-months": "1–3 months",
  "3-6-months": "3–6 months",
  exploring: "Just exploring",
};

// Basic email pattern — client validation is UX; server validation is security.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function cap(s: string, max: number) {
  return s.slice(0, max);
}

export async function submitContactForm(
  _prev: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  // ── Honeypot check — silent reject ──────────────────────────────────────────
  const hp = formData.get("_hp");
  if (hp && hp.toString().trim().length > 0) {
    // Bot filled the hidden field. Return success to avoid tipping it off.
    return { status: "success" };
  }

  // ── Extract + sanitize ──────────────────────────────────────────────────────
  const name = cap((formData.get("name") ?? "").toString().trim(), 120);
  const email = cap((formData.get("email") ?? "").toString().trim().toLowerCase(), 254);
  const business = cap((formData.get("business") ?? "").toString().trim(), 200);
  const currentWebsite = cap((formData.get("currentWebsite") ?? "").toString().trim(), 500);
  const projectDetails = cap((formData.get("projectDetails") ?? "").toString().trim(), 5000);
  const investmentRaw = (formData.get("investment") ?? "").toString().trim();
  const timelineRaw = (formData.get("timeline") ?? "").toString().trim();
  const source = cap((formData.get("source") ?? "").toString().trim(), 100);

  // Services is a multi-value field — FormData.getAll()
  const servicesRaw = formData.getAll("services").map((s) => s.toString().trim());

  // ── Validation ───────────────────────────────────────────────────────────────
  if (!name) {
    return { status: "error", message: "Please enter your name." };
  }
  if (!email || !EMAIL_RE.test(email)) {
    return { status: "error", message: "Enter a valid email address." };
  }
  if (!projectDetails) {
    return { status: "error", message: "Tell us a little about your project." };
  }

  // Validate services against allowlist
  const services: ServiceId[] = servicesRaw.filter((s): s is ServiceId =>
    (VALID_SERVICES as readonly string[]).includes(s)
  );

  // Validate investment against allowlist (empty = "not provided")
  const investment = (VALID_INVESTMENTS as readonly string[]).includes(investmentRaw)
    ? investmentRaw
    : "";

  // Validate timeline against allowlist
  const timeline = (VALID_TIMELINES as readonly string[]).includes(timelineRaw)
    ? timelineRaw
    : "";

  // Validate URL — must be empty, or start with http/https, or be a bare domain
  let websiteUrl = currentWebsite;
  if (websiteUrl) {
    // Normalise: if no protocol, prepend https:// so URL() can parse it
    const normalised = /^https?:\/\//i.test(websiteUrl)
      ? websiteUrl
      : `https://${websiteUrl}`;
    try {
      const parsed = new URL(normalised);
      // Only http/https allowed — no javascript:, data:, etc.
      if (!["http:", "https:"].includes(parsed.protocol)) {
        websiteUrl = "";
      } else {
        websiteUrl = normalised;
      }
    } catch {
      websiteUrl = ""; // malformed — discard
    }
  }

  // ── Email body assembly ──────────────────────────────────────────────────────
  const serviceLines =
    services.length > 0
      ? services.map((s) => `  • ${SERVICE_LABELS[s]}`).join("\n")
      : "  • Not specified";

  const emailBody = [
    `New project enquiry from the CLOUVENT website.`,
    ``,
    `── Contact ─────────────────────────────────────────`,
    `Name:       ${name}`,
    `Email:      ${email}`,
    business ? `Business:   ${business}` : null,
    websiteUrl ? `Website:    ${websiteUrl}` : null,
    ``,
    `── Services required ────────────────────────────────`,
    serviceLines,
    ``,
    `── Project details ──────────────────────────────────`,
    projectDetails,
    ``,
    investment
      ? `── Approximate investment ──────────────────────────\n${INVESTMENT_LABELS[investment]}`
      : null,
    ``,
    timeline
      ? `── Preferred timeline ───────────────────────────────\n${TIMELINE_LABELS[timeline]}`
      : null,
    ``,
    source ? `── How they found CLOUVENT ──────────────────────────\n${source}` : null,
  ]
    .filter((line) => line !== null)
    .join("\n");

  // ── Send ─────────────────────────────────────────────────────────────────────
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL ?? "clouventsolutions@gmail.com";
  const fromEmail =
    process.env.CONTACT_FROM_EMAIL ?? "CLOUVENT Enquiry <onboarding@resend.dev>";

  if (!apiKey) {
    // Dev mode without credentials — log and pretend success so the
    // form UX can be built and tested locally.
    console.log("──────── CONTACT FORM SUBMISSION (dev mode, no RESEND_API_KEY) ────────");
    console.log(emailBody);
    console.log("────────────────────────────────────────────────────────────────────────");
    return { status: "success" };
  }

  try {
    // Production: send via Resend.
    // To activate: run `npm install resend` and uncomment below.
    // ── Resend block (uncomment after installing resend) ────────────────────
    // const { Resend } = await import("resend");
    // const resend = new Resend(apiKey);
    // const { error } = await resend.emails.send({
    //   from: fromEmail,
    //   to: toEmail,
    //   replyTo: email,
    //   subject: `Project enquiry from ${name}${business ? ` — ${business}` : ""}`,
    //   text: emailBody,
    // });
    // if (error) throw new Error(error.message);
    // ── End Resend block ─────────────────────────────────────────────────────

    // Temporary: if Resend package isn't installed yet, log and succeed.
    console.log("RESEND_API_KEY present but resend package not yet installed.");
    console.log("Run: npm install resend");
    console.log(emailBody);
    void fromEmail; void toEmail; // suppress unused var warnings
    return { status: "success" };
  } catch (err) {
    console.error("Contact form submission error:", err);
    return {
      status: "error",
      message:
        "We couldn't send your enquiry right now. Please try again or email us at clouventsolutions@gmail.com.",
    };
  }
}
