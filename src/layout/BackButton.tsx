import { ArrowLeft } from "@phosphor-icons/react"
import { Button } from "@ds"

export type BackButtonProps = {
  /** New chat uses a pill; every other details screen is rounded. */
  pill?: boolean
  onClick?: () => void
}

export function BackButton({ pill = false, onClick }: BackButtonProps) {
  return (
    <Button
      size="xs"
      shape={pill ? "pill" : "rounded"}
      borderStyle="dashed"
      leadIcon={ArrowLeft}
      onClick={onClick}
    >
      Back
    </Button>
  )
}
