# REMAINING SCREENS Blueprint

App screens from Page 38 that were not in the first pass. They all reuse `AppShell` + `Sidebar` + `CenterContainer` from `BLUEPRINT-PAGE-LAYOUT.md` and the existing card atoms. Nothing here invents a token.

Source: [Ambit — Design System](https://www.figma.com/design/L5RPQVecMQNnbCh0747l7q/Ambit---Design-System?node-id=15151-8).

## Shared details chrome

Topic details, source details, daily-brief details, article details, and new chat all pin a Back control on `page-content` at `(27, 24)` — `Button` `xs`, `secondary`, dashed, lead `ArrowLeft`, label "Back". New chat is the only one that sets `shape=pill`. The control is a sibling of the scrolling column (not inside it), matching the Figma frames.

---

## 1. Saved — `15190:78645`

Home without the greeting avatar, without the composer dock, and with two rails instead of one.

```
PageHeader "Saved"
  ToolBar: SearchInput "Find in saved..." (grows) + FilterButton
playlists-section "Daily Briefs" + rail arrows
  CardRail of DailyBriefVerticalCard × 4 at 180px
playlists-section "Topics" (arrows hidden)
  CardRail of PlaylistCard × 2 at 180px
ArticleSection × 3: Today / Yesterday / Mon, 14 Sep
```

Gaps and section chrome are the home-topics ones: header 24, section → rail 6, article sections 24 apart.

---

## 2. Topic details — `15210:89745`

```
Back (absolute)
PageHeader
  lead: Cover xs, radius-full (28px album-cover)
  title: "AI Agents" (display-small)
  ToolBar: SearchInput "Find Topics..." + FilterButton
ArticleSection × 3 (Today / Yesterday / Mon, 14 Sep)
BottomContainer
```

Header is 100px (28px cover vs 24px title). `PageHeader` already does `lead` inline with `gap-8`.

---

## 3. Source details — `15210:90923`

Same as topic details, except the title stack is a **column**.

```
Back (absolute)
PageHeader leadLayout=stack
  lead: Avatar md (56px)
  title: "Sarah Guo"
  ToolBar: SearchInput "Find on Sarah Guo..." + FilterButton
ArticleSection Today (2 cards) / Yesterday / Mon, 14 Sep
BottomContainer
```

Title cluster: column, `gap-16`. Header 168px.

---

## 4. Daily brief details — `15210:86995`

No tool-bar. The filter sits in the title row.

```
Back (absolute)
title row (gap-24): Cover xs radius-full + "Fri, Sep 18" + FilterButton
body-large summary (text/default, 640px)
AudioButton "21:16"
Divider dashed
articles-list of ArticleCard × 4 (no date SectionHeader)
BottomContainer
```

Center-container gap stays 24.

---

## 5. New chat — `15206:83256`

No dock, no 640 column. The panel is a centred composer.

```
page-content: flex column, justify/align center, padding 32/48
Back: xs, dashed, pill, absolute (31, 27)
center-container: 720 × hug, column, gap-24, items-center
  title: "How can I help today?" (display-small)
  TextArea 720 × 120, model Claude Opus 5
  disclaimer body-default on text/muted
```

---

## 6. Article details — `15210:90287`

The 640 column has **40px inner padding**, so the prose measure is 560px. Gap between builder blocks is 8, not 24. Has dock + Back.

```
content-container (gap-16):
  SourceLine + Badge (News / cyan)
  Builder Item heading — display-small, the article title
  MetaRow "4 min read · 1h ago"
  AudioButton + icon Button sm soft (bookmark)
Divider
Perspectives section (see BLUEPRINT-PERSPECTIVE-CARD.md)
Divider
Builder Items: 3×2 image grid, then body-large paragraphs
```

Builder Items are not library components. They are page-local blocks: a heading, a dashed divider, a 3×2 image grid, and `body-large` paragraphs. No new text style — the Figma heading is 32px Concrette, which we map to `display-small` (30px), the closest existing headline token.

---

## Layout extensions these screens need

| Change | Where | Why |
|---|---|---|
| `AppShell.topBar` | `AppShell` | pinned Back, outside the scroll |
| `PageHeader.leadLayout` | `PageHeader` | source-details stacks avatar above title |
| `PageHeader.titleActions` | `PageHeader` | daily-brief-details puts Filter next to the title |
| `Cover.radius="full"` | `Cover` | 28px album-cover on topic / brief headers |
| `CardRail.gap` | `CardRail` | perspectives use 12px, every other rail uses 4px |
