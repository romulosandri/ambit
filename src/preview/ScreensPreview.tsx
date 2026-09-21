import { AppNavigator } from "@/screens"
import { handleAppLinkClick, NavigationProvider } from "@/navigation"

export function ScreensPreview() {
  return (
    <NavigationProvider>
      <div className="h-full" onClick={handleAppLinkClick}>
        <AppNavigator />
      </div>
    </NavigationProvider>
  )
}
