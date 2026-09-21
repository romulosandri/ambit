import { MetaRow, SourceLine } from "./ArticleMeta"
import { AudioButton } from "./AudioButton"
import { Badge, type BadgeColor } from "./Badge"
import { CardLink, cardLinkControlClassName, cardLinkRootClassName } from "./CardLink"
import { Cover } from "./Cover"
import { SaveControl } from "./SaveButton"
import { cx } from "./cx"

export type FeaturedArticleCardProps = {
  title: string
  description: string
  source: string
  logoSrc?: string
  badge?: { label: string; color: BadgeColor }
  sources?: number
  readTime?: string
  time?: string
  duration: string
  imageSrc?: string
  href?: string
  saved?: boolean
  onSave?: () => void
  className?: string
}

export function FeaturedArticleCard({
  title,
  description,
  source,
  logoSrc,
  badge = { label: "Featured Article", color: "cyan" },
  sources,
  readTime,
  time,
  duration,
  imageSrc,
  href,
  saved = false,
  onSave,
  className,
}: FeaturedArticleCardProps) {
  return (
    <article
      className={cx(
        "group bg-bg-state-ghost hover:bg-bg-state-ghost-hover flex h-260 w-full items-center gap-16 rounded-md p-8 max-md:h-auto max-md:flex-col max-md:items-stretch",
        (href || onSave) && cardLinkRootClassName,
        className,
      )}
    >
      {/* items-start keeps the AudioButton hugging its content. */}
      <div className="flex min-w-0 flex-1 flex-col items-start gap-16">
        <div className="flex h-28 min-w-0 items-center gap-12 max-md:h-auto max-md:flex-wrap">
          <SourceLine source={source} logoSrc={logoSrc} />
          <Badge color={badge.color}>{badge.label}</Badge>
          {onSave ? (
            <SaveControl saved={saved} onSave={onSave} label="article" />
          ) : null}
        </div>
        <div className="flex w-full flex-col gap-10">
          {/* The only card title set in the headline family. */}
          <h2 className="text-heading-page text-text-default">
            {href ? <CardLink href={href}>{title}</CardLink> : title}
          </h2>
          <p className="text-body-default text-text-subtle max-md:line-clamp-3">
            {description}
          </p>
        </div>
        <AudioButton duration={duration} className={cardLinkControlClassName} />
        <MetaRow
          items={[
            sources === undefined ? undefined : `${sources} Sources`,
            readTime,
            time,
          ]}
        />
      </div>
      <Cover
        src={imageSrc}
        size="2xl"
        className="max-md:h-180 max-md:min-w-0 max-md:w-full"
      />
    </article>
  )
}
