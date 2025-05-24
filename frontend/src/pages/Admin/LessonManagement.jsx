import { useState, useEffect } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  BookOpen,
  Video,
  Code,
  Search,
  Filter,
  Eye,
  Clock,
  Users,
} from "lucide-react";
import AddForm from "../../components/AddFormComponent/AddForm";
import LessonService from "../../services/LessonService";
import ChapterService from "../../services/ChapterService";
import { Helmet } from "react-helmet-async";
import CodeEditor from "../../components/CodeEditorComponent/CodeEditorComponent";
import ToastMessageComponent from "../../components/ToastMessageComponent/ToastMessageComponent";
import CKEditorComponent from "../../components/CKEditor/CKEditor";
import YouTubePlayer from "../../components/YoutubePlayer/YoutubePlayer";
import ButtonOnTop from "../../components/ButtonOnTop/ButtonOnTop";

const LessonManagement = () => {
  const [chapters, setChapters] = useState([]);
  const [toast, setToast] = useState({ show: false, color: "", message: "" });
  const [lessons, setLessons] = useState([]);
  const [filteredLessons, setFilteredLessons] = useState([]);
  const [editLesson, setEditLesson] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterChapter, setFilterChapter] = useState("all");
  const [viewMode, setViewMode] = useState("grid"); // grid or list

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
        setFilteredLessons(res.data);
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

  // Filter lessons based on search and filters
  useEffect(() => {
    let filtered = lessons;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (lesson) =>
          lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          lesson.chapterId?.title
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
      );
    }

    // Type filter
    if (filterType !== "all") {
      filtered = filtered.filter((lesson) => lesson.type === filterType);
    }

    // Chapter filter
    if (filterChapter !== "all") {
      filtered = filtered.filter(
        (lesson) => lesson.chapterId?._id === filterChapter
      );
    }

    setFilteredLessons(filtered);
  }, [searchTerm, filterType, filterChapter, lessons]);

  const handleSubmit = async () => {
    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("type", formData.type);
      data.append("order", formData.order);
      data.append("content", formData.content);
      data.append("videoUrl", formData.videoUrl);
      data.append("chapterId", formData.chapterId);
      data.append("h5pUrl", formData.h5pUrl);
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
      setFilteredLessons(res.data);
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
    if (window.confirm("Bạn có chắc chắn muốn xóa bài học này?")) {
      try {
        const response = await LessonService.deleteLesson(lessonId);
        const updatedLessons = lessons.filter(
          (lesson) => lesson._id !== lessonId
        );
        setLessons(updatedLessons);
        setFilteredLessons(updatedLessons);
        setToast({ show: true, color: "green", message: response.message });
      } catch (error) {
        setToast({
          show: true,
          color: "red",
          message: error.message || "Có lỗi xảy ra khi xóa",
        });
      }
    }
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

  // Xử lý edit bài học
  const handleEdit = (lesson) => {
    setFormData({
      title: lesson.title,
      type: lesson.type,
      order: lesson.order,
      content: lesson.content,
      videoUrl: lesson.videoUrl || "",
      h5pUrl: lesson.h5pUrl || "",
      useH5p: !!lesson.h5pUrl,
      h5pFile: null,
      chapterId:
        lesson.chapterId || (chapters.length > 0 ? chapters[0]._id : ""),
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
            <div className="relative">
              <div className="absolute top-2 left-2 bg-purple-500 text-white px-2 py-1 rounded text-xs font-medium">
                H5P Interactive
              </div>
              <iframe
                src={lesson.h5pUrl}
                width="100%"
                height="200"
                frameBorder="0"
                allowFullScreen
                title="Interactive Content"
                className="rounded-lg"
              ></iframe>
            </div>
          );
        } else {
          return (
            <div className="relative">
              <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium z-10">
                YouTube
              </div>
              <div className="h-48 overflow-hidden rounded-lg">
                <YouTubePlayer url={lesson.videoUrl} />
              </div>
            </div>
          );
        }

      case "practice":
        return (
          <div className="bg-gray-50 rounded-lg p-4 h-48 overflow-hidden">
            <div className="text-xs text-gray-600 mb-2 font-medium">
              Code Preview:
            </div>
            <CodeEditor
              value={lesson.practice?.initialCode || "// Code example..."}
              readOnly={true}
            />
          </div>
        );
      case "theory":
        return (
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 h-48 overflow-hidden">
            <div className="text-sm text-gray-700 line-clamp-6">
              {lesson.content
                ? lesson.content.replace(/<[^>]*>/g, "").substring(0, 200) +
                  "..."
                : "Nội dung lý thuyết..."}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  // Get lesson type config
  const getLessonTypeConfig = (type) => {
    switch (type) {
      case "video":
        return {
          icon: <Video size={18} />,
          color: "bg-red-500",
          textColor: "text-red-600",
          bgColor: "bg-red-50",
          label: "Video",
        };
      case "practice":
        return {
          icon: <Code size={18} />,
          color: "bg-green-500",
          textColor: "text-green-600",
          bgColor: "bg-green-50",
          label: "Thực hành",
        };
      case "theory":
        return {
          icon: <BookOpen size={18} />,
          color: "bg-blue-500",
          textColor: "text-blue-600",
          bgColor: "bg-blue-50",
          label: "Lý thuyết",
        };
      default:
        return {
          icon: <BookOpen size={18} />,
          color: "bg-gray-500",
          textColor: "text-gray-600",
          bgColor: "bg-gray-50",
          label: "Khác",
        };
    }
  };

  // Stats calculation
  const stats = {
    total: lessons.length,
    theory: lessons.filter((l) => l.type === "theory").length,
    video: lessons.filter((l) => l.type === "video").length,
    practice: lessons.filter((l) => l.type === "practice").length,
  };

  return (
    <>
      <Helmet>
        <title>Admin | Quản lý bài giảng</title>
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto p-6">
          {toast.show && (
            <ToastMessageComponent
              message={toast.message}
              color={toast.color}
              onClose={() => setToast({ ...toast, show: false })}
            />
          )}

          {/* Header */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="mb-4 lg:mb-0">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Quản lý Bài giảng
                </h1>
                <p className="text-gray-600">
                  Tạo và quản lý nội dung học tập cho học viên
                </p>
              </div>
              <button
                onClick={() => setShowForm(true)}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-3 px-6 rounded-lg flex items-center transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                <Plus className="mr-2" size={18} /> Thêm bài học mới
              </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-4 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm">Tổng bài học</p>
                    <p className="text-2xl font-bold">{stats.total}</p>
                  </div>
                  <BookOpen className="text-blue-200" size={24} />
                </div>
              </div>
              <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-4 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm">Thực hành</p>
                    <p className="text-2xl font-bold">{stats.practice}</p>
                  </div>
                  <Code className="text-green-200" size={24} />
                </div>
              </div>
              <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-lg p-4 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-red-100 text-sm">Video</p>
                    <p className="text-2xl font-bold">{stats.video}</p>
                  </div>
                  <Video className="text-red-200" size={24} />
                </div>
              </div>
              <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-lg p-4 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-indigo-100 text-sm">Lý thuyết</p>
                    <p className="text-2xl font-bold">{stats.theory}</p>
                  </div>
                  <BookOpen className="text-indigo-200" size={24} />
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Tìm kiếm bài học..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                />
              </div>

              {/* Filters */}
              <div className="flex gap-4">
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 bg-white"
                >
                  <option value="all">Tất cả loại</option>
                  <option value="theory">Lý thuyết</option>
                  <option value="video">Video</option>
                  <option value="practice">Thực hành</option>
                </select>

                <select
                  value={filterChapter}
                  onChange={(e) => setFilterChapter(e.target.value)}
                  className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 bg-white"
                >
                  <option value="all">Tất cả chương</option>
                  {chapters.map((chapter) => (
                    <option key={chapter._id} value={chapter._id}>
                      {chapter.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Results count */}
            <div className="mt-4 text-sm text-gray-600">
              Hiển thị {filteredLessons.length} / {lessons.length} bài học
            </div>
          </div>

          {/* Form thêm/chỉnh sửa */}
          {showForm && (
            <AddForm
              title={editLesson ? "Chỉnh sửa bài học" : "Thêm bài học mới"}
              onClose={resetForm}
              onSubmit={handleSubmit}
            >
              {/* Tiêu đề bài học */}
              <div className="grid grid-cols-2 gap-4 mb-6">
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                    placeholder="Nhập tiêu đề bài học"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Chọn chương
                  </label>
                  <select
                    value={formData.chapterId}
                    onChange={(e) =>
                      setFormData({ ...formData, chapterId: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 bg-white"
                  >
                    {chapters.map((chapter) => (
                      <option key={chapter._id} value={chapter._id}>
                        {chapter.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Grid layout cho loại bài học và thứ tự */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {/* Loại bài học */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Loại bài học
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) =>
                      setFormData({ ...formData, type: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 bg-white"
                  >
                    <option value="theory">Lý thuyết</option>
                    <option value="video">Video</option>
                    <option value="practice">Thực hành</option>
                  </select>
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                    min="0"
                  />
                </div>
              </div>

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
                        onChange={() =>
                          setFormData({ ...formData, useH5p: false })
                        }
                        className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                      />
                      <label
                        htmlFor="videoUrl"
                        className="ml-2 text-sm font-medium text-gray-700"
                      >
                        Video URL (YouTube)
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="h5pUrl"
                        name="videoType"
                        checked={formData.useH5p}
                        onChange={() =>
                          setFormData({ ...formData, useH5p: true })
                        }
                        className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                      />
                      <label
                        htmlFor="h5pUrl"
                        className="ml-2 text-sm font-medium text-gray-700"
                      >
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
                        onChange={(e) =>
                          setFormData({ ...formData, videoUrl: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
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
                        onChange={(e) =>
                          setFormData({ ...formData, h5pUrl: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                        placeholder="Nhập link embed từ Lumi hoặc H5P"
                      />
                      <div className="mt-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Tải lên file H5P (tùy chọn)
                        </label>
                        <input
                          type="file"
                          accept=".h5p"
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              h5pFile: e.target.files[0],
                            })
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
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
                              newTestCases[index].expectedOutput =
                                e.target.value;
                              setFormData({
                                ...formData,
                                practice: {
                                  ...formData.practice,
                                  testCases: newTestCases,
                                },
                              });
                            }}
                            placeholder="Expected Output"
                            className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
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
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition duration-200"
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
          <div className="space-y-6">
            {filteredLessons?.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="text-gray-400" size={32} />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Chưa có bài học nào
                </h3>
                <p className="text-gray-500 mb-6">
                  {searchTerm || filterType !== "all" || filterChapter !== "all"
                    ? "Không tìm thấy bài học phù hợp với bộ lọc của bạn"
                    : "Hãy thêm bài học đầu tiên để bắt đầu"}
                </p>
                {!searchTerm &&
                  filterType === "all" &&
                  filterChapter === "all" && (
                    <button
                      onClick={() => setShowForm(true)}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition duration-200"
                    >
                      Thêm bài học mới
                    </button>
                  )}
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredLessons.map((lesson) => {
                  const typeConfig = getLessonTypeConfig(lesson.type);
                  return (
                    <div
                      key={lesson._id}
                      className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 transform hover:-translate-y-1 overflow-hidden"
                    >
                      {/* Content Preview */}
                      <div className="relative">
                        {renderContent(lesson)}

                        {/* Type Badge */}
                        <div
                          className={`absolute top-3 right-3 ${typeConfig.color} text-white px-3 py-1 rounded-full text-xs font-medium flex items-center`}
                        >
                          {typeConfig.icon}
                          <span className="ml-1">{typeConfig.label}</span>
                        </div>
                      </div>

                      {/* Lesson Info */}
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
                              {lesson.title}
                            </h3>
                            <div className="flex items-center text-sm text-gray-500 mb-2">
                              <span className="bg-gray-100 px-2 py-1 rounded text-xs font-medium">
                                {lesson.chapterId?.title || "Chưa phân chương"}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Lesson Meta */}
                        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                          <div className="flex items-center">
                            <Clock size={14} className="mr-1" />
                            <span>Thứ tự: {lesson.order}</span>
                          </div>
                          <div className="flex items-center">
                            <Eye size={14} className="mr-1" />
                            <span>ID: {lesson._id.slice(-6)}</span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2 pt-4 border-t border-gray-100">
                          <button
                            onClick={() => handleEdit(lesson)}
                            className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-600 font-medium py-2 px-4 rounded-lg transition duration-200 flex items-center justify-center"
                          >
                            <Pencil size={16} className="mr-2" />
                            Chỉnh sửa
                          </button>
                          <button
                            onClick={() => handleDelete(lesson._id)}
                            className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 font-medium py-2 px-4 rounded-lg transition duration-200 flex items-center justify-center"
                          >
                            <Trash2 size={16} className="mr-2" />
                            Xóa
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <ButtonOnTop />
        </div>
      </div>
    </>
  );
};

export default LessonManagement;
