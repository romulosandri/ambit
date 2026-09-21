import type { ReactNode } from "react"
import { useEffect } from "react"
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
  useEffect(() => {
    if (!open) return undefined

    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose?.()
    }

    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className={cx(
        "bg-bg-overlay absolute inset-0 z-40 overflow-hidden",
        className,
      )}
      role="presentation"
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
        {children}
      </div>
    </div>
  )
}
