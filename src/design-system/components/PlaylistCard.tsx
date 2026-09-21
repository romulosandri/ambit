import { Cover } from "./Cover"
import { CardLink, cardLinkRootClassName } from "./CardLink"
import { SaveControl } from "./SaveButton"
import { cx } from "./cx"
import { PressableArticle } from "@/motion"

export type PlaylistCardProps = {
  title: string
  /** Chip shown over the artwork. Defaults to the title. */
  caption?: string
  imageSrc?: string
  href?: string
  saved?: boolean
  onSave?: () => void
  className?: string
}

export function PlaylistCard({
  title,
  caption,
  imageSrc,
  href,
  saved = false,
  onSave,
  className,
}: PlaylistCardProps) {
  return (
    <PressableArticle
      // Width comes from the rail or grid that owns the card (180px / 210px in
      // Figma), so it is deliberately not set here.
      className={cx(
        "group bg-bg-state-ghost hover:bg-bg-state-ghost-hover flex min-w-0 flex-col gap-12 rounded-md p-8",
        (href || onSave) && cardLinkRootClassName,
        className,
      )}
    >
      <div className="relative">
        <Cover src={imageSrc} caption={caption ?? title} />
        {onSave ? (
          <SaveControl
            saved={saved}
            onSave={onSave}
            label="topic"
            className="absolute top-8 right-8"
          />
        ) : null}
      </div>
      <h3 className="text-heading-subsection text-text-default w-full truncate">
        {href ? <CardLink href={href}>{title}</CardLink> : title}
      </h3>
    </PressableArticle>
  )
}
