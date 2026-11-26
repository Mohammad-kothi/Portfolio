"use client";

import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

const format = (n: number) => Math.round(n).toLocaleString("en-US");

/** Counts up to `value` the first time it scrolls into view. Without JS, or with reduced motion, it just shows the number. */
export function CountUp({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();
  const mv = useMotionValue(value);
  const text = useTransform(mv, (n) => `${prefix}${format(n)}${suffix}`);
  const started = useRef(false);

  useEffect(() => {
    if (reduce || started.current) return;
    if (!inView) {
      mv.set(0);
      return;
    }
    started.current = true;
    const controls = animate(mv, value, { duration: 1.6, ease: [0.22, 1, 0.36, 1] });
    return () => controls.stop();
  }, [inView, reduce, mv, value]);

  return (
    <span ref={ref}>
      <span className="sr-only">{`${prefix}${format(value)}${suffix}`}</span>
      <motion.span aria-hidden>{text}</motion.span>
    </span>
  );
}
