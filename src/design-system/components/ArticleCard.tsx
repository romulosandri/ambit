import { ChannelLead, MetaRow, SourceLine } from "./ArticleMeta"
import { Badge, type BadgeColor } from "./Badge"
import { CardLink, cardLinkRootClassName } from "./CardLink"
import { Cover } from "./Cover"
import { SaveControl } from "./SaveButton"
import type { SocialName } from "./brands"
import { cx } from "./cx"

export type ArticleType = "news" | "articles" | "post"

export type ArticleCardProps = {
  title: string
  source: string
  logoSrc?: string
  type?: ArticleType
  person?: boolean
  channel?: SocialName
  badge?: { label: string; color: BadgeColor }
  sources?: number
  readTime?: string
  time?: string
  imageSrc?: string
  saved?: boolean
  onSave?: () => void
  href?: string
  className?: string
}

const typeBadge: Record<ArticleType, { label: string; color: BadgeColor }> = {
  news: { label: "News", color: "cyan" },
  articles: { label: "Analysis", color: "violet" },
  post: { label: "Post", color: "pink" },
}

export function ArticleCard({
  title,
  source,
  logoSrc,
  type = "news",
  person = false,
  channel,
  badge,
  sources,
  readTime,
  time,
  imageSrc,
  saved = false,
  onSave,
  href,
  className,
}: ArticleCardProps) {
  const resolvedBadge = badge ?? typeBadge[type]

  return (
    <article
      className={cx(
        "group bg-bg-state-ghost hover:bg-bg-state-ghost-hover flex h-148 w-full items-center gap-6 rounded-md p-16 max-md:h-auto max-md:items-start",
        href && cardLinkRootClassName,
        className,
      )}
    >
      <div className="flex min-w-0 flex-1 flex-col gap-16">
        <div className="flex flex-col gap-8">
          <div className="flex h-28 min-w-0 items-center gap-12 max-md:h-auto max-md:flex-wrap">
            <SourceLine
              source={source}
              logoSrc={logoSrc}
              person={person}
              social={!person && type === "post"}
            />
            <Badge color={resolvedBadge.color}>{resolvedBadge.label}</Badge>
            {onSave ? (
              <SaveControl saved={saved} onSave={onSave} label="article" />
            ) : null}
          </div>
          <h3 className="text-body-card text-text-default line-clamp-2">
            {href ? <CardLink href={href}>{title}</CardLink> : title}
          </h3>
        </div>
        <MetaRow
          lead={channel ? <ChannelLead channel={channel} /> : undefined}
          items={[
            channel || sources === undefined ? undefined : `${sources} Sources`,
            readTime,
            time,
          ]}
        />
      </div>
      {/* 116px square: the 148px card height minus its 16px padding. */}
      <Cover src={imageSrc} size="md" radius="sm" />
    </article>
  )
}
