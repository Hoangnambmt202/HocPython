const mongoose = require("mongoose");

const chapterSchema = new mongoose.Schema({
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  title: { type: String, required: true },
  lessons: [{ type: mongoose.Schema.Types.ObjectId, ref: "Lesson" }]
});

module.exports = mongoose.model("Chapter", chapterSchema);
