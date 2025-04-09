import { useEffect, useState } from "react";
import ChapterService from "../../services/ChapterService";
import CourseService from "../../services/CourseService";
import Modal from "../../components/ModalComponent/ModalComponent";
import { Edit, Trash2 } from "lucide-react";
import {Helmet} from "react-helmet-async"

const ChaptersManagement = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [chapters, setChapters] = useState([]);
  const [title, setTitle] = useState("");
  const [chapterToDelete, setChapterToDelete] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editChapter, setEditChapter] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  // const [toast, setToast] = useState({ show: false, color: "", message: "" });
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await CourseService.getAllCourses();
        setCourses(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách khóa học:", error);
      }
    };
    fetchCourses();
  }, []);

  useEffect(() => {
    const fetchChapters = async () => {
      try {
        const response = await ChapterService.getAllChapters();
        setChapters(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách chapters:", error);
      }
    };
    fetchChapters();
  }, [selectedCourse]);

  const addChapter = async () => {
    if (!selectedCourse || !title) {
      alert("Vui lòng chọn khóa học và nhập tiêu đề!");
      return;
    }
    try {
      await ChapterService.createChapter({
        courseId: selectedCourse,
        title: title,
      });
      const response = await ChapterService.getAllChapters();
      setChapters( response.data);

      setTitle(""); // Reset input
    } catch (error) {
      console.error("Lỗi khi thêm chapter:", error);
    }
  };
  const openEditModal = (chapter) => {
    setEditChapter(chapter);
    setEditTitle(chapter.title);
    setIsEditOpen(true);
  };

  const handleUpdateChapter = async () => {
    if (!editChapter || !editTitle) {
      alert("Vui lòng nhập tiêu đề!");
      return;
    }
    try {
      await ChapterService.updateChapter(editChapter._id, { title: editTitle });
      setChapters(
        chapters.map((chapter) =>
          chapter._id === editChapter._id
            ? { ...chapter, title: editTitle }
            : chapter
        )
      );
      setIsEditOpen(false);
  
    } catch (error) {
      console.error("Lỗi khi cập nhật chapter:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await ChapterService.deleteChapter(chapterToDelete);
      setIsOpen(false);
      const response = await ChapterService.getAllChapters();
      setChapters(response.data);
    } catch (error) {
      console.error("Lỗi khi xóa chapter:", error);
    }
  };

  return (
    <>
    <Helmet>
  <title>Admin | Quản lý Chương</title>
</Helmet>
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Quản lý Chương</h2>

      <div className="w-full">
        <label htmlFor="selectedCourse">Chọn khóa học</label>
        <select
          className="border p-2 ml-4 mb-4"
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
        >
          <option value="">Chọn khóa học</option>
          {courses.map((course) => (
            <option key={course._id} value={course._id}>
              {course.title}
            </option>
          ))}
        </select>
      </div>

      {/* Form thêm chapter */}
      <div className="w-full flex  mb-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Chương 1: ...."
          className="border p-2 mr-2 flex-1"
        />
        <button
          onClick={addChapter}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Thêm
        </button>
      </div>

      {/* Bảng danh sách chapters */}
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">STT</th>
            <th className="border p-2">Tiêu đề</th>
            <th className="border p-2">Thuộc khóa học</th>
            <th className="border p-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {chapters.map((chapter, index) => (
            <tr key={chapter._id} className="border">
              <td className="border p-2 text-center">{index + 1}</td>
              <td className="border p-2">{chapter.title}</td>
              <td className="border p-2">{chapter.courseId?.title}</td>
              <td className="border p-2 text-center flex justify-around items-center">
                <button
                  className="bg-blue-500 text-white p-1 rounded"
                  onClick={() => openEditModal(chapter)}
                >
                  <Edit className="w-5 h-5"/>
                </button>

                <button
                  className="bg-red-500 text-white p-1 rounded"
                  onClick={() => {
                    setIsOpen(true);
                    setChapterToDelete(chapter._id);
                  }}
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal isOpen={isEditOpen} setIsOpen={setIsEditOpen} onClose={()=>{setIsEditOpen(false)}}>
        <h3 className="text-2xl font-bold">Chỉnh sửa Chương</h3>
        <div className="p-6">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-3">
          <button
            onClick={() => setIsEditOpen(false)}
            className="px-4 py-2 bg-gray-300 rounded-md"
          >
            Hủy
          </button>
          <button
            onClick={handleUpdateChapter}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Lưu
          </button>
        </div>
      </Modal>

      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onClose={() => setIsOpen(false)}
      >
        <h3 className="text-2xl font-bold ">Xác Nhận Xóa</h3>
        <div className="p-6">
          <div className="flex items-center mb-4">
            <div className="bg-red-100 p-2 rounded-full mr-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </div>
            <div>
              <h4 className="font-medium text-gray-900">
                Bạn có chắc chắn muốn xóa không?
              </h4>
              <p className="text-gray-500 mt-1">
                Hành động này không thể hoàn tác. Dữ liệu sẽ bị xóa vĩnh viễn.
              </p>
            </div>
          </div>
        </div>

        {/* Modal footer */}
        <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-3">
          <button
            onClick={() => {
              setIsOpen(false);
            }}
            className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
          >
            Hủy bỏ
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 text-white  rounded-md font-medium hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
          >
            Xác nhận xóa
          </button>
        </div>
      </Modal>
    </div>
    </>
  );
};

export default ChaptersManagement;
