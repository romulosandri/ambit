import type { Icon as PhosphorIcon, IconWeight } from "@phosphor-icons/react"
import { cx } from "./cx"

export type IconTone =
  | "inherit"
  | "default"
  | "subtle"
  | "muted"
  | "disabled"
  | "destructive"
  | "informative"
  | "success"
  | "warning"

export type IconGlyphSize = 12 | 16 | 18 | 20
export type IconBoxSize = 12 | 16 | 20

export type IconProps = {
  icon: PhosphorIcon
  /** Glyph size in px. */
  size?: IconGlyphSize
  /** Alignment box in px. Defaults to the glyph size. */
  box?: IconBoxSize
  tone?: IconTone
  weight?: IconWeight
  className?: string
}

const toneClass: Record<IconTone, string> = {
  inherit: "",
  default: "text-icon-default",
  subtle: "text-icon-default-subtle",
  muted: "text-icon-default-muted",
  disabled: "text-icon-default-disabled",
  destructive: "text-icon-destructive",
  informative: "text-icon-informative",
  success: "text-icon-success",
  warning: "text-icon-warning",
}

const boxClass: Record<IconBoxSize, string> = {
  12: "size-12",
  16: "size-16",
  20: "size-20",
}

export function Icon({
  icon: Glyph,
  size = 16,
  box,
  tone = "inherit",
  weight = "regular",
  className,
}: IconProps) {
  return (
    <span
      aria-hidden
      className={cx(
        "inline-flex shrink-0 items-center justify-center",
        boxClass[box ?? (size === 18 ? 20 : (size as IconBoxSize))],
        toneClass[tone],
        className,
      )}
    >
      <Glyph size={size} weight={weight} />
    </span>
  )
}
