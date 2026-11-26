import { DrawLine } from "@/components/motion/DrawLine";
import { MaskText } from "@/components/motion/MaskText";
import { ProjectMedia } from "@/components/motion/ProjectMedia";
import { Reveal } from "@/components/motion/Reveal";
import { ArrowUpRight, PlaceholderTag } from "@/components/ui/primitives";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { Project, ProjectStatus, SectionCopy } from "@/content/types";

const statusStyle: Record<ProjectStatus, string> = {
  Live: "border-accent bg-accent text-ink",
  "In progress": "border-accent text-accent",
  Concept: "border-line-strong text-paper",
  Practice: "border-line-strong text-muted",
};

function ProjectLink({ href, label }: { href?: string; label: string }) {
  if (!href) {
    return (
      <span className="meta inline-flex items-center gap-2 text-muted">
        {label} <span className="normal-case tracking-normal">— coming soon</span>
      </span>
    );
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="meta group/link inline-flex items-center gap-2 text-paper hover:text-accent"
    >
      <span className="link-underline pb-0.5">{label}</span>
      <ArrowUpRight className="size-3 transition-transform duration-300 ease-expo group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
    </a>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const flipped = index % 2 === 1;
  const number = String(index + 1).padStart(2, "0");

  const primary = project.links.live ?? project.links.code;
  const lift = "transition-transform duration-500 ease-expo group-hover:-translate-y-1";

  return (
    <article data-build={`work.${project.id}`} className="group relative grid grid-cols-12 gap-x-5 gap-y-7 py-10 md:py-14">
      <DrawLine className="absolute inset-x-0 top-0 bg-line" duration={1.3} />

      {/* Image */}
      <div className={`relative col-span-12 lg:col-span-7 ${flipped ? "lg:order-2 lg:col-start-6" : ""}`}>
        <ProjectMedia
          src={project.image.src}
          alt={project.image.alt}
          href={primary}
          linkLabel={primary ? `Open ${project.title} (${project.links.live ? "live site" : "GitHub"})` : undefined}
        >
          <span className={`meta absolute bottom-3 left-3 z-30 bg-ink/80 px-2 py-1 text-paper backdrop-blur-sm ${lift}`}>
            P/{number}
          </span>
          <PlaceholderTag show={project.image.placeholder} className="absolute right-3 top-3 z-30" />
        </ProjectMedia>
      </div>

      {/* Text: metadata and title lift slightly on hover */}
      <div className={`col-span-12 flex flex-col lg:col-span-5 ${flipped ? "lg:order-1 lg:col-start-1" : ""}`}>
        <Reveal y={10} className={`meta flex flex-wrap items-center gap-x-4 gap-y-2 text-muted ${lift}`}>
          <span className="text-accent">{number}</span>
          <span>{project.category}</span>
          <span aria-hidden className="h-px w-4 origin-left bg-line-strong transition-transform duration-500 ease-expo group-hover:scale-x-150 group-hover:bg-accent" />
          <span>{project.year}</span>
          <span className={`border px-2 py-0.5 ${statusStyle[project.status]}`}>{project.status}</span>
        </Reveal>

        <h3 data-scramble className={`mt-6 font-display text-[clamp(2.75rem,6vw,5.5rem)] uppercase leading-[0.88] transition-colors duration-500 group-hover:text-accent`}>
          <MaskText lines={[project.title]} delay={0.1} stagger={0.06} />
        </h3>

        <Reveal as="p" delay={0.2} className="mt-6 max-w-[48ch] text-base leading-relaxed text-muted">
          {project.summary}
        </Reveal>

        <Reveal delay={0.28} className="relative mt-6 flex gap-3 pl-4 text-sm leading-relaxed text-paper">
          <DrawLine axis="y" className="absolute inset-y-0 left-0 w-0.5 bg-accent" delay={0.35} duration={0.8} />
          <span className="meta shrink-0 pt-0.5 text-accent">Outcome</span>
          <span>{project.outcome}</span>
        </Reveal>

        <ul aria-label="Stack" className="mt-8 flex flex-wrap gap-2">
          {project.stack.map((s, i) => (
            <Reveal as="li" key={s} y={8} delay={0.35 + i * 0.05} className="meta border border-line px-2 py-1 text-muted transition-colors duration-300 group-hover:border-line-strong">
              {s}
            </Reveal>
          ))}
        </ul>

        <div className="relative mt-auto flex flex-wrap gap-x-8 gap-y-3 pt-5 lg:mt-10">
          <DrawLine className="absolute inset-x-0 top-0 bg-line" delay={0.4} />
          <ProjectLink href={project.links.live} label="Live site" />
          <ProjectLink href={project.links.code} label="GitHub" />
        </div>
      </div>
    </article>
  );
}

export function Projects({ projects, copy, index }: { projects: Project[]; copy: SectionCopy; index: string }) {
  return (
    <section id="work" aria-labelledby="work-title" className="relative py-24 md:py-36">
      <div className="shell">
        <SectionHeader
          id="work-title"
          build="work"
          index={index}
          label={copy.label}
          title={copy.title}
          aside={
            <p className="max-w-[40ch] text-base leading-relaxed text-muted">
              {copy.intro}{" "}
              <span className="text-paper">{String(projects.length).padStart(2, "0")} projects.</span>
            </p>
          }
        />
        <div className="mt-16 md:mt-24">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
