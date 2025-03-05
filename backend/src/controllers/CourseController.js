const courseService = require( "../services/CourseService");


const createCourse = async (req, res) => {
    try {
      const newCourse = await courseService.createCourse(req.body);
      console.log(req.body);
      res.status(200).json({ message: "Khóa học đã được tạo thành công", course: newCourse });
    } catch (error) {
      res.status(400).json({ message: "Lỗi khi tạo khóa học", error });
    }
  };

// Lấy tất cả khóa học
const getAllCourses = async (req, res) => {
  try {
    const courses = await courseService.getAllCourses();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy danh sách khóa học", error });
  }
};
const getCourse = async (req, res) => {
  try {
    const { slug } = req.params;
    
    const course = await courseService.getCourseBySlug(slug);

    if (!course) {
      return res.status(404).json({ message: "Khóa học không tồn tại" });
    }

    res.status(200).json(course);
 
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy khóa học", error });
  }
};
  module.exports = {
    createCourse,
    getAllCourses,
    getCourse,
  }