import { cx } from "./cx"

export type ChatItemProps = {
  title: string
  date: string
  unread?: boolean
  href?: string
  className?: string
}

export function ChatItem({
  title,
  date,
  unread = false,
  href,
  className,
}: ChatItemProps) {
  const classNames = cx(
    "bg-bg-state-ghost hover:bg-bg-state-ghost-hover border-border-default flex w-full items-center gap-10 border-b p-16",
    className,
  )

  const body = (
    <>
      <span className="text-body-large text-text-default min-w-0 flex-1 truncate">
        {title}
      </span>
      {unread ? (
        <span
          className="bg-bg-state-brand size-8 shrink-0 rounded-full"
          aria-label="Unread"
          role="img"
        />
      ) : null}
      <span className="text-body-large text-text-subtle shrink-0">{date}</span>
    </>
  )

  if (href) {
    return (
      <a
        href={href}
        className={cx(
          classNames,
          "focus-visible:shadow-misc-focus outline-none",
        )}
      >
        {body}
      </a>
    )
  }

  return <div className={classNames}>{body}</div>
}
