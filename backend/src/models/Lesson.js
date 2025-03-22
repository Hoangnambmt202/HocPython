const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema({
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  chapterId: { type: mongoose.Schema.Types.ObjectId, ref: "Chapter", required: true },
  title: { type: String, required: true },
  videoUrl: { type: String },
  description: { type: String },
  duration: { type: Number, required: true }, 
  theory: { type: String }, // Nội dung giáo trình Markdown
  quiz: [{ type: mongoose.Schema.Types.ObjectId, ref: "Quiz" }] 
}, { timestamps: true });

module.exports = mongoose.model("Lesson", lessonSchema);
