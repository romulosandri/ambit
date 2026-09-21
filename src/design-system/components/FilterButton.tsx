import { Funnel } from "@phosphor-icons/react"
import type { ReactNode } from "react"
import { Badge } from "./Badge"
import { Button } from "./Button"
import { cx } from "./cx"

export type FilterButtonProps = {
  children?: ReactNode
  /** Applied filters switch the dashed edge to solid and brighten the label. */
  selected?: boolean
  count?: number
  open?: boolean
  disabled?: boolean
  onClick?: () => void
  className?: string
  "aria-controls"?: string
}

export function FilterButton({
  children = "Filter",
  selected = false,
  count,
  open = false,
  disabled = false,
  onClick,
  className,
  "aria-controls": ariaControls,
}: FilterButtonProps) {
  return (
    <Button
      size="xs"
      style={selected ? "soft" : "secondary"}
      borderStyle={selected ? "solid" : "dashed"}
      leadIcon={Funnel}
      disabled={disabled}
      onClick={onClick}
      aria-haspopup="dialog"
      aria-expanded={open}
      aria-controls={ariaControls}
      className={cx(
        !selected && "text-text-muted hover:text-text-default",
        className,
      )}
    >
      {children}
      {count === undefined ? null : <Badge className="ml-4">{count}</Badge>}
    </Button>
  )
}
