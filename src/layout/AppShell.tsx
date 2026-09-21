import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"
import { SidebarSimple } from "@phosphor-icons/react"
import { Button } from "@ds"
import { cx } from "@ds/components/cx"
import { COMPACT_NAV_QUERY, useMediaQuery } from "./useMediaQuery"

type NavDrawerContextValue = {
  open: boolean
  compact: boolean
  close: () => void
  setOpen: (open: boolean) => void
}

const NavDrawerContext = createContext<NavDrawerContextValue | null>(null)

export function useNavDrawer() {
  return useContext(NavDrawerContext)
}

export type AppShellProps = {
  sidebar: ReactNode
  /** The composer dock, pinned to the bottom of the panel. */
  dock?: ReactNode
  /** Full-shell overlay (modals). Covers the sidebar and the page together. */
  overlay?: ReactNode
  /** Pinned to the panel (Back). Stays put while the column scrolls. */
  topBar?: ReactNode
  children: ReactNode
  className?: string
}

/** Fills its parent's height, so the container that mounts it owns the viewport. */
export function AppShell({
  sidebar,
  dock,
  overlay,
  topBar,
  children,
  className,
}: AppShellProps) {
  const compact = useMediaQuery(COMPACT_NAV_QUERY)
  const [open, setOpen] = useState(false)

  const close = useCallback(() => setOpen(false), [])

  useEffect(() => {
    if (!compact) setOpen(false)
  }, [compact])

  useEffect(() => {
    if (!open) return undefined

    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") close()
    }

    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [open, close])

  const nav = useMemo(
    () => ({ open, compact, close, setOpen }),
    [open, compact, close],
  )

  const drawerHidden = compact && !open

  return (
    <NavDrawerContext.Provider value={nav}>
      <div
        className={cx(
          "bg-bg-muted relative flex h-full w-full overflow-hidden",
          className,
        )}
      >
        {open ? (
          <button
            type="button"
            aria-label="Close menu"
            className="bg-bg-overlay absolute inset-0 z-20 lg:hidden"
            onClick={close}
          />
        ) : null}

        <div
          id="app-sidebar"
          inert={drawerHidden}
          aria-hidden={drawerHidden}
          className={cx(
            "flex h-full w-fit shrink-0 flex-col",
            "max-lg:absolute max-lg:inset-y-0 max-lg:left-0 max-lg:z-30 max-lg:w-280 max-lg:shadow-modal-md max-lg:transition-transform max-lg:duration-200",
            drawerHidden && "max-lg:pointer-events-none max-lg:-translate-x-full",
          )}
        >
          {sidebar}
        </div>

        <div
          className="flex min-w-0 flex-1 flex-col p-12 max-lg:p-8 max-md:p-0"
          inert={compact && open}
        >
          <main className="bg-bg-subtle relative flex min-h-0 flex-1 flex-col overflow-hidden rounded-card-md max-md:rounded-none">
            <div className="flex shrink-0 items-center gap-8 px-16 pt-16 pb-4 lg:hidden">
              <Button
                iconOnly
                size="md"
                style="ghost"
                leadIcon={SidebarSimple}
                aria-label="Open menu"
                aria-expanded={open}
                aria-controls="app-sidebar"
                onClick={() => setOpen(true)}
              />
              {topBar}
            </div>
            {topBar ? (
              <div className="pointer-events-none absolute inset-x-0 top-0 z-10 hidden p-24 lg:block">
                <div className="pointer-events-auto w-fit">{topBar}</div>
              </div>
            ) : null}
            {/* A stable gutter keeps the 640px column centred whether or not the
                page scrolls, matching the Figma frame. */}
            <div className="min-h-0 flex-1 overflow-y-auto scrollbar-gutter-both max-md:scrollbar-gutter-auto">
              {children}
            </div>
            {dock}
          </main>
        </div>
        {overlay}
      </div>
    </NavDrawerContext.Provider>
  )
}

export type CenterContainerProps = {
  children: ReactNode
  /** Adds bottom padding so content scrolls clear of the composer dock. */
  hasDock?: boolean
  className?: string
}

export function CenterContainer({
  children,
  hasDock = false,
  className,
}: CenterContainerProps) {
  return (
    <div
      className={cx(
        "mx-auto flex w-640 max-w-full flex-col gap-24 pt-48 max-lg:px-24 max-lg:pt-24 max-md:gap-20 max-md:px-16",
        hasDock ? "pb-224 max-md:pb-176" : "pb-48 max-md:pb-24",
        className,
      )}
    >
      {children}
    </div>
  )
}
