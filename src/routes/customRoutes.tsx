import { Outlet } from "react-router"

const BasicLayout = () => {
  // const { menu1 } = useMenu()
  return (
    // <SideBar isShowOnDesktop={true} menu={menu1}>
    //   <NavBar isUseSidebarOnDesktop={true} />
      <Outlet />
    // </SideBar>
  )
}

const CustomRoutes = () => {
  return <BasicLayout />
}

export default CustomRoutes