const courseService = require( "../services/CourseService");


const createCourse = async (req, res) => {
    try {
      const newCourse = await courseService.createCourse(req.body);
      res.status(200).json({ message: "Khóa học đã được tạo thành công", course: newCourse });
    } catch (error) {
      res.status(400).json({ message: "Lỗi khi tạo khóa học", error });
    }
  };

// Lấy tất cả khóa học
const getAllCourses = async (req, res) => {
  try {
    const courses = await courseService.getAllCourses();
    res.status(200).json({ message: "Lấy khóa học thành công", data: courses });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy danh sách khóa học", error });
  }
};
  module.exports = {
    createCourse,
    getAllCourses,
  }