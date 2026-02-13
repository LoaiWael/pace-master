import SideBar from "@/components/SideBar";
import { useUser } from "@/contexts/UserContext"
import SetupPage from "@/pages/SetupPage";
import { Outlet } from "react-router-dom";


const ProtectedRoutes = () => {
  const { userState } = useUser();

  if (userState.isAuth) return (
    <>
      <SideBar />
      <Outlet />
    </>
  );
  else return (<SetupPage />)
}

export default ProtectedRoutes