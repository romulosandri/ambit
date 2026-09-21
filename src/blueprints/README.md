# Blueprints

Component blueprints derived from [Ambit — Design System](https://www.figma.com/design/L5RPQVecMQNnbCh0747l7q/Ambit---Design-System?node-id=15151-8), canvas `15151:8` ("Page 38").

Read `../docs/BLUEPRINT_CREATION-GUIDE.md` for how these are written and `../docs/BLUEPRINT-TO-CODE-GUIDE.md` for how they become code. The scope decision — which components we recreate and why — lives in `../docs/PAGE-38-COMPONENT-INVENTORY.md`.

## Conventions used here

- **Tokens only.** Every value cites the Figma token name and the code utility it maps to. The Tailwind theme in `src/design-system/theme.css` exposes every token, and `--spacing: 1px`, so `p-8` is literally `padding: 8px` from `spacing-8`.
- `[COMPONENT]` in a hierarchy means *import it*; `[ELEMENT]` means build the DOM node inline.
- Sizes are named after the Figma size prop (`md`, `sm`, `xs`), not the pixel height.
- Icons resolve to `@phosphor-icons/react` — see `BLUEPRINT-ICON.md` for why.

### Two traps worth knowing before you implement

Both of these were caught by measuring rendered boxes against the Figma frames, not by looking at screenshots.

1. **Figma "inside" strokes don't add size; CSS borders do.** On a hug-content box, a 1px inside stroke keeps the height; a CSS `border` adds 2px. `Badge` came out 21px instead of 19px and the `Tabs` track 32px instead of 30px until the strokes became `inset 0 0 0 1px` rings. Fixed-height components (`Button`, `AudioButton`) are unaffected.
2. **Conflicting Tailwind utilities resolve by CSS source order, not class-string order.** Passing `className="rounded-sm"` to a component that already sets `rounded-md` may silently lose. Anything a consumer needs to vary is a **prop** (`Cover`'s `size` and `radius`), and a component whose width is parent-driven (`PlaylistCard`, `DailyBriefVerticalCard`) must not set `w-full` at all.

## Build order

Each tier only depends on tiers above it.

All of these are implemented in `src/design-system/components/` and rendered on the preview page at `src/preview/DesignSystemPreview.tsx`.

### Tier 1 — atoms

| Blueprint | Component |
|---|---|
| `BLUEPRINT-ICON.md` | `Icon` |
| `BLUEPRINT-BUTTON.md` | `Button` |
| `BLUEPRINT-LINK-BUTTON.md` | `LinkButton` |
| `BLUEPRINT-BADGE.md` | `Badge` |
| `BLUEPRINT-DIVIDER.md` | `Divider` |
| `BLUEPRINT-AVATAR.md` | `Avatar` |
| `BLUEPRINT-CHECKBOX.md` | `Checkbox` |
| `BLUEPRINT-RADIO.md` | `Radio` |
| `BLUEPRINT-SWITCH.md` | `Switch` |
| `BLUEPRINT-AUDIO-WAVE.md` | `AudioWave` |
| `BLUEPRINT-COVER.md` | `Cover` (album cover / brief image / article thumbnail) |
| `BLUEPRINT-PUBLICATION-LOGO.md` | `PublicationLogo`, `SocialLogo` |

### Tier 2 — atoms composed of Tier 1

| Blueprint | Component | Composes |
|---|---|---|
| `BLUEPRINT-FILTER-BUTTON.md` | `FilterButton` | `Button`, `Badge` |
| `BLUEPRINT-DROPDOWN-BUTTON.md` | `DropdownButton` | `Icon` |
| `BLUEPRINT-TABS.md` | `Tabs`, `TabItem` | `Icon` |
| `BLUEPRINT-INPUT.md` | `SearchInput`, `TextField`, `LabeledTextArea` | `Icon` |
| `BLUEPRINT-CHECKBOX-WITH-TEXT.md` | `CheckboxWithText` | `Checkbox` |
| `BLUEPRINT-SWITCH.md` | `SwitchWithText` | `Switch` |
| `BLUEPRINT-SUBSCRIPTION-CONTROLS.md` | `ChoiceCard`, `ChannelRow`, `BackgroundPicker` | `Radio`, `Checkbox`, `SocialLogo` |
| `BLUEPRINT-SOCIAL-BUTTON.md` | `SocialButton` | `Button` |
| `BLUEPRINT-SIDEBAR-MENU-ITEM.md` | `SidebarMenuItem` | `Icon`, `Badge`, `Button` |
| `BLUEPRINT-AUDIO-BUTTON.md` | `AudioButton` | `Button`, `AudioWave` |
| `BLUEPRINT-TEXT-AREA.md` | `TextArea` | `Button`, `DropdownButton` |

### Tier 3 — cards and list rows

| Blueprint | Component | Composes |
|---|---|---|
| `BLUEPRINT-ARTICLE-CARD.md` | `ArticleCard` | `PublicationLogo`, `Badge`, `Button`, `Cover` |
| `BLUEPRINT-CARDS-AND-ROWS.md` § 1 | `ArticleCardSmall` | `PublicationLogo`, `Cover` |
| `BLUEPRINT-CARDS-AND-ROWS.md` § 2 | `FeaturedArticleCard` | `PublicationLogo`, `Badge`, `AudioButton`, `Cover` |
| `BLUEPRINT-CARDS-AND-ROWS.md` § 3 | `PlaylistCard` | `Cover` |
| `BLUEPRINT-CARDS-AND-ROWS.md` §§ 4–5 | `DailyBriefVerticalCard`, `DailyBriefHorizontalCard` | `Cover`, `AudioButton` |
| `BLUEPRINT-CARDS-AND-ROWS.md` § 6 | `SourceCard` | `PublicationLogo` |
| `BLUEPRINT-CARDS-AND-ROWS.md` § 7 | `TopicItem` | — |
| `BLUEPRINT-CARDS-AND-ROWS.md` § 8 | `ChatItem` | — |
| `BLUEPRINT-PERSPECTIVE-CARD.md` | `PerspectiveCard` | `Cover`, `SourceLine` |

`SourceLine` and `MetaRow` (`src/design-system/components/ArticleMeta.tsx`) are shared internals of the article-shaped cards, specified in `BLUEPRINT-ARTICLE-CARD.md`. Article details now uses them directly.

### Tier 4 — composed surfaces

| Blueprint | Component | Composes |
|---|---|---|
| `BLUEPRINT-CHAT-BUBBLE.md` | `ChatBubble` | `LinkButton`, `Button`, `ArticleCardSmall` |
| `BLUEPRINT-SIDEBAR.md` | `Sidebar` | `SidebarMenuItem`, `Button`, `Badge`, `Avatar`, `Icon` |
| `BLUEPRINT-NEW-SUBSCRIPTION-MODAL.md` | `NewSubscriptionModal`, `ModalOverlay` | `ChoiceCard`, `TextField`, `LabeledTextArea`, `BackgroundPicker`, `SwitchWithText`, `ChannelRow`, `Button`, `Divider` |

### Screens

| Blueprint | Screens |
|---|---|
| `BLUEPRINT-PAGE-LAYOUT.md` | shell shared by every app screen |
| `BLUEPRINT-REMAINING-SCREENS.md` | Saved, Topic details, Source details, Daily brief details, New chat, Article details |
| `BLUEPRINT-AUTH.md` | Sign in, Sign in email, Sign up, Sign up email |

All screens are rendered on the preview page at `src/preview/ScreensPreview.tsx`.

### Verified against Figma

Rendered geometry was measured in the browser and matches the source frames: `Button` 36/32/28/24px by size, `Badge` 19px, `Tabs` 30px with 26px items, `SearchInput` 32px, `TextArea` 120px, `AudioWave` 54 × 18, `AudioButton` 32px, `ArticleCard` 640 × 148 with a 116px thumbnail, `FeaturedArticleCard` 640 × 260 with a 244px cover, `PlaylistCard` 180 × 206, `SourceCard` 88 × 111 with a 72px icon, `ChatItem` 53px, `TopicItem` 41px, `Sidebar` 280px with 32px rows.
