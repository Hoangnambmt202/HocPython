import { Outlet } from "react-router-dom"
import HeaderComponent from "../components/HeaderComponent/HeaderComponent"
import FooterComponent from "../components/FooterComponent/FooterComponent"

const MainLayout = () => {
  return (
    <>
    <HeaderComponent/>
    <Outlet/>
    <FooterComponent/>
    </>
  )
}

export default MainLayout