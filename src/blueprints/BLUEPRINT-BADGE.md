# BADGE Blueprint

## Design Overview

**Template Name:** Badge
**Node IDs:** `15210:91738` (cyan "News", article-details), `15172:75422` (article-card kind), `15234:4975` (featured-article-card, 97px wide), `I15190:79357;4146:138979;3868:37728` (default/gray "12" counter in the Sidebar)
**Purpose:** A small pill that labels an article kind (News, Analysis, …) or carries a count. Colour encodes meaning.

## Design Tokens & Variables

### Colors
Each colour pairs a translucent `bg/badge/{color}` fill with a `bg/basic/{color}-strong` label.

| Variant | Background | Label |
|---|---|---|
| `default` / `gray` | `bg/badge/default` `transparent/light/10` | `text/subtle` |
| `red` | `bg/badge/red` `transparent/red/10` | `bg/basic/red-strong` `red/400` |
| `orange` | `bg/badge/orange` | `bg/basic/orange-strong` `orange/400` |
| `green` | `bg/badge/green` | `bg/basic/green-strong` `green/400` |
| `blue` | `bg/badge/blue` | `bg/basic/blue-strong` `blue/400` |
| `lime` | `bg/badge/lime` | `bg/basic/lime-strong` `lime/400` |
| `cyan` | `bg/badge/cyan` `transparent/cyan/10` | `bg/basic/cyan-strong` `#22D3EE` |
| `violet` | `bg/badge/violet` | `bg/basic/violet-strong` `violet/400` |
| `fuchsia` | `bg/badge/fuchsia` | `bg/basic/fuchsia-strong` `fuchsia/400` |
| `pink` | `bg/badge/pink` | `bg/basic/pink-strong` `pink/400` |

Border for every variant: `border/default` `transparent/light/10`, 1px.

### Typography
| Style | Font Family | Size | Weight | Line Height | Letter Spacing |
|-------|-------------|------|--------|-------------|----------------|
| `body/body-small` | body | 12px (`size/xs`) | 400 | 1.25 | 0 |

### Spacing
| Token | Value | Usage |
|-------|-------|-------|
| `spacing-2` | 2px | outer padding |
| `spacing-4` | 4px | inner label padding-x |
| `spacing-none` | 0px | gap |

### Border Radius
| Token | Value |
|-------|-------|
| `radius-sm` | 8px |

### Effects
`backdrop-filter: blur(2px)` — present on the sidebar counter badge so it reads over the sidebar fill.

## Component Hierarchy (Pseudo-Code)

```pseudo
ROOT: Badge
├── LAYOUT: Flex Row
├── WIDTH: Hug Content
├── HEIGHT: Hug Content (19px at 12px/1.25 + padding)
├── ALIGNMENT: center / center
├── GAP: 0px (spacing-none)
│
└── [ELEMENT] Frame
    └── [TEXT] children
```

## Component Specifications

**Node ID:** `15210:91738` · 42 × 19

```pseudo
Badge {
  TYPE: Container
  POSITION: Relative

  DIMENSIONS:
    - width: Hug Content
    - height: Hug Content

  AUTO-LAYOUT: Yes (Flex)
    - direction: Row
    - align-items: Center
    - justify-content: Center
    - gap: 0px (spacing-none)

  PADDING: 2px on all sides (spacing-2)

  FILL:
    - type: Solid
    - color: rgba(34,211,238,0.1) (bg/badge/cyan)

  STROKE:
    - position: Inside
    - weight: 1px (stroke-default)
    - color: rgba(217,210,206,0.1) (border/default)

  CORNER-RADIUS: 8px (radius-sm)
  OVERFLOW: Clip
  BACKDROP-FILTER: blur(2px)

  CHILDREN:
    └── [ELEMENT] Frame {
          PADDING: 0 4px (spacing-4)
          └── [TEXT] "News" {
                TYPOGRAPHY: body-small (body, 12px, 400, 1.25, 0)
                COLOR: #22d3ee (bg/basic/cyan-strong)
                white-space: nowrap
              }
        }
}
```

## Variant Matrix

| `color` | Background token | Label token |
|---|---|---|
| `default` | `bg/badge/default` | `text/subtle` |
| `red` `orange` `green` `blue` `lime` `cyan` `violet` `fuchsia` `pink` | `bg/badge/{color}` | `bg/basic/{color}-strong` |

## States

Non-interactive. No hover, press, focus, or disabled state.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `ReactNode` | — | label or count |
| `color` | `"default" \| "red" \| "orange" \| "green" \| "blue" \| "lime" \| "cyan" \| "violet" \| "fuchsia" \| "pink"` | `"default"` | colour pair from the matrix |

## Accessibility

- Renders a `<span>`. It is content, not a control.
- When used as a count next to a label (the sidebar "12"), the parent supplies the context, so no extra ARIA is needed here.

## Notes / Warnings

- The double padding (`2px` outer + `4px` inner) is deliberate: it is what produces the 19px height and the correct optical inset. Do not collapse it into a single `px-6`.
- The 1px stroke is **inside** in Figma, which on a hug-content frame does not add height. A CSS `border` on an auto-height box *does*, making the badge 21px. So the stroke is implemented as `inset 0 0 0 1px` on `border/default`, which keeps the height at 19px. The same applies to the selected `Tab Items` (see `BLUEPRINT-TABS.md`); fixed-height components like `Button` are unaffected because their height is set explicitly.
- The label colour token lives under `bg/basic/*` in Figma even though it is used as a text colour. That's the file's naming, not a mistake.
