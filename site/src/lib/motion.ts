import type { Transition, Variants } from "motion/react";

/**
 * Motion vocabulary. Micro interactions follow the brand guide (150 to 200ms, ease-out).
 * Reveals are slower and fluid, which the guide leaves open. Never ease-in, never raw linear on UI.
 */
export const EASE_OUT: [number, number, number, number] = [0.25, 1, 0.5, 1];
export const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const DUR = {
  micro: 0.16,
  base: 0.2,
  settle: 0.4,
  reveal: 0.65,
  slow: 0.9,
} as const;

export const microTransition: Transition = { duration: DUR.base, ease: EASE_OUT };
export const settleTransition: Transition = { duration: DUR.settle, ease: EASE_OUT_EXPO };
export const revealTransition: Transition = { duration: DUR.reveal, ease: EASE_OUT_EXPO };

/** Fade up from an already visible-ish default. Travel is small on purpose. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: revealTransition },
};

export const fade: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: revealTransition },
};

export const stagger = (delayChildren = 0.05, staggerChildren = 0.07): Variants => ({
  hidden: {},
  show: { transition: { delayChildren, staggerChildren } },
});

export const viewportOnce = { once: true, amount: 0.3 } as const;
