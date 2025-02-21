
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import ProgressCircle from "../ProcessCircle/ProcessCircle";
import { ChevronLeft, CircleHelp, NotebookPen } from "lucide-react";

const HeaderLearningComponent = () => {
  // eslint-disable-next-line no-unused-vars
  const [progress, setProgress] = useState(0); // Tiến độ học tập
  const navigate = useNavigate();
  const goBack = () => {
    if (window.history.length > 2) {
        navigate(-1);
    } else {
        navigate("/"); // Quay về trang chủ nếu không có lịch sử
    }
};
  return (
    <header className=" bg-slate-700 w-full fixed top-0 z-10">
      <div className="flex items-center justify-between container mx-auto text-white ">
        <div className=" flex items-center gap-4 ">
          <button onClick={goBack} className="px-5 flex justify-center py-3 w-7 text-white hover:bg-slate-800">
            <ChevronLeft />
          </button>
          <Link to="/">
            <div className="text-3xl font-Dosis font-bold text-orange-500">
              HocPython
            </div>
          </Link>
          <h2>Học Python cơ bản miễn phí</h2>
        </div>
        <div className="flex items-center ">
          <ul className="flex items-center px-4 text-white gap-4 text-sm ">
            <li>
            {/* <button
                className="px-4 py-2 bg-blue-500 text-white rounded"
                onClick={() =>
                    setProgress((prev) => (prev <= 0 ? 0 : prev - 10))
                }
              >
                Giảm tiến độ
              </button> */}
              <ProgressCircle progress={progress} size={40} strokeWidth={4} />
              {/* <button
                className="px-4 py-2 bg-blue-500 text-white rounded"
                onClick={() =>
                  setProgress((prev) => (prev >= 100 ? 0 : prev + 10))
                }
              >
                Tăng tiến độ
              </button> */}
            </li>
            <li>0/10 bài học</li>
            <li>
              <NotebookPen className="mr-2" />
              Ghi chú
            </li>
            <li>
              <CircleHelp className="mr-2" />
              Hướng dẫn
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};
export default HeaderLearningComponent;
