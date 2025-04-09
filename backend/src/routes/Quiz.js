const express = require('express');
const router = express.Router();
const QuizController = require('../controllers/QuizController');
const {authMiddleware} = require('../middleware/authMiddleWare');


router.post('/create',authMiddleware, QuizController.createQuiz);
router.delete('/delete/:quizId',authMiddleware, QuizController.deleteQuiz);

module.exports = router;