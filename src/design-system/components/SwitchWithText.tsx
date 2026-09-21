import { Switch } from "./Switch"
import { cx } from "./cx"

export type SwitchWithTextProps = {
  title: string
  description?: string
  checked?: boolean
  onChange?: (checked: boolean) => void
  disabled?: boolean
  className?: string
}

export function SwitchWithText({
  title,
  description,
  checked = false,
  onChange,
  disabled = false,
  className,
}: SwitchWithTextProps) {
  return (
    <div
      className={cx(
        "flex w-full gap-10",
        description ? "items-start" : "items-center",
        className,
      )}
    >
      <button
        type="button"
        disabled={disabled}
        onClick={() => onChange?.(!checked)}
        className={cx(
          "flex min-w-0 flex-1 flex-col gap-4 text-left",
          disabled ? "cursor-not-allowed" : "cursor-pointer",
        )}
      >
        <span
          className={cx(
            "text-heading-subsection",
            disabled ? "text-text-hint" : "text-text-default",
          )}
        >
          {title}
        </span>
        {description ? (
          <span
            className={cx(
              "text-body-default",
              disabled ? "text-text-hint" : "text-text-subtle",
            )}
          >
            {description}
          </span>
        ) : null}
      </button>
      <span className="flex h-20 shrink-0 items-center justify-center">
        <Switch
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          aria-label={title}
        />
      </span>
    </div>
  )
}
