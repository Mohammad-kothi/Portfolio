"use client";

import { motion } from "framer-motion";
import { EASE, INSTANT, useReduce } from "./MotionProvider";

/** Three-segment confidence meter. Filled segments grow in one after another when scrolled into view. */
export function LevelBar({ level, max = 3, label }: { level: number; max?: number; label: string }) {
  const reduce = useReduce();
  return (
    <div className="flex items-center gap-3">
      <span className="meta text-muted">Confidence</span>
      <motion.span
        role="meter"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={level}
        className="flex flex-1 gap-1"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      >
        {Array.from({ length: max }, (_, i) => (
          <span key={i} className="relative h-1 flex-1 overflow-hidden bg-line">
            {i < level && (
              <motion.span
                className="absolute inset-0 origin-left bg-accent"
                variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1 } }}
                transition={reduce ? INSTANT : { duration: 0.7, ease: EASE, delay: 0.25 + i * 0.15 }}
              />
            )}
          </span>
        ))}
      </motion.span>
      <span className="meta text-paper">
        {level}/{max}
      </span>
    </div>
  );
}
