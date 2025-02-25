
import { Outlet } from "react-router-dom"
import AsideComponent from "../components/AsideComponent/AsideComponent"
import FooterComponent from "../components/FooterComponent/FooterComponent"
import HeaderComponent from "../components/HeaderComponent/HeaderComponent"

// import YouTubePlayer from "../components/YoutubePlayer/YoutubePlayer"
// import { Check } from "lucide-react"


const CoursesLayout = () => {
  return (
    <>
    <HeaderComponent/>

    <main className="flex bg-gray-50">
        <AsideComponent/>
        <Outlet/>

    </main>
    <FooterComponent/>
    </>
  )
}

export default CoursesLayout