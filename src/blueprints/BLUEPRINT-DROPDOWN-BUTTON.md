# DROPDOWN BUTTON Blueprint

## Design Overview

**Template Name:** Dropdown Button
**Node IDs:** `15177:76666` (home-topics "Last 7 Days"), `15256:27953`, `15210:88560` (hidden), `15199:3131` / `15201:3320` (auth bottom bar, 127 × 24), `I15206:84133;13089:59798` ("Claude Opus 5" inside `Text Area` — pill, ghost)
**Purpose:** A button that opens a menu. Always ends in a caret; label uses the small body style rather than the button style.

## Design Tokens & Variables

### Colors
| Token | Value | Usage |
|-------|-------|-------|
| `bg/state/secondary` | `transparent/light/4` | default background |
| `bg/state/secondary-hover` | `transparent/light/8` | hover |
| `bg/state/ghost` | `transparent/light/00` | background in the composer variant |
| `border/default` | `transparent/light/10` | 1px solid border |
| `text/default` | `#FFFFFF` | label |
| `icon/default` | `#FFFFFF` | caret |

### Typography
| Style | Font Family | Size | Weight | Line Height | Letter Spacing |
|-------|-------------|------|--------|-------------|----------------|
| `body/body-small` | body | 12px (`size/xs`) | 400 | 1.25 | 0 |

The composer variant uses `heading/heading-subsection` (14px / 1.0) instead — it sits among 14px controls.

### Spacing
| Token | Value | Usage |
|-------|-------|-------|
| `spacing-6` | 6px | padding-x (default variant) |
| `spacing-4` | 4px | padding-y, gap |
| `spacing-10` | 10px | padding-x (composer variant) |
| `spacing-2` | 2px | label padding-x |

### Border Radius
| Token | Value | Usage |
|-------|-------|-------|
| `radius-sm` | 8px | default |
| `radius-full` | 9999px | composer variant |

### Shadows
| Name | Applies to |
|------|------------|
| `components/default` | default variant |
| none | composer variant |

## Component Hierarchy (Pseudo-Code)

```pseudo
ROOT: DropdownButton
└── [COMPONENT] Button {
      style: "secondary" | "ghost"
      size: "xs" | "sm"
      shape: "rounded" | "pill"
      tailIcon: CaretDown
      labelStyle: "body-small" | "heading-subsection"
    }
    └── [TEXT] children
```

## Component Specifications

### 1. DropdownButton_Default
**Node ID:** `15177:76666` · 96 × 24

```pseudo
DropdownButton {
  TYPE: Button Container
  POSITION: Relative

  DIMENSIONS:
    - width: Hug Content
    - height: 24px (Fixed)

  AUTO-LAYOUT: Yes (Flex)
    - direction: Row
    - align-items: Center
    - justify-content: Center
    - gap: 4px (spacing-4)

  PADDING:
    - top: 4px   (spacing-4)
    - right: 6px (spacing-6)
    - bottom: 4px (spacing-4)
    - left: 6px  (spacing-6)

  FILL: rgba(217,210,206,0.04) (bg/state/secondary)

  STROKE:
    - position: Inside
    - weight: 1px (stroke-default)
    - color: rgba(217,210,206,0.1) (border/default)
    - style: SOLID

  CORNER-RADIUS: 8px (radius-sm)
  OVERFLOW: Clip
  SHADOW: components/default

  CHILDREN:
    ├── [ELEMENT] Label {
    │     PADDING: 0 2px (spacing-2)
    │     └── [TEXT] "Last 7 Days" {
    │           TYPOGRAPHY: body-small (body, 12px, 400, 1.25, 0)
    │           COLOR: #ffffff (text/default)
    │         }
    │   }
    └── [COMPONENT] Icon (md, tone default)   // CaretDown
}
```

### 2. DropdownButton_Composer
**Node ID:** `I15206:84133;13089:59798`

```pseudo
DropdownButton {
  DIMENSIONS: Hug Content × 28px
  AUTO-LAYOUT: Row / Center / Center, gap 4px
  PADDING: 6px (spacing-6) vertical, 10px (spacing-10) horizontal
  FILL: rgba(217,210,206,0) (bg/state/ghost)
  STROKE: none
  CORNER-RADIUS: 9999px (radius-full)
  SHADOW: none

  CHILDREN:
    ├── [ELEMENT] Label → [TEXT] "Claude Opus 5"  // heading-subsection, text/default
    └── [COMPONENT] Icon (md)                      // CaretDown
}
```

## Variant Matrix

| `variant` | Style | Size | Shape | Border | Label style | Shadow |
|---|---|---|---|---|---|---|
| `default` | secondary | xs (24) | rounded | 1px solid `border/default` | `body-small` | `components/default` |
| `composer` | ghost | sm (28) | pill | none | `heading-subsection` | none |

## States

| State | Trigger | Tokens applied |
|---|---|---|
| Default | — | per matrix |
| Hover | `:hover` | `bg/state/{style}-hover` |
| Press | `:active` | `bg/state/{style}-press` |
| Open | menu open | `bg/state/{style}-press`, caret rotates 180° |
| Focused | `:focus-visible` | `--shadow-misc-focus` |
| Disabled | `disabled` | `bg/state/disabled`, `text/hint` |

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `ReactNode` | — | current selection label |
| `variant` | `"default" \| "composer"` | `"default"` | which spec block to use |
| `open` | `boolean` | `false` | menu open state (rotates the caret) |
| `leadIcon` | `PhosphorIcon` | — | optional icon before the label |
| `onClick` | `() => void` | — | toggles the menu |

## Accessibility

- `aria-haspopup="menu"` plus `aria-expanded={open}`.
- The caret is decorative; open state is communicated by `aria-expanded`, not just rotation.

## Notes / Warnings

- The label is **12px `body-small`**, not the 14px button label — that's the main thing that separates this from a plain `Button` with a `tailIcon`. The composer variant is the exception and uses 14px.
- The menu surface itself is `Dropdown Menu Items` inside the `filter` popover; it is not part of this component.
