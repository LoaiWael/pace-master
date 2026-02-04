import SideBar from "@/components/SideBar"
import { Outlet } from "react-router-dom"

const RootLayout = () => {
  return (
    <>
      <SideBar />
      <Outlet />
    </>
  )
}

export default RootLayout