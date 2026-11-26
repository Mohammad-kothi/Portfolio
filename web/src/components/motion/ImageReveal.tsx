"use client";

import { motion, type Transition } from "framer-motion";
import type { ReactNode } from "react";
import { EASE, EASE_PANEL, INSTANT, useReduce } from "./MotionProvider";

type ImageRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Start on mount instead of when scrolled into view. */
  onMount?: boolean;
};

/** Editorial image entrance: a coral panel and a black panel slide off in turn, and the image settles from a slight zoom. */
export function ImageReveal({ children, className = "", delay = 0, onMount = false }: ImageRevealProps) {
  const reduce = useReduce();
  const trigger = onMount
    ? { animate: "show" }
    : { whileInView: "show", viewport: { once: true, margin: "0px 0px -12% 0px" } };
  const t = (d: number, duration = 0.9, ease: Transition["ease"] = EASE_PANEL): Transition =>
    reduce ? INSTANT : { duration, ease, delay: delay + d };

  return (
    <motion.div className={`relative overflow-hidden ${className}`} initial="hidden" {...trigger}>
      <motion.div
        className="absolute inset-0"
        variants={{ hidden: { scale: 1.16 }, show: { scale: 1, transition: t(0.15, 1.4, EASE) } }}
      >
        {children}
      </motion.div>
      <motion.span
        aria-hidden
        className="absolute inset-0 z-10 origin-right bg-ink"
        variants={{ hidden: { scaleX: 1 }, show: { scaleX: 0, transition: t(0.12) } }}
      />
      <motion.span
        aria-hidden
        className="absolute inset-0 z-20 origin-right bg-accent"
        variants={{ hidden: { scaleX: 1 }, show: { scaleX: 0, transition: t(0, 0.75) } }}
      />
    </motion.div>
  );
}
