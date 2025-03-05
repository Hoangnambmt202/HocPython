const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    lessonId: { type: mongoose.Schema.Types.ObjectId, ref: "Lesson", required: true },
    isCompleted: { type: Boolean, default: false },
    completedAt: { type: Date, default: null }
}, { timestamps: true });

const Progress = mongoose.model("Progress", progressSchema);
module.exports = Progress;
