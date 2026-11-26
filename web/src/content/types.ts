// Shapes for the content in `portfolio.ts`. You normally don't need to edit this file.

/** Set `placeholder: true` on anything that isn't real yet. In `npm run dev` it gets a dashed
 *  "Placeholder" tag on the page so you can spot it; the tag never shows in production. */
export type Placeholder = { placeholder?: boolean };

export type ImageAsset = Placeholder & {
  /** Path inside /public, e.g. "/images/portrait.jpg". JPG/PNG/WebP are optimised automatically. */
  src: string;
  alt: string;
};

export type LinkItem = Placeholder & {
  label: string;
  href: string;
  /** Short text shown next to the label, e.g. a username. */
  handle?: string;
};

export type Stat = {
  value: number;
  /** Text before / after the number, e.g. "+" or "%". */
  prefix?: string;
  suffix?: string;
  label: string;
  note?: string;
};

export type SkillGroup = {
  title: string;
  caption: string;
  /** How confident you are with this group, 1–3. Drawn as a small bar. */
  level: 1 | 2 | 3;
  items: { name: string; note: string }[];
};

export type ProjectStatus = "Live" | "In progress" | "Concept" | "Practice";

export type Project = Placeholder & {
  id: string;
  title: string;
  category: string;
  year: string;
  status: ProjectStatus;
  summary: string;
  /** One line on what it achieved or is for. */
  outcome: string;
  stack: string[];
  image: ImageAsset;
  /** Leave a link out and the card shows "Coming soon" instead of a broken link. */
  links: { live?: string; code?: string };
};

export type TimelineEntry = Placeholder & {
  period: string;
  title: string;
  org: string;
  kind: "Education" | "Work" | "Exam";
  current?: boolean;
  detail: string;
  highlights?: string[];
};

export type CaseStudy = Placeholder & {
  eyebrow: string;
  intro: string;
  meta: { label: string; value: string }[];
  heroImage: ImageAsset;
  detailImage: ImageAsset;
  chapters: { label: string; title: string; body: string; points?: string[] }[];
  cta?: { label: string; href?: string };
};

/** Copy for one section: its menu name, small label, giant heading lines and optional intro. */
export type SectionCopy = { nav: string; label: string; title: string[]; intro?: string };

export type Portfolio = {
  meta: { title: string; description: string; siteUrl: string };
  person: {
    firstName: string;
    lastName: string;
    initials: string;
    role: string;
    statement: string;
    location: string;
    locationPlaceholder?: boolean;
    /** IANA time zone for the live clock, e.g. "Asia/Kolkata". */
    timeZone: string;
    timeZoneLabel: string;
    availability: { open: boolean; label: string };
    portrait: ImageAsset;
    email: LinkItem;
  };
  socials: LinkItem[];
  marquee: string[];
  about: {
    lead: { strong: string; soft: string };
    paragraphs: string[];
    facts: { label: string; value: string }[];
    principles: { title: string; body: string }[];
    stats: Stat[];
  };
  sections: Record<"about" | "skills" | "work" | "experience" | "caseStudy" | "contact", SectionCopy>;
  skills: { groups: SkillGroup[]; tools: string[] };
  projects: Project[];
  timeline: TimelineEntry[];
  caseStudy: CaseStudy;
  contact: { blurb: string };
  footer: { year: number; note: string };
};
