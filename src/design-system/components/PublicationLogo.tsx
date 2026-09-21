import { socialLogos } from "../assets"
import type { PublicationName, SocialName } from "./brands"
import { cx } from "./cx"
import { Image } from "./Image"

export type BrandMarkProps = {
  name: string
  /** Brand asset URL. Without one, a token-styled initial stands in. */
  src?: string
  size?: "sm" | "fill"
  shape?: "rounded" | "circle"
  /** Pass the name through when the mark stands alone; cards already render it as text. */
  labelled?: boolean
  className?: string
}

function BrandMark({
  name,
  src,
  size = "sm",
  shape = "rounded",
  labelled = false,
  className,
}: BrandMarkProps) {
  return (
    <span
      className={cx(
        "bg-bg-basic-gray-subtle text-text-subtle inline-flex shrink-0 items-center justify-center overflow-hidden",
        size === "sm" ? "size-12" : "size-full",
        shape === "circle" ? "rounded-full" : "rounded-2xs",
        className,
      )}
    >
      {src ? (
        <Image
          src={src}
          alt={labelled ? name : ""}
          className="size-full object-cover"
        />
      ) : (
        <span className="text-body-small leading-none">{name.charAt(0)}</span>
      )}
    </span>
  )
}

export type PublicationLogoProps = Omit<BrandMarkProps, "name"> & {
  name: PublicationName | string
}

/**
 * Publication marks aren't in the repo yet, so this falls back to the source's
 * initial until a `src` is supplied.
 */
export function PublicationLogo(props: PublicationLogoProps) {
  return <BrandMark {...props} />
}

export type SocialLogoProps = Omit<BrandMarkProps, "name"> & {
  name: SocialName | string
}

export function SocialLogo({ name, src, ...rest }: SocialLogoProps) {
  return (
    <BrandMark
      name={name}
      src={src ?? socialLogos[name as SocialName]}
      {...rest}
    />
  )
}
