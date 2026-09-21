import { articlesById, briefsById, chatsById, topicsById } from "@/data"
import { useAppNav } from "@/navigation"
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
import { SourceDetailsScreen } from "./SourceDetailsScreen"
import { SubscriptionsScreen } from "./SubscriptionsScreen"
import { TopicDetailsScreen } from "./TopicDetailsScreen"

export function AppNavigator() {
  const { route } = useAppNav()

  switch (route.name) {
    case "auth":
      return <AuthScreen />
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
    default: {
      const exhaustive: never = route
      return exhaustive
    }
  }
}
