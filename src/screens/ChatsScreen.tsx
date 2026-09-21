import { Plus } from "@phosphor-icons/react"
import { Button, ChatItem, SearchInput } from "@ds"
import {
  AppShell,
  BottomContainer,
  CenterContainer,
  PageHeader,
  ToolBar,
} from "@/layout"
import { chats } from "@/data"
import { useAppNav } from "@/navigation"
import { AppSidebar } from "./AppSidebar"
import { useComposer } from "./useComposer"
import { useMemo, useState } from "react"

export function ChatsScreen() {
  const [query, setQuery] = useState("")
  const composer = useComposer()
  const { navigate } = useAppNav()

  const visible = useMemo(
    () =>
      chats.filter((chat) =>
        chat.title.toLowerCase().includes(query.toLowerCase()),
      ),
    [query],
  )

  return (
    <AppShell
      sidebar={<AppSidebar activeItem="chats" />}
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
        <PageHeader
          title="Chats"
          toolbar={
            <ToolBar
              actions={
                <Button
                  size="md"
                  leadIcon={Plus}
                  borderStyle="dashed"
                  onClick={() => navigate({ name: "chat", id: "new" })}
                >
                  New Chat
                </Button>
              }
            >
              <SearchInput
                placeholder="Find in chats..."
                shortcut="/"
                value={query}
                onChange={(event) => setQuery(event.currentTarget.value)}
                className="flex-1"
              />
            </ToolBar>
          }
        />
        <div className="flex flex-col">
          {visible.map((chat) => (
            <ChatItem
              key={chat.id}
              title={chat.title}
              date={chat.date}
              unread={chat.unread}
              href={`#/chat/${chat.id}`}
            />
          ))}
        </div>
      </CenterContainer>
    </AppShell>
  )
}
