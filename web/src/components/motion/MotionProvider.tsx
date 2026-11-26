"use client";

import { MotionConfig, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/** Fast-out, no-bounce curve used everywhere. */
export const EASE = [0.22, 1, 0.36, 1] as const;
/** Sharper curve for panels and wipes. */
export const EASE_PANEL = [0.76, 0, 0.24, 1] as const;

/** Seconds until the intro curtain has cleared enough for the hero to start revealing. Keep in sync with `.intro-*` in globals.css. */
export const INTRO = 0.7;

export const INSTANT = { duration: 0 } as const;

/** True when the visitor asked their OS for reduced motion. */
export function useReduce() {
  return useReducedMotion() ?? false;
}

/** `reducedMotion="user"` switches transform animations off for people who ask their OS for less motion.
 *  Opacity, clip-path and blur are made instant per component with `useReduce()` + `INSTANT`. */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user" transition={{ duration: 0.7, ease: EASE }}>
      {children}
    </MotionConfig>
  );
}
