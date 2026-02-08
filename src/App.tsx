import { RouterProvider } from "react-router-dom"
import router from "./router"
import UserProvider from "./contexts/UserContext"
import SystemProvider from "./contexts/SystemContext"


const App = () => {
  return (
    <SystemProvider>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </SystemProvider>
  )
}

export default App