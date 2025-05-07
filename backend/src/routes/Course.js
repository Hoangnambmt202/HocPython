const express = require('express');
const router = express.Router();
const CourseController = require('../controllers/CourseController');
const {authMiddleware} = require('../middleware/authMiddleWare');
const {upload}  = require('../config/cloudinary');

router.post('/create',upload.single('thumbnailFile'), CourseController.createCourse);
router.get('/all', CourseController.getAllCourses);
router.get('/search', CourseController.searchCourses);
router.get('/:slug',CourseController.getCourse);
router.put('/update/:courseId', authMiddleware, upload.single('thumbnailFile'), CourseController.updateCourse)
router.delete('/delete/:courseId', authMiddleware, CourseController.deleteCourse);

module.exports = router;