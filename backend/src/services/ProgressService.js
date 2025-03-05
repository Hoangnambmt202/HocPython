const Progress = require("../models/Progress");
const Enrollment = require("../models/Enrollment");
const Lesson = require("../models/Lesson");

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

module.exports = { updateProgress };
