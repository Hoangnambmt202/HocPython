import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, } from "@fortawesome/free-solid-svg-icons";

import YouTubePlayer from "../../components/YoutubePlayer/YoutubePlayer";

export const LearningPage = () => {
 

  return (
    <>
        <div className="flex basis-9/12 flex-col gap-4 ">
          <YouTubePlayer url="https://youtu.be/NZj6LI5a9vc?si=3iO9KnNYfA53crWG" />
          <div className="px-20">
            <h2 className="text-2xl font-bold mt-4">Bài 1: Giới thiệu về Python</h2>
            <p className="text-gray-700 text-sm">Cập nhật tháng 2 năm 2025</p>
            <p title="hello" className="text-gray-500 mt-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
              voluptates, nesciunt, quos doloremque, quas quae quidem
              exercitationem magni doloribus quia repellendus. Quisquam
              voluptates, nesciunt, quos doloremque, quas quae quidem
              exercitationem magni doloribus quia repellendus.
            </p>
          </div>
        </div>
        <div className="flex basis-3/12 ">
          <div className="w-80 h-full bg-white shadow-md py-4 fixed right-0">
            <h2 className="text-xl font-bold text-center mb-4">Nội dung khóa học</h2>
            <ul className="list flex flex-col gap-2">
              <li className="flex justify-between flex-col items-start hover:bg-gray-100 p-2 cursor-pointer" >
                <div className="flex justify-between items-center w-full">
                  <a href="#" className="block font-bold">
                    Bài 1: Giới thiệu về Python
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
                    Bài 2: Cài đặt môi trường Python
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

     
    </>
  );
};
