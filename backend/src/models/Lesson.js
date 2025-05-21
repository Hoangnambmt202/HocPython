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
  videoUrl: { type: String, default: null }, // URL video youtube hoặc video khác
  h5pUrl: { type: String, default: null }, // URL H5P
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
  },
  audioUrl: { type: String, default: null }, // Đường dẫn file audio đọc lý thuyết
  duration: { type: Number, default: 0 }, // Thời gian học (phút),
  
}, { timestamps: true });

const Lesson = mongoose.model("Lesson", lessonSchema);
module.exports = Lesson;