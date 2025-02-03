import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HeaderLearingComponent from "../../components/HeaderComponent/HeaderLearingComponent";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

export const LearningPage = () => {
  return (
    <>
      <HeaderLearingComponent />
      <main className="flex h-screen mt-10">
        <div className="flex basis-9/12 ">hello</div>
        <div className="flex basis-3/12 ">
          <div className="w-80 h-full bg-white rounded-lg shadow-md py-4 fixed right-0">
            <h2 className="text-xl font-bold text-center mb-4">Nội dung khóa học</h2>
            <ul className="list flex flex-col gap-2">
              <li className="flex justify-between flex-col items-start hover:bg-gray-100 p-2 cursor-pointer" >
                <div className="flex justify-between items-center w-full">
                  <a href="#" className="block font-bold">
                    Bài 1: Giới thiệu về React
                  </a>
                  <FontAwesomeIcon icon={faChevronDown} />
                </div>
                <div className="text-sm text-gray-500">
                  0/9 | 01:30:00
                </div>
              </li>
              <li className="flex justify-between flex-col items-start hover:bg-gray-100 p-2 cursor-pointer" >
                <div className="flex justify-between items-center w-full">
                  <a href="#" className="block font-bold">
                    Bài 2: Cài đặt môi trường
                  </a>
                  <FontAwesomeIcon icon={faChevronDown} />
                </div>
                <div className="text-sm text-gray-500">
                  0/9 | 01:30:00
                </div>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </>
  );
};
