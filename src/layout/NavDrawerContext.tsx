import { createContext, useContext } from "react"

export type NavDrawerContextValue = {
  open: boolean
  compact: boolean
  close: () => void
  setOpen: (open: boolean) => void
}

export const NavDrawerContext = createContext<NavDrawerContextValue | null>(
  null,
)

export function useNavDrawer() {
  return useContext(NavDrawerContext)
}
