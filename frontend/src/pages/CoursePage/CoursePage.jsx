import { useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { useDispatch, useSelector } from "react-redux";
import {
  ChevronDown,
  ChevronUp,
  Star,
  MessageSquareText,
  FileText,
  Award,
  Text,
  Check,
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import CourseService from "../../services/CourseService";
import EnrollService from "../../services/EnrollService";
import { addToCart } from "../../redux/slides/cartSlides";
import ToastMessageComponent from "../../components/ToastMessageComponent/ToastMessageComponent";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import { enrollCourseStart, setEnrolledCourses } from "../../redux/slides/enrollSlice";
import {setCourseDetail} from "../../redux/slides/coursesSlices";
import RegisterFormComponent from "../../components/RegisterFormComponent/RegisterFormComponent";
import LoginFormComponent from "../../components/LoginFormComponent/LoginFormComponent";
import Modal from "../../components/ModalComponent/ModalComponent";
import { setUser } from "../../redux/slides/userSlides";
const CoursePage = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [openChapter, setOpenChapter] = useState(null); 
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState("login");
  
  const { slug } = useParams();
  const [toast, setToast] = useState({ show: false, color: "", message: "" });
  const cart = useSelector((state) => state.cart.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const enrolledCourses = useSelector((state) => state.enrollment.enrolledCourses);
  const { courseDetail } = useSelector((state) => state.course);
  const user = useSelector((state) => state.user.user);
 

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await CourseService.getCourses(slug);
        if (response.data) {
          dispatch(setCourseDetail(response.data));
        }
      } catch (error) {
        console.error("Lỗi khi tải khóa học:", error);
      }
    };
    
 
    fetchCourse();
    
  },  [slug, dispatch]);

  const toggleChapter = (index) => {
    setOpenChapter(openChapter === index ? null : index);
  };

  const handleBuyNow = () => {
    dispatch(addToCart(courseDetail));
    navigate("/order/payment");
  };

  const handleAddToCart = () => {
    dispatch(addToCart(courseDetail));
  };

  // Sử dụng useMutation để đăng ký khóa học
  const enrollMutation = useMutation({
    mutationFn: () => EnrollService.enrollCourse(courseDetail?._id),
    onMutate: () => {
      dispatch(enrollCourseStart());
    },
    onSuccess: (response) => {
      if (response?.status !== "success") {
        setToast({ show: true, message: response?.message, color: "red" });
        console.log(response.message)
      } else {
        dispatch(setEnrolledCourses(courseDetail)); // Lưu khóa học vào Redux
        
        setToast({ show: true, message: response.message, color: "green" });

        // Chờ 2 giây rồi chuyển hướng sang trang học
        setTimeout(() => {
          navigate(`/course/${courseDetail.slug}/learn`);
        }, 2000);
      }
    },
    onError: (error) => {
      console.error("Lỗi khi enroll khóa học:", error);
     console.log("Lỗi khi đăng ký khóa học");
    },
  });
  const handleLoginSuccess = (userData) => {
    dispatch(setUser(userData)); 
    setIsOpen(false); // Đóng modal
  
};
  const handleStartLearn = () => {
    if(!user){
      alert("Vui lòng đăng nhập để tiếp tục học");
      setModalType("login") ;
      setIsOpen(true);
    }
    enrollMutation.mutate();
  };

  
  const isEnrolled = courseDetail?._id && enrolledCourses.includes(courseDetail._id);
  const isInCart = cart.some((item) => item._id === courseDetail?._id);

  
  return (
    <div className="w-full mx-auto p-4 bg-white">
      {toast.show && (
        <ToastMessageComponent
          message={toast.message}
          color={toast.color}
          onClose={() => setToast({ ...toast, show: false })}
        />
      )}

      {/* Hiển thị loading khi đang đăng ký khóa học */}
      {enrollMutation.isLoading && <LoadingComponent />}

      <div className="flex flex-col md:flex-row gap-6 py-6">
        <img
          src={courseDetail?.thumbnail}
          alt={courseDetail?.title}
          className="w-full md:w-1/3 rounded-xl shadow-lg"
        />
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900">{courseDetail?.title}</h1>
          <p className="text-gray-600 mt-2">{courseDetail?.description}</p>
          <p className="text-gray-800 font-semibold mt-3">
            Giảng viên: {courseDetail?.lecturerId.name}
          </p>
          <p className="text-xl text-red-500 font-bold mt-2">
            Giá: {courseDetail?.price > 0 ? `${courseDetail?.price} VNĐ` : "Miễn phí"}
          </p>

           {isEnrolled ? (
            <Link to={`/course/${courseDetail.slug}/learn`} className="bg-green-500 px-4 py-2 mt-2 max-w-fit block rounded-lg text-white">
              Tiếp tục học
            </Link>
          ):courseDetail?.price === 0 ? (
            <button
              onClick={handleStartLearn}
              className="rounded-3xl bg-green-500 text-white px-3 py-2 mt-2 hover:bg-green-400"
              disabled={enrollMutation.isLoading} // Vô hiệu hóa khi đang đăng ký
            >
              {enrollMutation.isLoading ? "Đang xử lý..." : "Học ngay"}
            </button>
          ) : isInCart ? (
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
          )}
        </div>
      </div>

      {/* Tabs điều hướng */}
      <Tabs
        selectedIndex={selectedTab}
        onSelect={(index) => {
          setSelectedTab(index);
        }}
        className="mt-8"
      >
        <TabList className="flex border-b">
          {[{ icon: <Text size={20} />, label: "Giới thiệu" },
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
            {courseDetail ? (
              <div className="flex items-center">
                <Check size={20} fontWeight={300} className="mr-2" />
                <p className="mt-2">{courseDetail?.objectives  }</p>
              </div>
            ) : (
              <></>
            )}
          </div>
        </TabPanel>

        {/* Nội dung khóa học */}
        <TabPanel>
          <div className="mt-5 bg-white">
            {courseDetail ? (
              courseDetail.content.map((chapter, index) => (
                <div key={index} className="mb-4">
                  <div
                    className="flex justify-between items-center bg-gray-100 p-3 rounded-lg cursor-pointer"
                    onClick={() => toggleChapter(index)}
                  >
                    <h3 className="text-lg font-semibold text-blue-600">
                      {chapter.title}
                    </h3>
                    {openChapter === index ? (
                      <ChevronUp size={20} />
                    ) : (
                      <ChevronDown size={20} />
                    )}
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
              ))
            ) : (
              <></>
            )}
          </div>
        </TabPanel>

        {/* Đánh giá */}
        <TabPanel>
          <div className="mt-5">
            {courseDetail && courseDetail.reviews.length > 0 ? (
              courseDetail.reviews.map((review, index) => (
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
            {courseDetail && courseDetail.comments.length > 0 ? (
              courseDetail.comments.map((comment, index) => (
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
            {courseDetail && courseDetail.certificate ? (
              <div>
                <p className="text-gray-700">
                  Hoàn thành khóa học để nhận chứng chỉ:
                </p>
                <img
                  src={
                    courseDetail.certificate ||
                    "/src/assets/imgs/certificate-default.jpg"
                  }
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
      <Modal
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              onClose={() => setIsOpen(false)}
             
            >
              {modalType === "login" ? (
                <LoginFormComponent
                  switchToRegister={() => setModalType("register")}
                  setIsOpen={setIsOpen}
                  onLoginSuccess={handleLoginSuccess}
                />
              ) : (
                <RegisterFormComponent
                  switchToLogin={() => setModalType("login")}
                />
              )}
            </Modal>
    </div>
    
  );
};

export default CoursePage;
