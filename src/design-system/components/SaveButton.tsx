import { BookmarkSimple } from "@phosphor-icons/react"
import { useEffect, useRef, useState, type MouseEvent } from "react"
import { motion, useReducedMotion } from "motion/react"
import { microTransition } from "@/motion/config"
import { Button } from "./Button"
import { cardLinkControlClassName } from "./CardLink"
import { cx } from "./cx"

export type SaveButtonProps = {
  saved?: boolean
  onSave: () => void
  label: string
  className?: string
}

function stopCardNavigation(event: MouseEvent<HTMLButtonElement>) {
  event.preventDefault()
  event.stopPropagation()
}

export function SaveButton({
  saved = false,
  onSave,
  label,
  className,
}: SaveButtonProps) {
  const reduce = useReducedMotion()
  const mounted = useRef(false)
  const [pop, setPop] = useState(0)

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true
      return
    }
    setPop((current) => current + 1)
  }, [saved])

  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    stopCardNavigation(event)
    onSave()
  }

  return (
    <motion.span
      key={pop}
      className="inline-flex"
      initial={pop === 0 || reduce ? false : { scale: 0.86 }}
      animate={{ scale: 1 }}
      transition={microTransition}
    >
      <Button
        iconOnly
        size="sm"
        style="soft"
        leadIcon={BookmarkSimple}
        leadIconWeight={saved ? "fill" : "regular"}
        aria-label={saved ? `Remove ${label} from saved` : `Save ${label}`}
        aria-pressed={saved}
        className={className}
        onClick={handleClick}
        onMouseDown={stopCardNavigation}
        onPointerDown={stopCardNavigation}
      />
    </motion.span>
  )
}

export function SaveControl({
  saved = false,
  onSave,
  label,
  className,
}: SaveButtonProps) {
  return (
    <span
      className={cx(
        cardLinkControlClassName,
        "transition-opacity",
        saved
          ? "opacity-100"
          : "pointer-events-none opacity-0 group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100",
        className,
      )}
    >
      <SaveButton saved={saved} onSave={onSave} label={label} />
    </span>
  )
}
