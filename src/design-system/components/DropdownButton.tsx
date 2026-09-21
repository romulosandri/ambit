import { CaretDown, type Icon as PhosphorIcon } from "@phosphor-icons/react"
import { useId, useRef, useState, type ReactNode } from "react"
import {
  DropdownMenu,
  DropdownSelectItem,
  type DropdownOption,
} from "./DropdownMenu"
import { Icon } from "./Icon"
import { cx } from "./cx"

export type { DropdownOption }

export type DropdownButtonProps = {
  children?: ReactNode
  options?: DropdownOption[]
  value?: string
  onChange?: (value: string) => void
  /** `composer` is the pill-shaped model picker inside `TextArea`. */
  variant?: "default" | "composer"
  open?: boolean
  onOpenChange?: (open: boolean) => void
  leadIcon?: PhosphorIcon
  disabled?: boolean
  onClick?: () => void
  align?: "start" | "end"
  className?: string
}

export function DropdownButton({
  children,
  options,
  value,
  onChange,
  variant = "default",
  open: openProp,
  onOpenChange,
  leadIcon,
  disabled = false,
  onClick,
  align = "start",
  className,
}: DropdownButtonProps) {
  const isComposer = variant === "composer"
  const triggerRef = useRef<HTMLButtonElement>(null)
  const triggerId = useId()
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false)
  const [uncontrolledValue, setUncontrolledValue] = useState(value)
  const open = openProp ?? uncontrolledOpen
  const selectedValue = value ?? uncontrolledValue
  const selected = options?.find((option) => option.value === selectedValue)
  const label = children ?? selected?.label

  function setOpen(next: boolean) {
    onOpenChange?.(next)
    if (openProp === undefined) setUncontrolledOpen(next)
  }

  function handleSelect(next: string) {
    setUncontrolledValue(next)
    onChange?.(next)
    setOpen(false)
  }

  return (
    <>
      <button
        ref={triggerRef}
        id={triggerId}
        type="button"
        disabled={disabled}
        onClick={() => {
          onClick?.()
          if (options && options.length > 0) setOpen(!open)
        }}
        aria-haspopup="menu"
        aria-expanded={open}
        className={cx(
          "text-text-default inline-flex shrink-0 items-center justify-center gap-4 overflow-hidden outline-none",
          "focus-visible:shadow-misc-focus",
          "disabled:bg-bg-state-disabled disabled:text-text-hint disabled:cursor-not-allowed disabled:shadow-none",
          isComposer
            ? "bg-bg-state-ghost hover:bg-bg-state-ghost-hover active:bg-bg-state-ghost-press h-28 rounded-full px-10 py-6"
            : "bg-bg-state-secondary hover:bg-bg-state-secondary-hover active:bg-bg-state-secondary-press border-border-default shadow-component h-24 rounded-sm border px-6 py-4",
          open &&
            (isComposer
              ? "bg-bg-state-ghost-press"
              : "bg-bg-state-secondary-press"),
          className,
        )}
      >
        {leadIcon ? <Icon icon={leadIcon} size={16} /> : null}
        <span
          className={cx(
            "px-2 whitespace-nowrap",
            isComposer ? "text-heading-subsection" : "text-body-small",
          )}
        >
          {label}
        </span>
        <Icon
          icon={CaretDown}
          size={16}
          className={cx("transition-transform", open && "rotate-180")}
        />
      </button>
      {options && options.length > 0 ? (
        <DropdownMenu
          open={open}
          onClose={() => setOpen(false)}
          anchor={triggerRef}
          align={align}
          labelledBy={triggerId}
        >
          {options.map((option) => (
            <DropdownSelectItem
              key={option.value}
              icon={option.icon}
              selected={option.value === selectedValue}
              disabled={option.disabled}
              onSelect={() => handleSelect(option.value)}
            >
              {option.label}
            </DropdownSelectItem>
          ))}
        </DropdownMenu>
      ) : null}
    </>
  )
}
