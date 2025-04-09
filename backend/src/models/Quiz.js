const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
  lessonId: { type: mongoose.Schema.Types.ObjectId, ref: "Lesson", required: true },
  question: { type: String, required: true },
  options: [{ type: String }],
  correctAnswer: { type: String, required: true },
  explanation: String
}, { timestamps: true });

const Quiz = mongoose.model("Quiz", quizSchema);
module.exports = Quiz;