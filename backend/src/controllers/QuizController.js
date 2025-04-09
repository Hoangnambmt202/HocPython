const QuizService  = require("../services/QuizService")


const createQuiz = async (req, res) => {
    try {
      const quiz = await QuizService.createQuiz(req.body);
      res.status(201).json({status: "success", message: "Thêm quiz thành công", data: quiz});
    } catch (error) {
      handleError(res, 500, "Tạo quiz thất bại", error.message);
    }
  };

const deleteQuiz = async (req, res) => {
    try {
      await QuizService.deleteQuiz(req.params.id);
      res.status(200).json({status: "success", message: "Xóa quiz thành công" });
    } catch (error) {
      res.status(500).json({status: "error", message: error})
    }
  }


module.exports = {
    createQuiz,
    deleteQuiz
}