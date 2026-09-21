import { type ReactNode } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { cx } from "@ds/components/cx"
import {
  microOffset,
  microTransition,
  presenceOffset,
  presenceTransition,
  railCopyTransition,
} from "./config"

export function PresenceList({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className={className}>
      <AnimatePresence mode="popLayout" initial={false}>
        {children}
      </AnimatePresence>
    </div>
  )
}

export function PresenceItem({
  children,
  className,
  layout = true,
}: {
  children: ReactNode
  className?: string
  layout?: boolean
}) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      layout={reduce ? false : layout}
      initial={reduce ? false : { opacity: 0, y: presenceOffset }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduce ? { opacity: 0 } : { opacity: 0, y: -microOffset }}
      transition={presenceTransition}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function Crossfade({
  id,
  children,
  className,
}: {
  id: string
  children: ReactNode
  className?: string
}) {
  const reduce = useReducedMotion()

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={id}
        initial={reduce ? false : { opacity: 0, y: microOffset }}
        animate={{ opacity: 1, y: 0 }}
        exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
        transition={presenceTransition}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

/** Label/logo/meta that rides along with the nav rail collapse. */
export function RailCopy({
  visible,
  delay = 0,
  className,
  as = "span",
  children,
}: {
  visible: boolean
  delay?: number
  className?: string
  as?: "span" | "div"
  children: ReactNode
}) {
  const reduce = useReducedMotion()
  const MotionTag = as === "div" ? motion.div : motion.span

  return (
    <MotionTag
      initial={false}
      animate={visible ? { opacity: 1, x: 0 } : { opacity: 0, x: -microOffset }}
      transition={reduce ? { duration: 0 } : railCopyTransition(visible, delay)}
      className={className}
      aria-hidden={!visible || undefined}
    >
      {children}
    </MotionTag>
  )
}

export function EmptyCopy({
  show,
  children,
  className,
}: {
  show: boolean
  children: ReactNode
  className?: string
}) {
  const reduce = useReducedMotion()

  return (
    <AnimatePresence initial={false}>
      {show ? (
        <motion.p
          key="empty"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={microTransition}
          className={cx("text-body-default text-text-muted px-8", className)}
        >
          {children}
        </motion.p>
      ) : null}
    </AnimatePresence>
  )
}

