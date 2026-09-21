# NEW SUBSCRIPTION MODAL Blueprint

## Design Overview

**Template Name:** New Subscription Modal
**Node ID:** `15279:87477` (component set) · variants `15279:86976` Step=Choose (520 × 438), `15279:87027` Step=Topic (520 × 1218), `15279:87261` Step=Source (520 × 940)
**Overlay screens:** `15280:7362` (Choose, centred), `15280:7414` (Topic, top 40px), `15280:7597` (Source, top 40px)
**Purpose:** Create a subscription from the Subscriptions page. Step=Choose picks Topic or Source; the other variants are the two create flows.

## Design Tokens & Variables

### Colors
| Token | Usage |
|-------|-------|
| `bg/muted` | modal + overlay scrim base |
| `bg/overlay` | `transparent/dark/65` — overlay fill |
| `text/default` | titles |
| `text/muted` | descriptions, captions, placeholders |
| `text/destructive` | required asterisk |

### Typography
| Style | Usage |
|-------|-------|
| `heading/heading-page` | 20px Concrette — "New subscription", "Channels" |
| `body/body-default` | 14px descriptions |
| `heading/heading-subsection` | field labels |
| `body/body-small` | captions |

### Spacing
| Token | Usage |
|-------|-------|
| `spacing-24` | body padding and stack gap |
| `spacing-16` | footer padding |
| `spacing-12` | footer button gap |
| `spacing-8` | header title → description |
| `spacing-40` | overlay inset |

### Border Radius
| Token | Usage |
|-------|-------|
| `radius-card-md` | 16px modal |

### Shadows
| Name | Usage |
|------|-------|
| `shadows/modal-sm` | modal chrome (includes 1px `border/default` ring) |

## Component Hierarchy (Pseudo-Code)

```pseudo
ROOT: ModalOverlay                         // bg/overlay, scroll, p-40
└── [COMPONENT] NewSubscriptionModal       // 520px, radius-card-md, shadow-modal-sm
    ├── [ELEMENT] Body                     // column, gap 24, p-24, scroll
    │   ├── [ELEMENT] Header
    │   │   ├── [TEXT] title               heading-page
    │   │   └── [TEXT] description         body-default / text-muted
    │   ├── …step contents
    │   └── [COMPONENT] Channels
    └── [ELEMENT] Bar                      // p-16, gap 12, justify-end, border-t
        ├── [COMPONENT] Button             // Cancel, style=soft, size=md
        └── [COMPONENT] Button             // Continue / Create topic / Create source, style=primary
```

## Step contents

### Choose `15279:86976`
1. Header — "New subscription" / "Follow a topic or a source. You decide who reaches you."
2. Divider (solid)
3. ChoiceCard Topic (selected) + ChoiceCard Source

Primary: **Continue** → Topic or Source based on the selected card.

### Topic `15279:87027`
1. Header — "New topic" / "Name the subject, then write what it should encompass."
2. TextField Title * (appearance=soft, placeholder "e.g. AI Agents")
3. LabeledTextArea "What should this topic cover?" * + caption "Write this like you’d brief a researcher. Specific beats broad."
4. TextField Keywords (placeholder "Add tag")
5. BackgroundPicker
6. SwitchWithText "Include in Daily Brief"
7. Divider
8. Channels — "Choose where Ambit should look. You can change this later."

Primary: **Create topic**

### Source `15279:87261`
1. Header — "New source" / "Follow a person or a publisher. Paste a URL and pick channels."
2. ChoiceCard Person (selected) + ChoiceCard Publisher (compact)
3. TextField Name * (placeholder "e.g. Satya Nadella")
4. TextField URL * (lead Globe, placeholder "x.com/satyanadella", caption "Paste a profile, publication, or RSS feed. Ambit will figure out the rest.")
5. SwitchWithText "Include in Daily Brief"
6. Divider
7. Channels — "We’ll only pull from the channels you select."

Primary: **Create source**

## Overlay

**Node IDs:** `15280:7362`, `15280:7414`, `15280:7597`

```pseudo
ModalOverlay {
  FILL: bg/overlay
  POSITION: absolute, covers the AppShell (sidebar + page)
  AUTO-LAYOUT: column, min-height 100%, centre the modal, padding 40px
}
```

Choose is short so it optically centres. Topic/Source are taller than 1024, so the overlay scrolls and the 40px padding pins the top.

Escape and a click on the scrim close the overlay.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `step` | `"choose" \| "topic" \| "source"` | `"choose"` | controlled step |
| `onStepChange` | `(step) => void` | — | Continue advances Choose → Topic/Source |
| `onCancel` | `() => void` | — | Cancel / overlay dismiss |
| `onCreateTopic` / `onCreateSource` | `() => void` | — | primary actions on the later steps |

## Accessibility

- Modal is `role="dialog"` `aria-modal` labelled by the header `h2`.
- Overlay listens for `Escape`.
- Choice cards are real radio groups (`name="subscription-kind"` / `name="source-kind"`).

## Notes / Warnings

- Compose existing atoms (`Button`, `Divider`, `TextField`, `Radio` via `ChoiceCard`, `SwitchWithText`, `ChannelRow`, `BackgroundPicker`). Do not restyle them inline.
- Soft inputs on this modal use `bg/input-soft` with no chrome border — that is `TextField appearance="soft"`, not a new component.
- The labelled multi-line field is `LabeledTextArea`, not the AI composer `TextArea`.
- Footer stays pinned while the body scrolls when the modal is taller than the viewport — a small adaptation from Figma, where the whole 1218px card scrolls with the overlay.
