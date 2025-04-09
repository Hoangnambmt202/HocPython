import Quiz from "../models/Quiz.js";
import Lesson from "../models/Lesson.js";

export const QuizService = {
  // Tạo quiz và cập nhật Lesson
  createQuiz: async (quizData) => {
    const newQuiz = new Quiz(quizData);
    await newQuiz.save();

    await Lesson.findByIdAndUpdate(
      quizData.lessonId,
      { $push: { quiz: newQuiz._id } },
      { new: true }
    );

    return newQuiz;
  },

  // Xóa quiz
  deleteQuiz: async (quizId) => {
    const quiz = await Quiz.findByIdAndDelete(quizId);
    await Lesson.findByIdAndUpdate(
      quiz.lessonId,
      { $pull: { quiz: quizId } }
    );
    return quiz;
  }
};