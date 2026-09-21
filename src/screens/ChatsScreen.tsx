import { Plus } from "@phosphor-icons/react"
import { Button, ChatItem, SearchInput } from "@ds"
import { CenterContainer, PageHeader, ToolBar } from "@/layout"
import { chats } from "@/data"
import { EmptyCopy, PresenceItem, PresenceList } from "@/motion"
import { useAppNav } from "@/navigation"
import { useMemo, useState } from "react"

export function ChatsScreen() {
  const [query, setQuery] = useState("")
  const { navigate } = useAppNav()

  const visible = useMemo(
    () =>
      chats.filter((chat) =>
        chat.title.toLowerCase().includes(query.toLowerCase()),
      ),
    [query],
  )

  return (
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
      <PresenceList className="flex flex-col">
        {visible.map((chat) => (
          <PresenceItem key={chat.id}>
            <ChatItem
              title={chat.title}
              date={chat.date}
              unread={chat.unread}
              href={`#/chat/${chat.id}`}
            />
          </PresenceItem>
        ))}
      </PresenceList>
      <EmptyCopy show={visible.length === 0}>No chats match this search.</EmptyCopy>
    </CenterContainer>
  )
}
