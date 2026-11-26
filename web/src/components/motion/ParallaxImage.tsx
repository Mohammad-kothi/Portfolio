"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

type ParallaxImageProps = {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  imageClassName?: string;
  /** How far the image drifts, as a percentage of the frame height. */
  strength?: number;
  preload?: boolean;
};

/** An image that drifts slightly inside its frame as you scroll. Static under reduced motion. */
export function ParallaxImage({
  src,
  alt,
  sizes,
  className = "",
  imageClassName = "",
  strength = 7,
  preload = false,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : [`-${strength}%`, `${strength}%`]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {/* Overscan just enough to cover the drift, so as little of the image as possible is cropped. */}
      <motion.div style={{ y, top: `-${strength + 1}%`, bottom: `-${strength + 1}%` }} className="absolute inset-x-0">
        <Image src={src} alt={alt} fill sizes={sizes} preload={preload} className={`object-cover ${imageClassName}`} />
      </motion.div>
    </div>
  );
}
