import type { Icon as PhosphorIcon } from "@phosphor-icons/react"
import type { ReactNode } from "react"
import { motion, railCopyTransition, RailCopy, useReducedMotion } from "@/motion"
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
  /** Stagger offset so items cascade as the rail opens or closes. */
  copyDelay?: number
  onClick?: () => void
  className?: string
}

function rowClass({
  active,
  tone,
  disabled,
  hoverable,
}: {
  active: boolean
  tone: "default" | "muted"
  disabled: boolean
  hoverable: boolean
}) {
  return cx(
    "flex h-32 w-full items-center gap-6 overflow-hidden rounded-sm p-6",
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
  copyDelay = 0,
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
      <RailCopy
        visible={!collapsed}
        delay={copyDelay}
        className="text-heading-subsection min-w-0 flex-1 px-4 text-left whitespace-nowrap"
      >
        {children}
      </RailCopy>
      {trailingLabel ? (
        <RailCopy
          visible={!collapsed}
          delay={copyDelay}
          className="text-body-default text-text-muted px-4 whitespace-nowrap"
        >
          {trailingLabel}
        </RailCopy>
      ) : null}
      {badge ? (
        <RailCopy visible={!collapsed} delay={copyDelay} className="shrink-0">
          {badge}
        </RailCopy>
      ) : null}
    </>
  )

  const hoverable = !disabled
  const surface = rowClass({ active, tone, disabled, hoverable })
  const extras = tailAction

  // A tail action can't live inside the row's own button, so the row becomes a
  // container and both actions stay independently focusable. The primary control
  // stretches to the row height so padding/gaps still navigate — otherwise
  // Subscriptions (the only item with a plus) misses clicks that Home receives.
  if (extras) {
    const primaryClass =
      "focus-visible:shadow-misc-focus flex h-32 min-w-0 flex-1 items-center gap-6 overflow-hidden rounded-sm p-6 pr-0 outline-none"
    return (
      <div className={cx(surface, "p-0", className)} title={tooltip}>
        {href && !disabled ? (
          <a
            href={href}
            aria-current={active ? "page" : undefined}
            aria-label={collapsed ? label : undefined}
            className={primaryClass}
          >
            {body}
          </a>
        ) : (
          <button
            type="button"
            disabled={disabled}
            onClick={onClick}
            aria-current={active ? "page" : undefined}
            aria-label={collapsed ? label : undefined}
            className={cx(primaryClass, "border-0 bg-transparent")}
          >
            {body}
          </button>
        )}
        <div className="flex h-32 shrink-0 items-center pr-6">
          <TailAction extra={extras} collapsed={collapsed} copyDelay={copyDelay} />
        </div>
      </div>
    )
  }

  if (href && !disabled) {
    return (
      <a
        href={href}
        title={tooltip}
        aria-current={active ? "page" : undefined}
        aria-label={collapsed ? label : undefined}
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
      aria-label={collapsed ? label : undefined}
      className={cx(surface, "focus-visible:shadow-misc-focus border-0 outline-none", className)}
    >
      {body}
    </button>
  )
}

function TailAction({
  extra,
  collapsed,
  copyDelay,
}: {
  extra: { icon: PhosphorIcon; label: string; onClick: () => void }
  collapsed: boolean
  copyDelay: number
}) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      initial={false}
      animate={collapsed ? { opacity: 0, width: 0 } : { opacity: 1, width: 20 }}
      transition={reduce ? { duration: 0 } : railCopyTransition(!collapsed, copyDelay)}
      className="overflow-hidden shrink-0"
      aria-hidden={collapsed || undefined}
      inert={collapsed || undefined}
    >
      <Button
        iconOnly
        size="xs"
        style="ghost"
        leadIcon={extra.icon}
        aria-label={extra.label}
        tabIndex={collapsed ? -1 : undefined}
        onClick={extra.onClick}
        className="size-20"
      />
    </motion.div>
  )
}
