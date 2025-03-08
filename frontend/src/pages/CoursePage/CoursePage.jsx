import {  useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { useDispatch, useSelector } from "react-redux";
import { ChevronDown, ChevronUp, Star, MessageSquareText, FileText, Award, Text, Check } from "lucide-react";
import { useNavigate , useParams } from "react-router-dom";

import CourseService from "../../services/CourseService";
import { addToCart, enrollCourse } from "../../redux/slides/cartSlides";
const CoursePage = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [openChapter, setOpenChapter] = useState(null); // State để theo dõi chương nào đang mở
  const [course, setCourse] = useState(null);
  const { slug } = useParams(); // Lấy slug từ URL
  const cart = useSelector((state) => state.cart.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  useEffect(()=>{
      const fetchCourse = async () => {
        try {
           
          const response = await CourseService.getCourses(slug);
          if (response.data) {
            setCourse(response.data);
          }
        } catch (error) {
          console.error("Lỗi khi tải khóa học:", error);
        }
      };
      fetchCourse()
    },[slug])
  const toggleChapter = (index) => {
    setOpenChapter(openChapter === index ? null : index);
  };
  // const navigate = useNavigate();
  const handleBuyNow = () => {
    // dispatch(addToCart(course));
    // console.log(course)
    // navigate("/order/payment");
  }
  const handleAddToCart = () => {
    dispatch(addToCart(course));  
  }

  const handleStartLearn = () => {
    dispatch(enrollCourse(course));  
    localStorage.setItem("enrolledCourses", JSON.stringify(course));
    navigate(`/course/${course.slug}/learn`);

  }
  const isInCart = cart.some((item) => item._id === course?._id);
  return (
    
    
    <div className="w-full mx-auto p-4 bg-white">
      {/* Thông tin khóa học */}
      {<div className="flex flex-col md:flex-row gap-6 py-6">
        <img
          src={course?.thumbnail}
          alt={course?.title}
          className="w-full md:w-1/3 rounded-xl shadow-lg"
        />
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900">{course?.title}</h1>
          <p className="text-gray-600 mt-2">{course?.description}</p>
          <p className="text-gray-800 font-semibold mt-3">
            Giảng viên: {course?.lecturerId.name}
          </p>
          <p className="text-xl text-red-500 font-bold mt-2">
  Giá: {course?.price > 0 ? `${course?.price} VNĐ` : "Miễn phí"}
</p>

{course?.price === 0 ? (
  <button 
    onClick={handleStartLearn}
    className="rounded-3xl bg-green-500 text-white px-3 py-2 mt-2 hover:bg-green-400"
  >
    Học ngay
  </button>
) : (
  isInCart ? (
    <button className="bg-gray-400 px-4 py-2 text-white" disabled>
      Đã thêm vào giỏ hàng
    </button>
  ) : (
    <div className="flex gap-2">
      <button 
        onClick={handleBuyNow} 
        className="rounded-3xl bg-blue-500 text-white px-3 py-2 mt-2 hover:bg-blue-400"
      >
        Mua ngay
      </button>
      <button 
        onClick={handleAddToCart} 
        className="rounded-3xl bg-blue-500 text-white px-3 py-2 mt-2 hover:bg-blue-400"
      >
        Thêm vào giỏ hàng
      </button>
    </div>
  )
)}

         
        </div>
      </div>
     
}
      {/* Tabs điều hướng */}
      <Tabs selectedIndex={selectedTab} onSelect={(index) => {setSelectedTab(index);
      } } className="mt-8">
        <TabList className="flex border-b">
          {[
            { icon: <Text size={20} />, label: "Giới thiệu" },
            { icon: <FileText size={20} />, label: "Nội dung" },
            { icon: <Star size={20} />, label: "Đánh giá" },
            { icon: <MessageSquareText size={20} />, label: "Bình luận" },
            { icon: <Award size={20} />, label: "Chứng chỉ" },
          ].map((tab, index) => (
            <Tab
              key={index}
              className={`p-3 cursor-pointer font-semibold text-gray-700 flex items-center gap-2 transition-all
                ${selectedTab === index ? "border-b-2 border-blue-500 focus:text-blue-600" : "focus:text-blue-500"}
              `}
            >
              {tab.icon} {tab.label}
            </Tab>
          ))}
        </TabList>
        <TabPanel>
            <div className="mt-5 bg-white">
                <h2 className="text-xl font-semibold">Bạn sẽ học được gì ?</h2>
                   {
                    course ? (
                          <div className="flex items-center">
                              <Check size={20} fontWeight={300} className="mr-2"/>
                              <p className="mt-2">
                                  {course.description}
                              </p>
                          </div>
                  ): (<></>) 
                   }

                
            </div>
        </TabPanel>

        {/* Nội dung khóa học */}
        <TabPanel>
          <div className="mt-5 bg-white">
            {
              course ? (course.content.map((chapter, index) => (
                <div key={index} className="mb-4">
                  <div
                    className="flex justify-between items-center bg-gray-100 p-3 rounded-lg cursor-pointer"
                    onClick={() => toggleChapter(index)}
                  >
                    <h3 className="text-lg font-semibold text-blue-600">
                       {chapter.title}
                    </h3>
                    {openChapter === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>
                  {openChapter === index && (
                    <ul className="ml-4 mt-2 list-disc text-gray-700 bg-white shadow-md rounded-lg p-3">
                      {chapter.lessons.map((lesson, i) => (
                        <li key={i} className="mt-1">
                          {lesson.title} - {lesson.duration} phút
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))) : (<></>)
            }
          </div>
        </TabPanel>

        {/* Đánh giá */}
        <TabPanel>
          <div className="mt-5">
            {course && course.reviews.length > 0 ? (
              course.reviews.map((review, index) => (
                <div key={index} className="border-b py-3">
                  <p className="font-semibold">{review.user.name}</p>
                  <p className="text-yellow-500">⭐ {review.rating}/5</p>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">Chưa có đánh giá nào.</p>
            )}
          </div>
        </TabPanel>

        {/* Bình luận */}
        <TabPanel>
          <div className="mt-5">
            {course && course.comments.length > 0 ? (
              course.comments.map((comment, index) => (
                <div key={index} className="border-b py-3">
                  <p className="font-semibold">{comment.user.name}</p>
                  <p className="text-gray-700">{comment.content}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">Chưa có bình luận nào.</p>
            )}
          </div>
        </TabPanel>

        {/* Chứng chỉ */}
        <TabPanel>
          <div className="mt-5">
            {course && course.certificate ? (
              <div>
                <p className="text-gray-700">Hoàn thành khóa học để nhận chứng chỉ:</p>
                <img
                  src={course.certificate || "/src/assets/imgs/certificate-default.jpg"}
                  alt="Chứng chỉ"
                  className="w-1/2 mt-4 rounded-lg shadow-md"
                />
              </div>
            ) : (
              <p className="text-gray-500">Chưa có chứng chỉ.</p>
            )}
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default CoursePage;
