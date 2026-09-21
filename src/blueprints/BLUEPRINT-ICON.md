# ICON Blueprint

## Design Overview

**Template Name:** `lead-icon` / `tail-icon` / `icon` slots
**Node ID:** appears as a child of nearly every component, e.g. `I15190:79368;28:20640` (Button lead-icon), `I15190:79357;4146:138977;3869:38395` (Sidebar Menu Item icon)
**Purpose:** The single wrapper every component uses to render a glyph at a fixed box size on a token colour.

In Figma an icon slot is always **two nested frames**: an outer box that centres content (20px in menu items and inputs, or the same size as the glyph in buttons) and an inner glyph frame (16 or 18px). That outer/inner split is what keeps optical alignment consistent, so the code keeps it too.

### Icon source decision

Figma exports each glyph as a one-off SVG on a URL that expires in 7 days, so those URLs cannot be the source of truth for a design system. The glyph set in the file (house, compass, article, chat, bookmark, magnifying-glass, plus, caret-down, sliders, dots, share, copy, thumbs-up/down, microphone, paperclip, gear, squares-four, sidebar-simple) is Phosphor, and `../docs/BLUEPRINT-TO-CODE-GUIDE.md` already mandates `@phosphor-icons/react`. So: **icons come from `@phosphor-icons/react`, rendered through this wrapper.**

## Design Tokens & Variables

### Colors
| Token | Value | Usage |
|-------|-------|-------|
| `icon/default` | `cobblestone/00` `#FFFFFF` | active/selected glyphs |
| `icon/default-subtle` | `transparent/light/70` | default glyph in menu items |
| `icon/default-muted` | `transparent/light/50` | placeholder glyphs, inactive wave bars |
| `icon/default-disabled` | `transparent/light/25` | disabled |
| `icon/destructive` | `red/300` | destructive actions |
| `icon/informative` | `mojo/300` | informative |
| `icon/success` | `green/300` | success |
| `icon/warning` | `orange/300` | warning |

### Sizes
The wrapper and the glyph are sized independently, because Figma pairs them four different ways:

| Glyph (`size`) | Wrapper (`box`) | Seen in |
|------|-----------|---------|
| 12px | 12px | inline meta rows |
| 16px | 16px | buttons, badges, filter/dropdown buttons |
| 18px | 20px | sidebar menu items |
| 16px | 20px | search input lead icon, avatar button tail |

So `size` is the glyph size and `box` is the hit/alignment box, defaulting to `size`.

## Component Hierarchy (Pseudo-Code)

```pseudo
ROOT: Icon
├── LAYOUT: Flex row, centred
├── WIDTH: {wrapper box}
├── HEIGHT: {wrapper box}
│
└── [ELEMENT] Glyph        // phosphor component, width = height = glyph box
```

## Component Specifications

```pseudo
Icon {
  TYPE: Container (icon slot)
  POSITION: Relative

  DIMENSIONS:
    - width: {wrapper}px (Fixed)
    - height: {wrapper}px (Fixed)

  AUTO-LAYOUT: Yes (Flex)
    - direction: Row
    - align-items: Center
    - justify-content: Center
    - gap: 0px (spacing-none)

  PADDING: 0 on all sides

  FILL: none
  STROKE: none
  CORNER-RADIUS: 0px
  OVERFLOW: Visible

  CHILDREN:
    └── [ELEMENT] Glyph {
          size: {glyph}px
          color: currentColor  // set by the tone class, or inherited from the parent control
          weight: Regular      // Figma strokes are 1px at 16px → phosphor "regular"
        }
}
```

Note: the glyph never gets `100% × 100%` sizing — it is rendered at its exact pixel size inside the wrapper, matching Figma where the inner frame is smaller than the outer box for `lg`.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `icon` | `PhosphorIcon` | — | the phosphor component to render |
| `size` | `12 \| 16 \| 18 \| 20` | `16` | glyph size |
| `box` | `12 \| 16 \| 20` | `size` | wrapper size |
| `tone` | `"inherit" \| "default" \| "subtle" \| "muted" \| "disabled" \| "destructive" \| "informative" \| "success" \| "warning"` | `"inherit"` | maps to an `icon/*` token; `inherit` uses `currentColor` so a parent control drives it |
| `weight` | phosphor weight | `"regular"` | passthrough |
| `className` | `string` | — | escape hatch for layout only |

## States

The icon itself is stateless. Colour changes on hover/press are driven by the parent, which sets the tone or relies on `currentColor`.

## Accessibility

- Always `aria-hidden` — an icon slot is decorative. The accessible name comes from the parent (`Button` label, or `aria-label` on an icon-only button).
- Never focusable.

## Notes / Warnings

- Do not reach for a raw `<svg>` or an `<img src="figma.com/api/mcp/asset/…">` in components. Those asset URLs expire.
- If a glyph genuinely has no Phosphor equivalent (the Ambit wordmark `logo`, publication marks, social marks), it is **not** an icon — it is a brand asset and gets its own component (`Logo`, `PublicationLogo`, `SocialLogo`).
