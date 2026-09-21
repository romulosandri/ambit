# CHECKBOX WITH TEXT Blueprint

## Design Overview

**Template Name:** Checkbox with Text
**Node IDs:** `15177:77554` (sign-in-email, "Remember me", 328 × 20), `15201:3414` (sign-up-with-email, terms acceptance, 328 × 20); component `2763:866`
**Purpose:** A checkbox with a title and an optional description. Both Page 38 instances use title-only (`description=false`).

## Design Tokens & Variables

### Colors
| Token | Value | Usage |
|-------|-------|-------|
| `text/default` | `#FFFFFF` | title |
| `text/subtle` | `transparent/light/70` | description |
| `text/hint` | `transparent/light/30` | disabled text |

Checkbox colours come from `BLUEPRINT-CHECKBOX.md`.

### Typography
| Style | Font Family | Size | Weight | Line Height | Usage |
|-------|-------------|------|--------|-------------|-------|
| `heading/heading-subsection` | body | 14px | 400 | 1.0 | title |
| `body/body-default` | body | 14px | 400 | 1.2 | description |

### Spacing
| Token | Value | Usage |
|-------|-------|-------|
| `spacing-10` | 10px | gap between the checkbox slot and the label stack |
| `spacing-4` | 4px | gap between title and description |
| `spacing-none` | 0px | padding |

## Component Hierarchy (Pseudo-Code)

```pseudo
ROOT: CheckboxWithText
├── LAYOUT: Flex Row
├── WIDTH: Fill Parent
├── ALIGNMENT: center (title-only) | start (with description)
├── GAP: 10px (spacing-10)
│
├── [ELEMENT] CheckboxSlot        // 20px box that centres the 16px control
│   └── [COMPONENT] Checkbox
└── [ELEMENT] Label
    ├── [TEXT] title
    └── [TEXT] description        (optional)
```

## Component Specifications

**Node ID:** `15177:77554` · 328 × 20

```pseudo
CheckboxWithText {
  TYPE: Container (control + label)
  POSITION: Relative

  DIMENSIONS:
    - width: 100% (Fill Parent)
    - height: Hug Content (20px title-only)

  AUTO-LAYOUT: Yes (Flex)
    - direction: Row
    - align-items: Center
    - justify-content: Start
    - gap: 10px (spacing-10)

  PADDING: 0px on all sides (spacing-none)

  FILL: none
  STROKE: none
  CORNER-RADIUS: 0px

  CHILDREN:
    ├── [ELEMENT] CheckboxSlot {
    │     DIMENSIONS: 20px × 20px (Fixed)
    │     AUTO-LAYOUT: Row / Center / Center, gap 0px
    │     PADDING: 0px
    │     └── [COMPONENT] Checkbox (16px)
    │   }
    └── [ELEMENT] Label {
          DIMENSIONS: width Fill
          AUTO-LAYOUT: Column / Start, gap 4px (spacing-4)
          PADDING: 0px
          ├── [TEXT] "Remember me" {
          │     TYPOGRAPHY: heading-subsection (body, 14px, 400, 1.0, 0)
          │     COLOR: #ffffff (text/default)
          │   }
          └── [TEXT] description (optional) {
                TYPOGRAPHY: body-default (body, 14px, 400, 1.2, 0)
                COLOR: rgba(217,210,206,0.7) (text/subtle)
              }
        }
}
```

## Variant Matrix

| Prop | Values | Effect |
|---|---|---|
| `description` | string \| undefined | adds the second text row; row alignment switches from `center` to `start` |
| `checkboxPosition` | `left` (default) / `right` | Figma exposes `Left`; right reverses the row |

## States

Inherits every state from `Checkbox`. Additionally:

| State | Trigger | Tokens applied |
|---|---|---|
| Hover | `:hover` on the whole row | checkbox hover tokens (the label is part of the hit area) |
| Disabled | `disabled` | title → `text/hint`, description → `text/hint` |

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `title` | `string` | — | primary label |
| `description` | `string` | — | optional secondary line |
| `checked` / `defaultChecked` / `onChange` | — | — | forwarded to `Checkbox` |
| `checkboxPosition` | `"left" \| "right"` | `"left"` | row order |
| `disabled` | `boolean` | `false` | disabled |

## Accessibility

- The whole component is one `<label>` wrapping the native checkbox, so clicking the title or description toggles the control and the accessible name includes both lines.
- Do **not** add `role` or `aria-checked` — the native input already provides them.

## Notes / Warnings

- Reuse `Checkbox`; do not re-draw the 16px box here. The 20px slot exists only to give the control the same optical height as a 20px line of text.
- With a description, the row must switch to `align-items: start` or the checkbox floats to the vertical centre of a two-line block, which is not what the design shows for the multi-line variant.
