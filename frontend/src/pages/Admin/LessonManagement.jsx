import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, BookOpen, Video, Code } from "lucide-react";
import AddForm from "../../components/AddFormComponent/AddForm";
import LessonService from "../../services/LessonService";
import ChapterService from "../../services/ChapterService";
import { Helmet } from "react-helmet-async";
import CodeEditor from "../../components/CodeEditorComponent/CodeEditorComponent";
import ToastMessageComponent from "../../components/ToastMessageComponent/ToastMessageComponent";
import CKEditorComponent from "../../components/CKEditor/CKEditor";
import YouTubePlayer from "../../components/YoutubePlayer/YoutubePlayer";

const LessonManagement = () => {
  const [chapters, setChapters] = useState([]);
  const [toast, setToast] = useState({ show: false, color: "", message: "" });
  const [lessons, setLessons] = useState([]);
  const [editLesson, setEditLesson] = useState(null);
  const [showForm, setShowForm] = useState(false);


// Form state với đầy đủ trường dữ liệu
const [formData, setFormData] = useState({
  title: "",
  type: "theory",
  order: 0,
  content: "",
  videoUrl: "",
  h5pUrl: "",
  h5pFile: null,
  useH5p: false,
  chapterId: "",
  practice: { initialCode: "", testCases: [] },
});

  // Lấy danh sách bài học theo chapter
  useEffect(() => {
    const fetchChapters = async () => {
      try {
        const res = await ChapterService.getAllChapters();
        setChapters(res.data);
        if (res.data.length > 0) {
          setFormData((prev) => ({ ...prev, chapterId: res.data[0]._id }));
        }
      } catch (error) {
        console.log(error);
      }
    };
    const fetchAllLessons = async () => {
      try {
        const res = await LessonService.getAllLessons();
        setLessons(res.data);
      } catch (error) {
        setToast({
          show: true,
          color: "red",
          message: error.message || "Có lỗi xảy ra",
        });
      }
    };
    fetchChapters();
    fetchAllLessons();
  }, []);


  const handleSubmit = async () => {
    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("type", formData.type);
      data.append("order", formData.order);
      data.append("content", formData.content);
      data.append("videoUrl", formData.videoUrl);
      data.append("chapterId", formData.chapterId);
      data.append("h5pUrl", formData.h5pUrl)
      data.append("h5pFile", formData.h5pFile);
      data.append("practice", JSON.stringify(formData.practice));

      let response;
      if (editLesson) {
        response = await LessonService.updateLesson(editLesson._id, data);
      } else {
        response = await LessonService.createLesson(formData.chapterId, data);
      }

      setToast({ show: true, color: "green", message: response.message });
      const res = await LessonService.getAllLessons();
      setLessons(res.data);
      resetForm();
    } catch (error) {
      setToast({
        show: true,
        color: "red",
        message: error.message || "Có lỗi xảy ra",
      });
    }
  };

  const handleDelete = async (lessonId) => {
    const response = await LessonService.deleteLesson(lessonId);
    setLessons(lessons.filter((lesson) => lesson._id !== lessonId));
    setToast({ show: true, color: "green", message: response.message });
  };

  // Reset form
const resetForm = () => {
  setFormData({
    title: "",
    type: "theory",
    order: lessons.length + 1,
    content: "",
    videoUrl: "",
    h5pUrl: "",
    h5pFile: null,
    useH5p: false,
    chapterId: chapters.length > 0 ? chapters[0]._id : "",
    practice: { initialCode: "", testCases: [] },
  });
  setEditLesson(null);
  setShowForm(false);
};

  /// Xử lý edit bài học
const handleEdit = (lesson) => {
  setFormData({
    title: lesson.title,
    type: lesson.type,
    order: lesson.order,
    content: lesson.content,
    videoUrl: lesson.videoUrl || "",
    h5pUrl: lesson.h5pUrl || "",
    useH5p: !!lesson.h5pUrl, // Đặt useH5p thành true nếu có h5pUrl
    h5pFile: null, // Không thể lấy lại file đã tải lên
    chapterId: lesson.chapterId || (chapters.length > 0 ? chapters[0]._id : ""),
    practice: lesson.practice || { initialCode: "", testCases: [] },
  });
  setEditLesson(lesson);
  setShowForm(true);
};

 // Render nội dung theo loại bài học
const renderContent = (lesson) => {
  switch (lesson.type) {
    case "video":
      if (lesson.h5pUrl) {
        return (
          <div>
            <div className="mb-2 text-sm text-gray-600">H5P Interactive Video</div>
            <iframe 
              src={lesson.h5pUrl} 
              width="100%" 
              height="400" 
              frameBorder="0" 
              allowFullScreen
              title="Interactive Content"
            ></iframe>
          </div>
        );
      } else {
        return (
          <>
            <div className="mb-2 text-sm text-gray-600">YouTube Video</div>
            <YouTubePlayer url={lesson.videoUrl} />
          </>
        );
      }

    case "practice":
      return (
        <CodeEditor value={lesson.practice?.initialCode} readOnly={true} />
      );
    case "theory":
      return <p>{lesson.content}</p>;
    default:
      return null;
  }
};

  // Get lesson type icon
  const getLessonTypeIcon = (type) => {
    switch (type) {
      case "video":
        return <Video className="text-blue-500" size={18} />;
      case "practice":
        return <Code className="text-green-500" size={18} />;
      case "theory":
        return <BookOpen className="text-amber-500" size={18} />;
      default:
        return null;
    }
  };

  return (
    <>
      <Helmet>
        <title>Admin | Quản lý bài giảng</title>
      </Helmet>

      <div className="container mx-auto p-6">
        {toast.show && (
          <ToastMessageComponent
            message={toast.message}
            color={toast.color}
            onClose={() => setToast({ ...toast, show: false })}
          />
        )}

        {/* Header và nút thêm */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Quản lý Bài giảng
          </h1>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg flex items-center transition duration-200"
          >
            <Plus className="mr-2" size={18} /> Thêm mới
          </button>
        </div>

        {/* Form thêm/chỉnh sửa */}
        {showForm && (
          <AddForm
            title={editLesson ? "Chỉnh sửa bài học" : "Thêm bài học mới"}
            onClose={resetForm}
            onSubmit={handleSubmit}
          >
            {/* Tiêu đề bài học */}

            <div className="grid grid-cols-2 gap-2 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tiêu đề bài học
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                  placeholder="Nhập tiêu đề bài học"
                />
              </div>
              <div className="">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Chọn chương
                </label>
                <div className="relative">
                  <select
                    value={formData.chapterId}
                    onChange={(e) =>
                      setFormData({ ...formData, chapterId: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg appearance-none bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                  >
                    {chapters.map((chapter) => (
                      <option key={chapter._id} value={chapter._id}>
                        {chapter.title}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Grid layout cho loại bài học và thứ tự */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
              {/* Loại bài học */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Loại bài học
                </label>
                <div className="relative">
                  <select
                    value={formData.type}
                    onChange={(e) =>
                      setFormData({ ...formData, type: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg appearance-none bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                  >
                    <option value="theory">Lý thuyết</option>
                    <option value="video">Video</option>
                    <option value="practice">Thực hành</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Thứ tự */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Thứ tự
                </label>
                <input
                  type="number"
                  value={formData.order}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      order: parseInt(e.target.value) || 0,
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                  min="0"
                />
              </div>
            </div>

            {/* Chọn chương - chung cho tất cả loại bài học */}

            {/* Các trường dynamic theo loại bài học */}
            {formData.type === "video" && (
  <div className="mb-6">
    <label className="block text-sm font-medium text-gray-700 mb-3">
      Chọn loại nội dung video
    </label>
    <div className="flex items-center space-x-6 mb-4">
      <div className="flex items-center">
        <input 
          type="radio" 
          id="videoUrl" 
          name="videoType" 
          checked={!formData.useH5p}
          onChange={() => setFormData({ ...formData, useH5p: false })} 
          className="w-4 h-4 text-blue-600 focus:ring-blue-500" 
        />
        <label htmlFor="videoUrl" className="ml-2 text-sm font-medium text-gray-700">
          Video URL (YouTube)
        </label>
      </div>
      <div className="flex items-center">
        <input 
          type="radio" 
          id="h5pUrl" 
          name="videoType" 
          checked={formData.useH5p}
          onChange={() => setFormData({ ...formData, useH5p: true })} 
          className="w-4 h-4 text-blue-600 focus:ring-blue-500" 
        />
        <label htmlFor="h5pUrl" className="ml-2 text-sm font-medium text-gray-700">
          H5P Interactive Video
        </label>
      </div>
    </div>
    
    {!formData.useH5p ? (
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          URL Video (YouTube)
        </label>
        <input
          value={formData.videoUrl}
          onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
          placeholder="Nhập đường dẫn video YouTube (URL)"
        />
      </div>
    ) : (
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Link Embed Interactive Video (H5P)
        </label>
        <input
          value={formData.h5pUrl}
          onChange={(e) => setFormData({ ...formData, h5pUrl: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
          placeholder="Nhập link embed từ Lumi hoặc H5P"
        />
        <div className="mt-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tải lên file H5P (tùy chọn)
          </label>
          <input
            type="file"
            accept=".h5p"
            onChange={(e) => setFormData({ ...formData, h5pFile: e.target.files[0] })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
          />
        </div>
      </div>
    )}
  </div>
)}

            {formData.type === "practice" && (
              <>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Code mẫu
                  </label>
                  <div className="border border-gray-300 rounded-lg overflow-hidden">
                    <CodeEditor
                      value={formData.practice?.initialCode}
                      onChange={(value) =>
                        setFormData({
                          ...formData,
                          practice: {
                            ...formData.practice,
                            initialCode: value,
                          },
                        })
                      }
                    />
                  </div>
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Test Cases
                  </label>
                  <div className="space-y-4">
                    {formData.practice.testCases.map((testCase, index) => (
                      <div key={index} className="flex gap-4">
                        <input
                          value={testCase.expectedOutput}
                          onChange={(e) => {
                            const newTestCases = [
                              ...formData.practice.testCases,
                            ];
                            newTestCases[index].expectedOutput = e.target.value;
                            setFormData({
                              ...formData,
                              practice: {
                                ...formData.practice,
                                testCases: newTestCases,
                              },
                            });
                          }}
                          placeholder="Expected Output"
                          className="flex-1 p-2 border rounded"
                        />
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => {
                        setFormData({
                          ...formData,
                          practice: {
                            ...formData.practice,
                            testCases: [
                              ...formData.practice.testCases,
                              { input: "", expectedOutput: "" },
                            ],
                          },
                        });
                      }}
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                      Thêm Test Case
                    </button>
                  </div>
                </div>
              </>
            )}

            {formData.type === "theory" && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nội dung lý thuyết
                </label>

                <CKEditorComponent
                  content={formData.content}
                  setContent={(newContent) =>
                    setFormData({ ...formData, content: newContent })
                  }
                />
              </div>
            )}
          </AddForm>
        )}

        {/* Danh sách bài học */}
        <div className="space-y-4 mt-8">
          {lessons?.length === 0 ? (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
              <p className="text-gray-500">
                Chưa có bài học nào. Hãy thêm bài học mới.
              </p>
            </div>
          ) : (
            lessons.map((lesson) => (
              <div
                key={lesson._id}
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition duration-200"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-start gap-3">
                    <div className="mt-1">{getLessonTypeIcon(lesson.type)}</div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">
                        {lesson.title} - {lesson.chapterId?.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm text-gray-500">
                          Thứ tự: {lesson.order}
                        </span>
                        <span className="text-xs text-gray-400">•</span>
                        <span className="text-sm text-gray-500 capitalize">
                          {lesson.type === "theory" && "Lý thuyết"}
                          {lesson.type === "video" && "Video"}
                          {lesson.type === "practice" && "Thực hành"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(lesson)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition duration-200"
                      title="Chỉnh sửa"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(lesson._id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-full transition duration-200"
                      title="Xóa"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                {/* Preview nội dung bài học */}
                <div className="mt-6 border-t border-gray-100 pt-4">
                  <div className="max-h-72 overflow-hidden relative">
                    {renderContent(lesson)}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default LessonManagement;
