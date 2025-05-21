const express = require('express');
const router = express.Router();
const LessonController = require('../controllers/LessonController');
const {authMiddleware} = require('../middleware/authMiddleWare');

const multer = require('multer');
const path = require('path');
const fs = require('fs-extra');

// Setup multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = './uploads/h5p';
    fs.ensureDirSync(dir);
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});
const upload = multer({ storage });


router.post("/:chapterId/create", authMiddleware ,upload.single("h5pFile"), LessonController.createLesson);
router.get('/all',authMiddleware, LessonController.getAllLessons);
router.get('/:chapterId',authMiddleware, LessonController.getLessonsByChapter);
router.put('/update/:lessonId', authMiddleware, LessonController.updateLesson);
router.delete('/delete/:lessonId',authMiddleware, LessonController.deleteLesson);
router.post('/run-code', authMiddleware, LessonController.runCode);
router.post('/text-to-speech', LessonController.textToSpeech)




module.exports = router;