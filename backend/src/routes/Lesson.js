const express = require('express');
const router = express.Router();
const LessonController = require('../controllers/LessonController');
const {authMiddleware} = require('../middleware/authMiddleWare');


router.post("/:chapterId/create", authMiddleware, LessonController.createLesson);
router.get('/all',authMiddleware, LessonController.getAllLessons);
router.get('/:chapterId',authMiddleware, LessonController.getLessonsByChapter);
router.put('/update/:lessonId', authMiddleware, LessonController.updateLesson);
router.delete('/delete/:lessonId',authMiddleware, LessonController.deleteLesson);
router.post('/run-code', authMiddleware, LessonController.runCode);


module.exports = router;