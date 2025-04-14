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

// Hàm tính tổng số bài học
const calculateTotalLessons = (content) => {
  if (!content || !Array.isArray(content)) return 0;
  
  return content.reduce((total, chapter) => {
    if (!chapter || !chapter.lessons || !Array.isArray(chapter.lessons)) return total;
    return total + chapter.lessons.length;
  }, 0);
};

// Lưu tiến độ học tập
const saveProgress = async (userId, courseId, lessonId, completed) => {
  try {
    let progress = await Progress.findOne({ userId, courseId });
    const course = await Course.findById(courseId);

    if (!course) {
      throw new Error('Không tìm thấy khóa học');
    }

    if (!progress) {
      progress = new Progress({
        userId,
        courseId,
        totalLessons: course.totalLessons || 0,
        completedLessons: 0,
        progress: 0,
        lessonProgress: new Map()
      });
    } else {
      // Cập nhật totalLessons từ Course nếu có thay đổi
      progress.totalLessons = course.totalLessons || 0;
    }

    // Đảm bảo lessonProgress tồn tại
    if (!progress.lessonProgress) {
      progress.lessonProgress = new Map();
    }

    // Cập nhật trạng thái bài học
    progress.lessonProgress.set(lessonId.toString(), {
      completed,
      timestamp: new Date()
    });

    // Tính số bài học đã hoàn thành
    const completedLessons = Array.from(progress.lessonProgress.values())
      .filter(lesson => lesson.completed).length;

    // Cập nhật tiến độ
    progress.completedLessons = completedLessons;
    progress.progress = progress.totalLessons > 0 
      ? Math.round((completedLessons / progress.totalLessons) * 100) 
      : 0;

    await progress.save();

    // Trả về dữ liệu tiến độ mới nhất kèm thông tin khóa học
    return {
      progress: progress.progress,
      totalLessons: progress.totalLessons,
      completedLessons: progress.completedLessons,
      lessonProgress: progress.lessonProgress,
      course: {
        _id: course._id,
        title: course.title,
        slug: course.slug
      }
    };
  } catch (error) {
    console.error("Error saving progress:", error);
    throw error;
  }
};

// Lấy tiến độ của khóa học
const getProgress = async (userId, slug) => {
  try {
    const course = await Course.findOne({ slug });
    if (!course) {
      throw new Error('Không tìm thấy khóa học');
    }

    const progress = await Progress.findOne({ userId, courseId: course._id });
    
    if (!progress) {
      // Tạo progress mới với totalLessons từ Course
      return {
        lessonProgress: {},
        completedLessons: 0,
        totalLessons: course.totalLessons || 0,
        progress: 0
      };
    }

    // Cập nhật totalLessons từ Course nếu có thay đổi
    if (progress.totalLessons !== course.totalLessons) {
      progress.totalLessons = course.totalLessons || 0;
      progress.progress = progress.totalLessons > 0 
        ? Math.round((progress.completedLessons / progress.totalLessons) * 100) 
        : 0;
      await progress.save();
    }

    return progress;
  } catch (error) {
    console.error("Error getting progress:", error);
    throw error;
  }
};

// Lấy bài học cuối cùng
const getLastLesson = async (userId, slug) => {
  try {
    const course = await Course.findOne({ slug });
    if (!course) {
      throw new Error('Không tìm thấy khóa học');
    }

    const progress = await Progress.findOne({ userId, courseId: course._id });
    
    if (!progress || !progress.lastLesson) {
      return null;
    }

    return progress.lastLesson;
  } catch (error) {
    console.error("Error getting last lesson:", error);
    throw error;
  }
};

// Cập nhật bài học cuối cùng
const updateLastLesson = async (userId, slug, lessonId, chapterId) => {
  try {
    const course = await Course.findOne({ slug });
    if (!course) {
      throw new Error('Không tìm thấy khóa học');
    }

    let progress = await Progress.findOne({ userId, courseId: course._id });
    
    if (!progress) {
      progress = new Progress({
        userId,
        courseId: course._id,
        totalLessons: course.totalLessons || 0,
        completedLessons: 0,
        progress: 0
      });
    }

    progress.lastLesson = {
      lessonId,
      chapterId,
      timestamp: new Date()
    };

    await progress.save();
    return progress.lastLesson;
  } catch (error) {
    console.error("Error updating last lesson:", error);
    throw error;
  }
};

// Lấy tiến độ của học viên (dành cho admin)
const getStudentProgress = async (studentId) => {
  try {
    // Lấy tất cả khóa học
    const courses = await Course.find({});
    
    // Lấy tiến độ của học viên trong tất cả khóa học
    const progressPromises = courses.map(async (course) => {
      const progress = await Progress.findOne({ userId: studentId, courseId: course._id });
      
      return {
        courseId: course._id,
        courseTitle: course.title,
        courseSlug: course.slug,
        progress: progress ? progress.progress : 0,
        completedLessons: progress ? progress.completedLessons : 0,
        totalLessons: course.totalLessons || 0,
        lastAccessed: progress?.updatedAt || null
      };
    });

    const progressResults = await Promise.all(progressPromises);

    // Tính toán thống kê tổng thể
    const totalProgress = progressResults.reduce((acc, curr) => acc + curr.progress, 0);
    const averageProgress = progressResults.length > 0 ? totalProgress / progressResults.length : 0;
    const totalCompletedLessons = progressResults.reduce((acc, curr) => acc + curr.completedLessons, 0);
    const totalLessons = progressResults.reduce((acc, curr) => acc + curr.totalLessons, 0);

    return {
      courses: progressResults,
      summary: {
        averageProgress: Math.round(averageProgress),
        totalCompletedLessons,
        totalLessons,
        totalCourses: progressResults.length,
        activeCourses: progressResults.filter(p => p.progress > 0).length
      }
    };
  } catch (error) {
    console.error("Error getting student progress:", error);
    throw error;
  }
};

module.exports = {
  updateProgress,
  saveProgress,
  getProgress,
  getLastLesson,
  updateLastLesson,
  getStudentProgress
};
