import { Link } from "react-router-dom";
import AsideComponent from "../../components/AsideComponent/AsideComponent";
import CarouselComponent from "../../components/CarouselComponent/CarouselComponent";

import { Clock, User } from "lucide-react";


const HomePage = () => {

  const courses = [
    {
      id: 1,
      title: "Học Python cơ bản miễn phí",
      image: "https://itech.edu.vn/wp-content/uploads/2022/08/pasted-image-0.png",
      price: 0,
      students: Math.floor(Math.random() * 1000),
      hours: Math.floor(Math.random() * 50) + 1
    },
    {
      id: 2,
      title: "Học Django cơ bản miễn phí",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaoWKfljgIO4Trlo4Aj36O3kk_-rLAeHQw2w&s",
      price: 0,
      students: Math.floor(Math.random() * 1000),
      hours: Math.floor(Math.random() * 50) + 1
    },
    {
      id: 3,
      title: "Học giải thuật Python miễn phí",
      image: "https://s3-sgn09.fptcloud.com/codelearnstorage/files/thumbnails/Python_-_Algorithms_6865856c821b4bbe88a9b9e88dba2208.png",
      price: 0,
      students: Math.floor(Math.random() * 1000),
      hours: Math.floor(Math.random() * 50) + 1
    },
    {
      id:4,
      title: "Học giải thuật Python miễn phí",
      image: "https://s3-sgn09.fptcloud.com/codelearnstorage/files/thumbnails/Python_-_Algorithms_6865856c821b4bbe88a9b9e88dba2208.png",
      price: 0,
      students: Math.floor(Math.random() * 1000),
      hours: Math.floor(Math.random() * 50) + 1
    }
  ];

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
