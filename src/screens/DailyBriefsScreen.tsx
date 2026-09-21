import { Plus } from "@phosphor-icons/react"
import { useMemo, useState } from "react"
import { Button, DailyBriefVerticalCard, SearchInput } from "@ds"
import { AppShell, CenterContainer, PageHeader, ToolBar } from "@/layout"
import { briefs } from "@/data"
import { AppSidebar } from "./AppSidebar"

export function DailyBriefsScreen() {
  const [query, setQuery] = useState("")

  const visible = useMemo(
    () =>
      briefs.filter((brief) =>
        `${brief.title} ${brief.date} ${brief.summary}`
          .toLowerCase()
          .includes(query.toLowerCase()),
      ),
    [query],
  )

  return (
    <AppShell sidebar={<AppSidebar activeItem="daily-briefs" />}>
      <CenterContainer>
        <PageHeader
          title="Daily Briefs"
          toolbar={
            <ToolBar
              actions={
                <Button size="sm" leadIcon={Plus}>
                  New Daily Brief
                </Button>
              }
            >
              <SearchInput
                placeholder="Find in daily briefs..."
                value={query}
                onChange={(event) => setQuery(event.currentTarget.value)}
                className="flex-1"
              />
            </ToolBar>
          }
        />
        <div className="grid grid-cols-3 gap-4 max-md:grid-cols-2">
          {visible.map((brief) => (
            <DailyBriefVerticalCard
              key={brief.id}
              title={brief.title}
              month={brief.month}
              date={brief.date}
              imageSrc={brief.imageSrc}
              href={`#/brief/${brief.id}`}
            />
          ))}
        </div>
      </CenterContainer>
    </AppShell>
  )
}
