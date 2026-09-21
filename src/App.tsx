import { AppNavigator } from './screens'
import { handleAppLinkClick, NavigationProvider } from './navigation'

function App() {
  return (
    <NavigationProvider>
      <div className="h-svh" onClick={handleAppLinkClick}>
        <AppNavigator />
      </div>
    </NavigationProvider>
  )
}

export default App
