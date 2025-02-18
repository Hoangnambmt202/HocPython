import { useState } from "react";

import BaseDropdown from "../BaseDropdown/BaseDropdown";
import { Book, GraduationCap, School, History } from "lucide-react";
const MyCoursesMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const courses = [
    {
      id: 1,
      title: "Python cơ bản",
      type: "Đang học",
      icon: Book,
      progress: 65,
      totalLessons: 24,
      completedLessons: 16
    },
    {
      id: 2,
      title: "Machine Learning",
      type: "Đang học",
      icon: School,
      progress: 30,
      totalLessons: 32,
      completedLessons: 10
    },
    {
      id: 3,
      title: "Data Science",
      type: "Hoàn thành",
      icon: GraduationCap,
      progress: 100,
      totalLessons: 28,
      completedLessons: 28
    },
    {
      id: 4,
      title: "Web Development",
      type: "Gần đây",
      icon: History,
      progress: 15,
      totalLessons: 40,
      completedLessons: 6
    }
  ];
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
          {courses.map((course) => {
            const IconComponent = course.icon;
            return (
              <div
                key={course.id}
                className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-t border-gray-100 first:border-t-0"
              >
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                    <IconComponent size={20} className="text-orange-500" />
                  </div>
                  <div className="ml-3 flex-1">
                    <p className="text-sm font-medium text-gray-900">{course.title}</p>
                    <p className="text-xs text-gray-500 mb-2">{course.type}</p>
                    
                    {/* Progress Bar */}
                    <div className="w-full">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-gray-500">
                          {course.completedLessons}/{course.totalLessons} bài học
                        </span>
                        <span className="text-xs font-medium text-orange-500">
                          {course.progress}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div
                          className="bg-orange-500 h-1.5 rounded-full transition-all duration-300"
                          style={{ width: `${course.progress}%` }}
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
          <button
            className="w-full px-4 py-2 text-sm font-medium text-orange-500 hover:bg-orange-50 rounded-lg transition-colors"
          >
            Xem tất cả khóa học
          </button>
        </div>
      </div>
    </div>
      </BaseDropdown>
    </div>
  );
}
export default MyCoursesMenu