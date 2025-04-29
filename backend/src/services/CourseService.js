const Course = require("../models/Course");
require("../models/Chapter"); 
const slugify = require("slugify");

// Hàm tính tổng số bài học trong khóa học
const calculateTotalLessons = async (courseId) => {
  try {
    const course = await Course.findById(courseId)
      .populate({
        path: 'content',
        populate: {
          path: 'lessons'
        }
      });

    if (!course) {
      throw new Error('Khóa học không tồn tại');
    }

    let totalLessons = 0;
    course.content.forEach(chapter => {
      if (chapter.lessons && Array.isArray(chapter.lessons)) {
        totalLessons += chapter.lessons.length;
      }
    });

    // Cập nhật tổng số bài học vào khóa học
    course.totalLessons = totalLessons;
    await course.save();

    return totalLessons;
  } catch (error) {
    console.error('Error calculating total lessons:', error);
    throw error;
  }
};

// Tạo khóa học
const createCourse = async (data) => {
  try {
    const slug = slugify(data.title, { lower: true, strict: true });
    
    const newCourse = new Course({
      title: data.title,
      slug: slug,
      description: data.description,
      lecturerId: data.lecturerId,
      price: data.price,
      discountPrice: data.discountPrice,
      thumbnail: data.thumbnail || "/src/assets/imgs/default-thumbnail.jpg",
      categoryId: data.categoryId,
      tags: data.tags ? data.tags.split(",").map(tag => tag.trim()) : [],
      isPublished: data.isPublished,
      totalLessons: 0 // Khởi tạo tổng số bài học là 0
    });

    await newCourse.save();
    return newCourse;
  } catch (error) {
    console.error("❌ Lỗi trong CourseService:", error);
    throw error;
  }
};

// Lấy tất cả khóa học
const getAllCourses = async () => {
  try {
    const courses = await Course.find()
    .populate("lecturerId", "name")
    .populate("categoryId", "name")
    .populate({path: "content", populate: {path: "lessons", select: "title videoUrl description duration theory"}});
    const totalCourses = await Course.countDocuments();
    return {
      data: courses,
      total: totalCourses,
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
    const course = await Course.findOne({ slug })
    .populate("lecturerId", "name")
    .populate("categoryId", "name")
    .populate({
      path: "content", // Đây là trường chứa các Chapter
      populate: {
        path: "lessons", // Đây là trường chứa các Lesson trong Chapter
        select: "title videoUrl type content practice order" // Chọn các trường bạn muốn lấy từ Lesson
      }
    });

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

// Cập nhật khóa học
const updateCourse = async (courseId, data) => {
  try {
    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      {
        $set: data 
      },
      { new: true, runValidators: true }
    );

    if (!updatedCourse) {
      return { status: "error", message: "Không tìm thấy khóa học!" };
    }

    // Tính lại tổng số bài học sau khi cập nhật
    await calculateTotalLessons(courseId);
    
    await updatedCourse.save();

    return {
      status: "success",
      message: "Cập nhật khóa học thành công!",
      data: updatedCourse,
    };
  } catch (error) {
    console.error("❌ Lỗi khi cập nhật khóa học:", error);
    return { status: "error", message: "Lỗi khi cập nhật khóa học" };
  }
};

// Xóa khóa học
const deleteCourse = async (courseId) => {
  try {
    const deletedCourse = await Course.findByIdAndDelete(courseId);
    if (!deletedCourse) {
      throw new Error("Khóa học không tồn tại");
    }
    return {
      status: "success",
      message: "Xóa khóa học thành công",
    };
  } catch (error) {
    console.error("Lỗi khi xóa khóa học:", error);
    throw error;
  }
};

module.exports = {
  createCourse,
  getAllCourses,
  getCourseBySlug,
  updateCourse,
  deleteCourse,
  calculateTotalLessons
};
