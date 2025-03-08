import { Outlet } from "react-router-dom";
import HeaderLearningComponent from "../components/HeaderComponent/HeaderLearningComponent";

const LearningLayout = () => {
  return (
    <>
    <HeaderLearningComponent />
    <main className="flex h-[1000px] w-full mt-11">
        <Outlet/>
    </main>
    
  </>
  )
}

export default LearningLayout