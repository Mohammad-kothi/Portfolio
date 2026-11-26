import type { ReactNode } from "react";
import { DrawLine } from "@/components/motion/DrawLine";
import { MaskText } from "@/components/motion/MaskText";
import { Reveal } from "@/components/motion/Reveal";
import { Dot } from "./primitives";

type SectionHeaderProps = {
  index: string;
  label: string;
  /** One entry per line of the big heading. */
  title: ReactNode[];
  aside?: ReactNode;
  id?: string;
  /** Prefix for build-cursors.js labels, e.g. "about" → "about.label", "about.title", "about.intro". */
  build: string;
};

/** Section marker + oversized condensed heading on the 12-column grid. The top rule draws in, the label slides,
 *  and the heading reveals word by word. */
export function SectionHeader({ index, label, title, aside, id, build }: SectionHeaderProps) {
  return (
    <header className="relative grid grid-cols-12 gap-x-5 gap-y-6 pt-5">
      <DrawLine className="absolute inset-x-0 top-0 bg-line" />
      <SectionLabel index={index} label={label} build={`${build}.label`} className="col-span-12 md:col-span-3" />
      <h2
        id={id}
        data-build={`${build}.title`}
        data-scramble
        className="col-span-12 w-fit font-display text-[clamp(3.25rem,10vw,9rem)] leading-[0.86] uppercase tracking-[-0.01em] md:col-span-9"
      >
        <MaskText lines={title} delay={0.1} />
      </h2>
      {aside && (
        <Reveal className="col-span-12 md:col-span-6 md:col-start-4 lg:col-span-5 lg:col-start-4" delay={0.35}>
          <div data-build={`${build}.intro`} className="w-fit">
            {aside}
          </div>
        </Reveal>
      )}
    </header>
  );
}

/** "● 03 —— Label": the dot, number and dash arrive in sequence. */
export function SectionLabel({
  index,
  label,
  build,
  className = "",
}: {
  index: string;
  label: string;
  build: string;
  className?: string;
}) {
  return (
    <Reveal className={className} y={0} blur={false}>
      <p data-build={build} data-scramble className="meta flex w-fit items-center gap-2.5 text-muted">
        <Dot />
        <span className="text-paper">{index}</span>
        <DrawLine className="w-5 bg-line-strong" delay={0.2} duration={0.6} />
        <Reveal as="span" y={6} delay={0.3}>
          {label}
        </Reveal>
      </p>
    </Reveal>
  );
}
