const Progress = require("../models/Progress");
const Enrollment = require("../models/Enrollment");
const Lesson = require("../models/Lesson");
const Course = require("../models/Course");

const updateProgress = async (userId, courseId, lessonId) => {
    try {
        // Kiểm tra xem bài học đã hoàn thành chưa
        let progress = await Progress.findOne({ userId, courseId, lessonId });

        if (!progress) {
            progress = await Progress.create({ userId, courseId, lessonId, isCompleted: true, completedAt: new Date() });
        } else if (!progress.isCompleted) {
            progress.isCompleted = true;
            progress.completedAt = new Date();
            await progress.save();
        }

        // Cập nhật tổng tiến độ khóa học
        const totalLessons = await Lesson.countDocuments({ courseId });
        const completedLessons = await Progress.countDocuments({ userId, courseId, isCompleted: true });
        const progressPercentage = totalLessons === 0 ? 0 : (completedLessons / totalLessons) * 100;

        await Enrollment.findOneAndUpdate(
            { userId, courseId },
            {
                progress: progressPercentage,
                status: progressPercentage === 100 ? "completed" : "in_progress"
            },
            { new: true }
        );

        return { success: true, progress: progressPercentage };
    } catch (error) {
        console.error("Error updating progress:", error);
        return { success: false, message: "Failed to update progress" };
    }
};

// Lưu tiến độ học tập
const saveProgress = async (userId, courseId, lessonId, completed) => {
  let progress = await Progress.findOne({ userId, courseId });

  if (!progress) {
    const course = await Course.findById(courseId);
    if (!course) {
      throw new Error('Không tìm thấy khóa học');
    }

    const totalLessons = course.content.reduce((total, chapter) => {
      return total + (chapter.lessons ? chapter.lessons.length : 0);
    }, 0);

    progress = new Progress({
      userId,
      courseId,
      totalLessons
    });
  }

  // Đảm bảo lessonProgress tồn tại
  if (!progress.lessonProgress) {
    progress.lessonProgress = new Map(); // hoặc {}
  }

  progress.lessonProgress.set(lessonId.toString(), {
    completed,
    timestamp: new Date()
  });

  await progress.save();
  return progress;
};


// Lấy tiến độ của khóa học
const getProgress = async (userId, slug) => {
  const progress = await Progress.findOne({ userId, slug });
  
  if (!progress) {
    return {
      lessonProgress: {},
      completedLessons: 0,
      totalLessons: 0,
      progress: 0
    };
  }

  return progress;
};

// Lấy bài học cuối cùng
const getLastLesson = async (userId, slug) => {
  
  const progress = await Progress.findOne({ userId, slug });
  
  if (!progress || !progress.lastLesson) {
    return null;
  }

  return progress.lastLesson;
};

// Cập nhật bài học cuối cùng
const updateLastLesson = async (userId, courseId, lessonId, chapterId) => {
  let progress = await Progress.findOne({ userId, courseId });
  
  if (!progress) {
    const course = await Course.findById(courseId);
    if (!course) {
      throw new ApiError(404, 'Không tìm thấy khóa học');
    }

    progress = new Progress({
      userId,
      courseId,
      totalLessons: course.content.reduce((total, chapter) => {
        return total + (chapter.lessons ? chapter.lessons.length : 0);
      }, 0)
    });
  }

  progress.lastLesson = {
    lessonId,
    chapterId,
    timestamp: new Date()
  };

  await progress.save();
  return progress.lastLesson;
};

module.exports = {
  updateProgress,
  saveProgress,
  getProgress,
  getLastLesson,
  updateLastLesson
};
