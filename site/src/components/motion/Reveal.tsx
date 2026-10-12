"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";
import { fadeUp, fade, stagger, viewportOnce } from "@/lib/motion";

type RevealProps = HTMLMotionProps<"div"> & {
  /** Delay in seconds before this element starts. */
  delay?: number;
};

/** One element reveals once when 30% of it enters the viewport. */
export function Reveal({ delay = 0, children, ...rest }: RevealProps) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      variants={reduced ? fade : fadeUp}
      transition={{ delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/** Wrap siblings with RevealGroup; each child RevealItem staggers in. */
export function RevealGroup({
  children,
  gap = 0.07,
  ...rest
}: HTMLMotionProps<"div"> & { gap?: number }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      variants={stagger(0.05, gap)}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({ children, ...rest }: HTMLMotionProps<"div">) {
  const reduced = useReducedMotion();
  return (
    <motion.div variants={reduced ? fade : fadeUp} {...rest}>
      {children}
    </motion.div>
  );
}
