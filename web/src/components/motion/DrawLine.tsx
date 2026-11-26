"use client";

import { motion } from "framer-motion";
import { EASE, INSTANT, useReduce } from "./MotionProvider";

type DrawLineProps = {
  /** Positioning/colour classes, e.g. "absolute inset-x-0 top-0 bg-line". */
  className?: string;
  axis?: "x" | "y";
  delay?: number;
  duration?: number;
};

/** A 1px rule that draws itself in when scrolled into view: the "border drawing" detail. */
export function DrawLine({ className = "bg-line", axis = "x", delay = 0, duration = 1.1 }: DrawLineProps) {
  const reduce = useReduce();
  const horizontal = axis === "x";
  return (
    <motion.span
      aria-hidden
      className={`block ${horizontal ? "h-px origin-left" : "w-px origin-top"} ${className}`}
      initial={horizontal ? { scaleX: 0 } : { scaleY: 0 }}
      whileInView={horizontal ? { scaleX: 1 } : { scaleY: 1 }}
      viewport={{ once: true, margin: "0px 0px -5% 0px" }}
      transition={reduce ? INSTANT : { duration, ease: EASE, delay }}
    />
  );
}
