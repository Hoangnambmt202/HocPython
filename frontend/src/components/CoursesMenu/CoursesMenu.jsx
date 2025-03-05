import { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import BaseDropdown from "../BaseDropdown/BaseDropdown";
import CourseService from "../../services/CourseService";
const CoursesMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [toast, setToast] = useState(""); 
    const [courses, setCourses] = useState([]); 
    useEffect(()=>{
      const fetchCourses = async () => {
        try {
          const response = await CourseService.getAllCourses();
          if (response?.data) {
            setCourses(response?.data);
          }
  
        } catch (error) {
          console.error("Error fetching courses:", error);
          setToast("Failed to load courses");
        }
      };
      fetchCourses()
    },[])
    
  return (
    <div className="relative">
      <button className="relative px-4 py-2 text-sm font-semibold text-black hover:text-blue-500" onClick={() => setIsOpen(true)}>
        Khóa học của tôi
      </button>

      <BaseDropdown isOpen={isOpen} setIsOpen={setIsOpen}>
      <div
      className="fixed inset-0 flex justify-end"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="absolute right-[180px] top-16 bg-white border border-gray-200 rounded-lg shadow-lg w-80"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="px-5 py-4">
          <h3 className="font-semibold text-gray-900">Khóa học của tôi</h3>
        </header>
        
        <div className="max-h-[400px] overflow-y-auto">
          {courses?.map((course) => {
           
            return (
              <div
                key={course._id}
                className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-t border-gray-100 first:border-t-0"
              >
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                    
                    <img src={course?.thumbnail} />
                  </div>
                  <div className="ml-3 flex-1">
                    <p className="text-sm font-medium text-gray-900">{course?.title}</p>
                    <p className="text-xs text-gray-500 mb-2"></p>
                    
                    {/* Progress Bar */}
                    <div className="w-full">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-gray-500">
                           bài học
                        </span>
                        <span className="text-xs font-medium text-orange-500">
                        %
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div
                          className="bg-orange-500 h-1.5 rounded-full transition-all duration-300"
                          style={{ width: `%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
}
export default CoursesMenu