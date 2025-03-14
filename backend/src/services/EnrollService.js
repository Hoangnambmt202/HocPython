const Enrollment = require("../models/Enrollment");
const Course = require("../models/Course");

const enrollCourse = (userId, courseId) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Kiểm tra xem user đã đăng ký khóa học chưa
            const existingEnrollment = await Enrollment.findOne({ userId, courseId });
            if (existingEnrollment) {
                return resolve ({status: "error", message:"Bạn đã đăng ký khóa học này!"});
            }

            // Kiểm tra khóa học có tồn tại không
            const course = await Course.findById(courseId);
            if (!course) {
                return resolve({status: "error", message: "Khóa học không tồn tại!"});
            }

            // Tạo enrollment mới
            const enrollment = await Enrollment.create({ userId, courseId });

            // Dùng resolve để trả về kết quả khi thành công
            resolve({
                status: "success",
                message: "Đăng ký khóa học thành công",
                data: enrollment,
            });

        } catch (error) {
            reject(error); // Nếu có lỗi, reject Promise
        }
    });
};

const getUserEnrollments = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const enrollments = await Enrollment.find({ userId }).populate("courseId", "title numberStudent slug" );
            resolve({
                status: "success",
                message: "Lấy danh sách khóa học đăng ký thành công",
                data: enrollments
            });
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    enrollCourse,
    getUserEnrollments,
};
