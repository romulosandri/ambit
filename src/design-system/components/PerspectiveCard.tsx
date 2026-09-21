import { Cover } from "./Cover"
import { SourceLine } from "./ArticleMeta"
import { CardLink, cardLinkRootClassName } from "./CardLink"
import { cx } from "./cx"

export type PerspectiveCardProps = {
  title: string
  source: string
  logoSrc?: string
  social?: boolean
  imageSrc?: string
  href?: string
  className?: string
}

export function PerspectiveCard({
  title,
  source,
  logoSrc,
  social = false,
  imageSrc,
  href,
  className,
}: PerspectiveCardProps) {
  return (
    <article
      className={cx(
        "bg-bg-state-soft border-border-default flex items-start gap-12 rounded-md border p-12",
        href && cardLinkRootClassName,
        className,
      )}
    >
      <Cover src={imageSrc} size="sm" radius="sm" />
      <div className="flex min-w-0 flex-1 flex-col gap-8">
        <SourceLine source={source} logoSrc={logoSrc} social={social} />
        <h3 className="text-body-reading text-text-default line-clamp-2">
          {href ? <CardLink href={href}>{title}</CardLink> : title}
        </h3>
      </div>
    </article>
  )
}
