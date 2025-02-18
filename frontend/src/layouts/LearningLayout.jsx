import HeaderLearningComponent from "../components/HeaderComponent/HeaderLearningComponent";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Outlet } from "react-router-dom";

const LearningLayout = () => {
  return (
    <>
    <HeaderLearningComponent />
    <main className="flex h-screen mt-10">
        <Outlet/>
    </main>
    <div className="flex justify-center py-4 items-center ">
    <button className="px-4 py-2 text-white ml-2 text-sm font-medium bg-blue-500 uppercase rounded-full "> 
      <FontAwesomeIcon icon={faChevronLeft} />
      Bài trước
    </button>
    <button title="Phím tắt: Ctrl + Enter" className="px-4 py-2 text-white ml-2 text-sm font-medium bg-blue-500 uppercase rounded-full ">
      Bài tiếp theo
      <FontAwesomeIcon icon={faChevronRight} />
    </button>
  </div>
  </>
  )
}

export default LearningLayout