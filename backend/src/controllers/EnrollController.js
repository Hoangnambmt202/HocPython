const EnrollService = require("../services/EnrollService");

const enrollCourse = async (req, res) => {
    try {
        const { courseId } = req.body;
     
        const userId = req.user._id;
    
        const response = await EnrollService.enrollCourse(userId, courseId);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ status: "error", message: error.message });
    }
};

const getUserEnrollments = async (req, res) => {
    try {
        const userId = req.user._id;
        const response = await EnrollService.getUserEnrollments(userId);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json(error);
    }
};

module.exports = {
    enrollCourse,
    getUserEnrollments,
};
