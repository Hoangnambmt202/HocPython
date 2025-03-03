import { Link } from "react-router-dom";
import AsideComponent from "../../components/AsideComponent/AsideComponent";
import CarouselComponent from "../../components/CarouselComponent/CarouselComponent";

import { Clock, User } from "lucide-react";
import { useEffect, useState } from "react";
import CourseService from "../../services/CourseService";


const HomePage = () => {

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
      <div className="container px-4 py-4 mx-auto basis-11/12">
        <CarouselComponent button="Học thử miễn phí" />
        <div className="grid grid-rows-1 gap-4 mb-8" >
          <div className="flex justify-end">
            <select className="w-fit border p-2 rounded-md">
              <option value="latest">Mới nhất</option>
              <option value="popular">Phổ biến</option>
              <option value="free">Miễn phí</option>
            </select>
          </div>
            <div className="category text-2xl font-bold">Khóa học Miễn phí</div>
            <div className="grid grid-cols-4 gap-4 ">
            {courses.map((course, index) => (
                <Link to={`/course`} key={index} className="card bg-gray-100 flex flex-col rounded-lg shadow-md">
                  <img src={course.image} alt={`Course ${index + 1}`} className="w-full h-32 object-cover rounded-t-lg" />
                  <div className="p-2 flex-1">
                    <h3 className="text-lg min-h-14 line-clamp-2 font-semibold">{course.title}</h3>
                    <p className="text-gray-600">Giá: {course.price}</p>
                  </div>
                  <div className="flex justify-between items-center p-2 border-t">
                    <span className="text-sm flex gap-1 items-center text-gray-500"><User />{course.students}</span>
                    <span className="text-sm flex gap-1 items-center text-gray-500"><Clock/> {course.hours} giờ</span>
                  </div>
                </Link>
             
            ))}
            </div>

        </div>
        <div className="grid grid-rows-1 gap-4 mb-8" >
            <div className="category text-2xl font-bold">Khóa học Miễn phí</div>
            <div className="grid grid-cols-4 gap-4">
            {courses.map((course, index) => (
                <Link to={`/learning`} key={index} className="card bg-gray-100 flex flex-col rounded-lg shadow-md">
                  <img src={course.image} alt={`Course ${index + 1}`} className="w-full h-32 object-cover rounded-t-lg" />
                  <div className="p-2 flex-1">
                    <h3 className="text-lg min-h-14 line-clamp-2 font-semibold">{course.title}</h3>
                    <p className="text-gray-600">Giá: {course.price}</p>
                  </div>
                  <div className="flex justify-between items-center p-2 border-t">
                    <span className="text-sm flex gap-1 items-center  text-gray-500"><User /> {course.students}</span>
                    <span className="text-sm flex gap-1 items-center text-gray-500"> <Clock/> {course.hours} giờ</span>
                  </div>
                </Link>
             
            ))}
            </div>

        </div>
      </div>
    </div>
    
  );
};

export default HomePage;
