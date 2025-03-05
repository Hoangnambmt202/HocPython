const express = require('express');
const router = express.Router();
const CourseController = require('../controllers/CourseController');


router.post('/create', CourseController.createCourse);
router.get('/all', CourseController.getAllCourses);
router.get('/:slug',CourseController.getCourse);

module.exports = router;