import { duration as durationMs, easing as easingCss } from "@ds/tokens/motion"

/** Durations in seconds for motion.dev and GSAP. */
export const motionDuration = {
  fast: durationMs.fast / 1000,
  normal: durationMs.normal / 1000,
  slow: durationMs.slow / 1000,
  dramatic: durationMs.dramatic / 1000,
} as const

export const motionEase = {
  standard: easingCss.standard,
  enter: easingCss.enter,
  exit: easingCss.exit,
} as const

export const presenceEase = [0.2, 0, 0, 1] as const

export const presenceTransition = {
  duration: motionDuration.normal,
  ease: presenceEase,
}

export const overlayTransition = {
  duration: motionDuration.slow,
  ease: presenceEase,
}

export const microTransition = {
  duration: motionDuration.fast,
  ease: presenceEase,
}

export const presenceOffset = 12
export const microOffset = 8
