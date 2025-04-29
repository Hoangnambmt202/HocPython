import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BaseDropdown from "../BaseDropdown/BaseDropdown";
import { useDispatch } from "react-redux";
import EnrollService from "../../services/EnrollService";
import ProgressService from "../../services/ProgressService";
import { setEnrolledCourses } from "../../redux/slides/enrollSlice";
import { setAllCourseProgress } from "../../redux/slides/progressSlice";
const CoursesMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const [courseEnrolled, setCourseEnrolled] = useState([]);
  const [courseProgress, setCourseProgress] = useState({});

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
        const res = await EnrollService.allCourseEnroll();
        setCourseEnrolled(res.data);
        dispatch(setEnrolledCourses(res.data));
        
        // Lấy tiến độ cho từng khóa học
        const progressPromises = res.data.map(async (course) => {
          try {
            const progressRes = await ProgressService.getProgress(course.courseId.slug);
            return {
              courseId: course.courseId._id,
              progress: progressRes.data?.progress || 0,
              completedLessons: progressRes.data?.completedLessons || 0,
              totalLessons: progressRes.data?.totalLessons || 0
            };
          
            
          } catch (error) {
            console.error(`Error fetching progress for course ${course.courseId._id}:`, error);
            return {
              courseId: course.courseId._id,
              progress: 0,
              completedLessons: 0,
              totalLessons: 0
            };
          }
    
        });

        const progressResults = await Promise.all(progressPromises);
        const progressMap = progressResults.reduce((acc, curr) => {
          acc[curr.courseId] = curr;
          return acc;
        }, {});
        setCourseProgress(progressMap);
        dispatch(setAllCourseProgress(progressMap));
      } catch (error) {
        console.error("Failed to fetch enrolled courses:", error);
      }
    };

    fetchEnrolledCourses();
  }, [dispatch]);

  return (
    <div className="relative">
      <button className="relative px-4 py-2 text-sm font-semibold text-black hover:text-blue-500" onClick={() => setIsOpen(true)}>
        Khóa học của tôi
      </button>

      <BaseDropdown isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className="fixed inset-0 flex justify-end" onClick={() => setIsOpen(false)}>
          <div
            className="absolute right-[180px] top-16 bg-white border border-gray-200 rounded-lg shadow-lg w-80"
            onClick={(e) => e.stopPropagation()}
          >
            <header className="px-5 py-4">
              <h3 className="font-semibold text-gray-900">Khóa học của tôi</h3>
            </header>
          
            <div className="max-h-[400px] overflow-y-auto">
              {courseEnrolled?.map((course, index) => {
                const progress = courseProgress[course.courseId._id] || {
                  progress: 0,
                  completedLessons: 0,
                  totalLessons: 0
                };

                return (
                  <Link
                    to={`/course/${course.courseId?.slug}`}
                    key={index}
                    className="px-4 py-3 block hover:bg-gray-50 cursor-pointer border-t border-gray-100 first:border-t-0"
                  >
                    <div className="flex items-start">
                      <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                        <img src={course.courseId.thumbnail} alt={course.courseId?.title} className="w-full h-full object-cover rounded-full" />
                      </div>
                      <div className="ml-3 flex-1">
                        <p className="text-sm font-medium text-gray-900">{course.courseId?.title}</p>
                        <p className="text-xs text-gray-500 mb-2"></p>
                        
                        {/* Progress Bar */}
                        <div className="w-full">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-xs text-gray-500">
                              {progress.completedLessons}/{progress.totalLessons} bài học
                            </span>
                            <span className="text-xs font-medium text-orange-500">
                              {progress.progress}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-1.5">
                            <div
                              className="bg-orange-500 h-1.5 rounded-full transition-all duration-300"
                              style={{ width: `${progress.progress}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
            
            <div className="p-4 border-t border-gray-100">
              <Link to="/my-courses"
                className="w-full px-4 py-2 text-sm font-medium text-orange-500 hover:bg-orange-50 rounded-lg transition-colors"
              >
                Xem tất cả khóa học
              </Link>
            </div>
          </div>
        </div>
      </BaseDropdown>
    </div>
  );
};

export default CoursesMenu;