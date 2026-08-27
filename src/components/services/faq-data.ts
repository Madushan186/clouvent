/**
 * FAQ content — server-safe, no "use client" needed.
 * Each item that appears in the "essential" shortlist is marked so the
 * component can surface it (a small marker) without a second copy of
 * the same content living anywhere else.
 *
 * Every claim here is checked against the same rules as the rest of
 * the site: no client counts, no guaranteed results, no invented
 * numbers. Pricing questions deliberately don't hardcode figures —
 * pricing-data.ts is the single source of truth for those, so this
 * file never goes stale if a rate changes.
 */

export type FaqItem = {
  question: string;
  answer: string;
  essential?: boolean;
};

export type FaqCategory = {
  num: string;
  title: string;
  items: FaqItem[];
};

export const faqCategories: FaqCategory[] = [
  {
    num: "01",
    title: "Working together",
    items: [
      {
        question: "Who does Clouvent work with?",
        answer:
          "Clouvent works with photographers and visual or creative businesses that already have real work to show and want a digital presence that matches its quality. Most clients are Australian, ranging from independent photographers to established studios. The common thread isn't business size — it's a business that takes its craft seriously and wants its website to reflect that.",
      },
      {
        question: "Do you only work with photographers?",
        answer:
          "Photography is Clouvent's initial focus, and it shapes how projects are approached — from image-heavy layouts to gallery structure and performance under large photo files. Visual and creative businesses with similar needs are also a good fit. If you're unsure whether your business fits, the best way to find out is to start a conversation.",
      },
      {
        question: "Do you work with clients outside Australia?",
        answer:
          "Australia is Clouvent's priority market, and most current work reflects that focus. International enquiries are considered where the project is a genuine fit, and the same standards apply regardless of location. If you're based outside Australia, mention it in your enquiry and we'll let you know honestly whether it's a good match.",
      },
      {
        question: "What makes Clouvent different from a typical web designer?",
        answer:
          "Most web design ends at launch. Clouvent is built around Build, Manage and Grow — a website is designed and developed properly, then kept current and improving afterward, as an ongoing relationship rather than a one-off handoff. That continuity, not just the design itself, is the core difference.",
        essential: true,
      },
    ],
  },
  {
    num: "02",
    title: "Build",
    items: [
      {
        question: "What does a Clouvent website project include?",
        answer:
          "A Build project covers strategy, design and development — from how the site is structured and how it presents your work, through to a responsive, performance-focused build. Depending on the project, it may also include motion, branding input, foundational SEO and analytics setup. The exact scope is defined in your proposal, based on what your business actually needs.",
        essential: true,
      },
      {
        question: "Can you improve my existing website instead of rebuilding it?",
        answer:
          "Sometimes. If the foundation is sound, targeted improvements to design, performance or structure can be the right call. If the underlying platform is limiting what the site can do, a rebuild is usually the better long-term investment. We'll give you an honest view of which applies once we understand your current setup.",
      },
      {
        question: "What technology do you build with?",
        answer:
          "Next.js is Clouvent's default for custom website projects — it supports strong performance, flexible layouts, and a site that can evolve as your business does. The right technology depends on the project, though, and is chosen based on what the site actually needs to do, rather than applied by default.",
      },
      {
        question: "Can I update the website myself after it launches?",
        answer:
          "Yes. Websites are built so you can make everyday updates — text, images, gallery content — without needing to contact us for every small change. For anything more involved, or if you'd simply rather not manage it yourself, that's what Manage is for. Either way, the choice stays yours.",
      },
    ],
  },
  {
    num: "03",
    title: "Process",
    items: [
      {
        question: "How does a project start?",
        answer:
          "A project starts with an enquiry, followed by a conversation about your business, your current website (if you have one), and what you're trying to achieve. From there, we put together a proposal that outlines scope, timeline and investment, so you know exactly what you're agreeing to before anything begins.",
        essential: true,
      },
      {
        question: "What do you need from me to begin?",
        answer:
          "Mainly clarity on your goals, and access to whatever exists already — an existing website, brand assets, or photography you want featured. You don't need finished copy or a fully resolved brand to start the conversation; part of the discovery process is working out what's needed and when.",
      },
      {
        question: "How long does a typical project take?",
        answer:
          "Timelines vary with scope — a focused website project is a different undertaking to a full strategy-through-development build. Your proposal will include a realistic timeline based on the actual work involved, not a generic estimate, so you can plan around it with confidence.",
      },
      {
        question: "What happens if I'm delayed providing content?",
        answer:
          "Content — photography, copy, brand assets — has the biggest effect on timeline of anything in the process. If you're delayed, we'll work with you to adjust the schedule rather than rush the result. Where useful, we can also advise on how to prepare content efficiently before a project begins.",
      },
    ],
  },
  {
    num: "04",
    title: "Investment & payment",
    items: [
      {
        question: "How is pricing determined?",
        answer:
          "Build projects are scoped individually — pricing reflects the actual work involved, based on your goals, content and functionality. Manage and Grow are structured as ongoing monthly support, starting from a published rate. Your proposal will clearly define what's included and what it costs before any commitment is made.",
        essential: true,
      },
      {
        question: "Is there a deposit?",
        answer:
          "Project agreements typically include a deposit to secure your place and begin work, with the remaining payment structured across the project. Exact terms are confirmed in your proposal and agreement, since they can vary with project size and scope.",
      },
      {
        question: "What happens if the scope changes partway through?",
        answer:
          "It's common for scope to shift once a project is underway — a few more pages, an added feature, a bigger gallery structure than planned. When that happens, we'll let you know how it affects timeline and investment before proceeding, rather than adjusting anything without your agreement.",
      },
    ],
  },
  {
    num: "05",
    title: "After launch / Manage",
    items: [
      {
        question: "What happens after my website launches?",
        answer:
          "Launch is the start of an operating website, not the end of the project. From there, you can manage it yourself, hand it to Clouvent through Manage, or start with light involvement and adjust later. Nothing about launch requires you to commit to ongoing support — it's simply available if you want it.",
        essential: true,
      },
      {
        question: "Do I have to manage the website myself?",
        answer:
          "No. Manage exists specifically so you don't have to become your own website administrator — handling updates, monitoring and technical maintenance so your time stays with your business, not your backend. If you'd rather manage it yourself, the site is built to allow that too.",
        essential: true,
      },
      {
        question: "Can you update my portfolio or galleries after launch?",
        answer:
          "Yes — ongoing content and gallery updates are a core part of Manage. As your portfolio grows or your work evolves, we can keep the site current so it always reflects what you're producing now, not what you had at launch.",
      },
      {
        question: "Do you monitor the website after launch?",
        answer:
          "Under Manage, yes — performance, uptime-related issues, and activity through Google Analytics and Search Console are monitored on an ongoing basis, so problems are generally caught early rather than discovered by chance. Without a Manage arrangement, monitoring isn't automatically included.",
      },
      {
        question: "What happens if something breaks?",
        answer:
          "Under Manage, technical issues are addressed as part of ongoing support. If you're managing the site independently, we're still a reasonable starting point for help — get in touch and we'll advise honestly on what's involved in fixing it.",
      },
      {
        question: "Is ongoing management required, or can I start it later?",
        answer:
          "It's never required. Some clients move straight into Manage after launch; others prefer to run the site themselves for a while first. You can start Manage at launch, add it later, or not at all — it's a genuine choice, not a default upsell.",
      },
    ],
  },
  {
    num: "06",
    title: "Grow",
    items: [
      {
        question: "What does Grow actually involve?",
        answer:
          "Grow covers SEO, conversion-focused improvements, landing pages, content strategy and paid social support where appropriate — all directed by your actual goals and the data available from your site, rather than a standard package applied regardless of fit.",
      },
      {
        question: "Do you guarantee improved rankings or bookings?",
        answer:
          "No — and any studio that guarantees rankings, traffic or bookings isn't being straightforward with you. Search visibility and conversion depend on many factors beyond a website alone. What Grow offers is a considered, ongoing approach based on real data, not a promised outcome.",
        essential: true,
      },
      {
        question: "When is a business ready for Grow?",
        answer:
          "Generally once the site is live and generating enough activity to act on — real traffic, real enquiries, real analytics to inform decisions. Starting Grow too early, before there's data to work from, usually means guessing rather than improving.",
      },
      {
        question: "Do I need Grow if I only want a website built?",
        answer:
          "No. Build stands on its own, and plenty of clients stop there. Grow is available if and when you want to actively invest in improving the site's performance over time — it's an option, not a requirement attached to every project.",
      },
    ],
  },
  {
    num: "07",
    title: "Ownership, hosting & technology",
    items: [
      {
        question: "Who owns the website once it's built?",
        answer:
          "You do. The finished website belongs to your business — Clouvent isn't a platform you're locked into, and ownership and control sit with you, in line with the terms confirmed in your project agreement.",
        essential: true,
      },
      {
        question: "Where is my website hosted, and can I move it later?",
        answer:
          "Hosting is set up as part of the Build process, typically through modern, performance-focused infrastructure. Where technically feasible, sites can be migrated elsewhere later — exact terms depend on your project agreement, so it's worth asking directly if this matters to you.",
      },
      {
        question: "Who owns my photography and content?",
        answer:
          "You do, always. Clouvent only uses photography and content you've given permission to use, for the purposes of your own website. Nothing is reused, resold or treated as Clouvent's own without your explicit agreement.",
      },
    ],
  },
  {
    num: "08",
    title: "SEO, performance & technical quality",
    items: [
      {
        question: "Will my website be fast, even with a lot of photography?",
        answer:
          "Performance is treated as a first-class requirement, not an afterthought — particularly important for image-heavy photography sites. That means responsive images, modern formats, considered loading order and technical decisions made with speed in mind from the start, not patched in after launch.",
        essential: true,
      },
      {
        question: "Is SEO included, and do you guarantee rankings?",
        answer:
          "Every Build includes foundational SEO — clean structure, semantic markup, metadata and technical basics that give a site a fair starting point. No one can honestly guarantee rankings; search visibility depends on many factors beyond the website itself, and ongoing SEO work sits under Grow.",
      },
      {
        question: "Will the site work well on mobile, and is accessibility considered?",
        answer:
          "Yes to both. Mobile is treated as a first-class experience rather than a scaled-down version of desktop, and accessibility — semantic structure, keyboard access, appropriate contrast — is built in from the start rather than reviewed at the end.",
      },
    ],
  },
  {
    num: "09",
    title: "Content & photography",
    items: [
      {
        question: "Do I need all my photography ready before we start?",
        answer:
          "Not entirely, but having a strong sense of the work you want featured makes the design process more accurate from the outset. We'll advise on what's needed and when as part of discovery, rather than expecting a finished library upfront.",
      },
      {
        question: "Do you provide website copywriting?",
        answer:
          "It depends on the project — some clients arrive with copy ready, others want guidance. Where copywriting is included, it's scoped in your proposal; where it isn't, we can still advise on structure and messaging as part of the design process.",
      },
    ],
  },
  {
    num: "10",
    title: "Getting started",
    items: [
      {
        question: "How do I start a project?",
        answer:
          "Start with an enquiry outlining your business, your current website if you have one, and what you're hoping to achieve. From there, we'll arrange a conversation to understand the project properly before anything is proposed.",
      },
      {
        question: "What if I'm not sure whether I need Build, Manage or Grow?",
        answer:
          "That's a normal starting point, not a problem to solve before reaching out. Describe where your business is now and what's frustrating you about your current site — we'll help work out where Build, Manage or Grow actually fits.",
        essential: true,
      },
      {
        question: "What happens after I submit an enquiry?",
        answer:
          "We review it and follow up to arrange a conversation about your project. From there, you'll receive a clear proposal before anything is agreed — no pressure, no obligation, just a straightforward next step.",
      },
    ],
  },
];
