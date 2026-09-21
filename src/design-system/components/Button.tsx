import type { Icon as PhosphorIcon, IconWeight } from "@phosphor-icons/react"
import type { ButtonHTMLAttributes, ReactNode } from "react"
import { motion, useReducedMotion } from "motion/react"
import { microTransition } from "@/motion/config"
import { Icon } from "./Icon"
import { cx } from "./cx"

export type ButtonStyle =
  | "primary"
  | "secondary"
  | "soft"
  | "ghost"
  | "destructive"
export type ButtonSize = "lg" | "md" | "sm" | "xs"
export type ButtonShape = "rounded" | "pill"

export type ButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "style" | "children" | "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart"
> & {
  children?: ReactNode
  /** Visual style from the Figma `bg/state/*` families. */
  style?: ButtonStyle
  size?: ButtonSize
  shape?: ButtonShape
  /** Dashed inside stroke used by "New Chat", Back, and Filter. */
  borderStyle?: "solid" | "dashed"
  leadIcon?: PhosphorIcon
  leadIconWeight?: IconWeight
  tailIcon?: PhosphorIcon
  iconOnly?: boolean
  fullWidth?: boolean
  isLoading?: boolean
}

const styleClass: Record<ButtonStyle, string> = {
  primary:
    "bg-bg-state-primary hover:bg-bg-state-primary-hover active:bg-bg-state-primary-press text-text-default shadow-component",
  secondary:
    "bg-bg-state-secondary hover:bg-bg-state-secondary-hover active:bg-bg-state-secondary-press text-text-default",
  soft: "bg-bg-state-soft hover:bg-bg-state-soft-hover active:bg-bg-state-soft-press text-text-default",
  ghost:
    "bg-bg-state-ghost hover:bg-bg-state-ghost-hover active:bg-bg-state-ghost-press text-text-default",
  destructive:
    "bg-bg-state-destructive hover:bg-bg-state-destructive-hover active:bg-bg-state-destructive-press text-text-default shadow-component",
}

const loadingClass: Record<ButtonStyle, string> = {
  primary: "bg-bg-state-primary-loading",
  secondary: "bg-bg-state-secondary-loading",
  soft: "bg-bg-state-soft-loading",
  ghost: "bg-bg-state-ghost-loading",
  destructive: "bg-bg-state-destructive-loading",
}

const sizeClass: Record<ButtonSize, string> = {
  lg: "h-36 gap-6 px-14 py-10",
  md: "h-32 gap-6 px-12 py-8",
  sm: "h-28 gap-4 px-10 py-6",
  xs: "h-24 gap-4 px-8 py-4",
}

const iconOnlySizeClass: Record<ButtonSize, string> = {
  lg: "size-36",
  md: "size-32",
  sm: "size-28",
  xs: "size-24",
}

/** 1px inside stroke. Width/height attributes keep dashes in CSS px. */
function DashedOutline({ pill }: { pill: boolean }) {
  // SVG clamps rx/ry per-axis, which turns 9999 into an ellipse on a wide pill.
  if (pill) {
    return (
      <span
        aria-hidden
        className="border-border-darker pointer-events-none absolute inset-0 rounded-full border border-dashed"
      />
    )
  }

  return (
    <svg
      aria-hidden
      width="100%"
      height="100%"
      className="pointer-events-none absolute inset-[0.5px] h-[calc(100%-1px)] w-[calc(100%-1px)] overflow-visible"
    >
      <rect
        width="100%"
        height="100%"
        rx={7.5}
        ry={7.5}
        fill="none"
        className="stroke-border-darker"
        strokeWidth={1}
        strokeDasharray="4 4"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}

export function Button({
  children,
  style = "secondary",
  size = "md",
  shape = "rounded",
  borderStyle = "solid",
  leadIcon,
  leadIconWeight,
  tailIcon,
  iconOnly = false,
  fullWidth = false,
  isLoading = false,
  className,
  disabled,
  type = "button",
  ...rest
}: ButtonProps) {
  const dashed = borderStyle === "dashed"
  const reduce = useReducedMotion()

  return (
    <motion.button
      type={type}
      disabled={disabled}
      aria-disabled={disabled || undefined}
      aria-busy={isLoading || undefined}
      whileTap={disabled || isLoading || reduce ? undefined : { scale: 0.98 }}
      transition={microTransition}
      className={cx(
        "inline-flex shrink-0 items-center justify-center overflow-hidden",
        "focus-visible:shadow-misc-focus outline-none",
        "disabled:bg-bg-state-disabled disabled:text-text-hint disabled:cursor-not-allowed disabled:shadow-none",
        shape === "pill" ? "rounded-full" : "rounded-sm",
        iconOnly ? iconOnlySizeClass[size] : sizeClass[size],
        styleClass[style],
        dashed && "relative",
        style === "secondary" && !dashed && "border-border-darker shadow-component border",
        isLoading && loadingClass[style],
        fullWidth && "w-full",
        className,
      )}
      {...rest}
    >
      {dashed ? <DashedOutline pill={shape === "pill"} /> : null}
      {leadIcon ? (
        <Icon icon={leadIcon} size={16} weight={leadIconWeight} />
      ) : null}
      {iconOnly ? null : (
        <span className="text-heading-subsection inline-flex items-center justify-center px-2 whitespace-nowrap">
          {children}
        </span>
      )}
      {tailIcon ? <Icon icon={tailIcon} size={16} /> : null}
    </motion.button>
  )
}
