import { useState, type ChangeEvent } from "react"
import { useAppNav } from "@/navigation"

export function useComposer() {
  const [prompt, setPrompt] = useState("")
  const { openPrompt } = useAppNav()

  return {
    value: prompt,
    onChange: (event: ChangeEvent<HTMLTextAreaElement>) => {
      setPrompt(event.currentTarget.value)
    },
    onSubmit: () => {
      const next = prompt.trim()
      if (!next) return
      openPrompt(next)
      setPrompt("")
    },
  }
}
