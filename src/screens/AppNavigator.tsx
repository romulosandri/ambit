import { useState } from "react"
import { articlesById, briefsById, chatsById, topicsById } from "@/data"
import { useAppNav } from "@/navigation"
import type { AppRoute } from "@/navigation/types"
import { ArticleDetailsScreen } from "./ArticleDetailsScreen"
import { AuthScreen } from "./AuthScreen"
import { ChatDetailsScreen } from "./ChatDetailsScreen"
import { ChatsScreen } from "./ChatsScreen"
import { DailyBriefDetailsScreen } from "./DailyBriefDetailsScreen"
import { DailyBriefsScreen } from "./DailyBriefsScreen"
import { DiscoveryScreen } from "./DiscoveryScreen"
import { HomeScreen } from "./HomeTopicsScreen"
import { NewChatScreen } from "./NewChatScreen"
import { SavedScreen } from "./SavedScreen"
import { SignedInShell } from "./SignedInShell"
import { SourceDetailsScreen } from "./SourceDetailsScreen"
import { SplashScreen } from "./SplashScreen"
import { SubscriptionsScreen } from "./SubscriptionsScreen"
import { TopicDetailsScreen } from "./TopicDetailsScreen"

export function AppNavigator() {
  const { route } = useAppNav()
  const [splash, setSplash] = useState(() => route.name === "auth")
  const [authReady, setAuthReady] = useState(() => route.name !== "auth")

  if (route.name === "auth") {
    return (
      <div className="relative h-full overflow-hidden">
        <div className="h-full" inert={splash && !authReady ? true : undefined}>
          <AuthScreen playEntrance={authReady} />
        </div>
        {splash ? (
          <SplashScreen
            onReveal={() => setAuthReady(true)}
            onComplete={() => setSplash(false)}
          />
        ) : null}
      </div>
    )
  }

  return (
    <SignedInShell>
      <SignedInScreen route={route} />
    </SignedInShell>
  )
}

function SignedInScreen({ route }: { route: AppRoute }) {
  switch (route.name) {
    case "home":
      return <HomeScreen />
    case "discovery":
      return <DiscoveryScreen />
    case "briefs":
      return <DailyBriefsScreen />
    case "brief":
      if (!briefsById[route.id]) return <DailyBriefsScreen />
      return <DailyBriefDetailsScreen />
    case "chats":
      return <ChatsScreen />
    case "chat":
      if (route.id === "new") return <NewChatScreen />
      if (!chatsById[route.id]) return <ChatsScreen />
      return <ChatDetailsScreen />
    case "subscriptions":
      return <SubscriptionsScreen />
    case "saved":
      return <SavedScreen />
    case "topic":
      if (!topicsById[route.id]) return <HomeScreen />
      return <TopicDetailsScreen />
    case "source":
      return <SourceDetailsScreen />
    case "article":
      if (!articlesById[route.id]) return <HomeScreen />
      return <ArticleDetailsScreen />
    case "auth":
      return <AuthScreen />
    default: {
      const exhaustive: never = route
      return exhaustive
    }
  }
}
