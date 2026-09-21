import {
  ArrowLeft,
  CalendarBlank,
  DotsThree,
  Newspaper,
  Plus,
  ShareNetwork,
  SlidersHorizontal,
  User,
} from "@phosphor-icons/react"
import { useState } from "react"
import {
  ArticleCard,
  ArticleCardSmall,
  AudioButton,
  AudioWave,
  Avatar,
  BackgroundPicker,
  Badge,
  type BadgeColor,
  Button,
  type ButtonStyle,
  ChannelRow,
  ChatBubble,
  ChatItem,
  Checkbox,
  CheckboxWithText,
  ChoiceCard,
  Cover,
  DailyBriefHorizontalCard,
  DailyBriefVerticalCard,
  Divider,
  DropdownButton,
  composerModelOptions,
  FeaturedArticleCard,
  FilterButton,
  Filter,
  emptyFilterValue,
  type FilterValue,
  Icon,
  LinkButton,
  Logo,
  NewSubscriptionModal,
  PerspectiveCard,
  PlaylistCard,
  PublicationLogo,
  Radio,
  SearchInput,
  Sidebar,
  SidebarMenuItem,
  SocialButton,
  SocialLogo,
  SourceCard,
  Switch,
  SwitchWithText,
  Tabs,
  TextArea,
  TextField,
  TopicItem,
  flowerCovers,
  lauraLee,
  socialNames,
} from "@ds"

const badgeColors: BadgeColor[] = [
  "default",
  "red",
  "orange",
  "green",
  "blue",
  "lime",
  "cyan",
  "violet",
  "fuchsia",
  "pink",
]

const buttonStyles: ButtonStyle[] = [
  "primary",
  "secondary",
  "soft",
  "ghost",
  "destructive",
]

function Section({
  title,
  node,
  children,
}: {
  title: string
  node: string
  children: React.ReactNode
}) {
  return (
    <section className="flex flex-col gap-16">
      <div className="flex items-baseline gap-8">
        <h2 className="text-heading-page text-text-default">{title}</h2>
        <span className="text-body-small text-text-hint">{node}</span>
      </div>
      <div className="bg-bg-card border-border-default flex flex-col gap-24 rounded-card-md border p-24">
        {children}
      </div>
    </section>
  )
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-8">
      <span className="text-body-small text-text-muted">{label}</span>
      <div className="flex flex-wrap items-center gap-12">{children}</div>
    </div>
  )
}

export function DesignSystemPreview() {
  const [tab, setTab] = useState("topics")
  const [railTab, setRailTab] = useState("all")
  const [prompt, setPrompt] = useState("")
  const [remember, setRemember] = useState(true)
  const [filtered, setFiltered] = useState(false)
  const [filterValue, setFilterValue] = useState<FilterValue>(emptyFilterValue)
  const [briefOn, setBriefOn] = useState(true)
  const [kind, setKind] = useState("topic")
  const [cover, setCover] = useState(0)
  const [linkedinOn, setLinkedinOn] = useState(true)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [range, setRange] = useState("Last 7 Days")
  const [sort, setSort] = useState("Newest")
  const [previewModel, setPreviewModel] = useState("Claude Opus 5")

  return (
    <div className="bg-bg-muted text-text-default min-h-svh">
      <div className="mx-auto flex max-w-1200 flex-col gap-48 px-32 py-48 max-md:gap-32 max-md:px-16 max-md:py-24">
        <header className="flex flex-col gap-8">
          <h1 className="text-display-small text-text-default">
            Ambit design system
          </h1>
          <p className="text-body-large text-text-subtle max-w-640">
            Components recreated from the Page 38 screens. Every value comes from
            the design tokens — see{" "}
            <code className="text-body-default">src/blueprints</code> for the
            per-component specs and{" "}
            <code className="text-body-default">
              src/docs/PAGE-38-COMPONENT-INVENTORY.md
            </code>{" "}
            for the scope.
          </p>
        </header>

        <Section title="Button" node="15190:79368">
          <Row label="Styles — md">
            {buttonStyles.map((style) => (
              <Button key={style} style={style} leadIcon={Plus}>
                {style}
              </Button>
            ))}
          </Row>
          <Row label="Sizes — secondary">
            <Button size="lg" leadIcon={Plus}>
              lg
            </Button>
            <Button size="md" leadIcon={Plus}>
              md
            </Button>
            <Button size="sm" leadIcon={Plus}>
              sm
            </Button>
            <Button size="xs" leadIcon={Plus}>
              xs
            </Button>
          </Row>
          <Row label="Dashed, tail icon, back, loading, disabled">
            <Button borderStyle="dashed" leadIcon={Plus}>
              New Chat
            </Button>
            <Button size="sm" leadIcon={CalendarBlank} tailIcon={DotsThree}>
              Last 30 Days
            </Button>
            <Button size="xs" borderStyle="dashed" leadIcon={ArrowLeft}>
              Back
            </Button>
            <Button isLoading>Loading</Button>
            <Button disabled>Disabled</Button>
          </Row>
          <Row label="Icon only — 32 / 28 / 24, rounded and pill">
            <Button iconOnly size="md" style="ghost" leadIcon={Plus} aria-label="Add" />
            <Button iconOnly size="sm" style="ghost" leadIcon={ShareNetwork} aria-label="Share" />
            <Button iconOnly size="xs" style="ghost" leadIcon={DotsThree} aria-label="More" />
            <Button iconOnly size="sm" style="soft" shape="pill" leadIcon={Plus} aria-label="Attach" />
          </Row>
        </Section>

        <Section title="Link Button, Filter Button, Dropdown Button" node="15199:3126 · 15177:76658 · 15177:76666">
          <Row label="Link Button">
            <LinkButton>Terms and Conditions</LinkButton>
            <LinkButton tone="default">12 sources</LinkButton>
          </Row>
          <Row label="Filter Button">
            <FilterButton onClick={() => setFiltered(!filtered)} selected={filtered} />
            <FilterButton selected count={3} />
          </Row>
          <Row label="Dropdown Button">
            <DropdownButton
              options={[
                { value: "Last 7 Days", label: "Last 7 Days" },
                { value: "Last 30 Days", label: "Last 30 Days" },
                { value: "Last 90 Days", label: "Last 90 Days" },
                { value: "This Year", label: "This Year" },
                { value: "All Time", label: "All Time" },
              ]}
              value={range}
              onChange={setRange}
            />
            <DropdownButton
              leadIcon={SlidersHorizontal}
              options={[
                { value: "Newest", label: "Newest" },
                { value: "Oldest", label: "Oldest" },
                { value: "Most relevant", label: "Most relevant" },
                { value: "Title A–Z", label: "Title A–Z" },
              ]}
              value={sort}
              onChange={setSort}
            />
            <DropdownButton
              variant="composer"
              options={composerModelOptions}
              value={previewModel}
              onChange={setPreviewModel}
            />
          </Row>
        </Section>

        <Section title="Filter" node="15256:27931">
          <Filter
            value={filterValue}
            onChange={setFilterValue}
            topics={[
              { id: "ai-agents", label: "AI Agents", imageSrc: flowerCovers[0] },
              { id: "ai-trust", label: "AI Trust", imageSrc: flowerCovers[1] },
              {
                id: "generative-ui",
                label: "Generative UI",
                imageSrc: flowerCovers[2],
              },
              { id: "agent-ux", label: "Agent UX", imageSrc: flowerCovers[3] },
            ]}
            sources={[
              { id: "person-sarah-guo", label: "Sarah Guo" },
              { id: "publisher-the-verge", label: "The Verge" },
            ]}
            channels={socialNames.map((name) => ({
              name,
              label: name === "Twitter (X)" ? "X" : name,
            }))}
          />
        </Section>

        <Section title="Badge" node="15210:91738">
          <Row label="Colours">
            {badgeColors.map((color) => (
              <Badge key={color} color={color}>
                {color}
              </Badge>
            ))}
          </Row>
        </Section>

        <Section title="Icon, Avatar, Divider, Checkbox, Radio, Switch" node="15177:76653 · 15177:76677 · 2763:765 · 2847:3988 · 3794:10872">
          <Row label="Icon — 12 / 16 / 18 in a 20 box / 20, and tones">
            <Icon icon={Plus} size={12} tone="default" />
            <Icon icon={Plus} size={16} tone="subtle" />
            <Icon icon={Plus} size={18} tone="muted" />
            <Icon icon={Plus} size={20} tone="destructive" />
            <Icon icon={Plus} size={20} tone="success" />
            <Icon icon={Plus} size={20} tone="warning" />
          </Row>
          <Row label="Avatar — xs / md, image and initials">
            <Avatar name="Laura Lee" src={lauraLee} />
            <Avatar name="Laura Lee" src={lauraLee} size="md" />
          </Row>
          <Row label="Checkbox">
            <Checkbox defaultChecked />
            <Checkbox />
            <Checkbox disabled />
            <CheckboxWithText
              title="Remember me"
              checked={remember}
              onChange={setRemember}
              className="max-w-240"
            />
            <CheckboxWithText
              title="Email updates"
              description="Get a weekly digest of your topics."
              className="max-w-320"
            />
          </Row>
          <Row label="Radio">
            <Radio name="preview-radio" defaultChecked />
            <Radio name="preview-radio" />
            <Radio name="preview-radio-disabled" disabled />
          </Row>
          <Row label="Switch">
            <Switch checked={briefOn} onChange={setBriefOn} aria-label="Include in Daily Brief" />
            <Switch checked={false} aria-label="Off" />
            <SwitchWithText
              title="Include in Daily Brief"
              description="Add new coverage to the morning brief when there's something worth reading."
              checked={briefOn}
              onChange={setBriefOn}
              className="max-w-400"
            />
          </Row>
          <div className="flex flex-col gap-8">
            <span className="text-body-small text-text-muted">
              Divider — dashed and solid
            </span>
            <Divider />
            <Divider style="solid" />
            <Divider label="or" style="solid" className="max-w-328" />
          </div>
        </Section>

        <Section title="Tabs" node="15177:76656 · 15234:4772">
          <Row label="Contained">
            <Tabs
              items={[
                { value: "topics", label: "Topics" },
                { value: "sources", label: "Sources" },
              ]}
              value={tab}
              onValueChange={setTab}
            />
          </Row>
          <div className="flex flex-col gap-8">
            <span className="text-body-small text-text-muted">
              Rail — horizontal scroll
            </span>
            <Tabs
              shape="rail"
              value={railTab}
              onValueChange={setRailTab}
              items={[
                { value: "all", label: "For You" },
                { value: "tech", label: "Technology" },
                { value: "ai", label: "AI" },
                { value: "business", label: "Business" },
                { value: "science", label: "Science" },
                { value: "health", label: "Health" },
                { value: "climate", label: "Climate" },
                { value: "policy", label: "Policy" },
              ]}
            />
          </div>
        </Section>

        <Section title="Inputs" node="15190:79365 · 15177:77552 · 15206:84133">
          <Row label="Search Input">
            <SearchInput
              placeholder="Find in chats..."
              shortcut="/"
              className="w-full max-w-501"
            />
          </Row>
          <Row label="Text Field">
            <TextField
              label="Email address or username"
              placeholder="you@example.com"
              className="max-w-328"
            />
            <TextField
              label="Password"
              type="password"
              invalid
              placeholder="••••••••"
              tail={<LinkButton>Forgot?</LinkButton>}
              className="max-w-328"
            />
            <TextField
              label="Name"
              required
              appearance="soft"
              placeholder="e.g. Satya Nadella"
              className="max-w-328"
            />
          </Row>
          <div className="flex flex-col gap-8">
            <span className="text-body-small text-text-muted">
              Text Area — the AI composer
            </span>
            <TextArea
              model="Claude Opus 5"
              value={prompt}
              onChange={(event) => setPrompt(event.currentTarget.value)}
              className="w-full max-w-720"
            />
          </div>
          <Row label="Social Button">
            <SocialButton brand="apple" className="max-w-328" />
            <SocialButton brand="google" className="max-w-328" />
            <SocialButton brand="x" className="max-w-328" />
          </Row>
        </Section>

        <Section title="Audio" node="15163:70903 · 15163:70901">
          <Row label="Audio Button and the raw wave">
            <AudioButton duration="21:16" />
            <AudioButton duration="04:32" playing progress={0.2} />
            <AudioWave />
          </Row>
        </Section>

        <Section title="Covers, logos, source card" node="15163:71006 · 15195:1243 · 15210:89600">
          <Row label="Cover — caption, overline + caption, plain">
            <Cover size="lg" src={flowerCovers[0]} caption="AI Agents" />
            <Cover
              size="lg"
              src={flowerCovers[4]}
              overline="September"
              caption="Saturday, 19"
            />
            <Cover size="xs" src={flowerCovers[0]} radius="full" />
            <Cover size="md" />
          </Row>
          <Row label="Social logos — real brand marks">
            {socialNames.map((name) => (
              <SocialLogo key={name} name={name} className="size-24" />
            ))}
          </Row>
          <Row label="Publication logos (fallback initials until brand assets land)">
            {["The Verge", "Wired", "Reuters", "Forbes"].map((name) => (
              <PublicationLogo key={name} name={name} />
            ))}
          </Row>
          <Row label="Cover artwork — the bg-flower set">
            {flowerCovers.slice(0, 6).map((src, index) => (
              <Cover key={src} src={src} size="md" caption={`${index + 1}`} />
            ))}
          </Row>
          <Row label="Logo">
            <Logo />
          </Row>
          <Row label="Source Card">
            <SourceCard name="The Verge" />
            <SourceCard name="Wired" />
            <SourceCard name="Bloomberg" />
          </Row>
        </Section>

        <Section title="Sidebar Menu Item" node="I15190:79357;4146:138977">
          <div className="bg-bg-sidebar flex w-280 flex-col gap-2 rounded-card-md p-16">
            <SidebarMenuItem variant="header">Settings</SidebarMenuItem>
            <SidebarMenuItem icon={Plus} active>
              Active item
            </SidebarMenuItem>
            <SidebarMenuItem icon={Plus}>Idle item</SidebarMenuItem>
            <SidebarMenuItem icon={Plus} tone="muted" trailingLabel="Soon" disabled>
              Widgets
            </SidebarMenuItem>
            <SidebarMenuItem
              icon={Plus}
              badge={<Badge>12</Badge>}
              tailAction={{ icon: Plus, label: "Add subscription", onClick: () => {} }}
            >
              Subscriptions
            </SidebarMenuItem>
          </div>
        </Section>

        <Section title="Article cards" node="15172:74929 · 15210:87869 · 15236:4647">
          <div className="flex w-full max-w-640 flex-col">
            <ArticleCard
              title="Apple Intelligence reaches the EU after Brussels signs off on last-minute privacy changes"
              source="The Verge"
              type="news"
              sources={18}
              readTime="4 min read"
              time="1h ago"
              href="#"
              onSave={() => {}}
            />
            <ArticleCard
              title="Jensen Huang puts Trump on speakerphone onstage to announce robots won't take over the world"
              source="Wired"
              type="articles"
              sources={24}
              readTime="5 min read"
              time="2h ago"
              href="#"
              onSave={() => {}}
            />
          </div>
          <ArticleCardSmall
            title="Jensen Huang puts Trump on speakerphone onstage to announce robots won't take over the world"
            source="The Verge"
            href="#"
          />
          <FeaturedArticleCard
            title="Apple Intelligence reaches the EU after Brussels signs off on last-minute privacy changes"
            description="Apple made last-minute privacy changes to satisfy EU regulators, unlocking Apple Intelligence on iPhone across the bloc."
            source="The Verge"
            sources={18}
            readTime="4 min read"
            time="1h ago"
            duration="21:16"
            href="#"
            className="w-full max-w-640"
          />
          <PerspectiveCard
            title="Apple's DMA rewrite is the playbook for how Big Tech will ship AI in Europe"
            source="Bloomberg"
            className="w-360"
          />
        </Section>

        <Section title="Playlist and brief cards" node="15169:73015 · 15210:85650 · 15169:71189">
          <Row label="Rail cards — 180px">
            <PlaylistCard title="AI Agents" className="w-180" />
            <PlaylistCard title="Climate Policy" className="w-180" />
            <DailyBriefVerticalCard
              title="AI Agents"
              month="September"
              date="Saturday, 19"
              className="w-180"
            />
          </Row>
          <DailyBriefHorizontalCard
            summary="Apple Intelligence hits the EU, Copilot can now act in Microsoft 365, and Nvidia confirms Blackwell is in production."
            month="September"
            date="Friday, 18"
            duration="21:16"
            className="w-full max-w-640"
          />
        </Section>

        <Section title="List rows" node="15234:4835 · 15190:79324">
          <div className="flex w-full max-w-640 flex-col">
            <TopicItem title="AI Safety & Regulation" meta="16 Selected Articles" href="#" />
            <TopicItem title="TypeSafe Jev System One Launch" meta="9 Selected Articles" href="#" />
          </div>
          <div className="flex w-full max-w-640 flex-col">
            <ChatItem title="What are the latest news on AI?" date="Sep 8" href="#" />
            <ChatItem
              title="What's happening in the US election race?"
              date="Sep 18"
              unread
              href="#"
            />
          </div>
        </Section>

        <Section title="Chat bubbles" node="15210:87478">
          <div className="flex w-full max-w-640 flex-col gap-24">
            <ChatBubble type="user">
              What are the main topics in climate policy recently?
            </ChatBubble>
            <ChatBubble type="ai" sourceLabel="Worked for 12s" timestamp="2m ago">
              Recent climate policy has centered on a few key areas: carbon
              pricing, the clean energy transition, and border adjustments as the
              EU's CBAM starts to bite on steel and cement imports.
            </ChatBubble>
          </div>
        </Section>

        <Section title="New subscription" node="15279:87477">
          <div className="flex w-full max-w-520 flex-col gap-8">
            <ChoiceCard
              name="preview-kind"
              value="topic"
              title="Topic"
              description="Describe a subject in your own words. Ambit gathers coverage across the channels you pick."
              icon={Newspaper}
              selected={kind === "topic"}
              onChange={() => setKind("topic")}
            />
            <ChoiceCard
              name="preview-kind"
              value="source"
              title="Source"
              description="Follow a person or publisher. Add a URL and we'll pull their work into your ambit."
              icon={User}
              selected={kind === "source"}
              onChange={() => setKind("source")}
            />
          </div>
          <BackgroundPicker value={cover} onChange={setCover} className="max-w-472" />
          <div className="flex w-full max-w-472 flex-col">
            <ChannelRow
              name="LinkedIn"
              checked={linkedinOn}
              onChange={setLinkedinOn}
            />
            <ChannelRow name="Reddit" />
            <ChannelRow name="Twitter (X)" label="X" checked />
          </div>
          <NewSubscriptionModal onCancel={() => {}} />
        </Section>

        <Section title="Sidebar" node="15190:79357">
          <div className="border-border-default h-700 w-fit overflow-hidden rounded-card-md border">
            <Sidebar
              activeItem="chats"
              user={{ name: "Laura Lee", avatarSrc: lauraLee }}
              subscriptionCount={12}
              collapsed={sidebarCollapsed}
              onCollapse={() => setSidebarCollapsed((current) => !current)}
              onAddSubscription={() => {}}
            />
          </div>
        </Section>
      </div>
    </div>
  )
}
