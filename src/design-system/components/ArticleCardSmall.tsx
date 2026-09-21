import { SourceLine } from "./ArticleMeta"
import { CardLink, cardLinkRootClassName } from "./CardLink"
import { Cover } from "./Cover"
import { cx } from "./cx"

export type ArticleCardSmallProps = {
  title: string
  source: string
  logoSrc?: string
  person?: boolean
  social?: boolean
  imageSrc?: string
  href?: string
  className?: string
}

export function ArticleCardSmall({
  title,
  source,
  logoSrc,
  person = false,
  social = false,
  imageSrc,
  href,
  className,
}: ArticleCardSmallProps) {
  return (
    <article
      className={cx(
        "bg-bg-state-ghost hover:bg-bg-state-ghost-hover border-border-default flex w-360 max-w-full items-start gap-12 rounded-md border p-12",
        href && cardLinkRootClassName,
        className,
      )}
    >
      <Cover src={imageSrc} size="sm" radius="sm" />
      <div className="flex min-w-0 flex-1 flex-col gap-8">
        <SourceLine
          source={source}
          logoSrc={logoSrc}
          person={person}
          social={social}
        />
        <h4 className="text-body-default text-text-default line-clamp-3">
          {href ? <CardLink href={href}>{title}</CardLink> : title}
        </h4>
      </div>
    </article>
  )
}
