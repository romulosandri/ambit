import { Microphone, PaperPlaneRight, Plus } from "@phosphor-icons/react"
import type { KeyboardEvent, TextareaHTMLAttributes } from "react"
import { useEffect, useState } from "react"
import { Button } from "./Button"
import { DropdownButton } from "./DropdownButton"
import type { DropdownOption } from "./DropdownMenu"
import { cx } from "./cx"

export const composerModelOptions: DropdownOption[] = [
  { value: "Claude Opus 5", label: "Claude Opus 5" },
  { value: "Claude Sonnet 4.5", label: "Claude Sonnet 4.5" },
  { value: "Claude Haiku 4.5", label: "Claude Haiku 4.5" },
  { value: "GPT-5", label: "GPT-5" },
  { value: "Gemini 2.5 Pro", label: "Gemini 2.5 Pro" },
]

export type TextAreaProps = Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  "onSubmit"
> & {
  model?: string
  modelOptions?: DropdownOption[]
  modelMenuOpen?: boolean
  onModelChange?: (model: string) => void
  onModelClick?: () => void
  onAttach?: () => void
  onSubmit?: () => void
}

export function TextArea({
  model,
  modelOptions = composerModelOptions,
  modelMenuOpen,
  onModelChange,
  onModelClick,
  onAttach,
  onSubmit,
  placeholder = "Ask AI anything",
  value,
  disabled,
  className,
  "aria-label": ariaLabel,
  onKeyDown,
  ...rest
}: TextAreaProps) {
  const hasText = typeof value === "string" && value.trim().length > 0
  const [selectedModel, setSelectedModel] = useState(
    model ?? modelOptions[0]?.value,
  )

  useEffect(() => {
    if (model !== undefined) setSelectedModel(model)
  }, [model])

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    onKeyDown?.(event)
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault()
      onSubmit?.()
    }
  }

  return (
    <div
      className={cx(
        "bg-bg-input border-border-default shadow-card flex h-120 w-full min-w-0 flex-col gap-6 overflow-hidden rounded-card-md border px-12 pt-10 pb-12 max-md:h-100",
        "focus-within:border-border-input-highlight focus-within:shadow-input-focus",
        disabled && "bg-bg-input-disabled",
        className,
      )}
    >
      <textarea
        placeholder={placeholder}
        aria-label={ariaLabel ?? placeholder}
        value={value}
        disabled={disabled}
        onKeyDown={handleKeyDown}
        className={cx(
          "text-body-default text-text-default placeholder:text-text-muted min-h-0 w-full flex-1 resize-none bg-transparent outline-none",
          "disabled:text-text-hint disabled:cursor-not-allowed",
        )}
        {...rest}
      />
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            iconOnly
            size="sm"
            style="soft"
            shape="pill"
            leadIcon={Plus}
            aria-label="Attach file"
            disabled={disabled}
            onClick={onAttach}
          />
          {model ? (
            <DropdownButton
              variant="composer"
              options={modelOptions}
              value={selectedModel}
              open={modelMenuOpen}
              disabled={disabled}
              onClick={onModelClick}
              onChange={(next) => {
                setSelectedModel(next)
                onModelChange?.(next)
              }}
            />
          ) : null}
        </div>
        <div className="flex items-center gap-4">
          <Button
            iconOnly
            size="sm"
            style="soft"
            shape="pill"
            leadIcon={hasText ? PaperPlaneRight : Microphone}
            aria-label={hasText ? "Send message" : "Dictate"}
            disabled={disabled}
            onClick={onSubmit}
          />
        </div>
      </div>
    </div>
  )
}
