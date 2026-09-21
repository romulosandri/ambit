# DIVIDER Blueprint

## Design Overview

**Template Name:** Divider
**Node IDs:** `15177:76677` (home-topics, between playlists and the article feed), `15210:87261` (daily-brief-details), `15210:87982` (home-sources), `15201:3405` / `15201:3736` (auth cards, 14px tall slot)
**Purpose:** A hairline rule that separates page sections. Figma exposes `type` and `style`; every Page 38 instance uses **Dashed**.

## Design Tokens & Variables

### Colors
| Token | Value | Usage |
|-------|-------|-------|
| `border/default` | `transparent/light/10` `#D9D2CE1A` | rule colour |

### Spacing
| Token | Value | Usage |
|-------|-------|-------|
| `stroke-default` | 1px | rule thickness |

## Component Hierarchy (Pseudo-Code)

```pseudo
ROOT: Divider
├── WIDTH: Fill Parent (640px in the app shell, 328px in auth cards)
├── HEIGHT: 0px + 1px border
└── (no children)
```

## Component Specifications

**Node ID:** `15177:76677` · 640 × ~0

```pseudo
Divider {
  TYPE: Container (rule)
  POSITION: Relative

  DIMENSIONS:
    - width: 100% (Fill Parent)
    - height: 0px

  AUTO-LAYOUT: No

  PADDING: 0px

  FILL: none

  STROKE:
    - position: Top edge only
    - weight: 1px (stroke-default)
    - color: rgba(217,210,206,0.1) (border/default)
    - style: DASHED

  CORNER-RADIUS: 0px
  OPACITY: 100%
}
```

Vertical form (`orientation="vertical"`) swaps to a left border and `height: 100%`. Not used on Page 38 but the Figma component exposes `type`, so the prop exists.

## Variant Matrix

| Prop | Values | Effect |
|---|---|---|
| `style` | `dashed` (default) / `solid` | `border-style` |
| `orientation` | `horizontal` (default) / `vertical` | top border + full width, or left border + full height |
| `label` | string \| undefined | text-center "or" variant used on auth cards |

## States

Non-interactive.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `style` | `"dashed" \| "solid"` | `"dashed"` | rule style |
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | rule direction |
| `label` | `string` | — | when set, renders the text-center "or" variant |

## Accessibility

- Renders `<hr>` for the horizontal form with `border: 0` reset and a single edge border, so it is announced as a separator.
- The vertical form renders a `<div role="separator" aria-orientation="vertical">`.

## Notes / Warnings

- Figma exports this as an **SVG image** of a dashed line. Do not use that asset — a CSS `border-top: 1px dashed` on `border/default` is the same pixels, scales to any width, and doesn't expire.
- The auth-card instances report a 14px height because the divider sits in a 14px auto-layout slot. The rule itself is still 1px; the spacing belongs to the parent.
