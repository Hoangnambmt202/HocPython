const Chapter = require("../models/Chapter");
const Course = require("../models/Course");
const CourseService = require("./CourseService");

// Tạo chương mới
const createChapter = async (courseId, title) => {
  try {
    // Kiểm tra khóa học có tồn tại không
    const course = await Course.findById(courseId);
    if (!course) {
      throw new Error("Khóa học không tồn tại");
    }

    // Tạo chapter mới
    const newChapter = new Chapter({ 
      courseId, 
      title,
      totalLessons: 0 // Khởi tạo tổng số bài học là 0
    });
    await newChapter.save();

    // Cập nhật khóa học với chapter mới
    course.content.push(newChapter._id);
    await course.save();

    return newChapter;
  } catch (error) {
    console.error("Error creating chapter:", error);
    throw error;
  }
};

// Lấy tất cả chương
const getAllChapters = async () => {
  try {
    return await Chapter.find().populate("courseId", "title");
  } catch (error) {
    console.error("Error getting chapters:", error);
    throw error;
  }
};

// Cập nhật chương
const updateChapter = async (id, title) => {
  try {
    const updatedChapter = await Chapter.findByIdAndUpdate(
      id, 
      { title }, 
      { new: true }
    );
    
    if (!updatedChapter) {
      throw new Error("Chương không tồn tại");
    }

    return updatedChapter;
  } catch (error) {
    console.error("Error updating chapter:", error);
    throw error;
  }
};

// Xóa chương
const deleteChapter = async (id) => {
  try {
    const chapter = await Chapter.findById(id);
    if (!chapter) {
      throw new Error("Chương không tồn tại");
    }

    // Lấy courseId trước khi xóa
    const courseId = chapter.courseId;

    // Xóa chương
    await Chapter.findByIdAndDelete(id);

    // Cập nhật khóa học
    const course = await Course.findById(courseId);
    if (course) {
      course.content = course.content.filter(chapterId => chapterId.toString() !== id);
      await course.save();
      
      // Tính lại tổng số bài học của khóa học
      await CourseService.calculateTotalLessons(courseId);
    }

    return { success: true, message: "Xóa chương thành công" };
  } catch (error) {
    console.error("Error deleting chapter:", error);
    throw error;
  }
};

// Cập nhật tổng số bài học trong chương
const updateChapterLessonCount = async (chapterId) => {
  try {
    const chapter = await Chapter.findById(chapterId);
    if (!chapter) {
      throw new Error("Chương không tồn tại");
    }

    // Đếm số bài học trong chương
    const totalLessons = chapter.lessons ? chapter.lessons.length : 0;
    
    // Cập nhật tổng số bài học
    chapter.totalLessons = totalLessons;
    await chapter.save();

    // Cập nhật tổng số bài học của khóa học
    await CourseService.calculateTotalLessons(chapter.courseId);

    return totalLessons;
  } catch (error) {
    console.error("Error updating chapter lesson count:", error);
    throw error;
  }
};

module.exports = {
  createChapter,
  getAllChapters,
  updateChapter,
  deleteChapter,
  updateChapterLessonCount
};