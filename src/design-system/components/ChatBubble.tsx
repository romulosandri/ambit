import {
  ArrowsClockwise,
  CaretRight,
  Copy,
  type Icon as PhosphorIcon,
  ThumbsDown,
  ThumbsUp,
} from "@phosphor-icons/react"
import { useRef, type ReactNode } from "react"
import { Button } from "./Button"
import { LinkButton } from "./LinkButton"
import { cx } from "./cx"
import {
  gsap,
  motion,
  prefersReducedMotion,
  presenceOffset,
  presenceTransition,
  useGSAP,
  useReducedMotion,
} from "@/motion"

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
      <UserBubble className={className}>{children}</UserBubble>
    )
  }

  return (
    <AiBubble
      sourceLabel={sourceLabel}
      onSourceClick={onSourceClick}
      timestamp={timestamp}
      citations={citations}
      actions={actions}
      className={className}
    >
      {children}
    </AiBubble>
  )
}

function UserBubble({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: presenceOffset }}
      animate={{ opacity: 1, y: 0 }}
      transition={presenceTransition}
      className={cx(
        "bg-bg-state-soft border-border-default flex w-full items-center overflow-hidden rounded-md border px-16 py-12",
        className,
      )}
    >
      <p className="text-body-reading text-text-default min-w-0 flex-1">
        {children}
      </p>
    </motion.div>
  )
}

function AiBubble({
  children,
  sourceLabel,
  onSourceClick,
  timestamp,
  citations,
  actions,
  className,
}: {
  children: ReactNode
  sourceLabel?: string
  onSourceClick?: () => void
  timestamp?: string
  citations?: ReactNode
  actions: ChatBubbleAction[]
  className?: string
}) {
  const rootRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } })
      tl.from("[data-chat-part='source']", {
        y: 8,
        opacity: 0,
        duration: 0.28,
      })
      tl.from(
        "[data-chat-part='body']",
        { y: 10, opacity: 0, duration: 0.4 },
        "-=0.12",
      )
      tl.from(
        "[data-chat-part='citations'] > *",
        { y: 10, opacity: 0, duration: 0.32, stagger: 0.06 },
        "-=0.18",
      )
      tl.from(
        "[data-chat-part='actions']",
        { y: 8, opacity: 0, duration: 0.28 },
        "-=0.16",
      )
    },
    { scope: rootRef },
  )

  return (
    <div
      ref={rootRef}
      className={cx("flex w-full flex-col gap-16 px-16 py-12", className)}
    >
      {sourceLabel ? (
        <div data-chat-part="source">
          <LinkButton
            size="sm"
            tone="muted"
            tailIcon={CaretRight}
            onClick={onSourceClick}
          >
            {sourceLabel}
          </LinkButton>
        </div>
      ) : null}
      <div
        data-chat-part="body"
        className="text-body-reading text-text-default whitespace-pre-wrap"
      >
        {children}
      </div>
      {citations ? (
        <div data-chat-part="citations" className="flex flex-wrap gap-8">
          {citations}
        </div>
      ) : null}
      <div
        data-chat-part="actions"
        className="flex min-h-24 flex-wrap items-center gap-16"
      >
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
