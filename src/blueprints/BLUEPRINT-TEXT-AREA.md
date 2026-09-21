# TEXT AREA Blueprint

## Design Overview

**Template Name:** Text Area
**Node IDs:** `15206:84133` (chats-new-chat, 720 × 120), `15202:22520` (inside `bottom-container`, 770 × 120)
**Purpose:** The AI composer. A bordered card containing the prompt field and a footer row of controls: attach, model picker, and dictate/send.

## Design Tokens & Variables

### Colors
| Token | Value | Usage |
|-------|-------|-------|
| `bg/input` | `transparent/light/6` | card fill |
| `border/default` | `transparent/light/10` | 1px solid border |
| `border/input-highlight` | `transparent/light/45` | focus border |
| `text/muted` | `transparent/light/50` | placeholder |
| `text/default` | `#FFFFFF` | typed value |

### Typography
| Style | Font Family | Size | Weight | Line Height | Usage |
|-------|-------------|------|--------|-------------|-------|
| `body/body-default` | body | 14px (`size/sm`) | 400 | 1.2 | placeholder and value |

### Spacing
| Token | Value | Usage |
|-------|-------|-------|
| `spacing-12` | 12px | padding-x, padding-bottom |
| `spacing-10` | 10px | padding-top |
| `spacing-6` | 6px | gap between the field and the footer row |
| `spacing-4` | 4px | gap between footer controls |

### Border Radius
| Token | Value |
|-------|-------|
| `radius-card-md` | 16px |

### Shadows
| Name | Applies to |
|------|------------|
| `shadows/card` | the card |
| `shadows/input-focus` | `:focus-within` |

## Component Hierarchy (Pseudo-Code)

```pseudo
ROOT: TextArea
├── LAYOUT: Flex Column
├── WIDTH: Fill Parent
├── HEIGHT: 120px (Fixed in both instances)
├── GAP: 6px (spacing-6)
├── FILL: bg/input
├── STROKE: 1px border/default
├── CORNER-RADIUS: radius-card-md
├── SHADOW: shadows/card
│
├── [ELEMENT] textarea             // fills remaining height, transparent, no resize handle
└── [ELEMENT] Footer
    ├── [ELEMENT] LeftCluster
    │   ├── [COMPONENT] Button           // iconOnly, soft, pill, 28px — Plus
    │   └── [COMPONENT] DropdownButton   // variant "composer" — model picker
    └── [ELEMENT] RightCluster
        └── [COMPONENT] Button           // iconOnly, soft, pill, 28px — Microphone / PaperPlane
```

## Component Specifications

**Node ID:** `15206:84133` · 720 × 120

```pseudo
TextArea {
  TYPE: Container (composer)
  POSITION: Relative

  DIMENSIONS:
    - width: 100% (Fill Parent)
    - height: 120px (Fixed)

  AUTO-LAYOUT: Yes (Flex)
    - direction: Column
    - align-items: Start
    - justify-content: Start
    - gap: 6px (spacing-6)

  PADDING:
    - top: 10px    (spacing-10)
    - right: 12px  (spacing-12)
    - bottom: 12px (spacing-12)
    - left: 12px   (spacing-12)

  FILL:
    - type: Solid
    - color: rgba(217,210,206,0.06) (bg/input)

  STROKE:
    - position: Inside
    - weight: 1px (stroke-default)
    - color: rgba(217,210,206,0.1) (border/default)
    - style: SOLID

  CORNER-RADIUS: 16px (radius-card-md)
  OVERFLOW: Clip
  SHADOW: shadows/card

  CHILDREN:
    ├── [ELEMENT] textarea {
    │     DIMENSIONS: width Fill, height Fill (flex-1)
    │     TYPOGRAPHY: body-default (body, 14px, 400, 1.2, 0)
    │     COLOR: text/default; placeholder "Ask AI anything" → text/muted
    │     FILL: transparent, STROKE: none, OUTLINE: none, RESIZE: none
    │   }
    └── [ELEMENT] Footer {
          AUTO-LAYOUT: Row / Center / Space-Between, width Fill
          ├── [ELEMENT] LeftCluster {
          │     AUTO-LAYOUT: Row / Center, gap 4px (spacing-4)
          │     ├── [COMPONENT] Button (iconOnly, soft, pill, 28px, Plus)
          │     └── [COMPONENT] DropdownButton (variant "composer") → "Claude Opus 5"
          │   }
          └── [ELEMENT] RightCluster {
                AUTO-LAYOUT: Row / Center, gap 4px (spacing-4)
                └── [COMPONENT] Button (iconOnly, soft, pill, 28px, Microphone)
              }
        }
}
```

## Variant Matrix

| Prop | Values | Effect |
|---|---|---|
| `submitIcon` | `microphone` (idle) / `paper-plane` (has text) | the right-cluster glyph |
| `model` | string | `DropdownButton` label |

## States

| State | Trigger | Tokens applied |
|---|---|---|
| Default | — | `bg/input`, `border/default` |
| Focused | `:focus-within` | `border/input-highlight` + `--shadow-input-focus` |
| Disabled | `disabled` | `bg/input-disabled`, `text/hint`, controls disabled |

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` / `onChange` | controlled pair | — | prompt text |
| `placeholder` | `string` | `"Ask AI anything"` | placeholder |
| `model` | `string` | — | current model name |
| `onModelClick` | `() => void` | — | opens the model menu |
| `onAttach` | `() => void` | — | attach action |
| `onSubmit` | `() => void` | — | submit / dictate |
| `disabled` | `boolean` | `false` | disabled |

## Accessibility

- A real `<textarea>` with an `aria-label` from the placeholder; `Enter` submits and `Shift+Enter` inserts a newline.
- Every footer control is a focusable button with its own `aria-label` ("Attach file", "Choose model", "Dictate").
- Focus styling lives on the card via `:focus-within`, so it's clear the whole composer is active.

## Notes / Warnings

- Both instances are 120px tall and fixed; auto-growing is a behaviour to add later, not something the design specifies.
- The model picker is `DropdownButton` with `variant="composer"` (pill, ghost, 14px label). Do not restyle a plain `Button` into it.
- `bottom-container` (`15202:22552`) wraps this component with a 32px top scrim and the "Ambit can make mistakes." disclaimer — that is a page-level surface, blueprinted separately.
