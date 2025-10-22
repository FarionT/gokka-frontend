import { Navigate, Outlet } from "react-router"
import { useAuth } from "../utils/getAuth"
import { Sidebar } from "../ui-kit"

const BasicLayout = () => {
  // const { menu1 } = useMenu()
  return (
    // <SideBar isShowOnDesktop={true} menu={menu1}>
    //   <NavBar isUseSidebarOnDesktop={true} />
    <div className="flex w-full min-h-screen">
      <Sidebar 
        isExpanded={true} 
      />
      <div className="w-full">
        <Outlet />
      </div>
    </div>
    // </SideBar>
  )
}

const PrivateRoutes = () => {
  const { isLoggedIn } = useAuth();
  console.log(isLoggedIn)
  return isLoggedIn ? <BasicLayout /> : <Navigate to='/' />
}

export default PrivateRoutes