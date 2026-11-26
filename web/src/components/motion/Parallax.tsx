"use client";

import { motion } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { useParallax } from "./useParallax";

/** Wraps a layer that drifts `distance` px either side of its resting place while it crosses the viewport. */
export function Parallax({
  children,
  distance = 40,
  className = "",
  "aria-hidden": ariaHidden,
}: {
  children?: ReactNode;
  distance?: number;
  className?: string;
  "aria-hidden"?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const y = useParallax(ref, distance);
  return (
    <motion.div ref={ref} style={{ y }} className={className} aria-hidden={ariaHidden}>
      {children}
    </motion.div>
  );
}
