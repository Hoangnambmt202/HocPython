const courseService = require( "../services/CourseService");


const createCourse = async (req, res) => {
    try {
      const newCourse = await courseService.createCourse(req.body);
      res.status(201).json({ message: "Khóa học đã được tạo thành công", course: newCourse });
    } catch (error) {
      res.status(400).json({ message: "Lỗi khi tạo khóa học", error });
    }
  };


  module.exports = {
    createCourse
  }