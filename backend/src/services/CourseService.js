const Course = require("../models/Course");

const createCourse = async (courseData) => {
    const newCourse = new Course(courseData);
    return await newCourse.save();
  };
// Lấy tất cả khóa học
const getAllCourses = async () => {
  return await Course.find().populate("lecturerId", "name")
};
module.exports = {
    createCourse,
    getAllCourses,
}