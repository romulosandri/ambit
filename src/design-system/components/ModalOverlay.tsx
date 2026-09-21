import type { ReactNode } from "react"
import { useEffect } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { overlayTransition, presenceTransition } from "@/motion/config"
import { cx } from "./cx"

export type ModalOverlayProps = {
  open: boolean
  onClose?: () => void
  children: ReactNode
  className?: string
}

export function ModalOverlay({
  open,
  onClose,
  children,
  className,
}: ModalOverlayProps) {
  const reduce = useReducedMotion()

  useEffect(() => {
    if (!open) return undefined

    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose?.()
    }

    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className={cx(
            "bg-bg-overlay absolute inset-0 z-40 overflow-hidden",
            className,
          )}
          role="presentation"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={overlayTransition}
          onClick={(event) => {
            if (event.target === event.currentTarget) onClose?.()
          }}
        >
          <div
            className="flex h-full items-center justify-center p-40 max-md:p-16"
            onClick={(event) => {
              if (event.target === event.currentTarget) onClose?.()
            }}
          >
            <motion.div
              className="flex min-h-0 min-w-0 max-h-full w-full max-w-520 justify-center"
              initial={reduce ? false : { opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.98 }}
              transition={presenceTransition}
            >
              {children}
            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
