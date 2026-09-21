import type { Icon as PhosphorIcon } from "@phosphor-icons/react"
import { forwardRef, type KeyboardEvent, type ReactNode } from "react"
import { Icon } from "./Icon"
import { cx } from "./cx"

export type TabItemShape = "rounded" | "pill"

export type TabItemProps = {
  children: ReactNode
  selected?: boolean
  icon?: PhosphorIcon
  disabled?: boolean
  onClick?: () => void
  /** `pill` is the filter popover; everywhere else is `rounded`. */
  shape?: TabItemShape
  className?: string
}

export function TabItem({
  children,
  selected = false,
  icon,
  disabled = false,
  onClick,
  shape = "rounded",
  className,
}: TabItemProps) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={selected}
      tabIndex={selected ? 0 : -1}
      disabled={disabled}
      onClick={onClick}
      className={cx(
        "inline-flex shrink-0 items-center justify-center gap-4 overflow-hidden px-10 py-6 outline-none",
        shape === "pill" ? "rounded-full" : "rounded-sm",
        "focus-visible:shadow-misc-focus",
        "disabled:text-text-hint disabled:cursor-not-allowed",
        selected
          // Inside stroke as an inset ring, so a selected tab stays 26px tall.
          ? "bg-bg-state-secondary text-text-default shadow-[inset_0_0_0_1px_var(--ds-color-border-darker),var(--ds-shadow-component)]"
          : "bg-bg-state-ghost hover:bg-bg-state-ghost-hover active:bg-bg-state-ghost-press text-text-muted hover:text-text-default",
        className,
      )}
    >
      {icon ? <Icon icon={icon} size={16} /> : null}
      <span className="text-heading-subsection px-2 whitespace-nowrap">
        {children}
      </span>
    </button>
  )
}

export type TabDefinition = {
  value: string
  label: string
  icon?: PhosphorIcon
  disabled?: boolean
}

export type TabsShape = "contained" | "rail" | "pills"

export type TabsProps = {
  items: TabDefinition[]
  value: string
  onValueChange: (value: string) => void
  /** `rail` is discovery; `pills` is the filter popover. */
  shape?: TabsShape
  className?: string
}

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(function Tabs(
  {
    items,
    value,
    onValueChange,
    shape = "contained",
    className,
  },
  ref,
) {
  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const enabled = items.filter((item) => !item.disabled)
    const current = enabled.findIndex((item) => item.value === value)
    if (current === -1) return

    let next = current
    switch (event.key) {
      case "ArrowRight":
        next = (current + 1) % enabled.length
        break
      case "ArrowLeft":
        next = (current - 1 + enabled.length) % enabled.length
        break
      case "Home":
        next = 0
        break
      case "End":
        next = enabled.length - 1
        break
      default:
        return
    }

    event.preventDefault()
    onValueChange(enabled[next].value)
  }

  const trackClass = (() => {
    switch (shape) {
      case "contained":
        return "bg-bg-state-soft inline-flex gap-2 overflow-hidden rounded-sm p-2"
      case "rail":
        return "gap-8 overflow-x-auto scrollbar-none [&::-webkit-scrollbar]:hidden"
      case "pills":
        return "w-full gap-8 p-10"
      default: {
        const exhaustive: never = shape
        return exhaustive
      }
    }
  })()

  return (
    <div
      ref={ref}
      role="tablist"
      onKeyDown={handleKeyDown}
      className={cx("flex items-center", trackClass, className)}
    >
      {items.map((item) => (
        <TabItem
          key={item.value}
          icon={item.icon}
          selected={item.value === value}
          disabled={item.disabled}
          shape={shape === "pills" ? "pill" : "rounded"}
          onClick={() => onValueChange(item.value)}
        >
          {item.label}
        </TabItem>
      ))}
    </div>
  )
})
