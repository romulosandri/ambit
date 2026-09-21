import { useState, type ReactNode, type Ref } from "react"
import { Question } from "@phosphor-icons/react"
import { Button, DropdownButton, LinkButton } from "@ds"
import { cx } from "@ds/components/cx"

const languages = [
  { value: "en", label: "English", code: "EN" },
  { value: "pt", label: "Português", code: "PT" },
  { value: "es", label: "Español", code: "ES" },
  { value: "fr", label: "Français", code: "FR" },
  { value: "de", label: "Deutsch", code: "DE" },
] as const

export type AuthShellProps = {
  children: ReactNode
  className?: string
}

export function AuthShell({ children, className }: AuthShellProps) {
  return (
    <div
      className={cx(
        "bg-bg-muted flex h-full w-full flex-col overflow-hidden",
        className,
      )}
    >
      <div className="flex min-h-0 flex-1 items-center justify-center overflow-y-auto p-32 max-md:p-16">
        {children}
      </div>
      <AuthBottomBar />
    </div>
  )
}

export type AuthCardProps = {
  children: ReactNode
  className?: string
  ref?: Ref<HTMLDivElement>
}

export function AuthCard({ children, className, ref }: AuthCardProps) {
  return (
    <div
      ref={ref}
      className={cx(
        "bg-bg-subtle shadow-modal-md w-400 max-w-full overflow-hidden rounded-card-md",
        className,
      )}
    >
      {children}
    </div>
  )
}

function AuthBottomBar() {
  const [language, setLanguage] = useState<(typeof languages)[number]["value"]>(
    "en",
  )
  const selected =
    languages.find((item) => item.value === language) ?? languages[0]

  return (
    <footer className="flex shrink-0 flex-wrap items-center justify-between gap-16 p-32 max-md:gap-12 max-md:p-16">
      <div className="flex flex-wrap items-center gap-12">
        <LinkButton href="#">Terms and Conditions</LinkButton>
        <span aria-hidden className="bg-text-muted size-4 rounded-full" />
        <LinkButton href="#">Privacy Policy</LinkButton>
      </div>
      <div className="flex items-center gap-8">
        <Button size="xs" borderStyle="dashed" leadIcon={Question}>
          Help
        </Button>
        <DropdownButton
          options={languages.map((item) => ({
            value: item.value,
            label: item.label,
          }))}
          value={language}
          onChange={(next) =>
            setLanguage(next as (typeof languages)[number]["value"])
          }
          align="end"
        >
          Language: {selected.code}
        </DropdownButton>
      </div>
    </footer>
  )
}
