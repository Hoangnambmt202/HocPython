const express = require('express');
const router = express.Router();
const ChapterController = require('../controllers/ChapterController');
const {authMiddleware} = require('../middleware/authMiddleWare');


router.post('/create',authMiddleware, ChapterController.createChapter);
router.get('/all',authMiddleware, ChapterController.getAllChapters);
router.put('/update/:chapterId', authMiddleware, ChapterController.updateChapter);
router.delete('/delete/:chapterId',authMiddleware, ChapterController.deleteChapter);

module.exports = router;