import { Link } from "react-router-dom";
import { Clock, User } from "lucide-react";
import { useEffect, useState } from "react";

import AsideComponent from "../../components/AsideComponent/AsideComponent";
import { useDispatch } from "react-redux";
import CarouselComponent from "../../components/CarouselComponent/CarouselComponent";
import CourseService from "../../services/CourseService";
import { Helmet } from "react-helmet-async";
const HomePage = () => {
  // eslint-disable-next-line no-unused-vars
  const [toast, setToast] = useState("");
  const [courses, setCourses] = useState([]);
  const [sortOption, setSortOption] = useState("latest");

  const dispatch = useDispatch();

  useEffect(() => {
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

    fetchCourses();
  }, [dispatch]);

  const sortedCourses = [...courses].sort((a, b) => {
    if (sortOption === "latest") {
      return new Date(b.createdAt) - new Date(a.createdAt); // mới nhất
    } else if (sortOption === "popular") {
      return b.students - a.students; // nhiều người học nhất
    } else if (sortOption === "free") {
      return a.price - b.price; // miễn phí trước
    }
    return 0;
  });

  return (
    <>
      <Helmet>
        <title>HocPython - Trang chủ</title>
        <meta
          name="description"
          content="HocPython là trang web học tập online cho phép bạn học tập và thực hành lập trình miễn phí."
        />
      </Helmet>
      <div className="flex w-full h-full bg-white">
        <AsideComponent />
        <div className="container px-4 py-4 mx-auto basis-11/12">
          <CarouselComponent button="Học thử miễn phí" />
          <div className="grid grid-rows-1 gap-4 mb-8">
            <div className="flex justify-end">
              <select
                className="w-fit border border-gray-500 outline-none p-2 rounded-md"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="latest">Mới nhất</option>
                <option value="popular">Phổ biến</option>
                <option value="free">Miễn phí</option>
              </select>
            </div>
            <div className="category text-2xl font-bold">Khóa học Miễn phí</div>
            <div className="grid xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-2 gap-4 ">
              {sortedCourses.some((course) => course.price === 0) ? (
                sortedCourses.map((course) => {
                  if (course.price === 0) {
                    return (
                      <Link
                        to={`/course/${course.slug}`}
                        key={course._id}
                        className="card bg-gray-100 flex flex-col rounded-lg shadow-md"
                      >
                        <img
                          src={course.thumbnail}
                          alt={`Course ${course.title}`}
                          className="w-full h-32 object-fill rounded-t-lg"
                        />
                        <div className="p-2 flex-1">
                          <h3 className="text-lg min-h-14 line-clamp-2 font-semibold">
                            {course.title}
                          </h3>
                          <p>
                            {" "}
                            {course?.price > 0
                              ? `Giá: ${course?.price} VNĐ`
                              : "Miễn phí"}
                          </p>
                        </div>
                        <div className="flex justify-between items-center p-2 border-t">
                          <span className="text-sm flex gap-1 items-center text-gray-500">
                            <User />
                            {course.students}
                          </span>
                          <span className="text-sm flex gap-1 items-center text-gray-500">
                            <Clock /> {course.hours} giờ
                          </span>
                        </div>
                      </Link>
                    );
                  }
                })
              ) : (
                <p className=" w-full text-center text-black text-base ">
                  Đang tải khóa học ...
                </p>
              )}
            </div>
          </div>
          <div className="grid grid-rows-1 gap-4 mb-8">
            <div className="category text-2xl font-bold">Khóa học Pro</div>

            {sortedCourses.some((course) => course.price > 0) ? (
              <div className="grid grid-flow-row-dense grid-cols-4 gap-4">
                {sortedCourses.map((course) => {
                  if (course.price > 0) {
                    return (
                      <Link
                        to={`/course/${course.slug}`}
                        key={course._id}
                        className="card bg-gray-100 flex flex-col rounded-lg shadow-md"
                      >
                        <img
                          src={course.thumbnail}
                          alt={`Course ${course.title}`}
                          className="w-full h-32 object-cover rounded-t-lg"
                        />
                        <div className="p-2 flex-1">
                          <h3 className="text-lg min-h-14 line-clamp-2 font-semibold">
                            {course.title}
                          </h3>
                          <p>{`Giá: ${course.price} VNĐ`}</p>
                        </div>
                        <div className="flex justify-between items-center p-2 border-t">
                          <span className="text-sm flex gap-1 items-center text-gray-500">
                            <User />
                            {course.students}
                          </span>
                          <span className="text-sm flex gap-1 items-center text-gray-500">
                            <Clock /> {course.hours} giờ
                          </span>
                        </div>
                      </Link>
                    );
                  }
                  return null;
                })}
              </div>
            ) : (
              <p className="w-full border border-blue-400 bg-slate-100 text-center text-black text-base rounded p-4">
                Hiện tại chưa có khóa học nào!
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
