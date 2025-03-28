/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import CourseService from "../../services/CourseService";
import ToastMessageComponent from "../../components/ToastMessageComponent/ToastMessageComponent";
 


const CourseForm = ({ lecturers, categories, courseData, onCourseUpdated, onClose }) => {
  const [toast, setToast] = useState({ show: false, message: "", color: "" });
  const [formData, setFormData] = useState(courseData || {
    title: "",
    description: "",
    lecturerId: "",
    price: 0,
    discountPrice: 0,
    thumbnail: "",
    categoryId: "",
    tags: "",
    isPublished: false
  });

  useEffect(() => {
    if (courseData) {
      setFormData(courseData);
    }
  }, [courseData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res;
      if (courseData) {
        // Nếu đang sửa khóa học
        res = await CourseService.updateCourse(courseData._id, formData);
        onCourseUpdated(res.data);
      } else {
        // Nếu đang thêm mới
        res = await CourseService.createCourse(formData);
      }

      setToast({ show: true, message: res.message, color: "green" });
      onClose(); // Đóng modal sau khi cập nhật

      setFormData({
        title: "",
        description: "",
        lecturerId: "",
        price: 0,
        discountPrice: 0,
        thumbnail: "",
        categoryId: "",
        tags: "",
        isPublished: false
      });
    } catch (error) {
      console.error("Lỗi khi cập nhật khóa học", error);
      setToast({ show: true, message: "Có lỗi xảy ra", color: "red" });
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {toast.show && (
        <ToastMessageComponent
          show={toast.show}
          message={toast.message}
          color={toast.color}
          onClose={() => setToast({ show: false, message: "", color: "" })}
        />
      )}
      <h2 className="text-2xl font-bold mb-6">{courseData ? "Chỉnh Sửa Khóa Học" : "Thêm Khóa Học"}</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
           <label htmlFor="title" className="block text-sm font-medium text-gray-700">Tên khóa học</label>
         <input 
            type="text" 
            id="title"
            name="title" 
            placeholder="Nhập tên khóa học" 
            value={formData.title} 
            onChange={handleChange} 
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors" 
            required 
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Mô tả chi tiết</label>
          <textarea 
            id="description"
            name="description" 
            placeholder="Mô tả chi tiết về khóa học" 
            value={formData.description} 
            onChange={handleChange} 
            rows="4"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          ></textarea>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="lecturerId" className="block text-sm font-medium text-gray-700">Giảng viên</label>
            <select 
              id="lecturerId"
              name="lecturerId" 
              value={formData.lecturerId} 
              onChange={handleChange} 
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors bg-white"
            >
              <option value="">Chọn giảng viên</option>
              {lecturers.map((lecturer) => (
                <option key={lecturer._id} value={lecturer._id}>
                  {lecturer.name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700">Danh mục</label>
            <select 
              id="categoryId"
              name="categoryId" 
              value={formData.categoryId} 
              onChange={handleChange} 
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors bg-white"
            >
              <option value="">Chọn danh mục</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Giá khóa học</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500">₫</span>
              </div>
              <input 
                type="number" 
                id="price"
                name="price" 
                placeholder="0" 
                value={formData.price} 
                onChange={handleChange} 
                className="w-full pl-8 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors" 
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="discountPrice" className="block text-sm font-medium text-gray-700">Giá khuyến mãi</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500">₫</span>
              </div>
              <input 
                type="number" 
                id="discountPrice"
                name="discountPrice" 
                placeholder="0" 
                value={formData.discountPrice} 
                onChange={handleChange} 
                className="w-full pl-8 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors" 
              />
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="thumbnail" className="block text-sm font-medium text-gray-700">URL Ảnh bìa</label>
          <input 
            type="text" 
            id="thumbnail"
            name="thumbnail" 
            placeholder="https://example.com/image.jpg" 
            value={formData.thumbnail} 
            onChange={handleChange} 
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors" 
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="tags" className="block text-sm font-medium text-gray-700">Tags</label>
          <input 
            type="text" 
            id="tags"
            name="tags" 
            placeholder="lập trình, web, javascript..." 
            value={formData.tags} 
            onChange={handleChange} 
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors" 
          />
          <p className="text-xs text-gray-500">Các tags cách nhau bằng dấu phẩy</p>
        </div>
        
        <div className="pt-2">
          <label className="flex items-center space-x-3 cursor-pointer">
            <div className="relative">
              <input 
                type="checkbox" 
                name="isPublished" 
                checked={formData.isPublished} 
                onChange={handleChange} 
                className="sr-only" 
              />
              <div className={`block w-10 h-6 rounded-full ${formData.isPublished ? 'bg-blue-500' : 'bg-gray-300'} transition-colors`}></div>
              <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-all ${formData.isPublished ? 'transform translate-x-4' : ''}`}></div>
            </div>
            <span className="text-gray-700 font-medium">Công khai khóa học</span>
          </label>
        </div>
        
        <div className="flex items-center justify-end gap-3 pt-4 border-t mt-6">
          <button 
            type="button" 
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Hủy
          </button>
          <button type="submit" className="px-4 py-2 bg-blue-600 rounded-md text-white hover:bg-blue-700">
            {courseData ? "Cập Nhật" : "Thêm"}
          </button>
        </div>
        <div className="flex justify-end">
          
        </div>
      </form>
    </div>
  );
};


CourseForm.propTypes = {
  lecturers: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default CourseForm;