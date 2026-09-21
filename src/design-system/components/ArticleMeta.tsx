import { Fragment, type ReactNode } from "react"
import { Avatar } from "./Avatar"
import { PublicationLogo, SocialLogo } from "./PublicationLogo"
import type { SocialName } from "./brands"
import { cx } from "./cx"

/** The publication mark + name pair shared by every article-shaped card. */
export function SourceLine({
  source,
  logoSrc,
  social = false,
  person = false,
  className,
}: {
  source: string
  logoSrc?: string
  social?: boolean
  person?: boolean
  className?: string
}) {
  return (
    <span className={cx("flex min-w-0 items-center gap-4", className)}>
      {person ? (
        <Avatar src={logoSrc} name={source} size="xs" className="size-12" />
      ) : social ? (
        <SocialLogo name={source} src={logoSrc} />
      ) : (
        <PublicationLogo name={source} src={logoSrc} />
      )}
      <span className="text-body-small text-text-subtle truncate">
        {source}
      </span>
    </span>
  )
}

/** "18 Sources · 4 min read · 1h ago", dot-separated. */
export function MetaRow({
  items,
  lead,
  className,
}: {
  items: (string | undefined)[]
  lead?: ReactNode
  className?: string
}) {
  const present = items.filter((item): item is string => Boolean(item))

  return (
    <span
      className={cx(
        "text-body-small text-text-muted flex flex-wrap items-center gap-6",
        className,
      )}
    >
      {lead}
      {present.map((item, index) => (
        <Fragment key={item}>
          {index > 0 || lead ? (
            <span
              aria-hidden
              className="bg-text-muted size-4 shrink-0 rounded-full"
            />
          ) : null}
          <span className="whitespace-nowrap">{item}</span>
        </Fragment>
      ))}
    </span>
  )
}

export function ChannelLead({ channel }: { channel: SocialName }) {
  return (
    <span className="flex items-center gap-4">
      <SocialLogo name={channel} />
      <span className="whitespace-nowrap">{channel === "Twitter (X)" ? "X" : channel}</span>
    </span>
  )
}
