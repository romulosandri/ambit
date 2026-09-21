import { PublicationLogo } from "./PublicationLogo"
import { CardLink, cardLinkRootClassName } from "./CardLink"
import { cx } from "./cx"

export type SourceCardProps = {
  name: string
  logoSrc?: string
  href?: string
  className?: string
}

export function SourceCard({ name, logoSrc, href, className }: SourceCardProps) {
  return (
    <article
      className={cx(
        "bg-bg-state-ghost hover:bg-bg-state-ghost-hover flex flex-col items-center gap-8 rounded-md p-8",
        href && cardLinkRootClassName,
        className,
      )}
    >
      {/* source-icon: Figma's 2.571px stroke is a scaled 2px — snapped to stroke-lg. */}
      <span className="border-border-strong flex size-72 shrink-0 items-center justify-center rounded-full border-2">
        <PublicationLogo
          name={name}
          src={logoSrc}
          size="fill"
          shape="circle"
          className="size-62"
        />
      </span>
      <span className="text-body-small text-text-subtle max-w-full truncate">
        {href ? <CardLink href={href}>{name}</CardLink> : name}
      </span>
    </article>
  )
}
