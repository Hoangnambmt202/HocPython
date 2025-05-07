const CourseService = require( "../services/CourseService");


const createCourse = async (req, res) => {
  try {
  
    // Xử lý file ảnh nếu có
    if (req.file) {
      req.body.thumbnail = req.file.path;
    }
    // Xử lý tags nếu có
    if (req.body.tags) {
      req.body.tags = JSON.parse(req.body.tags);
    }
    const course = await CourseService.createCourse(req.body);
    res.status(200).json({ status: "success", message: "Tạo khóa học thành công!",data: course });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Lỗi khi tạo khóa học", error });
  }
  };

// Lấy tất cả khóa học
const getAllCourses = async (req, res) => {
  try {
    const response = await CourseService.getAllCourses();
    res.status(200).json({status: "success", message: "Lấy DS khóa học thành công" , data: response.data, total: response.total});
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy danh sách khóa học", error });
  }
};

const getCourse = async (req, res) => {
  try {
    const { slug } = req.params;
    const course = await CourseService.getCourseBySlug(slug);
    if (!course) {
      return res.status(404).json({ message: "Khóa học không tồn tại" });
    }
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy khóa học", error });
  }
};

const updateCourse = async (req, res) => {
try {
  const { courseId } = req.params;
  // Xử lý file ảnh nếu có
  if (req.file) {
    req.body.thumbnail = req.file.path;
  }

  // Xử lý tags nếu có
  if (req.body.tags) {
    req.body.tags = JSON.parse(req.body.tags);
  }
  const response = await CourseService.updateCourse(courseId, req.body); 
  if (!response) {
    return res.status(404).json({status: "error" ,message: "Không tìm thấy khóa học" });
  }
  res.status(200).json({status: "success", message: "Chỉnh sửa khóa học thành công", data: response});

}
catch (error) {
  res.status(500).json({ message: "Lỗi khi cập nhật khóa học", error });
}
}
const deleteCourse = async (req, res) => {

  try {
    const { courseId } = req.params;
    const response = await CourseService.deleteCourse(courseId); 
    if (!response) {
      return res.status(404).json({ message: "Không tìm thấy khóa học" });
    }
    res.json(response);
  
  }
  catch (error) {
    res.status(500).json({ message: "Lỗi khi xóa khóa học", error });
  }
  };
  const searchCourses = async (req, res) => { 
    try {
  
      const response = await CourseService.searchCourses(req.query);  // ✅ sửa tại đây
      res.status(200).json({ status: "success", message: "Tìm kiếm DS khóa học thành công " ,data: response });
    } catch (error) {
      res.status(500).json({ status: "error", message: "Lỗi khi tìm kiếm khóa học", error });
    }
  }
  

  module.exports = {
    createCourse,
    getAllCourses,
    getCourse,
    updateCourse,
    deleteCourse,
    searchCourses,

  }