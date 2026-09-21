import type { Icon as PhosphorIcon } from "@phosphor-icons/react"
import { Icon } from "./Icon"
import { Radio } from "./Radio"
import { cx } from "./cx"

export type ChoiceCardProps = {
  title: string
  description?: string
  icon?: PhosphorIcon
  name?: string
  value?: string
  selected?: boolean
  onChange?: () => void
  disabled?: boolean
  className?: string
}

export function ChoiceCard({
  title,
  description,
  icon,
  name,
  value,
  selected = false,
  onChange,
  disabled = false,
  className,
}: ChoiceCardProps) {
  const detailed = Boolean(description || icon)

  return (
    <label
      className={cx(
        "bg-bg-muted relative flex w-full overflow-hidden rounded-card-sm p-16",
        // Inside strokes so selected (2px) and idle (1px) don't shift the box.
        selected
          ? "shadow-[inset_0_0_0_2px_var(--color-text-informative),inset_0px_-1px_0px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.05)]"
          : "shadow-[inset_0_0_0_1px_var(--color-border-darker),inset_0px_-1px_0px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.05)]",
        disabled ? "cursor-not-allowed" : "cursor-pointer",
        className,
      )}
    >
      <span
        className={cx(
          "flex w-full gap-10",
          detailed ? "items-start" : "items-center",
        )}
      >
        <span className="flex h-20 w-20 shrink-0 items-center justify-center">
          <Radio
            name={name}
            value={value}
            checked={selected}
            onChange={() => onChange?.()}
            disabled={disabled}
          />
        </span>
        <span className="flex min-w-0 flex-1 flex-col gap-8">
          {icon ? <Icon icon={icon} size={16} tone="default" /> : null}
          <span
            className={cx(
              "flex flex-col",
              description ? "gap-4" : "gap-0",
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
          </span>
        </span>
      </span>
    </label>
  )
}
