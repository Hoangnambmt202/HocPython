/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Plus, Search, Edit, Trash2, MoreVertical, Filter, ChevronDown } from 'lucide-react';

const CourseManagement = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Mock data
  const courses = [
    {
      id: 1,
      title: 'Python Cơ Bản',
      instructor: 'Nguyễn Văn A',
      level: 'Cơ bản',
      duration: '8 tuần',
      lessons: 24,
      students: 156,
      price: '1,200,000đ',
      status: 'active'
    },
    {
      id: 2,
      title: 'Django Web Development',
      instructor: 'Trần Thị B',
      level: 'Trung cấp',
      duration: '12 tuần',
      lessons: 36,
      students: 98,
      price: '2,500,000đ',
      status: 'active'
    },
    {
      id: 3,
      title: 'Machine Learning với Python',
      instructor: 'Lê Văn C',
      level: 'Nâng cao',
      duration: '16 tuần',
      lessons: 48,
      students: 124,
      price: '3,500,000đ',
      status: 'draft'
    }
  ];

  const CourseModal = ({ isOpen, onClose, course = null }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50"  style={{ marginTop: 0 }}>
        <div className="bg-white rounded-lg w-full max-w-2xl p-6">
          <h2 className="text-xl font-semibold mb-4">
            {course ? 'Chỉnh Sửa Khóa Học' : 'Thêm Khóa Học Mới'}
          </h2>
          <form className="space-y-4 " >
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tên Khóa Học
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  defaultValue={course?.title}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Giảng Viên
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  defaultValue={course?.instructor}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cấp Độ
                </label>
                <select className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500">
                  <option>Cơ bản</option>
                  <option>Trung cấp</option>
                  <option>Nâng cao</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Thời Lượng
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  defaultValue={course?.duration}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Số Bài Học
                </label>
                <input
                  type="number"
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  defaultValue={course?.lessons}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Giá Khóa Học
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  defaultValue={course?.price}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mô Tả Khóa Học
              </label>
              <textarea
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                rows="4"
              ></textarea>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                {course ? 'Cập Nhật' : 'Thêm Mới'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 py-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Quản Lý Khóa Học</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-5 h-5 mr-2" />
          Thêm Khóa Học
        </button>
      </div>

      {/* Filters and Search */}
      <div className="flex justify-between items-center space-x-4">
        <div className="flex-1 max-w-md relative">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
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
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Khóa Học
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Giảng Viên
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Cấp Độ
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Thời Lượng
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Học Viên
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Giá
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Trạng Thái
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                Thao Tác
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {courses.map((course) => (
              <tr key={course.id}>
                <td className="px-4 py-4">
                  <div className="text-sm font-medium text-gray-900">{course.title}</div>
                  <div className="text-sm text-gray-500">{course.lessons} bài học</div>
                </td>
                <td className="px-4 py-4 text-sm text-gray-500">{course.instructor}</td>
                <td className="px-4 py-4 text-sm text-gray-500">{course.level}</td>
                <td className="px-4 py-4 text-sm text-gray-500">{course.duration}</td>
                <td className="px-4 py-4 text-sm text-gray-500">{course.students}</td>
                <td className="px-4 py-4 text-sm text-gray-500">{course.price}</td>
                <td className="px-4 py-4">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      course.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {course.status === 'active' ? 'Hoạt động' : 'Bản nháp'}
                  </span>
                </td>
                <td className="px-4 py-4 text-right space-x-3">
                  <button
                    onClick={() => setSelectedCourse(course)}
                    className="text-gray-600 hover:text-blue-600"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button className="text-gray-600 hover:text-red-600">
                    <Trash2 className="w-5 h-5" />
                  </button>
                  <button className="text-gray-600">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Course Modal */}
      <CourseModal
        isOpen={showAddModal || selectedCourse !== null}
        onClose={() => {
          setShowAddModal(false);
          setSelectedCourse(null);
        }}
        course={selectedCourse}
      />
    </div>
  );
};

export default CourseManagement;