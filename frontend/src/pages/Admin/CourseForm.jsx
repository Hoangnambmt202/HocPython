/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import CourseService from "../../services/CourseService";
import ToastMessageComponent from "../../components/ToastMessageComponent/ToastMessageComponent";

const CourseForm = ({
  lecturers,
  categories,
  courseData,
  onCourseAdded,
  onCourseUpdated,
  onClose,
}) => {
  const [toast, setToast] = useState({ show: false, message: "", color: "" });
  const [formData, setFormData] = useState(
    courseData || {
      title: "",
      description: "",
      lecturerId: "",
      price: 0,
      discountPrice: 0,
      thumbnail: "",
      categoryId: "",
      tags: "",
      isPublished: false,
    }
  );
  const [uploadOption, setUploadOption] = useState("url"); // 'url' hoặc 'file'
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (courseData) {
      setFormData(courseData);
    }
  }, [courseData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Thay đổi handleSubmit để xử lý upload file cùng với form
  const handleSubmit = async (e) => {
  e.preventDefault();
  setIsUploading(true);

  try {
    // Create FormData object for file uploads
    const formDataToSend = new FormData();
    
    // Append all regular form fields
    formDataToSend.append('title', formData.title);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('lecturerId', formData.lecturerId);
    formDataToSend.append('price', formData.price);
    formDataToSend.append('discountPrice', formData.discountPrice);
    formDataToSend.append('categoryId', formData.categoryId);
    formDataToSend.append('tags', formData.tags);
    formDataToSend.append('isPublished', formData.isPublished);
   

    // Handle thumbnail based on upload option
    if (uploadOption === 'url') {
      formDataToSend.append('thumbnail', formData.thumbnail);
    } else if (uploadOption === 'file' && e.target.thumbnail.files[0]) {
      formDataToSend.append('thumbnailFile', e.target.thumbnail.files[0]);
    }

    let res;
    if (courseData) {
      res = await CourseService.updateCourse(courseData._id, formDataToSend);
      onCourseUpdated(res.data);
    } else {
      res = await CourseService.createCourse(formDataToSend);
      onCourseAdded(res.data);
    }

    setToast({ show: true, message: res.message, color: 'green' });

    // Reset form if not editing
    if (!courseData) {
      setFormData({
        title: '',
        description: '',
        lecturerId: '',
        price: 0,
        discountPrice: 0,
        thumbnail: '',
        categoryId: '',
        tags: '',
        isPublished: false,
      });
    }
  } catch (error) {
    setToast({
      show: true,
      message: error.response?.data?.error || 'Có lỗi xảy ra',
      color: 'red',
    });
  } finally {
    setIsUploading(false);
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
      <h2 className="text-2xl font-bold mb-6">
        {courseData ? "Chỉnh Sửa Khóa Học" : "Thêm Khóa Học"}
      </h2>

      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="space-y-4"
      >
        <div className="space-y-2">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Tên khóa học
          </label>
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
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Mô tả chi tiết
          </label>
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
            <label
              htmlFor="lecturerId"
              className="block text-sm font-medium text-gray-700"
            >
              Giảng viên
            </label>
       
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
            <label
              htmlFor="categoryId"
              className="block text-sm font-medium text-gray-700"
            >
              Danh mục
            </label>
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
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Giá khóa học
            </label>
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
            <label
              htmlFor="discountPrice"
              className="block text-sm font-medium text-gray-700"
            >
              Giá khuyến mãi
            </label>
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
          <label className="block text-sm font-medium text-gray-700">
            Ảnh bìa khóa học
          </label>

          <div className="flex space-x-4 mb-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio"
                name="uploadOption"
                value="url"
                checked={uploadOption === "url"}
                onChange={() => setUploadOption("url")}
              />
              <span className="ml-2">Nhập URL</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio"
                name="uploadOption"
                value="file"
                checked={uploadOption === "file"}
                onChange={() => setUploadOption("file")}
              />
              <span className="ml-2">Upload từ máy tính</span>
            </label>
          </div>

          {uploadOption === "url" ? (
            <input
              type="text"
              id="thumbnail"
              name="thumbnail"
              placeholder="https://example.com/image.jpg"
              value={formData.thumbnail}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            />
          ) : (
            <div className="space-y-2">
              <div className="flex items-center">
                <label className="flex flex-col items-center px-4 py-6 bg-white text-blue-500 rounded-lg tracking-wide border border-blue-500 cursor-pointer hover:bg-blue-50">
                  <span className="text-base leading-normal">
                    {isUploading ? "Đang tải lên..." : "Chọn ảnh"}
                  </span>
                  <input
                    type="file"
                    id="thumbnail"
                    name="thumbnail"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files[0]) {
                        const file = e.target.files[0];
                        const previewUrl = URL.createObjectURL(file);
                        setFormData({ ...formData, thumbnail: previewUrl });
                      }
                    }}
                    disabled={isUploading}
                  />
                </label>
                {formData.thumbnail && (
                  <div className="ml-4">
                    <img
                      src={formData.thumbnail}
                      alt="Preview"
                      className="h-20 w-20 object-cover rounded"
                    />
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-500">
                Chỉ chấp nhận file ảnh (JPEG, PNG) dưới 2MB
              </p>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="tags"
            className="block text-sm font-medium text-gray-700"
          >
            Tags
          </label>
          <input
            type="text"
            id="tags"
            name="tags"
            placeholder="lập trình, web, javascript..."
            value={formData.tags}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          />
          <p className="text-xs text-gray-500">
            Các tags cách nhau bằng dấu phẩy
          </p>
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
              <div
                className={`block w-10 h-6 rounded-full ${
                  formData.isPublished ? "bg-blue-500" : "bg-gray-300"
                } transition-colors`}
              ></div>
              <div
                className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-all ${
                  formData.isPublished ? "transform translate-x-4" : ""
                }`}
              ></div>
            </div>
            <span className="text-gray-700 font-medium">
              Công khai khóa học
            </span>
          </label>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t mt-6">
          <button
            type="button"
            onClick={onClose} // Thêm dòng này
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Hủy
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 rounded-md text-white hover:bg-blue-700"
            disabled={isUploading}
          >
            {isUploading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Đang xử lý...
              </>
            ) : courseData ? (
              "Cập Nhật"
            ) : (
              "Thêm"
            )}
          </button>
        </div>
        <div className="flex justify-end"></div>
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
