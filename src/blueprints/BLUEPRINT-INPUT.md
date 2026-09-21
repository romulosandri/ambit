# INPUT Blueprint — SearchInput & TextField

## Design Overview

**Template Name:** Input
**Node IDs:**
- **SearchInput**: `15190:79365` (chats, 501 × 32), `15190:79192` (saved, 533 × 32), `15210:86312` (daily-briefs, 460 × 32), `15210:89756` (topic-details), `15210:90934` (source-details), `15255:8347` (inside the `filter` popover, 258 × 36)
- **TextField**: `15177:77552` / `15177:77553` (sign-in-email, 328 × 61), `15201:3408`–`15201:3413` (sign-up form, incl. a 156px half-width pair)

**Purpose:** One Figma component covering two real behaviours, so it becomes two components in code: a compact search field with a keyboard-shortcut badge, and a labelled form field.

## Design Tokens & Variables

### Colors
| Token | Value | Usage |
|-------|-------|-------|
| `bg/input-soft` | `transparent/light/8` | SearchInput container |
| `bg/input` | `transparent/light/6` | TextField container |
| `bg/input-disabled` | `transparent/light/15` | disabled |
| `border/darker` | `transparent/light/15` | TextField border |
| `border/default` | `transparent/light/10` | shortcut badge border |
| `border/input-highlight` | `transparent/light/45` | focus border |
| `text/default` | `#FFFFFF` | typed value, field label |
| `text/muted` | `transparent/light/50` | placeholder, badge glyph |
| `icon/default-muted` | `transparent/light/50` | lead icon |

### Typography
| Style | Font Family | Size | Weight | Line Height | Usage |
|-------|-------------|------|--------|-------------|-------|
| `body/body-default` | body | 14px | 400 | 1.2 | placeholder & value |
| `body/body-small` | body | 12px | 400 | 1.25 | shortcut badge |
| `heading/heading-subsection` | body | 14px | 400 | 1.0 | field label |

### Spacing
| Token | Value | Usage |
|-------|-------|-------|
| `spacing-8` | 8px | container padding-x (search), all-round padding (TextField), label→field gap |
| `spacing-6` | 6px | container padding-y (search), inner gap |
| `spacing-4` | 4px | label slot padding-x, badge padding-x |
| `spacing-2` | 2px | inner container gap |

### Border Radius
| Token | Value | Usage |
|-------|-------|-------|
| `radius-md` | 12px | both containers |
| `radius-xs` | 6px | shortcut badge |

### Shadows
| Name | Applies to |
|------|------------|
| `components/default` | TextField container |
| `shadows/input-focus` | `:focus-within`, both |

## Component Hierarchy (Pseudo-Code)

```pseudo
ROOT: SearchInput
├── LAYOUT: Flex Row
├── HEIGHT: 32px
├── FILL: bg/input-soft
├── CORNER-RADIUS: radius-md
│
├── [COMPONENT] Icon         // MagnifyingGlass, xl wrapper / md glyph
├── [ELEMENT] input          // native text input, transparent
└── [ELEMENT] ShortcutBadge  (optional)
    └── [TEXT] "/"

ROOT: TextField
├── LAYOUT: Flex Column
├── GAP: 8px (spacing-8)
│
├── [ELEMENT] LabelRow
│   ├── [TEXT] label
│   └── [ELEMENT] TailSlot   (optional — e.g. "Forgot password?")
└── [ELEMENT] Container
    ├── FILL: bg/input
    ├── STROKE: 1px border/darker
    ├── CORNER-RADIUS: radius-md
    ├── SHADOW: components/default
    └── [ELEMENT] input
```

## Component Specifications

### 1. SearchInput
**Node ID:** `15190:79365` · 501 × 32

```pseudo
SearchInput {
  TYPE: Container (form field)
  POSITION: Relative

  DIMENSIONS:
    - width: 100% (Fill Parent)
    - height: 32px (Fixed)

  AUTO-LAYOUT: Yes (Flex)
    - direction: Row
    - align-items: Center
    - justify-content: Center
    - gap: 6px (spacing-6)

  PADDING:
    - top: 6px    (spacing-6)
    - right: 8px  (spacing-8)
    - bottom: 6px (spacing-6)
    - left: 8px   (spacing-8)

  FILL:
    - type: Solid
    - color: rgba(217,210,206,0.08) (bg/input-soft)

  STROKE: none
  CORNER-RADIUS: 12px (radius-md)
  OVERFLOW: Clip
  SHADOW: none

  CHILDREN:
    ├── [COMPONENT] Icon {
    │     wrapper: 20px, glyph: 16px (size xl)
    │     tone: muted
    │     glyph: MagnifyingGlass
    │   }
    ├── [ELEMENT] input {
    │     width: Fill
    │     PADDING: 0 4px (spacing-4)
    │     TYPOGRAPHY: body-default (body, 14px, 400, 1.2, 0)
    │     COLOR: text/default; placeholder → text/muted
    │     FILL: transparent, STROKE: none, OUTLINE: none
    │   }
    └── [ELEMENT] ShortcutBadge {
          DIMENSIONS: min-width 20px × 20px
          PADDING: 0 4px (spacing-4)
          STROKE: 1px (stroke-default) rgba(217,210,206,0.1) (border/default)
          CORNER-RADIUS: 6px (radius-xs)
          └── [TEXT] "/" {
                TYPOGRAPHY: body-small
                COLOR: rgba(217,210,206,0.5) (text/muted)
              }
        }
}
```

### 2. TextField
**Node ID:** `15177:77552` · 328 × 61

```pseudo
TextField {
  TYPE: Container (form field)
  POSITION: Relative

  DIMENSIONS:
    - width: 100% (Fill Parent)
    - height: Hug Content (61px = 20px label + 8px gap + 33px field)

  AUTO-LAYOUT: Yes (Flex)
    - direction: Column
    - align-items: Start
    - gap: 8px (spacing-8)

  PADDING: 0px

  CHILDREN:
    ├── [ELEMENT] LabelRow {
    │     AUTO-LAYOUT: Row / Center / Space-Between, width Fill
    │     ├── [TEXT] "Email address or username" {
    │     │     TYPOGRAPHY: heading-subsection (body, 14px, 400, 1.0, 0)
    │     │     COLOR: #ffffff (text/default)
    │     │   }
    │     └── [ELEMENT] TailSlot (height 20px, optional content)
    │   }
    └── [ELEMENT] Container {
          AUTO-LAYOUT: Row / Center / Center, width Fill
          PADDING: 8px on all sides (spacing-8)
          FILL: rgba(217,210,206,0.06) (bg/input)
          STROKE: 1px (stroke-default) rgba(217,210,206,0.15) (border/darker), inside, SOLID
          CORNER-RADIUS: 12px (radius-md)
          OVERFLOW: Clip
          SHADOW: components/default
          └── [ELEMENT] input {
                width: Fill
                PADDING: 0 4px (spacing-4)
                TYPOGRAPHY: body-default
                COLOR: text/default; placeholder → text/muted
              }
        }
}
```

## Variant Matrix

| Component | Prop | Values | Effect |
|---|---|---|---|
| `SearchInput` | `shortcut` | string \| undefined | shows/hides the keyboard badge |
| `SearchInput` | `size` | `sm` (32) / `md` (36) | height; 36 is the popover instance |
| `TextField` | `type` | `text` `email` `password` | native input type |
| `TextField` | `tail` | `ReactNode` | right-aligned label-row slot |
| `TextField` | `required` | boolean | red asterisk after the label |
| `TextField` | `caption` | string | helper line under the field (`body-small` / `text-muted`) |
| `TextField` | `leadIcon` | Phosphor icon | 16px muted glyph in a 20px slot |
| `TextField` | `appearance` | `default` / `soft` | `soft` is `bg/input-soft`, no resting border — used on the subscription modal |
| both | `invalid` | boolean | `border/destructive` + `--shadow-destructive-focus` on focus |
| both | `disabled` | boolean | `bg/input-disabled`, `text/hint` |

## States

| State | Trigger | Tokens applied |
|---|---|---|
| Default | — | per spec |
| Hover | `:hover` | `border/strong` (TextField), `bg/input` (SearchInput) |
| Focused | `:focus-within` | `border/input-highlight` + `--shadow-input-focus` |
| Invalid | `invalid` | `border/destructive`; on focus `--shadow-destructive-focus` |
| Disabled | `disabled` | `bg/input-disabled`, `text/hint`, `cursor: not-allowed` |

## Props

### SearchInput
| Prop | Type | Default | Description |
|---|---|---|---|
| `value` / `onChange` | controlled pair | — | field value |
| `placeholder` | `string` | — | e.g. "Find in chats..." |
| `shortcut` | `string` | — | badge content, e.g. `"/"` |
| `size` | `"sm" \| "md"` | `"sm"` | 32px or 36px |
| `disabled` | `boolean` | `false` | disabled |

### TextField
| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | `string` | — | visible label |
| `tail` | `ReactNode` | — | label-row right slot |
| `type` | `string` | `"text"` | input type |
| `invalid` | `boolean` | `false` | error styling |
| `required` | `boolean` | `false` | asterisk on the label |
| `caption` | `string` | — | helper under the field |
| `leadIcon` | Phosphor icon | — | leading glyph |
| `appearance` | `"default" \| "soft"` | `"default"` | chrome vs. soft fill |
| plus native input attributes | | | |

`LabeledTextArea` is the same label/required/caption pattern around a `bg/input-soft` `radius-card-md` textarea (the subscription "What should this topic cover?" field). It is **not** the AI composer `TextArea`.

## Accessibility

- `TextField` wires `<label htmlFor>` to the input id (auto-generated with `useId`), so the visible label *is* the accessible name.
- `SearchInput` has no visible label: it renders `type="search"` with `aria-label` defaulted from the placeholder, and the shortcut badge is `aria-hidden`.
- `invalid` sets `aria-invalid`; focus styling is driven by `:focus-within` so the ring appears around the whole container.

## Notes / Warnings

- Figma renders both of these as `<button>` wrappers because the frames aren't real inputs. In code they **must** be real `<input>` elements — this is the clearest example of "the Figma export is a prototype, not the implementation".
- The search field has no border at rest; only the focus state introduces one. Don't add a resting border to "balance" it with `TextField`.
- The 61px TextField height comes from label + gap + field. It is not a fixed height, so a field without a label is just the 33px container.
