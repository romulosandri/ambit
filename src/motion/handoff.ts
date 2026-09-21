const HANDOFF_KEY = "ambit.authHandoff"

export function markAuthHandoff() {
  try {
    sessionStorage.setItem(HANDOFF_KEY, "1")
  } catch {
    pendingHandoff = true
  }
}

export function peekAuthHandoff(): boolean {
  try {
    return sessionStorage.getItem(HANDOFF_KEY) === "1" || pendingHandoff
  } catch {
    return pendingHandoff
  }
}

export function clearAuthHandoff() {
  pendingHandoff = false
  try {
    sessionStorage.removeItem(HANDOFF_KEY)
  } catch {
    // Private mode / quota.
  }
}

let pendingHandoff = false
