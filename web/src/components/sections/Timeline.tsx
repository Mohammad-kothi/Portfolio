"use client";

import { motion, useScroll, type Transition } from "framer-motion";
import { useRef } from "react";
import { EASE, EASE_PANEL, INSTANT, useReduce } from "@/components/motion/MotionProvider";
import { Dot, PlaceholderTag } from "@/components/ui/primitives";
import type { TimelineEntry } from "@/content/types";

/** Vertical timeline. The accent rail draws with scroll; each entry unfolds downward as it arrives. */
export function Timeline({ entries }: { entries: TimelineEntry[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReduce();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const t = (delay: number, duration = 0.8, ease: Transition["ease"] = EASE): Transition =>
    reduce ? INSTANT : { duration, ease, delay };

  return (
    <ol ref={ref} className="relative mt-16 md:mt-24">
      <span aria-hidden className="absolute bottom-0 left-[5px] top-0 w-px bg-line md:left-[calc(25%+5px)]" />
      <motion.span
        aria-hidden
        style={{ scaleY: reduce ? 1 : scrollYProgress }}
        className="absolute bottom-0 left-[5px] top-0 w-px origin-top bg-accent md:left-[calc(25%+5px)]"
      />

      {entries.map((entry) => (
        <motion.li
          key={`${entry.period}-${entry.title}`}
          data-build={`journey.${entry.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "0px 0px -12% 0px" }}
          className="group relative grid grid-cols-1 gap-x-5 pb-14 pl-8 last:pb-0 md:grid-cols-4 md:pl-0"
        >
          {/* Period slides in from the rail */}
          <motion.div
            variants={{ hidden: { opacity: 0, x: -16 }, show: { opacity: 1, x: 0 } }}
            transition={t(0.05)}
            className="mb-3 md:mb-0 md:pr-10 md:text-right"
          >
            <p data-scramble className="font-display text-3xl uppercase leading-none text-paper md:text-4xl">{entry.period}</p>
            <p data-scramble className="meta mt-2 text-muted">{entry.kind}</p>
          </motion.div>

          {/* Node pops onto the rail */}
          <motion.span
            aria-hidden
            variants={{ hidden: { scale: 0 }, show: { scale: 1 } }}
            transition={t(0, 0.45)}
            className={`absolute left-0 top-2 size-[11px] border bg-ink transition-colors duration-300 md:left-[25%] ${
              entry.current ? "border-accent bg-accent" : "border-line-strong group-hover:border-accent"
            }`}
          />

          {/* Content unfolds top-down */}
          <motion.div
            variants={{
              hidden: { opacity: 0, clipPath: "inset(0% 0% 100% 0%)", filter: "blur(4px)" },
              show: { opacity: 1, clipPath: "inset(0% 0% 0% 0%)", filter: "blur(0px)" },
            }}
            transition={t(0.12, 0.9, EASE_PANEL)}
            className="md:col-span-3 md:pl-12"
          >
            <div className="flex flex-wrap items-center gap-3">
              {entry.current && (
                <span className="meta inline-flex items-center gap-2 border border-accent px-2 py-0.5 text-accent">
                  <Dot pulse /> Now
                </span>
              )}
              <PlaceholderTag show={entry.placeholder} />
            </div>
            <h3 className="mt-2 text-2xl font-semibold tracking-tight text-paper transition-transform duration-500 ease-expo group-hover:translate-x-1 md:text-3xl">
              {entry.title}
            </h3>
            <p className="meta mt-2 text-accent">{entry.org}</p>
            <p className="mt-4 max-w-[60ch] text-base leading-relaxed text-muted">{entry.detail}</p>
            {entry.highlights && (
              <ul className="mt-5 flex flex-wrap gap-2">
                {entry.highlights.map((h) => (
                  <li
                    key={h}
                    className="meta border border-line-strong px-2.5 py-1 text-paper transition-colors duration-300 hover:border-accent"
                  >
                    {h}
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        </motion.li>
      ))}
    </ol>
  );
}
