import { CountUp } from "@/components/motion/CountUp";
import { DrawLine } from "@/components/motion/DrawLine";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { Portfolio, SectionCopy } from "@/content/types";

export function About({ about, copy, index }: { about: Portfolio["about"]; copy: SectionCopy; index: string }) {
  return (
    <section id="about" aria-labelledby="about-title" className="relative py-24 md:py-36">
      <div className="shell">
        <SectionHeader id="about-title" build="about" index={index} label={copy.label} title={copy.title} />

        <div className="mt-16 grid grid-cols-12 gap-x-5 gap-y-14 md:mt-24">
          <Reveal className="col-span-12 md:col-span-9 md:col-start-4">
            <p data-build="about.lead" className="text-balance text-[clamp(1.75rem,3.6vw,3.25rem)] font-medium leading-[1.12] tracking-[-0.02em]">
              {about.lead.strong} <span className="text-muted">{about.lead.soft}</span>
            </p>
          </Reveal>

          {/* Quick facts */}
          <Reveal className="col-span-12 md:col-span-3" delay={0.05}>
            <dl data-build="about.facts" className="border-t border-line">
              {about.facts.map((fact) => (
                <div key={fact.label} className="flex justify-between gap-4 border-b border-line py-3 md:flex-col md:gap-1">
                  <dt className="meta text-muted">{fact.label}</dt>
                  <dd className="text-right text-sm text-paper md:text-left">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <div className="col-span-12 grid gap-6 md:col-span-9 md:grid-cols-2 md:gap-x-5">
            {about.paragraphs.map((p, i) => (
              <p key={i} data-build={`about.text-${i + 1}`} className="max-w-[52ch] text-base leading-relaxed text-muted md:text-[1.0625rem]">
                {p}
              </p>
            ))}
          </div>

          {/* Principles */}
          <div className="col-span-12 md:col-span-9 md:col-start-4">
            <p data-build="about.principles-label" data-scramble className="meta mb-6 w-fit text-muted">
              How I work
            </p>
            <DrawLine className="bg-line" />
            <ol className="grid md:grid-cols-3">
              {about.principles.map((principle, i) => (
                <li
                  key={principle.title}
                  data-build={`about.principle-${i + 1}`}
                  className="group border-b border-line py-6 md:border-b-0 md:border-l md:px-6 md:py-8 md:first:border-l-0 md:first:pl-0"
                >
                  <span className="meta text-accent">{String(i + 1).padStart(2, "0")}</span>
                  <h3 data-scramble className="mt-4 font-display text-3xl uppercase leading-none tracking-wide transition-colors duration-300 group-hover:text-accent">
                    {principle.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{principle.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Numbers */}
        <DrawLine className="mt-24 bg-line md:mt-32" duration={1.4} />
        <dl className="grid grid-cols-2 lg:grid-cols-4">
          {about.stats.map((stat, i) => (
            <div
              key={stat.label}
              data-build={`about.stat-${i + 1}`}
              className={`flex flex-col justify-between gap-6 py-7 pr-4 md:py-10 ${
                i % 2 === 1 ? "border-l border-line pl-4 md:pl-6" : ""
              } ${i >= 2 ? "border-t border-line lg:border-t-0" : ""} ${i === 2 ? "lg:border-l lg:pl-6" : ""}`}
            >
              <dt data-scramble className="meta flex items-start justify-between gap-2 text-muted">
                {stat.label}
                {stat.note && <span className="hidden text-muted/70 sm:inline">{stat.note}</span>}
              </dt>
              <dd data-count={stat.value} className="font-display text-[clamp(3rem,7vw,6.5rem)] leading-[0.85]">
                <CountUp value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
              </dd>
            </div>
          ))}
        </dl>
        <DrawLine className="bg-line" duration={1.4} delay={0.2} />
      </div>
    </section>
  );
}
