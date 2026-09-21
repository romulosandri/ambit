# AUTH SCREENS Blueprint

## Design Overview

**Template Names:** `sign-in` `15201:3155`, `sign-in-email` `15199:1795`, `sign-up` `15201:3545`, `sign-up-with-email` `15201:3295`
**Purpose:** Four states of the same unauthenticated surface — a 400px card centred on `bg/muted`, with a legal/help bar pinned to the bottom. No sidebar, no `AppShell`.

## Design Tokens & Variables

### Colors
| Token | Usage |
|-------|-------|
| `bg/muted` | page fill |
| `bg/subtle` | card fill |
| `text/default` | titles, field labels, primary button label |
| `text/muted` | subtitle, footer prompt, "or" |
| `text/informative` | "Sign up" / "Sign in" / "Reset password" / Terms links |
| `border/default` | card ring (via `shadows/modal-md`) |

### Typography
| Style | Usage |
|-------|-------|
| `heading/heading-section` (16/1) | "Create an account" |
| `heading/heading-subsection` (14/1) | field labels, button labels, "or" |
| `body/body-default` (14/1.2) | subtitle, footer prompt |

### Spacing
| Token | Where |
|---|---|
| `spacing-36` | card padding |
| `spacing-24` | card section gaps, footer vertical padding |
| `spacing-20` | gap between form fields |
| `spacing-12` | logo → subtitle, legal links |
| `spacing-8` | stacked buttons, "or" divider gap, Google/Github pair |
| `spacing-4` | footer prompt → link |
| `spacing-32` | bottom-bar padding (88px tall) |

### Border Radius / Shadow
| Token | Usage |
|-------|-------|
| `radius-card-md` 16px | card |
| `shadows/modal-md` | card elevation + 1px `border/default` ring |

## Shell

```pseudo
ROOT: AuthShell                            // 1440 × 1024, bg/muted, column
├── [ELEMENT] stage                        // flex-1, center the card
│   └── [ELEMENT] AuthCard                 // 400px, bg/subtle, radius-card-md, shadow-modal-md
└── [ELEMENT] bottom-bar                   // 88px, space-between, padding 32
    ├── legal: LinkButton "Terms and Conditions" · LinkButton "Privacy Policy"
    └── actions: Button xs dashed "Help" + DropdownButton "Language: EN"
```

## Card states

### Sign in (`15201:3256`) — 400 × 428
Logo, subtitle "Welcome back!", three `SocialButton` (Apple / Google / X), `Divider` label "or", primary `Button` lg "Sign in with email", footer "New to Ambit?" + informative "Sign up". Footer is a separate padded row with a top `border/default`.

### Sign in with email (`15177:77545`) — 400 × 482
Logo, "Welcome back!", `TextField` "Email address or username", `TextField` "Password" (tail "Reset password" + eye icon), `CheckboxWithText` "Remember me" checked, primary "Sign In", soft "Single sign-on (SSO)", solid `Divider`, same footer.

### Sign up (`15201:3724`) — 400 × 448
Logo, heading-section "Create an account", subtitle "Welcome! Create an account to get started.", three `SocialButton`, `Divider` "or", primary "Sign up with email", footer "Already have an account?" + "Sign in".

### Sign up with email (`15201:3396`) — 400 × 796
Same header as sign-up. Pair of md `SocialButton` (Google / Github) at 160px. `Divider` "or". Fields: First name + Last name (row, gap 16), Username, Email, Phone (lead "US" dropdown + "+1"), Password with eye. `CheckboxWithText` "I agree to the Terms and Conditions" (Terms/Conditions are `text/informative`). Primary "Create free account". Solid divider + sign-in footer.

## Component extensions

| Change | Why |
|---|---|
| `Divider.label` | the "or" text-center variant |
| `LinkButton.tone="informative"` | footer links, reset password |
| `SocialButton` brands `x` / `github`, `size` md | Page 38 uses X not Microsoft; email-sign-up pair is md |
| `TextField.end` | password eye |
| `TextField.lead` | phone country cluster |
| `CheckboxWithText.title` as `ReactNode` | mixed-colour Terms copy |

Brand marks for Apple / Google / X / Github stay optional `markSrc` — they are not in `src/design-system/assets/` yet, same rule as `BLUEPRINT-SOCIAL-BUTTON.md`.
