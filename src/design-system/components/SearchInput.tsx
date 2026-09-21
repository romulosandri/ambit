import { MagnifyingGlass } from "@phosphor-icons/react"
import type { InputHTMLAttributes } from "react"
import { Icon } from "./Icon"
import { cx } from "./cx"

export type SearchInputAppearance = "soft" | "menu"

export type SearchInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "size"
> & {
  /** Keyboard hint rendered as a trailing badge, e.g. `"/"`. */
  shortcut?: string
  size?: "sm" | "md"
  /** `menu` is the flush 36px field inside the filter popover. */
  appearance?: SearchInputAppearance
}

export function SearchInput({
  shortcut,
  size = "sm",
  appearance = "soft",
  placeholder,
  className,
  disabled,
  "aria-label": ariaLabel,
  ...rest
}: SearchInputProps) {
  const menu = appearance === "menu"

  return (
    <div
      className={cx(
        "flex min-w-0 items-center gap-6 overflow-hidden px-8 py-6",
        menu
          ? "bg-bg-input h-36 w-full rounded-none border-0 border-b border-border-darker"
          : cx(
              "bg-bg-input-soft rounded-md border border-transparent",
              size === "sm" ? "h-32" : "h-36",
            ),
        "focus-within:border-border-input-highlight focus-within:shadow-input-focus",
        disabled && "bg-bg-input-disabled",
        className,
      )}
    >
      <Icon icon={MagnifyingGlass} size={16} box={20} tone="muted" />
      <input
        type="search"
        placeholder={placeholder}
        aria-label={ariaLabel ?? placeholder}
        disabled={disabled}
        className={cx(
          "text-body-default text-text-default min-w-0 flex-1 bg-transparent px-4 outline-none",
          menu ? "placeholder:text-text-hint" : "placeholder:text-text-muted",
          "disabled:text-text-hint disabled:cursor-not-allowed",
          "[&::-webkit-search-cancel-button]:hidden",
        )}
        {...rest}
      />
      {shortcut ? (
        <span
          aria-hidden
          className="border-border-default text-body-small text-text-muted inline-flex h-20 min-w-20 items-center justify-center rounded-xs border px-4 max-md:hidden"
        >
          {shortcut}
        </span>
      ) : null}
    </div>
  )
}
