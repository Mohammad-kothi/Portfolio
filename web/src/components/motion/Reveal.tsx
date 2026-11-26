"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { EASE, INSTANT, useReduce } from "./MotionProvider";

const tags = {
  div: motion.div,
  li: motion.li,
  p: motion.p,
  article: motion.article,
  figure: motion.figure,
  span: motion.span,
} as const;

type RevealProps = {
  children: ReactNode;
  as?: keyof typeof tags;
  className?: string;
  delay?: number;
  /** Distance in px the element rises from. */
  y?: number;
  /** Blur-to-sharp. Leave off for very large blocks. */
  blur?: boolean;
};

/** Rises, fades and sharpens its children the first time they scroll into view. */
export function Reveal({ children, as = "div", className, delay = 0, y = 24, blur = true }: RevealProps) {
  const reduce = useReduce();
  const Tag = tags[as] as typeof motion.div;
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y, filter: blur ? "blur(6px)" : "blur(0px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={reduce ? INSTANT : { duration: 0.75, ease: EASE, delay }}
    >
      {children}
    </Tag>
  );
}
