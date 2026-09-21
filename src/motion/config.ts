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

/** Width of the desktop nav rail. Shared by the spring and the copy fade. */
export const railWidth = {
  expanded: 280,
  collapsed: 64,
} as const

/** Slightly underdamped so the rail and drawer settle with a little life. */
export const railSpring = {
  type: "spring" as const,
  stiffness: 320,
  damping: 26,
  mass: 0.75,
} as const

/** Drawer travels farther than the rail, so it damps a bit sooner. */
export const drawerSpring = {
  type: "spring" as const,
  stiffness: 380,
  damping: 34,
  mass: 0.85,
} as const

export function railCopyTransition(visible: boolean, delay = 0) {
  return {
    duration: visible ? motionDuration.normal : motionDuration.fast,
    ease: presenceEase,
    delay,
  }
}

export function railItemDelay(index: number, collapsed: boolean) {
  if (collapsed) return Math.min(index * 0.016, 0.12)
  return 0.05 + index * 0.03
}

export const presenceOffset = 12
export const microOffset = 8
