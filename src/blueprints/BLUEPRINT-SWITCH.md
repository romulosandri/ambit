# SWITCH Blueprint — Switch & SwitchWithText

## Design Overview

**Template Name:** Switch / Switch with Text
**Node IDs:** `3794:10872` (off), `3794:10874` (on), `3794:10925` (with text); instanced on New Subscription Modal Topic `15279:87027` and Source `15279:87261` as "Include in Daily Brief"
**Purpose:** A 32 × 20 toggle. The labelled form wraps it with a title + description, switch on the right.

## Design Tokens & Variables

### Colors
| Token | Value | Usage |
|-------|-------|-------|
| `bg/switch/default` | `cobblestone/600` `#5D5548` | track off |
| `bg/switch/default-hover` | `cobblestone/500` | track off hover |
| `bg/switch/active` | `green/500` `#4FC660` | track on |
| `bg/switch/active-hover` | `green/400` | track on hover |
| `bg/switch/handle` | `cobblestone/00` | knob |
| `text/default` | `#FFFFFF` | title |
| `text/subtle` | `transparent/light/70` | description |

### Typography
| Style | Font Family | Size | Weight | Line Height | Usage |
|-------|-------------|------|--------|-------------|-------|
| `heading/heading-subsection` | body | 14px | 400 | 1.0 | title |
| `body/body-default` | body | 14px | 400 | 1.2 | description |

### Spacing
| Token | Value | Usage |
|-------|-------|-------|
| — | 32 × 20 | track |
| — | 14px | handle |
| `spacing-3` | 3px | track padding |
| `spacing-10` | 10px | SwitchWithText gap |
| `spacing-4` | 4px | title → description |

### Border Radius
| Token | Value |
|-------|-------|
| `radius-full` | 9999px |

### Shadows
| Name | Definition | Applies to |
|------|------------|------------|
| `shadows/switch-handle` | `0px 1px 3px rgba(0,0,0,0.08), 0px 1px 2px -1px rgba(0,0,0,0.08)` | handle |
| `misc-focus` | `--shadow-misc-focus` | `:focus-visible` |

## Component Hierarchy (Pseudo-Code)

```pseudo
ROOT: Switch
├── LAYOUT: Flex Row
├── WIDTH: 32px · HEIGHT: 20px
├── PADDING: 3px
├── ALIGN: start (off) | end (on)
└── [ELEMENT] Handle     // 14px circle

ROOT: SwitchWithText
├── LAYOUT: Flex Row · GAP: 10px · ALIGN: start
├── [ELEMENT] Label
│   ├── [TEXT] title
│   └── [TEXT] description
└── [ELEMENT] Slot (20px tall)
    └── [COMPONENT] Switch
```

## Component Specifications

**Node ID:** `3794:10874` · 32 × 20 (on)

```pseudo
Switch {
  DIMENSIONS: 32px × 20px
  AUTO-LAYOUT: Row / Center, padding 3px
  JUSTIFY: End when on, Start when off
  FILL: bg/switch/active (on) | bg/switch/default (off)
  CORNER-RADIUS: radius-full
  CHILDREN:
    └── Handle { 14px, radius-full, bg/switch/handle, shadow-switch-handle }
}
```

**Node ID:** `3794:10925` · Switch with Text

```pseudo
SwitchWithText {
  AUTO-LAYOUT: Row / Start, gap 10px, width Fill
  CHILDREN:
    ├── Label { Column, gap 4px, width Fill
    │     title: heading-subsection / text/default
    │     description: body-default / text/subtle
    │   }
    └── Slot { 20px tall, centres the Switch }
}
```

## Props

### Switch
| Prop | Type | Default | Description |
|---|---|---|---|
| `checked` | `boolean` | `false` | on/off |
| `onChange` | `(checked: boolean) => void` | — | toggle handler |
| `disabled` | `boolean` | `false` | disabled |

### SwitchWithText
| Prop | Type | Default | Description |
|---|---|---|---|
| `title` | `string` | — | primary label |
| `description` | `string` | — | optional secondary line |
| `checked` / `onChange` / `disabled` | — | — | forwarded to `Switch` |

## Accessibility

- `Switch` is `role="switch"` with `aria-checked`.
- `SwitchWithText` does **not** wrap the switch in a `<label>` (a button cannot sit inside a label). The title is a separate button that toggles the same state; the switch has `aria-label={title}`.

## Notes / Warnings

- Figma's `switchPosition=Right` is the only variant used on Page 38 — do not add a left-side variant until a screen needs it.
- Reuse `Switch`; do not redraw the track inside `SwitchWithText`.
