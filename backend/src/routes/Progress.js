const express = require('express');
const router = express.Router();
const ProgressController = require('../controllers/ProgressController');
const {authMiddleware} = require('../middleware/authMiddleWare');   

router.post("/save", authMiddleware, ProgressController.saveProgress);
router.get("/:slug", authMiddleware, ProgressController.getProgress);
router.get("/:slug/last-lesson", authMiddleware, ProgressController.getLastLesson);
router.post("/:slug/last-lesson", authMiddleware, ProgressController.updateLastLesson);

// Route mới cho admin
router.get("/admin/student/:userId/progress", authMiddleware, ProgressController.getStudentProgress);

module.exports = router;