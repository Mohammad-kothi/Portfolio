import type { Portfolio } from "./types";

/* ──────────────────────────────────────────────────────────────────────────────
 *  ALL SITE CONTENT LIVES HERE.
 *
 *  DRAFT marks copy written for you from your old portfolio and your GitHub READMEs;
 *  rewrite it in your own words whenever you like.
 *  Set `placeholder: true` on anything that isn't real yet: it gets a dashed tag on the page in
 *  `npm run dev` (never in production).
 * ────────────────────────────────────────────────────────────────────────────── */

export const portfolio: Portfolio = {
  meta: {
    title: "Mohammad Kothi — CS student & web developer",
    description:
      "Portfolio of Mohammad Kothi, a first-year computer science student at Newton School of Technology building websites for real businesses, AI tools that run in the browser, and software for industrial companies.",
    // On Vercel this picks up the production domain automatically.
    siteUrl: process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000",
  },

  person: {
    firstName: "Mohammad",
    lastName: "Kothi",
    initials: "MK",
    role: "CS student · Web developer",
    statement:
      "First-year computer science student at Newton School of Technology. I build websites for real businesses and AI tools that run in the browser, and I'm designing software that runs an industrial company from a single laptop.",
    location: "Gujarat, India",
    timeZone: "Asia/Kolkata",
    timeZoneLabel: "IST",
    availability: { open: true, label: "Available for projects & collaboration" },
    portrait: {
      src: "/images/portrait.jpg",
      alt: "Portrait of Mohammad Kothi",
    },
    email: {
      label: "Email",
      href: "mailto:mohammadkothi012@gmail.com",
      handle: "mohammadkothi012@gmail.com",
    },
  },

  socials: [
    {
      label: "GitHub",
      handle: "@Mohammad-kothi",
      href: "https://github.com/Mohammad-kothi",
    },
    // Add LinkedIn here once you have the profile URL:
    // { label: "LinkedIn", handle: "in/…", href: "https://www.linkedin.com/in/…" },
  ],

  // Section names, menu labels and the giant headings. The contact heading's second line is outlined.
  sections: {
    about: { nav: "About", label: "About", title: ["Background", "& philosophy"] },
    skills: {
      nav: "Skills",
      label: "Toolkit",
      title: ["Skills", "& tools"],
      intro: "Grouped by how confident I am today, not by how good they look on a list.",
    },
    work: {
      nav: "Work",
      label: "Selected work",
      title: ["Selected", "projects"],
      intro: "Live AI tools, client sites, a paid bounty, an ambitious concept and the coursework underneath it all.",
    },
    experience: {
      nav: "Journey",
      label: "Journey",
      title: ["Education", "& experience"],
      intro: "From board exams and JEE to my first paid work and first year of computer science.",
    },
    // The second line of the case-study heading is outlined.
    caseStudy: { nav: "Case study", label: "Case study", title: ["Kothi", "Steel"] },
    contact: { nav: "Contact", label: "Contact", title: ["Let's work", "together"] },
  },

  marquee: ["Web development", "AI tools", "Python", "Systems design", "Algorithms", "TypeScript", "Linux", "Quant research"],

  about: {
    // DRAFT: the big opening sentence of the About section.
    lead: {
      strong: "I like building things real people use.",
      soft: "Websites for local businesses, AI tools that run in a browser, and a growing pile of Python along the way.",
    },
    // DRAFT
    paragraphs: [
      "I'm 18 and in my first year of a B.Tech in Computer Science at Newton School of Technology. Before that I finished Class XII at Hanifa School with 89.2% (94% in PCM) and qualified JEE Advanced 2026.",
      "Most of what I build starts from a real need: a steel company that wants its catalogue online, a roofing business that needs a site, an owner who wants the whole company on one screen. I also build to understand: a tokenizer from scratch to see how language models read text, and a playground to watch what they do with tools.",
    ],
    facts: [
      { label: "Studying", value: "Newton School of Technology" },
      { label: "Program", value: "B.Tech, Computer Science" },
      { label: "Year", value: "First year, 2026 —" },
      { label: "Focus", value: "Web, systems, algorithms" },
    ],
    // DRAFT
    principles: [
      {
        title: "Build for someone",
        body: "Every project has a real user behind it, even a small one. It keeps the work honest and finished.",
      },
      {
        title: "Ship, then sharpen",
        body: "A working first version teaches more than a perfect plan. I iterate from there.",
      },
      {
        title: "Own your data",
        body: "Business tools should keep company data on the company's own machines, not someone else's.",
      },
    ],
    stats: [
      { value: 94, suffix: "+", label: "JEE Main percentile", note: "2026" },
      { value: 29099, label: "JEE Advanced AIR", note: "2026 · Qualified" },
      { value: 94, suffix: "%", label: "PCM, Class XII", note: "CBSE" },
      { value: 6, prefix: "0", label: "Projects", note: "2 live" },
    ],
  },

  skills: {
    groups: [
      {
        title: "Comfortable",
        caption: "Use these every week",
        level: 3,
        items: [
          { name: "Python", note: "Problem solving, coursework" },
          { name: "Git", note: "Commits, branches, push & pull" },
          { name: "GitHub", note: "Repositories, collaboration" },
        ],
      },
      {
        title: "Building with",
        caption: "Shipping real projects",
        level: 2,
        items: [
          { name: "HTML & CSS", note: "Business & showcase sites" },
          { name: "TypeScript", note: "Website templates" },
          { name: "Web design", note: "Layouts for real clients" },
        ],
      },
      {
        title: "Learning",
        caption: "Working on it now",
        level: 1,
        items: [
          { name: "DSA", note: "Competitive programming" },
          { name: "Linux CLI", note: "Systems & AI Essentials" },
          { name: "Quant research", note: "Alphas on WorldQuant BRAIN" },
        ],
      },
    ],
    tools: ["VS Code", "Git", "GitHub", "Python", "JavaScript", "TypeScript", "HTML", "CSS", "Linux", "Vercel", "Groq API", "WorldQuant BRAIN", "Whop"],
  },

  projects: [
    {
      id: "tokenizer-lab",
      title: "Tokenizer Lab",
      category: "AI · Web app",
      year: "2026",
      status: "Live",
      summary:
        "A Byte-Pair-Encoding tokenizer (the kind GPT and LLaMA use) written from scratch in plain Python, with a web app to build a vocabulary, tokenise text, explore token embeddings in 3D and teach it new words.",
      outcome: "Runs in any browser: a JavaScript port produces exactly the same tokens as the Python version.",
      stack: ["Python", "JavaScript", "Plotly", "Vercel"],
      image: {
        src: "/images/projects/tokenizer.jpg",
        alt: "Tokenizer Lab: a sentence split into colour-coded BPE tokens next to the vocabulary builder",
      },
      links: { live: "https://llm-tokenizer-eight.vercel.app", code: "https://github.com/Mohammad-kothi/llm-tokenizer" },
    },
    {
      id: "suiii-playground",
      title: "Suiii Playground",
      category: "AI · Web app",
      year: "2026",
      status: "Live",
      summary:
        "An AI playground on GroqCloud with chat, model comparison and a prompt analyzer. A live activity panel shows what the model is doing (web search on a globe, code running, function calls) next to a token-speed meter.",
      outcome: "Deployed on Vercel with serverless functions; the API key stays on the server and a demo mode lets anyone try it.",
      stack: ["JavaScript", "Python", "Groq API", "Vercel"],
      image: {
        src: "/images/projects/suiii.jpg",
        alt: "Suiii Playground chat screen with run settings and the functions activity panel",
      },
      links: { live: "https://suiii-playground.vercel.app", code: "https://github.com/Mohammad-kothi/suiii-playground" },
    },
    {
      id: "kothi-steel",
      title: "Kothi Steel Ltd",
      category: "Client website",
      year: "2026",
      status: "In progress",
      summary:
        "A product showcase site for a steel company in Godhra, Gujarat. Buyers browse the full product range online; orders go straight to the company.",
      outcome: "Puts the whole product range in one place buyers can browse before they call.",
      stack: ["HTML", "CSS", "Web design"],
      // Mockup until the site launches; swap in a screenshot and add links: { live: "https://…" } then.
      image: { src: "/images/projects/kothi-steel.svg", alt: "Mockup of the Kothi Steel Ltd website" },
      links: {},
    },
    {
      id: "ridgeline",
      title: "Ridgeline Roofing",
      category: "Website template · Paid bounty",
      year: "2026",
      status: "In progress",
      summary: "A website template for a US roofing company, built to the requirements of a paid bounty on Whop Workforce.",
      outcome: "Built to a paying client brief, start to finish.",
      stack: ["TypeScript", "Whop Websites"],
      image: { src: "/images/projects/ridgeline.svg", alt: "Mockup of the Ridgeline Roofing website" },
      links: { code: "https://github.com/mdahadkhan8886-create/ridgeline-roofing" },
    },
    {
      id: "business-os",
      title: "Business OS",
      category: "Systems concept",
      year: "2026",
      status: "Concept",
      summary:
        "An operating system for industrial businesses, built on Linux: an AI assistant for alerts and daily stats, bill checks against market rates, labour attendance, and vehicle and fuel tracking.",
      outcome: "The whole company on the owner's laptop, with company data kept on its own machines.",
      stack: ["Linux", "AI", "Systems design"],
      image: { src: "/images/projects/business-os.svg", alt: "Concept mockup of the Business OS dashboard" },
      links: {},
    },
    {
      id: "lab-work",
      title: "College lab work",
      category: "Coursework",
      year: "2026",
      status: "Practice",
      summary: "Python workshop exercises and Git & GitHub practice repositories from my first semester.",
      outcome: "The foundations: problem solving in Python and a proper Git workflow.",
      stack: ["Python", "Git", "GitHub"],
      image: { src: "/images/projects/lab-work.svg", alt: "Illustration of a Python exercise and a Git log" },
      links: { code: "https://github.com/Mohammad-kothi/nst-practice" },
    },
  ],

  timeline: [
    {
      period: "2026 — Now",
      title: "B.Tech, Computer Science",
      org: "Newton School of Technology",
      kind: "Education",
      current: true,
      detail:
        "First year. Python workshops, Git & GitHub, and the Systems & AI Essentials course, with a focus on practical software development and DSA.",
    },
    {
      period: "2026",
      title: "Independent web work",
      org: "Kothi Steel Ltd · Whop Workforce",
      kind: "Work",
      detail:
        "Building a product showcase site for a steel company in Godhra and a roofing website template for a paid bounty, alongside two live AI web apps of my own.",
    },
    {
      period: "2026",
      title: "JEE Main & JEE Advanced",
      org: "National engineering entrance exams",
      kind: "Exam",
      detail: "Qualified JEE Advanced after scoring in the 94+ percentile in JEE Main.",
      highlights: ["JEE Main · 94+ percentile", "JEE Advanced · AIR 29,099"],
    },
    {
      period: "2026",
      title: "Class XII, CBSE · Science",
      org: "Hanifa School",
      kind: "Education",
      detail: "Senior secondary in the science stream.",
      highlights: ["89.2% overall", "94% in PCM"],
    },
    {
      period: "2024",
      title: "Class X, GSEB",
      org: "Gujarat Secondary Education Board",
      kind: "Education",
      detail: "Secondary school, strongest in the quantitative subjects.",
      highlights: ["80% overall", "95 in Maths", "93 in Science"],
    },
  ],

  // DRAFT: written from the one-line project description. Add the real story and numbers once the site is live.
  caseStudy: {
    eyebrow: "Flagship project · Client work",
    intro:
      "Turning a steel company's product range into a website buyers can actually browse — without turning the company into an online shop.",
    meta: [
      { label: "Client", value: "Kothi Steel Ltd" },
      { label: "Location", value: "Godhra, Gujarat" },
      { label: "Role", value: "Design & build" },
      { label: "Year", value: "2026" },
      { label: "Status", value: "In progress" },
      { label: "Stack", value: "HTML · CSS" },
    ],
    heroImage: { src: "/images/projects/kothi-steel.svg", alt: "Mockup of the Kothi Steel Ltd website, desktop catalogue view" },
    detailImage: { src: "/images/projects/kothi-steel-mobile.svg", alt: "Mockup of the Kothi Steel Ltd website, mobile product page" },
    chapters: [
      {
        label: "Challenge",
        title: "A full range, nowhere to see it",
        body: "Buyers needed one place to see everything the company makes before getting in touch. The company wanted to keep handling orders directly, not run a web shop.",
      },
      {
        label: "Approach",
        title: "Catalogue first, contact always close",
        body: "The site is built around the product range, with every page a step away from talking to the company.",
        points: [
          "Products grouped the way buyers search for them",
          "Clear specs on every product page",
          "Enquiries go straight to the company, no checkout",
          "Fast, plain HTML & CSS that works on any phone",
        ],
      },
      {
        label: "Outcome",
        title: "In progress",
        body: "The site is being built now. Launch date and the first enquiries will be added here once it's live."
      },
    ],
    cta: { label: "Live site coming soon" }, // add href when live
  },

  contact: {
    blurb:
      "Got a business that needs a website, a project to collaborate on, or just want to talk code? Drop me a line.",
  },

  footer: {
    year: 2026,
    note: "Designed & built by Mohammad Kothi with Next.js, Tailwind CSS & Framer Motion.",
  },
};
