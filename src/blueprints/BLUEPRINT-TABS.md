# TABS / TAB ITEM Blueprint

## Design Overview

**Template Name:** Tabs (`15177:76656`), Tab Items (`15234:4774`)
**Node IDs:** `15177:76656` / `15256:27943` / `15210:87961` (home, 145 × 30, "Topics | Sources"), `15210:88687` / `15210:89397` (subscriptions), `15234:4772` (discovery — a bare 12-item rail, 787px wide, no container fill), `15255:8346` (inside the `filter` popover, 258 × 46)
**Purpose:** Segmented navigation. Two shapes: a **contained** group with a soft track (home/subscriptions/filter), and a **rail** of items with no track that scrolls horizontally with a fade scrim (discovery).

## Design Tokens & Variables

### Colors — track
| Token | Value | Usage |
|-------|-------|-------|
| `bg/state/soft` | `transparent/light/8` | the `Tabs` track (contained shape only) |

### Colors — item
| State | Background | Border | Label |
|---|---|---|---|
| selected | `bg/state/secondary` `transparent/light/4` | 1px solid `border/darker` | `text/default` |
| idle | `bg/state/ghost` (transparent) | none | `text/muted` |
| hover (idle) | `bg/state/ghost-hover` | none | `text/default` |

### Typography
| Style | Font Family | Size | Weight | Line Height | Letter Spacing |
|-------|-------------|------|--------|-------------|----------------|
| `heading/heading-subsection` | body | 14px (`size/sm`) | 400 | 1.0 | 0 |

### Spacing
| Token | Value | Usage |
|-------|-------|-------|
| `spacing-2` | 2px | track padding, gap between items |
| `spacing-10` | 10px | item padding-x |
| `spacing-6` | 6px | item padding-y |
| `spacing-4` | 4px | item gap (icon → label) |

### Border Radius
| Token | Value | Usage |
|-------|-------|-------|
| `radius-sm` | 8px | both the track and each item |

### Shadows
| Name | Applies to |
|------|------------|
| `components/default` | the **selected** item only |

## Component Hierarchy (Pseudo-Code)

```pseudo
ROOT: Tabs
├── LAYOUT: Flex Row
├── WIDTH: Hug Content (contained) | Fill + horizontal scroll (rail)
├── HEIGHT: Hug Content (30px contained)
├── GAP: 2px (spacing-2)
├── PADDING: 2px (spacing-2) — contained only
├── FILL: bg/state/soft — contained only
├── CORNER-RADIUS: radius-sm — contained only
│
└── [COMPONENT] TabItem × n
    ├── [COMPONENT] Icon      (optional)
    └── [ELEMENT] Label
        └── [TEXT] label
```

## Component Specifications

### 1. Tabs_Contained
**Node ID:** `15177:76656` · 145 × 30

```pseudo
Tabs {
  TYPE: Container
  POSITION: Relative

  DIMENSIONS:
    - width: Hug Content
    - height: Hug Content (30px)

  AUTO-LAYOUT: Yes (Flex)
    - direction: Row
    - align-items: Center
    - justify-content: Start
    - gap: 2px (spacing-2)

  PADDING: 2px on all sides (spacing-2)

  FILL:
    - type: Solid
    - color: rgba(217,210,206,0.08) (bg/state/soft)

  STROKE: none
  CORNER-RADIUS: 8px (radius-sm)
  OVERFLOW: Clip

  CHILDREN:
    ├── [COMPONENT] TabItem (selected)   // "Topics"
    └── [COMPONENT] TabItem (idle)       // "Sources"
}
```

### 2. TabItem_Selected
**Node ID:** `I15177:76656;3858:4023`

```pseudo
TabItem {
  TYPE: Button Container
  POSITION: Relative

  DIMENSIONS:
    - width: Hug Content
    - height: Hug Content (26px)

  AUTO-LAYOUT: Yes (Flex)
    - direction: Row
    - align-items: Center
    - justify-content: Center
    - gap: 4px (spacing-4)

  PADDING:
    - top: 6px    (spacing-6)
    - right: 10px (spacing-10)
    - bottom: 6px (spacing-6)
    - left: 10px  (spacing-10)

  FILL: rgba(217,210,206,0.04) (bg/state/secondary)

  STROKE:
    - position: Inside
    - weight: 1px (stroke-default)
    - color: rgba(217,210,206,0.15) (border/darker)
    - style: SOLID

  CORNER-RADIUS: 8px (radius-sm)
  OVERFLOW: Clip
  SHADOW: components/default

  CHILDREN:
    └── [ELEMENT] Label {
          PADDING: 0 2px (spacing-2)
          └── [TEXT] "Topics" {
                TYPOGRAPHY: heading-subsection
                COLOR: #ffffff (text/default)
              }
        }
}
```

### 3. TabItem_Idle
**Node ID:** `I15177:76656;3858:4024` — same geometry as spec 2 with `FILL: bg/state/ghost`, **no** stroke, **no** shadow, and label on `text/muted`.

### 4. Tabs_Rail
**Node ID:** `15234:4772` · 787 × 26 (discovery)

```pseudo
Tabs {
  DIMENSIONS: Fill Parent (624px viewport) × 26px, content 787px
  AUTO-LAYOUT: Row, gap 8px (spacing-8)
  PADDING: 0px
  FILL: none
  CORNER-RADIUS: 0px
  OVERFLOW: Scroll-x (scrollbar hidden)

  CHILDREN: [COMPONENT] TabItem × 12
  SIBLING: [ELEMENT] right-scrim   // 64px fade to bg/muted, pinned right
}
```

## Variant Matrix

| Prop | Values | Effect |
|---|---|---|
| `shape` | `contained` / `rail` | soft track + 2px padding, or transparent scrolling row |
| item `selected` | boolean | secondary bg + border + shadow + `text/default` |

## States

| State | Trigger | Tokens applied |
|---|---|---|
| Selected | `value === item.value` | per matrix |
| Hover (idle) | `:hover` | `bg/state/ghost-hover`, label → `text/default` |
| Press | `:active` | `bg/state/ghost-press` |
| Focused | `:focus-visible` | `--shadow-misc-focus` |
| Disabled | item `disabled` | `text/hint`, `cursor: not-allowed` |

## Props

### Tabs
| Prop | Type | Default | Description |
|---|---|---|---|
| `items` | `{ value: string; label: string; icon?: PhosphorIcon }[]` | — | tab definitions |
| `value` | `string` | — | selected tab value |
| `onValueChange` | `(value: string) => void` | — | selection handler |
| `shape` | `"contained" \| "rail"` | `"contained"` | layout shape |

### TabItem
| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `ReactNode` | — | label |
| `selected` | `boolean` | `false` | selected state |
| `icon` | `PhosphorIcon` | — | optional lead icon |
| `onClick` | `() => void` | — | select handler |

## Accessibility

- `Tabs` renders `role="tablist"`; each item is `role="tab"` with `aria-selected`. Only the selected tab is in the tab order (`tabIndex={0}`); the rest are `-1` and reachable with arrow keys, per the ARIA tabs pattern.
- Left/Right arrows move selection, `Home`/`End` jump to the first/last tab.
- The rail shape keeps the same roles — scrolling is a visual concern.

## Notes / Warnings

- The scrim beside the discovery rail is a gradient overlay owned by the page layout, not by `Tabs`. It must not intercept pointer events.
- The selected item carries **both** a 1px stroke and the `components/default` shadow; dropping either makes the selected pill look flat against the track.
- That stroke is *inside* in Figma, so it doesn't grow the 26px item. Implemented as a CSS `border` it would make the item 28px and the whole track 32px instead of 30px, so it is an `inset 0 0 0 1px` ring composed with the shadow token.
