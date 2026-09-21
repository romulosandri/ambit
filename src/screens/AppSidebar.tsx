import { useState } from "react"
import { Sidebar, type AccountActionId, type SidebarItemId } from "@ds"
import { subscriptionCount, user } from "@/data"
import { useNavDrawer } from "@/layout"
import { useAppNav } from "@/navigation"

const SIDEBAR_COLLAPSED_KEY = "ambit.sidebarCollapsed"

function readCollapsed(): boolean {
  try {
    if (typeof window === "undefined") return false
    return window.localStorage.getItem(SIDEBAR_COLLAPSED_KEY) === "true"
  } catch {
    return false
  }
}

function writeCollapsed(collapsed: boolean) {
  collapsedMemory = collapsed
  try {
    window.localStorage.setItem(SIDEBAR_COLLAPSED_KEY, String(collapsed))
  } catch {
    // Private mode / quota — keep the in-memory toggle either way.
  }
}

let collapsedMemory = readCollapsed()

export function AppSidebar({ activeItem }: { activeItem?: SidebarItemId }) {
  const { navigate } = useAppNav()
  const drawer = useNavDrawer()
  const [collapsed, setCollapsed] = useState(collapsedMemory)

  function handleNavigate(id: SidebarItemId) {
    switch (id) {
      case "home":
        navigate({ name: "home" })
        break
      case "discovery":
        navigate({ name: "discovery" })
        break
      case "daily-briefs":
        navigate({ name: "briefs" })
        break
      case "chats":
        navigate({ name: "chats" })
        break
      case "saved":
        navigate({ name: "saved" })
        break
      case "subscriptions":
        navigate({ name: "subscriptions" })
        break
      case "widgets":
      case "customize":
        break
      default: {
        const exhaustive: never = id
        return exhaustive
      }
    }
    drawer?.close()
  }

  function handleAddSubscription() {
    navigate({ name: "subscriptions", modal: "choose" })
    drawer?.close()
  }

  function handleCollapse() {
    if (drawer?.compact) {
      drawer.close()
      return
    }
    setCollapsed((current) => {
      const next = !current
      writeCollapsed(next)
      return next
    })
  }

  function handleAccountAction(id: AccountActionId) {
    switch (id) {
      case "profile":
        return
      case "preferences":
        handleNavigate("customize")
        return
      case "sign-out":
        navigate({ name: "auth" })
        drawer?.close()
        return
      default: {
        const exhaustive: never = id
        return exhaustive
      }
    }
  }

  return (
    <Sidebar
      activeItem={activeItem}
      user={user}
      subscriptionCount={subscriptionCount}
      collapsed={drawer?.compact ? false : collapsed}
      onNavigate={handleNavigate}
      onAddSubscription={handleAddSubscription}
      onCollapse={handleCollapse}
      onAccountAction={handleAccountAction}
    />
  )
}
