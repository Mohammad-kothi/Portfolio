"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useId, useState, type ReactNode } from "react";
import { EASE, INSTANT, useReduce } from "./MotionProvider";

export type AccordionItem = { key: string; eyebrow: ReactNode; title: ReactNode; body: ReactNode };

/** Editorial accordion: several panels may be open; each opens with a height + opacity transition. */
export function Accordion({ items, defaultOpen = [0] }: { items: AccordionItem[]; defaultOpen?: number[] }) {
  const reduce = useReduce();
  const baseId = useId();
  const [open, setOpen] = useState<Set<number>>(() => new Set(defaultOpen));
  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  return (
    <ol className="border-t border-line">
      {items.map((item, i) => {
        const isOpen = open.has(i);
        const panelId = `${baseId}-panel-${i}`;
        const buttonId = `${baseId}-button-${i}`;
        return (
          <li key={item.key} className="border-b border-line">
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(i)}
                className="group grid w-full grid-cols-[1fr_auto] items-center gap-4 py-7 text-left md:grid-cols-[10rem_1fr_auto] md:gap-8 md:py-8"
              >
                <span className="meta col-span-2 flex items-center gap-2 text-accent md:col-span-1">{item.eyebrow}</span>
                <span className="font-display text-3xl uppercase leading-none transition-colors duration-300 group-hover:text-accent md:text-4xl">
                  {item.title}
                </span>
                {/* Plus that turns into a minus */}
                <span
                  aria-hidden
                  className={`relative grid size-9 place-items-center border transition-colors duration-300 ${
                    isOpen ? "border-accent bg-accent text-ink" : "border-line-strong text-paper group-hover:border-accent"
                  }`}
                >
                  <span className="absolute h-px w-3 bg-current" />
                  <span
                    className={`absolute h-3 w-px bg-current transition-transform duration-500 ease-expo ${isOpen ? "scale-y-0" : "scale-y-100"}`}
                  />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={reduce ? INSTANT : { height: { duration: 0.55, ease: EASE }, opacity: { duration: 0.35 } }}
                  className="overflow-hidden"
                >
                  <motion.div
                    initial={{ y: 12, filter: "blur(4px)" }}
                    animate={{ y: 0, filter: "blur(0px)" }}
                    transition={reduce ? INSTANT : { duration: 0.5, ease: EASE, delay: 0.08 }}
                    className="pb-8 md:pl-[calc(10rem+2rem)] md:pr-14"
                  >
                    {item.body}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ol>
  );
}
