const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  chapterId: { type: mongoose.Schema.Types.ObjectId, ref: "Chapter", required: true },
  type: { 
    type: String, 
    enum: ["video", "theory", "quiz", "practice"], 
    required: true 
  },
  order: { type: Number, required: true }, // Thứ tự bài học
  content: { type: String }, // Markdown cho lý thuyết
  videoUrl: { type: String }, // URL video
 
  codeSnippets: [{
    language: { type: String, default: "python" },
    code: { type: String },
    explanation: { type: String }
  }],
  quizzes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Quiz" }], // Trắc nghiệm
  practice: { 
    initialCode: String, // Code mẫu
    testCases: [{
      input: String,
      expectedOutput: String 
    }]
  }
}, { timestamps: true });

const Lesson = mongoose.model("Lesson", lessonSchema);
module.exports = Lesson;