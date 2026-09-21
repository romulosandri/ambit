import { Check, type Icon as PhosphorIcon } from "@phosphor-icons/react"
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
  type RefObject,
} from "react"
import { createPortal } from "react-dom"
import { Checkbox } from "./Checkbox"
import { Icon } from "./Icon"
import { cx } from "./cx"

export type DropdownOption = {
  value: string
  label: string
  icon?: PhosphorIcon
  disabled?: boolean
}

export type DropdownMenuProps = {
  open: boolean
  onClose: () => void
  anchor: RefObject<HTMLElement | null>
  align?: "start" | "end"
  labelledBy?: string
  children: ReactNode
  className?: string
}

const MENU_GAP = 4
const VIEWPORT_PAD = 8

export function DropdownMenu({
  open,
  onClose,
  anchor,
  align = "start",
  labelledBy,
  children,
  className,
}: DropdownMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null)
  const [style, setStyle] = useState<CSSProperties>({})

  useLayoutEffect(() => {
    if (!open) return undefined

    function place() {
      const trigger = anchor.current
      const menu = menuRef.current
      if (!trigger || !menu) return

      const rect = trigger.getBoundingClientRect()
      const menuWidth = Math.max(menu.offsetWidth, rect.width, 160)
      const menuHeight = menu.offsetHeight
      const maxLeft = window.innerWidth - menuWidth - VIEWPORT_PAD
      const left =
        align === "end"
          ? Math.min(Math.max(VIEWPORT_PAD, rect.right - menuWidth), maxLeft)
          : Math.min(Math.max(VIEWPORT_PAD, rect.left), maxLeft)

      const below = rect.bottom + MENU_GAP
      const openUp =
        below + menuHeight > window.innerHeight - VIEWPORT_PAD &&
        rect.top - MENU_GAP - menuHeight >= VIEWPORT_PAD

      setStyle({
        left,
        minWidth: menuWidth,
        top: openUp
          ? Math.max(VIEWPORT_PAD, rect.top - MENU_GAP - menuHeight)
          : below,
      })
    }

    place()
    window.addEventListener("resize", place)
    window.addEventListener("scroll", place, true)
    return () => {
      window.removeEventListener("resize", place)
      window.removeEventListener("scroll", place, true)
    }
  }, [align, anchor, open])

  useEffect(() => {
    if (!open) return undefined

    function handlePointer(event: PointerEvent) {
      const target = event.target as Node | null
      if (!target) return
      if (anchor.current?.contains(target)) return
      if (menuRef.current?.contains(target)) return
      onClose()
    }

    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.stopPropagation()
        onClose()
        anchor.current?.focus()
      }
    }

    document.addEventListener("pointerdown", handlePointer)
    document.addEventListener("keydown", handleKey)
    return () => {
      document.removeEventListener("pointerdown", handlePointer)
      document.removeEventListener("keydown", handleKey)
    }
  }, [anchor, onClose, open])

  if (!open) return null

  return createPortal(
    <div
      ref={menuRef}
      role="menu"
      aria-labelledby={labelledBy}
      style={style}
      className={cx(
        "bg-bg-default shadow-modal-lg fixed z-50 flex max-h-320 flex-col overflow-y-auto rounded-md p-4",
        className,
      )}
    >
      {children}
    </div>,
    document.body,
  )
}

export type DropdownMenuItemVariant = "checkbox" | "action"

export type DropdownMenuItemProps = {
  children: ReactNode
  variant?: DropdownMenuItemVariant
  leading?: ReactNode
  checked?: boolean
  selected?: boolean
  onChange?: (checked: boolean) => void
  icon?: PhosphorIcon
  onSelect?: () => void
  tone?: "default" | "destructive"
  disabled?: boolean
  className?: string
}

export function DropdownMenuItem({
  children,
  variant = "action",
  leading,
  checked = false,
  selected = false,
  onChange,
  icon,
  onSelect,
  tone = "default",
  disabled = false,
  className,
}: DropdownMenuItemProps) {
  switch (variant) {
    case "checkbox":
      return (
        <label
          className={cx(
            "flex w-full items-start px-4",
            disabled ? "cursor-not-allowed" : "cursor-pointer",
            className,
          )}
        >
          <span className="bg-bg-state-ghost hover:bg-bg-state-ghost-hover flex min-w-0 flex-1 items-center gap-4 rounded-xs p-6">
            <Checkbox
              checked={checked}
              onChange={onChange}
              disabled={disabled}
            />
            {leading}
            <span
              className={cx(
                "text-body-default min-w-0 flex-1 px-4",
                disabled ? "text-text-hint" : "text-text-default",
              )}
            >
              {children}
            </span>
          </span>
        </label>
      )
    case "action":
      return (
        <button
          type="button"
          role={selected ? "menuitemradio" : "menuitem"}
          aria-checked={selected || undefined}
          disabled={disabled}
          onClick={() => {
            if (disabled) return
            onSelect?.()
          }}
          className={cx(
            "flex min-h-32 w-full items-center gap-4 rounded-xs p-6 outline-none",
            "text-body-default text-left whitespace-nowrap",
            "focus-visible:shadow-misc-focus",
            selected
              ? "bg-bg-state-soft text-text-default"
              : "bg-bg-state-ghost hover:bg-bg-state-ghost-hover active:bg-bg-state-ghost-press",
            tone === "destructive" ? "text-text-destructive" : "text-text-default",
            disabled && "text-text-hint cursor-not-allowed",
            className,
          )}
        >
          {icon ? (
            <Icon
              icon={icon}
              size={16}
              box={20}
              tone={tone === "destructive" ? "destructive" : "inherit"}
            />
          ) : (
            leading
          )}
          <span className="min-w-0 flex-1 px-4">{children}</span>
          {selected ? <Icon icon={Check} size={16} /> : null}
        </button>
      )
    default: {
      const exhaustive: never = variant
      return exhaustive
    }
  }
}

export type DropdownSelectItemProps = DropdownMenuItemProps
export const DropdownSelectItem = DropdownMenuItem

export function DropdownMenuSeparator({ className }: { className?: string }) {
  return (
    <div
      role="separator"
      className={cx("border-border-default mx-4 my-2 h-0 border-t", className)}
    />
  )
}
