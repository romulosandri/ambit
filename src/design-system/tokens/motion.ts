/**
 * Motion scale — durations in milliseconds, easings as CSS timing functions.
 * `fast` / `normal` are for presence and micro-interactions (motion.dev).
 * `slow` / `dramatic` are for GSAP sequences.
 */
export const duration = {
  fast: 150,
  normal: 200,
  slow: 320,
  dramatic: 560,
} as const

export const easing = {
  standard: "cubic-bezier(0.2, 0, 0, 1)",
  enter: "cubic-bezier(0.16, 1, 0.3, 1)",
  exit: "cubic-bezier(0.4, 0, 1, 1)",
} as const

export type DurationToken = keyof typeof duration
export type EasingToken = keyof typeof easing
