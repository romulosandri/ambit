import { CardLink, cardLinkRootClassName } from "./CardLink"
import { SaveControl } from "./SaveButton"
import { cx } from "./cx"

export type TopicItemProps = {
  title: string
  meta?: string
  href?: string
  saved?: boolean
  onSave?: () => void
  className?: string
}

export function TopicItem({
  title,
  meta,
  href,
  saved = false,
  onSave,
  className,
}: TopicItemProps) {
  return (
    <div
      className={cx(
        "group bg-bg-state-ghost hover:bg-bg-state-ghost-hover flex w-full items-center gap-10 rounded-md p-12",
        (href || onSave) && cardLinkRootClassName,
        className,
      )}
    >
      <h3 className="text-heading-section text-text-default min-w-0 flex-1 truncate">
        {href ? <CardLink href={href}>{title}</CardLink> : title}
      </h3>
      {onSave ? (
        <SaveControl saved={saved} onSave={onSave} label="topic" />
      ) : null}
      {meta ? (
        <span className="text-body-default text-text-subtle shrink-0">
          {meta}
        </span>
      ) : null}
    </div>
  )
}
