const ChapterService = require("../services/ChapterService");

const createChapter = async (req, res) => {
  try {
    const { courseId, title } = req.body;
    const newChapter = await ChapterService.createChapter(courseId, title);
    res.status(200).json({status: "success", message: "Chapter được tạo thành công", data: newChapter });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error });
  }
};
const getAllChapters = async (req, res) => {
  try {
    const chapters = await ChapterService.getAllChapters();
    res.status(200).json({status: "success", message: "Lấy DS chapter thành công", data: chapters});
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy danh sách chapters", error });
  }
};
const updateChapter = async (req, res) => {
  try {
    const { title } = req.body;
    const {chapterId} = req.params;
    const updatedChapter = await ChapterService.updateChapter(chapterId, title);
    res.status(200).json({status:"success", message: "Cập nhập chapter thành công", data: updatedChapter});
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi cập nhật chapter", error });
  }
};
const deleteChapter = async (req, res) => {
  try {
    const {chapterId} = req.params
    await ChapterService.deleteChapter(chapterId);
    res.status(200).json({status: "success", message: "Chapter đã được xóa" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi xóa chapter", error });
  }
};


module.exports = {
  createChapter,
  getAllChapters,
  updateChapter,
  deleteChapter

};
    