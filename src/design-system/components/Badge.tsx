import type { ReactNode } from "react"
import { cx } from "./cx"

export type BadgeColor =
  | "default"
  | "red"
  | "orange"
  | "green"
  | "blue"
  | "lime"
  | "cyan"
  | "violet"
  | "fuchsia"
  | "pink"

export type BadgeProps = {
  children: ReactNode
  color?: BadgeColor
  className?: string
}

/** Each colour pairs a `bg/badge/*` fill with its `bg/basic/*-strong` label. */
const colorClass: Record<BadgeColor, string> = {
  default: "bg-bg-badge-default text-text-subtle",
  red: "bg-bg-badge-red text-bg-basic-red-strong",
  orange: "bg-bg-badge-orange text-bg-basic-orange-strong",
  green: "bg-bg-badge-green text-bg-basic-green-strong",
  blue: "bg-bg-badge-blue text-bg-basic-blue-strong",
  lime: "bg-bg-badge-lime text-bg-basic-lime-strong",
  cyan: "bg-bg-badge-cyan text-bg-basic-cyan-strong",
  violet: "bg-bg-badge-violet text-bg-basic-violet-strong",
  fuchsia: "bg-bg-badge-fuchsia text-bg-basic-fuchsia-strong",
  pink: "bg-bg-badge-pink text-bg-basic-pink-strong",
}

export function Badge({ children, color = "default", className }: BadgeProps) {
  return (
    <span
      className={cx(
        // Figma's inside stroke doesn't grow the box, so it's an inset ring
        // rather than a border — a border would make this 21px instead of 19px.
        "inline-flex shrink-0 items-center justify-center overflow-hidden rounded-sm p-2 shadow-[inset_0_0_0_1px_var(--ds-color-border-default)] backdrop-blur-[2px]",
        colorClass[color],
        className,
      )}
    >
      <span className="text-body-small px-4 whitespace-nowrap">{children}</span>
    </span>
  )
}
