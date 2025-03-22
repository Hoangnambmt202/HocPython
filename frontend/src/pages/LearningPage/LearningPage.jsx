import { useSelector } from "react-redux";
import { useParams } from "react-router-dom"; // Lấy slug từ URL
import YouTubePlayer from "../../components/YoutubePlayer/YoutubePlayer";
import { ChevronDown, ChevronLeft, ChevronRight, Menu, MoveRight } from "lucide-react";
import { useState } from "react";

const LearningPage = () => {
  const { slug } = useParams(); // Lấy slug từ URL
    const enrolledCourses = useSelector((state) => state.enrollment.enrolledCourses || []);

  // Tìm khóa học có slug khớp với URL
  const course = enrolledCourses.find((c) => c.slug === slug) || {};

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [openChapters, setOpenChapters] = useState({});

  const toggleChapter = (chapterId) => {
    setOpenChapters((prev) => ({
      ...prev,
      [chapterId]: !prev[chapterId],
    }));
  };

  return (
    <>
      <div className={`flex ${isSidebarOpen ? "w-9/12" : "w-full"} bg-white flex-col`}>
      {
        course.content.map((chapter)=> {

          chapter.lessons.map((lesson)=> {
            return (<>
            <YouTubePlayer url={lesson.videoUrl} />
            </>)

          })
        })
      }
        
        {course.content ? (
          course.content.map((chapter) => (
            <div className="bg-white p-4" key={chapter._id}>
              {chapter.lessons.map((lesson) => (
                <div key={lesson._id} className="flex bg-white items-center gap-2">
                  <h3 className="font-bold text-xl">{lesson.title}</h3> - {" "}
                  {lesson.duration} phút
                </div>
              ))}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">Không tìm thấy khóa học.</p>
        )}
      </div>

      {/* Sidebar */}
      <div className={`flex ${isSidebarOpen ? "w-3/12" : "hidden"}`}>
        {isSidebarOpen && (
          <div className="py-4 w-full h-full bg-white shadow-md">
            <h2 className="text-xl font-bold text-center mb-4">Nội dung khóa học</h2>
            <ul className="list flex flex-col gap-2 px-4">
              {course.content ? (
                course.content.map((chapter) => (
                  <li key={chapter._id} className="w-full">
                    <div
                      onClick={() => toggleChapter(chapter._id)}
                      className="flex justify-between items-center bg-gray-100 px-3 py-2 cursor-pointer rounded-lg hover:bg-gray-200"
                    >
                      <span className="font-bold">{chapter.title}</span>
                      {openChapters[chapter._id] ? <ChevronDown /> : <ChevronRight />}
                    </div>

                    {openChapters[chapter._id] && (
                      <ul className="ml-4 mt-2">
                        {chapter.lessons.map((lesson) => (
                          <li
                            key={lesson._id}
                            className="flex justify-between items-center hover:bg-gray-100 p-2 cursor-pointer rounded-md"
                          >
                            <span>{lesson.title}</span>
                            <span className="text-sm text-gray-500">{lesson.duration} phút</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))
              ) : (
                <p className="text-center text-gray-500">Không tìm thấy nội dung khóa học.</p>
              )}
            </ul>
          </div>
        )}
      </div>

      {/* Footer Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-100">
        <div className="flex py-2 gap-4 item-center justify-center">
          <button className="flex gap-2 items-center px-4 py-2 bg-white text-blue-500 rounded-full border border-black">
            <ChevronLeft size={16} />
            <span className="text-sm">Bài trước</span>
          </button>
          <button className="flex gap-2 items-center px-4 py-2 rounded-full border bg-blue-500 text-white border-black">
            <span className="text-sm">Bài tiếp theo</span>
            <ChevronRight size={16} />
          </button>
        </div>
        <div className="absolute flex gap-2 right-0 bottom-3 items-center">
          {course.content ? course.content.map((chapter) => chapter.title) : ""}
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-1 rounded-full hover:cursor-pointer border-black border bg-white">
            {isSidebarOpen ? <MoveRight strokeWidth={3} size={16} /> : <Menu strokeWidth={3} size={16} />}
          </button>
        </div>
      </div>
    </>
  );
};

export default LearningPage;
