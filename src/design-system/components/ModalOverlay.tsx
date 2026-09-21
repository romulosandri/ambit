import type { ReactNode } from "react"
import { useEffect } from "react"
import { createPortal } from "react-dom"
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

  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          className={cx(
            "bg-bg-overlay fixed inset-0 z-60 overflow-y-auto",
            className,
          )}
          role="presentation"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduce ? { opacity: 0, pointerEvents: "none" } : { opacity: 0, pointerEvents: "none" }}
          transition={overlayTransition}
          onClick={(event) => {
            if (event.target === event.currentTarget) onClose?.()
          }}
        >
          <div
            className="flex min-h-full flex-col items-center p-40 max-md:p-16"
            onClick={(event) => {
              if (event.target === event.currentTarget) onClose?.()
            }}
          >
            <motion.div
              className="my-auto flex min-h-0 w-full max-w-520 flex-col"
              initial={reduce ? false : { opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.98 }}
              transition={presenceTransition}
              onClick={(event) => {
                if (event.target === event.currentTarget) onClose?.()
              }}
            >
              {children}
            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  )
}
