import { useLayoutEffect, useRef, type ReactNode } from "react"
import { ModalOverlay, NewSubscriptionModal, type SidebarItemId } from "@ds"
import { AppShell, BottomContainer } from "@/layout"
import {
  AnimatePresence,
  motion,
  overlayTransition,
  peekAuthHandoff,
  presenceOffset,
  presenceTransition,
  useReducedMotion,
} from "@/motion"
import { chatsById } from "@/data"
import { useAppNav } from "@/navigation"
import type { AppRoute } from "@/navigation/types"
import { AppBackButton } from "./AppBackButton"
import { AppSidebar } from "./AppSidebar"
import { useComposer } from "./useComposer"

function sidebarItemFor(route: AppRoute): SidebarItemId | undefined {
  switch (route.name) {
    case "home":
      return "home"
    case "discovery":
      return "discovery"
    case "briefs":
    case "brief":
      return "daily-briefs"
    case "chats":
    case "chat":
      return "chats"
    case "saved":
      return "saved"
    case "subscriptions":
      return "subscriptions"
    case "topic":
    case "source":
    case "article":
    case "auth":
      return undefined
    default: {
      const exhaustive: never = route
      return exhaustive
    }
  }
}

function routeHasDock(route: AppRoute): boolean {
  switch (route.name) {
    case "home":
    case "discovery":
    case "chats":
    case "brief":
    case "topic":
    case "source":
    case "article":
      return true
    case "chat":
      return route.id !== "new"
    case "briefs":
    case "saved":
    case "subscriptions":
    case "auth":
      return false
    default: {
      const exhaustive: never = route
      return exhaustive
    }
  }
}

function presenceKey(route: AppRoute): string {
  switch (route.name) {
    case "home":
      return "home"
    case "discovery":
      return "discovery"
    case "briefs":
      return "briefs"
    case "brief":
      return `brief:${route.id}`
    case "chats":
      return "chats"
    case "chat":
      return `chat:${route.id}`
    case "subscriptions":
      return "subscriptions"
    case "saved":
      return "saved"
    case "topic":
      return `topic:${route.id}`
    case "source":
      return `source:${route.id}`
    case "article":
      return `article:${route.id}`
    case "auth":
      return "auth"
    default: {
      const exhaustive: never = route
      return exhaustive
    }
  }
}

function isDramaticRoute(route: AppRoute): boolean {
  switch (route.name) {
    case "article":
    case "brief":
    case "topic":
    case "source":
      return true
    case "chat":
      return route.id !== "new"
    case "home":
      return peekAuthHandoff()
    case "auth":
    case "discovery":
    case "briefs":
    case "chats":
    case "subscriptions":
    case "saved":
      return false
    default: {
      const exhaustive: never = route
      return exhaustive
    }
  }
}

function SignedInTopBar({ route }: { route: AppRoute }) {
  switch (route.name) {
    case "brief":
    case "topic":
    case "source":
    case "article":
      return <AppBackButton />
    case "chat":
      if (route.id === "new") return <AppBackButton pill />
      return (
        <div className="flex items-center gap-12">
          <AppBackButton pill />
          <p className="text-body-default text-text-subtle max-w-640 truncate">
            {chatsById[route.id]?.title}
          </p>
        </div>
      )
    case "home":
    case "discovery":
    case "briefs":
    case "chats":
    case "subscriptions":
    case "saved":
    case "auth":
      return null
    default: {
      const exhaustive: never = route
      return exhaustive
    }
  }
}

function ScreenFrame({
  route,
  children,
}: {
  route: AppRoute
  children: ReactNode
}) {
  const reduce = useReducedMotion()
  const dramatic = isDramaticRoute(route)
  const rootRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    rootRef.current?.parentElement?.scrollTo({ top: 0 })
  }, [route])

  return (
    <motion.div
      ref={rootRef}
      initial={
        reduce ? false : dramatic ? { opacity: 0 } : { opacity: 0, y: presenceOffset }
      }
      animate={{ opacity: 1, y: 0 }}
      exit={
        reduce
          ? { opacity: 0 }
          : dramatic
            ? { opacity: 0 }
            : { opacity: 0, y: 8 }
      }
      transition={presenceTransition}
      className="flex min-h-full flex-1 flex-col"
    >
      {children}
    </motion.div>
  )
}

function ScreenPresence({
  route,
  children,
}: {
  route: AppRoute
  children: ReactNode
}) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      <ScreenFrame key={presenceKey(route)} route={route}>
        {children}
      </ScreenFrame>
    </AnimatePresence>
  )
}

export function SignedInShell({ children }: { children: ReactNode }) {
  const { route, openSubscription, closeSubscription } = useAppNav()
  const composer = useComposer()
  const reduce = useReducedMotion()
  const showDock = routeHasDock(route)
  const subscriptionStep = route.modal ?? null

  return (
    <AppShell
      sidebar={<AppSidebar activeItem={sidebarItemFor(route)} />}
      topBar={<SignedInTopBar route={route} />}
      topBarClassName={
        route.name === "chat" && route.id === "new"
          ? "pl-[31px] pt-[27px]"
          : undefined
      }
      dock={
        <AnimatePresence initial={false}>
          {showDock ? (
            <motion.div
              key="composer-dock"
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
              transition={overlayTransition}
            >
              <BottomContainer
                model="Claude Opus 5"
                value={composer.value}
                onChange={composer.onChange}
                onSubmit={composer.onSubmit}
              />
            </motion.div>
          ) : null}
        </AnimatePresence>
      }
      overlay={
        <ModalOverlay open={subscriptionStep !== null} onClose={closeSubscription}>
          {subscriptionStep ? (
            <NewSubscriptionModal
              step={subscriptionStep}
              onStepChange={openSubscription}
              onCancel={closeSubscription}
              onCreateTopic={closeSubscription}
              onCreateSource={closeSubscription}
            />
          ) : null}
        </ModalOverlay>
      }
    >
      <ScreenPresence route={route}>{children}</ScreenPresence>
    </AppShell>
  )
}
