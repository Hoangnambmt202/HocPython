/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  MoreVertical,
  Filter,
  ChevronDown,

} from "lucide-react";

import CourseService from "../../services/CourseService";
import UserService from "../../services/UserService";
import CategoryService from "../../services/CategoryService";
import ToastMessageComponent from "../../components/ToastMessageComponent/ToastMessageComponent";

import Modal from "../../components/ModalComponent/ModalComponent";
import CourseForm from "./CourseForm";
import { Helmet } from "react-helmet-async";
const CourseManagement = () => {
  const [isAddCourseModalOpen, setIsAddCourseModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const [lecturers, setLecturers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [courseToDelete, setCourseToDelete] = useState(null);
  const [toast, setToast] = useState({ show: false, color: "", message: "" });

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

    const fetchLecturers = async () => {
      try {
        const role = "lecturer";
        const response = await UserService.getUserByRole(role);
        if (response?.data) {
          setLecturers(response.data);
        }
      } catch (error) {
        setToast({
          show: true,
          message: error,
          color: "red",
        });
      }
    };
    const fetchCategories = async () => {
      try {
        const response = await CategoryService.getCategories();
        setCategories(response.data);
      } catch (error) {
        console.error("Lỗi khi tải danh mục:", error);
      }
    };

    fetchCourses();
    fetchLecturers();
    fetchCategories();
   
  },[]);
  const handleDelete = async () => {
    if (!courseToDelete) return;

    try {
      console.log("🗑️ Đang xóa khóa học với _id:", courseToDelete);
      await CourseService.deleteCourse(courseToDelete);

      setToast({
        show: true,
        message: "Xóa khóa học thành công!",
        color: "green",
      });
      setIsOpen(false);
      // Cập nhật lại danh sách khóa học sau khi xóa
      const response = await CourseService.getAllCourses();
      if (response.data) {
        setCourses(response.data);
      }
    } catch (error) {
      console.error("❌ Lỗi khi xóa khóa học:", error);
      setToast({
        show: true,
        message: "Lỗi khi xóa khóa học!",
        color: "red",
      });
    } finally {
      setIsOpen(false);
      setCourseToDelete(null);
    }
  };
  const handleCourseAdded = (newCourse) => {
    setCourses([...courses, newCourse]);
    setIsAddCourseModalOpen(false); // Đóng modal sau khi thêm khóa học
  };
  const handleCourseUpdated = (updatedCourse) => {
    setCourses((prevCourses) => prevCourses.map(course => course._id === updatedCourse._id ? updatedCourse : course));
    setIsAddCourseModalOpen(false);
  };
  return (
    <>
    <Helmet>
  <title>Admin | Quản lý khóa học</title>
</Helmet>
    <div className="space-y-6 py-8">
      {toast.show && (
        <ToastMessageComponent
          message={toast.message}
          color={toast.color}
          onClose={() => setToast({ ...toast, show: false })}
        />
      )}

      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Quản Lý Khóa Học</h1>
        <button
         onClick={() => { setSelectedCourse(null); setIsAddCourseModalOpen(true); }}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-5 h-5 mr-2" />
          Thêm Khóa Học
        </button>
      </div>
        <Modal isOpen={isAddCourseModalOpen} onClose={() => setIsAddCourseModalOpen(false)}>
          <CourseForm courseData={selectedCourse} onCourseUpdated={handleCourseUpdated} lecturers={lecturers} categories={categories} onCourseAdded={handleCourseAdded}   />
        </Modal>
      {/* Filters and Search */}
      <div className="flex justify-between items-center space-x-4">
        <div className="flex-1 max-w-md relative">
          <Search
            className="absolute center-3 top-2.5 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Tìm kiếm khóa học..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center px-4 py-2 border rounded-lg hover:bg-gray-50">
            <Filter className="w-5 h-5 mr-2" />
            Bộ Lọc
            <ChevronDown className="w-4 h-4 ml-2" />
          </button>
        </div>
      </div>

      {/* Courses Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-2 w-2/12 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                Khóa Học
              </th>
              <th className="px-2 w-3/12 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                Chi tiết khóa học
              </th>
              <th className="px-2 w-1/12 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                Giảng Viên
              </th>
              <th className="px-2 w-1/12 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                Danh mục
              </th>
              <th className="px-2 w-1/12 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                Thời Lượng
              </th>

              <th className="px-2 w-1/12 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                Giá
              </th>
              <th className="px-2 w-1/12 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                Trạng Thái
              </th>
              <th className="px-2 w-2/12 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                Thao Tác
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {courses.map((course) => (
              <tr key={course._id}>
                <td className="px-2 py-4">
                  <div className="text-sm font-medium text-gray-900">
                    {course.title}
                  </div>
                </td>

                <td className="px-2 py-4 text-sm text-gray-500">
                  {course.description}
                </td>
                <td className="px-2 py-4 text-sm text-center text-gray-500">
                  {course.lecturerId?.name}
                </td>
                <td className="px-2 py-4 text-sm text-center text-gray-500">
                  {course.categoryId?.name}
                </td>
                <td className="px-2 py-4 text-sm text-gray-500"></td>
                <td className="px-2 py-4 text-sm text-center text-gray-500">
                  {course.price}
                </td>
                <td className="px-2 py-4 text-sm text-gray-500">
                  {
                    <span
                      className={`px-2 py-1 rounded text-[10px] ${
                        course.isPublished === true
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {course.isPublished === true
                        ? "Đang hoạt động"
                        : "Đã khóa"}
                    </span>
                  }
                </td>

                <td className="px-4 py-4 text-right space-x-3">
                  <button
                    onClick={() => { setSelectedCourse(course); setIsAddCourseModalOpen(true); }}
                    className="text-gray-600 hover:text-blue-600"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => {
                      setIsOpen(true);
                      setCourseToDelete(course._id);
                    }}
                    className="text-gray-600 hover:text-red-600"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                  <button className="text-gray-600">
                    <MoreVertical className="w-5 h-5" />
                  </button>
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
                            Hành động này không thể hoàn tác. Dữ liệu sẽ bị xóa
                            vĩnh viễn.
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
    </>
  );
};

export default CourseManagement;
