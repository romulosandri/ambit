import type { Icon as PhosphorIcon } from "@phosphor-icons/react"
import type { ReactNode } from "react"
import { Icon } from "./Icon"
import { cx } from "./cx"

export type LinkButtonProps = {
  children: ReactNode
  tone?: "muted" | "default" | "informative"
  /** `sm` is the chat “Worked for…” link (body-small). Auth uses `md`. */
  size?: "sm" | "md"
  leadIcon?: PhosphorIcon
  tailIcon?: PhosphorIcon
  href?: string
  disabled?: boolean
  onClick?: () => void
  className?: string
  target?: string
  rel?: string
}

export function LinkButton({
  children,
  tone = "muted",
  size = "md",
  leadIcon,
  tailIcon,
  href,
  disabled = false,
  onClick,
  className,
  target,
  rel,
}: LinkButtonProps) {
  const content = (
    <>
      {leadIcon ? <Icon icon={leadIcon} size={16} /> : null}
      <span
        className={cx(
          "whitespace-nowrap",
          size === "sm" ? "text-body-small" : "text-heading-subsection",
        )}
      >
        {children}
      </span>
      {tailIcon ? <Icon icon={tailIcon} size={16} /> : null}
    </>
  )

  const shared = cx(
    "bg-bg-state-ghost inline-flex items-center justify-center gap-4 rounded-2xs",
    "hover:underline focus-visible:underline focus-visible:shadow-misc-focus outline-none",
    "disabled:text-text-hint disabled:cursor-not-allowed disabled:no-underline disabled:hover:no-underline",
    tone === "muted"
      ? "text-text-muted hover:text-text-default"
      : tone === "informative"
        ? "text-text-informative"
        : "text-text-default",
    className,
  )

  if (href && !disabled) {
    return (
      <a href={href} target={target} rel={rel} className={shared}>
        {content}
      </a>
    )
  }

  return (
    <button
      type="button"
      disabled={disabled}
      aria-disabled={disabled || undefined}
      onClick={onClick}
      className={shared}
    >
      {content}
    </button>
  )
}
