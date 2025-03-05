const progressService = require("../services/progressService");

const saveProgress = async (req, res) => {
    const { userId, courseId, lessonId } = req.body;
    if (!userId || !courseId || !lessonId) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    const result = await progressService.updateProgress(userId, courseId, lessonId);

    if (result.success) {
        return res.json({ message: "Progress updated", progress: result.progress });
    } else {
        return res.status(500).json({ message: result.message });
    }
};

module.exports = { saveProgress };
