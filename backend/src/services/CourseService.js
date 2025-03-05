const Course = require("../models/Course");
const slugify = require("slugify");

// Tạo khóa học
const createCourse = async (courseData) => {
  try {
    if (courseData.title) {
      courseData.slug = slugify(courseData.title, { lower: true, strict: true });
    }

    const newCourse = new Course(courseData);
    const savedCourse = await newCourse.save();

    return {
      status: "success",
      message: "Khóa học đã được tạo thành công",
      data: savedCourse,
    };
  } catch (error) {
    return {
      status: "error",
      message: "Lỗi khi tạo khóa học",
      error: error.message,
    };
  }
};

// Lấy tất cả khóa học
const getAllCourses = async () => {
  try {
    const courses = await Course.find().populate("lecturerId", "name");
    return {
      status: "success",
      message: "Danh sách khóa học",
      data: courses,
    };
  } catch (error) {
    return {
      status: "error",
      message: "Lỗi khi lấy danh sách khóa học",
      error: error.message,
    };
  }
};

// Lấy khóa học theo slug
const getCourseBySlug = async (slug) => {
  try {
    const course = await Course.findOne({ slug }).populate("lecturerId", "name");

    if (!course) {
      return {
        status: "error",
        message: "Khóa học không tồn tại",
        data: null,
      };
    }

    return {
      status: "success",
      message: "Thông tin khóa học",
      data: course,
    };
  } catch (error) {
    return {
      status: "error",
      message: "Lỗi khi lấy khóa học",
      error: error.message,
    };
  }
};

module.exports = {
  createCourse,
  getAllCourses,
  getCourseBySlug,
};
