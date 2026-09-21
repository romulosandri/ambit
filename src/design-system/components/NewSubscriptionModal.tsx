import { Globe, Newspaper, User } from "@phosphor-icons/react"
import { useState } from "react"
import { BackgroundPicker } from "./BackgroundPicker"
import { Button } from "./Button"
import { ChannelRow } from "./ChannelRow"
import { ChoiceCard } from "./ChoiceCard"
import { Divider } from "./Divider"
import { SwitchWithText } from "./SwitchWithText"
import { LabeledTextArea, TextField } from "./TextField"
import type { SocialName } from "./brands"
import { cx } from "./cx"

export type SubscriptionStep = "choose" | "topic" | "source"
export type SubscriptionKind = "topic" | "source"
export type SourceKind = "person" | "publisher"

const channels: { name: SocialName; label: string }[] = [
  { name: "LinkedIn", label: "LinkedIn" },
  { name: "Reddit", label: "Reddit" },
  { name: "Medium", label: "Medium" },
  { name: "Substack", label: "Substack" },
  { name: "Facebook", label: "Facebook" },
  { name: "Instagram", label: "Instagram" },
  { name: "Twitter (X)", label: "X" },
]

const defaultChannels: SocialName[] = ["LinkedIn", "Medium", "Twitter (X)"]

export type NewSubscriptionModalProps = {
  step?: SubscriptionStep
  onStepChange?: (step: SubscriptionStep) => void
  onCancel?: () => void
  onCreateTopic?: () => void
  onCreateSource?: () => void
  className?: string
}

export function NewSubscriptionModal({
  step: stepProp,
  onStepChange,
  onCancel,
  onCreateTopic,
  onCreateSource,
  className,
}: NewSubscriptionModalProps) {
  const [uncontrolledStep, setUncontrolledStep] =
    useState<SubscriptionStep>("choose")
  const step = stepProp ?? uncontrolledStep

  function setStep(next: SubscriptionStep) {
    onStepChange?.(next)
    if (stepProp === undefined) setUncontrolledStep(next)
  }

  const [kind, setKind] = useState<SubscriptionKind>("topic")
  const [sourceKind, setSourceKind] = useState<SourceKind>("person")
  const [title, setTitle] = useState("")
  const [scope, setScope] = useState("")
  const [keywords, setKeywords] = useState("")
  const [background, setBackground] = useState(0)
  const [name, setName] = useState("")
  const [url, setUrl] = useState("")
  const [includeBrief, setIncludeBrief] = useState(true)
  const [selectedChannels, setSelectedChannels] =
    useState<SocialName[]>(defaultChannels)

  function toggleChannel(channel: SocialName, checked: boolean) {
    setSelectedChannels((current) =>
      checked
        ? [...current, channel]
        : current.filter((item) => item !== channel),
    )
  }

  function handleContinue() {
    if (kind === "topic") {
      setStep("topic")
      return
    }
    setStep("source")
  }

  function handlePrimary() {
    switch (step) {
      case "choose":
        handleContinue()
        return
      case "topic":
        onCreateTopic?.()
        return
      case "source":
        onCreateSource?.()
        return
      default: {
        const exhaustive: never = step
        return exhaustive
      }
    }
  }

  const primaryLabel = (() => {
    switch (step) {
      case "choose":
        return "Continue"
      case "topic":
        return "Create topic"
      case "source":
        return "Create source"
      default: {
        const exhaustive: never = step
        return exhaustive
      }
    }
  })()

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="subscription-modal-title"
      className={cx(
        "bg-bg-muted shadow-modal-sm flex max-h-full w-520 min-h-0 max-w-full flex-col overflow-hidden rounded-card-md",
        className,
      )}
    >
      <div className="flex min-h-0 flex-1 flex-col gap-24 overflow-y-auto p-24">
        {step === "choose" ? (
          <ChooseStep kind={kind} onKindChange={setKind} />
        ) : null}
        {step === "topic" ? (
          <TopicStep
            title={title}
            onTitleChange={setTitle}
            scope={scope}
            onScopeChange={setScope}
            keywords={keywords}
            onKeywordsChange={setKeywords}
            background={background}
            onBackgroundChange={setBackground}
            includeBrief={includeBrief}
            onIncludeBriefChange={setIncludeBrief}
            selectedChannels={selectedChannels}
            onToggleChannel={toggleChannel}
          />
        ) : null}
        {step === "source" ? (
          <SourceStep
            sourceKind={sourceKind}
            onSourceKindChange={setSourceKind}
            name={name}
            onNameChange={setName}
            url={url}
            onUrlChange={setUrl}
            includeBrief={includeBrief}
            onIncludeBriefChange={setIncludeBrief}
            selectedChannels={selectedChannels}
            onToggleChannel={toggleChannel}
          />
        ) : null}
      </div>
      <div className="border-border-default bg-bg-muted flex items-center justify-end gap-12 overflow-hidden border-t p-16">
        <Button style="soft" onClick={onCancel}>
          Cancel
        </Button>
        <Button style="primary" onClick={handlePrimary}>
          {primaryLabel}
        </Button>
      </div>
    </div>
  )
}

function ChooseStep({
  kind,
  onKindChange,
}: {
  kind: SubscriptionKind
  onKindChange: (kind: SubscriptionKind) => void
}) {
  return (
    <>
      <ModalHeader
        title="New subscription"
        description="Follow a topic or a source. You decide who reaches you."
      />
      <Divider style="solid" />
      <div className="flex w-full flex-col gap-8">
        <ChoiceCard
          name="subscription-kind"
          value="topic"
          title="Topic"
          description="Describe a subject in your own words. Ambit gathers coverage across the channels you pick."
          icon={Newspaper}
          selected={kind === "topic"}
          onChange={() => onKindChange("topic")}
        />
        <ChoiceCard
          name="subscription-kind"
          value="source"
          title="Source"
          description="Follow a person or publisher. Add a URL and we'll pull their work into your ambit."
          icon={User}
          selected={kind === "source"}
          onChange={() => onKindChange("source")}
        />
      </div>
    </>
  )
}

function TopicStep({
  title,
  onTitleChange,
  scope,
  onScopeChange,
  keywords,
  onKeywordsChange,
  background,
  onBackgroundChange,
  includeBrief,
  onIncludeBriefChange,
  selectedChannels,
  onToggleChannel,
}: {
  title: string
  onTitleChange: (value: string) => void
  scope: string
  onScopeChange: (value: string) => void
  keywords: string
  onKeywordsChange: (value: string) => void
  background: number
  onBackgroundChange: (index: number) => void
  includeBrief: boolean
  onIncludeBriefChange: (checked: boolean) => void
  selectedChannels: SocialName[]
  onToggleChannel: (channel: SocialName, checked: boolean) => void
}) {
  return (
    <>
      <ModalHeader
        title="New topic"
        description="Name the subject, then write what it should encompass."
      />
      <TextField
        label="Title"
        required
        appearance="soft"
        placeholder="e.g. AI Agents"
        value={title}
        onChange={(event) => onTitleChange(event.currentTarget.value)}
      />
      <LabeledTextArea
        label="What should this topic cover?"
        required
        placeholder="Coverage of AI agents: new model releases, product launches, safety debates, and how teams are actually using them — not generic AI news."
        caption="Write this like you'd brief a researcher. Specific beats broad."
        value={scope}
        onChange={(event) => onScopeChange(event.currentTarget.value)}
      />
      <TextField
        label="Keywords"
        appearance="soft"
        placeholder="Add tag"
        value={keywords}
        onChange={(event) => onKeywordsChange(event.currentTarget.value)}
      />
      <BackgroundPicker value={background} onChange={onBackgroundChange} />
      <DailyBriefSwitch
        checked={includeBrief}
        onChange={onIncludeBriefChange}
      />
      <Divider style="solid" />
      <ChannelSection
        description="Choose where Ambit should look. You can change this later."
        selectedChannels={selectedChannels}
        onToggleChannel={onToggleChannel}
      />
    </>
  )
}

function SourceStep({
  sourceKind,
  onSourceKindChange,
  name,
  onNameChange,
  url,
  onUrlChange,
  includeBrief,
  onIncludeBriefChange,
  selectedChannels,
  onToggleChannel,
}: {
  sourceKind: SourceKind
  onSourceKindChange: (kind: SourceKind) => void
  name: string
  onNameChange: (value: string) => void
  url: string
  onUrlChange: (value: string) => void
  includeBrief: boolean
  onIncludeBriefChange: (checked: boolean) => void
  selectedChannels: SocialName[]
  onToggleChannel: (channel: SocialName, checked: boolean) => void
}) {
  return (
    <>
      <ModalHeader
        title="New source"
        description="Follow a person or a publisher. Paste a URL and pick channels."
      />
      <div className="flex w-full flex-col gap-8">
        <ChoiceCard
          name="source-kind"
          value="person"
          title="Person"
          selected={sourceKind === "person"}
          onChange={() => onSourceKindChange("person")}
        />
        <ChoiceCard
          name="source-kind"
          value="publisher"
          title="Publisher"
          selected={sourceKind === "publisher"}
          onChange={() => onSourceKindChange("publisher")}
        />
      </div>
      <TextField
        label="Name"
        required
        appearance="soft"
        placeholder="e.g. Satya Nadella"
        value={name}
        onChange={(event) => onNameChange(event.currentTarget.value)}
      />
      <TextField
        label="URL"
        required
        appearance="soft"
        leadIcon={Globe}
        placeholder="x.com/satyanadella"
        caption="Paste a profile, publication, or RSS feed. Ambit will figure out the rest."
        value={url}
        onChange={(event) => onUrlChange(event.currentTarget.value)}
      />
      <DailyBriefSwitch
        checked={includeBrief}
        onChange={onIncludeBriefChange}
      />
      <Divider style="solid" />
      <ChannelSection
        description="We'll only pull from the channels you select."
        selectedChannels={selectedChannels}
        onToggleChannel={onToggleChannel}
      />
    </>
  )
}

function ModalHeader({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <div className="flex w-full flex-col gap-8">
      <h2
        id="subscription-modal-title"
        className="text-heading-page text-text-default"
      >
        {title}
      </h2>
      <p className="text-body-default text-text-muted">{description}</p>
    </div>
  )
}

function DailyBriefSwitch({
  checked,
  onChange,
}: {
  checked: boolean
  onChange: (checked: boolean) => void
}) {
  return (
    <SwitchWithText
      title="Include in Daily Brief"
      description="Add new coverage to the morning brief when there's something worth reading."
      checked={checked}
      onChange={onChange}
    />
  )
}

function ChannelSection({
  description,
  selectedChannels,
  onToggleChannel,
}: {
  description: string
  selectedChannels: SocialName[]
  onToggleChannel: (channel: SocialName, checked: boolean) => void
}) {
  return (
    <>
      <h3 className="text-heading-page text-text-default">Channels</h3>
      <p className="text-body-default text-text-muted">{description}</p>
      <div className="flex w-full flex-col overflow-hidden">
        {channels.map((channel) => (
          <ChannelRow
            key={channel.name}
            name={channel.name}
            label={channel.label}
            checked={selectedChannels.includes(channel.name)}
            onChange={(checked) => onToggleChannel(channel.name, checked)}
          />
        ))}
      </div>
    </>
  )
}
