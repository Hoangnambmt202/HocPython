import { Link } from "react-router-dom";
import AsideComponent from "../../components/AsideComponent/AsideComponent";
import { useEffect } from "react";
import { Book, Clock } from "lucide-react";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import { useDispatch, useSelector } from "react-redux";
import EnrollService from "../../services/EnrollService";
import { setEnrolledCourses } from "../../redux/slides/enrollSlice";
import { Helmet } from "react-helmet-async";

const MyCoursesPage = () => {
  const dispatch = useDispatch();
  const allCourseProgress = useSelector((state) => state.progress.allCourseProgress);
  const enrolledCourses = useSelector((state) => state.enrollment.enrolledCourses);
  useEffect (()=>{
    const fetchEnrolledCourses = async () => {
      const res = await EnrollService.allCourseEnroll();
      dispatch(setEnrolledCourses(res.data));
    }
    fetchEnrolledCourses()
  },[dispatch])
  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString("vi-VN", { year: "numeric", month: "2-digit", day: "2-digit" });
};
  return (
    <>
      <Helmet>
  <title>HocPython | Khóa học của tôi</title>
</Helmet>
    <div className="flex w-full h-full bg-white">
      <AsideComponent />
      <div className="flex-1 px-4 py-8 mx-auto">
        <div className="grid grid-rows-1 gap-4 mb-8">
          <header className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-2xl font-bold mb-2">Khóa học của tôi</h3>
              <p>Bạn đang có {enrolledCourses.length} khóa học.</p>
            </div>
            <div>
              <select className="w-fit border p-2 rounded-md">
                <option value="latest">Mới nhất</option>
                <option value="popular">Phổ biến</option>
                <option value="free">Miễn phí</option>
              </select>
            </div>
          </header>

          <div className="grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
            {enrolledCourses.map((course) => {
               const progressData = allCourseProgress[course.courseId?._id] || {
                progress: 0,
                completedLessons: 0,
                totalLessons: 0
              };
              return (
                <Link
                  to={`/course/${course.courseId?.slug}/learn`}
                  key={course._id}
                  className="card bg-gray-100 flex flex-col rounded-lg shadow-md"
                >
                  <img
                    src={course.courseId?.thumbnail}
                    alt={`Course ${course.courseId?.title}`}
                    className="w-full h-32 object-cover rounded-t-lg"
                  />
                  <div className="p-2 flex-1">
                    <h3 className="text-lg min-h-14 line-clamp-2 font-semibold">
                      {course.courseId?.title}
                    </h3>
                    <p>{course.price > 0 ? `Giá: ${course.price} VNĐ` : "Miễn phí"}</p>
                  </div>
                  <div className="p-2">
                    <ProgressBar progress={progressData.progress} completedLessons={progressData.completedLessons} totalLessons={progressData.totalLessons} />
                  </div>
                  <div className="flex justify-between items-center p-2 border-t">
                    <span className="text-sm flex gap-1 items-center text-gray-500">
                      <Book /> { progressData.totalLessons} bài học
                     
                    </span>
                    <span className="text-sm flex gap-1 items-center text-gray-500">
                      <Clock /> {formatDate(course.enrolledAt)}
                    </span>
                  </div>
                </Link>
              )
              
            } 
            )}
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default MyCoursesPage;