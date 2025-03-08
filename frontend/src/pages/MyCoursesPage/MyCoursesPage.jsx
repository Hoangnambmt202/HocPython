
import { Link } from "react-router-dom";
import AsideComponent from "../../components/AsideComponent/AsideComponent";
import { useEffect, useState } from "react";
import CourseService from "../../services/CourseService";

const MyCoursesPage = () => {
    // eslint-disable-next-line no-unused-vars
    const [toast, setToast] = useState(""); 
      const [courses, setCourses] = useState([]); 
      useEffect(()=>{
        const fetchCourses = async () => {
          try {
            const response = await CourseService.getAllCourses();
            if (response.data) {
              setCourses(response.data);
            }
       
          } catch (error) {
            console.error("Error fetching courses:", error);
            setToast("Failed to load courses");
          }
        };
        fetchCourses()

      },[])
      
  return (
    <div className="flex w-full h-full bg-white" >
      
      <AsideComponent />
      <div className="flex-1 px-4 py-8 mx-auto ">
      
        <div className="grid grid-rows-1 gap-4 mb-8" >
          <header className="flex justify-between items-center mb-8">
            <div>
                <h3  className="text-2xl font-bold mb-2">Khóa học của tôi</h3>
                <p>Bạn đã hoàn thành 3/8 khóa học.</p>
            </div>
            <div>
                <select className="w-fit border p-2 rounded-md">
                <option value="latest">Mới nhất</option>
                <option value="popular">Phổ biến</option>
                <option value="free">Miễn phí</option>
                </select>

            </div>
          </header>
       
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 ">
            {
                <Link to={`/course`} key={courses.slug} className="card bg-gray-100 rounded-lg shadow-md">
                  <img src="" alt={`Course`} className="w-full h-32 object-cover rounded-t-lg" />
                  <div className="p-2">
                    <h3 className="text-lg font-semibold">{courses.title}</h3>
                    
                  </div>
                  <div className="flex justify-between items-center p-2 border-t">
                  <div className="w-full">
                        <div className="text-gray-500 text-base">Học cách đây 2 tháng trước</div>
                    {/* Progress bar */}
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-gray-500">
                          {/* {courses.completedLessons}/{courses.totalLessons} bài học */}
                        </span>
                        <span className="text-xs font-medium text-orange-500">
                          {/* {courses.progress}% */}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div
                          className="bg-orange-500 h-1.5 rounded-full transition-all duration-300"
                          // style={{ width: `${course.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </Link>
             
            }
            </div>
            
        </div>
      </div>
    </div>
  )
}

export default MyCoursesPage