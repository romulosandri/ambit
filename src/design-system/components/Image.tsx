import { useState, type ImgHTMLAttributes, type Ref } from "react"
import { cx } from "./cx"

export type ImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> & {
  src: string
  ref?: Ref<HTMLImageElement>
}

/**
 * Content image that fills its box with `bg-default` when the file fails to
 * load, so the browser's broken-image icon never shows.
 */
export function Image({
  src,
  alt = "",
  className,
  onError,
  ref,
  ...rest
}: ImageProps) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null)
  const failed = failedSrc === src

  if (failed) {
    return (
      <span
        aria-hidden={alt ? undefined : true}
        role={alt ? "img" : undefined}
        aria-label={alt || undefined}
        className={cx("bg-bg-default block", className)}
      />
    )
  }

  return (
    <img
      ref={ref}
      src={src}
      alt={alt}
      className={className}
      onError={(event) => {
        setFailedSrc(src)
        onError?.(event)
      }}
      {...rest}
    />
  )
}
