import { Plus } from "@phosphor-icons/react"
import {
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react"
import { createPortal } from "react-dom"
import type { SocialName } from "./brands"
import { Avatar } from "./Avatar"
import { Button } from "./Button"
import { Divider } from "./Divider"
import { DropdownMenuItem } from "./DropdownMenu"
import { FilterButton } from "./FilterButton"
import { SocialLogo } from "./PublicationLogo"
import { SearchInput } from "./SearchInput"
import { Tabs } from "./Tabs"
import { cx } from "./cx"

export type FilterTab = "topics" | "sources" | "channels"

export type FilterOption = {
  id: string
  label: string
  imageSrc?: string
}

export type FilterChannelOption = {
  name: SocialName
  label: string
}

export type FilterValue = {
  topicIds: string[]
  sourceIds: string[]
  channels: SocialName[]
}

export const emptyFilterValue: FilterValue = {
  topicIds: [],
  sourceIds: [],
  channels: [],
}

export function filterCount(value: FilterValue): number {
  return value.topicIds.length + value.sourceIds.length + value.channels.length
}

const tabs: { value: FilterTab; label: string }[] = [
  { value: "topics", label: "Topics" },
  { value: "sources", label: "Sources" },
  { value: "channels", label: "Channels" },
]

function toggleId(list: string[], id: string): string[] {
  return list.includes(id) ? list.filter((item) => item !== id) : [...list, id]
}

function toggleChannel(
  list: SocialName[],
  name: SocialName,
): SocialName[] {
  return list.includes(name)
    ? list.filter((item) => item !== name)
    : [...list, name]
}

function matchesQuery(label: string, query: string): boolean {
  if (!query) return true
  return label.toLowerCase().includes(query.toLowerCase())
}

export type FilterProps = {
  value: FilterValue
  onChange: (value: FilterValue) => void
  topics: FilterOption[]
  sources: FilterOption[]
  channels: FilterChannelOption[]
  onCreateTopic?: () => void
  onCreateSource?: () => void
  id?: string
  className?: string
}

export function Filter({
  value,
  onChange,
  topics,
  sources,
  channels,
  onCreateTopic,
  onCreateSource,
  id,
  className,
}: FilterProps) {
  const [tab, setTab] = useState<FilterTab>("topics")
  const [query, setQuery] = useState("")

  const visibleTopics = useMemo(
    () => topics.filter((topic) => matchesQuery(topic.label, query)),
    [topics, query],
  )
  const visibleSources = useMemo(
    () => sources.filter((source) => matchesQuery(source.label, query)),
    [sources, query],
  )
  const visibleChannels = useMemo(
    () =>
      channels.filter((channel) =>
        matchesQuery(channel.label, query),
      ),
    [channels, query],
  )

  function handleTabChange(next: string) {
    switch (next) {
      case "topics":
      case "sources":
      case "channels":
        setTab(next)
        setQuery("")
        return
      default:
        return
    }
  }

  const list = (() => {
    switch (tab) {
      case "topics":
        return visibleTopics.map((topic) => (
          <DropdownMenuItem
            key={topic.id}
            variant="checkbox"
            checked={value.topicIds.includes(topic.id)}
            onChange={() =>
              onChange({
                ...value,
                topicIds: toggleId(value.topicIds, topic.id),
              })
            }
            leading={
              <Avatar src={topic.imageSrc} name={topic.label} size="xs" />
            }
          >
            {topic.label}
          </DropdownMenuItem>
        ))
      case "sources":
        return visibleSources.map((source) => (
          <DropdownMenuItem
            key={source.id}
            variant="checkbox"
            checked={value.sourceIds.includes(source.id)}
            onChange={() =>
              onChange({
                ...value,
                sourceIds: toggleId(value.sourceIds, source.id),
              })
            }
            leading={
              <Avatar src={source.imageSrc} name={source.label} size="xs" />
            }
          >
            {source.label}
          </DropdownMenuItem>
        ))
      case "channels":
        return visibleChannels.map((channel) => (
          <DropdownMenuItem
            key={channel.name}
            variant="checkbox"
            checked={value.channels.includes(channel.name)}
            onChange={() =>
              onChange({
                ...value,
                channels: toggleChannel(value.channels, channel.name),
              })
            }
            leading={
              <span className="flex size-20 shrink-0 items-center justify-center">
                <SocialLogo name={channel.name} className="size-16" labelled />
              </span>
            }
          >
            {channel.label}
          </DropdownMenuItem>
        ))
      default: {
        const exhaustive: never = tab
        return exhaustive
      }
    }
  })()

  const empty =
    (tab === "topics" && visibleTopics.length === 0) ||
    (tab === "sources" && visibleSources.length === 0) ||
    (tab === "channels" && visibleChannels.length === 0)

  const footer = (() => {
    switch (tab) {
      case "topics":
        return onCreateTopic ? (
          <CreateFooter label="New Topic" onClick={onCreateTopic} />
        ) : null
      case "sources":
        return onCreateSource ? (
          <CreateFooter label="New Source" onClick={onCreateSource} />
        ) : null
      case "channels":
        return null
      default: {
        const exhaustive: never = tab
        return exhaustive
      }
    }
  })()

  return (
    <div
      id={id}
      role="dialog"
      aria-label="Filter"
      className={cx(
        "bg-bg-default shadow-modal-lg flex w-258 flex-col gap-4 rounded-md pb-6",
        className,
      )}
    >
      <Tabs
        shape="pills"
        items={tabs}
        value={tab}
        onValueChange={handleTabChange}
      />
      <SearchInput
        appearance="menu"
        placeholder="Search"
        value={query}
        onChange={(event) => setQuery(event.currentTarget.value)}
      />
      <div className="flex max-h-280 flex-col overflow-y-auto">
        {empty ? (
          <p className="text-body-default text-text-muted px-16 py-8">
            No matches
          </p>
        ) : (
          list
        )}
      </div>
      {footer}
    </div>
  )
}

function CreateFooter({
  label,
  onClick,
}: {
  label: string
  onClick: () => void
}) {
  return (
    <>
      <div className="px-0 py-2">
        <Divider style="solid" />
      </div>
      <div className="px-12 py-8">
        <Button
          size="sm"
          style="secondary"
          leadIcon={Plus}
          fullWidth
          onClick={onClick}
        >
          {label}
        </Button>
      </div>
    </>
  )
}

export type FilterMenuProps = FilterProps & {
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

const MENU_GAP = 8
const VIEWPORT_PAD = 8

export function FilterMenu({
  open: openProp,
  onOpenChange,
  className,
  ...filterProps
}: FilterMenuProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false)
  const open = openProp ?? uncontrolledOpen
  const triggerRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const dialogId = useId()
  const count = filterCount(filterProps.value)
  const [style, setStyle] = useState<CSSProperties>({})

  function setOpen(next: boolean) {
    onOpenChange?.(next)
    if (openProp === undefined) setUncontrolledOpen(next)
  }

  useLayoutEffect(() => {
    if (!open) return undefined

    function place() {
      const trigger = triggerRef.current
      const panel = panelRef.current
      if (!trigger || !panel) return

      const rect = trigger.getBoundingClientRect()
      const menuWidth = panel.offsetWidth
      const menuHeight = panel.offsetHeight
      const maxLeft = window.innerWidth - menuWidth - VIEWPORT_PAD
      const left = Math.min(
        Math.max(VIEWPORT_PAD, rect.right - menuWidth),
        maxLeft,
      )
      const below = rect.bottom + MENU_GAP
      const openUp =
        below + menuHeight > window.innerHeight - VIEWPORT_PAD &&
        rect.top - MENU_GAP - menuHeight >= VIEWPORT_PAD

      setStyle({
        left,
        top: openUp
          ? Math.max(VIEWPORT_PAD, rect.top - MENU_GAP - menuHeight)
          : below,
      })
    }

    place()
    const panel = panelRef.current
    const observer = panel ? new ResizeObserver(place) : null
    if (panel) observer?.observe(panel)
    window.addEventListener("resize", place)
    window.addEventListener("scroll", place, true)
    return () => {
      observer?.disconnect()
      window.removeEventListener("resize", place)
      window.removeEventListener("scroll", place, true)
    }
  }, [open])

  useEffect(() => {
    if (!open) return undefined

    function close() {
      onOpenChange?.(false)
      if (openProp === undefined) setUncontrolledOpen(false)
    }

    function handlePointer(event: PointerEvent) {
      const target = event.target as Node | null
      if (!target) return
      if (triggerRef.current?.contains(target)) return
      if (panelRef.current?.contains(target)) return
      close()
    }

    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.stopPropagation()
        close()
        triggerRef.current?.querySelector("button")?.focus()
      }
    }

    document.addEventListener("pointerdown", handlePointer)
    document.addEventListener("keydown", handleKey)
    return () => {
      document.removeEventListener("pointerdown", handlePointer)
      document.removeEventListener("keydown", handleKey)
    }
  }, [open, openProp, onOpenChange])

  return (
    <div ref={triggerRef} className={cx("relative", className)}>
      <FilterButton
        selected={count > 0}
        count={count > 0 ? count : undefined}
        open={open}
        aria-controls={open ? dialogId : undefined}
        onClick={() => setOpen(!open)}
      />
      {open
        ? createPortal(
            <div ref={panelRef} className="fixed z-50" style={style}>
              <Filter {...filterProps} id={dialogId} />
            </div>,
            document.body,
          )
        : null}
    </div>
  )
}
