const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  completedLessons: [{ type: mongoose.Schema.Types.ObjectId, ref: "Lesson" }],
  lastLessonId: { type: mongoose.Schema.Types.ObjectId, ref: "Lesson" },
  progress: { type: Number, default: 0 } 
}, { timestamps: true });

module.exports = mongoose.model("Progress", progressSchema);
