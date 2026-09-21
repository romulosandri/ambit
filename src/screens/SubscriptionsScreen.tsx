import { Plus } from "@phosphor-icons/react"
import {
  Button,
  type SubscriptionStep,
  PlaylistCard,
  SourceCard,
  Tabs,
} from "@ds"
import { CenterContainer, PageHeader, ToolBar } from "@/layout"
import { subscribedSources, homeTopics } from "@/data"
import { useAppNav } from "@/navigation"

export function SubscriptionsScreen() {
  const { route, navigate, openSubscription } = useAppNav()
  const tab =
    route.name === "subscriptions" && route.tab === "sources"
      ? "sources"
      : "topics"

  function setStep(next: SubscriptionStep | null) {
    if (next) {
      openSubscription(next)
      return
    }
    navigate({ name: "subscriptions", tab })
  }

  return (
    <CenterContainer>
      <PageHeader
        title="Subscriptions"
        toolbar={
          <ToolBar
            actions={
              <Button size="xs" leadIcon={Plus} onClick={() => setStep("choose")}>
                New Subscription
              </Button>
            }
          >
            <Tabs
              items={[
                { value: "topics", label: "Topics" },
                { value: "sources", label: "Sources" },
              ]}
              value={tab}
              onValueChange={(value) =>
                navigate({
                  name: "subscriptions",
                  tab: value === "sources" ? "sources" : "topics",
                })
              }
            />
          </ToolBar>
        }
      />
      {tab === "topics" ? (
        <div className="grid grid-cols-3 gap-4 max-md:grid-cols-2">
          {homeTopics.map((topic) => (
            <PlaylistCard
              key={topic.id}
              title={topic.title}
              imageSrc={topic.imageSrc}
              href={`#/topic/${topic.id}`}
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-8 max-lg:grid-cols-3 max-md:grid-cols-2">
          {subscribedSources.map((source) => {
            const kind = "photoSrc" in source ? "person" : "publisher"
            const logoSrc =
              "photoSrc" in source ? source.photoSrc : source.logoSrc
            return (
              <SourceCard
                key={`${kind}-${source.id}`}
                name={source.name}
                logoSrc={logoSrc}
                href={`#/source/${kind}-${source.id}`}
              />
            )
          })}
        </div>
      )}
    </CenterContainer>
  )
}
