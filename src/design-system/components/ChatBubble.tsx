import {
  ArrowsClockwise,
  Copy,
  type Icon as PhosphorIcon,
  ThumbsDown,
  ThumbsUp,
} from "@phosphor-icons/react"
import type { ReactNode } from "react"
import { Button } from "./Button"
import { LinkButton } from "./LinkButton"
import { cx } from "./cx"

export type ChatBubbleAction = {
  icon: PhosphorIcon
  label: string
  onClick?: () => void
}

export type ChatBubbleProps = {
  type: "user" | "ai"
  children: ReactNode
  sourceLabel?: string
  onSourceClick?: () => void
  timestamp?: string
  citations?: ReactNode
  actions?: ChatBubbleAction[]
  className?: string
}

const defaultActions: ChatBubbleAction[] = [
  { icon: Copy, label: "Copy answer" },
  { icon: ThumbsUp, label: "Good response" },
  { icon: ThumbsDown, label: "Bad response" },
  { icon: ArrowsClockwise, label: "Regenerate" },
]

export function ChatBubble({
  type,
  children,
  sourceLabel,
  onSourceClick,
  timestamp,
  citations,
  actions = defaultActions,
  className,
}: ChatBubbleProps) {
  if (type === "user") {
    return (
      <div
        className={cx(
          "bg-bg-state-soft border-border-default flex w-full items-center overflow-hidden rounded-md border px-16 py-12",
          className,
        )}
      >
        <p className="text-body-reading text-text-default min-w-0 flex-1">
          {children}
        </p>
      </div>
    )
  }

  return (
    <div
      className={cx("flex w-full flex-col gap-16 px-16 py-12", className)}
    >
      {sourceLabel ? (
        <LinkButton tone="default" onClick={onSourceClick}>
          {sourceLabel}
        </LinkButton>
      ) : null}
      <p className="text-body-reading text-text-default">{children}</p>
      {citations ? (
        <div className="flex flex-wrap gap-8">{citations}</div>
      ) : null}
      <div className="flex min-h-24 flex-wrap items-center gap-16">
        <div className="flex items-center gap-4">
          {actions.map((action) => (
            <Button
              key={action.label}
              iconOnly
              size="xs"
              style="ghost"
              leadIcon={action.icon}
              aria-label={action.label}
              onClick={action.onClick}
              className="text-text-muted hover:text-text-default"
            />
          ))}
        </div>
        {timestamp ? (
          <time className="text-body-small text-text-muted">{timestamp}</time>
        ) : null}
      </div>
    </div>
  )
}
