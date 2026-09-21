export {
  motionDuration,
  motionEase,
  presenceEase,
  presenceTransition,
  overlayTransition,
  microTransition,
  railWidth,
  railSpring,
  drawerSpring,
  railCopyTransition,
  railItemDelay,
  presenceOffset,
  microOffset,
} from "./config"
export { markAuthHandoff, peekAuthHandoff, clearAuthHandoff } from "./handoff"
export { gsap, useGSAP, prefersReducedMotion } from "./gsap"
export {
  PresenceList,
  PresenceItem,
  Crossfade,
  RailCopy,
  EmptyCopy,
} from "./presence"
export { AnimatePresence, motion, useReducedMotion } from "motion/react"
