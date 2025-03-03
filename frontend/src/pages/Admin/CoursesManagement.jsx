/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { Plus, Search, Edit, Trash2, MoreVertical, Filter, ChevronDown, X, Upload, ChevronUp } from 'lucide-react';

import CourseService from '../../services/CourseService';
import UserService from '../../services/UserService';

const CourseManagement = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courses, setCourses] = useState([]);
  const [lecturers, setLecturers] = useState([]);
  const [toast, setToast] = useState("");

  useEffect(() => {
    const access_token = localStorage.getItem("access_token");

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
        const response = await UserService.getAllUser(access_token,role);
        if (response?.data) {
          setLecturers(response.data);
        }
      } catch (error) {
        setToast({
          show: true,
          message: error,
          color: "red"
        });
      }
    };

    fetchCourses();
    fetchLecturers();
  }, []);
  
  const CourseForm = ({ isOpen, onClose, course = null }) => {
    if (!isOpen) return null;

    const [formData, setFormData] = useState({
      title: course?.title || '',
      description: course?.description || '',
      lecturerId: course?.lecturerId || (lecturers.length > 0 ? lecturers[0]._id : ''),
      price: course?.price || 0,
      category: course?.category || 'Lập trình backend',
      isPublished: course?.isPublished || false,
      thumbnail: course?.thumbnail || '',
      content: course?.content || [
        {
          title: "Chương 1: Giới thiệu",
          lessons: [
            {
              title: "Bài 1: Giới thiệu khóa học",
              videoUrl: "",
              description: "Giới thiệu tổng quan về khóa học",
              duration: 10
            }
          ]
        }
      ]
    });
    
    const [expandedChapter, setExpandedChapter] = useState(0);
    const [thumbnailPreview, setThumbnailPreview] = useState(course?.thumbnail || '');
    
    const categories = [
      "Lập trình backend",
      "Lập trình frontend",
      "Lập trình mobile",
      "Cơ sở dữ liệu",
      "DevOps",
      "Machine Learning",
      "Khác"
    ];
    
    const handleInputChange = (e) => {
      const { name, value, type, checked } = e.target;
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value
      });
    };
    
    const handleThumbnailChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        // Trong thực tế, bạn sẽ xử lý upload file và nhận URL từ server
        // Đây chỉ là giả lập để preview
        const reader = new FileReader();
        reader.onload = () => {
          setThumbnailPreview(reader.result);
          setFormData({
            ...formData,
            thumbnail: `/src/assets/imgs/${file.name}` // Giả lập đường dẫn
          });
        };
        reader.readAsDataURL(file);
      }
    };
    
    const addChapter = () => {
      const newContent = [...formData.content];
      newContent.push({
        title: `Chương ${newContent.length + 1}: Tiêu đề chương`,
        lessons: [
          {
            title: "Bài 1: Tiêu đề bài học",
            videoUrl: "",
            description: "Mô tả bài học",
            duration: 10
          }
        ]
      });
      setFormData({ ...formData, content: newContent });
      setExpandedChapter(newContent.length - 1);
    };
    
    const removeChapter = (index) => {
      const newContent = [...formData.content];
      newContent.splice(index, 1);
      setFormData({ ...formData, content: newContent });
    };
    
    const updateChapterTitle = (index, title) => {
      const newContent = [...formData.content];
      newContent[index].title = title;
      setFormData({ ...formData, content: newContent });
    };
    
    const addLesson = (chapterIndex) => {
      const newContent = [...formData.content];
      newContent[chapterIndex].lessons.push({
        title: `Bài ${newContent[chapterIndex].lessons.length + 1}: Tiêu đề bài học`,
        videoUrl: "",
        description: "Mô tả bài học",
        duration: 10
      });
      setFormData({ ...formData, content: newContent });
    };
    
    const removeLesson = (chapterIndex, lessonIndex) => {
      const newContent = [...formData.content];
      newContent[chapterIndex].lessons.splice(lessonIndex, 1);
      setFormData({ ...formData, content: newContent });
    };
    
    const updateLesson = (chapterIndex, lessonIndex, field, value) => {
      const newContent = [...formData.content];
      newContent[chapterIndex].lessons[lessonIndex][field] = value;
      setFormData({ ...formData, content: newContent });
    };
    
    const handleSubmit = (e) => {
      e.preventDefault();
      // Xử lý gửi dữ liệu
      console.log(formData);
      // Đóng form
      onClose();
    };
    
    // Tính tổng thời lượng
    const totalDuration = formData.content.reduce((total, chapter) => {
      return total + chapter.lessons.reduce((sum, lesson) => sum + parseInt(lesson.duration || 0), 0);
    }, 0);
    
    // Tính tổng số bài học
    const totalLessons = formData.content.reduce((total, chapter) => {
      return total + chapter.lessons.length;
    }, 0);

    return (
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50" style={{ marginTop: 0 }}>
        <div className="bg-white rounded-lg w-full max-w-4xl p-6 max-h-screen overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">
              {course ? 'Chỉnh Sửa Khóa Học' : 'Thêm Khóa Học Mới'}
            </h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X size={20} />
            </button>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-3 gap-6">
              {/* Cột 1 - Thông tin cơ bản */}
              <div className="col-span-2 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tên Khóa Học <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mô Tả Khóa Học <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    rows="3"
                    required
                  ></textarea>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Giảng Viên <span className="text-red-500">*</span>
                    </label>
                    <select 
                      name="lecturerId"
                      value={formData.lecturerId}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    >
                     
                      {lecturers.map((lecturer) => (
                        <option key={lecturer._id} value={lecturer._id}>
                          {lecturer.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Danh Mục <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Giá Khóa Học (VNĐ) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      min="0"
                      required
                    />
                  </div>
                  
                  <div className="flex items-end">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        name="isPublished"
                        checked={formData.isPublished}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm font-medium text-gray-700">Đăng khóa học</span>
                    </label>
                  </div>
                </div>
              </div>
              
              {/* Cột 2 - Thumbnail */}
              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ảnh Thumbnail <span className="text-red-500">*</span>
                </label>
                <div className="border-2 relative border-dashed border-gray-300 rounded-lg p-4 text-center">
                  {thumbnailPreview ? (
                    <div className="relative">
                      <img 
                        src={thumbnailPreview} 
                        alt="Thumbnail preview" 
                        className="max-h-40 mx-auto object-cover rounded"
                      />
                      <button 
                        type="button"
                        className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-md"
                        onClick={() => {
                          setThumbnailPreview('');
                          setFormData({...formData, thumbnail: ''});
                        }}
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <div className="py-4">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="mt-1 text-sm text-gray-500">
                        Kéo thả hoặc click để tải lên
                      </p>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleThumbnailChange}
                    className="opacity-0 absolute inset-0 w-full cursor-pointer"
                  />
                </div>
                
                <div className="mt-4 border rounded-lg p-3 bg-gray-50">
                  <h3 className="text-sm font-medium mb-2">Thông tin tổng quan</h3>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>Tổng số chương: {formData.content.length}</p>
                    <p>Tổng số bài học: {totalLessons}</p>
                    <p>Tổng thời lượng: {totalDuration} phút</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Nội dung khóa học */}
            <div className="pt-4 border-t">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Nội dung khóa học</h3>
                <button
                  type="button"
                  onClick={addChapter}
                  className="flex items-center px-3 py-1.5 bg-blue-50 text-blue-600 rounded hover:bg-blue-100"
                >
                  <Plus size={16} className="mr-1" />
                  Thêm chương
                </button>
              </div>
              
              <div className="space-y-4">
                {formData.content.map((chapter, chapterIndex) => (
                  <div key={chapterIndex} className="border rounded-lg overflow-hidden">
                    <div className="flex items-center justify-between p-3 bg-gray-50 border-b">
                      <div className="flex-1">
                        <input
                          type="text"
                          value={chapter.title}
                          onChange={(e) => updateChapterTitle(chapterIndex, e.target.value)}
                          className="w-full bg-transparent border-0 focus:ring-0 p-0 font-medium"
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          type="button"
                          onClick={() => setExpandedChapter(
                            expandedChapter === chapterIndex ? -1 : chapterIndex
                          )}
                          className="p-1 text-gray-500 hover:text-gray-700"
                        >
                          {expandedChapter === chapterIndex ? (
                            <ChevronUp size={20} />
                          ) : (
                            <ChevronDown size={20} />
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={() => removeChapter(chapterIndex)}
                          className="p-1 text-red-500 hover:text-red-700"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                    
                    {expandedChapter === chapterIndex && (
                      <div className="p-4 space-y-4">
                        {chapter.lessons.map((lesson, lessonIndex) => (
                          <div key={lessonIndex} className="p-3 border rounded-lg bg-gray-50">
                            <div className="flex justify-between items-start mb-3">
                              <input
                                type="text"
                                value={lesson.title}
                                onChange={(e) => updateLesson(chapterIndex, lessonIndex, 'title', e.target.value)}
                                className="flex-1 bg-transparent border-0 focus:ring-0 p-0 font-medium"
                                placeholder="Tiêu đề bài học"
                              />
                              <button
                                type="button"
                                onClick={() => removeLesson(chapterIndex, lessonIndex)}
                                className="p-1 text-red-400 hover:text-red-600"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <label className="block text-xs text-gray-500 mb-1">Video URL</label>
                                <input
                                  type="text"
                                  value={lesson.videoUrl}
                                  onChange={(e) => updateLesson(chapterIndex, lessonIndex, 'videoUrl', e.target.value)}
                                  className="w-full p-1.5 text-sm border rounded"
                                  placeholder="https://example.com/video"
                                />
                              </div>
                              <div>
                                <label className="block text-xs text-gray-500 mb-1">Thời lượng (phút)</label>
                                <input
                                  type="number"
                                  value={lesson.duration}
                                  onChange={(e) => updateLesson(chapterIndex, lessonIndex, 'duration', parseInt(e.target.value))}
                                  className="w-full p-1.5 text-sm border rounded"
                                  min="1"
                                />
                              </div>
                            </div>
                            
                            <div className="mt-2">
                              <label className="block text-xs text-gray-500 mb-1">Mô tả bài học</label>
                              <textarea
                                value={lesson.description}
                                onChange={(e) => updateLesson(chapterIndex, lessonIndex, 'description', e.target.value)}
                                className="w-full p-1.5 text-sm border rounded"
                                rows="2"
                                placeholder="Mô tả nội dung bài học"
                              ></textarea>
                            </div>
                          </div>
                        ))}
                        
                        <button
                          type="button"
                          onClick={() => addLesson(chapterIndex)}
                          className="flex items-center px-3 py-1.5 text-sm bg-gray-100 text-gray-600 rounded hover:bg-gray-200"
                        >
                          <Plus size={14} className="mr-1" />
                          Thêm bài học
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 pt-4 border-t">
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
        <table  className="w-full table-fixed">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Khóa Học
              </th>
              <th  className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Chi tiết khóa học
              </th>
              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Giảng Viên
              </th>
              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Danh mục
              </th>
              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Thời Lượng
              </th>
           
              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Giá
              </th>
              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Trạng Thái
              </th>
              <th className="px-2 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                Thao Tác
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            { courses.map((course) => (
              <tr key={course._id}>
                <td className="px-2 py-4">
                  <div className="text-sm font-medium text-gray-900">{course.title}</div>
                </td>
               
                <td className="px-2 py-4 text-sm text-gray-500">{course.description}</td>
                <td className="px-2 py-4 text-sm text-gray-500">{course.lecturerId?.name }</td>
                <td className="px-2 py-4 text-sm text-gray-500">{course.category}</td>
                <td className="px-2 py-4 text-sm text-gray-500"></td>
                <td className="px-2 py-4 text-sm text-gray-500">{course.price}</td>
                <td className="px-2 py-4 text-sm text-gray-500">{
                <span
                className={`px-2 py-1 rounded text-xs ${
                  course.isPublished === true
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                { course.isPublished === true
                    ? "Đang hoạt động"
                    : "Đã khóa"}
              </span>
                }</td>
                
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
      <CourseForm
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