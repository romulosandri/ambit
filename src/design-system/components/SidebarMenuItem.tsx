import type { Icon as PhosphorIcon } from "@phosphor-icons/react"
import type { ReactNode } from "react"
import { Button } from "./Button"
import { Icon } from "./Icon"
import { cx } from "./cx"

export type SidebarMenuItemProps = {
  children: ReactNode
  icon?: PhosphorIcon
  /** `header` is the label-only group heading ("Settings", "Topics"). */
  variant?: "item" | "header"
  active?: boolean
  tone?: "default" | "muted"
  badge?: ReactNode
  trailingLabel?: string
  tailAction?: { icon: PhosphorIcon; label: string; onClick: () => void }
  href?: string
  disabled?: boolean
  /** Icon-only rail: label stays for assistive tech and the native tooltip. */
  collapsed?: boolean
  onClick?: () => void
  className?: string
}

function rowClass({
  active,
  tone,
  disabled,
  hoverable,
  collapsed,
}: {
  active: boolean
  tone: "default" | "muted"
  disabled: boolean
  hoverable: boolean
  collapsed: boolean
}) {
  return cx(
    "flex h-32 w-full items-center gap-6 rounded-sm p-6",
    collapsed && "justify-center",
    active
      ? "text-text-default bg-bg-state-soft"
      : tone === "muted"
        ? "text-text-muted bg-bg-state-ghost"
        : "text-text-subtle bg-bg-state-ghost",
    hoverable &&
      !active &&
      "hover:bg-bg-state-ghost-hover hover:text-text-default active:bg-bg-state-ghost-press",
    disabled && "cursor-not-allowed",
  )
}

function labelOf(children: ReactNode): string | undefined {
  return typeof children === "string" ? children : undefined
}

export function SidebarMenuItem({
  children,
  icon,
  variant = "item",
  active = false,
  tone = "default",
  badge,
  trailingLabel,
  tailAction,
  href,
  disabled = false,
  collapsed = false,
  onClick,
  className,
}: SidebarMenuItemProps) {
  if (variant === "header") {
    return (
      <div
        className={cx(
          "text-text-subtle flex w-full items-center gap-4 rounded-sm px-8 py-4",
          className,
        )}
      >
        <span className="text-body-small min-w-0 flex-1 px-2">{children}</span>
      </div>
    )
  }

  const label = labelOf(children)
  const tooltip = collapsed
    ? trailingLabel && label
      ? `${label} (${trailingLabel})`
      : label
    : undefined

  const body = (
    <>
      {icon ? <Icon icon={icon} size={18} box={20} /> : null}
      <span
        className={cx(
          "text-heading-subsection min-w-0 px-4 text-left whitespace-nowrap",
          collapsed ? "sr-only" : "flex-1",
        )}
      >
        {children}
      </span>
      {collapsed ? null : trailingLabel ? (
        <span className="text-body-default text-text-muted px-4 whitespace-nowrap">
          {trailingLabel}
        </span>
      ) : null}
      {collapsed ? null : badge}
    </>
  )

  const hoverable = !disabled
  const surface = rowClass({ active, tone, disabled, hoverable, collapsed })
  const extras = collapsed ? undefined : tailAction

  // A tail action can't live inside the row's own button, so the row becomes a
  // container and both actions stay independently focusable.
  if (extras) {
    return (
      <div className={cx(surface, className)} title={tooltip}>
        {href && !disabled ? (
          <a
            href={href}
            aria-current={active ? "page" : undefined}
            className="focus-visible:shadow-misc-focus flex min-w-0 flex-1 items-center gap-6 rounded-sm outline-none"
          >
            {body}
          </a>
        ) : (
          <button
            type="button"
            disabled={disabled}
            onClick={onClick}
            aria-current={active ? "page" : undefined}
            className="focus-visible:shadow-misc-focus flex min-w-0 flex-1 items-center gap-6 rounded-sm border-0 bg-transparent outline-none"
          >
            {body}
          </button>
        )}
        <Button
          iconOnly
          size="xs"
          style="ghost"
          leadIcon={extras.icon}
          aria-label={extras.label}
          onClick={extras.onClick}
          className="size-20"
        />
      </div>
    )
  }

  if (href && !disabled) {
    return (
      <a
        href={href}
        title={tooltip}
        aria-current={active ? "page" : undefined}
        className={cx(surface, "focus-visible:shadow-misc-focus outline-none", className)}
      >
        {body}
      </a>
    )
  }

  return (
    <button
      type="button"
      title={tooltip}
      disabled={disabled}
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={cx(surface, "focus-visible:shadow-misc-focus border-0 outline-none", className)}
    >
      {body}
    </button>
  )
}
