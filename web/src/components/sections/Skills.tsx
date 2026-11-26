import { DrawLine } from "@/components/motion/DrawLine";
import { LevelBar } from "@/components/motion/LevelBar";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { Portfolio, SectionCopy } from "@/content/types";

export function Skills({ skills, copy, index }: { skills: Portfolio["skills"]; copy: SectionCopy; index: string }) {
  return (
    <section id="skills" aria-labelledby="skills-title" className="relative bg-ink-2 py-24 md:py-36">
      <div className="shell">
        <SectionHeader
          id="skills-title"
          build="skills"
          index={index}
          label={copy.label}
          title={copy.title}
          aside={copy.intro && <p className="max-w-[40ch] text-base leading-relaxed text-muted">{copy.intro}</p>}
        />

        <div className="relative mt-16 grid md:mt-24 md:grid-cols-3">
          <DrawLine className="absolute inset-x-0 top-0 bg-line" />
          {skills.groups.map((group, gi) => (
            <div key={group.title} className="relative border-b border-line py-8 md:border-b-0 md:px-6 md:first:pl-0 lg:px-8">
              {/* Column divider draws downward */}
              {gi > 0 && <DrawLine axis="y" className="absolute inset-y-0 left-0 hidden bg-line md:block" delay={0.15 * gi} />}

              <div data-build={`skills.group-${gi + 1}`}>
                <div className="flex items-baseline justify-between gap-4">
                  <h3 data-scramble className="font-display text-4xl uppercase leading-none md:text-5xl">{group.title}</h3>
                  <span className="meta text-accent">T/{String(gi + 1).padStart(2, "0")}</span>
                </div>
                <p data-scramble className="meta mt-3 text-muted">{group.caption}</p>
                <div className="mt-6">
                  <LevelBar level={group.level} label={`${group.title}: confidence ${group.level} of 3`} />
                </div>
              </div>

              <ul className="mt-8 border-t border-line">
                {group.items.map((item) => (
                  <li
                    key={item.name}
                    data-build={`skills.${item.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                    className="group relative flex items-baseline justify-between gap-4 border-b border-line py-4 transition-colors duration-300 hover:border-line-strong"
                  >
                    <span
                      aria-hidden
                      className="absolute left-0 top-1/2 h-px w-3 origin-left scale-x-0 bg-accent transition-transform duration-500 ease-expo group-hover:scale-x-100"
                    />
                    <span className="text-lg font-medium text-paper transition-transform duration-500 ease-expo group-hover:translate-x-5">
                      {item.name}
                    </span>
                    <span className="text-right text-xs text-muted transition-colors duration-300 group-hover:text-paper">
                      {item.note}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-4 md:flex-row md:items-center md:gap-8">
          <p data-build="skills.tools-label" data-scramble className="meta w-fit shrink-0 text-muted">
            Tools I reach for
          </p>
          <ul data-build="skills.tools" className="flex w-fit flex-wrap gap-2">
            {skills.tools.map((tool) => (
              <li
                key={tool}
                className="meta border border-line px-3 py-1.5 text-paper transition-colors duration-300 hover:border-accent hover:text-accent"
              >
                {tool}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
