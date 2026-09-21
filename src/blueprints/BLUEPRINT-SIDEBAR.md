# SIDEBAR Blueprint

## Design Overview

**Template Name:** Sidebar
**Node IDs:** instanced on every app screen — `15190:79357` (chats), `15177:76646` (home-topics), `15210:87510`, `15206:83257`, `15234:4437`, `15210:88677`, `15210:89389`, `15190:78646`, `15210:86304`, `15210:90924`, `15210:90288`
**Purpose:** The persistent 280px navigation rail. Identical on every screen except which item is active.

## Design Tokens & Variables

### Colors
| Token | Value | Usage |
|-------|-------|-------|
| `bg/muted` | `cobblestone/950` `#0E0907` | sidebar fill |
| `bg/state/soft` | `transparent/light/8` | active menu item, avatar button |
| `text/subtle` | `transparent/light/70` | idle labels, group headings |
| `text/muted` | `transparent/light/50` | the "Widgets / Soon" pair |
| `text/default` | `#FFFFFF` | active label, avatar name |

### Typography
| Style | Usage |
|-------|-------|
| `heading/heading-subsection` | menu labels, avatar name |
| `body/body-small` | group heading ("Settings"), badge |
| `body/body-default` | trailing "Soon" label |

### Spacing
| Token | Value | Usage |
|-------|-------|-------|
| `spacing-16` | 16px | top/bottom bar padding, group padding-x |
| `spacing-12` | 12px | second group padding-y, avatar button padding-right |
| `spacing-8` | 8px | first group padding-bottom, bottom bar gap |
| `spacing-6` | 6px | avatar button padding-left/y and gap |
| `spacing-2` | 2px | gap between menu items |

### Border Radius
| Token | Value | Usage |
|-------|-------|-------|
| `radius-sm` | 8px | menu items, collapse button |
| `radius-full` | 9999px | avatar button |

## Component Hierarchy (Pseudo-Code)

```pseudo
ROOT: Sidebar
├── LAYOUT: Flex Column
├── WIDTH: 280px
├── HEIGHT: Fill (1024px)
├── FILL: bg/muted
│
├── [ELEMENT] Top
│   ├── [ELEMENT] Logo                    // 85 × 18 wordmark
│   └── [COMPONENT] Button                // iconOnly, ghost, md — collapse rail
│
├── [ELEMENT] Container (flex-1)
│   ├── [ELEMENT] PrimaryGroup            // px-16 pt-16 pb-8, gap-2
│   │   └── [COMPONENT] SidebarMenuItem × 5
│   │        Home · Discovery · Daily Briefs · Chats · Saved
│   └── [ELEMENT] SecondaryGroup          // px-16 py-12, gap-2
│       ├── [COMPONENT] SidebarMenuItem (variant "header")   → "Settings"
│       ├── [COMPONENT] SidebarMenuItem (tone "muted", trailingLabel "Soon") → "Widgets"
│       ├── [COMPONENT] SidebarMenuItem (badge 12, tailAction Plus)          → "Subscriptions"
│       └── [COMPONENT] SidebarMenuItem  → "Customize"
│
└── [ELEMENT] Bottom
    └── [ELEMENT] AvatarButton
        ├── [COMPONENT] Avatar (xs = 20px)
        ├── [ELEMENT] Label → [TEXT] user name
        └── [COMPONENT] Icon (CaretDown, 20px box)
```

## Component Specifications

### 1. Sidebar root
**Node ID:** `15190:79357` · 280 × 1024

```pseudo
Sidebar {
  TYPE: Container (navigation)
  POSITION: Relative

  DIMENSIONS:
    - width: 280px (Fixed)
    - height: 100% (Fill Parent)

  AUTO-LAYOUT: Yes (Flex)
    - direction: Column
    - align-items: Start
    - justify-content: Start
    - gap: 0px

  PADDING: 0px

  FILL:
    - type: Solid
    - color: #0e0907 (bg/muted)

  STROKE: none
  CORNER-RADIUS: 0px
}
```

### 2. Top
**Node ID:** `I15190:79357;4146:138970`

```pseudo
Top {
  AUTO-LAYOUT: Row / Center / Space-Between, width Fill
  PADDING: 16px on all sides (spacing-16)

  CHILDREN:
    ├── [ELEMENT] Logo {
    │     DIMENSIONS: 85px × 18px
    │     SOURCE: src/assets/ambit-wordmark.svg
    │   }
    └── [COMPONENT] Button {
          iconOnly, style "ghost", size md (32px min-width/height)
          glyph: SidebarSimple (20px)
          aria-label: "Collapse sidebar"
        }
}
```

### 3. Bottom — Avatar Button
**Node ID:** `I15190:79357;15151:20932`

```pseudo
AvatarButton {
  TYPE: Button Container
  AUTO-LAYOUT: Row / Center / Center, gap 6px (spacing-6)

  PADDING:
    - top: 6px    (spacing-6)
    - right: 12px (spacing-12)
    - bottom: 6px (spacing-6)
    - left: 6px   (spacing-6)

  FILL: rgba(217,210,206,0.08) (bg/state/soft)
  STROKE: none
  CORNER-RADIUS: 9999px (radius-full)
  OVERFLOW: Clip

  CHILDREN:
    ├── [COMPONENT] Avatar (size xs = 20px)
    ├── [ELEMENT] Label {
    │     PADDING: 0 2px (spacing-2)
    │     └── [TEXT] "Matthew Doe" {
    │           TYPOGRAPHY: heading-subsection
    │           COLOR: text/default
    │         }
    │   }
    └── [COMPONENT] Icon (CaretDown, glyph 20px)
}
```

## Navigation items

| Label | Icon (phosphor) | Notes |
|---|---|---|
| Home | `House` | |
| Discovery | `Compass` | |
| Daily Briefs | `Newspaper` | |
| Chats | `ChatText` | active in the chats reference |
| Saved | `BookmarkSimple` | |
| Settings | — | `header` variant |
| Widgets | `SquaresFour` | `tone="muted"`, `trailingLabel="Soon"` |
| Subscriptions | `Images` | `badge={12}`, `tailAction` = `Plus` |
| Customize | `Gear` | |

## States

| State | Trigger | Tokens applied |
|---|---|---|
| Active item | `activeItem` matches | `bg/state/soft`, `text/default`, `aria-current="page"` |
| Hover item | `:hover` | `bg/state/ghost-hover`, label → `text/default` |
| Collapsed | `collapsed` prop | out of scope — no collapsed frame exists on Page 38 |

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `activeItem` | item id | — | which nav item is current |
| `user` | `{ name: string; avatarSrc?: string }` | — | bottom bar identity |
| `subscriptionCount` | `number` | — | badge on Subscriptions |
| `logoSrc` | `string` | — | wordmark asset |
| `onNavigate` | `(id) => void` | — | navigation handler |
| `onCollapse` | `() => void` | — | collapse button |
| `onAddSubscription` | `() => void` | — | the `+` tail action |
| `onAccountClick` | `() => void` | — | avatar button |

## Accessibility

- The rail is a `<nav aria-label="Main">` containing a `<ul>` of items, so it is reachable as a landmark and announced as a list.
- The active item carries `aria-current="page"`.
- The avatar button is a menu trigger: `aria-haspopup="menu"`.
- Every icon-only control has an `aria-label` — collapse, add subscription, account.

## Notes / Warnings

- The Ambit wordmark is a brand asset, not an icon. Without the asset file the sidebar renders the name in the headline family rather than substituting a glyph.
- `Navbar` (`15190:79359` and siblings) is instanced beside the sidebar on every screen but is `hidden="true"` everywhere, so it is not built.
- Section-heading rows ("Settings") reuse `SidebarMenuItem` with `variant="header"` — the same component the content pages use for "Topics" / "Trending Topics".
