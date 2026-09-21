import { AudioButton } from "./AudioButton"
import { Button } from "./Button"
import { CardLink, cardLinkControlClassName, cardLinkRootClassName } from "./CardLink"
import { Cover } from "./Cover"
import { SaveButton, SaveControl } from "./SaveButton"
import { cx } from "./cx"

export type DailyBriefVerticalCardProps = {
  title: string
  month: string
  date: string
  imageSrc?: string
  href?: string
  saved?: boolean
  onSave?: () => void
  className?: string
}

export function DailyBriefVerticalCard({
  title,
  month,
  date,
  imageSrc,
  href,
  saved = false,
  onSave,
  className,
}: DailyBriefVerticalCardProps) {
  return (
    <article
      // Width comes from the rail or grid that owns the card, as in Figma.
      className={cx(
        "group bg-bg-state-ghost hover:bg-bg-state-ghost-hover flex min-w-0 flex-col gap-12 rounded-md p-8",
        (href || onSave) && cardLinkRootClassName,
        className,
      )}
    >
      <div className="relative">
        <Cover src={imageSrc} overline={month} caption={date} />
        {onSave ? (
          <SaveControl
            saved={saved}
            onSave={onSave}
            label="brief"
            className="absolute top-8 right-8"
          />
        ) : null}
      </div>
      <h3 className="text-heading-subsection text-text-default w-full truncate">
        {href ? <CardLink href={href}>{title}</CardLink> : title}
      </h3>
    </article>
  )
}

export type DailyBriefHorizontalCardProps = {
  title?: string
  summary: string
  month: string
  date: string
  duration?: string
  imageSrc?: string
  href?: string
  saved?: boolean
  onSave?: () => void
  className?: string
}

export function DailyBriefHorizontalCard({
  title = "Daily Brief",
  summary,
  month,
  date,
  duration,
  imageSrc,
  href,
  saved = false,
  onSave,
  className,
}: DailyBriefHorizontalCardProps) {
  return (
    <article
      className={cx(
        "group bg-bg-state-ghost hover:bg-bg-state-ghost-hover flex w-full items-center gap-16 rounded-md py-8 pr-16 pl-8 max-md:flex-col max-md:items-stretch max-md:pr-8",
        (href || onSave) && cardLinkRootClassName,
        className,
      )}
    >
      <Cover
        src={imageSrc}
        size="xl"
        overline={month}
        caption={date}
        insetHighlight
        className="max-md:h-180 max-md:min-w-0 max-md:w-full"
      />
      {/* items-start keeps the AudioButton hugging its content instead of
          stretching to the column width. */}
      <div className="flex min-w-0 flex-1 flex-col items-start gap-16">
        <div className="flex flex-col gap-10">
          <h2 className="text-heading-page text-text-default">
            {href ? <CardLink href={href}>{title}</CardLink> : title}
          </h2>
          <p className="text-body-default text-text-subtle max-w-280 max-md:max-w-none">
            {summary}
          </p>
        </div>
        {duration ? (
          <AudioButton duration={duration} className={cardLinkControlClassName} />
        ) : null}
      </div>
      <div
        className={cx(
          "flex shrink-0 items-center gap-6 opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100",
          "pointer-events-none group-hover:pointer-events-auto group-focus-within:pointer-events-auto",
          "max-md:pointer-events-auto max-md:opacity-100",
          cardLinkControlClassName,
        )}
      >
        {href ? (
          <Button
            size="sm"
            style="soft"
            onClick={(event) => {
              event.preventDefault()
              event.stopPropagation()
              window.location.hash = href
            }}
          >
            Read
          </Button>
        ) : null}
        {onSave ? (
          <SaveButton saved={saved} onSave={onSave} label="brief" />
        ) : null}
      </div>
    </article>
  )
}
