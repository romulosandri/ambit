import { TextArea, type TextAreaProps } from "@ds"
import { cx } from "@ds/components/cx"

export type BottomContainerProps = TextAreaProps & {
  /** Legal line under the composer. */
  disclaimer?: string
  containerClassName?: string
}

export function BottomContainer({
  disclaimer = "Ambit can make mistakes. Check important info.",
  containerClassName,
  ...textAreaProps
}: BottomContainerProps) {
  return (
    <div
      className={cx(
        "pointer-events-none absolute inset-x-0 bottom-0 flex flex-col",
        containerClassName,
      )}
    >
      {/* Figma ships this fade as a PNG; a CSS gradient on bg/subtle is the
          same pixels and survives a change to the panel colour. */}
      <div
        aria-hidden
        className="to-bg-subtle h-32 w-full bg-gradient-to-b from-transparent"
      />
      <div className="bg-bg-subtle pointer-events-auto flex flex-col items-center gap-12 px-16 pb-16 max-md:px-12 max-md:pb-[max(12px,env(safe-area-inset-bottom))]">
        <TextArea {...textAreaProps} className="w-full max-w-770" />
        <p className="text-body-default text-text-muted text-center">
          {disclaimer}
        </p>
      </div>
    </div>
  )
}
