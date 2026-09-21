# Page 38 — Component Inventory

Source: [Ambit — Design System](https://www.figma.com/design/L5RPQVecMQNnbCh0747l7q/Ambit---Design-System?node-id=15151-8) · canvas `15151:8` ("Page 38").

This is the map of every library component instanced by the Page 38 screens, the variants each screen actually uses, the components nested inside them, and the text/color styles they carry. It also defines **what we recreate in code** and in which order.

---

## 1. Screens on the canvas

All screens are `1440 × 1024` and share the same shell: `Sidebar` (280px) + `right-content` → `page-content` → `center-container` (640px, centered).

| Screen | Node ID | Shell notes |
|---|---|---|
| chats | `15190:79356` | search tool-bar, chat list, `bottom-container` |
| chat-details | `15210:87509` | chat bubbles + `bottom-container` + back button |
| chats-new-chat | `15206:83256` | centered `Text Area` composer |
| home-topics | `15177:76645` | tabs, daily brief card, playlists, article feed |
| home-topics-filter | `15256:27932` | same as home-topics + `filter` popover |
| home-sources | `15210:87950` | tabs, source rail, article feed |
| subscriptions-topics | `15210:88676` | tabs + playlist grid |
| subscriptions-sources | `15210:89388` | tabs + source grid |
| discovery | `15234:4436` | scrollable tab rail, featured card, trending + suggestion cards |
| topic-details | `15210:89745` | album cover header, search, article feed |
| source-details | `15210:90923` | avatar header, search, article feed |
| article-details | `15210:90287` | article body built from `Builder Items` |
| article-details (updated) | `15270:6358` | same article layout, second frame |
| saved | `15190:78645` | search, daily brief rail, playlists, article feed |
| daily-briefs | `15210:86303` | search + vertical card grid |
| daily-brief-details | `15210:86995` | brief header, audio button, article list |
| sign-in | `15201:3155` | auth card + bottom bar |
| sign-in-email | `15199:1795` | auth card with form inputs |
| sign-up | `15201:3545` | auth card with social buttons |
| sign-up-with-email | `15201:3295` | auth card, long form |
| Modal overlay (Choose) | `15280:7362` | `New Subscription Modal` Step=Choose on `bg/overlay` |
| Modal overlay (Topic) | `15280:7414` | Step=Topic, top-aligned, scrollable |
| Modal overlay (Source) | `15280:7597` | Step=Source, top-aligned |

`Navbar` (`1136 × 32`) is instanced on every app screen but is **`hidden="true"` in all of them** — it is out of scope.

---

## 2. Library components used (atoms)

Variants listed are only the ones Page 38 actually instances.

### Button — `15190:79368`, `15210:87772`, `15177:76659`, `15177:76668`, `15210:86314`, `15210:88690`, `15237:5590`
The single most reused atom. Observed configurations:

| Usage | Size | Style | Content |
|---|---|---|---|
| "New Chat" (`111 × 32`) | md | secondary, **dashed** border | lead icon 16 + label sm |
| "Back" (`71 × 24`) | xs | ghost | lead icon + label |
| icon-only (`24 × 24`) | xs | ghost | lead icon 16 |
| icon-only (`28 × 28`) | sm | ghost / soft | lead icon 16–20 |
| composer send/attach (`28 × 28`) | sm | soft, **pill** (`radius-full`) | lead icon 16 |
| "New Daily Brief" (`144 × 28`) | sm | secondary | lead icon + label |
| subscriptions action (`130 × 24`) | xs | secondary | lead icon + label |

Tokens: `bg/state/{secondary,soft,ghost}`, `border/darker`, `radius-sm` / `radius-full`, `spacing 2/4/6/8/10/12/14`, text `heading-subsection` (14/1.0) on `text/default`, shadow `components/default`.

Children: `lead-icon` → `icon` (16 or 20 box), `Label` → text.

### Link Button — `15199:3126`, `15210:87415`
Ghost background, no padding, gap 4, label `heading-subsection` on `text/muted`. Used in auth bottom bars and inside AI chat bubbles.

### Filter Button — `15177:76658`, `15190:79194`, `15210:87365`
`71 × 24`. Secondary bg, **dashed** `border/darker`, `radius-sm`, padding `8/4`, gap 4, lead icon 16, label sm on `text/muted`. Variant props exposed in Figma: `selected`, `shape`, `size`, `state`.

### Dropdown Button — `15177:76666`, `15199:3131`, plus one inside `Text Area`
`96 × 24`. Secondary bg + solid `border/default`, `radius-sm`, padding `6/4`, gap 4, label `body-small` (12/1.25) on `text/default`, tail icon 16 (chevron). The `Text Area` copy uses `radius-full` and ghost bg.

### Badge — `15172:75422`, `15210:91738`, `15234:4975`, one inside `Sidebar Menu Items`
`p-2` + inner `px-4`, `radius-sm`, solid `border/default`, backdrop blur 2px, label `body-small` on a matching `bg/basic/{color}-strong`. Colors seen: `default` (gray, e.g. the sidebar "12" counter) and `cyan` (the "News" article kind). Needs the full color set since article kinds vary.

### Input — `15190:79365` (search) and `15177:77552` (labeled form)
Two distinct shapes from the same component:
- **Search**: `bg/input-soft`, `radius-md`, padding `8/6`, gap 6, lead icon 20→16, placeholder `body-default` on `text/muted`, trailing kbd `badge` (`/`) with `radius-xs`, `border/default`.
- **Labeled**: `Input Label` row (label `heading-subsection` on `text/default` + optional tail) above a `Container` with `bg/input`, solid `border/darker`, `radius-md`, shadow `components/default`.

### Text Area — `15206:84133`, `15202:22520`
The AI composer. `bg/input`, solid `border/default`, `radius-card-md` (16), padding `12/10/12/12`, gap 6, shadow `shadows/card`. Children: placeholder text (`body-default` on `text/muted`), then a footer row with a left cluster (pill icon Button + Dropdown Button "Claude Opus 5") and a right cluster (pill icon Button).

### Tabs / Tab Items — `15177:76656`, `15210:88687`, `15234:4772`, `15255:8346`
`Tabs`: `bg/state/soft`, `radius-sm`, `p-2`, gap 2. `Tab Items` selected = secondary bg + solid `border/darker` + `components/default` shadow + `text/default`; unselected = ghost bg + `text/muted`. Padding `10/6`, gap 4, label `heading-subsection`. Discovery uses a 12-item scrolling rail with a `right-scrim` overlay.

### Avatar — `15177:76653` (20px), `15210:91422` (56px)
Circular (`radius-full`), `bg/basic/gray-subtle`, solid `border/default`, image fill. Also wrapped as **Avatar Button** in the sidebar footer (soft bg, pill, thumbnail 20 + label + tail icon 20).

### Divider — `15177:76677`, `15210:87261`, `15201:3405`
Horizontal hairline, exposes `type` and `style` (the instances use **Dashed**). Figma ships it as an SVG; in code this is a CSS dashed border on `border/default`.

### Checkbox / Checkbox with Text — `15177:77554`, `15201:3414`
16px box, `radius-2xs`. Unchecked: `bg/checkbox/default` + `border/darker` + inner shadow. Checked: `bg/checkbox/active` (`mojo/500`) + 14px check icon + inset white highlight. `Checkbox with Text` adds a 20px container, gap 10, and a title/description label stack.

### Radio Button — `2847:3988`, `2847:3993`
16px circle, same fill tokens as Checkbox. Selected: `bg/checkbox/active` + 6px handle dot. Used inside the New Subscription Modal choice cards.

### Switch / Switch with Text — `3794:10872`, `3794:10874`, `3794:10925`
32 × 20 track, 14px handle, `radius-full`. Off = `bg/switch/default`; on = `bg/switch/active` (`green/500`). `Switch with Text` is title + description, switch on the right — "Include in Daily Brief" on the Topic and Source steps.

### Social Button — `15201:3265..3267`, `15201:3733..3735`
`328 × 36`. Secondary bg, solid `border/darker`, `radius-sm`, padding `14/10`, gap 6, brand lead icon 16, label sm. Brands: Apple, Google, (third brand on both auth screens).

### Sidebar Menu Items — inside `Sidebar`, also reused as section headers (`15177:76663`, `15237:5021`)
`h-32`, `p-6`, gap 6, `radius-sm`. Active = `bg/state/soft` + `text/default`; idle = ghost + `text/subtle`. Slots: lead icon 20→18, label, optional trailing label ("Soon"), optional `Badge`, optional tail button 20→16. The section-header usage is a label-only variant (`px-8 py-4`, `body-small` on `text/subtle`).

### Search Input — `15255:8347` and Dropdown Menu Items — `15255:8348..27678`
Only appear inside the `filter` popover (36px search field, 32px menu rows, one 4px separator row, one 44px footer row).

### Icon sets
- **publication-logos** — `15195:1243`, 14 variants: The Verge, TechCrunch, Wired, The Information, Ars Technica, CNET, Axios, Bloomberg, Reuters, Financial Times, Wall Street Journal, The Economist, CNBC, Forbes. Rendered at 12px inside article cards.
- **social-logos** — `15177:76327`, 7 variants: Facebook, Instagram, Twitter (X), Substack, Reddit, Medium, LinkedIn. 12px.
- **source-icon** — `15206:84205`, 72px tile, states Default/hover.
- **album-cover** — `15163:71006`, `Default` / `Variant2`, rendered at 28, 164, 180 and 244px.
- **audio-wave** — `15163:70901` (`54 × 18`) built from a bar component with `type=active|inactive` × `size=lg|md|sm|xs|xxs`.
- **logo** — `15151:20712` (`85 × 18`) in sidebar and auth cards.
- UI glyphs (search, plus, chevron, bookmark, share, copy, thumbs, filter, home, discovery, briefs, chats, saved, widgets, subscriptions, customize, panel-collapse, mic, attach) come through as SVG assets on `icon/default*` colors.

---

## 3. Library components used (molecules & organisms)

| Component | Node ID | Variants used | Nested components |
|---|---|---|---|
| **article-card** | `15172:74929` | `state=default\|hover` × `type=news\|articles\|post` | `publication-logos`, `Badge`, thumbnail frame |
| **article-card-small** | `15210:87869` | single | `publication-logos` |
| **featured-article-card** | `15236:4647` | `state=Default\|hover` | `publication-logos`, `Badge`, `audio-button`, `album-cover` |
| **playlist-card** | `15169:73015` | `Default` / `Variant2` | `album-cover` |
| **daily-brief-vertical-card** | `15210:85650` | `state=Default\|hover` | image frame |
| **daily-brief-horizontal-card** | `15169:71189` | `Default` / `Variant2` | `album-cover`, `audio-button` |
| **source-card** | `15210:89600` | `state=Default\|hover` | `source-icon` |
| **topic-item** | `15234:4835` | `Default` / `Variant2` | text only |
| **chat-item** | `15190:79324` | `state=Default\|hover` | text + unread dot |
| **chat-bubble** | `15210:87478` | `type=user\|ai` | `Link Button`, 4× icon `Button`, optional `article-card-small` |
| **audio-button** | `15163:70903` | single | `Button` (24), `audio-wave`, time label |
| **bottom-container** | `15202:22552` | single | `Text Area`, scrim, disclaimer text |
| **Sidebar** | `15151:…` | single | `logo`, icon `Button`, 9× `Sidebar Menu Items`, `Badge`, `Avatar Button` |
| **filter** | `15256:27931` | `topics` / `sources` / `channels` | `Tabs`, `Search Input`, `Dropdown Menu Items` |
| **New Subscription Modal** | `15279:87477` | `Step=Choose\|Topic\|Source` | Radio, Switch, Checkbox, Input, Divider, Button, social-logos, bg-flower |
| **Builder Items** | article-details | prose blocks (heading / paragraph / media) | — |
| **Navbar** | — | hidden everywhere | — (skip) |

Repeating **local** layout frames (not components, we build them as page-level layout later): `center-container`, `header`, `tool-bar`, `action-items`, `articles-section`, `articles-list`, `list`, `source-list`, `playlists-section`, `trending-card`, `suggestions-card`, `left-scrim` / `right-scrim`.

---

## 4. Styles used across Page 38

Every value below already exists in `src/design-system/tokens/` — nothing new needs to be invented.

**Text styles** (`src/design-system/text-styles.css`)
| Figma style | Utility | Where |
|---|---|---|
| `heading/heading-subsection` | `text-heading-subsection` | button labels, tabs, menu items, input labels |
| `body/body-default` | `text-body-default` | placeholders, card descriptions, list rows |
| `body/body-small` | `text-body-small` | badges, meta rows, dropdown labels, section headers |
| `heading/heading-page` | `text-heading-page` | screen titles |
| `heading/heading-section` | `text-heading-section` | card titles |
| `display/*` | `text-display-*` | marketing/auth headlines |

**Colors** — `text/{default,subtle,muted,hint}`, `bg/{muted,subtle,card,card-subtle,sidebar,input,input-soft,overlay}`, `bg/state/{primary,secondary,soft,ghost,destructive}` + hover/press/loading, `bg/badge/{default,gray,cyan,…}`, `bg/basic/{color}-strong`, `bg/checkbox/{default,active}`, `icon/default{,-subtle,-muted,-disabled}`, `border/{default,darker,strong,highlight,input-highlight}`.

**Radius** — `2xs` 4, `xs` 6, `sm` 8, `md` 12, `card-md` 16, `full`.
**Stroke** — `default` 1px (dashed on Button/Filter Button/Divider).
**Spacing** — 2, 4, 6, 8, 10, 12, 14, 16, 20, 24, 32, 40, 48.
**Shadows** — `shadows/card`, `components/default`, `shadows/input-focus`, `shadows/modal-*` (filter popover), `misc-focus` (focus rings).

---

## 5. What we recreate — build order

Only these get built. Everything else on the canvas is either a page-level layout frame, a hidden component, or an asset.

**Status: all of the below are implemented** in `src/design-system/components/`, blueprinted in `src/blueprints/`, and rendered on the preview page (`src/preview/DesignSystemPreview.tsx`, served at `/`).

### Tier 1 — atoms (no component dependencies)
1. `Icon` — SVG sprite wrapper on `icon/*` tokens
2. `Button` — variants × sizes × icon-only × dashed × pill
3. `LinkButton`
4. `Badge` — full color set
5. `Divider`
6. `Avatar`
7. `Checkbox`
8. `Radio`
9. `Switch`
10. `AudioWave`
11. `PublicationLogo` / `SocialLogo`
12. `AlbumCover`
13. `SourceIcon`

### Tier 2 — atoms that compose Tier 1
14. `FilterButton` (Button-based)
15. `DropdownButton` (Button-based)
16. `TabItem` → `Tabs`
17. `Input` (search + labeled + soft + `LabeledTextArea`)
18. `CheckboxWithText`
19. `SwitchWithText`
20. `ChoiceCard` / `ChannelRow` / `BackgroundPicker`
21. `SocialButton`
22. `SidebarMenuItem` (uses `Badge`, `Icon`)
23. `AudioButton` (uses `Button`, `AudioWave`)
24. `SearchInput` + `DropdownMenuItem`

### Tier 3 — cards & list rows
25. `ArticleCard` (+ `type`, `state`)
26. `ArticleCardSmall`
27. `FeaturedArticleCard`
28. `PlaylistCard`
29. `DailyBriefVerticalCard`
30. `DailyBriefHorizontalCard`
31. `SourceCard`
32. `TopicItem`
33. `ChatItem`
34. `PerspectiveCard`

### Tier 4 — composed surfaces
35. `TextArea` (composer)
36. `ChatBubble`
37. `BottomContainer`
38. `Sidebar`
39. `NewSubscriptionModal` + `ModalOverlay`

### Screens implemented
Home, Discovery, Daily Briefs, Daily brief details, Chats, Chat details, New chat, Saved, Topic details, Source details, Article details, Subscriptions (topics/sources), the three New Subscription overlay states, and the four auth screens.

### Explicitly out of scope
- `Navbar` — hidden on every Page 38 screen.
- `filter` popover internals — only used on home-topics-filter.
- `article-details (updated)` (`15270:6358`) — second frame of the same article layout.

---

## 6. Rules for the implementation

- Tokens only: import from `@ds` (or the `--ds-*` CSS variables / `text-*` utilities). No raw hex, px-from-nowhere, or new tokens.
- Compose, never duplicate: a Tier-3 card imports `Badge`/`Button`/`Cover`; it does not re-style them inline.
- One blueprint per component in `src/blueprints/`, following `BLUEPRINT_CREATION-GUIDE.md`.
- Figma node IDs stay in the blueprint, not in the component source.

---

## 7. Decisions made while building

Four things weren't specified by the file and needed a call:

**Styling system — Tailwind utilities over inline style objects.** `BLUEPRINT-TO-CODE-GUIDE.md` shows inline styles importing from `src/design-system/tokens/*.js`, but that guide predates this repo's setup: there is no `design-system-v2`, and `theme.css` already maps every token into the Tailwind v4 theme with `--spacing: 1px`. So components use token-derived utilities (`bg-bg-state-secondary`, `text-body-default`, `rounded-card-md`, `shadow-component`, `p-8`), which is still tokens-only — just expressed through the theme the repo actually has. The token TS exports remain available via `@ds` for anything that needs values in JS.

**Icons — `@phosphor-icons/react`.** Figma exports each glyph as a URL that expires in 7 days, so those can't back a design system. The glyph set in the file is Phosphor, and the existing guide already mandates this package. `Icon` wraps it with the `icon/*` colour tokens and the wrapper/glyph size pairs the file uses.

**Brand assets — not fabricated.** Marks are never hand-drawn as approximations; each component takes a `src` and falls back to a token-styled initial until the real file exists. Current state of `src/design-system/assets/`:

| Asset | Status |
|---|---|
| Ambit wordmark | shipped — `ambit-logo.png`, the default for `Logo` and so for `Sidebar` |
| `social-logos` (7 marks) | shipped — `social/*.png`, resolved by `SocialLogo` from the name |
| `bg-flower` cover artwork (12) | shipped — `covers/flower-01…12.png`, via `flowerCovers` / `flowerCoverFor(key)` |
| `publication-logos` (14 marks) | **missing** — `PublicationLogo` shows the source initial |
| Apple / Google / Microsoft marks | **missing** — `SocialButton` renders the label only |

**Out of scope, deliberately.** `Navbar` (hidden on every screen), `Builder Items` (article prose blocks — plain typography, best done with the article-details page), the `filter` popover's `Search Input` / `Dropdown Menu Items` (only used inside that one popover), and the screens themselves. The page-level layout frames — `center-container`, `tool-bar`, `articles-section`, rails and scrims — are next, and they consume these components rather than adding to them.
