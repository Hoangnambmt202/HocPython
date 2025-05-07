import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import ProgressCircle from "../ProcessCircle/ProcessCircle";
import { ChevronLeft, CircleHelp, NotebookPen } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContentStart, setContent } from "../../redux/slides/courseContentSlices";
import CourseService from "../../services/CourseService";
import { setCourseDetail } from "../../redux/slides/coursesSlices";
import ProgressService from "../../services/ProgressService";
import { updateCourseProgress } from "../../redux/slides/progressSlice";
import routeConfig from "../../configs/routes";

const HeaderLearningComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { slug } = useParams();
  const { courseProgress } = useSelector(state => state.progress);
  const { courseDetail } = useSelector(state => state.course);

  // Hàm lấy tiến độ mới nhất
  const fetchLatestProgress = async () => {
    try {
      const progressData = await ProgressService.getProgress(slug);
      if (progressData.data) {
        dispatch(updateCourseProgress({
          progress: progressData.data.progress || 0,
          totalLessons: progressData.data.totalLessons || 0,
          completedLessons: progressData.data.completedLessons || 0
        }));
      }
    } catch (error) {
      console.error("Lỗi khi lấy tiến độ mới nhất:", error);
    }
  };

  // Load dữ liệu khóa học và tiến độ ban đầu
  useEffect(() => {
    const fetchCourse = async () => {
      if (!slug) return;
  
      dispatch(fetchContentStart());
      try {
        const res = await CourseService.getCourses(slug);
        dispatch(setContent(res.data.content));
        dispatch(setCourseDetail(res.data));

        // Lấy tiến độ khóa học
        await fetchLatestProgress();
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu khóa học:", error);
      }
    };
  
    fetchCourse();
  }, [dispatch, slug]);

  // Lắng nghe sự kiện progressUpdated từ LearningPage
  useEffect(() => {
    const handleProgressUpdated = () => {
      fetchLatestProgress();
    };

    window.addEventListener('progressUpdated', handleProgressUpdated);
    return () => {
      window.removeEventListener('progressUpdated', handleProgressUpdated);
    };
  }, [slug]);

  const goBack = () => {
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate(routeConfig.home);
    }
  };

  return (
    <header className="bg-slate-700 w-full fixed top-0 z-10">
      <div className="flex items-center justify-between container mx-auto text-white">
        <div className="flex items-center gap-4">
          <button onClick={goBack} className="flex justify-center py-3 px-4 text-white hover:bg-slate-800">
            <ChevronLeft size={20} />
          </button>
          <Link to={routeConfig.home}>
            <div className="text-3xl font-Dosis font-bold text-orange-500">
              HocPython
            </div>
          </Link>
          <h2 className="text-lg font-bold">{courseDetail?.title || "Đang tải..."}</h2>
        </div>
        <div className="flex items-center">
          <ul className="flex items-center px-4 text-white gap-4 text-sm">
            <li>
              <ProgressCircle 
                progress={courseProgress?.progress || 0} 
                size={40} 
                strokeWidth={4} 
              />
            </li>
            <li>{courseProgress?.completedLessons || 0}/{courseProgress?.totalLessons || 0} bài học</li>
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
