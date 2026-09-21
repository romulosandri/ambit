# PAGE LAYOUT Blueprint

## Design Overview

**Template Name:** the app shell — `right-content` → `page-content` → `center-container`, plus the repeating section frames
**Node IDs:** `15190:79356` (chats, the reference), `15177:76645` (home-topics), and the same structure on all 15 app screens
**Purpose:** These are **not** library components — they are the local auto-layout frames every screen repeats. They live in `src/layout/` rather than `src/design-system/components/` because they are page scaffolding, not published Figma components.

Every app screen is `1440 × 1024` and decomposes the same way:

```
1440 × 1024  frame                     bg: bg/muted
├── 280 × 1024   Sidebar               bg: bg/muted
└── 1160 × 1024  right-content         padding 12px
    ├── 1136 × 32    Navbar            hidden on every screen — not built
    └── 1136 × 1000  page-content      bg: bg/subtle, radius-card-md
        ├── 640 × 904   center-container   centred, 48px from the top
        └── 1136 × 197  bottom-container   pinned to the bottom (y = 803)
```

## Design Tokens & Variables

### Colors
| Token | Value | Usage |
|-------|-------|-------|
| `bg/muted` | `cobblestone/950` `#0E0907` | page background, behind the panel |
| `bg/subtle` | `cobblestone/900` `#1F1814` | the `page-content` panel, and the composer dock |
| `text/subtle` | `transparent/light/70` | section header labels |
| `border/default` | `transparent/light/10` | dashed section dividers |

### Typography
| Style | Usage |
|-------|-------|
| `display/display-small` (headline, 30px, 400, 0.8, -0.01em) | page titles — "Chats", "Matt, here is what you missed..." |
| `body/body-default` (body, 14px, 400, 1.2) | section header labels — "Topics", "Today" |

Note: page titles are **display-small at 30px**, not `heading-page`. A 30px line at 0.8 leading is the 24px-tall title frame seen in the metadata.

### Spacing — the numbers that define the shell
| Value | Token | Where |
|---|---|---|
| 12px | `spacing-12` | `right-content` padding, i.e. the panel inset |
| 48px | `spacing-48` | `center-container` top offset |
| 640px | — | `center-container` width, horizontally centred in the 1136px panel |
| 24px | `spacing-24` | gap between every `center-container` child |
| 8px | `spacing-8` | header horizontal inset, and its top/bottom padding |
| 24px | `spacing-24` | page title → tool-bar gap |
| 20px | `spacing-20` | tool-bar leading element → action items |
| 12px | `spacing-12` | section header → its list |
| 20px | `spacing-20` | gap between article cards in a list |
| 4px | `spacing-4` | gap between cards in a horizontal rail |
| 64px | `spacing-64` | width of the rail edge scrims |

### Border Radius
| Token | Value | Usage |
|-------|-------|-------|
| `radius-card-md` | 16px | the `page-content` panel |
| `radius-sm` | 8px | section header hit area |

## Component Hierarchy (Pseudo-Code)

```pseudo
ROOT: AppShell
├── LAYOUT: Flex Row, height 100svh
├── FILL: bg/muted
│
├── [COMPONENT] Sidebar               // 280px, from the design system
└── [ELEMENT] right-content
    ├── PADDING: 12px (spacing-12)
    └── [ELEMENT] page-content
        ├── FILL: bg/subtle
        ├── CORNER-RADIUS: radius-card-md
        ├── OVERFLOW: hidden
        │
        ├── [ELEMENT] scroll-area      (flex-1, overflow-y auto)
        │   └── [ELEMENT] CenterContainer
        │       ├── WIDTH: 640px, centred
        │       ├── PADDING-TOP: 48px (spacing-48)
        │       ├── GAP: 24px (spacing-24)
        │       └── children…
        └── [ELEMENT] BottomContainer  (absolute, bottom 0)
```

## Component Specifications

### 1. PageHeader
**Node IDs:** `15190:79362` (chats, 640 × 96), `15177:76651` (home-topics, 640 × 94)

```pseudo
PageHeader {
  TYPE: Container
  DIMENSIONS: width Fill (640px) × Hug (96px)

  AUTO-LAYOUT: Yes (Flex)
    - direction: Column
    - gap: 24px (spacing-24)

  PADDING:
    - top: 8px    (spacing-8)
    - right: 8px  (spacing-8)
    - bottom: 8px (spacing-8)
    - left: 8px   (spacing-8)

  CHILDREN:
    ├── [ELEMENT] title {
    │     AUTO-LAYOUT: Row / Center, gap 8px (spacing-8)
    │     ├── [COMPONENT] Avatar (xs) — optional, present on home
    │     └── [TEXT] title {
    │           TYPOGRAPHY: display-small (headline, 30px, 400, 0.8, -0.01em)
    │           COLOR: text/default
    │         }
    │   }
    └── [ELEMENT] ToolBar — optional
}
```

Header height check: `8 + 24 (title) + 24 (gap) + 32 (tool-bar) + 8 = 96`.

### 2. ToolBar
**Node IDs:** `15190:79364` (chats: `SearchInput` + `Button`), `15177:76655` (home: `Tabs` + `FilterButton` + icon `Button`)

```pseudo
ToolBar {
  AUTO-LAYOUT: Row / Center, gap 20px (spacing-20)
  DIMENSIONS: width Fill (624px) × Hug (30–32px)

  CHILDREN:
    ├── [ELEMENT] lead        // SearchInput (grows) or Tabs (hugs)
    └── [ELEMENT] action-items {
          AUTO-LAYOUT: Row / Center, gap 8px (spacing-8)
          pinned right
        }
}
```

Note: the chats tool-bar uses a 12px gap rather than 20px because its search field fills the row. Since the field grows to fill, the rendered result is the same total width; the component uses one 20px gap for all screens.

### 3. SectionHeader
**Node ID:** `15177:76680` ("Today"), `15177:76662` ("Topics" + `DropdownButton` + two rail arrows)

```pseudo
SectionHeader {
  AUTO-LAYOUT: Row / Center, gap 4px (spacing-4)
  PADDING: 4px (spacing-4) vertical, 8px (spacing-8) horizontal
  FILL: bg/state/ghost
  CORNER-RADIUS: 8px (radius-sm)

  CHILDREN:
    ├── [ELEMENT] container {
    │     AUTO-LAYOUT: Row / Center, gap 6px (spacing-6), padding 0 2px
    │     ├── [TEXT] label {
    │     │     TYPOGRAPHY: body-default (body, 14px, 400, 1.2, 0)
    │     │     COLOR: rgba(217,210,206,0.7) (text/subtle)
    │     │   }
    │     └── [COMPONENT] DropdownButton — optional ("Last 7 Days")
    │   }
    └── [ELEMENT] action-items {
          pinned right, gap 4px (spacing-4)
          └── [COMPONENT] Button × 2   // iconOnly, ghost, sm (28px) — CaretLeft / CaretRight
        }
}
```

### 4. CardRail
**Node ID:** `15177:76670` (640 × 206, four 180px `playlist-card`s)

```pseudo
CardRail {
  POSITION: Relative
  AUTO-LAYOUT: Row, gap 4px (spacing-4)
  OVERFLOW: scroll-x (scrollbar hidden)

  CHILDREN: card components sized by this rail, not by themselves
           (the rail forces `flex-shrink: 0` on them, otherwise a 180px
            playlist-card collapses to fit the 640px viewport)

  OVERLAYS:
    ├── [ELEMENT] left-scrim  { width 64px, pinned left,  gradient bg/subtle → transparent, hidden at scroll start }
    └── [ELEMENT] right-scrim { width 64px, pinned right, gradient bg/subtle → transparent, hidden at scroll end }
}
```

Scrims are `pointer-events: none` so they never block a card.

### 5. ArticleSection
**Node ID:** `15177:76679` (640 × 687)

```pseudo
ArticleSection {
  AUTO-LAYOUT: Column / Start, gap 12px (spacing-12)

  CHILDREN:
    ├── [ELEMENT] SectionHeader        // the date: "Today", "Yesterday", "Mon, 14 Sep"
    └── [ELEMENT] articles-list {
          AUTO-LAYOUT: Column, gap 20px (spacing-20)
          └── [COMPONENT] ArticleCard × n
        }
}
```

### 6. BottomContainer — the composer dock
**Node ID:** `15202:22552` / instanced `15203:23378` · 1136 × 197

```pseudo
BottomContainer {
  POSITION: Absolute — pinned to the bottom of page-content, full width
  AUTO-LAYOUT: Column, gap 0px

  CHILDREN:
    ├── [ELEMENT] scrim {
    │     DIMENSIONS: width Fill × 32px
    │     FILL: linear-gradient(to top, bg/subtle, transparent)
    │     POINTER-EVENTS: none
    │   }
    └── [ELEMENT] chat-container {
          FILL: #1f1814 (bg/subtle)
          AUTO-LAYOUT: Column / Center, gap 12px (spacing-12)
          PADDING: 0 16px 16px (spacing-16)
          ├── [COMPONENT] TextArea {
          │     DIMENSIONS: width Fill, max-width 770px, height 120px
          │   }
          └── [TEXT] "Ambit can make mistakes. Check important info." {
                TYPOGRAPHY: body-default
                COLOR: rgba(217,210,206,0.5) (text/muted)
                text-align: center
              }
        }
}
```

Figma renders the scrim as a PNG gradient; in code it is a CSS gradient on `bg/subtle`, which is the same pixels and stays correct if the panel colour changes.

## States

| State | Trigger | Behaviour |
|---|---|---|
| Scrolled | `scroll-area` scrollTop > 0 | content passes under the dock scrim |
| Rail at start | rail scrollLeft = 0 | left scrim hidden (matches `left-scrim` being `hidden` in every Figma instance) |
| Rail at end | rail fully scrolled | right scrim hidden |

## Props

### AppShell
| Prop | Type | Description |
|---|---|---|
| `sidebar` | `ReactNode` | the `Sidebar` component |
| `dock` | `ReactNode` | optional `BottomContainer` |
| `overlay` | `ReactNode` | full-shell overlay (modals) |
| `topBar` | `ReactNode` | pinned Back control, outside the scroll |
| `children` | `ReactNode` | page content, usually one `CenterContainer` |

### CenterContainer
| Prop | Type | Default | Description |
|---|---|---|---|
| `hasDock` | `boolean` | `false` | adds bottom padding so content can scroll clear of the dock |

## Accessibility

- `page-content` is the `<main>` landmark; the sidebar is the `<nav>`.
- The scroll area is a real scroll container so keyboard `PageDown` and `Home`/`End` work without JS.
- Rail scrims are `aria-hidden` and non-interactive, so keyboard users can still tab to cards hidden under a fade.
- `ArticleSection` renders `<section>` with its date header as the accessible name via `aria-labelledby`.

## Notes / Warnings

- `Navbar` is instanced above `page-content` on every screen and is `hidden` in all of them. It is not built.
- The 640px `center-container` is a fixed width in Figma; in code it is `w-640 max-w-full` so narrow windows degrade instead of clipping.
- Nothing here should introduce new visual tokens. If a page needs a colour or a radius that isn't already used by a component, that is a signal the design changed, not that the layout needs a new value.
