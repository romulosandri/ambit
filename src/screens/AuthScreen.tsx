import { CaretDown, Eye, EyeSlash, Key } from "@phosphor-icons/react"
import { useRef, useState } from "react"
import {
  Button,
  CheckboxWithText,
  Divider,
  DropdownMenu,
  DropdownMenuItem,
  Icon,
  LinkButton,
  Logo,
  SocialButton,
  TextField,
} from "@ds"
import { AuthCard, AuthShell } from "@/layout"
import {
  AnimatePresence,
  gsap,
  markAuthHandoff,
  motion,
  prefersReducedMotion,
  presenceTransition,
  useGSAP,
  useReducedMotion,
} from "@/motion"
import { useAppNav } from "@/navigation"

const countries = [
  { value: "US", label: "United States", dial: "+1" },
  { value: "BR", label: "Brazil", dial: "+55" },
  { value: "GB", label: "United Kingdom", dial: "+44" },
  { value: "DE", label: "Germany", dial: "+49" },
  { value: "FR", label: "France", dial: "+33" },
  { value: "ES", label: "Spain", dial: "+34" },
  { value: "PT", label: "Portugal", dial: "+351" },
  { value: "CA", label: "Canada", dial: "+1" },
  { value: "AU", label: "Australia", dial: "+61" },
  { value: "IN", label: "India", dial: "+91" },
] as const

type CountryCode = (typeof countries)[number]["value"]

export type AuthView =
  | "sign-in"
  | "sign-in-email"
  | "sign-up"
  | "sign-up-email"

export function AuthScreen({
  initialView = "sign-in",
}: {
  initialView?: AuthView
}) {
  const [view, setView] = useState<AuthView>(initialView)
  const { navigate } = useAppNav()
  const rootRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()

  const { contextSafe } = useGSAP(
    () => {
      if (prefersReducedMotion()) return
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } })
      tl.from(cardRef.current, { y: 28, opacity: 0, duration: 0.55 })
      tl.from(
        "[data-auth-stagger]",
        { y: 12, opacity: 0, duration: 0.4, stagger: 0.06 },
        "-=0.28",
      )
    },
    { scope: rootRef },
  )

  const enterApp = contextSafe(() => {
    const goHome = () => {
      markAuthHandoff()
      navigate({ name: "home" })
    }
    if (prefersReducedMotion() || !cardRef.current) {
      goHome()
      return
    }
    gsap.to(cardRef.current, {
      y: -20,
      opacity: 0,
      duration: 0.4,
      ease: "power2.in",
      onComplete: goHome,
    })
  })

  return (
    <div ref={rootRef} className="h-full">
      <AuthShell>
        <AuthCard ref={cardRef}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={view}
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
              transition={presenceTransition}
            >
              {renderAuthView(view, setView, enterApp)}
            </motion.div>
          </AnimatePresence>
        </AuthCard>
      </AuthShell>
    </div>
  )
}

function renderAuthView(
  view: AuthView,
  setView: (view: AuthView) => void,
  onEnter: () => void,
) {
  switch (view) {
    case "sign-in":
      return (
        <SignInSocial
          onEmail={() => setView("sign-in-email")}
          onSwitch={() => setView("sign-up")}
          onEnter={onEnter}
        />
      )
    case "sign-in-email":
      return (
        <SignInEmail
          onSwitch={() => setView("sign-up")}
          onEnter={onEnter}
        />
      )
    case "sign-up":
      return (
        <SignUpSocial
          onEmail={() => setView("sign-up-email")}
          onSwitch={() => setView("sign-in")}
          onEnter={onEnter}
        />
      )
    case "sign-up-email":
      return (
        <SignUpEmail
          onSwitch={() => setView("sign-in")}
          onEnter={onEnter}
        />
      )
    default: {
      const _exhaustive: never = view
      return _exhaustive
    }
  }
}

function AuthHeader({
  title,
  subtitle,
}: {
  title?: string
  subtitle: string
}) {
  return (
    <div className="flex w-full flex-col items-center gap-12" data-auth-stagger>
      <Logo />
      <div className="flex w-full flex-col items-center gap-4 text-center">
        {title ? (
          <p className="text-heading-section text-text-default">{title}</p>
        ) : null}
        <p className="text-body-default text-text-muted">{subtitle}</p>
      </div>
    </div>
  )
}

function AuthFooter({
  prompt,
  action,
  onClick,
}: {
  prompt: string
  action: string
  onClick: () => void
}) {
  return (
    <div className="flex items-center justify-center gap-4" data-auth-stagger>
      <span className="text-body-default text-text-muted">{prompt}</span>
      <LinkButton tone="informative" onClick={onClick}>
        {action}
      </LinkButton>
    </div>
  )
}

function PasswordToggle({
  visible,
  onClick,
}: {
  visible: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={visible ? "Hide password" : "Show password"}
      className="text-icon-default flex size-20 items-center justify-center"
    >
      <Icon icon={visible ? EyeSlash : Eye} size={16} tone="muted" />
    </button>
  )
}

function SignInSocial({
  onEmail,
  onSwitch,
  onEnter,
}: {
  onEmail: () => void
  onSwitch: () => void
  onEnter: () => void
}) {
  return (
    <>
      <div className="border-border-default flex flex-col gap-24 border-b p-36 max-md:p-24">
        <AuthHeader subtitle="Welcome back!" />
        <div className="flex flex-col gap-24" data-auth-stagger>
          <div className="flex flex-col gap-8">
            <SocialButton brand="apple" onClick={onEnter} />
            <SocialButton brand="google" onClick={onEnter} />
            <SocialButton brand="x" onClick={onEnter} />
          </div>
          <Divider label="or" style="solid" />
          <Button style="primary" size="lg" fullWidth onClick={onEmail}>
            Sign in with email
          </Button>
        </div>
      </div>
      <div className="px-36 py-24 max-md:px-24">
        <AuthFooter prompt="New to Ambit?" action="Sign up" onClick={onSwitch} />
      </div>
    </>
  )
}

function SignInEmail({
  onSwitch,
  onEnter,
}: {
  onSwitch: () => void
  onEnter: () => void
}) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="flex flex-col gap-24 px-36 pt-36 pb-24 max-md:px-24 max-md:pt-24">
      <AuthHeader subtitle="Welcome back!" />
      <div className="flex flex-col gap-20">
        <TextField label="Email address or username" autoComplete="username" />
        <TextField
          label="Password"
          type={showPassword ? "text" : "password"}
          autoComplete="current-password"
          tail={
            <LinkButton tone="informative">Reset password</LinkButton>
          }
          end={
            <PasswordToggle
              visible={showPassword}
              onClick={() => setShowPassword((value) => !value)}
            />
          }
        />
        <CheckboxWithText title="Remember me" defaultChecked />
      </div>
      <div className="flex flex-col gap-8">
        <Button style="primary" size="lg" fullWidth onClick={onEnter}>
          Sign In
        </Button>
        <Button size="lg" style="soft" fullWidth leadIcon={Key} onClick={onEnter}>
          Single sign-on (SSO)
        </Button>
      </div>
      <Divider style="solid" />
      <AuthFooter prompt="New to Ambit?" action="Sign up" onClick={onSwitch} />
    </div>
  )
}

function SignUpSocial({
  onEmail,
  onSwitch,
  onEnter,
}: {
  onEmail: () => void
  onSwitch: () => void
  onEnter: () => void
}) {
  return (
    <>
      <div className="border-border-default flex flex-col gap-24 border-b p-36 max-md:p-24">
        <AuthHeader
          title="Create an account"
          subtitle="Welcome! Create an account to get started."
        />
        <div className="flex flex-col gap-24" data-auth-stagger>
          <div className="flex flex-col gap-8">
            <SocialButton brand="apple" onClick={onEnter}>
              Sign up with Apple
            </SocialButton>
            <SocialButton brand="google" onClick={onEnter}>
              Sign up with Google
            </SocialButton>
            <SocialButton brand="x" onClick={onEnter}>
              Sign up with X
            </SocialButton>
          </div>
          <Divider label="or" style="solid" />
          <Button style="primary" size="lg" fullWidth onClick={onEmail}>
            Sign up with email
          </Button>
        </div>
      </div>
      <div className="px-36 py-24 max-md:px-24">
        <AuthFooter
          prompt="Already have an account?"
          action="Sign in"
          onClick={onSwitch}
        />
      </div>
    </>
  )
}

function SignUpEmail({
  onSwitch,
  onEnter,
}: {
  onSwitch: () => void
  onEnter: () => void
}) {
  const [showPassword, setShowPassword] = useState(false)
  const [country, setCountry] = useState<CountryCode>("US")
  const dial =
    countries.find((item) => item.value === country)?.dial ?? "+1"
  const [phone, setPhone] = useState<string>(dial)

  return (
    <div className="flex flex-col gap-24 px-36 pt-36 pb-24 max-md:px-24 max-md:pt-24">
      <AuthHeader
        title="Create an account"
        subtitle="Welcome! Create an account to get started."
      />
      <div className="flex gap-8">
        <SocialButton
          brand="google"
          size="md"
          fullWidth={false}
          className="flex-1"
          onClick={onEnter}
        >
          Google
        </SocialButton>
        <SocialButton
          brand="github"
          size="md"
          fullWidth={false}
          className="flex-1"
          onClick={onEnter}
        >
          Github
        </SocialButton>
      </div>
      <Divider label="or" style="solid" />
      <div className="flex flex-col gap-20">
        <div className="flex gap-16 max-md:flex-col">
          <TextField label="First name" autoComplete="given-name" />
          <TextField label="Last name" autoComplete="family-name" />
        </div>
        <TextField label="Username" autoComplete="username" />
        <TextField
          label="Email address"
          type="email"
          autoComplete="email"
        />
        <TextField
          label="Phone number"
          inputMode="tel"
          autoComplete="tel"
          value={phone}
          onChange={(event) => setPhone(event.currentTarget.value)}
          lead={
            <CountryCodePicker
              value={country}
              onChange={(next) => {
                const previous =
                  countries.find((item) => item.value === country)?.dial ?? "+1"
                const nextDial =
                  countries.find((item) => item.value === next)?.dial ?? "+1"
                setCountry(next)
                setPhone((current) =>
                  current.trim() === "" || current === previous
                    ? nextDial
                    : current,
                )
              }}
            />
          }
        />
        <TextField
          label="Password"
          type={showPassword ? "text" : "password"}
          autoComplete="new-password"
          end={
            <PasswordToggle
              visible={showPassword}
              onClick={() => setShowPassword((value) => !value)}
            />
          }
        />
        <CheckboxWithText
          title={
            <>
              I agree to the{" "}
              <LinkButton tone="informative" href="#">
                Terms
              </LinkButton>{" "}
              and{" "}
              <LinkButton tone="informative" href="#">
                Conditions
              </LinkButton>
            </>
          }
        />
      </div>
      <Button style="primary" size="lg" fullWidth onClick={onEnter}>
        Create free account
      </Button>
      <Divider style="solid" />
      <AuthFooter
        prompt="Already have an account?"
        action="Sign in"
        onClick={onSwitch}
      />
    </div>
  )
}

function CountryCodePicker({
  value,
  onChange,
}: {
  value: CountryCode
  onChange: (value: CountryCode) => void
}) {
  const triggerRef = useRef<HTMLButtonElement>(null)
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Country code"
        onClick={() => setOpen((current) => !current)}
        className="text-heading-subsection text-text-muted hover:text-text-default flex items-center gap-4 outline-none"
      >
        {value}
        <Icon
          icon={CaretDown}
          size={16}
          tone="muted"
          className={open ? "rotate-180" : undefined}
        />
      </button>
      <DropdownMenu
        open={open}
        onClose={() => setOpen(false)}
        anchor={triggerRef}
      >
        {countries.map((item) => (
          <DropdownMenuItem
            key={item.value}
            selected={item.value === value}
            onSelect={() => {
              onChange(item.value)
              setOpen(false)
            }}
          >
            {item.label}
            <span className="text-text-muted"> {item.dial}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenu>
    </>
  )
}
