import { TextArea } from "@ds"
import { useAppNav } from "@/navigation"
import { useComposer } from "./useComposer"

export function NewChatScreen() {
  const composer = useComposer()
  const { openPrompt } = useAppNav()

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-32 py-48 max-md:px-16 max-md:py-24">
      <div className="flex w-720 max-w-full flex-col items-center gap-24">
        <h1 className="text-display-small text-text-default whitespace-nowrap max-md:whitespace-normal">
          How can I help today?
        </h1>
        <TextArea
          model="Claude Opus 5"
          value={composer.value}
          onChange={composer.onChange}
          onSubmit={() => {
            if (!composer.value.trim()) return
            openPrompt(composer.value)
          }}
        />
        <p className="text-body-default text-text-muted text-center">
          Ambit can make mistakes. Check important info.
        </p>
      </div>
    </div>
  )
}
