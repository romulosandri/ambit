# CHECKBOX Blueprint

## Design Overview

**Template Name:** Checkbox
**Node IDs:** `2763:765` (unchecked), `2763:767` (checked), instanced via `Checkbox with Text` at `15177:77554` (sign-in "Remember me") and `15201:3414` (sign-up terms)
**Purpose:** A 16px control for boolean choices. On Page 38 it only appears inside `Checkbox with Text`, but the box itself is the atom.

## Design Tokens & Variables

### Colors
| Token | Value | Usage |
|-------|-------|-------|
| `bg/checkbox/default` | `transparent/light/6` | unchecked fill |
| `bg/checkbox/active` | `mojo/500` `#D2633D` | checked fill |
| `bg/checkbox/active-hover` | `mojo/400` | checked hover |
| `bg/checkbox/disabled` | `transparent/light/6` | disabled fill |
| `border/darker` | `transparent/light/15` | unchecked 1px border |
| `icon/white-default` | `#FFFFFF` | check glyph |

### Spacing & Size
| Token | Value | Usage |
|-------|-------|-------|
| — | 16px | box size |
| — | 14px | check glyph size, and the inset highlight square |

### Border Radius
| Token | Value |
|-------|-------|
| `radius-2xs` | 4px |

### Shadows
| Name | Definition | Applies to |
|------|------------|------------|
| unchecked | `0px 1px 2px 0px rgba(0,0,0,0.04)` drop + `inset 0px -1px 0px rgba(0,0,0,0.05)` | unchecked box |
| checked highlight | `inset 0px 1px 0px 0px rgba(255,255,255,0.25)` on a 14px inner square | checked box |
| `misc-focus` | `--shadow-misc-focus` | `:focus-visible` |

## Component Hierarchy (Pseudo-Code)

```pseudo
ROOT: Checkbox
├── WIDTH: 16px
├── HEIGHT: 16px
├── CORNER-RADIUS: radius-2xs
│
├── [ELEMENT] Shadow       (checked only — 14px inset highlight)
└── [COMPONENT] Icon       (checked only — Check glyph, 14px)
```

## Component Specifications

### Unchecked
**Node ID:** `2763:765` · 16 × 16

```pseudo
Checkbox {
  TYPE: Container (control)
  DIMENSIONS: 16px × 16px (Fixed)
  AUTO-LAYOUT: No (glyph centred absolutely)

  FILL:
    - type: Solid
    - color: rgba(217,210,206,0.06) (bg/checkbox/default)

  STROKE:
    - position: Inside
    - weight: 1px (stroke-default)
    - color: rgba(217,210,206,0.15) (border/darker)

  CORNER-RADIUS: 4px (radius-2xs)
  OVERFLOW: Clip
  SHADOW:
    - outer: 0px 1px 2px 0px rgba(0,0,0,0.04)
    - inner: inset 0px -1px 0px 0px rgba(0,0,0,0.05)
}
```

### Checked
**Node ID:** `2763:767` · 16 × 16

```pseudo
Checkbox {
  DIMENSIONS: 16px × 16px
  FILL: #d2633d (bg/checkbox/active)
  STROKE: none
  CORNER-RADIUS: 4px (radius-2xs)
  OVERFLOW: Clip

  CHILDREN:
    ├── [ELEMENT] Shadow {
    │     POSITION: Absolute, centred
    │     DIMENSIONS: 14px × 14px
    │     CORNER-RADIUS: 4px
    │     SHADOW: inset 0px 1px 0px 0px rgba(255,255,255,0.25)
    │   }
    └── [COMPONENT] Icon {
          POSITION: Absolute, centred
          size: 14px
          glyph: Check (bold weight — the Figma mark is heavier than a regular check)
          color: icon/white-default
        }
}
```

## Variant Matrix

| `checked` | `disabled` | Fill | Border | Glyph |
|---|---|---|---|---|
| false | false | `bg/checkbox/default` | `border/darker` | — |
| true | false | `bg/checkbox/active` | none | Check |
| false | true | `bg/checkbox/disabled` | `border/default` | — |
| true | true | `bg/checkbox/disabled` | none | Check on `icon/default-disabled` |

## States

| State | Trigger | Tokens applied |
|---|---|---|
| Default | — | per matrix |
| Hover (checked) | `:hover` | `bg/checkbox/active-hover` |
| Hover (unchecked) | `:hover` | `border/strong` |
| Focused | `:focus-visible` | `--shadow-misc-focus` |
| Disabled | `disabled` | `bg/checkbox/disabled`, `cursor: not-allowed` |

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `checked` | `boolean` | — | controlled checked state |
| `defaultChecked` | `boolean` | — | uncontrolled initial state |
| `onChange` | `(checked: boolean) => void` | — | change handler |
| `disabled` | `boolean` | `false` | disabled |

## Accessibility

- Renders a real `<input type="checkbox">`, visually hidden but focusable, with the styled box as its sibling. Keyboard `Space` works for free and the state is announced natively.
- The visual box is `aria-hidden`; the check glyph is decorative.
- Never a `div role="checkbox"` — there is no reason to reimplement native semantics here.

## Notes / Warnings

- The 14px inset-highlight square inside the checked box is a real layer in Figma (`3794:9961`), not a border. It is what gives the checked state its slight top gloss.
- The check glyph is 14px inside a 16px box — it deliberately overflows the optical centre, so don't shrink it to fit padding.
