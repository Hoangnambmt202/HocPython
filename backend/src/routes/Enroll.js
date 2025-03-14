const express = require("express");
const router = express.Router();
const EnrollController = require("../controllers/EnrollController");
const {authMiddleware} = require('../middleware/authMiddleWare');

router.post("/enroll", authMiddleware, EnrollController.enrollCourse);
router.get("/my-courses", authMiddleware, EnrollController.getUserEnrollments);

module.exports = router;
