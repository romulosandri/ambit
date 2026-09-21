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
import {
  microOffset,
  motion,
  motionDuration,
  RailCopy,
  railItemDelay,
  railSpring,
  railWidth,
  useReducedMotion,
} from "@/motion"
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

const SETTINGS_INDEX = primaryItems.length
const WIDGETS_INDEX = SETTINGS_INDEX + 1
const SUBSCRIPTIONS_INDEX = WIDGETS_INDEX + 1
const CUSTOMIZE_INDEX = SUBSCRIPTIONS_INDEX + 1
const ACCOUNT_INDEX = CUSTOMIZE_INDEX + 1

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
  const reduce = useReducedMotion()

  function handleAccountAction(id: AccountActionId) {
    setAccountOpen(false)
    onAccountAction?.(id)
  }

  return (
    <motion.nav
      aria-label="Main"
      initial={false}
      animate={{ width: collapsed ? railWidth.collapsed : railWidth.expanded }}
      transition={reduce ? { duration: 0 } : railSpring}
      className={cx(
        "bg-bg-muted flex h-full shrink-0 flex-col items-start overflow-hidden",
        className,
      )}
    >
      <div className="flex w-full items-center justify-between p-16">
        <motion.div
          initial={false}
          animate={
            collapsed
              ? { opacity: 0, x: -microOffset, width: 0 }
              : { opacity: 1, x: 0, width: 85 }
          }
          transition={
            reduce
              ? { duration: 0 }
              : {
                  width: railSpring,
                  opacity: {
                    duration: collapsed ? motionDuration.fast : motionDuration.normal,
                    delay: collapsed ? 0 : 0.04,
                  },
                  x: {
                    duration: collapsed ? motionDuration.fast : motionDuration.normal,
                    delay: collapsed ? 0 : 0.04,
                  },
                }
          }
          className="overflow-hidden shrink-0"
          aria-hidden={collapsed || undefined}
        >
          <Logo src={logoSrc} />
        </motion.div>
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
          {primaryItems.map((item, index) => (
            <li key={item.id}>
              <SidebarMenuItem
                icon={item.icon}
                active={activeItem === item.id}
                collapsed={collapsed}
                copyDelay={railItemDelay(index, collapsed)}
                onClick={() => onNavigate?.(item.id)}
              >
                {item.label}
              </SidebarMenuItem>
            </li>
          ))}
        </ul>

        <ul className="flex w-full flex-col gap-2 px-16 py-12">
          <motion.li
            initial={false}
            animate={
              collapsed
                ? { height: 0, opacity: 0 }
                : { height: "auto", opacity: 1 }
            }
            transition={
              reduce
                ? { duration: 0 }
                : {
                    duration: collapsed ? 0.16 : 0.24,
                    delay: railItemDelay(SETTINGS_INDEX, collapsed),
                  }
            }
            className="overflow-hidden"
            aria-hidden={collapsed || undefined}
          >
            <SidebarMenuItem variant="header">Settings</SidebarMenuItem>
          </motion.li>
          <li>
            <SidebarMenuItem
              icon={SquaresFour}
              tone="muted"
              trailingLabel="Soon"
              collapsed={collapsed}
              copyDelay={railItemDelay(WIDGETS_INDEX, collapsed)}
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
              copyDelay={railItemDelay(SUBSCRIPTIONS_INDEX, collapsed)}
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
              copyDelay={railItemDelay(CUSTOMIZE_INDEX, collapsed)}
              onClick={() => onNavigate?.("customize")}
            >
              Customize
            </SidebarMenuItem>
          </li>
        </ul>
      </div>

      <div className="flex w-full items-center gap-8 overflow-hidden p-16">
        <motion.button
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
          initial={false}
          animate={{
            paddingRight: collapsed ? 6 : 12,
            gap: collapsed ? 0 : 6,
          }}
          transition={reduce ? { duration: 0 } : railSpring}
          className={cx(
            "bg-bg-state-soft hover:bg-bg-state-soft-hover focus-visible:shadow-misc-focus flex items-center justify-center overflow-hidden rounded-full py-6 pl-6 outline-none",
            accountOpen && "bg-bg-state-soft-press",
          )}
        >
          <Avatar src={user.avatarSrc} name="" />
          <RailCopy
            visible={!collapsed}
            delay={railItemDelay(ACCOUNT_INDEX, collapsed)}
            className="flex items-center"
          >
            <span className="text-heading-subsection text-text-default px-2 whitespace-nowrap">
              {user.name}
            </span>
            <Icon
              icon={CaretDown}
              size={20}
              className={cx("transition-transform", accountOpen && "rotate-180")}
            />
          </RailCopy>
        </motion.button>
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
    </motion.nav>
  )
}
