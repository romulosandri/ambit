# RADIO Blueprint

## Design Overview

**Template Name:** Radio Button
**Node IDs:** `2847:3988` (unselected), `2847:3993` (selected); instanced inside Choice cards on `New Subscription Modal` `15279:86984`, `15279:86996`, `15279:87267`, `15279:87276`
**Purpose:** A 16px circular control for exclusive choices. On Page 38 it only appears inside the New Subscription Modal choice cards.

## Design Tokens & Variables

### Colors
| Token | Value | Usage |
|-------|-------|-------|
| `bg/checkbox/default` | `transparent/light/6` | unselected fill |
| `bg/checkbox/active` | `mojo/500` `#D2633D` | selected fill |
| `bg/checkbox/active-hover` | `mojo/400` | selected hover |
| `bg/checkbox/disabled` | `transparent/light/6` | disabled fill |
| `border/darker` | `transparent/light/15` | unselected 1px border |
| `bg/switch/handle` | `cobblestone/00` | inner dot |

### Spacing & Size
| Token | Value | Usage |
|-------|-------|-------|
| — | 16px | outer size |
| — | 6px | inner selected dot |

### Border Radius
| Token | Value |
|-------|-------|
| `radius-full` | 9999px |

### Shadows
| Name | Definition | Applies to |
|------|------------|------------|
| unselected | `0px 1px 2px 0px rgba(0,0,0,0.04)` drop + `inset 0px -1px 0px rgba(0,0,0,0.05)` | unselected |
| selected highlight | `inset 0px 1px 0px 0px rgba(255,255,255,0.25)` | selected |
| `misc-focus` | `--shadow-misc-focus` | `:focus-visible` |

## Component Hierarchy (Pseudo-Code)

```pseudo
ROOT: Radio
├── WIDTH: 16px
├── HEIGHT: 16px
├── CORNER-RADIUS: radius-full
│
└── [ELEMENT] Dot       (selected only — 6px fill)
```

## Component Specifications

### Unselected
**Node ID:** `2847:3988` · 16 × 16

```pseudo
Radio {
  TYPE: Container (control)
  DIMENSIONS: 16px × 16px
  FILL: bg/checkbox/default
  STROKE: 1px inside border/darker
  CORNER-RADIUS: radius-full
  SHADOW: 0px 1px 2px rgba(0,0,0,0.04) + inset 0px -1px 0px rgba(0,0,0,0.05)
}
```

### Selected
**Node ID:** `2847:3993` · 16 × 16

```pseudo
Radio {
  FILL: bg/checkbox/active
  STROKE: none
  SHADOW: inset 0px 1px 0px rgba(255,255,255,0.25)
  CHILDREN:
    └── [ELEMENT] Dot { 6px, radius-full, bg/switch/handle, centred }
}
```

## Variant Matrix

| `checked` | `disabled` | Fill | Border | Dot |
|---|---|---|---|---|
| false | false | `bg/checkbox/default` | `border/darker` | — |
| true | false | `bg/checkbox/active` | none | 6px handle |
| false | true | `bg/checkbox/disabled` | `border/default` | — |
| true | true | `bg/checkbox/disabled` | none | handle, muted |

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `checked` | `boolean` | — | controlled |
| `defaultChecked` | `boolean` | — | uncontrolled initial |
| `onChange` | `(checked: boolean) => void` | — | change handler |
| `name` | `string` | — | native radio group |
| `disabled` | `boolean` | `false` | disabled |

## Accessibility

- Native `<input type="radio">`, visually hidden, with the styled circle as its sibling. Keyboard arrows and `Space` work for free.

## Notes / Warnings

- Shares the checkbox colour tokens (`bg/checkbox/*`) — Figma paints both controls from that family.
- Reuse `Radio` inside `ChoiceCard`; do not restyle the 16px circle there.
