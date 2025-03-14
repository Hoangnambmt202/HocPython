const express = require('express');
const router = express.Router();
const CourseController = require('../controllers/CourseController');
const {authMiddleware} = require('../middleware/authMiddleWare');

router.post('/create', CourseController.createCourse);
router.get('/all', CourseController.getAllCourses);
router.get('/:slug',CourseController.getCourse);
router.put('/update/:courseId', authMiddleware, CourseController.updateCourse)
router.delete('/delete/:courseId', authMiddleware, CourseController.deleteCourse)

module.exports = router;