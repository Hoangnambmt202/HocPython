import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BaseDropdown from "../BaseDropdown/BaseDropdown";
import { useDispatch } from "react-redux";
import EnrollService from "../../services/EnrollService";
import ProgressService from "../../services/ProgressService";
import { setEnrolledCourses } from "../../redux/slides/enrollSlice";
import { setAllCourseProgress } from "../../redux/slides/progressSlice";
import routeConfig from "../../configs/routes";
import ProgressBar from "../ProgressBar/ProgressBar";

const CoursesMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const [courseEnrolled, setCourseEnrolled] = useState([]);
  const [courseProgress, setCourseProgress] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
        setLoading(true);
        const res = await EnrollService.allCourseEnroll();
        const validCourses = res.data?.filter(course => course?.courseId) || [];
        setCourseEnrolled(validCourses);
        dispatch(setEnrolledCourses(validCourses));
        
        // Lấy tiến độ cho từng khóa học
        const progressPromises = validCourses.map(async (course) => {
          if (!course?.courseId?.slug) return null;
          
          try {
            const progressRes = await ProgressService.getProgress(course.courseId.slug);
            return {
              courseId: course.courseId?._id,
              progress: progressRes.data?.progress || 0,
              completedLessons: progressRes.data?.completedLessons || 0,
              totalLessons: progressRes.data?.totalLessons || 0
            };
          } catch (error) {
            console.error(`Error fetching progress for course ${course.courseId?._id}:`, error);
            return {
              courseId: course.courseId?._id,
              progress: 0,
              completedLessons: 0,
              totalLessons: 0
            };
          }
        });

        const progressResults = await Promise.all(progressPromises);
        const progressMap = progressResults.reduce((acc, curr) => {
          if (curr && curr.courseId) {
            acc[curr.courseId] = curr;
          }
          return acc;
        }, {});
        
        setCourseProgress(progressMap);
        dispatch(setAllCourseProgress(progressMap));
      } catch (error) {
        console.error("Failed to fetch enrolled courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEnrolledCourses();
  }, [dispatch]);

  if (loading) {
    return (
      <div className="relative">
        <button className="relative xs:hidden px-4 py-2 text-sm font-semibold text-black hover:text-blue-500">
          Đang tải...
        </button>
      </div>
    );
  }

  return (
    <div className="relative">
      <button 
        className="relative xs:hidden px-4 py-2 text-sm font-semibold text-black hover:text-blue-500" 
        onClick={() => setIsOpen(true)}
      >
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
              {courseEnrolled.length === 0 ? (
                <div className="px-4 py-3 text-center text-sm text-gray-500">
                  Bạn chưa đăng ký khóa học nào
                </div>
              ) : (
                courseEnrolled.map((course, index) => {
                  if (!course?.courseId) return null;
                  
                  const progress = courseProgress[course.courseId._id] || {
                    progress: 0,
                    completedLessons: 0,
                    totalLessons: 0
                  };

                  return (
                    <Link
                      to={`/course/${course.courseId?.slug || '#'}`}
                      key={course.courseId._id || index}
                      className="px-4 py-3 block hover:bg-gray-50 cursor-pointer border-t border-gray-100 first:border-t-0"
                    >
                      <div className="flex items-start">
                        <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                          {course.courseId.thumbnail ? (
                            <img 
                              src={course.courseId.thumbnail} 
                              alt={course.courseId?.title || 'Khóa học'} 
                              className="w-full h-full object-cover rounded-full" 
                            />
                          ) : (
                            <span className="text-xs">No Image</span>
                          )}
                        </div>
                        <div className="ml-3 flex-1">
                          <p className="text-sm font-medium text-gray-900">
                            {course.courseId?.title || 'Khóa học không có tiêu đề'}
                          </p>
                          <ProgressBar 
                            progress={progress.progress} 
                            completedLessons={progress.completedLessons}
                            totalLessons={progress.totalLessons}
                          />
                        </div>
                      </div>
                    </Link>
                  );
                })
              )}
            </div>
            
            <div className="p-4 border-t border-gray-100">
              <Link 
                to={routeConfig.myCourses}
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