# LINK BUTTON Blueprint

## Design Overview

**Template Name:** Link Button
**Node IDs:** `15199:3126` ("Terms and Conditions", auth bottom bar), `15199:3128` ("Privacy Policy"), `15210:87415` (source link inside an AI `chat-bubble`)
**Purpose:** A text-only action with no container — used for legal links, "Sign up" / "Sign in" switches, and the source link above AI answers.

## Design Tokens & Variables

### Colors
| Token | Value | Usage |
|-------|-------|-------|
| `bg/state/ghost` | `transparent/light/00` | background (transparent) |
| `bg/state/ghost-hover` | `transparent/light/8` | hover |
| `text/muted` | `transparent/light/50` | default label |
| `text/default` | `#FFFFFF` | hover label, and the `chat-bubble` source link |

### Typography
| Style | Font Family | Size | Weight | Line Height | Letter Spacing |
|-------|-------------|------|--------|-------------|----------------|
| `heading/heading-subsection` | body | 14px (`size/sm`) | 400 | 1.0 | 0 |

### Spacing
| Token | Value |
|-------|-------|
| `spacing-4` | 4px (gap between icon and label) |
| `spacing-none` | 0px (padding) |

## Component Hierarchy (Pseudo-Code)

```pseudo
ROOT: LinkButton
├── LAYOUT: Flex Row
├── WIDTH: Hug Content
├── HEIGHT: Hug Content
├── ALIGNMENT: center / center
├── GAP: 4px (spacing-4)
│
├── [COMPONENT] Icon      (optional)
└── [ELEMENT] Label
    └── [TEXT] children
```

## Component Specifications

**Node ID:** `15199:3126` · 136 × 14

```pseudo
LinkButton {
  TYPE: Button Container
  POSITION: Relative

  DIMENSIONS:
    - width: Hug Content
    - height: Hug Content

  AUTO-LAYOUT: Yes (Flex)
    - direction: Row
    - align-items: Center
    - justify-content: Center
    - gap: 4px (spacing-4)

  PADDING: 0px on all sides (spacing-none)

  FILL:
    - type: Solid
    - color: rgba(217,210,206,0) (bg/state/ghost)

  STROKE: none
  CORNER-RADIUS: 0px (radius-none)
  SHADOW: none

  CHILDREN:
    └── [ELEMENT] Label {
          PADDING: 0px
          └── [TEXT] "Terms and Conditions" {
                TYPOGRAPHY: heading-subsection (body, 14px, 400, 1.0, 0)
                COLOR: rgba(217,210,206,0.5) (text/muted)
                white-space: nowrap
              }
        }
}
```

## Style Matrix

| Prop | Values | Effect |
|---|---|---|
| `tone` | `muted` (default) / `default` | `text/muted` vs `text/default` |

## States

| State | Trigger | Tokens applied |
|---|---|---|
| Default | — | `text/muted` (or `text/default` for `tone="default"`) |
| Hover | `:hover` | label → `text/default`, underline |
| Press | `:active` | label stays `text/default` |
| Focused | `:focus-visible` | `--shadow-misc-focus`, `radius-2xs` so the ring has a shape |
| Disabled | `disabled` | `text/hint`, no underline, `cursor: not-allowed` |

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `ReactNode` | — | label text |
| `tone` | `"muted" \| "default"` | `"muted"` | label colour |
| `leadIcon` | `PhosphorIcon` | — | optional icon before the label |
| `href` | `string` | — | when set, renders an `<a>` instead of a `<button>` |
| `disabled` | `boolean` | `false` | disabled (button form only) |

## Accessibility

- Renders `<a>` when `href` is given, otherwise `<button type="button">`. Never a `div` with a click handler.
- Underline appears on hover **and** focus so the affordance isn't colour-only.

## Notes / Warnings

- Figma shows no underline in the resting state; the underline is a code-side hover affordance, which is intentional and should not be "corrected" back to match the static frame.
- This is not `Button` with `style="ghost"` — that one has padding, a fixed height, and a radius. Keep them separate.
