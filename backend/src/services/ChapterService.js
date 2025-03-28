const Chapter = require("../models/Chapter");
const Course = require("../models/Course");

const createChapter = async (courseId, title) => {
  // Kiểm tra khóa học có tồn tại không
  const course = await Course.findById(courseId);
  if (!course) {
    throw new Error("Khóa học không tồn tại");
  }

  // Tạo chapter mới
  const newChapter = new Chapter({ courseId, title });
  await newChapter.save();

  // Cập nhật khóa học với chapter mới
  course.content.push(newChapter._id);
  await course.save();

  return newChapter;
};

const getAllChapters = async () => {
  return await Chapter.find().populate("courseId", "title");
}
const updateChapter  = async (id, title)=> {
  return await Chapter.findByIdAndUpdate(id, { title }, { new: true });
}
const deleteChapter = async (id) => {
  return await Chapter.findByIdAndDelete(id);
}
module.exports = {
  createChapter,
  getAllChapters,
  updateChapter,
  deleteChapter,

};