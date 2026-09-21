import { BackButton } from "@/layout"
import { useAppNav } from "@/navigation"

export function AppBackButton({ pill = false }: { pill?: boolean }) {
  const { goBack } = useAppNav()
  return <BackButton pill={pill} onClick={goBack} />
}
