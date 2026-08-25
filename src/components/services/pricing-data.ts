/**
 * Pricing data — server-safe, no "use client" needed.
 * All prices are explicitly configured AUD + USD values.
 * No exchange-rate API. Predictable, offline, dependency-free.
 *
 * CTA hrefs route to /contact with a ?service= query param so the
 * enquiry form can pre-select the relevant service context.
 * The contact page is currently a placeholder — the param is future-safe.
 */

export type Currency = "AUD" | "USD";

export type ServiceItem = {
  id: "build" | "manage" | "grow";
  number: "01" | "02" | "03";
  name: string;
  descriptor: string;
  description: string;
  pricing: {
    AUD: { display: string; billing: string };
    USD: { display: string; billing: string };
  };
  services: string[];
  cta: { label: string; href: string };
  footNote?: string;
};

export const pricingData: ServiceItem[] = [
  {
    id: "build",
    number: "01",
    name: "Build",
    descriptor: "Design + development",
    description:
      "Distinctive websites built around your brand and the way your business actually works — not templates.",
    pricing: {
      AUD: { display: "From A$1,490", billing: "One-time project" },
      USD: { display: "From US$990", billing: "One-time project" },
    },
    services: [
      "Web Design",
      "Web Development",
      "Responsive Architecture",
      "Performance Engineering",
      "Technical SEO Foundations",
      "Analytics Setup",
      "Google Search Console Setup",
      "Launch & Deployment",
    ],
    cta: { label: "Start a Project", href: "/contact?service=build" },
    footNote:
      "Final pricing depends on project scope, content, functionality and integrations.",
  },
  {
    id: "manage",
    number: "02",
    name: "Manage",
    descriptor: "Maintenance + infrastructure",
    description:
      "Reliable ongoing management that keeps your digital presence secure, current and performing after launch.",
    pricing: {
      AUD: { display: "From A$149", billing: "Per month" },
      USD: { display: "From US$99", billing: "Per month" },
    },
    services: [
      "Website Maintenance",
      "Content Updates",
      "Performance Monitoring",
      "Analytics Monitoring",
      "Google Search Console",
      "Technical Checks",
      "Deployment Support",
    ],
    cta: { label: "Discuss Management", href: "/contact?service=manage" },
  },
  {
    id: "grow",
    number: "03",
    name: "Grow",
    descriptor: "Visibility + optimisation",
    description:
      "Ongoing search, measurement and optimisation designed to help your digital presence create greater business value.",
    pricing: {
      AUD: { display: "From A$349", billing: "Per month" },
      USD: { display: "From US$229", billing: "Per month" },
    },
    services: [
      "SEO",
      "Conversion Optimisation",
      "Content Strategy",
      "Analytics Insights",
      "Search Visibility Monitoring",
      "Paid Social Management",
    ],
    cta: { label: "Explore Growth", href: "/contact?service=grow" },
    footNote: "Advertising spend is billed separately.",
  },
];
