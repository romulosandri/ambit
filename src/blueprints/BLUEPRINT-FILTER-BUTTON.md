# FILTER BUTTON Blueprint

## Design Overview

**Template Name:** Filter Button
**Node IDs:** `15177:76658` (home-topics tool-bar), `15190:79194` (saved), `15210:87365` (daily-brief-details), `15210:89758` (topic-details), `15210:90936` (source-details), `15256:27945` (home-topics-filter)
**Purpose:** The trigger that opens the `filter` popover. Visually a `Button` at `xs` with a dashed border and a muted label — the dashed edge is what signals "nothing applied yet".

Figma exposes `selected`, `shape`, `size`, `state`. Page 38 only uses `selected=False`, `shape=Rounded`, `size=md`, `state=Default`.

## Design Tokens & Variables

### Colors
| Token | Value | Usage |
|-------|-------|-------|
| `bg/state/secondary` | `transparent/light/4` | background (unselected) |
| `bg/state/secondary-hover` | `transparent/light/8` | hover |
| `bg/state/soft` | `transparent/light/8` | background when `selected` |
| `border/darker` | `transparent/light/15` | 1px dashed border |
| `text/muted` | `transparent/light/50` | label (unselected) |
| `text/default` | `#FFFFFF` | label (selected) |
| `icon/default-muted` | `transparent/light/50` | lead icon (unselected) |

### Typography
| Style | Font Family | Size | Weight | Line Height | Letter Spacing |
|-------|-------------|------|--------|-------------|----------------|
| `heading/heading-subsection` | body | 14px (`size/sm`) | 400 | 1.0 | 0 |

### Spacing
| Token | Value | Usage |
|-------|-------|-------|
| `spacing-8` | 8px | padding-x |
| `spacing-4` | 4px | padding-y, and gap |
| `spacing-2` | 2px | label padding-x |

### Border Radius
| Token | Value |
|-------|-------|
| `radius-sm` | 8px |

### Shadows
None in the unselected state (unlike a solid secondary `Button`).

## Component Hierarchy (Pseudo-Code)

```pseudo
ROOT: FilterButton
└── [COMPONENT] Button {
      style: "secondary"
      size: "xs"
      borderStyle: "dashed"
      leadIcon: Sliders (Funnel-style filter glyph)
    }
    └── [TEXT] "Filter"
```

This is a thin wrapper, not a re-implementation: it configures `Button` and adds the `selected` semantics.

## Component Specifications

**Node ID:** `15177:76658` · 71 × 24

```pseudo
FilterButton {
  TYPE: Button Container
  POSITION: Relative

  DIMENSIONS:
    - width: Hug Content (71px with the "Filter" label)
    - height: 24px (Fixed)

  AUTO-LAYOUT: Yes (Flex)
    - direction: Row
    - align-items: Center
    - justify-content: Center
    - gap: 4px (spacing-4)

  PADDING:
    - top: 4px    (spacing-4)
    - right: 8px  (spacing-8)
    - bottom: 4px (spacing-4)
    - left: 8px   (spacing-8)

  FILL:
    - type: Solid
    - color: rgba(217,210,206,0.04) (bg/state/secondary)

  STROKE:
    - position: Inside
    - weight: 1px (stroke-default)
    - color: rgba(217,210,206,0.15) (border/darker)
    - style: DASHED

  CORNER-RADIUS: 8px (radius-sm)
  OVERFLOW: Clip
  SHADOW: none

  CHILDREN:
    ├── [COMPONENT] Icon (size md, tone muted)
    └── [ELEMENT] Label {
          PADDING: 0 2px (spacing-2)
          └── [TEXT] "Filter" {
                TYPOGRAPHY: heading-subsection
                COLOR: rgba(217,210,206,0.5) (text/muted)
              }
        }
}
```

## Variant Matrix

| `selected` | Background | Border | Label / Icon |
|---|---|---|---|
| `false` | `bg/state/secondary` | 1px dashed `border/darker` | `text/muted` / `icon/default-muted` |
| `true` | `bg/state/soft` | 1px solid `border/darker` | `text/default` / `icon/default` |

When `selected`, a `Badge` may follow the label to show the applied-filter count (pattern exists in the file's filter popover; not instanced on Page 38).

## States

| State | Trigger | Tokens applied |
|---|---|---|
| Default | — | per matrix |
| Hover | `:hover` | `bg/state/secondary-hover`, label → `text/default` |
| Press | `:active` | `bg/state/secondary-press` |
| Focused | `:focus-visible` | `--shadow-misc-focus` |
| Disabled | `disabled` | `bg/state/disabled`, `text/hint` |

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `ReactNode` | `"Filter"` | label |
| `selected` | `boolean` | `false` | whether filters are applied |
| `count` | `number` | — | applied-filter count, rendered as a `Badge` |
| `onClick` | `() => void` | — | opens the filter popover |

## Accessibility

- It is a disclosure trigger: `aria-expanded` reflects the popover state and `aria-haspopup="dialog"`.
- The dashed-vs-solid distinction is reinforced by the label colour and the `aria-expanded`/`count` text, so state isn't conveyed by border style alone.

## Notes / Warnings

- Do **not** rebuild the button box here. It is `Button` with `size="xs"`, `borderStyle="dashed"`. If the two ever drift, `Button` is the source of truth.
- Figma reports `size=md` on this component's own prop, but the rendered box (24px, `4/8` padding) matches our `Button` `xs`. Trust the geometry, not the prop name.
