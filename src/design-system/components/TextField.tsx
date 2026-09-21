import type { Icon as PhosphorIcon } from "@phosphor-icons/react"
import type {
  InputHTMLAttributes,
  ReactNode,
  TextareaHTMLAttributes,
} from "react"
import { useId } from "react"
import { Icon } from "./Icon"
import { cx } from "./cx"

export type TextFieldAppearance = "default" | "soft"

type FieldLabelProps = {
  htmlFor: string
  label: string
  required?: boolean
  tail?: ReactNode
}

function FieldLabel({ htmlFor, label, required, tail }: FieldLabelProps) {
  return (
    <div className="flex w-full items-center justify-between">
      <label
        htmlFor={htmlFor}
        className="text-heading-subsection text-text-default flex items-center gap-4"
      >
        {label}
        {required ? (
          <span className="text-text-destructive" aria-hidden>
            *
          </span>
        ) : null}
      </label>
      {tail ? <div className="flex h-20 items-center">{tail}</div> : null}
    </div>
  )
}

function FieldCaption({ caption }: { caption?: string }) {
  if (!caption) return null
  return <p className="text-body-small text-text-muted">{caption}</p>
}

export type TextFieldProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size"
> & {
  label: string
  /** Right-aligned slot in the label row, e.g. a "Forgot password?" link. */
  tail?: ReactNode
  invalid?: boolean
  required?: boolean
  caption?: string
  leadIcon?: PhosphorIcon
  /** Custom lead cluster, e.g. the phone-field country picker. */
  lead?: ReactNode
  /** Trailing control inside the field, e.g. a password-visibility toggle. */
  end?: ReactNode
  appearance?: TextFieldAppearance
}

export function TextField({
  label,
  tail,
  invalid = false,
  required = false,
  caption,
  leadIcon,
  lead,
  end,
  appearance = "default",
  id,
  className,
  disabled,
  type = "text",
  ...rest
}: TextFieldProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId

  return (
    <div className={cx("flex w-full flex-col gap-8", className)}>
      <FieldLabel
        htmlFor={inputId}
        label={label}
        required={required}
        tail={tail}
      />
      <div
        className={cx(
          "flex w-full items-center overflow-hidden rounded-md",
          appearance === "soft"
            ? "bg-bg-input-soft p-8"
            : "bg-bg-input shadow-component border p-8",
          appearance === "default" && "focus-within:shadow-input-focus",
          appearance === "default" &&
            (invalid
              ? "border-border-destructive focus-within:shadow-destructive-focus"
              : "border-border-darker hover:border-border-strong focus-within:border-border-input-highlight"),
          appearance === "soft" &&
            "focus-within:border-border-input-highlight focus-within:shadow-input-focus border border-transparent",
          disabled && "bg-bg-input-disabled",
        )}
      >
        <div className="flex min-w-0 flex-1 items-center gap-6">
          {lead}
          {!lead && leadIcon ? (
            <Icon icon={leadIcon} size={16} box={20} tone="muted" />
          ) : null}
          <input
            id={inputId}
            type={type}
            disabled={disabled}
            required={required}
            aria-invalid={invalid || undefined}
            className={cx(
              "text-body-default text-text-default placeholder:text-text-muted min-w-0 flex-1 bg-transparent px-4 outline-none",
              "disabled:text-text-hint disabled:cursor-not-allowed",
            )}
            {...rest}
          />
          {end}
        </div>
      </div>
      <FieldCaption caption={caption} />
    </div>
  )
}

export type LabeledTextAreaProps = Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  "onSubmit"
> & {
  label: string
  required?: boolean
  caption?: string
  invalid?: boolean
}

/** Labelled multi-line field used in forms — not the AI composer `TextArea`. */
export function LabeledTextArea({
  label,
  required = false,
  caption,
  invalid = false,
  id,
  className,
  disabled,
  ...rest
}: LabeledTextAreaProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId

  return (
    <div className={cx("flex w-full flex-col gap-8", className)}>
      <FieldLabel htmlFor={inputId} label={label} required={required} />
      <div
        className={cx(
          "bg-bg-input-soft flex min-h-148 w-full overflow-hidden rounded-card-md border border-transparent",
          "focus-within:border-border-input-highlight focus-within:shadow-input-focus",
          invalid && "border-border-destructive",
          disabled && "bg-bg-input-disabled",
        )}
      >
        <textarea
          id={inputId}
          disabled={disabled}
          required={required}
          aria-invalid={invalid || undefined}
          className={cx(
            "text-body-default text-text-default placeholder:text-text-muted min-h-0 w-full flex-1 resize-none bg-transparent px-12 py-10 outline-none",
            "disabled:text-text-hint disabled:cursor-not-allowed",
          )}
          {...rest}
        />
      </div>
      <FieldCaption caption={caption} />
    </div>
  )
}
