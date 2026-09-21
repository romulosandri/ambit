import type { Icon as PhosphorIcon } from "@phosphor-icons/react"
import type { ReactNode } from "react"
import { Icon } from "./Icon"
import { cx } from "./cx"

export type LinkButtonProps = {
  children: ReactNode
  tone?: "muted" | "default" | "informative"
  leadIcon?: PhosphorIcon
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
  leadIcon,
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
      <span className="text-heading-subsection whitespace-nowrap">
        {children}
      </span>
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
