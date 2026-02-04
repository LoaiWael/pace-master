import { useUser } from "@/contexts/UserContext"
import SetupPage from "@/pages/SetupPage";
import { Outlet } from "react-router-dom";


const ProtectedRoutes = () => {
  const { user } = useUser();

  if (user.isAuth) return (<Outlet />);
  else return (<SetupPage />)
}

export default ProtectedRoutes