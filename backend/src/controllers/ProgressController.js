const ProgressService = require('../services/ProgressService');

const saveProgress = async (req, res, next) => {
  try {
    const { courseId, lessonId, completed } = req.body;
    const userId = req.user._id;
  
    const progress = await ProgressService.saveProgress(userId, courseId, lessonId, completed);
    
    res.json({
      success: true,
      message: 'Đã cập nhật tiến độ',
      data: progress
    });
  } catch (error) {
    next(error);
  }
};

const getProgress = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const userId = req.user._id;
    const progress = await ProgressService.getProgress(userId, slug);
    
    res.json({
      success: true,
      messsage: "Lấy tiến độ thành công",
      data: progress
    });
  } catch (error) {
    next(error);
  }
};

const getLastLesson = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const userId = req.user._id;
    const lastLesson = await ProgressService.getLastLesson(userId, slug);
    res.json({
      success: true,
      message: "Lấy bài học cuối cùng thành công",
      data: lastLesson
    });
  } catch (error) {
    next(error);
  }
};

const updateLastLesson = async (req, res, next) => {
  try {
    const { courseId, lessonId, chapterId } = req.body;
    const userId = req.user._id;

    const lastLesson = await ProgressService.updateLastLesson(userId, courseId, lessonId, chapterId);

    res.json({
      success: true,
      message: 'Đã cập nhật bài học cuối cùng',
      data: lastLesson
    });
  } catch (error) {
    next(error);
  }
};

// Controller mới cho admin
const getStudentProgress = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const progress = await ProgressService.getStudentProgress(userId);
    
    res.json({
      success: true,
      message: "Lấy tiến độ học viên thành công",
      data: progress
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  saveProgress,
  getProgress,
  getLastLesson,
  updateLastLesson,
  getStudentProgress
};
