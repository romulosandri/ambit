import type { ReactNode } from "react"
import { motion, useReducedMotion } from "motion/react"
import { microTransition } from "./config"

export function PressableArticle({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  const reduce = useReducedMotion()

  return (
    <motion.article
      className={className}
      whileTap={reduce ? undefined : { scale: 0.985 }}
      transition={microTransition}
    >
      {children}
    </motion.article>
  )
}
