# SIDEBAR MENU ITEM Blueprint

## Design Overview

**Template Name:** Sidebar Menu Items
**Node IDs:** `I15190:79357;4146:138977` (Home, idle), `I15190:79357;15170:74496` (Chats, active), `I15190:79357;15152:22662` (Widgets — trailing "Soon" label), `I15190:79357;4146:138979` (Subscriptions — `Badge` + tail button), `I15190:79357;4146:138982` (the "Settings" group heading), and reused as a section header at `15177:76663` / `15237:5021` / `15190:79282`
**Purpose:** A 32px navigation row. It is also the file's generic "labelled row with optional trailing bits", which is why section headers on the content pages are the same component in a label-only configuration.

## Design Tokens & Variables

### Colors
| State | Background | Label | Icon |
|---|---|---|---|
| idle | `bg/state/ghost` (transparent) | `text/subtle` | `icon/default-subtle` |
| hover | `bg/state/ghost-hover` `transparent/light/8` | `text/default` | `icon/default` |
| active | `bg/state/soft` `transparent/light/8` | `text/default` | `icon/default` |
| muted (e.g. "Widgets") | `bg/state/ghost` | `text/muted` | `icon/default-muted` |
| header | none | `text/subtle` | — |

### Typography
| Style | Font Family | Size | Weight | Line Height | Usage |
|-------|-------------|------|--------|-------------|-------|
| `heading/heading-subsection` | body | 14px | 400 | 1.0 | item label |
| `body/body-default` | body | 14px | 400 | 1.2 | trailing label ("Soon") |
| `body/body-small` | body | 12px | 400 | 1.25 | header variant label |

### Spacing
| Token | Value | Usage |
|-------|-------|-------|
| `spacing-6` | 6px | item padding (all sides) and gap |
| `spacing-4` | 4px | label slot padding-x |
| `spacing-8` | 8px | header variant padding-x |
| `spacing-2` | 2px | gap between stacked items (owned by the parent) |

### Border Radius
| Token | Value |
|-------|-------|
| `radius-sm` | 8px |

## Component Hierarchy (Pseudo-Code)

```pseudo
ROOT: SidebarMenuItem
├── LAYOUT: Flex Row
├── WIDTH: Fill Parent
├── HEIGHT: 32px (item) | Hug (header)
├── ALIGNMENT: center
├── GAP: 6px (spacing-6)
├── CORNER-RADIUS: radius-sm
│
├── [COMPONENT] Icon          (optional — size lg: 20px box / 18px glyph)
├── [ELEMENT] Label           (fills remaining width)
│   └── [TEXT] children
├── [ELEMENT] TrailingLabel   (optional — "Soon")
├── [COMPONENT] Badge         (optional — count, e.g. "12")
└── [COMPONENT] Button        (optional — 20px tail action, e.g. add subscription)
```

## Component Specifications

### 1. SidebarMenuItem_Active
**Node ID:** `I15190:79357;15170:74496` · Fill × 32

```pseudo
SidebarMenuItem {
  TYPE: Button Container
  POSITION: Relative

  DIMENSIONS:
    - width: 100% (Fill Parent)
    - height: 32px (Fixed)

  AUTO-LAYOUT: Yes (Flex)
    - direction: Row
    - align-items: Center
    - justify-content: Start
    - gap: 6px (spacing-6)

  PADDING: 6px on all sides (spacing-6)

  FILL:
    - type: Solid
    - color: rgba(217,210,206,0.08) (bg/state/soft)

  STROKE: none
  CORNER-RADIUS: 8px (radius-sm)

  CHILDREN:
    ├── [COMPONENT] Icon {
    │     wrapper: 20px, glyph: 18px (size lg)
    │     tone: default
    │   }
    └── [ELEMENT] Label {
          width: Fill
          PADDING: 0 4px (spacing-4)
          └── [TEXT] "Chats" {
                TYPOGRAPHY: heading-subsection (body, 14px, 400, 1.0, 0)
                COLOR: #ffffff (text/default)
                white-space: nowrap
              }
        }
}
```

### 2. SidebarMenuItem_Idle
**Node ID:** `I15190:79357;4146:138977` — same geometry, `FILL: bg/state/ghost`, label `text/subtle`, icon tone `subtle`.

### 3. SidebarMenuItem_WithTrailing — "Subscriptions"
**Node ID:** `I15190:79357;4146:138979`

```pseudo
SidebarMenuItem {
  // geometry as spec 2
  CHILDREN:
    ├── [COMPONENT] Icon (lg, subtle)
    ├── [ELEMENT] Label → [TEXT] "Subscriptions"   // text/subtle
    ├── [COMPONENT] Badge (color default) → "12"
    └── [COMPONENT] Button {
          iconOnly, style "ghost", 20px box
          glyph: Plus (16px)
        }
}
```

### 4. SidebarMenuItem_Muted — "Widgets"
**Node ID:** `I15190:79357;15152:22662` — label and icon on `*-muted` tokens, plus a trailing label:

```pseudo
    └── [ELEMENT] TrailingLabel {
          PADDING: 0 4px (spacing-4)
          └── [TEXT] "Soon" {
                TYPOGRAPHY: body-default (body, 14px, 400, 1.2, 0)
                COLOR: rgba(217,210,206,0.5) (text/muted)
              }
        }
```

### 5. SidebarMenuItem_Header — "Settings" / "Topics" / "Trending Topics"
**Node IDs:** `I15190:79357;4146:138982` (sidebar), `15177:76663` (content page)

```pseudo
SidebarMenuItem {
  DIMENSIONS: Fill × Hug (23–24px)
  AUTO-LAYOUT: Row / Center, gap 4px (spacing-4)
  PADDING: 4px (spacing-4) vertical, 8px (spacing-8) horizontal
  FILL: bg/state/ghost
  CORNER-RADIUS: 8px (radius-sm)

  CHILDREN:
    └── [ELEMENT] Label {
          PADDING: 0 2px (spacing-2)
          └── [TEXT] "Settings" {
                TYPOGRAPHY: body-small (body, 12px, 400, 1.25, 0)
                COLOR: rgba(217,210,206,0.7) (text/subtle)
              }
        }
}
```

## Variant Matrix

| Prop | Values | Effect |
|---|---|---|
| `variant` | `item` (32px row) / `header` (label-only, 12px text) | geometry + typography |
| `active` | boolean | `bg/state/soft` + `text/default` |
| `tone` | `default` / `muted` | `text/subtle` vs `text/muted` (the "Widgets, Soon" case) |
| `badge` | `ReactNode` | renders a `Badge` before the tail action |
| `trailingLabel` | `string` | small right-aligned text |
| `tailAction` | `{ icon, label, onClick }` | renders a 20px ghost icon `Button` |

## States

| State | Trigger | Tokens applied |
|---|---|---|
| Idle | — | ghost bg, `text/subtle` |
| Hover | `:hover` | `bg/state/ghost-hover`, label → `text/default` |
| Press | `:active` | `bg/state/ghost-press` |
| Active | `active` prop | `bg/state/soft`, `text/default` |
| Focused | `:focus-visible` | `--shadow-misc-focus` |
| Disabled | `disabled` | `text/hint`, `cursor: not-allowed` |

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `ReactNode` | — | label |
| `icon` | `PhosphorIcon` | — | lead icon |
| `variant` | `"item" \| "header"` | `"item"` | row shape |
| `active` | `boolean` | `false` | current page |
| `tone` | `"default" \| "muted"` | `"default"` | label emphasis |
| `badge` | `ReactNode` | — | count badge content |
| `trailingLabel` | `string` | — | e.g. `"Soon"` |
| `tailAction` | `{ icon: PhosphorIcon; label: string; onClick: () => void }` | — | trailing icon button |
| `href` | `string` | — | renders an `<a>` for real navigation |

## Accessibility

- Navigation items render `<a>` when `href` is set, with `aria-current="page"` when `active`. Without `href` they are `<button>`.
- `tailAction` is a **nested button**, which is invalid inside another `<button>`. So when `tailAction` is present the row renders as a container with the main target as its own `<a>`/`<button>` sibling, keeping both actions independently focusable.
- The `header` variant is not interactive and renders a plain element, not a control.

## Notes / Warnings

- The nested-interactive problem above is the one real structural change from Figma, where everything is just frames. Do not nest a button inside a button to match the layer tree.
- Active vs hover use the *same* colour (`transparent/light/8` via `bg/state/soft` and `bg/state/ghost-hover`). That is correct in the tokens — active is distinguished by persisting, and by the brighter label.
