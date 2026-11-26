"use client";

import { useScroll, useTransform, type MotionValue } from "framer-motion";
import type { RefObject } from "react";
import { useReduce } from "./MotionProvider";

/** Vertical drift (px) for an element as its `target` scrolls through the viewport. Zero under reduced motion.
 *  Positive `distance` moves it down relative to the page (slower than scroll); negative moves it up (faster). */
export function useParallax(target: RefObject<HTMLElement | null>, distance: number): MotionValue<number> {
  const reduce = useReduce();
  const { scrollYProgress } = useScroll({ target, offset: ["start end", "end start"] });
  return useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-distance, distance]);
}
