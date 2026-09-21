import { ArticleCardSmall, ChatBubble } from "@ds"
import { AppShell, BottomContainer, CenterContainer } from "@/layout"
import { articlesById, chatsById, sourceLogo, sourceName } from "@/data"
import { useAppNav } from "@/navigation"
import { AppBackButton } from "./AppBackButton"
import { AppSidebar } from "./AppSidebar"
import { useComposer } from "./useComposer"

export function ChatDetailsScreen() {
  const { route } = useAppNav()
  const composer = useComposer()
  const chatId = route.name === "chat" ? route.id : "c-climate"
  const chat = chatsById[chatId] ?? chatsById["c-climate"]

  return (
    <AppShell
      sidebar={<AppSidebar activeItem="chats" />}
      topBar={<AppBackButton />}
      dock={
        <BottomContainer
          model="Claude Opus 5"
          value={composer.value}
          onChange={composer.onChange}
          onSubmit={composer.onSubmit}
        />
      }
    >

      <CenterContainer hasDock>
        {chat.messages.map((message) => {
          if (message.role === "user") {
            return (
              <ChatBubble key={message.id} type="user">
                {message.text}
              </ChatBubble>
            )
          }

          const citations = (message.citationIds ?? [])
            .map((id) => articlesById[id])
            .filter((article): article is NonNullable<typeof article> =>
              Boolean(article),
            )

          return (
            <ChatBubble
              key={message.id}
              type="ai"
              sourceLabel={message.sourceLabel}
              timestamp={message.timestamp}
              citations={
                citations.length > 0 ? (
                  <>
                    {citations.map((article) => (
                      <ArticleCardSmall
                        key={article.id}
                        title={article.title}
                        source={sourceName(article.source)}
                        logoSrc={sourceLogo(article.source)}
                        person={article.source.kind === "person"}
                        imageSrc={article.imageSrc}
                        href={`#/article/${article.id}`}
                      />
                    ))}
                  </>
                ) : undefined
              }
            >
              {message.text}
            </ChatBubble>
          )
        })}
      </CenterContainer>
    </AppShell>
  )
}
