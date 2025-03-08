import { Link, useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import ProgressCircle from "../ProcessCircle/ProcessCircle";
import { ChevronLeft, CircleHelp, NotebookPen } from "lucide-react";
import { useSelector } from "react-redux";

const HeaderLearningComponent = () => {
  const { slug } = useParams(); // Lấy slug từ URL
  const navigate = useNavigate();
  const enrolledCourses = useSelector((state) => state.cart.enrolledCourses || []);

  // Tìm khóa học theo slug
  const course = enrolledCourses.find((c) => c.slug === slug) || {};

  const [progress, setProgress] = useState(0); // Tiến độ học tập

  const goBack = () => {
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate("/"); // Quay về trang chủ nếu không có lịch sử
    }
  };

  return (
    <header className="bg-slate-700 w-full fixed top-0 z-10">
      <div className="flex items-center justify-between container mx-auto text-white">
        <div className="flex items-center gap-4">
          <button onClick={goBack} className="flex justify-center py-3 px-4 text-white hover:bg-slate-800">
            <ChevronLeft size={20} />
          </button>
          <Link to="/">
            <div className="text-3xl font-Dosis font-bold text-orange-500">
              HocPython
            </div>
          </Link>
          {/* Hiển thị tiêu đề khóa học */}
          <h2 className="text-lg font-bold">{course.title || "Đang tải..."}</h2>
        </div>
        <div className="flex items-center">
          <ul className="flex items-center px-4 text-white gap-4 text-sm">
            <li>
              <ProgressCircle progress={progress} size={40} strokeWidth={4} />
            </li>
            <li>0/10 bài học</li>
            <li>
              <button className="flex hover:cursor-pointer">
                <NotebookPen size={18} className="mr-2" />
                <span>Ghi chú</span>
              </button>
            </li>
            <li>
              <button className="flex hover:cursor-pointer">
                <CircleHelp size={18} className="mr-2" />
                <span> Hướng dẫn</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default HeaderLearningComponent;
