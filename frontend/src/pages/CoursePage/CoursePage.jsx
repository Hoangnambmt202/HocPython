import { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { ChevronDown, ChevronUp, Star, MessageSquareText, FileText, Award, Text, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
const CoursePage = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [openChapter, setOpenChapter] = useState(null); // State để theo dõi chương nào đang mở
  const course = {
    title: "Lập trình Python cơ bản",
    description: "Khóa học cung cấp trọn bộ kiến thức cơ bản của lập trình Python, học viên có thể tạo ra một ứng dụng hoàn chỉnh với Python sau khi hoàn thành khóa học.",
    introduction: [
        "Khóa học cung cấp trọn bộ kiến thức cơ bản của lập trình Python, học viên có thể tạo ra một ứng dụng hoàn chỉnh với Python sau khi hoàn thành khóa học.",
        "Tìm hiểu cơ bản về ngôn ngữ lập trình Python (Từ định nghĩa đến các nội dung quan trọng như kiểu dữ liệu, biến, chuỗi, cấu trúc điều khiển, cấu trúc vòng lặp, hàm trong Python,...)",
        "Giúp các bạn nhỏ phát huy trí tưởng tượng mới mẻ, sáng tạo trong quá trình vừa học vừa thực hành.",
        "Rèn luyện khả năng kiên trì, nhẫn nại và kĩ năng giải quyết vấn đề cho học viên."
    ],
    instructor: { name: "Nguyễn Văn A" },
    price: 499000,
    thumbnail: "src/assets/imgs/pexels-hikaique-307847.jpg",
    category: "Lập trình",
    isPublished: true,
    content: [
      { title: "Giới thiệu", lessons: [{ title: "Bài 1: React là gì?", duration: 10 }] },
      { title: "Cơ bản", lessons: [{ title: "Bài 2: JSX và Component", duration: 15 }] },
    ],
    numberStudent: 150,
    reviews: [{ user: { name: "Trần B" }, rating: 5, comment: "Khóa học rất hay!" }],
    comments: [{ user: { name: "Lê C" }, content: "Bài giảng dễ hiểu!" }],
    certificate: "/src/assets/imgs/certificate-default.jpg",
  };
  const toggleChapter = (index) => {
    setOpenChapter(openChapter === index ? null : index);
  };
  const navigate = useNavigate();
  return (
    <div className="w-full mx-auto p-4 bg-white">
      {/* Thông tin khóa học */}
      <div className="flex flex-col md:flex-row gap-6 py-6">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full md:w-1/3 rounded-xl shadow-lg"
        />
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900">{course.title}</h1>
          <p className="text-gray-600 mt-2">{course.description}</p>
          <p className="text-gray-800 font-semibold mt-3">
            Giảng viên: {course.instructor.name}
          </p>
          <p className="text-xl text-red-500 font-bold mt-2">
            Giá: {course.price > 0 ? `${course.price} VNĐ` : "Miễn phí"}
          </p>
          <button onClick={()=> {navigate("/order/checkout")}} className="rounded-3xl bg-blue-500 text-white px-3 py-2 mt-2 hover:bg-blue-400 ">Mua ngay</button>
        </div>
      </div>

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
                    course.introduction.map((text)=> {
                        return (
                            <>
                            <div className="flex items-center">
                                <Check size={20} fontWeight={300} className="mr-2"/>
                                <p className="mt-2">
                                    {text}
                                </p>

                            </div>
                            </>
                            
                        )
                    })
                   }

                
            </div>
        </TabPanel>

        {/* Nội dung khóa học */}
        <TabPanel>
          <div className="mt-5 bg-white">
            {course.content.map((chapter, index) => (
              <div key={index} className="mb-4">
                <div
                  className="flex justify-between items-center bg-gray-100 p-3 rounded-lg cursor-pointer"
                  onClick={() => toggleChapter(index)}
                >
                  <h3 className="text-lg font-semibold text-blue-600">
                    Chương {index + 1}: {chapter.title}
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
            ))}
          </div>
        </TabPanel>

        {/* Đánh giá */}
        <TabPanel>
          <div className="mt-5">
            {course.reviews.length > 0 ? (
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
            {course.comments.length > 0 ? (
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
            {course.certificate ? (
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
