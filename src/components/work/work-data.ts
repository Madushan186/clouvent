/**
 * Case study data — server-safe, no "use client" needed. Separated from
 * presentation (case-study.tsx) so a second project can be added later
 * as a new entry in `caseStudies`, reusing the same component with no
 * structural rework.
 *
 * Every field traces to PROJECT_BRIEF.md §10's verified-facts list.
 * Nothing here is invented — no metrics, no results, no client count.
 */

export type CaseStudy = {
  id: string;
  name: string;
  location: string;
  summary: string;
  tags: string[];
  featuredImage: { src: string; alt: string };
  externalUrl: string;
  story: string[];
  beforeAfter?: {
    beforeSrc: string;
    beforeAlt: string;
    afterSrc: string;
    afterAlt: string;
  };
  delivered: string[];
  builtWith: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    id: "once-upon-a-time",
    name: "Once Upon a Time Photography",
    location: "Pakenham, Victoria, Australia",
    summary: "Digital presence redesign & ongoing support",
    tags: ["Design", "Development", "Maintenance", "Analytics", "Paid Social"],
    featuredImage: {
      src: "/projects/once-upon-a-time/after-clouvent.png",
      alt: "Once Upon a Time Photography's redesigned homepage — a full-bleed newborn portrait in a woven basket, a minimal navigation bar, and the headline “Artful, honest photography for your family.”",
    },
    externalUrl: "https://www.onceuponatimesphotography.com.au/",
    story: [
      "Once Upon a Time Photography needed a digital presence that gave the photography more room to lead. The previous site ran on WordPress and no longer reflected the quality of the work behind it.",
      "The website was rebuilt from scratch using React and TypeScript — design and development handled directly, with a visual system and responsive experience built around the photography itself rather than a template.",
      "The relationship continues beyond launch: ongoing maintenance, monitoring through Google Analytics and Search Console, and paid Facebook and Instagram marketing support.",
    ],
    beforeAfter: {
      beforeSrc: "/projects/once-upon-a-time/before-wordpress.png",
      beforeAlt:
        "Once Upon a Time Photography's previous WordPress website — a template layout with a purple navigation bar, sidebar widgets, and a stock-style photography banner.",
      afterSrc: "/projects/once-upon-a-time/after-clouvent.png",
      afterAlt:
        "Once Upon a Time Photography's Clouvent-redesigned website — a full-bleed newborn portrait with a minimal navigation bar.",
    },
    delivered: [
      "Strategy & Web Design",
      "React + TypeScript Development",
      "Responsive Implementation",
      "Website Maintenance",
      "Analytics Monitoring",
      "Google Search Console",
      "Facebook & Instagram Marketing",
    ],
    builtWith: ["React", "TypeScript"],
  },
];
