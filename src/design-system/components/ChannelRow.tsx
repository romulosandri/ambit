import { Checkbox } from "./Checkbox"
import { SocialLogo } from "./PublicationLogo"
import type { SocialName } from "./brands"
import { cx } from "./cx"

export type ChannelRowProps = {
  name: SocialName
  label?: string
  checked?: boolean
  onChange?: (checked: boolean) => void
  disabled?: boolean
  className?: string
}

export function ChannelRow({
  name,
  label,
  checked = false,
  onChange,
  disabled = false,
  className,
}: ChannelRowProps) {
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
        <span className="flex size-20 shrink-0 items-center justify-center">
          <SocialLogo name={name} className="size-16" labelled />
        </span>
        <span
          className={cx(
            "text-body-default min-w-0 flex-1 px-4",
            disabled ? "text-text-hint" : "text-text-default",
          )}
        >
          {label ?? name}
        </span>
      </span>
    </label>
  )
}
