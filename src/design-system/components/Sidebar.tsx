import {
  BookmarkSimple,
  CaretDown,
  ChatText,
  Compass,
  Gear,
  House,
  Images,
  Newspaper,
  Plus,
  SidebarSimple,
  SignOut,
  SlidersHorizontal,
  SquaresFour,
  UserCircle,
} from "@phosphor-icons/react"
import { useId, useRef, useState } from "react"
import { Avatar } from "./Avatar"
import { Badge } from "./Badge"
import { Button } from "./Button"
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "./DropdownMenu"
import { Icon } from "./Icon"
import { Logo } from "./Logo"
import { SidebarMenuItem } from "./SidebarMenuItem"
import { cx } from "./cx"

export type SidebarItemId =
  | "home"
  | "discovery"
  | "daily-briefs"
  | "chats"
  | "saved"
  | "widgets"
  | "subscriptions"
  | "customize"

export type AccountActionId = "profile" | "preferences" | "sign-out"

export type SidebarProps = {
  activeItem?: SidebarItemId
  user: { name: string; avatarSrc?: string }
  subscriptionCount?: number
  logoSrc?: string
  collapsed?: boolean
  onNavigate?: (id: SidebarItemId) => void
  onCollapse?: () => void
  onAddSubscription?: () => void
  onAccountClick?: () => void
  onAccountAction?: (id: AccountActionId) => void
  className?: string
}

const primaryItems = [
  { id: "home", label: "Home", icon: House },
  { id: "discovery", label: "Discovery", icon: Compass },
  { id: "daily-briefs", label: "Daily Briefs", icon: Newspaper },
  { id: "chats", label: "Chats", icon: ChatText },
  { id: "saved", label: "Saved", icon: BookmarkSimple },
] satisfies { id: SidebarItemId; label: string; icon: typeof House }[]

export function Sidebar({
  activeItem,
  user,
  subscriptionCount,
  logoSrc,
  collapsed = false,
  onNavigate,
  onCollapse,
  onAddSubscription,
  onAccountClick,
  onAccountAction,
  className,
}: SidebarProps) {
  const accountTriggerRef = useRef<HTMLButtonElement>(null)
  const accountTriggerId = useId()
  const [accountOpen, setAccountOpen] = useState(false)

  function handleAccountAction(id: AccountActionId) {
    setAccountOpen(false)
    onAccountAction?.(id)
  }

  return (
    <nav
      aria-label="Main"
      className={cx(
        "bg-bg-muted flex h-full shrink-0 flex-col items-start overflow-hidden transition-[width] duration-200 motion-reduce:transition-none",
        collapsed ? "w-64" : "w-280",
        className,
      )}
    >
      <div
        className={cx(
          "flex w-full items-center p-16",
          collapsed ? "justify-end" : "justify-between",
        )}
      >
        {collapsed ? null : <Logo src={logoSrc} />}
        <Button
          iconOnly
          size="md"
          style="ghost"
          leadIcon={SidebarSimple}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          aria-expanded={!collapsed}
          onClick={onCollapse}
        />
      </div>

      <div className="flex min-h-0 w-full flex-1 flex-col overflow-hidden">
        <ul className="flex w-full flex-col gap-2 px-16 pt-16 pb-8">
          {primaryItems.map((item) => (
            <li key={item.id}>
              <SidebarMenuItem
                icon={item.icon}
                active={activeItem === item.id}
                collapsed={collapsed}
                onClick={() => onNavigate?.(item.id)}
              >
                {item.label}
              </SidebarMenuItem>
            </li>
          ))}
        </ul>

        <ul className="flex w-full flex-col gap-2 px-16 py-12">
          {collapsed ? null : (
            <li>
              <SidebarMenuItem variant="header">Settings</SidebarMenuItem>
            </li>
          )}
          <li>
            <SidebarMenuItem
              icon={SquaresFour}
              tone="muted"
              trailingLabel="Soon"
              collapsed={collapsed}
              disabled
            >
              Widgets
            </SidebarMenuItem>
          </li>
          <li>
            <SidebarMenuItem
              icon={Images}
              active={activeItem === "subscriptions"}
              collapsed={collapsed}
              badge={
                subscriptionCount === undefined ? undefined : (
                  <Badge>{subscriptionCount}</Badge>
                )
              }
              tailAction={{
                icon: Plus,
                label: "Add subscription",
                onClick: () => onAddSubscription?.(),
              }}
              onClick={() => onNavigate?.("subscriptions")}
            >
              Subscriptions
            </SidebarMenuItem>
          </li>
          <li>
            <SidebarMenuItem
              icon={Gear}
              active={activeItem === "customize"}
              collapsed={collapsed}
              onClick={() => onNavigate?.("customize")}
            >
              Customize
            </SidebarMenuItem>
          </li>
        </ul>
      </div>

      <div className="flex w-full items-center gap-8 p-16">
        <button
          ref={accountTriggerRef}
          id={accountTriggerId}
          type="button"
          aria-haspopup="menu"
          aria-expanded={accountOpen}
          aria-label={collapsed ? user.name : undefined}
          title={collapsed ? user.name : undefined}
          onClick={() => {
            setAccountOpen((open) => !open)
            onAccountClick?.()
          }}
          className={cx(
            "bg-bg-state-soft hover:bg-bg-state-soft-hover focus-visible:shadow-misc-focus flex items-center justify-center overflow-hidden rounded-full outline-none",
            accountOpen && "bg-bg-state-soft-press",
            collapsed ? "p-6" : "gap-6 py-6 pr-12 pl-6",
          )}
        >
          <Avatar src={user.avatarSrc} name="" />
          {collapsed ? null : (
            <>
              <span className="text-heading-subsection text-text-default px-2 whitespace-nowrap">
                {user.name}
              </span>
              <Icon
                icon={CaretDown}
                size={20}
                className={cx("transition-transform", accountOpen && "rotate-180")}
              />
            </>
          )}
        </button>
        <DropdownMenu
          open={accountOpen}
          onClose={() => setAccountOpen(false)}
          anchor={accountTriggerRef}
          labelledBy={accountTriggerId}
        >
          <DropdownMenuItem
            variant="action"
            icon={UserCircle}
            onSelect={() => handleAccountAction("profile")}
          >
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem
            variant="action"
            icon={SlidersHorizontal}
            onSelect={() => handleAccountAction("preferences")}
          >
            Preferences
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            variant="action"
            icon={SignOut}
            tone="destructive"
            onSelect={() => handleAccountAction("sign-out")}
          >
            Sign out
          </DropdownMenuItem>
        </DropdownMenu>
      </div>
    </nav>
  )
}
